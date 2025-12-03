import React from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  description, 
  icon, 
  action 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-white/60">
      {icon ? (
        <div className="mb-4 text-white/40">
          {icon}
        </div>
      ) : (
        <div className="w-16 h-16 rounded-full bg-dark-200 flex items-center justify-center mb-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 text-white/40" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M20 12H4" 
            />
          </svg>
        </div>
      )}
      
      <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
      
      {description && (
        <p className="text-center text-white/60 mb-6 max-w-xs">{description}</p>
      )}
      
      {action && (
        <button 
          onClick={action.onClick}
          className="gradient-bg px-6 py-2.5 rounded-xl text-white font-medium shadow-premium transition-all duration-300 hover:shadow-hover"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
