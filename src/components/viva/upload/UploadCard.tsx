import React, { ReactNode } from 'react';

interface UploadCardProps {
  children: ReactNode;
  className?: string;
}

const UploadCard: React.FC<UploadCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-[#1A142B] rounded-3xl p-6 shadow-xl shadow-black/30 border border-white/5 animate-fadeInScale ${className}`}>
      <div className="flex flex-col gap-4 text-white/85">
        {children}
      </div>
    </div>
  );
};

export default UploadCard;
