import React, { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Eye } from 'lucide-react';

const VirtualTour = lazy(() => import('../Components/virtual-tour/VirtualTour'));

const images = [
  { src: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1974&auto=format&fit=crop", cat: "Architecture" },
  { src: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=2070&auto=format&fit=crop", cat: "Architecture" },
  { src: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2070&auto=format&fit=crop", cat: "Interiors" },
  { src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop", cat: "Interiors" },
  { src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1974&auto=format&fit=crop", cat: "Dining" },
  { src: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=1974&auto=format&fit=crop", cat: "Dining" },
  { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop", cat: "Dining" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop", cat: "Dining" },
  { src: "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?q=80&w=1974&auto=format&fit=crop", cat: "Events" },
  { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1974&auto=format&fit=crop", cat: "Events" },
  { src: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop", cat: "Heritage" },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('All');
  const [showVirtualTour, setShowVirtualTour] = useState(false);

  const filteredImages = filter === 'All' ? images : images.filter(img => img.cat === filter);

  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-['Cinzel'] text-maroon mb-4">VISUAL JOURNEY</h1>
          <p className="text-maroon/70">Glimpses of the royal life at Shaurya Wada.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12" role="group" aria-label="Gallery filters">
          {['All', 'Architecture', 'Interiors', 'Dining', 'Heritage', 'Events'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-['Cinzel'] tracking-wider text-sm transition-all ${
                filter === cat
                  ? 'bg-orange text-white shadow-lg'
                  : 'bg-white text-maroon border border-gold/30 hover:border-orange'
              }`}
              aria-pressed={filter === cat}
              aria-label={`Filter gallery by ${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Virtual Tour Toggle */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowVirtualTour(!showVirtualTour)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-['Cinzel'] tracking-wider text-sm transition-all ${
              showVirtualTour
                ? 'bg-orange text-white shadow-lg'
                : 'bg-white text-maroon border border-gold/30 hover:border-orange'
            }`}
          >
            <Eye size={18} />
            {showVirtualTour ? 'Back to Gallery' : 'Virtual Tour'}
          </button>
        </div>

        {/* Grid or Virtual Tour */}
        {showVirtualTour ? (
          <div className="relative">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-['Cinzel'] text-maroon mb-4">360° Virtual Tour</h2>
              <p className="text-maroon/70">Explore Shaurya Wada in immersive 360° view</p>
            </div>
            <div className="w-full h-[70vh] rounded-lg overflow-hidden shadow-2xl">
              <VirtualTour onClose={() => setShowVirtualTour(false)} />
            </div>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {filteredImages.map((img, idx) => (
                <motion.div
                  layout
                  key={img.src}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ y: -5 }}
                  className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg shadow-md"
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img.src}
                    alt={`${img.cat} - Hotel Shaurya Wada`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="text-white w-8 h-8" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-100 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            aria-describedby="lightbox-description"
          >
            <button
              className="absolute top-6 right-6 text-white/80 hover:text-white"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image gallery lightbox"
            >
              <X size={32} />
            </button>
            <img
              src={selectedImage.src}
              alt={`${selectedImage.cat} - Hotel Shaurya Wada`}
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl border-4 border-gold"
              onClick={(e) => e.stopPropagation()}
              id="lightbox-image"
            />
            <div id="lightbox-title" className="sr-only">{selectedImage.cat} Image</div>
            <div id="lightbox-description" className="sr-only">Enlarged view of {selectedImage.cat.toLowerCase()} at Hotel Shaurya Wada</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}