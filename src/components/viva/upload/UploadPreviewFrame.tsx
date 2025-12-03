import React, { ReactNode } from 'react';

interface UploadPreviewFrameProps {
  children: ReactNode;
  className?: string;
}

const UploadPreviewFrame: React.FC<UploadPreviewFrameProps> = ({ children, className = '' }) => {
  return (
    <div className={`rounded-2xl overflow-hidden border border-white/10 shadow-inner-glow ${className}`}>
      {children}
    </div>
  );
};

export default UploadPreviewFrame;
