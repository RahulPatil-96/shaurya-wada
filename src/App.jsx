import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './Components/Layout';
import ErrorBoundary from './Components/ErrorBoundary';
import { ThemeProvider } from './contexts/ThemeContext';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./Pages/Home'));
const RoomsPage = lazy(() => import('./Pages/Rooms'));
const DiningPage = lazy(() => import('./Pages/Dining'));
const DiscoverPage = lazy(() => import('./Pages/Discover'));
const ExperiencesPage = lazy(() => import('./Pages/Experiences'));
const LocationsPage = lazy(() => import('./Pages/Locations'));
const GalleryPage = lazy(() => import('./Pages/Gallery'));
const ContactPage = lazy(() => import('./Pages/Contact'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-cream flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin w-12 h-12 border-4 border-maroon border-t-transparent rounded-full mx-auto mb-4"></div>
      <p className="text-maroon font-['Cinzel']">Loading...</p>
    </div>
  </div>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/Rooms" element={<RoomsPage />} />
          <Route path="/Dining" element={<DiningPage />} />
          <Route path="/Discover" element={<DiscoverPage />} />
          <Route path="/Experiences" element={<ExperiencesPage />} />
          <Route path="/Locations" element={<LocationsPage />} />
          <Route path="/Gallery" element={<GalleryPage />} />
          <Route path="/Contact" element={<ContactPage />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
