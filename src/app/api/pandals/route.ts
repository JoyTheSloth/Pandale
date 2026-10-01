import { NextRequest, NextResponse } from 'next/server';
import { filterPandals, getAllPandals, upsertPandal } from '@/lib/store';
import { Pandal } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || undefined;
    const zone = (searchParams.get('zone') as any) || undefined;
    const nearMetro = searchParams.get('nearMetro') === 'true';
    const popular = searchParams.get('popular') === 'true';
    const trending = searchParams.get('trending') === 'true';
    const lessCrowded = searchParams.get('lessCrowded') === 'true';
    const mustVisit = searchParams.get('mustVisit') === 'true';
    const day = (searchParams.get('day') as any) || undefined;
    const sortBy = (searchParams.get('sortBy') as any) || 'trending';
    const userLat = searchParams.get('lat') ? parseFloat(searchParams.get('lat')!) : undefined;
    const userLng = searchParams.get('lng') ? parseFloat(searchParams.get('lng')!) : undefined;

    const results = filterPandals({
      query,
      zone,
      nearMetro,
      popular,
      trending,
      lessCrowded,
      mustVisit,
      day,
      sortBy,
      userLat,
      userLng
    });

    return NextResponse.json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch pandals' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Pandal;

    if (!body.name || !body.area || !body.locality) {
      return NextResponse.json(
        { success: false, error: 'Name, area, and locality are required fields.' },
        { status: 400 }
      );
    }

    if (!body.slug) {
      body.slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    if (!body.id) {
      body.id = body.slug;
    }

    const saved = upsertPandal(body);
    return NextResponse.json({
      success: true,
      message: 'Pandal successfully saved.',
      data: saved
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to upsert pandal' },
      { status: 500 }
    );
  }
}
