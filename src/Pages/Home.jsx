import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ChevronRight, Star, Coffee, Map, Calendar } from "lucide-react";

import { createPageUrl } from "@/utils";

import heroVideo from "@/assets/Video.mp4";
import wadaImg from "@/assets/wada.jpg";
import logoImg from "@/assets/logo.jpg";
import heroImage from "@/assets/Shivaji_maharaj.jpg";
import mapImage from "@/assets/map.jpg";

export default function HomePage() {
  // refs & viewport checks
  const wadaRef = useRef(null);
  const isWadaInView = useInView(wadaRef, { once: true, amount: 0.3 });

  // scroll-linked transform for hero background
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, -150]);

  // small animation variants
  const heroTextVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // featured experiences data
  const experiences = [
    {
      title: "Heritage Walks",
      desc: "Guided tours to Shaniwar Wada & Kasba Ganpati.",
      img: mapImage,
      icon: <Map className="w-6 h-6" />,
    },
    {
      title: "Royal Dining",
      desc: "A feast fit for a Peshwa, served on silver platters.",
      img: "https://images.unsplash.com/photo-1567337710282-00832b415979?q=80&w=2088&auto=format&fit=crop",
      icon: <Coffee className="w-6 h-6" />,
    },
    {
      title: "Cultural Events",
      desc: "Live classical music and Lavani performances.",
      img: "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?q=80&w=1974&auto=format&fit=crop",
      icon: <Calendar className="w-6 h-6" />,
    },
  ];

  return (
    <div className="flex flex-col bg-background dark:bg-royal-brown">
      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* parallax video background */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 w-full h-full"
          aria-hidden
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster=""
          >
            <source src={heroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-maroon/90" />
        </motion.div>

        {/* floating decor */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 360, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-10 w-3 h-3 bg-gold/50 rounded-full"
          />
          <motion.div
            animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-1/3 right-20 w-2 h-2 bg-gold/30 rounded-full"
          />
          <motion.div
            animate={{ y: [0, -25, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-gold/40 rounded-full"
          />
        </div>

        {/* hero content */}
        <motion.div
          style={{ y: bgY }}
          className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center pb-8"
        >
          <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center pd-8">
            <div className="max-w-4xl mx-auto px-4 md:px-0">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="flex flex-col items-center justify-center gap-4 mb-6 text-center"
              >
                <motion.img
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  src={logoImg}
                  alt="Shaurya Wada Logo"
                  className="w-28 h-28 md:w-30 md:h-30 object-contain"
                />

                <motion.span
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="text-4xl md:text-6xl font-['Cinzel'] font-extrabold text-orange drop-shadow-lg"
                >
                  हॉटेल शौर्य वाडा
                </motion.span>
              </motion.div>


              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="w-32 h-1 bg-maroon mx-auto mb-8 rounded shadow-sm origin-center"
              />

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-3xl md:text-5xl font-['Cinzel'] font-bold text-cream mb-6 md:mb-8 tracking-wide leading-snug md:leading-tight drop-shadow-lg"
              >
                EXPERIENCE THE{" "}
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                  className="gold-heading"
                  data-text="ROYAL LEGACY"
                >
                  ROYAL LEGACY
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, duration: 0.8 }}
                className="text-lg md:text-xl text-cream/90 font-['Lora'] mb-10 max-w-3xl mx-auto italic"
              >
                Step into a world of Maratha grandeur and Peshwa elegance at Hotel
                Shaurya Wada.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0, duration: 0.8 }}
                className="flex flex-col md:flex-row gap-6 justify-center"
              >
                <Link to={createPageUrl("Locations")}>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-maroon hover:bg-[#B7410E] text-white text-lg font-['Cinzel'] tracking-wider border border-gold rounded-lg transition-all shadow-lg hover-scale"
                    aria-label="View our luxury suites and rooms"
                  >
                    VIEW Locations
                  </motion.button>
                </Link>

                <Link to={createPageUrl("Dining")}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-transparent hover:bg-cream/10 text-cream text-lg font-['Cinzel'] tracking-wider border border-cream rounded-lg transition-all shadow-sm backdrop-blur-sm hover-scale"
                    aria-label="Explore Pune city and its attractions"
                  >
                    EXPLORE Dining
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator (looping animation) */}
          <motion.div
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-cream/60"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
              <div className="w-0.5 h-12 bg-linear-to-b from-gold to-transparent" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ABOUT / THE WADA STORY */}
      <section className="relative py-24 px-4 bg-background dark:bg-royal-brown">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="space-y-6"
            >
              <div className="inline-block">
                <h4 className="text-maroon font-['Cinzel'] tracking-widest mb-2">
                  The Legacy
                </h4>
              </div>

              <h2 className="text-4xl md:text-5xl text-maroon font-['Cinzel'] mb-6">
                A Tribute to the <span className="italic text-[#B7410E]">Maratha Era</span>
              </h2>

              <div className="text-maroon/80 text-lg leading-relaxed font-['Lora']">
                <p>
                  Step into Hotel Shaurya Wada, where history comes alive. Every corner of
                  our boutique property tells the tale of Maratha valor and grandeur—from
                  the intricately carved wooden pillars to the delicate jaali work and
                  authentic Warli murals.
                </p>

                <p className="mt-4">
                  Situated in the heart of Pune, the hotel brings the essence of a
                  traditional Wada to life, combining architectural splendor with
                  thoughtful modern comforts. Here, timeless heritage meets contemporary
                  luxury, creating a stay that is both immersive and unforgettable.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-playfair font-bold text-primary">18</div>
                  <div className="text-sm font-lora text-primary uppercase tracking-wide">
                    Luxury Suites
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-playfair font-bold text-accent">4.9</div>
                  <div className="text-sm font-lora text-primary uppercase tracking-wide">
                    Guest Rating
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-playfair font-bold text-secondary">150+</div>
                  <div className="text-sm font-lora text-primary uppercase tracking-wide">
                    Years Legacy
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="jaali-frame rounded-lg overflow-hidden shadow-2xl">
                <div
                  className="aspect-4/5 bg-cover bg-center"
                  style={{ backgroundImage: `url(${heroImage})` }}
                />
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isWadaInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                  whileHover={{ y: -8, boxShadow: "0 15px 30px rgba(0,0,0,0.3)" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-[#453021] text-cream p-4 rounded-lg shadow-md max-w-xs z-10 overflow-hidden"
                >
                  <span className="font-['Cinzel'] font-extrabold text-base leading-relaxed mb-2 gold-foil shimmer-text">
                    छत्रपती शिवाजी महाराज
                  </span>
                </motion.div>
              </div>

              {/* decorative borders */}
              <div className="absolute -top-6 -right-6 w-24 h-24 border-4 border-accent opacity-50" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 border-4 border-primary opacity-50" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* WADA SECTION (with ref) */}
      <section ref={wadaRef} className="py-24 relative bg-cream dark:bg-royal-brown pattern-warli">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* LEFT IMAGE + BADGES */}
            <div className="relative px-4 sm:px-0">
              {/* Decorative Border (Desktop only) */}
              <div className="hidden sm:block absolute -top-4 -left-4 w-full h-full border-2 border-gold z-0" />

              {/* Image */}
              <img
                src={wadaImg}
                alt="Wada Architecture"
                loading="lazy"
                className="
      relative z-10 w-full
      h-[280px] sm:h-[380px] lg:h-[500px]
      object-cover shadow-xl
    "
              />

              {/* Testimonial Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isWadaInView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                whileHover={{
                  y: -8,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="
      relative mt-6 mx-auto
      max-w-sm
      bg-[#453021] text-cream
      p-4 sm:p-5
      rounded-lg shadow-md
      z-10 overflow-hidden

      lg:absolute lg:top-1/4 lg:-left-32 lg:mt-0
    "
              >
                <p className="font-lora italic text-sm sm:text-base leading-relaxed mb-3 gold-foil shimmer-text">
                  “Every meal here is a masterpiece. The blend of heritage and innovation
                  is simply extraordinary.”
                </p>

                <div className="font-inter text-xs sm:text-sm">
                  <div className="font-semibold">— Rajeev Sharma</div>
                  <div className="text-cream/80">
                    Food Critic, Times of India
                  </div>
                </div>
              </motion.div>

              {/* SINCE 2024 Badge */}
              <div
                className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 lg:-bottom-6 lg:-right-8 aspect-square w-20 sm:w-24 lg:w-32 bg-[#B7410E] flex items-center justify-center z-20">
                <span className="text-gold font-['Cinzel'] text-center font-bold leading-tight">
                  <span className="block text-[10px] sm:text-xs lg:text-sm tracking-widest">
                    SINCE
                  </span>
                  <span className="block text-lg sm:text-xl lg:text-2xl">
                    2024
                  </span>
                </span>
              </div>
            </div>


            {/* RIGHT CONTENT BLOCK (FIXED CARD BACKGROUND) */}
            <div className="bg-cream dark:bg-royal-brown/70 p-10 rounded-xl shadow-xl space-y-8 backdrop-blur-sm">
              <div>
                <h4 className="text-maroon font-['Cinzel'] tracking-widest mb-2 dark:text-gold">
                  THE HERITAGE
                </h4>

                <h2 className="text-4xl md:text-5xl text-maroon font-['Cinzel'] mb-6 dark:text-cream">
                  A Legacy of <span className="italic text-[#B7410E] dark:text-gold">Royal Flavors</span>
                </h2>

                <div className="text-maroon/80 text-lg leading-relaxed font-['Lora'] dark:text-cream/80">
                  <p>
                    At Shaurya Wada Dining, we serve more than meals—we serve history on a
                    plate. Our culinary team has meticulously studied ancient Peshwa
                    recipes, bringing them to life with modern techniques and the finest
                    ingredients.
                  </p>

                  <p className="mt-4">
                    Every dish tells a story of Maharashtra’s rich gastronomic traditions,
                    presented in an ambience that reflects the elegance of Maratha royalty.
                    Dining here is a journey through time, where authentic flavors meet
                    refined presentation to create a truly regal experience.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cream border border-gold rounded-full text-[#B7410E] dark:bg-royal-brown dark:text-gold">
                    <Star size={24} />
                  </div>
                  <div>
                    <h4 className="font-['Cinzel'] font-bold text-maroon dark:text-cream">Royal Hospitality</h4>
                    <p className="text-sm text-maroon/70 dark:text-cream/70">Treating guests as Gods, Atithi Devo Bhava.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cream border border-gold rounded-full text-[#B7410E] dark:bg-royal-brown dark:text-gold">
                    <Coffee size={24} />
                  </div>
                  <div>
                    <h4 className="font-['Cinzel'] font-bold text-maroon dark:text-cream">Authentic Cuisine</h4>
                    <p className="text-sm text-maroon/70 dark:text-cream/70">Traditional Maharashtrian Thalis & delicacies.</p>
                  </div>
                </div>
              </div>

              <Link to={createPageUrl("About")}>
                <button
                  className="mt-4 flex items-center gap-2 text-maroon font-bold tracking-wide hover:gap-4 transition-all dark:text-gold"
                  aria-label="Read our story and learn about the hotel's history"
                >
                  READ OUR STORY <ChevronRight size={18} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* CURATED EXPERIENCES */}
      <section className="py-24 bg-maroon text-cream relative overflow-hidden">
        <div className="absolute inset-0 pattern-jaali opacity-20 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-['Cinzel'] text-gold mb-4">CURATED EXPERIENCES</h2>
            <p className="text-cream/70 max-w-2xl mx-auto font-['Lora']">
              Beyond luxury stays, we offer you a gateway to the rich culture of Pune.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {experiences.map((item, idx) => (
              <motion.div
                key={idx}
                variants={staggerItem}
                whileHover={{ y: -10 }}
                className="group bg-royal-brown border border-gold/30 overflow-hidden hover-glow"
              >
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors z-10" />
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 z-20 bg-gold text-royal-brown p-2 rounded-full">
                    {item.icon}
                  </div>
                </div>

                <div className="p-8 text-center relative">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-royal-brown border-t border-l border-gold/30 rotate-45 z-0" />
                  <h3 className="text-xl font-['Cinzel'] text-gold mb-3 relative z-10">{item.title}</h3>
                  <p className="text-cream/60 text-sm leading-relaxed relative z-10">{item.desc}</p>

                  <Link to={createPageUrl("Experiences")}>
                    <button
                      className="
    mt-6 text-xs tracking-[0.2em]
    text-maroon dark:text-cream
    uppercase 
    border-b border-maroon/50 dark:border-cream/60
    pb-1 
    hover:text-cream hover:border-cream 
    transition-colors 
    relative z-10
  "
                      aria-label={`Discover more about ${item.title}`}
                    >
                      Discover More
                    </button>

                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-cream dark:bg-royal-brown relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Star className="w-8 h-8 text-gold mx-auto mb-4 fill-current" />
            <div>
              <h4 className="text-maroon font-['Cinzel'] tracking-widest mb-2 dark:text-gold">
                ROYAL APPRECIATION
              </h4>

              <h2 className="text-4xl md:text-5xl text-maroon font-['Cinzel'] mb-6 dark:text-cream">
                Celebrating <span className="italic text-[#B7410E] dark:text-gold">Your Kind Words</span>
              </h2>
            </div>

          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { text: "Staying here felt like living in a museum. The hospitality is unmatched.", author: "Aditi R.", loc: "Mumbai" },
              { text: "The Puran Poli at the restaurant took me back to my grandmother's kitchen.", author: "Rahul D.", loc: "Pune" },
              { text: "A perfect blend of history and luxury. The morning heritage walk is a must.", author: "Sarah Jenkins", loc: "London" }
            ].map((t, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 shadow-xl border-t-4 border-[#B7410E] relative hover-lift hover-glow"
              >
                <div className="text-4xl text-gold font-serif absolute top-4 left-4 opacity-30">"</div>
                <p className="text-maroon/80 font-['Lora'] italic mb-6 relative z-10">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-maroon rounded-full text-cream flex items-center justify-center font-bold font-['Cinzel'] hover-scale">
                    {t.author[0]}
                  </div>
                  <div>
                    <h5 className="font-bold text-maroon text-sm">{t.author}</h5>
                    <span className="text-xs text-maroon uppercase tracking-wider">{t.loc}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      {/* <section className="py-20 bg-royal-brown text-cream">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto bg-[#B7410E] p-12 relative overflow-hidden rounded-lg shadow-2xl">
            <div className="absolute inset-0 pattern-jaali opacity-20" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-['Cinzel'] text-cream mb-6">
                Planning Your Royal Visit?
              </h2>
              <p className="text-cream/90 text-lg mb-8 font-['Lora']">
                Use our AI-powered planner to create a personalized itinerary for your Pune trip.
              </p>
              <Link to={createPageUrl("Experiences")}>
                <button className="bg-cream text-[#B7410E] px-8 py-4 font-['Cinzel'] font-bold hover:bg-gold hover:text-royal-brown transition-colors shadow-lg" aria-label="Use our AI-powered planner to create a personalized itinerary for your Pune trip">
                  PLAN MY TRIP WITH AI
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
