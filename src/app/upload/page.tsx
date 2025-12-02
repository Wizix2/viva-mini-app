"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTelegram } from "@/contexts/TelegramContext";
import { useDID } from "@/contexts/DIDContext";
import { isTelegramWebApp } from "@/lib/isTelegram";

export default function UploadPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processingType, setProcessingType] = useState<'animate' | 'enhance'>('animate');
  
  const router = useRouter();
  const { setupBackButton, setupMainButton, showMainButtonLoader, showAlert } = useTelegram();
  const { uploadImage, createAnimation, pollUntilDone, isProcessing } = useDID();

  useEffect(() => {
    if (!isTelegramWebApp()) return;
    
    // Настраиваем кнопку "Назад" в Telegram
    setupBackButton(true, () => {
      router.push("/");
    });

    return () => {
      // Убираем кнопку при размонтировании компонента
      setupBackButton(false);
    };
  }, [setupBackButton, router]);

  // Управление главной кнопкой Telegram
  useEffect(() => {
    if (!isTelegramWebApp()) return;
    
    if (preview) {
      setupMainButton(
        processingType === 'animate' ? "Оживить фото" : "Улучшить фото", 
        true, 
        true, 
        processingType === 'animate' ? handleAnimate : handleEnhance
      );
    } else {
      setupMainButton("Выберите фото", false);
    }

    return () => {
      setupMainButton("", false);
    };
  }, [preview, processingType, setupMainButton]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Проверка размера файла (макс. 5 МБ)
    if (file.size > 5 * 1024 * 1024) {
      showAlert("Файл слишком большой. Максимальный размер - 5 МБ");
      return;
    }
    
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  }

  const handleAnimate = async () => {
    if (!selectedFile) return;
    
    try {
      setIsLoading(true);
      showMainButtonLoader(true);
      
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("/api/did/animate", { method: "POST", body: formData });
      const data = await res.json();

      // Сохраняем в историю
      const historyItem = {
        type: "animate",
        id: data.id,
        date: new Date().toISOString()
      };
      
      // Сохраняем в localStorage
      const history = JSON.parse(localStorage.getItem('vivaHistory') || '[]');
      localStorage.setItem('vivaHistory', JSON.stringify([historyItem, ...history]));
      
      router.push(`/result/animate?id=${data.id}`);
    } catch (error) {
      console.error('Error animating image:', error);
      showAlert("Произошла ошибка при обработке изображения. Попробуйте еще раз.");
    } finally {
      setIsLoading(false);
      showMainButtonLoader(false);
    }
  };

  const handleEnhance = async () => {
    if (!selectedFile) return;
    
    try {
      setIsLoading(true);
      showMainButtonLoader(true);
      
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("/api/enhance", { method: "POST", body: formData });
      const data = await res.json();
      
      // Сохраняем в историю
      const historyItem = {
        type: "enhance",
        id: data.id,
        date: new Date().toISOString()
      };
      
      // Сохраняем в localStorage
      const history = JSON.parse(localStorage.getItem('vivaHistory') || '[]');
      localStorage.setItem('vivaHistory', JSON.stringify([historyItem, ...history]));
      
      router.push(`/result/enhance?id=${data.id}`);
    } catch (error) {
      console.error('Error enhancing image:', error);
      showAlert("Произошла ошибка при улучшении изображения. Попробуйте еще раз.");
    } finally {
      setIsLoading(false);
      showMainButtonLoader(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-dark-200 to-dark-300 relative">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 right-10 w-60 h-60 bg-primary-700 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-primary-600 rounded-full filter blur-3xl opacity-10"></div>
      </div>
      
      {/* Навигация */}
      <div className="w-full max-w-lg mb-6 flex items-center">
        <Link href="/" className="text-gray-400 hover:text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Назад
        </Link>
      </div>

      <div className="w-full max-w-lg glass-effect p-6 rounded-2xl z-10">
        <h1 className="text-3xl font-bold gradient-text mb-2">Загрузите фото</h1>
        <p className="text-gray-300 mb-6">
          Выберите изображение, которое хотите оживить
        </p>

        {!preview ? (
          <label className="block w-full border-2 border-dashed border-primary-500/50 rounded-xl p-8 text-center cursor-pointer hover:border-primary-500 transition-all">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg font-medium text-primary-300">Нажмите, чтобы выбрать фото</span>
              <span className="text-sm text-gray-400 mt-2">JPG, PNG или GIF (макс. 5 МБ)</span>
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        ) : (
          <div className="space-y-6">
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img src={preview} className="w-full h-auto" alt="Preview" />
              <button 
                onClick={() => {
                  setPreview(null);
                  setSelectedFile(null);
                }} 
                className="absolute top-2 right-2 bg-black/50 p-1 rounded-full hover:bg-black/70"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {/* Выбор типа обработки */}
            <div className="flex rounded-lg overflow-hidden">
              <button 
                onClick={() => setProcessingType('animate')}
                className={`flex-1 py-3 ${processingType === 'animate' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-glass-100 text-gray-300'}`}
              >
                Оживить
              </button>
              <button 
                onClick={() => setProcessingType('enhance')}
                className={`flex-1 py-3 ${processingType === 'enhance' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-glass-100 text-gray-300'}`}
              >
                Улучшить
              </button>
            </div>
            
            <button 
              onClick={processingType === 'animate' ? handleAnimate : handleEnhance}
              disabled={isLoading || isProcessing}
              className="w-full gradient-bg hover:opacity-90 transition-all text-center py-4 rounded-xl text-lg font-medium shadow-lg disabled:opacity-70 flex items-center justify-center"
            >
              {isLoading || isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Обработка...
                </>
              ) : processingType === 'animate' ? "Оживить фото" : "Улучшить фото"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
