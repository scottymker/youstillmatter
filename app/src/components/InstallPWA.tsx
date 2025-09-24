'use client';
import { useEffect, useState } from 'react';

export default function InstallPWA() {
  const [deferred, setDeferred] = useState<any>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onPrompt = (e: any) => {
      e.preventDefault();            // keep the event so we can trigger later
      setDeferred(e);
      setVisible(true);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    return () => window.removeEventListener('beforeinstallprompt', onPrompt);
  }, []);

  if (!visible) return null;

  const handleClick = async () => {
    try {
      await deferred.prompt();
      const { outcome } = await deferred.userChoice;
      // hide the button either way; you can keep it if outcome === 'dismissed'
      setVisible(false);
      setDeferred(null);
      console.log('PWA install:', outcome);
    } catch (e) {
      console.warn('Install failed', e);
    }
  };

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center">
      <button
        onClick={handleClick}
        className="px-4 py-2 border rounded-xl2 bg-white shadow-soft"
        aria-label="Add YouStillMatter to Home Screen"
      >
        ➕ Add to Home Screen
      </button>
    </div>
  );
}
