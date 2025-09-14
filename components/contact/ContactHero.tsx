'use client';

import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const contactMethods = [
  { type: 'email', value: 'info@phrygianway.com', icon: Mail, label: 'Email Us' },
  { type: 'phone', value: '+90 272 XXX XXXX', icon: Phone, label: 'Call Us' },
  { type: 'whatsapp', value: '+90 XXX XXX XXXX', icon: MessageCircle, label: 'WhatsApp' },
  { type: 'office', value: 'Afyonkarahisar, Turkey', icon: MapPin, label: 'Visit Us' }
];

export default function ContactHero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-800 to-primary-900 text-white py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Start Your Phrygian Adventure
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
            We're here to help plan your perfect journey through ancient trails and modern experiences
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{method.label}</h3>
                  <p className="text-primary-100 text-sm">{method.value}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-primary-100">
            Business Hours: Monday - Friday, 09:00 - 18:00 (GMT+3)
          </p>
          <p className="text-primary-100 mt-2">
            Weekend Support: Saturday - Sunday, 10:00 - 16:00 (GMT+3)
          </p>
        </motion.div>
      </div>
    </section>
  );
}