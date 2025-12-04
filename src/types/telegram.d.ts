declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData?: string;
        initDataUnsafe?: any;
        close?: () => void;
        expand?: () => void;
        colorScheme?: string;
        themeParams?: any;
        viewportStableHeight?: number;
        BackButton?: {
          show: () => void;
          hide: () => void;
        };
        MainButton?: {
          show: () => void;
          hide: () => void;
          setText: (text: string) => void;
        };
      };
    };
  }
}

export {};
