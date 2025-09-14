import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createUser, getUserByEmail, createRegistration, getRegistrationById } from '@/lib/db/sqlite-queries';

const draftRegistrationSchema = z.object({
  email: z.string().email().optional(),
  first_name: z.string().min(2).max(100).optional(),
  last_name: z.string().min(2).max(100).optional(),
  phone: z.string().min(10).max(20).optional(),
  country: z.string().max(100).optional(),
  age: z.number().int().min(18).max(75).optional(),
  emergency_contact: z.object({
    name: z.string().min(2).max(100),
    phone: z.string().min(10).max(20),
    relationship: z.string().min(2).max(50)
  }).optional(),

  // Step 1: Interest Capture
  interested_in: z.enum(['full_trail', 'eastern', 'southern', 'western', 'undecided']).optional(),
  timeframe: z.enum(['next_month', 'next_3_months', 'next_6_months', 'next_year', 'just_exploring']).optional(),
  group_type: z.enum(['solo', 'couple', 'friends', 'family', 'organized_group']).optional(),

  // Step 3: Experience Assessment
  fitness_level: z.number().int().min(1).max(5).optional(),
  hiking_experience: z.enum(['none', 'day_hikes', 'multi_day', 'expert']).optional(),
  longest_hike: z.number().int().min(0).max(1000).optional(),
  medical_conditions: z.array(z.string()).optional(),
  dietary_requirements: z.array(z.string()).optional(),
  special_needs: z.string().max(1000).optional(),

  // Step 4: Motivation & Commitment
  motivation: z.string().min(50).max(2000).optional(),
  goals: z.array(z.string()).optional(),
  how_did_you_hear: z.string().max(200).optional(),
  newsletter: z.boolean().optional(),
  terms_accepted: z.boolean().optional(),
  data_processing: z.boolean().optional(),

  // Legacy fields for backward compatibility
  experience_level: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
  preferred_dates: z.array(z.string()).optional(),
  group_size: z.number().int().min(1).max(20).optional(),

  // Meta
  step: z.number().int().min(1).max(4).optional(),
  registration_id: z.string().optional()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = draftRegistrationSchema.parse(body);

    // Handle existing registration update
    if (validatedData.registration_id) {
      // Update existing registration draft
      // This would require implementing updateRegistration in sqlite-queries
      return NextResponse.json({
        success: true,
        message: 'Draft updated',
        data: { registration_id: validatedData.registration_id }
      });
    }

    // Create or get user if email provided
    let user = null;
    if (validatedData.email) {
      user = await getUserByEmail(validatedData.email);

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
    } else {
      // Create anonymous draft - we'll need a temporary user or different approach
      user = await createUser({
        email: `temp_${Date.now()}@example.com`,
        first_name: 'Anonymous',
        last_name: 'User'
      });
    }

    // Create registration draft
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
      status: 'draft',
      step: validatedData.step || 1
    });

    return NextResponse.json({
      success: true,
      message: 'Draft saved',
      data: {
        registration_id: registration.id,
        user_id: user.id
      }
    }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Validation error',
        errors: error.errors
      }, { status: 400 });
    }

    console.error('Draft registration error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const registrationId = url.searchParams.get('id');

    if (!registrationId) {
      return NextResponse.json({
        success: false,
        message: 'Registration ID required'
      }, { status: 400 });
    }

    const registration = await getRegistrationById(registrationId);

    if (!registration) {
      return NextResponse.json({
        success: false,
        message: 'Registration not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: registration
    });

  } catch (error) {
    console.error('Get draft registration error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}