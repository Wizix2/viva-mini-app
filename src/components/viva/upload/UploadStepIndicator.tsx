import React from 'react';

interface UploadStepIndicatorProps {
  step: number;
  className?: string;
}

const UploadStepIndicator: React.FC<UploadStepIndicatorProps> = ({ step, className = '' }) => {
  const steps = [
    { id: 1, label: 'Выбор файла' },
    { id: 2, label: 'Предпросмотр' },
    { id: 3, label: 'Подтверждение' }
  ];

  return (
    <div className={`w-full flex justify-between items-center mb-6 ${className}`}>
      {steps.map((s) => (
        <div key={s.id} className="flex flex-col items-center">
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              s.id === step 
                ? 'bg-gradient-button shadow-glow' 
                : s.id < step 
                  ? 'bg-primary-500/20 border border-primary-500/40' 
                  : 'bg-white/10 border border-white/10'
            }`}
          >
            {s.id < step ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <span className={`text-sm font-medium ${s.id === step ? 'text-white' : 'text-white/50'}`}>
                {s.id}
              </span>
            )}
          </div>
          <span className={`text-xs mt-2 ${s.id === step ? 'text-white' : 'text-white/50'}`}>
            {s.label}
          </span>
        </div>
      ))}
      
      {/* Connector lines */}
      <div className="absolute left-0 right-0 flex justify-center z-[-1]">
        <div className="w-2/3 h-[2px] bg-white/10 mt-4">
          <div 
            className="h-full bg-gradient-to-r from-primary-500 to-accent-light" 
            style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default UploadStepIndicator;
