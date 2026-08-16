import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, bot_trap, business_name, help_type, description } = body;

    // 1. Anti-Spam Honeypot Fallback: If bot fills hidden field, silently return 200
    if (bot_trap) {
      return NextResponse.json({ message: 'OK' }, { status: 200 });
    }

    // 2. Input Sanitation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ detail: 'Full name is required' }, { status: 400 });
    }

    const sanitizedEmail = (email || '').toString().trim().toLowerCase();
    if (!sanitizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedEmail)) {
      return NextResponse.json({ detail: 'Valid email address is required' }, { status: 400 });
    }

    const sanitizedPhone = (phone || '').toString().trim();
    const formattedDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

    const payload = {
      timestamp: formattedDate,
      name: name.trim(),
      email: sanitizedEmail,
      phone: sanitizedPhone || 'N/A',
      business_name: business_name || '',
      help_type: Array.isArray(help_type) ? help_type.join(', ') : (help_type || ''),
      description: description || '',
    };

    // 3. Google Sheets Webhook Dispatch
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.GOOGLE_SHEET_URL;

    if (webhookUrl) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal,
          redirect: 'follow',
        });
        clearTimeout(timeoutId);
      } catch (sheetError) {
        console.warn('Google Sheets Webhook notification failed:', sheetError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry received and sent to Google Sheets'
    }, { status: 200 });

  } catch (error) {
    console.error('Inquiry error:', error);
    return NextResponse.json({ detail: 'Error processing request' }, { status: 500 });
  }
}
