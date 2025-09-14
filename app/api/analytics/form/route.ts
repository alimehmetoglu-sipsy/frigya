import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAnalyticsEvent } from '@/lib/db/sqlite-queries';

const formAnalyticsSchema = z.object({
  event_type: z.enum([
    'form_started',
    'step_completed',
    'step_abandoned',
    'form_submitted',
    'validation_error',
    'exit_intent',
    'field_focused',
    'field_blurred'
  ]),
  event_data: z.object({
    step: z.number().int().min(1).max(4).optional(),
    field: z.string().optional(),
    error: z.string().optional(),
    time_spent: z.number().int().optional(),
    form_completion_rate: z.number().min(0).max(1).optional(),
    registration_id: z.string().optional()
  }).optional(),
  user_id: z.string().optional(),
  session_id: z.string().optional(),
  ip_address: z.string().optional(),
  user_agent: z.string().optional(),
  referrer: z.string().optional()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = formAnalyticsSchema.parse(body);

    // Get client IP and user agent from headers
    const clientIp = request.headers.get('x-forwarded-for') ||
                    request.headers.get('x-real-ip') ||
                    'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referrer = request.headers.get('referer') || validatedData.referrer;

    const event = await createAnalyticsEvent({
      event_type: validatedData.event_type,
      event_data: validatedData.event_data,
      user_id: validatedData.user_id,
      session_id: validatedData.session_id,
      ip_address: clientIp,
      user_agent: userAgent,
      referrer: referrer
    });

    return NextResponse.json({
      success: true,
      data: { event_id: event.id }
    }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Validation error',
        errors: error.errors
      }, { status: 400 });
    }

    console.error('Form analytics error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    // This would implement analytics dashboard queries
    // For now, return method not allowed
    return NextResponse.json({
      success: false,
      message: 'Analytics dashboard not implemented yet'
    }, { status: 501 });

  } catch (error) {
    console.error('Get analytics error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}