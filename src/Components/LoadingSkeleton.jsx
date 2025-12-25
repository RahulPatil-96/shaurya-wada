import React from 'react';

const Skeleton = ({ className = '', ...props }) => (
  <div
    className={`animate-pulse bg-gray-200 rounded ${className}`}
    {...props}
  />
);

const LoadingSkeleton = {
  // Card skeleton for experiences/packages
  Card: () => (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gold/20">
      <Skeleton className="h-48 w-full" />
      <div className="p-6">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-4 w-2/3 mb-6" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  ),

  // Text skeleton for paragraphs
  Text: ({ lines = 3 }) => (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
        />
      ))}
    </div>
  ),

  // Image skeleton
  Image: ({ className = 'h-48 w-full' }) => (
    <Skeleton className={`${className} rounded-lg`} />
  ),

  // Button skeleton
  Button: ({ className = 'h-10 w-32' }) => (
    <Skeleton className={`${className} rounded`} />
  ),

  // Avatar skeleton
  Avatar: ({ size = 'w-12 h-12' }) => (
    <Skeleton className={`${size} rounded-full`} />
  ),

  // Table skeleton
  Table: ({ rows = 5, cols = 4 }) => (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex space-x-4">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              className={`h-4 ${colIndex === 0 ? 'w-1/4' : colIndex === cols - 1 ? 'w-1/6' : 'w-1/3'}`}
            />
          ))}
        </div>
      ))}
    </div>
  ),

  // Room card skeleton
  RoomCard: () => (
    <div className="flex flex-col lg:flex-row gap-8 items-center">
      <Skeleton className="w-full lg:w-1/2 h-96 rounded-lg" />
      <div className="w-full lg:w-1/2 space-y-6">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-12 w-3/4" />
        <LoadingSkeleton.Text lines={3} />
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-full" />
          ))}
        </div>
        <div className="flex justify-between items-center pt-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-12 w-32 rounded" />
        </div>
      </div>
    </div>
  ),

  // Gallery grid skeleton
  GalleryGrid: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="aspect-square rounded-lg" />
      ))}
    </div>
  ),

  // Menu item skeleton
  MenuItem: () => (
    <div className="flex justify-between items-start border-b border-dashed border-gold/30 pb-4">
      <div className="pr-4 flex-1">
        <Skeleton className="h-6 w-2/3 mb-2" />
        <LoadingSkeleton.Text lines={2} />
      </div>
      <Skeleton className="h-6 w-16" />
    </div>
  )
};

export default LoadingSkeleton;
