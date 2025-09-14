'use client';

import { useState, FormEvent, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Paperclip, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { formEvents, conversionEvents, debugAnalytics } from '@/lib/analytics';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: 'general' | 'booking' | 'support' | 'partnership';
  message: string;
  preferredContact: 'email' | 'phone' | 'whatsapp';
  attachments?: File[];
}

const subjectOptions = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'booking', label: 'Tour Booking' },
  { value: 'support', label: 'Customer Support' },
  { value: 'partnership', label: 'Partnership Opportunity' }
];

const contactPreferences = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'whatsapp', label: 'WhatsApp' }
];

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
    preferredContact: 'email'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [ticketNumber, setTicketNumber] = useState<string>('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [formStarted, setFormStarted] = useState(false);

  // Track form start when user first interacts
  useEffect(() => {
    if (!formStarted && (formData.name || formData.email || formData.message)) {
      setFormStarted(true);
      formEvents.start('contact-form', 'Contact Form');
      debugAnalytics.log('Contact form started');
    }
  }, [formData, formStarted]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate ticket number
      const ticket = `PHR-${Date.now().toString().slice(-6)}`;
      setTicketNumber(ticket);

      // Track successful form completion
      formEvents.complete('contact-form', 'Contact Form');

      // Track conversion event based on subject
      const contactType = formData.subject === 'booking' ? 'booking' :
                         formData.subject === 'support' ? 'support' : 'inquiry';
      const estimatedValue = formData.subject === 'booking' ? 2500 : undefined; // Estimated booking value
      conversionEvents.contactSubmit(contactType, estimatedValue);

      debugAnalytics.log('Contact form completed', {
        subject: formData.subject,
        ticketNumber: ticket,
        hasAttachments: attachedFiles.length > 0
      });

      setIsSubmitting(false);
      setSubmitStatus('success');

      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'general',
          message: '',
          preferredContact: 'email'
        });
        setAttachedFiles([]);
        setSubmitStatus('idle');
        setFormStarted(false);
      }, 5000);
    } catch (error) {
      // Track form error
      formEvents.error('contact-form', 'Submission failed');
      debugAnalytics.log('Contact form error', error);

      setIsSubmitting(false);
      setSubmitStatus('error');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles = files.filter(file => file.size <= 10 * 1024 * 1024); // 10MB limit
      setAttachedFiles(prev => [...prev, ...validFiles]);

      // Track file attachment
      if (validFiles.length > 0) {
        debugAnalytics.log('Files attached to contact form', {
          fileCount: validFiles.length,
          totalSize: validFiles.reduce((sum, file) => sum + file.size, 0)
        });
      }

      if (files.length !== validFiles.length) {
        formEvents.error('contact-form', 'File too large', 'file-upload');
        alert('Some files were too large (max 10MB per file)');
      }
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>

      {submitStatus === 'success' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-12 text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h4 className="text-xl font-bold text-green-800 mb-2">Message Sent Successfully!</h4>
          <p className="text-gray-600 mb-4">
            Your ticket number is: <span className="font-mono font-bold">{ticketNumber}</span>
          </p>
          <p className="text-gray-600">
            We'll respond within 24 hours to your preferred contact method.
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Email Address *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>
          </div>

          {/* Phone and Subject Row */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="+90 XXX XXX XXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Subject *</label>
              <select
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value as ContactFormData['subject'] })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {subjectOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Preferred Contact Method */}
          <div>
            <label className="block text-sm font-semibold mb-2">Preferred Contact Method</label>
            <div className="flex gap-4">
              {contactPreferences.map(pref => (
                <label key={pref.value} className="flex items-center">
                  <input
                    type="radio"
                    name="preferredContact"
                    value={pref.value}
                    checked={formData.preferredContact === pref.value}
                    onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value as ContactFormData['preferredContact'] })}
                    className="mr-2"
                  />
                  <span className="text-sm">{pref.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-semibold mb-2">Message *</label>
            <textarea
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Tell us about your inquiry or travel plans..."
            />
          </div>

          {/* File Attachments */}
          <div>
            <label className="block text-sm font-semibold mb-2">Attachments (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center gap-2 cursor-pointer text-gray-600 hover:text-primary-600"
              >
                <Paperclip className="w-5 h-5" />
                <span>Click to attach files (max 10MB per file)</span>
              </label>

              {attachedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {attachedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">Response Time</p>
                <p>We typically respond within 24 hours. For urgent matters, please call us directly or use our live chat feature below.</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Message
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}