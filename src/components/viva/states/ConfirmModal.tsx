import React from 'react';

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title,
  description,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
  onConfirm,
  onCancel,
  danger = false
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div 
        className="bg-[#1A142B] p-6 rounded-2xl w-full max-w-sm shadow-premium animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        
        {description && (
          <p className="text-white/70 mb-6">{description}</p>
        )}
        
        <div className="flex space-x-3 justify-end">
          <button
            onClick={onCancel}
            className="bg-dark-200 hover:bg-dark-100 px-5 py-2.5 rounded-xl text-white/80 font-medium transition-all duration-300"
          >
            {cancelText}
          </button>
          
          <button
            onClick={onConfirm}
            className={`${
              danger 
                ? 'bg-red-500/80 hover:bg-red-500' 
                : 'gradient-bg hover:shadow-hover'
            } px-5 py-2.5 rounded-xl text-white font-medium transition-all duration-300`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
