import React from 'react';

interface ResultActionsProps {
  onDownload?: () => void;
  onShare?: () => void;
  onCreateMore?: () => void;
  isSharing?: boolean;
  showDownload?: boolean;
  disabled?: boolean;
}

const ResultActions: React.FC<ResultActionsProps> = ({
  onDownload,
  onShare,
  onCreateMore,
  isSharing = false,
  showDownload = true,
  disabled = false
}) => {
  return (
    <div className="flex flex-col gap-3">
      {showDownload && (
        <button
          onClick={onDownload}
          disabled={disabled}
          className="bg-gradient-to-r from-[#9C4DFF] to-[#B86CFF] text-white py-3 px-4 rounded-xl font-medium 
                    shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-[1.02] 
                    active:scale-[0.98] transition-all duration-200 disabled:opacity-60 
                    disabled:hover:scale-100 disabled:shadow-none flex items-center justify-center"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
          Скачать
        </button>
      )}

      <button
        onClick={onShare}
        disabled={disabled || isSharing}
        className="bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-xl font-medium 
                  border border-white/10 hover:border-white/20 hover:scale-[1.02] 
                  active:scale-[0.98] transition-all duration-200 disabled:opacity-60 
                  disabled:hover:scale-100 disabled:hover:bg-white/10 flex items-center justify-center"
      >
        {isSharing ? (
          <>
            <svg 
              className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              ></circle>
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Отправка...
          </>
        ) : (
          <>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" 
              />
            </svg>
            Поделиться
          </>
        )}
      </button>

      <button
        onClick={onCreateMore}
        className="bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-xl font-medium 
                  border border-white/10 hover:border-white/20 hover:scale-[1.02] 
                  active:scale-[0.98] transition-all duration-200 flex items-center justify-center"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 mr-2" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" 
            clipRule="evenodd" 
          />
        </svg>
        Создать ещё
      </button>
    </div>
  );
};

export default ResultActions;
