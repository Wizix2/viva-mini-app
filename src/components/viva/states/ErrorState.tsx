import React from 'react';

interface ErrorStateProps {
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, action }) => {
  return (
    <div className="bg-red-500/10 border border-red-500/40 rounded-xl p-4 text-white/80">
      <div className="flex items-start">
        <div className="mr-3 flex-shrink-0">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-red-400" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
        <div className="flex-1">
          <p>{message}</p>
          
          {action && (
            <button 
              onClick={action.onClick}
              className="mt-3 text-sm bg-red-500/20 hover:bg-red-500/30 px-3 py-1 rounded-lg transition-colors duration-300"
            >
              {action.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
