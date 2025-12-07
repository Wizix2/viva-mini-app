import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text } = body;
    
    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }
    
    // Mock successful response
    return NextResponse.json({
      status: 'ok',
      taskId: `text-img-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    });
  } catch (error) {
    console.error('Error in text-image generation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
