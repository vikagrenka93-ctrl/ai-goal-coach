import { useEffect, useMemo } from "react";

type TelegramWebApp = {
  initData?: string;
  initDataUnsafe?: unknown;
  ready: () => void;
  expand: () => void;
  close: () => void;
  MainButton?: {
    show: () => void;
    hide: () => void;
    setText: (text: string) => void;
    onClick: (cb: () => void) => void;
    offClick: (cb: () => void) => void;
  };
};

declare global {
  interface Window {
    Telegram?: { WebApp?: TelegramWebApp };
  }
}

export function useTelegramWebApp() {
  const webApp = useMemo(() => window.Telegram?.WebApp, []);
  const isTelegram = Boolean(webApp);

  useEffect(() => {
    if (!webApp) return;
    try {
      webApp.ready();
      webApp.expand();
    } catch {
      // ignore
    }
  }, [webApp]);

  return { webApp, isTelegram };
}

