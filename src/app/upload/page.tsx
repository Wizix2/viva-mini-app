"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTelegram } from "@/contexts/TelegramContext";
import { isTelegramWebApp } from "@/lib/isTelegram";
import { ArtlistModel, MODEL_DESCRIPTIONS } from "@/types/artlist";
import Layout from "@/components/layout/Layout";

export default function UploadPage() {
  const searchParams = useSearchParams();
  const effectParam = searchParams.get("effect");
  
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedModel, setSelectedModel] = useState<ArtlistModel>('veo');
  const [prompt, setPrompt] = useState<string>('');
  
  const router = useRouter();
  const { setupMainButton, showMainButtonLoader, showAlert } = useTelegram();

  // Set the initial model based on URL parameter
  useEffect(() => {
    if (effectParam) {
      if (effectParam === 'animate') setSelectedModel('veo');
      else if (effectParam === 'enhance') setSelectedModel('nano');
      else if (effectParam === 'background') setSelectedModel('sora');
    }
  }, [effectParam]);

  // Управление главной кнопкой Telegram
  useEffect(() => {
    if (!isTelegramWebApp()) return;
    
    if (preview) {
      setupMainButton(
        `Применить эффект`, 
        true, 
        true, 
        handleGenerate
      );
    } else {
      setupMainButton("Выберите фото", false);
    }

    return () => {
      setupMainButton("", false);
    };
  }, [preview, setupMainButton]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Проверка размера файла (макс. 10 МБ)
    if (file.size > 10 * 1024 * 1024) {
      showAlert("Файл слишком большой. Максимальный размер - 10 МБ");
      return;
    }
    
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  }

  const handleGenerate = async () => {
    if (!selectedFile) return;
    
    try {
      setIsLoading(true);
      showMainButtonLoader(true);
      
      // Step 1: Upload the image
      const formData = new FormData();
      formData.append("file", selectedFile);

      const uploadRes = await fetch("/api/artlist/upload", { 
        method: "POST", 
        body: formData 
      });
      
      if (!uploadRes.ok) {
        const errorData = await uploadRes.json();
        throw new Error(errorData.error || "Failed to upload image");
      }
      
      const uploadData = await uploadRes.json();
      
      // Step 2: Generate the video
      const generateRes = await fetch("/api/artlist/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          imageId: uploadData.imageId,
          prompt: prompt || getDefaultPrompt(selectedModel),
          model: selectedModel
        })
      });
      
      if (!generateRes.ok) {
        const errorData = await generateRes.json();
        throw new Error(errorData.error || "Failed to generate video");
      }
      
      const generateData = await generateRes.json();
      
      // Save to history
      const historyItem = {
        type: "video",
        id: generateData.taskId,
        model: selectedModel,
        date: new Date().toISOString()
      };
      
      // Save to localStorage
      const history = JSON.parse(localStorage.getItem('vivaHistory') || '[]');
      localStorage.setItem('vivaHistory', JSON.stringify([historyItem, ...history]));
      
      // Redirect to result page
      router.push(`/result/video?id=${generateData.taskId}`);
    } catch (error) {
      console.error('Error generating video:', error);
      showAlert(error instanceof Error ? error.message : "Произошла ошибка при создании видео. Попробуйте еще раз.");
    } finally {
      setIsLoading(false);
      showMainButtonLoader(false);
    }
  };

  // Get default prompt based on selected model
  const getDefaultPrompt = (model: ArtlistModel): string => {
    switch (model) {
      case 'veo':
        return "A professional full-body video of a person in a natural pose";
      case 'sora':
        return "A person in a beautiful landscape with cinematic lighting";
      case 'nano':
        return "A smooth animation of a person with natural movements";
      default:
        return "A professional video of a person";
    }
  };

  // Get effect title based on URL parameter or selected model
  const getEffectTitle = () => {
    if (effectParam) {
      switch (effectParam) {
        case 'animate': return "Оживить фото";
        case 'enhance': return "HD-улучшение";
        case 'background': return "AI-фон";
        case 'cartoon': return "Cartoon";
        case 'restore': return "Реставрация";
        case 'portrait': return "4K-портрет";
        case 'retouch': return "Ретушь";
        case 'reshape': return "Body reshape";
        default: return MODEL_DESCRIPTIONS[selectedModel].name;
      }
    }
    return MODEL_DESCRIPTIONS[selectedModel].name;
  };

  return (
    <Layout title={getEffectTitle()} showBackButton={true}>
      <div className="mt-4 mb-24">
        {!preview ? (
          <label className="block w-full border-2 border-dashed border-primary-500/50 rounded-card p-8 text-center cursor-pointer hover:border-primary-500 transition-all bg-dark-100">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-lg font-medium text-primary-300">Выберите фото</span>
              <span className="text-sm text-gray-400 mt-2">JPG, PNG или WebP (макс. 10 МБ)</span>
            </div>
            <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleFileChange} />
          </label>
        ) : (
          <div className="space-y-6">
            <div className="relative rounded-card overflow-hidden shadow-card bg-dark-100">
              <img src={preview} className="w-full h-auto" alt="Preview" />
              <button 
                onClick={() => {
                  setPreview(null);
                  setSelectedFile(null);
                }} 
                className="absolute top-3 right-3 bg-black/50 p-2 rounded-full hover:bg-black/70"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {/* Model selection */}
            <div className="premium-card p-4">
              <h3 className="text-lg font-medium text-white mb-3">Выберите эффект:</h3>
              
              <div className="space-y-3">
                {/* Veo model */}
                <div 
                  onClick={() => setSelectedModel('veo')}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    selectedModel === 'veo' 
                      ? 'bg-gradient-button text-white' 
                      : 'bg-dark-200 hover:bg-dark-100'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-dark-300/50 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-xl">{MODEL_DESCRIPTIONS.veo.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{MODEL_DESCRIPTIONS.veo.name}</h4>
                      <p className="text-xs text-gray-300">{MODEL_DESCRIPTIONS.veo.description}</p>
                    </div>
                  </div>
                </div>
                
                {/* Sora model */}
                <div 
                  onClick={() => setSelectedModel('sora')}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    selectedModel === 'sora' 
                      ? 'bg-gradient-button text-white' 
                      : 'bg-dark-200 hover:bg-dark-100'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-dark-300/50 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-xl">{MODEL_DESCRIPTIONS.sora.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{MODEL_DESCRIPTIONS.sora.name}</h4>
                      <p className="text-xs text-gray-300">{MODEL_DESCRIPTIONS.sora.description}</p>
                    </div>
                  </div>
                </div>
                
                {/* Nano model */}
                <div 
                  onClick={() => setSelectedModel('nano')}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    selectedModel === 'nano' 
                      ? 'bg-gradient-button text-white' 
                      : 'bg-dark-200 hover:bg-dark-100'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-dark-300/50 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-xl">{MODEL_DESCRIPTIONS.nano.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{MODEL_DESCRIPTIONS.nano.name}</h4>
                      <p className="text-xs text-gray-300">{MODEL_DESCRIPTIONS.nano.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Prompt input */}
            <div className="premium-card p-4 space-y-3">
              <label htmlFor="prompt" className="text-sm font-medium text-white">
                Описание (необязательно):
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={getDefaultPrompt(selectedModel)}
                className="w-full bg-dark-200 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 border border-dark-100"
                rows={3}
              />
              <p className="text-xs text-gray-400">
                Опишите, как должно выглядеть видео. Если оставить пустым, будет использовано стандартное описание.
              </p>
            </div>
            
            <button 
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full gradient-bg hover:opacity-90 transition-all text-center py-4 rounded-xl text-lg font-medium shadow-premium disabled:opacity-70 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Обработка...
                </>
              ) : (
                <>Применить эффект</>
              )}
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}