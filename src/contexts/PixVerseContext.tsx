"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import PixVerseService from "@/services/pixverse";

interface PixVerseContextType {
  uploadImage: (file: File) => Promise<string>;
  createAnimation: (fileUrl: string) => Promise<{ task_id: string }>;
  checkStatus: (taskId: string) => Promise<{ status: string; video_url?: string }>;
  pollUntilDone: (taskId: string) => Promise<string>;
  isProcessing: boolean;
  currentTaskId: string | null;
  error: string | null;
}

const PixVerseContext = createContext<PixVerseContextType | undefined>(undefined);

export const PixVerseProvider = ({ children }: { children: ReactNode }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Метод для загрузки изображения
  const uploadImage = async (file: File): Promise<string> => {
    try {
      setIsProcessing(true);
      setError(null);
      
      const fileUrl = await PixVerseService.uploadImage(file);
      return fileUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка при загрузке изображения");
      throw err;
    } finally {
      setIsProcessing(false);
    }
  };

  // Метод для создания анимации
  const createAnimation = async (fileUrl: string): Promise<{ task_id: string }> => {
    try {
      setIsProcessing(true);
      setError(null);
      
      const response = await PixVerseService.createAnimation(fileUrl);
      setCurrentTaskId(response.task_id);
      
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка при создании анимации");
      throw err;
    } finally {
      setIsProcessing(false);
    }
  };

  // Метод для проверки статуса задачи
  const checkStatus = async (taskId: string): Promise<{ status: string; video_url?: string }> => {
    try {
      const response = await PixVerseService.checkStatus(taskId);
      
      if (response.status === 'failed') {
        setError(response.error || "Ошибка при обработке изображения");
      }
      
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка при проверке статуса");
      throw err;
    }
  };
  
  // Метод для ожидания завершения задачи
  const pollUntilDone = async (taskId: string): Promise<string> => {
    try {
      setIsProcessing(true);
      setError(null);
      
      const videoUrl = await PixVerseService.pollUntilDone(taskId);
      return videoUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка при ожидании результата");
      throw err;
    } finally {
      setIsProcessing(false);
    }
  };

  const value = {
    uploadImage,
    createAnimation,
    checkStatus,
    pollUntilDone,
    isProcessing,
    currentTaskId,
    error,
  };

  return (
    <PixVerseContext.Provider value={value}>
      {children}
    </PixVerseContext.Provider>
  );
};

export const usePixVerse = () => {
  const context = useContext(PixVerseContext);
  if (context === undefined) {
    throw new Error("usePixVerse must be used within a PixVerseProvider");
  }
  return context;
};
