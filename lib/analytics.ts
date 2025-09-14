/**
 * Analytics & Tracking Utility Library
 * Implementation for FRIG-26: Analytics & Tracking
 */

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export type EventParameters = {
  [key: string]: string | number | boolean | undefined;
};

export type ConversionEvent = {
  currency?: string;
  value?: number;
  items?: Array<{
    item_name: string;
    item_category?: string;
    quantity?: number;
    price?: number;
  }>;
};

/**
 * Track a custom event with Google Analytics
 */
export const trackEvent = (eventName: string, parameters?: EventParameters): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    try {
      window.gtag('event', eventName, {
        ...parameters,
        // Add common parameters
        page_title: document.title,
        page_location: window.location.href,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.warn('Analytics tracking error:', error);
    }
  }
};

/**
 * Track page view
 */
export const trackPageView = (pagePath?: string): void => {
  const path = pagePath || window.location.pathname;
  trackEvent('page_view', {
    page_path: path,
    page_title: document.title,
  });
};

/**
 * Form tracking events
 */
export const formEvents = {
  start: (formId: string, formName?: string) =>
    trackEvent('form_start', {
      form_id: formId,
      form_name: formName || formId,
    }),

  step: (formId: string, stepNumber: number, stepName?: string) =>
    trackEvent('form_step', {
      form_id: formId,
      step: stepNumber,
      step_name: stepName,
    }),

  complete: (formId: string, formName?: string) =>
    trackEvent('form_complete', {
      form_id: formId,
      form_name: formName || formId,
    }),

  abandon: (formId: string, stepNumber: number, stepName?: string) =>
    trackEvent('form_abandon', {
      form_id: formId,
      step: stepNumber,
      step_name: stepName,
    }),

  error: (formId: string, errorMessage: string, fieldName?: string) =>
    trackEvent('form_error', {
      form_id: formId,
      error_message: errorMessage,
      field_name: fieldName,
    }),
};

/**
 * User interaction events
 */
export const userEvents = {
  routeSelect: (routeName: string, routeStage?: string) =>
    trackEvent('route_select', {
      route_name: routeName,
      route_stage: routeStage,
    }),

  downloadGPX: (routeName: string, routeStage?: string) =>
    trackEvent('download', {
      file_type: 'gpx',
      route: routeName,
      route_stage: routeStage,
    }),

  galleryView: (photoId: string, photoCategory?: string) =>
    trackEvent('gallery_view', {
      photo_id: photoId,
      photo_category: photoCategory,
    }),

  mapInteraction: (action: 'zoom' | 'pan' | 'marker_click', details?: Record<string, string | number | boolean>) =>
    trackEvent('map_interaction', {
      interaction_type: action,
      ...details,
    }),

  languageSwitch: (fromLanguage: string, toLanguage: string) =>
    trackEvent('language_switch', {
      from_language: fromLanguage,
      to_language: toLanguage,
    }),

  navigationClick: (linkText: string, linkDestination: string) =>
    trackEvent('navigation_click', {
      link_text: linkText,
      link_url: linkDestination,
    }),

  searchQuery: (searchTerm: string, searchCategory?: string) =>
    trackEvent('search', {
      search_term: searchTerm,
      search_category: searchCategory,
    }),
};

/**
 * Conversion events
 */
export const conversionEvents = {
  registration: (route?: string, source?: string) =>
    trackEvent('sign_up', {
      method: 'email',
      route: route,
      source: source,
    }),

  booking: (packageName: string, value: number, currency = 'EUR') =>
    trackEvent('purchase', {
      currency: currency,
      value: value,
      items: [{
        item_name: packageName,
        item_category: 'tour_package',
        quantity: 1,
        price: value,
      }],
    }),

  contactSubmit: (contactType: 'booking' | 'inquiry' | 'support', value?: number) =>
    trackEvent('generate_lead', {
      contact_type: contactType,
      value: value,
      currency: 'EUR',
    }),

  newsletterSignup: (location: string) =>
    trackEvent('sign_up', {
      method: 'newsletter',
      signup_location: location,
    }),
};

/**
 * E-commerce events
 */
export const ecommerceEvents = {
  viewItem: (itemName: string, itemCategory: string, value?: number) =>
    trackEvent('view_item', {
      currency: 'EUR',
      value: value || 0,
      items: [{
        item_name: itemName,
        item_category: itemCategory,
      }],
    }),

  addToCart: (itemName: string, value: number, quantity = 1) =>
    trackEvent('add_to_cart', {
      currency: 'EUR',
      value: value,
      items: [{
        item_name: itemName,
        item_category: 'tour_package',
        quantity: quantity,
        price: value,
      }],
    }),

  beginCheckout: (items: Array<{ item_name: string; item_category?: string; quantity?: number; price?: number }>, totalValue: number) =>
    trackEvent('begin_checkout', {
      currency: 'EUR',
      value: totalValue,
      items: items,
    }),
};

/**
 * Performance tracking
 */
export const performanceEvents = {
  timing: (name: string, value: number, category?: string) =>
    trackEvent('timing_complete', {
      name: name,
      value: Math.round(value),
      category: category || 'performance',
    }),

  loadError: (errorType: string, errorMessage: string, resource?: string) =>
    trackEvent('exception', {
      description: `${errorType}: ${errorMessage}`,
      fatal: false,
      resource: resource,
    }),
};

/**
 * Consent management
 */
export const consentEvents = {
  granted: (consentTypes: string[]) =>
    trackEvent('consent_update', {
      consent_types: consentTypes.join(','),
      consent_status: 'granted',
    }),

  denied: (consentTypes: string[]) =>
    trackEvent('consent_update', {
      consent_types: consentTypes.join(','),
      consent_status: 'denied',
    }),
};

/**
 * Initialize analytics with consent
 */
export const initializeAnalytics = (hasConsent: boolean = false): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    // Set initial consent state
    window.gtag('consent', 'default', {
      analytics_storage: hasConsent ? 'granted' : 'denied',
      ad_storage: hasConsent ? 'granted' : 'denied',
      wait_for_update: 2000,
    });

    if (hasConsent) {
      // Track initial page view
      trackPageView();
    }
  }
};

/**
 * Update consent
 */
export const updateConsent = (granted: boolean): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: granted ? 'granted' : 'denied',
    });

    if (granted) {
      consentEvents.granted(['analytics_storage', 'ad_storage']);
      // Track page view after consent
      trackPageView();
    } else {
      consentEvents.denied(['analytics_storage', 'ad_storage']);
    }
  }
};

/**
 * Debug mode helpers
 */
export const debugAnalytics = {
  isEnabled: () => typeof window !== 'undefined' && window.location.search.includes('debug=analytics'),

  log: (eventName: string, parameters?: Record<string, unknown>) => {
    if (debugAnalytics.isEnabled()) {
      console.log(`[Analytics Debug] ${eventName}:`, parameters);
    }
  },
};

// Default export with all utilities
export default {
  trackEvent,
  trackPageView,
  formEvents,
  userEvents,
  conversionEvents,
  ecommerceEvents,
  performanceEvents,
  consentEvents,
  initializeAnalytics,
  updateConsent,
  debugAnalytics,
};