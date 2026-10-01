import { NextRequest, NextResponse } from 'next/server';
import { getAllMetroStations, getPandalsNearMetroStation } from '@/lib/store';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const stationId = searchParams.get('stationId');
    const line = searchParams.get('line');

    if (stationId) {
      const nearby = getPandalsNearMetroStation(stationId);
      return NextResponse.json({
        success: true,
        stationId,
        pandals: nearby
      });
    }

    let stations = getAllMetroStations();
    if (line) {
      stations = stations.filter((s) => s.line_code === line || s.line.toLowerCase().includes(line.toLowerCase()));
    }

    return NextResponse.json({
      success: true,
      count: stations.length,
      data: stations
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch metro stations' },
      { status: 500 }
    );
  }
}
