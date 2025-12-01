"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import DIDService from "@/services/did";

interface DIDContextType {
  uploadImage: (file: File) => Promise<string>;
  createAnimation: (imageUrl: string) => Promise<string>;
  checkStatus: (taskId: string) => Promise<{ status: string; video_url?: string }>;
  pollUntilDone: (taskId: string) => Promise<string>;
  isProcessing: boolean;
  currentTaskId: string | null;
  error: string | null;
}

const DIDContext = createContext<DIDContextType | undefined>(undefined);

export const DIDProvider = ({ children }: { children: ReactNode }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Метод для загрузки изображения
  const uploadImage = async (file: File): Promise<string> => {
    try {
      setIsProcessing(true);
      setError(null);
      
      const imageUrl = await DIDService.uploadImage(file);
      return imageUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка при загрузке изображения");
      throw err;
    } finally {
      setIsProcessing(false);
    }
  };

  // Метод для создания анимации
  const createAnimation = async (imageUrl: string): Promise<string> => {
    try {
      setIsProcessing(true);
      setError(null);
      
      const taskId = await DIDService.createAnimation(imageUrl);
      setCurrentTaskId(taskId);
      
      return taskId;
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
      const response = await DIDService.checkStatus(taskId);
      
      if (response.status === 'error') {
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
      
      const videoUrl = await DIDService.pollUntilDone(taskId);
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
    <DIDContext.Provider value={value}>
      {children}
    </DIDContext.Provider>
  );
};

export const useDID = () => {
  const context = useContext(DIDContext);
  if (context === undefined) {
    throw new Error("useDID must be used within a DIDProvider");
  }
  return context;
};
