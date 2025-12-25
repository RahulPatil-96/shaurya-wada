import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Wine, Music, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import MenuCard from '@/components/dining/MenuCard';
import shahiThali from '@/assets/shahi_thali.jpg';
import puranPoli from '@/assets/puran_poli.jpg';
import misalPav from '@/assets/misal_pav.jpg';
import gavakadchiMutton from '@/assets/gavakadchi_mutton.jpg';
import prawnMalvani from '@/assets/prawn_malvani.jpg';
import thaliImage from '@/assets/a.jpg';
import dining from '@/assets/dining.jpg';

export default function DiningPage() {
  const menuItems = [
  {
    title: "Shahi Thali",
    desc: "A grand platter with 21 traditional delicacies served on silverware.",
    price: "₹1200",
    img: shahiThali
  },
  {
    title: "Puran Poli",
    desc: "Sweet flatbread stuffed with lentils and jaggery, dripping in ghee.",
    price: "₹350",
    img: puranPoli
  },
  {
    title: "Misal Pav",
    desc: "Spicy sprouted curry topped with farsan, served with pav bread.",
    price: "₹250",
    img: misalPav
  },
  {
    title: "Gavakadchi Mutton",
    desc: "Traditional village-style mutton cooked with local spices and coconut.",
    price: "₹720",
    img: gavakadchiMutton
  },
  {
    title: "Chicken Malvani",
    desc: "Malvani-style chicken curry with authentic coconut base.",
    price: "₹610",
    img: "https://theyummydelights.com/wp-content/uploads/2019/07/Malvani-chicken-curry-12.jpg"
  },
  {
    title: "Kolhapuri Mutton Rassa",
    desc: "Fiery Kolhapuri mutton in Tambda Pandhra Rassa (red & white gravy).",
    price: "₹620",
    img: "https://3.bp.blogspot.com/-jghJUzPwuok/VvDDpI5QPxI/AAAAAAAAVyA/H93k0UoqQdkdCUjg7yCe_PpORMWPwNCMg/s1600/Malvani%2BMutton%2BCurry%2B%25285%2529%2B-%2B1.jpg"
  },
  {
    title: "Prawn Malvani",
    desc: "Fresh prawns simmered in Malvani spices and coconut milk.",
    price: "₹750",
    img: prawnMalvani
  },
  {
    title: "Fish Rassa",
    desc: "Fresh catch of the day cooked in Malvani coastal gravy.",
    price: "₹580",
    img: "https://www.teaforturmeric.com/wp-content/uploads/2023/06/Fish-Curry-Fish-Masala-21.jpg"
  }
];


  const features = [
    {
      icon: <Utensils size={32} />,
      title: "Royal Ambience",
      desc: "Dine under chandeliers in a hall inspired by the Durbar Hall."
    },
    {
      icon: <Wine size={32} />,
      title: "Exquisite Drinks",
      desc: "Curated selection of wines and traditional kokum sherbets."
    },
    {
      icon: <Music size={32} />,
      title: "Live Sitar",
      desc: "Enjoy your meal with soothing live classical instrumental music."
    }
  ];

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          src={dining}
          className="w-full h-full object-cover"
          alt="Restaurant Interior"
          loading="lazy"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
          <span className="text-gold tracking-[0.3em] uppercase text-sm font-bold mb-2">Hotel Shaurya Wada</span>
          <h1 className="text-5xl md:text-8xl font-['Cinzel'] text-cream mb-6 drop-shadow-2xl">
            <span className="gold-heading" data-text="MARATHA'S FEAST">MARATHA'S FEAST</span>
          </h1>
          <p className="text-xl md:text-2xl text-cream font-['Lora'] italic max-w-2xl mb-10 leading-relaxed">
            "A culinary journey through the royal kitchens of the Maratha Empire."
          </p>
          <button 
            onClick={() => document.getElementById('full-menu').scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-2 px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-royal-brown transition-all duration-300 font-['Cinzel'] tracking-wider uppercase"
          >
            View Menu <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Culinary Heritage Section */}
      <section className="max-w-7xl mx-auto py-20 px-6 grid lg:grid-cols-2 gap-12 items-center">
  {/* Image */}
  <div className="order-2 lg:order-1 animate-fade-up">
    <div className="overflow-hidden jaali-frame shadow-2xl rounded-lg">
      <img
        src={thaliImage}
        alt="Traditional Maharashtrian Thali"
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        loading="lazy"
      />
    </div>
  </div>

  {/* Content */}
  <div className="order-1 lg:order-2 space-y-6 animate-slide-left">
    <span className="text-orange font-lora text-sm uppercase tracking-widest border-b-2 border-orange pb-1">
      Culinary Heritage
    </span>
    
    <h2 className="font-playfair text-4xl md:text-5xl font-bold text-royal-brown leading-tight">
      Taste the <span className="text-gold">Maratha Tradition</span>
    </h2>

    <p className="font-lora text-lg text-[rgba(44,26,16,0.7)] leading-relaxed">
      Our in-house restaurant brings you the authentic flavors of Maharashtra, 
      prepared by master chefs using time-honored recipes passed down through generations.
    </p>

    {/* Highlights */}
    <div className="space-y-4 pt-4">
      <div className="border-l-4 border-orange pl-6 py-2">
        <h4 className="font-playfair text-xl font-bold text-royal-brown">Traditional Thali</h4>
        <p className="font-lora text-[rgba(44,26,16,0.7)]">
          Complete Maharashtrian meal with puran poli, bhakri, and seasonal delicacies.
        </p>
      </div>
      <div className="border-l-4 border-gold pl-6 py-2">
        <h4 className="font-playfair text-xl font-bold text-royal-brown">Royal Dining Experience</h4>
        <p className="font-lora text-[rgba(44,26,16,0.7)]">
          Served in traditional brass utensils with authentic presentation.
        </p>
      </div>
      <div className="border-l-4 border-maroon pl-6 py-2">
        <h4 className="font-playfair text-xl font-bold text-royal-brown">Special Events</h4>
        <p className="font-lora text-[rgba(44,26,16,0.7)]">
          Private dining in our heritage courtyard for memorable celebrations.
        </p>
      </div>
    </div>

    {/* Timings */}
    <div className="flex gap-4 pt-6">
      <div className="bg-gold/10 border border-gold/30 rounded-lg px-6 py-4">
        <div className="text-sm font-lora text-gold uppercase tracking-wide">Breakfast</div>
        <div className="font-playfair text-lg font-bold text-royal-brown">7:00 - 10:30 AM</div>
      </div>
      <div className="bg-maroon/10 border border-maroon/30 rounded-lg px-6 py-4">
        <div className="text-sm font-lora text-maroon uppercase tracking-wide">Dinner</div>
        <div className="font-playfair text-lg font-bold text-royal-brown">7:00 - 11:00 PM</div>
      </div>
    </div>
  </div>
</section>


      {/* Chef's Signatures */}
      <section className="container mx-auto px-6 py-20" id="full-menu">
        <div className="text-center mb-16">
          <div className="w-20 h-1 bg-orange mx-auto mb-6" />
          <h2 className="text-4xl font-['Cinzel'] text-maroon">CHEF'S SIGNATURES</h2>
          <p className="text-maroon/70 mt-4 font-['Lora']">Handpicked delicacies that define our legacy.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {menuItems.map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white rounded-lg shadow-xl overflow-hidden group"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8 text-center border-b-4 border-[#B7410E]">
                <h3 className="text-2xl font-['Cinzel'] text-maroon mb-2">{item.title}</h3>
                <p className="text-maroon/70 mb-4 font-['Lora']">{item.desc}</p>
                <span className="text-orange font-bold text-xl">{item.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Full Menu Component */}
      <MenuCard />

      {/* Features Section */}
      <section className="bg-royal-brown text-cream py-24 relative overflow-hidden">
        <div className="absolute inset-0 pattern-jaali opacity-10" />
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                {feature.icon}
              </div>
              <h3 className="text-xl font-['Cinzel'] text-gold">{feature.title}</h3>
              <p className="opacity-70">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="py-20 text-center container mx-auto px-6">
        <h2 className="text-3xl font-['Cinzel'] text-maroon mb-8">RESERVE YOUR TABLE</h2>
        <Link to={createPageUrl('Contact')}>
          <button className="bg-orange text-white px-10 py-4 font-['Cinzel'] text-lg hover:bg-[#B7410E] transition-all shadow-xl">
            BOOK A TABLE
          </button>
        </Link>
      </section>
    </div>
  );
}
