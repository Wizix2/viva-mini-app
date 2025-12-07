import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File | null;
    
    if (!image) {
      return NextResponse.json(
        { error: 'Image file is required' },
        { status: 400 }
      );
    }
    
    // Mock successful response
    return NextResponse.json({
      status: 'ok',
      taskId: `img-img-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    });
  } catch (error) {
    console.error('Error in image-image generation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
