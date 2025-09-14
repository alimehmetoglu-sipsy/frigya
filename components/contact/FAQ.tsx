'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, ThumbsUp, ExternalLink } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  relatedArticles?: string[];
  helpful?: number;
}

interface FAQCategory {
  general: FAQItem[];
  booking: FAQItem[];
  safety: FAQItem[];
  equipment: FAQItem[];
}

const faqCategories: FAQCategory = {
  general: [
    {
      question: "How fit do I need to be?",
      answer: "The Phrygian Way requires moderate fitness. You should be comfortable walking 6-8 hours per day on varied terrain. Regular hiking experience is beneficial but not mandatory. We recommend starting a training program 2-3 months before your trip, including regular walks and some hill climbing.",
      relatedArticles: ['/travel-tips#fitness'],
      helpful: 142
    },
    {
      question: "What is the best time to hike the Phrygian Way?",
      answer: "The ideal hiking seasons are spring (April-June) and autumn (September-November). Spring offers wildflowers and green landscapes, while autumn provides comfortable temperatures and golden colors. Summer can be hot, and winter trails may have snow at higher elevations.",
      relatedArticles: ['/travel-tips#seasons'],
      helpful: 98
    },
    {
      question: "How long does it take to complete the entire trail?",
      answer: "The complete Phrygian Way typically takes 18-25 days depending on your pace and chosen route variations. Most hikers average 15-25 km per day. We offer various package durations from weekend trips to the full trail experience.",
      helpful: 87
    },
    {
      question: "Can I hike the trail independently?",
      answer: "Yes, independent hiking is possible as the trail is marked. However, we recommend guided tours for safety, local insights, and logistics support. Solo hikers should have good navigation skills and carry appropriate maps and GPS devices.",
      relatedArticles: ['/routes'],
      helpful: 76
    }
  ],
  booking: [
    {
      question: "What is included in the tour packages?",
      answer: "Our standard packages include professional guides, accommodation, breakfast and dinner, luggage transfer between stages, trail maps, and a completion certificate. Premium packages add lunch, equipment rental, and airport transfers. Check each package for specific inclusions.",
      helpful: 124
    },
    {
      question: "How far in advance should I book?",
      answer: "We recommend booking at least 2-3 months in advance for peak season (April-June, September-October) and 1 month for other periods. Group bookings may require additional notice. Last-minute bookings are sometimes possible subject to availability.",
      helpful: 89
    },
    {
      question: "What is your cancellation policy?",
      answer: "Cancellations made 30+ days before departure receive a 90% refund. 15-29 days: 50% refund. Less than 15 days: no refund. We strongly recommend travel insurance. In case of force majeure, we offer full credit for future bookings.",
      helpful: 92
    },
    {
      question: "Do you offer group discounts?",
      answer: "Yes! Groups of 4+ receive 5% discount, 6+ get 10%, and 10+ get 15% off. School groups and non-profits may qualify for additional discounts. Private group tours can be customized to your preferences.",
      helpful: 67
    }
  ],
  safety: [
    {
      question: "Is the trail safe for solo travelers?",
      answer: "The Phrygian Way is generally safe, passing through welcoming villages. However, we recommend hiking with others for safety. Solo travelers can join our group tours. Always inform someone of your plans and carry emergency contacts.",
      relatedArticles: ['/travel-tips#safety'],
      helpful: 103
    },
    {
      question: "What emergency services are available?",
      answer: "Emergency services (112) cover most of the trail area. Mobile coverage is good near villages but spotty in remote sections. Our guided tours include emergency support and first aid. We recommend carrying a whistle and emergency shelter.",
      helpful: 95
    },
    {
      question: "Are there dangerous animals on the trail?",
      answer: "The trail is home to various wildlife, but dangerous encounters are extremely rare. You might see wild boar, foxes, and various birds. Shepherd dogs can be territorial - stay calm and give them space. No venomous snakes pose significant danger.",
      helpful: 88
    },
    {
      question: "What about water sources?",
      answer: "Villages along the route have reliable water sources. Natural springs are marked but should be treated. Carry 3-4 liters in summer, 2-3 in cooler months. Our guides know all reliable water points along the trail.",
      helpful: 91
    }
  ],
  equipment: [
    {
      question: "What equipment do I need?",
      answer: "Essential items: sturdy hiking boots, 40-50L backpack, weather-appropriate clothing layers, rain gear, sun protection, first aid kit, headlamp, trekking poles (recommended), and sleeping bag if camping. We provide a detailed packing list upon booking.",
      relatedArticles: ['/travel-tips#equipment'],
      helpful: 156
    },
    {
      question: "Can I rent equipment locally?",
      answer: "Basic equipment rental is available in major towns. We partner with local suppliers for backpacks, sleeping bags, and trekking poles. Advanced booking recommended. Quality hiking boots should be brought from home and broken in before the trip.",
      helpful: 73
    },
    {
      question: "Do I need camping equipment?",
      answer: "Only if you plan to camp. Most hikers stay in guesthouses and pensions. Designated camping areas exist but are basic. If camping, bring a tent, sleeping bag rated for the season, and cooking equipment. Wild camping requires permission.",
      helpful: 64
    },
    {
      question: "What type of shoes are recommended?",
      answer: "Waterproof hiking boots with ankle support are essential. They should be well broken-in before your trip. Trail runners are suitable for experienced hikers in dry conditions. Bring camp shoes for evenings. Avoid new footwear on the trail.",
      helpful: 112
    }
  ]
};

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<keyof FAQCategory>('general');
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, boolean>>({});

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleHelpful = (category: string, index: number) => {
    const key = `${category}-${index}`;
    if (!helpfulVotes[key]) {
      setHelpfulVotes(prev => ({ ...prev, [key]: true }));
    }
  };

  const filteredFAQs = faqCategories[activeCategory].filter(
    item =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [
    { id: 'general', label: 'General', count: faqCategories.general.length },
    { id: 'booking', label: 'Booking', count: faqCategories.booking.length },
    { id: 'safety', label: 'Safety', count: faqCategories.safety.length },
    { id: 'equipment', label: 'Equipment', count: faqCategories.equipment.length }
  ];

  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Find answers to common questions about the Phrygian Way trail, booking, and preparation.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => {
              setActiveCategory(category.id as keyof FAQCategory);
              setOpenItems([]);
            }}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              activeCategory === category.id
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.label}
            <span className="ml-2 text-sm opacity-75">({category.count})</span>
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No FAQs found matching your search.
              </div>
            ) : (
              filteredFAQs.map((item, index) => {
                const isOpen = openItems.includes(index);
                const key = `${activeCategory}-${index}`;
                const isHelpful = helpfulVotes[key];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-semibold text-lg pr-4">{item.question}</h3>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-gray-200"
                        >
                          <div className="px-6 py-4">
                            <p className="text-gray-700 mb-4">{item.answer}</p>

                            {item.relatedArticles && item.relatedArticles.length > 0 && (
                              <div className="mb-4">
                                <p className="text-sm font-semibold text-gray-600 mb-2">Related articles:</p>
                                <div className="flex flex-wrap gap-2">
                                  {item.relatedArticles.map((article, i) => (
                                    <a
                                      key={i}
                                      href={article}
                                      className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                                    >
                                      {article.replace('/', '').replace('#', ' - ')}
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                              <button
                                onClick={() => handleHelpful(activeCategory, index)}
                                disabled={isHelpful}
                                className={`flex items-center gap-2 text-sm ${
                                  isHelpful
                                    ? 'text-green-600 cursor-default'
                                    : 'text-gray-600 hover:text-primary-600'
                                }`}
                              >
                                <ThumbsUp className={`w-4 h-4 ${isHelpful ? 'fill-current' : ''}`} />
                                <span>
                                  {isHelpful ? 'Thanks!' : 'Helpful'}
                                  {item.helpful && ` (${item.helpful + (isHelpful ? 1 : 0)})`}
                                </span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Additional Help */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">
          Can't find what you're looking for?
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            Contact Support
          </button>
          <button className="border border-primary-600 text-primary-600 px-6 py-2 rounded-lg hover:bg-primary-50 transition-colors">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
}