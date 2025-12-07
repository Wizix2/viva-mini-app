'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import useTelegram from '@/hooks/useTelegram';
import Header from '@/components/Header';
import TabSwitcher from '@/components/TabSwitcher';
import ModeSelector from '@/components/ModeSelector';
import TextToVideoForm from '@/components/TextToVideoForm';
import ImageToVideoForm from '@/components/ImageToVideoForm';
import ExamplesSection from '@/components/ExamplesSection';
import SuccessMessage from '@/components/SuccessMessage';

const EXAMPLES = [
  'Beautiful cinematic portrait',
  'Ultra realistic landscape',
  'Epic fantasy character',
  'Dreamy sci-fi heroine',
  'Cyberpunk city street',
  'Magical forest scene',
  'Futuristic robot design',
  'Vintage photography style',
];

export default function TgPage() {
  const { tg } = useTelegram();
  const [activeTab, setActiveTab] = useState(0);
  const [activeMode, setActiveMode] = useState(0);
  const [success, setSuccess] = useState(false);
  const [taskId, setTaskId] = useState('');

  // Text to Video submission
  const handleTextSubmit = async (text: string) => {
    try {
      const response = await fetch('/api/generate/text-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      
      const data = await response.json();
      if (data.status === 'ok') {
        setTaskId(data.taskId);
        setSuccess(true);
      }
    } catch (error) {
      console.error('Error generating video:', error);
    }
  };

  // Image to Video submission
  const handleImageSubmit = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch('/api/generate/image-video', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      if (data.status === 'ok') {
        setTaskId(data.taskId);
        setSuccess(true);
      }
    } catch (error) {
      console.error('Error generating video:', error);
    }
  };

  // Handle example selection
  const handleExampleSelect = (example: string) => {
    if (activeMode === 0) {
      // For Text to Video mode, set the example as the text
      // This would be implemented by passing a ref to TextToVideoForm
      // and setting the value, but for simplicity we'll just submit directly
      handleTextSubmit(example);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Header credits={100} />
      
      <div className="p-4">
        <TabSwitcher 
          tabs={['Image', 'Video']} 
          activeTab={activeTab} 
          onChange={setActiveTab} 
        />
        
        <ModeSelector 
          modes={['Text → Video', 'Image → Video']} 
          activeMode={activeMode} 
          onChange={setActiveMode} 
        />
        
        {success ? (
          <SuccessMessage message="Task created successfully!" />
        ) : (
          <>
            {activeMode === 0 ? (
              <TextToVideoForm onSubmit={handleTextSubmit} />
            ) : (
              <ImageToVideoForm onSubmit={handleImageSubmit} />
            )}
            
            <ExamplesSection 
              examples={EXAMPLES} 
              onSelect={handleExampleSelect} 
            />
          </>
        )}
      </div>
    </motion.div>
  );
}