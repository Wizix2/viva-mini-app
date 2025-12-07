'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useTelegram from '@/hooks/useTelegram';
import Header from '@/components/Header';
import TabSwitcher from '@/components/TabSwitcher';
import ModeSelector from '@/components/ModeSelector';
import TextToImageForm from '@/components/TextToImageForm';
import ImageToImageForm from '@/components/ImageToImageForm';
import TextToVideoForm from '@/components/TextToVideoForm';
import ImageToVideoForm from '@/components/ImageToVideoForm';
import ExamplesSection from '@/components/ExamplesSection';
import SuccessMessage from '@/components/SuccessMessage';
import { MainMode, SubMode } from '@/types/modes';

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
  const [mode, setMode] = useState<MainMode>('video');
  const [subMode, setSubMode] = useState<SubMode>('text-video');
  const [success, setSuccess] = useState(false);
  const [taskId, setTaskId] = useState('');

  // Обработчик изменения основного режима
  const handleModeChange = (newMode: MainMode) => {
    setMode(newMode);
    // Автоматически устанавливаем подрежим в зависимости от основного режима
    if (newMode === 'image') {
      setSubMode('text-image');
    } else {
      setSubMode('text-video');
    }
  };

  // Обработчик изменения подрежима
  const handleSubModeChange = (newSubMode: SubMode) => {
    setSubMode(newSubMode);
  };

  // Text to Image submission
  const handleTextToImageSubmit = async (text: string) => {
    try {
      const response = await fetch('/api/generate/text-image', {
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
      console.error('Error generating image:', error);
    }
  };

  // Image to Image submission
  const handleImageToImageSubmit = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch('/api/generate/image-image', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      if (data.status === 'ok') {
        setTaskId(data.taskId);
        setSuccess(true);
      }
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  // Text to Video submission
  const handleTextToVideoSubmit = async (text: string) => {
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
  const handleImageToVideoSubmit = async (file: File) => {
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
    if (subMode === 'text-image' || subMode === 'text-video') {
      // Для текстовых режимов вставляем текст в форму
      if (typeof window !== 'undefined') {
        if (subMode === 'text-video' && window.setTextToVideoText) {
          window.setTextToVideoText(example);
        } else {
          // Для других форм можно реализовать аналогично
          // или напрямую отправить запрос
          if (subMode === 'text-image') {
            handleTextToImageSubmit(example);
          } else if (subMode === 'text-video') {
            handleTextToVideoSubmit(example);
          }
        }
      }
    }
    // Для режимов с изображениями можно реализовать применение пресет-стилей
  };

  // Определяем, какие подрежимы показывать в зависимости от основного режима
  const getSubModes = () => {
    if (mode === 'image') {
      return ['Text → Image', 'Image → Image'];
    } else {
      return ['Text → Video', 'Image → Video'];
    }
  };

  // Инициализация Telegram WebApp
  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();
    }
  }, [tg]);

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
          activeTab={mode} 
          onChange={handleModeChange} 
        />
        
        <ModeSelector 
          modes={getSubModes()} 
          activeMode={subMode} 
          onChange={handleSubModeChange} 
        />
        
        {success ? (
          <SuccessMessage message="Task created successfully!" />
        ) : (
          <>
            {subMode === 'text-image' && (
              <TextToImageForm onSubmit={handleTextToImageSubmit} />
            )}
            {subMode === 'image-image' && (
              <ImageToImageForm onSubmit={handleImageToImageSubmit} />
            )}
            {subMode === 'text-video' && (
              <TextToVideoForm onSubmit={handleTextToVideoSubmit} />
            )}
            {subMode === 'image-video' && (
              <ImageToVideoForm onSubmit={handleImageToVideoSubmit} />
            )}
            
            <ExamplesSection 
              examples={EXAMPLES} 
              onSelect={handleExampleSelect}
              currentMode={subMode}
            />
          </>
        )}
      </div>
    </motion.div>
  );
}