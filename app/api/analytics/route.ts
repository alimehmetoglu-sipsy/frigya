import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { z } from 'zod';
import { createAnalyticsEvent } from '@/lib/db/sqlite-queries';

const analyticsSchema = z.object({
  event_type: z.string().min(1).max(100),
  event_data: z.any().optional(),
  user_id: z.string().optional(),
  session_id: z.string().optional()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const headersList = headers();

    const validatedData = analyticsSchema.parse(body);

    const ip_address = headersList.get('x-forwarded-for') ||
                      headersList.get('x-real-ip') ||
                      'unknown';
    const user_agent = headersList.get('user-agent') || 'unknown';
    const referrer = headersList.get('referer') || undefined;

    const event = await createAnalyticsEvent({
      event_type: validatedData.event_type,
      event_data: validatedData.event_data,
      user_id: validatedData.user_id,
      session_id: validatedData.session_id,
      ip_address,
      user_agent,
      referrer
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Event tracked successfully',
        data: { event_id: event.id }
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error',
          errors: error.errors
        },
        { status: 400 }
      );
    }

    console.error('Analytics error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to track event'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      message: 'Method not allowed'
    },
    { status: 405 }
  );
}