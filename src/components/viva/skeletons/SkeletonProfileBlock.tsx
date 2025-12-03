import React from 'react';

const SkeletonProfileBlock: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Avatar skeleton */}
      <div className="animate-pulse bg-white/5 rounded-full h-28 w-28 mb-5"></div>
      
      {/* Name skeleton */}
      <div className="animate-pulse bg-white/5 rounded-lg h-6 w-40 mb-2"></div>
      
      {/* Username skeleton */}
      <div className="animate-pulse bg-white/5 rounded-lg h-4 w-24 mb-10"></div>
      
      {/* Plan block skeleton */}
      <div className="premium-card w-full p-5 mb-6 rounded-2xl">
        <div className="animate-pulse flex items-center justify-between">
          <div className="flex-1">
            <div className="bg-white/5 rounded-lg h-5 w-32 mb-2"></div>
            <div className="bg-white/5 rounded-lg h-4 w-40"></div>
          </div>
          <div className="bg-white/5 rounded-xl h-10 w-24"></div>
        </div>
      </div>
      
      {/* Balance block skeleton */}
      <div className="premium-card w-full p-5 mb-6 rounded-2xl">
        <div className="animate-pulse flex items-center justify-between">
          <div className="flex-1">
            <div className="bg-white/5 rounded-lg h-5 w-24 mb-2"></div>
            <div className="bg-white/5 rounded-lg h-4 w-36"></div>
          </div>
          <div className="bg-white/5 rounded-xl h-10 w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonProfileBlock;
