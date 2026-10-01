import { NextRequest, NextResponse } from 'next/server';
import { getAllPandals, getPandalById } from '@/lib/store';
import { InstagramPost } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pandalId = searchParams.get('pandalId');
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    if (pandalId) {
      const pandal = getPandalById(pandalId);
      if (!pandal) {
        return NextResponse.json({ success: false, error: 'Pandal not found' }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        data: pandal.latest_images || []
      });
    }

    // Collect latest posts across all pandals, sorted by timestamp descending
    const allPosts: (InstagramPost & { pandal_name?: string; pandal_slug?: string })[] = [];
    const pandals = getAllPandals();

    pandals.forEach((p) => {
      (p.latest_images || []).forEach((img) => {
        allPosts.push({
          ...img,
          pandal_name: p.name,
          pandal_slug: p.slug
        });
      });
    });

    allPosts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return NextResponse.json({
      success: true,
      count: Math.min(allPosts.length, limit),
      data: allPosts.slice(0, limit)
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch Instagram posts' },
      { status: 500 }
    );
  }
}
