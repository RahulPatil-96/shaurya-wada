import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function ContactPage() {
  const location = useLocation();
  const packageDetails = location.state?.package;

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: packageDetails ? `I would like to book the "${packageDetails.title}" package (₹${packageDetails.price}).` : '',
    interest: packageDetails ? 'Experience Package' : 'General Inquiry'
  });
  const [submitted, setSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <div className="bg-cream min-h-screen pt-10 pb-20">
      <div className="container mx-auto px-6">

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-['Cinzel'] text-maroon mb-4">CONTACT US</h1>
          <p className="text-lg text-maroon/70 font-['Lora']">We are at your service, always.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="bg-royal-brown text-cream p-10 rounded-lg shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 pattern-jaali opacity-10" />
            <div className="relative z-10 space-y-8">
              <h3 className="text-2xl font-['Cinzel'] text-gold border-b border-gold/30 pb-4">Reach Us At</h3>

              <div className="flex items-start gap-4">
                <div className="bg-orange p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gold">Address</h4>
                  <p className="opacity-80">NH65, Katraj Bypass Rd, opposite Hande Lawns, Handewadi,<br /> Pune, Maharashtra 412308</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-orange p-3 rounded-full">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gold">Phone</h4>
                  <p className="opacity-80">+91 95527 57171<br />+91 98 7654 3210</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-orange p-3 rounded-full">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gold">Email</h4>
                  <p className="opacity-80">reservations@shauryawada.com<br />info@shauryawada.com</p>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-gold/30">
                <iframe
                  src="https://www.google.com/maps?q=18.4698,73.9275&hl=en&z=16&output=embed"
                  width="100%"
                  height="200"
                  style={{ border: 0, borderRadius: '0.5rem' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-10 rounded-lg shadow-xl border-t-4 border-orange">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send size={32} />
                </div>
                <h3 className="text-2xl font-['Cinzel'] text-maroon mb-2">Message Sent!</h3>
                <p className="text-gray-600">Thank you for contacting us. Our Royal Concierge will get back to you shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-orange underline hover:text-[#B7410E]"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-['Cinzel'] text-maroon mb-6">Send an Inquiry</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-maroon uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-cream border border-gold/40 p-3 rounded focus:border-orange focus:outline-none"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-maroon uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      required
                      className="w-full bg-cream border border-gold/40 p-3 rounded focus:border-orange focus:outline-none"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-maroon uppercase tracking-wider">Interested In</label>
                  <select
                    className="w-full bg-cream border border-gold/40 p-3 rounded focus:border-orange focus:outline-none"
                    value={formData.interest}
                    onChange={e => setFormData({ ...formData, interest: e.target.value })}
                  >
                    <option>Room Booking</option>
                    <option>Dining Reservation</option>
                    <option>Event Hosting</option>
                    <option>General Inquiry</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-maroon uppercase tracking-wider">Message</label>
                  <textarea
                    rows={5}
                    className="w-full bg-cream border border-gold/40 p-3 rounded focus:border-orange focus:outline-none"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-maroon text-cream py-4 font-['Cinzel'] font-bold tracking-wider hover:bg-orange transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Sending...' : 'SEND MESSAGE'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}