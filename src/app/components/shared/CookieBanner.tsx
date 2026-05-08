import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { CookieSettingsModal } from './CookieSettingsModal';
import { COOKIE_STORAGE_KEYS } from '@fit-legacy/auth/legal';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem(COOKIE_STORAGE_KEYS.accepted);
    if (!hasAccepted) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleOpenSettings = () => setIsModalOpen(true);
    window.addEventListener('open-cookie-settings', handleOpenSettings);
    return () => window.removeEventListener('open-cookie-settings', handleOpenSettings);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_STORAGE_KEYS.accepted, 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_STORAGE_KEYS.accepted, 'false');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="cookie-banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[200] bg-white border-t border-gray-200 p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <p className="text-[13px] leading-relaxed text-[#000000] font-['Inter']">
                Este sitio web utiliza cookies, píxeles de seguimiento y almacenamiento local con fines de rendimiento, personalización y marketing. Utilizamos nuestras propias cookies y algunas de terceros. Tan solo las cookies esenciales se encuentran activadas por defecto. <button onClick={() => setIsModalOpen(true)} className="text-blue-600 underline font-medium">Configuración de cookies</button>
              </p>
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleDecline}
                className="px-6 py-2.5 bg-white border border-gray-900 text-gray-900 rounded-lg text-[13px] font-black tracking-tight hover:bg-gray-50 transition-colors"
              >
                No permitir cookies
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2.5 bg-[#2C2C2C] text-white rounded-lg text-[13px] font-black tracking-tight hover:bg-black transition-colors"
              >
                Permitir todas las cookies
              </button>
              <button 
                onClick={() => setIsVisible(false)}
                className="ml-4 text-gray-400 hover:text-gray-900"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
      <CookieSettingsModal
        key="cookie-settings-modal"
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </AnimatePresence>
  );
}
