import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, bot_trap } = body;

    // 1. Anti-Spam Honeypot Fallback: If bot fills hidden field, silently return 200
    if (bot_trap) {
      console.warn('Bot submission blocked by honeypot');
      return NextResponse.json({ message: 'OK' }, { status: 200 });
    }

    // 2. Strict Input Sanitation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ detail: 'Full name is required' }, { status: 400 });
    }
    
    const sanitizedPhone = (phone || '').toString().trim();
    if (!sanitizedPhone || sanitizedPhone.replace(/[^0-9+]/g, '').length < 6) {
      return NextResponse.json({ detail: 'Valid phone number is required' }, { status: 400 });
    }

    const sanitizedEmail = (email || '').toString().trim().toLowerCase();
    if (!sanitizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      return NextResponse.json({ detail: 'Valid email address is required' }, { status: 400 });
    }

    const id = crypto.randomUUID();
    const created_at = new Date().toISOString();
    const formattedDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

    const inquiry = {
      id,
      created_at,
      timestamp: formattedDate,
      name: name.trim(),
      phone: sanitizedPhone,
      email: sanitizedEmail,
    };

    console.log('✅ New Inquiry Received:', inquiry);

    let savedToGoogleSheets = false;
    let savedToMongo = false;
    let savedToFile = false;

    // --- FALLBACK LAYER 1: Google Sheets Webhook (With 6s Timeout) ---
    const googleSheetWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.GOOGLE_SHEET_URL;
    if (googleSheetWebhook) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const sheetPayload = {
          timestamp: formattedDate,
          name: inquiry.name,
          phone: inquiry.phone,
          email: inquiry.email,
        };

        const sheetRes = await fetch(googleSheetWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sheetPayload),
          signal: controller.signal,
          redirect: 'follow',
        });
        clearTimeout(timeoutId);

        if (sheetRes.ok || sheetRes.status === 302 || sheetRes.status === 200) {
          savedToGoogleSheets = true;
          console.log('✅ Successfully forwarded to Google Sheets Webhook');
        }
      } catch (sheetError) {
        console.warn('⚠️ Google Sheets Webhook unreachable or timed out:', sheetError);
      }
    }

    // --- FALLBACK LAYER 2: MongoDB Storage ---
    try {
      const client = await clientPromise;
      const db = client.db('blinx_lab');
      await db.collection('inquiries').insertOne(inquiry);
      savedToMongo = true;
      console.log('✅ Successfully saved to MongoDB');
    } catch (dbError) {
      console.warn('⚠️ MongoDB connection unavailable, using file fallback');
    }

    // --- FALLBACK LAYER 3: Persistent Local File Backup ---
    try {
      const backupDir = path.join(process.cwd(), 'src', 'data');
      const backupFile = path.join(backupDir, 'leads_backup.json');

      let existingLeads: any[] = [];
      try {
        const fileContent = await fs.readFile(backupFile, 'utf-8');
        existingLeads = JSON.parse(fileContent);
      } catch {
        existingLeads = [];
      }

      existingLeads.unshift(inquiry);
      await fs.writeFile(backupFile, JSON.stringify(existingLeads, null, 2), 'utf-8');
      savedToFile = true;
      console.log('✅ Lead safely secured in local file backup');
    } catch (fileErr) {
      console.error('File backup log error:', fileErr);
    }

    // Return 201 Created with delivery receipt
    return NextResponse.json({
      id,
      created_at,
      name: inquiry.name,
      phone: inquiry.phone,
      email: inquiry.email,
      receipt: {
        googleSheets: savedToGoogleSheets,
        database: savedToMongo,
        fileBackup: savedToFile
      },
      message: 'Inquiry received and secured'
    }, { status: 201 });

  } catch (error) {
    console.error('Fatal inquiry error:', error);
    return NextResponse.json({ detail: 'Internal Server Error' }, { status: 500 });
  }
}
