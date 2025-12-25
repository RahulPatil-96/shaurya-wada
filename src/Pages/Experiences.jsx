import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Map, Camera, Coffee, History, Check, Clock, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ExperiencesPage() {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const experiencePackages = [
    {
      id: 'heritage-tour',
      title: 'Peshwa Heritage Tour',
      description: 'Explore the rich Maratha history and architectural marvels of Pune',
      duration: 'Full Day',
      price: 2500,
      highlights: ['Shaniwar Wada', 'Aga Khan Palace', 'Parvati Hill Temple'],
      itinerary: [
        { time: '9:00 AM', activity: 'Shaniwar Wada Visit', details: 'Explore the historic fort and learn about Maratha history' },
        { time: '11:00 AM', activity: 'Aga Khan Palace', details: 'Visit the beautiful palace with its gardens and museum' },
        { time: '1:00 PM', activity: 'Traditional Lunch', details: 'Maharashtrian thali at a heritage restaurant' },
        { time: '3:00 PM', activity: 'Parvati Hill Temple', details: 'Climb the hill for panoramic views and temple visit' },
        { time: '6:00 PM', activity: 'Return to Hotel', details: 'Relax with traditional music and tea' }
      ]
    },
    {
      id: 'culinary-journey',
      title: 'Maharashtrian Culinary Journey',
      description: 'Taste the authentic flavors of Maharashtra with expert guidance',
      duration: 'Half Day',
      price: 1800,
      highlights: ['Street Food Tour', 'Traditional Cooking', 'Wine Tasting'],
      itinerary: [
        { time: '10:00 AM', activity: 'Street Food Exploration', details: 'Visit local markets and try authentic street food' },
        { time: '12:00 PM', activity: 'Cooking Demonstration', details: 'Learn to make traditional Maharashtrian dishes' },
        { time: '2:00 PM', activity: 'Wine & Cheese Pairing', details: 'Experience local wines with regional cheeses' },
        { time: '4:00 PM', activity: 'Return to Hotel', details: 'End with traditional sweets and tea' }
      ]
    },
    {
      id: 'photography-adventure',
      title: 'Pune Photography Adventure',
      description: 'Capture the beauty of Pune through professional photography sessions',
      duration: 'Full Day',
      price: 3200,
      highlights: ['Golden Hour Shots', 'Heritage Sites', 'Local Culture'],
      itinerary: [
        { time: '6:00 AM', activity: 'Golden Hour at Lakes', details: 'Early morning photography at Pune lakes' },
        { time: '9:00 AM', activity: 'Heritage Photography', details: 'Professional shots at historic sites' },
        { time: '12:00 PM', activity: 'Local Culture Session', details: 'Photograph traditional artisans and markets' },
        { time: '3:00 PM', activity: 'Post-Processing Workshop', details: 'Learn basic photo editing techniques' },
        { time: '6:00 PM', activity: 'Sunset Session', details: 'Capture the city at dusk' }
      ]
    },
    {
      id: 'wellness-retreat',
      title: 'Royal Wellness Retreat',
      description: 'Rejuvenate with traditional Ayurvedic treatments and yoga',
      duration: 'Half Day',
      price: 2200,
      highlights: ['Ayurvedic Massage', 'Yoga Session', 'Meditation'],
      itinerary: [
        { time: '9:00 AM', activity: 'Welcome & Consultation', details: 'Ayurvedic consultation and wellness assessment' },
        { time: '10:00 AM', activity: 'Traditional Massage', details: 'Full body Ayurvedic massage with herbal oils' },
        { time: '12:00 PM', activity: 'Yoga & Meditation', details: 'Guided yoga session followed by meditation' },
        { time: '1:30 PM', activity: 'Herbal Lunch', details: 'Ayurvedic balanced meal with fresh herbs' },
        { time: '3:00 PM', activity: 'Relaxation & Tea', details: 'Final relaxation with herbal tea' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-cream pb-20">
      <div className="bg-royal-brown text-cream py-20 text-center relative">
        <div className="absolute inset-0 pattern-jaali opacity-10" />
        <h1 className="text-4xl md:text-6xl font-['Cinzel'] text-gold mb-6 relative z-10">
          ROYAL EXPERIENCES
        </h1>
        <p className="text-lg font-['Lora'] max-w-2xl mx-auto opacity-80 relative z-10">
          Discover curated experiences that showcase the heritage and culture of Pune.
        </p>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        {!selectedPackage ? (
          <div className="grid md:grid-cols-2 gap-8">
            {experiencePackages.map((pkg) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-xl overflow-hidden border border-gold/20"
              >
                <div className="bg-royal-brown text-cream p-6">
                  <h3 className="text-2xl font-['Cinzel'] text-gold mb-2">{pkg.title}</h3>
                  <p className="text-cream/80 font-['Lora'] mb-4">{pkg.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-orange" />
                        <span>{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-orange" />
                        <span>Private Tour</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold font-['Cinzel'] text-gold">₹{pkg.price}</div>
                      <div className="text-xs text-cream/60">per person</div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="font-bold text-maroon mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4 text-orange" />
                    Highlights
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {pkg.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-maroon/70">
                        <Check className="w-4 h-4 text-orange" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelectedPackage(pkg)}
                    className="w-full bg-orange text-white py-3 rounded font-bold hover:bg-[#B7410E] transition-colors"
                  >
                    View Details & Book
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-4xl mx-auto border border-gold">
            <div className="bg-royal-brown text-cream p-8">
              <button
                onClick={() => setSelectedPackage(null)}
                className="text-gold hover:text-cream mb-4 flex items-center gap-2"
              >
                ← Back to Experiences
              </button>
              <h2 className="text-3xl font-['Cinzel'] text-gold mb-2">{selectedPackage.title}</h2>
              <p className="text-cream/80 font-['Lora']">{selectedPackage.description}</p>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-['Cinzel'] text-maroon mb-4">Experience Highlights</h3>
                  <ul className="space-y-3">
                    {selectedPackage.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-orange" />
                        <span className="text-maroon/80">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-['Cinzel'] text-maroon mb-4">Package Details</h3>
                  <div className="space-y-3 text-maroon/80">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-semibold">{selectedPackage.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Group Size:</span>
                      <span className="font-semibold">Private Tour</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Language:</span>
                      <span className="font-semibold">English/Hindi</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Includes:</span>
                      <span className="font-semibold">Transport, Guide, Entry</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-cream p-6 rounded-lg border border-gold/40 mb-8">
                <h3 className="font-bold text-maroon mb-4 flex items-center gap-2">
                  <Map className="w-5 h-5 text-orange" /> Detailed Itinerary
                </h3>
                <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gold/30">
                  {selectedPackage.itinerary.map((item, i) => (
                    <div key={i} className="relative pl-10">
                      <div className="absolute left-4 w-2 h-2 bg-orange rounded-full mt-2 transform -translate-x-1/2" />
                      <div className="flex flex-col sm:flex-row sm:gap-4 sm:items-baseline">
                        <span className="font-bold text-orange min-w-20">{item.time}</span>
                        <div>
                          <h4 className="font-bold text-maroon">{item.activity}</h4>
                          <p className="text-sm text-maroon/70">{item.details}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center bg-royal-brown text-cream p-6 rounded-lg">
                <div>
                  <span className="text-sm text-gold uppercase tracking-wider">Package Price</span>
                  <div className="text-3xl font-bold font-['Cinzel']">₹{selectedPackage.price}</div>
                  <p className="text-xs opacity-60">*Includes transport, guide, and entry fees</p>
                </div>
                <Link to={createPageUrl('Contact')} state={{ package: selectedPackage }}>
                  <button className="mt-4 md:mt-0 bg-orange text-white px-8 py-3 rounded font-bold hover:bg-gold hover:text-royal-brbg-royal-brown transition-colors shadow-lg shadow-orange/20">
                    BOOK THIS EXPERIENCE
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}