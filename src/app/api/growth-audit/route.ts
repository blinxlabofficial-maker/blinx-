import { NextResponse } from 'next/server';
import { getRecommendations } from '@/data/auditQuestions';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { answers, name, email, business_name } = body;

    if (!Array.isArray(answers) || answers.length !== 5) {
      return NextResponse.json({ detail: 'Answers must be an array of 5 items' }, { status: 400 });
    }

    const recommendations = getRecommendations(answers);
    const formattedDate = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });

    // Optional Google Sheets forward for Growth Audit submissions
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.GOOGLE_SHEET_URL;
    if (webhookUrl && email) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            timestamp: formattedDate,
            name: name || 'Audit User',
            email: email || '',
            phone: 'N/A',
            business_name: business_name || '',
            help_type: 'Growth Audit Submission',
            description: `Audit Answers: ${answers.join(', ')}`
          }),
          signal: controller.signal,
          redirect: 'follow',
        });
        clearTimeout(timeoutId);
      } catch (err) {
        console.warn('Audit Google Sheets forward failed:', err);
      }
    }

    return NextResponse.json({
      success: true,
      recommendations
    }, { status: 200 });

  } catch (error) {
    console.error('Error processing growth audit:', error);
    return NextResponse.json({ detail: 'Error processing audit' }, { status: 500 });
  }
}
