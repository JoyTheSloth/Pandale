import { NextRequest, NextResponse } from 'next/server';
import { getPandalBySlug } from '@/lib/store';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const pandal = getPandalBySlug(slug);

    if (!pandal) {
      return NextResponse.json(
        { success: false, error: 'Pandal not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: pandal
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Error retrieving pandal' },
      { status: 500 }
    );
  }
}
