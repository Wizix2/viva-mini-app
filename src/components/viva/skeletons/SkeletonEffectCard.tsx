import React from 'react';

const SkeletonEffectCard: React.FC = () => {
  return (
    <div className="premium-card h-[150px] rounded-2xl flex flex-col items-center justify-center">
      <div className="animate-pulse flex flex-col items-center justify-center w-full h-full">
        <div className="bg-white/5 rounded-full h-12 w-12 mb-3"></div>
        <div className="bg-white/5 rounded-lg h-4 w-24"></div>
      </div>
    </div>
  );
};

export default SkeletonEffectCard;
