import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Sparkles, Calendar, Music, Ticket, Loader2 } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for leaflet icon issue
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function SetMapCenter({ center }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

export default function DiscoverPage() {
  const [activeSite, setActiveSite] = useState(null);
  const [aiContent, setAiContent] = useState(null);
  const [events, setEvents] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [findEventsLoading, setFindEventsLoading] = useState(false);

  // Heritage sites of Marathas
  const sites = [
  {
    id: 1,
    name: 'Shaniwar Wada',
    category: 'Fortress',
    description: 'The historic seat of the Peshwa rulers, showcasing the architectural grandeur of the Maratha Empire.',
    latitude: 18.5195,
    longitude: 73.8553,
    image_url: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Aga Khan Palace',
    category: 'Palace',
    description: 'Built by Sultan Muhammad Shah Aga Khan III, known for its association with Mahatma Gandhi and the freedom struggle.',
    latitude: 18.5417,
    longitude: 73.8797,
    image_url: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Sinhagad Fort',
    category: 'Fort',
    description: 'A historic hill fort with a crucial role in Maratha history, offering panoramic views of Pune.',
    latitude: 18.3667,
    longitude: 73.7556,
    image_url: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Parvati Hill Temple',
    category: 'Temple',
    description: 'An ancient temple complex dedicated to Goddess Parvati, featuring beautiful architecture and religious significance.',
    latitude: 18.4947,
    longitude: 73.8544,
    image_url: 'https://images.unsplash.com/photo-1587135941948-670b381f08ce?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 5,
    name: 'Lohagad Fort',
    category: 'Fort',
    description: 'An important Maratha stronghold guarding trade routes, known for its historic gates and Vinchu Kata defense wall.',
    latitude: 18.7515,
    longitude: 73.4207,
    image_url: 'https://images.unsplash.com/photo-1600379946238-8746f8a332fc?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 6,
    name: 'Torna Fort',
    category: 'Fort',
    description: 'Also called Prachandagad — the first fort captured by Shivaji Maharaj, offering panoramic Sahyadri views.',
    latitude: 18.2036,
    longitude: 73.5713,
    image_url: 'https://images.unsplash.com/photo-1613145997558-6a1c0e6323dc?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 7,
    name: 'Visapur Fort',
    category: 'Fort',
    description: 'Adjacent to Lohagad, with ruins, caves, and cisterns — part of the Maratha-era fort network.',
    latitude: 18.7470,
    longitude: 73.4150,
    image_url: 'https://images.unsplash.com/photo-1598990641645-7df8a78983a3?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 8,
    name: 'Tikona Fort',
    category: 'Fort',
    description: 'Pyramid-shaped hill fort with temple and water tanks, offering stunning views of the valley and lakes.',
    latitude: 18.5265,
    longitude: 73.6969,
    image_url: 'https://images.unsplash.com/photo-1589890908992-4c0ef451cdf2?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 9,
    name: 'Ghangad Fort',
    category: 'Fort',
    description: 'A lesser-known hill fort near Pune, part of the Maratha-era fort network, perfect for offbeat treks.',
    latitude: 18.7120,
    longitude: 73.6670,
    image_url: 'https://images.unsplash.com/photo-1608110471865-f7f0d3e8b6f0?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 10,
    name: 'Rajgad Fort',
    category: 'Fort',
    description: 'The first capital of the Maratha Empire under Shivaji Maharaj, featuring massive fortifications and scenic views.',
    latitude: 18.3660,
    longitude: 73.4000,
    image_url: 'https://images.unsplash.com/photo-1613113303463-6476d40e56d5?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 11,
    name: 'Raigad Fort',
    category: 'Fort',
    description: 'The capital fort of Chhatrapati Shivaji Maharaj, located atop a hill, overlooking the Konkan region.',
    latitude: 18.2340,
    longitude: 73.4000,
    image_url: 'https://images.unsplash.com/photo-1598896956042-1f2379f2ef36?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 12,
    name: 'Sinhagad Pataleshwar Caves',
    category: 'Historical Site',
    description: 'Ancient rock-cut caves near Sinhagad, showcasing Maratha-era cultural and architectural heritage.',
    latitude: 18.3670,
    longitude: 73.7540,
    image_url: 'https://images.unsplash.com/photo-1608689057345-6dbdd9f6d4b1?q=80&w=2070&auto=format&fit=crop'
  }
];


  const isLoading = false;

  // Mock AI facts about Maratha sites
  const siteFacts = {
  'Shaniwar Wada': [
    'Built in 1732, it was the seat of the Peshwas of the Maratha Empire.',
    'The fort had a unique water harvesting system and secret underground passages.',
    'It suffered a major fire in 1828 that destroyed much of its wooden structure.'
  ],
  'Aga Khan Palace': [
    'Constructed in 1892 by Sultan Muhammad Shah Aga Khan III.',
    'It served as a prison for Mahatma Gandhi, Kasturba Gandhi, and other freedom fighters.',
    'The palace gardens were designed in a European style by British architects.'
  ],
  'Sinhagad Fort': [
    'Famous for the heroic Battle of Sinhagad led by Tanaji Malusare in 1670.',
    'The fort is 1,312 meters above sea level, offering panoramic views of Pune.',
    'The fort has several water tanks carved into rock to sustain inhabitants.'
  ],
  'Parvati Hill Temple': [
    'The temple complex is over 400 years old and dedicated to Goddess Parvati.',
    'It has 108 steps leading up to the hilltop where the temples are situated.',
    'The hill offers spectacular views of Pune city and the surrounding region.'
  ],
  'Lohagad Fort': [
    'Its name means "Iron Fort" due to its strong gates and fortifications.',
    'Lohagad was used to control the trade routes between Pune and the Konkan region.',
    'It has a famous Vinchu Kata (Scorpion Tail) ridge, a challenging trekking path.'
  ],
  'Torna Fort': [
    'Also known as Prachandagad, it was the first fort captured by Shivaji Maharaj at age 16.',
    'The fort stands at 1,403 meters and offers commanding views of the surrounding region.',
    'Torna has several historic water cisterns and temples dedicated to Lord Shiva.'
  ],
  'Visapur Fort': [
    'Built alongside Lohagad Fort during Maratha rule for defensive purposes.',
    'Visapur is known for its caves, ancient cannons, and water cisterns.',
    'The fort provides spectacular sunset views over the Sahyadri ranges.'
  ],
  'Tikona Fort': [
    'Tikona Fort is pyramid-shaped and has a natural water tank at the summit.',
    'It was strategically important for the Marathas to oversee trade routes.',
    'The fort houses a small temple dedicated to Lord Ganesh at its top.'
  ],
  'Ghangad Fort': [
    'Ghangad is lesser-known but was part of Maratha fortifications network.',
    'It features multiple gates, rock-cut water tanks, and ruins of old buildings.',
    'Ideal for offbeat trekking, offering a blend of history and nature.'
  ],
  'Rajgad Fort': [
    'The first capital of the Maratha Empire under Shivaji Maharaj.',
    'It is spread over 125 square kilometers with multiple fortifications and palaces.',
    'The fort was strategically used to store ammunition and grain during wartime.'
  ],
  'Raigad Fort': [
    'The capital fort of Chhatrapati Shivaji Maharaj and his coronation site.',
    'It sits atop a hill with steep cliffs, making it almost impregnable.',
    'The fort has a royal palace, watchtowers, and historic water cisterns.'
  ],
  'Sinhagad Pataleshwar Caves': [
    'These ancient rock-cut caves date back over 1,500 years.',
    'They were used by local rulers and Maratha warriors for meditation and shelter.',
    'The caves showcase intricate carvings and architectural techniques of the era.'
  ]
};


  const generateFacts = (siteName) => {
    setAiContent(siteFacts[siteName] || []);
  };

  const findEvents = () => {
    // Mock events data
    setEvents([
      {
        title: 'Shaniwar Wada Sound & Light Show',
        date: 'Every evening at 7:00 PM',
        location: 'Shaniwar Wada, Pune',
        description: 'Experience the history of the Maratha Empire through an immersive sound and light show.',
        type: 'Heritage'
      },
      {
        title: 'Ganesh Festival Celebrations',
        date: 'September 2024',
        location: 'Various locations, Pune',
        description: 'Traditional Ganesh festival with cultural programs celebrating Maratha traditions.',
        type: 'Festival'
      },
      {
        title: 'Classical Music Concert',
        date: 'Every Sunday at 6:00 PM',
        location: 'Sawai Gandharva Hall, Pune',
        description: 'Weekly classical music performances reflecting Maratha cultural heritage.',
        type: 'Music'
      }
    ]);
  };

  const handleSiteClick = (site) => {
    setActiveSite(site);
    setAiContent(null);
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-maroon text-cream py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 pattern-jaali opacity-10" />
        <h1 className="text-4xl md:text-5xl font-['Cinzel'] text-gold mb-4 relative z-10">DISCOVER PUNE</h1>
        <p className="text-cream/80 font-['Lora'] max-w-2xl mx-auto relative z-10">
          Explore the heart of Maratha heritage. An interactive journey through history and culture.
        </p>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8 h-[calc(100vh-300px)] min-h-[600px]">
          
          {/* Sidebar */}
          <div className="bg-white border border-gold/20 rounded-lg shadow-lg overflow-hidden flex flex-col">
            <div className="p-4 bg-[#B7410E] text-white">
              <h3 className="font-['Cinzel'] text-lg font-bold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gold" /> Heritage Sites
              </h3>
            </div>
            <div className="overflow-y-auto flex-1 p-4 space-y-4">
              {isLoading ? (
                <div className="text-center py-10 text-maroon/50">Loading sites...</div>
              ) : (
                sites.map((site) => (
                  <motion.div
                    key={site.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleSiteClick(site)}
                    className={`p-4 rounded-lg cursor-pointer border transition-all ${
                      activeSite?.id === site.id 
                        ? 'bg-cream border-orange shadow-md' 
                        : 'bg-white border-gray-100 hover:border-gold/50'
                    }`}
                  >
                    <div className="flex gap-3">
                      <img 
                        src={site.image_url} 
                        alt={site.name} 
                        loading="lazy"
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <h4 className="font-bold text-maroon font-['Cinzel']">{site.name}</h4>
                        <span className="text-xs bg-gold/20 text-[#B7410E] px-2 py-0.5 rounded-full">
                          {site.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2 z-20 relative rounded-lg overflow-hidden shadow-xl border-2 border-maroon">
            <MapContainer 
              center={[18.5204, 73.8567]} 
              zoom={13} 
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {activeSite && <SetMapCenter center={[activeSite.latitude, activeSite.longitude]} />}
              {sites.map((site) => (
                <Marker 
                  key={site.id} 
                  position={[site.latitude, site.longitude]}
                  eventHandlers={{ click: () => handleSiteClick(site) }}
                />
              ))}
            </MapContainer>

            {/* Floating Info Panel */}
            <AnimatePresence>
              {activeSite && (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-6 rounded-lg border-t-4 border-orange shadow-2xl z-1000 max-h-[60%] overflow-y-auto"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-['Cinzel'] text-[#B7410E]">{activeSite.name}</h2>
                      <p className="text-maroon/60 text-sm italic">{activeSite.category}</p>
                    </div>
                    <button onClick={() => setActiveSite(null)} className="text-maroon hover:text-orange">✕</button>
                  </div>

                  <p className="text-maroon font-['Lora'] mb-6">{activeSite.description}</p>

                  {/* AI Fact Generator */}
                  <div className="bg-cream p-4 rounded-lg border border-gold/30">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold text-maroon flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-gold" /> Did You Know?
                      </h4>
                      {!aiContent && (
                        <button
                          onClick={() => {
                            setIsGenerating(true);
                            setTimeout(() => {
                              generateFacts(activeSite.name);
                              setIsGenerating(false);
                            }, 1000);
                          }}
                          disabled={isGenerating}
                          className="text-xs bg-maroon text-gold px-3 py-1 rounded hover:bg-[#B7410E] disabled:opacity-50 transition-colors"
                        >
                          {isGenerating ? 'Asking History...' : 'Ask AI for Secrets'}
                        </button>
                      )}
                    </div>

                    {isGenerating && (
                      <div className="flex items-center gap-2 text-sm text-maroon/60 italic">
                        <div className="animate-spin w-4 h-4 border-2 border-orange border-t-transparent rounded-full"></div>
                        Consulting the royal archives...
                      </div>
                    )}

                    {aiContent && (
                      <ul className="space-y-2">
                        {aiContent.map((fact, i) => (
                          <li key={i} className="text-sm text-maroon font-['Lora'] pl-4 relative">
                            <span className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-orange rounded-full"></span>
                            {fact}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Events Section */}
        <div className="mt-20 mb-12">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-gold"></div>
              <Calendar className="text-orange w-6 h-6" />
              <div className="h-px w-12 bg-gold"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-['Cinzel'] text-maroon mb-4">Upcoming Cultural Events</h2>
            <p className="text-maroon/70 font-['Lora'] max-w-2xl mx-auto mb-8">
              Immerse yourself in the vibrant cultural tapestry of Maratha heritage.
            </p>
            
            {!events && (
              <button
                onClick={() => {
                  setFindEventsLoading(true);
                  setTimeout(() => {
                    findEvents();
                    setFindEventsLoading(false);
                  }, 1000);
                }}
                disabled={findEventsLoading}
                className="bg-orange text-white px-8 py-3 font-['Cinzel'] font-bold tracking-wider hover:bg-[#B7410E] transition-colors shadow-lg disabled:opacity-70 flex items-center gap-2 mx-auto"
              >
                {findEventsLoading ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" /> Scouting Events...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" /> Find Local Events
                  </>
                )}
              </button>
            )}
          </div>

          {events && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {events.map((event, idx) => (
                <div key={idx} className="bg-white border border-gold/20 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 right-0 bg-gold text-royal-brown text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
                    {event.type}
                  </div>
                  <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10">
                     {event.type.includes('Music') ? <Music size={100} /> : <Ticket size={100} />}
                  </div>
                  
                  <h3 className="text-xl font-['Cinzel'] text-[#B7410E] mb-2 pr-8">{event.title}</h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-2 text-sm text-maroon">
                      <Calendar className="w-4 h-4 mt-0.5 text-gold" />
                      <span className="font-bold">{event.date}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-maroon">
                      <MapPin className="w-4 h-4 mt-0.5 text-gold" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-maroon/80 text-sm font-['Lora'] leading-relaxed border-t border-gold/10 pt-4">
                    {event.description}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
