'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ContactHero from '@/components/contact/ContactHero';
import BookingOptions from '@/components/contact/BookingOptions';
import ContactForm from '@/components/contact/ContactForm';
import FAQ from '@/components/contact/FAQ';
import LiveChat from '@/components/contact/LiveChat';
import OfficeMap from '@/components/contact/OfficeMap';

export default function ContactPage() {
  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <ContactHero />

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Booking Options */}
          <div className="mb-16">
            <BookingOptions />
          </div>

          {/* Contact Form & Office Info Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <ContactForm />
            <div className="space-y-8">
              <OfficeMap />
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <FAQ />
          </div>

          {/* Live Chat */}
          <LiveChat />
        </div>
      </section>

      <Footer />
    </>
  );
}