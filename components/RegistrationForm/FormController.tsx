'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { RegistrationFormData, Step1Data, Step2Data, Step3Data, Step4Data, FormErrors } from './types';
import Step1InterestCaptureIntl from './Step1InterestCaptureIntl';
import Step2PersonalInfoIntl from './Step2PersonalInfoIntl';
import Step3ExperienceIntl from './Step3ExperienceIntl';
import Step4MotivationIntl from './Step4MotivationIntl';

const STORAGE_KEY = 'frigya_registration_draft';

export default function FormController() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('registration');
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  const [formData, setFormData] = useState<RegistrationFormData>({
    // Step 1: Interest Capture
    interestedIn: 'undecided',
    timeframe: 'just_exploring',
    groupType: 'solo',

    // Step 2: Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    age: 0,
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },

    // Step 3: Experience Assessment
    fitnessLevel: 3,
    hikingExperience: 'day_hikes',
    longestHike: 0,
    medicalConditions: [],
    dietaryRequirements: [],
    specialNeeds: '',

    // Step 4: Motivation & Commitment
    motivation: '',
    goals: [],
    howDidYouHear: '',
    newsletter: false,
    termsAccepted: false,
    dataProcessing: false
  });

  // Load saved draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem(STORAGE_KEY);
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft);
        setFormData({ ...formData, ...parsed });
        setCurrentStep(parsed.lastStep || 1);
      } catch (error) {
        console.warn('Failed to load saved draft:', error);
      }
    }

    // Track form start
    trackFormEvent('form_started', { step: currentStep });
  }, []);

  // Auto-save draft
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const draftData = { ...formData, lastStep: currentStep };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draftData));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [formData, currentStep]);

  const trackFormEvent = async (eventType: string, eventData: any) => {
    try {
      await fetch('/api/analytics/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: eventType,
          event_data: eventData,
          session_id: sessionId,
        })
      });
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  };

  const updateFormData = (stepData: Partial<RegistrationFormData>) => {
    setFormData(prev => ({ ...prev, ...stepData }));
    setErrors({});
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    switch (step) {
      case 1:
        if (!formData.interestedIn) newErrors.interestedIn = t('errors.routeRequired');
        if (!formData.timeframe) newErrors.timeframe = t('errors.timeframeRequired');
        if (!formData.groupType) newErrors.groupType = t('errors.groupTypeRequired');
        break;

      case 2:
        if (!formData.firstName || formData.firstName.length < 2) {
          newErrors.firstName = t('errors.firstNameMin');
        }
        if (!formData.lastName || formData.lastName.length < 2) {
          newErrors.lastName = t('errors.lastNameMin');
        }
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = t('errors.emailInvalid');
        }
        if (!formData.phone || formData.phone.length < 10) {
          newErrors.phone = t('errors.phoneInvalid');
        }
        if (formData.age && (formData.age < 18 || formData.age > 75)) {
          newErrors.age = t('errors.ageRange');
        }
        break;

      case 3:
        if (!formData.fitnessLevel) newErrors.fitnessLevel = t('errors.fitnessRequired');
        if (!formData.hikingExperience) newErrors.hikingExperience = t('errors.experienceRequired');
        break;

      case 4:
        const wordCount = formData.motivation ? formData.motivation.trim().split(/\s+/).filter(w => w.length > 0).length : 0;
        if (wordCount < 50) {
          newErrors.motivation = t('errors.motivationMin', { current: wordCount, min: 50 });
        }
        if (!formData.goals || formData.goals.length === 0) {
          newErrors.goals = t('errors.goalsRequired');
        }
        if (!formData.howDidYouHear) {
          newErrors.howDidYouHear = t('errors.fieldRequired');
        }
        if (!formData.termsAccepted) {
          newErrors.termsAccepted = t('errors.termsRequired');
        }
        if (!formData.dataProcessing) {
          newErrors.dataProcessing = t('errors.dataProcessingRequired');
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToStep = (step: number) => {
    if (step < 1 || step > 4) return;

    // Track step abandonment if going backwards
    if (step < currentStep) {
      trackFormEvent('step_abandoned', {
        from_step: currentStep,
        to_step: step,
        completion_rate: (currentStep - 1) / 4
      });
    }

    setCurrentStep(step);
    setErrors({});

    // Track step navigation
    trackFormEvent('step_completed', {
      step: step,
      completion_rate: (step - 1) / 4
    });
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      trackFormEvent('step_completed', {
        step: currentStep,
        completion_rate: currentStep / 4
      });
      goToStep(currentStep + 1);
    } else {
      trackFormEvent('validation_error', {
        step: currentStep,
        errors: Object.keys(errors)
      });
    }
  };

  const prevStep = () => {
    goToStep(currentStep - 1);
  };

  const submitForm = async () => {
    if (!validateStep(4)) {
      trackFormEvent('validation_error', {
        step: 4,
        errors: Object.keys(errors)
      });
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage('');

    try {
      // Prepare submission data
      const submissionData = {
        // Personal Information
        email: formData.email,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        country: formData.country || undefined,
        age: formData.age || undefined,
        emergency_contact: formData.emergencyContact?.name ? formData.emergencyContact : undefined,

        // Step 1: Interest Capture
        interested_in: formData.interestedIn,
        timeframe: formData.timeframe,
        group_type: formData.groupType,

        // Step 3: Experience Assessment
        fitness_level: formData.fitnessLevel,
        hiking_experience: formData.hikingExperience,
        longest_hike: formData.longestHike || undefined,
        medical_conditions: formData.medicalConditions?.length ? formData.medicalConditions : undefined,
        dietary_requirements: formData.dietaryRequirements?.length ? formData.dietaryRequirements : undefined,
        special_needs: formData.specialNeeds || undefined,

        // Step 4: Motivation & Commitment
        motivation: formData.motivation,
        goals: formData.goals,
        how_did_you_hear: formData.howDidYouHear,
        newsletter: formData.newsletter,
        terms_accepted: formData.termsAccepted,
        data_processing: formData.dataProcessing,

        // Legacy compatibility
        experience_level: 'intermediate',
        group_size: 1
      };

      const response = await fetch('/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId
        },
        body: JSON.stringify(submissionData)
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400 && data.errors) {
          const apiErrors: FormErrors = {};
          data.errors.forEach((error: any) => {
            const field = error.path?.[0] || 'general';
            apiErrors[field] = error.message;
          });
          setErrors(apiErrors);
        } else {
          setErrors({ general: data.message || t('errors.general') });
        }
      } else {
        setSuccessMessage(t('success.message'));

        // Clear saved draft
        localStorage.removeItem(STORAGE_KEY);

        // Track successful submission
        trackFormEvent('form_submitted', {
          registration_id: data.data?.registration_id,
          completion_rate: 1.0
        });

        // Redirect after success
        setTimeout(() => {
          router.push(`/${locale}/kayit/tesekkurler?id=${data.data?.registration_id}`);
        }, 2000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: t('errors.connection') });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Exit intent detection
  useEffect(() => {
    let exitIntentTriggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentTriggered && currentStep > 1 && currentStep < 4) {
        exitIntentTriggered = true;
        trackFormEvent('exit_intent', {
          step: currentStep,
          completion_rate: (currentStep - 1) / 4
        });
        // Could show exit intent modal here
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [currentStep, sessionId]);

  const renderCurrentStep = () => {
    const stepProps = {
      errors,
      onUpdate: updateFormData
    };

    switch (currentStep) {
      case 1:
        return (
          <Step1InterestCaptureIntl
            data={formData}
            onNext={nextStep}
            {...stepProps}
          />
        );
      case 2:
        return (
          <Step2PersonalInfoIntl
            data={formData}
            onNext={nextStep}
            onBack={prevStep}
            {...stepProps}
          />
        );
      case 3:
        return (
          <Step3ExperienceIntl
            data={formData}
            onNext={nextStep}
            onBack={prevStep}
            {...stepProps}
          />
        );
      case 4:
        return (
          <Step4MotivationIntl
            data={formData}
            onSubmit={submitForm}
            onBack={prevStep}
            isSubmitting={isSubmitting}
            {...stepProps}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('title')}
            </h1>
            <p className="text-gray-600">
              {t('subtitle')}
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg text-center">
              <div className="text-4xl mb-2">🎉</div>
              <p className="text-green-800 text-lg font-semibold">{successMessage}</p>
              <p className="text-green-600 text-sm mt-2">
                {t('success.redirecting')}
              </p>
            </div>
          )}

          {/* General Error */}
          {errors.general && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {errors.general}
            </div>
          )}

          {/* Form Content */}
          {renderCurrentStep()}

          {/* Step Navigation (Optional - for debugging) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 pt-4 border-t border-gray-200">
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4].map(step => (
                  <button
                    key={step}
                    onClick={() => goToStep(step)}
                    className={`px-3 py-1 rounded text-sm ${
                      step === currentStep
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Live Notifications (Social Proof) */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-blue-600">12</span> {t('social.currentUsers')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}