import { NextResponse } from 'next/server';
import { getRouteById } from '@/lib/db/sqlite-queries';

interface RouteParams {
  params: {
    routeId: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const route = await getRouteById(params.routeId);

    if (!route) {
      return NextResponse.json(
        {
          success: false,
          message: 'Route not found'
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: route
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Route fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch route'
      },
      { status: 500 }
    );
  }
}