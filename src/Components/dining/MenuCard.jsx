import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, Star } from 'lucide-react';

const menuCategories = [
  {
    id: 'starters',
    label: 'Starters',
    items: [
      { name: 'Chicken 65', description: 'Crispy deep-fried chicken tossed in spices.', price: '₹370' },
      { name: 'Chicken Chilly', description: 'Spicy Indo-Chinese style chicken.', price: '₹360' },
      { name: 'Chicken Fry', description: 'Golden fried chicken with local masala.', price: '₹380' },
      { name: 'Chicken Sukka', description: 'Dry roasted chicken with coconut.', price: '₹405' },
      { name: 'Chicken Lollipop', description: 'Crispy chicken wings served hot.', price: '₹360' },
      { name: 'Chicken Tandoori (Full)', description: 'Char-grilled chicken with tandoori spices.', price: '₹460' },
      { name: 'Mutton Fry', description: 'Spicy fried mutton pieces.', price: '₹380' },
      { name: 'Mutton Sukka', description: 'Dry mutton preparation with coconut.', price: '₹420' },
      { name: 'Anda Fry / Omelette', description: 'Classic egg preparation.', price: '₹110–120' }
    ]
  },
  {
    id: 'mains',
    label: 'Non-Veg Main Course',
    items: [
      { name: 'Chicken Masala', description: 'Rich spicy chicken gravy.', price: '₹390' },
      { name: 'Chicken Kolhapuri', description: 'Fiery Kolhapuri style curry.', price: '₹420' },
      { name: 'Chicken Handi', description: 'Slow cooked chicken in thick gravy.', price: '₹610' },
      { name: 'Chicken Malvani', description: 'Coconut based Malvani curry.', price: '₹610' },
      { name: 'Chicken Kalvan / Rassa', description: 'Traditional Maharashtrian curry.', price: '₹610' },
      { name: 'Mutton Masala', description: 'Spicy mutton gravy.', price: '₹550' },
      { name: 'Mutton Kolhapuri', description: 'Authentic Kolhapuri rassa.', price: '₹620' },
      { name: 'Mutton Handi', description: 'Slow-cooked mutton in handi style.', price: '₹750' },
      { name: 'Gavakadchi Mutton', description: 'Village-style special mutton.', price: '₹720' },
      { name: 'Egg Curry / Masala', description: 'Eggs cooked in spicy gravy.', price: '₹245–275' }
    ]
  },
  {
    id: 'thali',
    label: 'Special Thali',
    items: [
      { name: 'Egg Thali', description: 'Egg curry, chapati, rice & sides.', price: '₹250' },
      { name: 'Chicken Thali', description: 'Chicken rassa, sukka, bhakri, rice.', price: '₹360' },
      { name: 'Chicken Special Thali', description: 'Extra sukka & rich gravy.', price: '₹420' },
      { name: 'Chicken Gavakadchi Thali', description: 'Village-style chicken thali.', price: '₹499' },
      { name: 'Mutton Thali', description: 'Mutton rassa, sukka & sides.', price: '₹410' },
      { name: 'Mutton Special Thali', description: 'Premium mutton thali.', price: '₹550' },
      { name: 'Mutton Gavakadchi Thali', description: 'Traditional gavakadchi mutton.', price: '₹660' }
    ]
  },
  {
    id: 'biryani',
    label: 'Biryani & Rice',
    items: [
      { name: 'Veg Biryani', description: 'Spiced vegetable rice.', price: '₹310' },
      { name: 'Paneer Biryani', description: 'Paneer cooked with aromatic rice.', price: '₹310' },
      { name: 'Egg Biryani', description: 'Egg biryani with masala rice.', price: '₹390' },
      { name: 'Chicken Dum Biryani', description: 'Slow cooked dum biryani.', price: '₹360' },
      { name: 'Mutton Dum Biryani', description: 'Rich mutton dum biryani.', price: '₹430' },
      { name: 'Plain Rice', description: 'Steamed rice.', price: '₹180' },
      { name: 'Jeera Rice', description: 'Cumin flavored rice.', price: '₹110' },
      { name: 'Indrayani Rice', description: 'Premium local rice.', price: '₹99' }
    ]
  },
  {
    id: 'veg',
    label: 'Veg Menu',
    items: [
      { name: 'Paneer Tikka', description: 'Grilled paneer cubes.', price: '₹360' },
      { name: 'Paneer Masala', description: 'Paneer in rich gravy.', price: '₹320' },
      { name: 'Paneer Kolhapuri', description: 'Spicy Kolhapuri style paneer.', price: '₹340' },
      { name: 'Veg Kolhapuri', description: 'Mixed veg spicy curry.', price: '₹280' },
      { name: 'Veg Handi', description: 'Creamy vegetable curry.', price: '₹300' },
      { name: 'Dal Fry', description: 'Yellow dal with tadka.', price: '₹190' },
      { name: 'Dal Tadka', description: 'Dal tempered with spices.', price: '₹200' }
    ]
  },
  {
    id: 'breads',
    label: 'Breads & Sides',
    items: [
      { name: 'Chapati / Butter Chapati', description: 'Soft wheat bread.', price: '₹35–40' },
      { name: 'Tandoor Roti / Butter Roti', description: 'Clay oven baked roti.', price: '₹35–40' },
      { name: 'Naan / Butter Naan', description: 'Soft naan bread.', price: '₹50–60' },
      { name: 'Bhakri (Jowar / Bajra)', description: 'Traditional millet bread.', price: '₹40' },
      { name: 'Solkadhi', description: 'Refreshing kokum drink.', price: '₹50' },
      { name: 'Papad', description: 'Crispy papad.', price: '₹20' }
    ]
  },
  {
    id: 'desserts',
    label: 'Desserts',
    items: [
      { name: 'Gulab Jamun', description: 'Soft milk dumplings in syrup.', price: '₹110' }
    ]
  }
];

export default function MenuCard() {
  const [activeTab, setActiveTab] = useState(menuCategories[0].id);
  const activeCategory = menuCategories.find(c => c.id === activeTab);

  return (
    <div className="py-20 bg-cream relative overflow-hidden" id="full-menu">
      <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-[#B7410E] via-yellow-500 to-[#B7410E]" />

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-['Cinzel'] text-maroon mb-4">
            SHAURYA WADA MENU
          </h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto" />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {menuCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2 font-['Cinzel'] border border-yellow-500 transition ${
                activeTab === cat.id
                  ? 'bg-maroon text-yellow-400'
                  : 'text-maroon hover:bg-maroon hover:text-yellow-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="bg-white p-8 rounded-lg shadow-xl border border-yellow-500/30 min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {activeCategory.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between border-b border-dashed border-yellow-500/30 pb-4"
                >
                  <div className="pr-4">
                    <h4 className="font-['Cinzel'] text-lg text-[#B7410E]">
                      {item.name}
                    </h4>
                    <p className="text-sm text-maroon/70">{item.description}</p>
                  </div>
                  <div className="font-bold text-maroon whitespace-nowrap">
                    {item.price}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-14 bg-maroon text-cream p-8 rounded-lg text-center">
          <h3 className="text-2xl font-['Cinzel'] text-yellow-400 mb-6">
            DINING INFO
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="flex justify-center gap-2">
              <Clock className="w-5 h-5" /> Open: 7 AM – 11 PM
            </div>
            <div className="flex justify-center gap-2">
              <Users className="w-5 h-5" /> Capacity: 120 Guests
            </div>
            <div className="flex justify-center gap-2">
              <Star className="w-5 h-5" /> Chef Special: ₹500+
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
