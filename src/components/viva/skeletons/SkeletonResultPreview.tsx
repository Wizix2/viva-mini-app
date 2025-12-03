import React from 'react';

const SkeletonResultPreview: React.FC = () => {
  return (
    <div className="premium-card p-5 mb-6 rounded-2xl">
      <div className="animate-pulse">
        {/* Title skeleton */}
        <div className="bg-white/5 rounded-lg h-6 w-48 mb-2"></div>
        
        {/* Description skeleton */}
        <div className="bg-white/5 rounded-lg h-4 w-64 mb-5"></div>
        
        {/* Video/Image container skeleton */}
        <div className="bg-white/5 rounded-2xl aspect-video w-full mb-5"></div>
        
        {/* Info text skeleton */}
        <div className="flex justify-center">
          <div className="bg-white/5 rounded-lg h-4 w-32"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonResultPreview;
