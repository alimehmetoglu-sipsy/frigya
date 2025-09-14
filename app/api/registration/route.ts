import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createUser, getUserByEmail, createRegistration } from '@/lib/db/sqlite-queries';

const registrationSchema = z.object({
  // Personal Information (Required)
  email: z.string().email(),
  first_name: z.string().min(2).max(100),
  last_name: z.string().min(2).max(100),
  phone: z.string().min(10).max(20),
  country: z.string().max(100).optional(),
  age: z.number().int().min(18).max(75).optional(),
  emergency_contact: z.object({
    name: z.string().min(2).max(100),
    phone: z.string().min(10).max(20),
    relationship: z.string().min(2).max(50)
  }).optional(),

  // Step 1: Interest Capture (Required)
  interested_in: z.enum(['full_trail', 'eastern', 'southern', 'western', 'undecided']),
  timeframe: z.enum(['next_month', 'next_3_months', 'next_6_months', 'next_year', 'just_exploring']),
  group_type: z.enum(['solo', 'couple', 'friends', 'family', 'organized_group']),

  // Step 3: Experience Assessment (Required)
  fitness_level: z.number().int().min(1).max(5),
  hiking_experience: z.enum(['none', 'day_hikes', 'multi_day', 'expert']),
  longest_hike: z.number().int().min(0).max(1000).optional(),
  medical_conditions: z.array(z.string()).optional(),
  dietary_requirements: z.array(z.string()).optional(),
  special_needs: z.string().max(1000).optional(),

  // Step 4: Motivation & Commitment (Required)
  motivation: z.string().min(50).max(2000),
  goals: z.array(z.string()),
  how_did_you_hear: z.string().max(200),
  newsletter: z.boolean().default(false),
  terms_accepted: z.boolean().refine(val => val === true, "You must accept the terms"),
  data_processing: z.boolean().refine(val => val === true, "You must consent to data processing"),

  // Legacy fields for backward compatibility
  experience_level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
  preferred_dates: z.array(z.string()).optional(),
  group_size: z.number().int().min(1).max(20).optional()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validatedData = registrationSchema.parse(body);

    let user = await getUserByEmail(validatedData.email);

    if (!user) {
      user = await createUser({
        email: validatedData.email,
        first_name: validatedData.first_name,
        last_name: validatedData.last_name,
        phone: validatedData.phone,
        country: validatedData.country,
        age: validatedData.age,
        emergency_contact: validatedData.emergency_contact
      });
    }

    const registration = await createRegistration({
      user_id: user.id,
      interested_in: validatedData.interested_in,
      timeframe: validatedData.timeframe,
      group_type: validatedData.group_type,
      fitness_level: validatedData.fitness_level,
      hiking_experience: validatedData.hiking_experience,
      longest_hike: validatedData.longest_hike,
      medical_conditions: validatedData.medical_conditions,
      dietary_requirements: validatedData.dietary_requirements,
      special_needs: validatedData.special_needs,
      motivation: validatedData.motivation,
      goals: validatedData.goals,
      how_did_you_hear: validatedData.how_did_you_hear,
      newsletter: validatedData.newsletter,
      terms_accepted: validatedData.terms_accepted,
      data_processing: validatedData.data_processing,
      experience_level: validatedData.experience_level,
      preferred_dates: validatedData.preferred_dates,
      group_size: validatedData.group_size,
      status: 'pending',
      step: 4
    });

    // Track successful submission
    try {
      await fetch('/api/analytics/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: 'form_submitted',
          event_data: {
            step: 4,
            form_completion_rate: 1.0,
            registration_id: registration.id
          },
          user_id: user.id,
          session_id: request.headers.get('x-session-id')
        })
      });
    } catch (analyticsError) {
      console.warn('Analytics tracking failed:', analyticsError);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful',
        data: { registration_id: registration.id }
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

    console.error('Registration error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error'
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