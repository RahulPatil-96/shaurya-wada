import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, ChevronRight, Wifi, Utensils, Car } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, DivIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default Leaflet markers
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Default marker icon
const defaultIcon = new Icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Gold-red pulsing DivIcon
const createPulsingIcon = () => new DivIcon({
  html: `<div class="pulse-marker-royal"></div>`,
  className: '',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Fly and scroll to selected marker
function FlyToLocation({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 14, { duration: 1.5 });
    }
  }, [position, map]);
  return null;
}

// Full franchises data
const franchises = [
  {
    id: "undri",
    lat: 18.4319,
    lng: 73.9312,
    city: "Pune",
    title: "Hotel Shauryawada – Undri (Handewadi)",
    address: "175, Handewadi Rd, Satav Nagar, Undri, Pune, Maharashtra 411028, India",
    phone: "+91 88528 17171",
    hours: "11:00 AM – 11:00 PM",
    description: "Flagship outlet known for classic Maharashtrian thalis, raan specialties & family dining.",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2032&auto=format&fit=crop",
    amenities: [
      { icon: <Wifi className="w-4 h-4" />, label: 'Hi-Speed Wifi' },
      { icon: <Utensils className="w-4 h-4" />, label: 'Royal Dining' },
      { icon: <Car className="w-4 h-4" />, label: 'Valet Parking' },
    ]
  },
  {
    id: "wagholi",
    lat: 18.5681,
    lng: 73.9637,
    city: "Pune",
    title: "Hotel Shauryawada – Wagholi",
    address: "Gat No.502, Haveli, Katkewadi Chowk, Nagar Rd, Wagholi, Pune, Maharashtra 412207, India",
    phone: "+91 88528 17171",
    hours: "11:00 AM – 11:00 PM",
    description: "Popular Wagholi branch serving Maharashtrian and North Indian fare with delivery & takeaway.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
    amenities: [
      { icon: <Wifi className="w-4 h-4" />, label: 'Hi-Speed Wifi' },
      { icon: <Utensils className="w-4 h-4" />, label: 'Royal Dining' },
      { icon: <Car className="w-4 h-4" />, label: 'Valet Parking' },
    ]
  },
  {
    id: "bhosari",
    lat: 18.6225,
    lng: 73.7731,
    city: "Pune (PCMC)",
    title: "Hotel Shauryawada – Bhosari",
    address: "Plot 87/2/1, Nashik Rd Hwy, near Landge Petrol Pump, Sector 3, Bhosari, Pimpri‑Chinchwad, MH 411039, India",
    phone: "+91 95522 47171",
    hours: "11:00 AM – 11:00 PM",
    description: "Bhosari branch offering Maharashtrian and North Indian multispecialty menu with home delivery.",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2032&auto=format&fit=crop",
    amenities: [
      { icon: <Wifi className="w-4 h-4" />, label: 'Hi-Speed Wifi' },
      { icon: <Utensils className="w-4 h-4" />, label: 'Royal Dining' },
      { icon: <Car className="w-4 h-4" />, label: 'Valet Parking' },
    ]
  },
  {
    id: "uruli-kanchan",
    lat: 18.4471,
    lng: 73.9620,
    city: "Pune",
    title: "Hotel Shauryawada – Uruli Kanchan",
    address: "Solapur Pune Hwy, Near Sortapwadi Phata, Uruli Kanchan, Pune, MH 412202, India",
    phone: null,
    hours: "11:00 AM – 10:30 PM",
    description: "Highway branch near Sortapwadi Phata serving family dining and local favorites.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
    amenities: [
      { icon: <Wifi className="w-4 h-4" />, label: 'Hi-Speed Wifi' },
      { icon: <Utensils className="w-4 h-4" />, label: 'Royal Dining' },
      { icon: <Car className="w-4 h-4" />, label: 'Valet Parking' },
    ]
  },
  {
    id: "loni-kalbhor",
    lat: 18.4294,
    lng: 73.9438,
    city: "Pune",
    title: "Hotel Shauryawada – Loni Kalbhor",
    address: "Solapur Pune Hwy, Loni Kalbhor, Pune, MH 412201, India",
    phone: null,
    hours: "11:00 AM – 10:30 PM",
    description: "Pure veg / local favorites branch on Pune–Solapur Highway.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
    amenities: [
      { icon: <Wifi className="w-4 h-4" />, label: 'Hi-Speed Wifi' },
      { icon: <Utensils className="w-4 h-4" />, label: 'Royal Dining' },
      { icon: <Car className="w-4 h-4" />, label: 'Valet Parking' },
    ]
  },
  {
    id: "lonavala",
    lat: 18.7553,
    lng: 73.4156,
    city: "Lonavala",
    title: "Hotel Shauryawada – Lonavala",
    address: "Gat 736/1, Near Jagadguru Hotel, Mauje Waksai, Mawal, Lonavala, MH 410403, India",
    phone: "+91 74474 21414",
    hours: "10:30 AM – 11:30 PM",
    description: "Lonavala highway branch popular with travelers and locals alike.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
    amenities: [
      { icon: <Wifi className="w-4 h-4" />, label: 'Hi-Speed Wifi' },
      { icon: <Utensils className="w-4 h-4" />, label: 'Royal Dining' },
      { icon: <Car className="w-4 h-4" />, label: 'Valet Parking' },
    ]
  },
  {
    id: "hadapsar",
    lat: 18.5015,
    lng: 73.9235,
    city: "Pune",
    title: "Hotel Shauryawada – Hadapsar",
    address: "Near Gadital Chowk, Pune‑Solapur Road, Hadapsar, Pune, MH 411028, India",
    phone: null,
    hours: "11:00 AM – 11:00 PM",
    description: "Hadapsar branch near Gadital Chowk with multi‑cuisine dining.",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2032&auto=format&fit=crop",
    amenities: [
      { icon: <Wifi className="w-4 h-4" />, label: 'Hi-Speed Wifi' },
      { icon: <Utensils className="w-4 h-4" />, label: 'Royal Dining' },
      { icon: <Car className="w-4 h-4" />, label: 'Valet Parking' },
    ]
  },
  {
    id: "solapur-road",
    lat: 18.4632,
    lng: 73.9197,
    city: "Pune",
    title: "Hotel Shauryawada – Pune Solapur Road",
    address: "GAT 163, Opposite Om Nursery, Pune‑Solapur Road, Pune, MH 412201, India",
    phone: "+91 90908 62424",
    hours: "11:00 AM – 11:00 PM",
    description: "Solapur Road branch offering traditional Maharashtrian and Mughlai options.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
    amenities: [
      { icon: <Wifi className="w-4 h-4" />, label: 'Hi-Speed Wifi' },
      { icon: <Utensils className="w-4 h-4" />, label: 'Royal Dining' },
      { icon: <Car className="w-4 h-4" />, label: 'Valet Parking' },
    ]
  },
  {
    id: "khed-shivapur",
    lat: 18.5724,
    lng: 73.8229,
    city: "Pune",
    title: "Hotel Shauryawada – Khed Shivapur",
    address: "Near Khed Shivapur, Pune, Maharashtra, India",
    phone: null,
    hours: "11:00 AM – 10:30 PM",
    description: "Branch listed in some brand expansion mentions — verify on local directories.",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2032&auto=format&fit=crop",
    amenities: [
      { icon: <Wifi className="w-4 h-4" />, label: 'Hi-Speed Wifi' },
      { icon: <Utensils className="w-4 h-4" />, label: 'Royal Dining' },
      { icon: <Car className="w-4 h-4" />, label: 'Valet Parking' },
    ]
  },
  {
    id: "ahilyanagar",
    lat: 18.4910,
    lng: 73.8500,
    city: "Pune",
    title: "Hotel Shauryawada – Ahilyanagar",
    address: "Ahilyanagar, Pune, Maharashtra, India",
    phone: null,
    hours: "11:00 AM – 10:30 PM",
    description: "Reported local branch in Ahilyanagar area with similar branding — verify locally.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
    amenities: [
      { icon: <Wifi className="w-4 h-4" />, label: 'Hi-Speed Wifi' },
      { icon: <Utensils className="w-4 h-4" />, label: 'Royal Dining' },
      { icon: <Car className="w-4 h-4" />, label: 'Valet Parking' },
    ]
  },
  {
    id: "nashik",
    lat: 19.9975,
    lng: 73.7898,
    city: "Nashik",
    title: "Hotel Shauryawada – Nashik",
    address: "Serve No. 476, Kuber Nagar, near Kuber Swami Petrol Pump, Nashik, Maharashtra 422007, India",
    phone: null,
    hours: "11:00 AM – 11:00 PM",
    description: "Nashik branch confirmed in listings with local reviews.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
    amenities: [
      { icon: <Wifi className="w-4 h-4" />, label: 'Hi-Speed Wifi' },
      { icon: <Utensils className="w-4 h-4" />, label: 'Royal Dining' },
      { icon: <Car className="w-4 h-4" />, label: 'Valet Parking' },
    ]
  }
];

