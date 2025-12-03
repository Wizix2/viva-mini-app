import React, { ReactNode } from 'react';

interface ResultHeaderProps {
  title: string;
  tag?: string;
  icon?: ReactNode;
  description?: string;
}

const ResultHeader: React.FC<ResultHeaderProps> = ({ 
  title, 
  tag, 
  icon,
  description 
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-2">
        {icon && (
          <div className="mr-3 text-primary-500">
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#9C4DFF] to-[#B86CFF] bg-clip-text text-transparent">
            {title}
          </h1>
          {tag && (
            <div className="inline-block bg-primary-500/20 text-primary-300 text-xs px-2 py-1 rounded-md mt-1">
              {tag}
            </div>
          )}
        </div>
      </div>
      {description && (
        <p className="text-white/70 text-sm">{description}</p>
      )}
    </div>
  );
};

export default ResultHeader;
