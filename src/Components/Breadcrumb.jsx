import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Define breadcrumb labels for routes
  const breadcrumbLabels = {
    '': 'Home',
    'Rooms': 'Rooms',
    'Dining': 'Dining',
    'Discover': 'Discover',
    'Experiences': 'Experiences',
    'Locations': 'Locations',
    'Gallery': 'Gallery',
    'Contact': 'Contact'
  };

  return (
    <nav aria-label="Breadcrumb" className="py-4 px-4 md:px-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        <li>
          <Link
            to="/"
            className="flex items-center hover:text-maroon transition-colors"
            aria-label="Home"
          >
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>
        </li>
        {pathnames.map((pathname, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const label = breadcrumbLabels[pathname] || pathname;

          return (
            <li key={pathname} className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              {isLast ? (
                <span className="text-maroon font-medium" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="hover:text-maroon transition-colors"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