export default function LocationsPage() {
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const markerRefs = useRef({});
  const mapContainerRef = useRef(null);

  const handlePinClick = (id, lat, lng) => {
    setSelectedLocationId(id);
    mapContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  useEffect(() => {
    if (!selectedLocationId) return;
    const marker = markerRefs.current[selectedLocationId];
    if (marker) {
      marker.openPopup();
      const timeout = setTimeout(() => setSelectedLocationId(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [selectedLocationId]);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <div className="relative py-24 bg-royal-brown text-cream overflow-hidden">
        <div className="absolute inset-0 pattern-jaali opacity-10" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-['Cinzel'] mb-6 text-gold">
            <span className="gold-heading" data-text="OUR KINGDOM">OUR KINGDOM</span>
          </h1>
          <p className="text-xl font-['Lora'] max-w-3xl mx-auto text-cream/80 leading-relaxed">
            The Shaurya Wada legacy is expanding across Maharashtra. Each location reflects the local culture while upholding our standard of royal hospitality.
          </p>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="container mx-auto px-6 py-20">
        <div className="space-y-20">
          {franchises.map((place, idx) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 items-center`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2 relative group">
                <div className={`absolute top-4 ${idx % 2 === 0 ? '-left-4' : '-right-4'} w-full h-full border-2 border-gold z-0 transition-transform group-hover:translate-x-2 group-hover:translate-y-2`} />
                <div className="relative z-10 overflow-hidden rounded-lg shadow-2xl h-[400px]">
                  <img
                    src={place.image}
                    alt={place.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div
                  className="flex items-center gap-3 mb-2 cursor-pointer"
                  onClick={() => handlePinClick(place.id, place.lat, place.lng)}
                >
                  <MapPin className="text-orange w-6 h-6" />
                  <span className="font-['Cinzel'] text-maroon tracking-widest text-sm">{place.city.toUpperCase()}</span>
                </div>

                <h2 className="text-4xl font-['Cinzel'] text-maroon">{place.title}</h2>
                <p className="text-maroon/80 font-['Lora'] text-lg leading-relaxed">{place.address}</p>
                {place.description && <p className="text-maroon/70 font-['Lora']">{place.description}</p>}

                {/* Hours */}
                <p className="flex items-center gap-2 text-maroon/70">
                  <Clock className="w-4 h-4" /> {place.hours}
                </p>

                {/* Amenities */}
                <div className="border-t border-gold/30 pt-6 mt-6">
                  <h4 className="font-['Cinzel'] text-[#B7410E] mb-4 text-sm font-bold tracking-wide">ROYAL AMENITIES</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {place.amenities.map((amenity, i) => (
                      <div key={i} className="flex items-center gap-2 text-maroon/70 text-sm">
                        <div className="text-gold">{amenity.icon}</div>
                        <span>{amenity.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  {place.phone && (
                    <p className="font-['Lora'] text-maroon/80">📞 {place.phone}</p>
                  )}
                  <Link to={createPageUrl('Contact')}>
                    <button className="group flex items-center gap-2 text-maroon font-bold hover:text-orange transition-colors font-['Cinzel'] mt-3">
                      BOOK THIS WADA <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <div ref={mapContainerRef} className="container mx-auto px-6 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-['Cinzel'] text-maroon mb-4">OUR ROYAL FOOTPRINT</h2>
          <div className="w-20 h-1 bg-gold mx-auto" />
        </div>
        <div className="h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden shadow-2xl border-4 border-gold/30">
          <MapContainer
            center={[18.5204, 73.8567]}
            zoom={7}
            style={{ height: '100%', width: '100%', zIndex: 20 }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {franchises.map((place) => (
              <Marker
                key={place.id}
                position={[place.lat, place.lng]}
                icon={selectedLocationId === place.id ? createPulsingIcon() : defaultIcon}
                ref={(ref) => (markerRefs.current[place.id] = ref)}
              >
                <Popup>
                  <div className="text-center p-4 rounded-xl shadow-xl border-2 w-72 border-gold bg-cream">
                    {/* Title */}
                    <h3 className="font-bold text-lg mb-2 font-cinzel text-maroon">
                      {place.title}
                    </h3>

                    {/* Address */}
                    <p className="text-xs mb-2 text-royal-brown">
                      {place.address}
                    </p>

                    {/* Phone */}
                    {place.phone && (
                      <p className="text-xs mb-1 text-royal-brown">
                        📞 {place.phone}
                      </p>
                    )}

                    {/* Hours */}
                    {place.hours && (
                      <p className="text-xs flex items-center justify-center mb-2 text-royal-brown">
                        <Clock className="w-3 h-3 mr-1" /> {place.hours}
                      </p>
                    )}

                    {/* Amenities */}
                    {place.amenities && place.amenities.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-2 mt-2">
                        {place.amenities.map((amenity, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1 text-xs px-2 py-1 rounded-full shadow-sm text-gold bg-cream"
                          >
                            {amenity.icon}
                            <span>{amenity.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Popup>

              </Marker>
            ))}
            {selectedLocationId && (
              <FlyToLocation
                position={[
                  franchises.find(f => f.id === selectedLocationId)?.lat,
                  franchises.find(f => f.id === selectedLocationId)?.lng
                ]}
              />
            )}
          </MapContainer>
        </div>
      </div>

      {/* Expansion CTA */}
      <div className="bg-maroon py-20 text-center text-cream relative overflow-hidden">
        <div className="absolute inset-0 pattern-jaali opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-['Cinzel'] text-gold mb-6">Join the Royal Family</h2>
          <p className="max-w-2xl mx-auto font-['Lora'] mb-8 opacity-80">
            Interested in bringing the Shaurya Wada legacy to your city? We are looking for franchise partners who share our passion for heritage and hospitality.
          </p>
          <Link to={createPageUrl('Contact')}>
            <button className="bg-gold text-royal-brown px-8 py-3 font-['Cinzel'] font-bold hover:bg-cream transition-colors shadow-lg">
              FRANCHISE INQUIRY
            </button>
          </Link>
        </div>
      </div>

      {/* Pulsing Royal Marker CSS */}
      <style>{`
        .pulse-marker-royal {
          width: 25px;
          height: 41px;
          background: radial-gradient(circle, #FFD700 0%, #FF4500 70%);
          border-radius: 50% 50% 50% 50%;
          position: relative;
          animation: pulseRoyal 1.2s infinite;
        }
        .pulse-marker-royal::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,215,0,0.5) 0%, rgba(255,69,0,0.2) 70%);
          top: 0; left: 0;
          animation: pulseScaleRoyal 1.2s infinite;
        }
        @keyframes pulseRoyal {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        @keyframes pulseScaleRoyal {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.6); opacity: 0.3; }
          100% { transform: scale(1); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
