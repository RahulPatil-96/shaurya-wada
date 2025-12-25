import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Coffee, Tv, Wind, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function RoomsPage() {
  // Mock data for rooms
  const rooms = [
    {
      id: 1,
      type: 'DELUXE SUITE',
      name: 'Maharaja Suite',
      description: 'Experience the grandeur of royal living in our Maharaja Suite, featuring traditional Maratha architecture with modern amenities.',
      amenities: ['High-speed Wifi', 'Mini Bar', 'TV', 'AC'],
      price: 15000,
      image_url: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 2,
      type: 'PREMIUM SUITE',
      name: 'Peshwa Chamber',
      description: 'A spacious suite inspired by the Peshwa\'s private quarters, offering panoramic views and luxurious comfort.',
      amenities: ['High-speed Wifi', 'Mini Bar', 'TV', 'AC'],
      price: 12000,
      image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 3,
      type: 'EXECUTIVE SUITE',
      name: 'Royal Pavilion',
      description: 'Elegant suite with traditional decor and contemporary facilities, perfect for discerning travelers.',
      amenities: ['High-speed Wifi', 'Mini Bar', 'TV', 'AC'],
      price: 10000,
      image_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070&auto=format&fit=crop'
    }
  ];

  const isLoading = false;

  const amenitiesIcons = {
    'High-speed Wifi': <Wifi size={16} />,
    'Mini Bar': <Coffee size={16} />,
    'TV': <Tv size={16} />,
    'AC': <Wind size={16} />,
  };

  return (
    <div className="bg-cream min-h-screen pb-20">
      {/* Header */}
      <div className="h-[400px] relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-maroon">
          <img
            src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2070&auto=format&fit=crop"
            alt="Royal Room"
            className="w-full h-full object-cover opacity-50"
            loading="lazy"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-['Cinzel'] text-gold mb-4 drop-shadow-lg">ROYAL SUITES</h1>
          <p className="text-cream text-xl font-['Lora'] italic max-w-2xl mx-auto">
            Rest like the Kings and Queens of the Maratha Empire.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-16">
          {isLoading ? (
            <div className="text-center text-maroon">Loading Suites...</div>
          ) : (
            rooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center hover-glow`}
              >
                {/* Image Side */}
                <div className="w-full lg:w-1/2 h-[400px] relative group overflow-hidden rounded-lg shadow-2xl border-4 border-white outline-1 outline-gold/50">
                  <img 
                    src={room.image_url} 
                    alt={room.name} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-royal-brown/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div>
                    <span className="text-maroon font-['Cinzel'] tracking-widest text-sm uppercase">{room.type}</span>
                    <h2 className="text-4xl font-['Cinzel'] text-maroon mt-2">{room.name}</h2>
                  </div>
                  
                  <p className="text-maroon/80 font-['Lora'] text-lg leading-relaxed">
                    {room.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {room.amenities.map((amenity, i) => (
                      <div key={i} className="flex items-center gap-2 text-maroon/70">
                        {amenitiesIcons[amenity] || <Check size={16} className="text-gold" />}
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-gold/20 flex items-end justify-between">
                    <div>
                      <span className="text-sm text-maroon/60 block">Starting from</span>
                      <span className="text-3xl font-bold text-[#B7410E] font-['Cinzel']">₹{room.price}</span>
                      <span className="text-sm text-maroon/60"> / night</span>
                    </div>
                    <Link to={createPageUrl('Contact')}>
                      <button className="bg-maroon text-cream px-8 py-3 hover:bg-orange transition-colors font-['Cinzel'] tracking-wider hover-scale">
                        BOOK NOW
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}