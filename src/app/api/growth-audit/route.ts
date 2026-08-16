import { NextResponse } from 'next/server';
import { getRecommendations } from '@/data/auditQuestions';
import clientPromise from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { answers, name, email, business_name } = body;

    if (!Array.isArray(answers) || answers.length !== 5) {
      return NextResponse.json({ detail: 'Answers must be an array of 5 items' }, { status: 400 });
    }

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ detail: 'Name is required' }, { status: 400 });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ detail: 'Valid email is required' }, { status: 400 });
    }

    if (!business_name || typeof business_name !== 'string') {
      return NextResponse.json({ detail: 'Business name is required' }, { status: 400 });
    }

    const recommendations = getRecommendations(answers);
    const id = crypto.randomUUID();
    const created_at = new Date().toISOString();

    console.log('New Growth Audit Submission:', { id, created_at, name, email, business_name, answers });

    try {
      const client = await clientPromise;
      const db = client.db('blinx_lab');
      await db.collection('growth_audits').insertOne({
        id,
        created_at,
        name,
        email,
        business_name,
        answers,
        recommendations
      });
    } catch (dbError) {
      console.error('MongoDB Error:', dbError);
    }

    return NextResponse.json({
      id,
      created_at,
      recommendations
    }, { status: 201 });

  } catch (error) {
    console.error('Error processing growth audit:', error);
    return NextResponse.json({ detail: 'Internal Server Error' }, { status: 500 });
  }
}
