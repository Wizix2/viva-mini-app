import React, { ReactNode } from 'react';

interface ResultContainerProps {
  children: ReactNode;
}

const ResultContainer: React.FC<ResultContainerProps> = ({ children }) => {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-[#1A142B] rounded-3xl p-5 shadow-xl shadow-black/30 overflow-hidden">
        <div className="flex flex-col space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ResultContainer;
