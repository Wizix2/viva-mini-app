import React from 'react';

const SkeletonHistoryItem: React.FC = () => {
  return (
    <div className="premium-card p-5 rounded-2xl">
      <div className="animate-pulse flex items-center">
        <div className="bg-white/5 rounded-xl h-16 w-16 mr-5 flex-shrink-0"></div>
        <div className="flex-1">
          <div className="bg-white/5 rounded-lg h-5 w-32 mb-2"></div>
          <div className="bg-white/5 rounded-lg h-4 w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonHistoryItem;
