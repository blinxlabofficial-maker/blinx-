import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'blinx-lab-api',
    timestamp: new Date().toISOString()
  });
}
