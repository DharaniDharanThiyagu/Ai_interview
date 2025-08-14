import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse space-y-4 p-4">
      {/* Title skeleton */}
      <div className="h-6 bg-gray-300 rounded w-1/3"></div>

      {/* Paragraph skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
      </div>

      {/* Image skeleton */}
      <div className="h-40 bg-gray-300 rounded"></div>
    </div>
  );
};

export default SkeletonLoader;
