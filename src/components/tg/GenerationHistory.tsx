'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { HistoryItem } from '@/types/history';

interface GenerationHistoryProps {
  items: HistoryItem[];
}

export default function GenerationHistory({ items }: GenerationHistoryProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium mb-3">History</h2>
      
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.div
              key={item.id}
              className="bg-dark-lighter rounded-lg p-4 border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-gray-400">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-dark text-gray-300">
                      {getModeName(item.subMode)}
                    </span>
                  </div>
                  
                  <p className="text-sm line-clamp-1">{item.inputPreview}</p>
                </div>
                
                <StatusBadge status={item.status} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: HistoryItem['status'] }) {
  let bgColor = '';
  let textColor = '';
  let label = '';
  
  switch (status) {
    case 'success':
      bgColor = 'bg-green-900/20';
      textColor = 'text-green-400';
      label = 'Success';
      break;
    case 'error':
      bgColor = 'bg-red-900/20';
      textColor = 'text-red-400';
      label = 'Failed';
      break;
    case 'processing':
      bgColor = 'bg-blue-900/20';
      textColor = 'text-blue-400';
      label = 'Processing';
      break;
  }
  
  return (
    <span className={`text-xs px-2 py-1 rounded ${bgColor} ${textColor}`}>
      {label}
    </span>
  );
}

function getModeName(subMode: SubMode): string {
  switch (subMode) {
    case 'text-image':
      return 'Text → Image';
    case 'image-image':
      return 'Image → Image';
    case 'text-video':
      return 'Text → Video';
    case 'image-video':
      return 'Image → Video';
    default:
      return subMode;
  }
}
