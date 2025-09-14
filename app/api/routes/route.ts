import { NextResponse } from 'next/server';
import { getAllRoutes } from '@/lib/db/sqlite-queries';

export async function GET() {
  try {
    const routes = await getAllRoutes();

    return NextResponse.json(
      {
        success: true,
        data: routes
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Routes fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch routes'
      },
      { status: 500 }
    );
  }
}