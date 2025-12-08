'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useTelegram from '@/hooks/useTelegram';
import { SidebarProvider } from '@/contexts/SidebarContext';
import Header from '@/components/tg/Header';
import MainModeTabs from '@/components/tg/MainModeTabs';
import SubModeSwitch from '@/components/tg/SubModeSwitch';
import TextToImageForm from '@/components/tg/forms/TextToImageForm';
import ImageToImageForm from '@/components/tg/forms/ImageToImageForm';
import TextToVideoForm from '@/components/tg/forms/TextToVideoForm';
import ImageToVideoForm from '@/components/tg/forms/ImageToVideoForm';
import GenerationHistory from '@/components/tg/GenerationHistory';
import SidebarWrapper from '@/components/tg/SidebarWrapper';
import { MainMode, SubMode } from '@/types/modes';
import { HistoryItem } from '@/types/history';

export default function TgPage() {
  const tg = useTelegram();
  
  if (!tg) {
    return (
      <div className="min-h-screen bg-dark text-white flex items-center justify-center p-4">
        <p>Loading Telegram...</p>
      </div>
    );
  }
  const [mode, setMode] = useState<MainMode>('video');
  const [subMode, setSubMode] = useState<SubMode>('text-video');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
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
  
  // Общий обработчик для всех форм
  const handleGeneration = async (input: string | File) => {
    setIsLoading(true);
    
    // Создаем запись в истории
    const newHistoryItem: HistoryItem = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      mainMode: mode,
      subMode: subMode,
      inputPreview: typeof input === 'string' 
        ? input.substring(0, 50) + (input.length > 50 ? '...' : '')
        : `Image: ${input.name}`,
      status: 'processing'
    };
    
    // Добавляем запись в историю
    setHistory(prev => [newHistoryItem, ...prev]);
    
    try {
      // Имитируем задержку API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Обновляем статус записи в истории
      setHistory(prev => prev.map(item => 
        item.id === newHistoryItem.id 
          ? { ...item, status: 'success' } 
          : item
      ));
      
      return { status: 'ok', taskId: newHistoryItem.id };
    } catch (error) {
      // В случае ошибки обновляем статус
      setHistory(prev => prev.map(item => 
        item.id === newHistoryItem.id 
          ? { ...item, status: 'error' } 
          : item
      ));
      
      console.error(`Error in ${subMode} generation:`, error);
      return { status: 'error', message: 'Generation failed' };
    } finally {
      setIsLoading(false);
    }
  };
  
  // Обработчики для разных форм
  const handleTextToImageSubmit = async (text: string) => {
    return handleGeneration(text);
  };
  
  const handleImageToImageSubmit = async (file: File) => {
    return handleGeneration(file);
  };
  
  const handleTextToVideoSubmit = async (text: string) => {
    return handleGeneration(text);
  };
  
  const handleImageToVideoSubmit = async (file: File) => {
    return handleGeneration(file);
  };
  
  // Обработчик выбора стиля из сайдбара
  const handleSelectStyle = (style: string) => {
    if (subMode === 'text-image' || subMode === 'text-video') {
      // Для текстовых режимов можно вставить шаблонный промпт
      const promptTemplate = `Create a ${style.toLowerCase()} style image of `;
      if (typeof window !== 'undefined' && window.setTextToVideoText && subMode === 'text-video') {
        window.setTextToVideoText(promptTemplate);
      }
    }
  };
  
  // Обработчик выбора модели из сайдбара
  const handleSelectModel = (model: string) => {
    // Здесь можно реализовать логику выбора модели
    console.log(`Selected model: ${model}`);
  };
  
  // Инициализация Telegram WebApp
  useEffect(() => {
    if (!tg) return;

    tg.ready?.();
    tg.expand?.();
  }, [tg]);
  
  return (
    <SidebarProvider>
      <SidebarWrapper
        onSelectStyle={handleSelectStyle}
        onSelectModel={handleSelectModel}
      >
        <motion.div
          className="min-h-screen bg-dark text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Header credits={1250} />
          
          <div className="max-w-md mx-auto px-4 pb-8">
            <MainModeTabs 
              value={mode} 
              onChange={handleModeChange} 
            />
            
            <SubModeSwitch 
              mainMode={mode}
              value={subMode} 
              onChange={handleSubModeChange} 
            />
            
            <div>
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
            </div>
            
            <GenerationHistory items={history} />
          </div>
        </motion.div>
      </SidebarWrapper>
    </SidebarProvider>
  );
}