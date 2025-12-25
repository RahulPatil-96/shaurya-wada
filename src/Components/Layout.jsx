import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MapPin, Phone, Instagram, Facebook, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { createPageUrl } from '@/utils';
import logoImg from "@/assets/logo.jpg";
import Breadcrumb from './Breadcrumb';
import ThemeToggle from './ThemeToggle';

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;

      if (currentScrollY < 50) {
        setIsNavVisible(false);
      } else if (scrollingDown && currentScrollY > 100) {
        setIsNavVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    // { label: 'Rooms', path: '/Rooms' },
    { label: 'Dining', path: '/Dining' },
    // { label: 'Discover', path: '/Discover' },
    // { label: 'Experiences', path: '/Experiences' },
    { label: 'Locations', path: '/Locations' },
    // { label: 'Virtual Tour', path: '/VirtualTour' },
    { label: 'Gallery', path: '/Gallery' },
    { label: 'Contact', path: '/Contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-cream overflow-x-hidden relative">
      {/* Decorative Border Top */}
      <div className="h-2 bg-linear-to-r from-[#B7410E] via-gold to-[#B7410E]" />

      {/* Navigation */}
      <nav role="navigation" aria-label="Main navigation" className={`fixed top-0 z-50 bg-maroon text-cream shadow-xl border-b border-gold w-full transition-transform duration-300 ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              {/* Logo Image */}
              <img
                src={logoImg}
                alt="Shaurya Wada Logo"
                className="w-10 h-10 object-contain"
              />

              {/* Text */}
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-widest font-['Cinzel'] text-gold">
                   शौर्य वाडा
                </span>
                <span className="text-xs tracking-[0.3em] text-cream opacity-80">
                  ROYAL HERITAGE
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={createPageUrl(item.label === 'Home' ? '' : item.label)}
                  className={`relative text-sm tracking-widest font-['Cinzel'] hover:text-gold transition-colors py-2 ${location.pathname === (item.label === 'Home' ? '/' : '/' + item.label) ? 'text-gold' : ''
                    }`}
                >
                  {item.label}
                  {location.pathname === (item.label === 'Home' ? '/' : '/' + item.label) && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gold"
                    />
                  )}
                </Link>
              ))}
              
              <Link to={createPageUrl('Contact')}>
                <button className="bg-orange hover:bg-[#B7410E] text-white px-6 py-2 rounded-sm font-['Cinzel'] text-sm tracking-wider border border-gold transition-all hover:shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                  BOOK NOW
                </button>
              </Link>

              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gold"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-maroon border-t border-gold overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={createPageUrl(item.label === 'Home' ? '' : item.label)}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-cream font-['Cinzel'] tracking-wider hover:text-gold py-2 border-b border-gold/20"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link to={createPageUrl('Contact')} onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full mt-4 bg-orange text-white px-6 py-3 font-['Cinzel']">
                    BOOK YOUR STAY
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Breadcrumb Navigation */}
      {location.pathname !== '/' && <Breadcrumb />}

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className={`grow ${isNavVisible ? 'pt-20' : 'pt-0'}`}
      >
        {children}
      </motion.main>

      {/* Footer */}
      <footer className="bg-royal-brown text-cream pt-16 pb-8 border-t-4 border-[#B7410E]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="space-y-6">
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-widest font-['Cinzel'] text-gold">SHAURYA WADA</span>
                <span className="text-xs tracking-[0.3em] opacity-60">EST. 2024</span>
              </div>
              <p className="text-cream/70 font-['Lora'] text-sm leading-relaxed">
                Experience the royalty of the Peshwa era. A boutique heritage hotel in the heart of Pune, blending history with modern luxury.
              </p>
            </div>

            <div>
              <h4 className="text-gold font-['Cinzel'] font-bold mb-6">CONTACT</h4>
              <ul className="space-y-4 text-sm text-cream/80">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange mt-0.5" />
                  <span>NH65, Katraj Bypass Rd, opposite Hande Lawns, Handewadi, Pune, Maharashtra 412308</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange" />
                  <span>+91 95527 57171</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-gold font-['Cinzel'] font-bold mb-6">LINKS</h4>
              <ul className="space-y-3 text-sm text-cream/80">
                <li><Link to={createPageUrl('Dining')} className="hover:text-orange transition-colors">Royal Dining</Link></li>
                <li><Link to={createPageUrl('Locations')} className="hover:text-orange transition-colors">Locations</Link></li>
                <li><Link to={createPageUrl('Gallery')} className="hover:text-orange transition-colors">Gallery</Link></li>
                <li><Link to={createPageUrl('Contact')} className="hover:text-orange transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-gold font-['Cinzel'] font-bold mb-6">NEWSLETTER</h4>
              <p className="text-xs text-cream/60 mb-4">Subscribe for royal offers and updates.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="bg-cream/10 border border-gold/30 p-2 text-sm text-cream w-full placeholder:text-cream/30 focus:outline-none focus:border-gold"
                />
                <button className="bg-gold text-royal-brown px-4 py-2 hover:bg-orange hover:text-white transition-colors">
                  →
                </button>
              </div>
              <div className="flex gap-4 mt-6">
                <a href="#" className="text-gold hover:text-orange"><Instagram size={20} /></a>
                <a href="#" className="text-gold hover:text-orange"><Facebook size={20} /></a>
                <a href="#" className="text-gold hover:text-orange"><Twitter size={20} /></a>
              </div>
            </div>
          </div>

          <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-cream/40">
            <p>© 2024 Hotel Shaurya Wada. All rights reserved.</p>
            <p className="mt-2 md:mt-0 font-['Mukta']">Designed with Maratha Pride</p>
          </div>
        </div>
      </footer>
    </div>
  );
}