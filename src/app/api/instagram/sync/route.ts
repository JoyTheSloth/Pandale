import { NextRequest, NextResponse } from 'next/server';
import { fetchAuthorizedInstagramPosts } from '@/lib/instagram';
import { attachInstagramPostToPandal, getPandalById } from '@/lib/store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pandalId } = body;

    if (!pandalId) {
      return NextResponse.json(
        { success: false, error: 'pandalId is required to sync Instagram content' },
        { status: 400 }
      );
    }

    const pandal = getPandalById(pandalId);
    if (!pandal) {
      return NextResponse.json(
        { success: false, error: `Pandal with id '${pandalId}' not found.` },
        { status: 404 }
      );
    }

    const syncResult = await fetchAuthorizedInstagramPosts(pandalId);

    // If new posts retrieved from authorized Graph API, attach to pandal store
    if (syncResult.success && syncResult.posts.length > 0) {
      syncResult.posts.forEach((post) => {
        attachInstagramPostToPandal(pandalId, post);
      });
    }

    return NextResponse.json({
      success: syncResult.success,
      pandalId,
      source: syncResult.source,
      syncedCount: syncResult.posts.length,
      message: syncResult.message,
      hasTokenConfigured: Boolean(process.env.INSTAGRAM_ACCESS_TOKEN)
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Error executing Instagram sync pipeline' },
      { status: 500 }
    );
  }
}
