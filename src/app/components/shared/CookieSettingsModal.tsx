import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, BarChart3, Target, Info, Settings2, Lock } from 'lucide-react';
import {
  ACCEPT_ALL_COOKIE_PREFERENCES,
  COOKIE_STORAGE_KEYS,
  DEFAULT_COOKIE_PREFERENCES,
  type CookiePreferences,
} from '@fit-legacy/auth/legal';

interface CookieSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'overview' | 'essential' | 'analytics' | 'marketing';

export function CookieSettingsModal({ isOpen, onClose }: CookieSettingsModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_COOKIE_PREFERENCES);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_STORAGE_KEYS.preferences);
    if (stored) {
      setPreferences(JSON.parse(stored));
    } else {
      setPreferences(DEFAULT_COOKIE_PREFERENCES);
    }
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem(COOKIE_STORAGE_KEYS.preferences, JSON.stringify(preferences));
    localStorage.setItem(COOKIE_STORAGE_KEYS.accepted, 'true');
    onClose();
  };

  const handleAcceptAll = () => {
    const allOn = ACCEPT_ALL_COOKIE_PREFERENCES;
    setPreferences(allOn);
    localStorage.setItem(COOKIE_STORAGE_KEYS.preferences, JSON.stringify(allOn));
    localStorage.setItem(COOKIE_STORAGE_KEYS.accepted, 'true');
    onClose();
  };

  const togglePreference = (key: keyof typeof preferences) => {
    if (key === 'essential') return;
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: Info },
    { id: 'essential', label: 'Necesarias', icon: Lock },
    { id: 'analytics', label: 'Rendimiento', icon: BarChart3 },
    { id: 'marketing', label: 'Publicidad', icon: Target },
  ] as const;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[300] bg-black/40 backdrop-blur-[8px]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            className="fixed left-1/2 top-1/2 z-[301] w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 px-4 h-[600px]"
          >
            <div className="flex h-full overflow-hidden rounded-[32px] bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] border border-gray-100">
              
              {/* Sidebar (CapCut Style) */}
              <div className="w-64 bg-[#F8F9FA] border-r border-gray-100 flex flex-col p-6">
                <div className="flex items-center gap-3 mb-10 px-2">
                  <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white">
                    <Settings2 size={18} />
                  </div>
                  <span className="font-black tracking-tight text-gray-900">Legacy Privacy</span>
                </div>

                <nav className="flex-1 space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 ${
                        activeTab === tab.id 
                          ? 'bg-white text-black shadow-sm border border-gray-100' 
                          : 'text-gray-500 hover:bg-gray-200/50 hover:text-gray-900'
                      }`}
                    >
                      <tab.icon size={18} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
                      {tab.label}
                    </button>
                  ))}
                </nav>

                <div className="pt-6 border-t border-gray-200/50">
                  <p className="text-[10px] text-gray-400 font-medium px-2">
                    VERSIÓN REFLOW 3.0<br/>
                    ID: FL-PRIVACY-MODAL
                  </p>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col bg-white">
                {/* Header */}
                <div className="px-10 py-8 flex items-start justify-between">
                  <div>
                    <h2 className="text-3xl font-black tracking-tight text-gray-900 capitalize">
                      {tabs.find(t => t.id === activeTab)?.label}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1 font-medium">Control de privacidad y rastreo</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Tab Content */}
                <div className="flex-1 px-10 overflow-y-auto custom-scrollbar pb-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      {activeTab === 'overview' && (
                        <div className="space-y-4">
                          <p className="text-gray-600 leading-relaxed font-medium">
                            En Fit Legacy nos tomamos en serio tu privacidad. Utilizamos cookies para mejorar el rendimiento de la herramienta, personalizar tu interfaz y, ocasionalmente, mostrarte contenido relevante.
                          </p>
                          <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="p-5 rounded-[24px] bg-blue-50 border border-blue-100">
                              <Shield className="text-blue-600 mb-3" size={24} />
                              <h4 className="font-bold text-sm text-blue-900">Seguridad SaaS</h4>
                              <p className="text-[11px] text-blue-700/80 mt-1 leading-relaxed">Tus datos de sesión están encriptados y protegidos por Supabase Auth.</p>
                            </div>
                            <div className="p-5 rounded-[24px] bg-purple-50 border border-purple-100">
                              <Target className="text-purple-600 mb-3" size={24} />
                              <h4 className="font-bold text-sm text-purple-900">Optimización de IA</h4>
                              <p className="text-[11px] text-purple-700/80 mt-1 leading-relaxed">Cookies analíticas nos permiten mejorar los algoritmos de entrenamiento de Legacito.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeTab === 'essential' && (
                        <div className="space-y-4">
                          <div className="p-6 rounded-[24px] bg-gray-50 border border-gray-100">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="font-black text-gray-900">Sesión y Seguridad</h3>
                              <span className="text-[10px] font-black uppercase text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100">Obligatorio</span>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed">
                              Estas cookies permiten que la plataforma te reconozca, mantenga tu progreso en los minijuegos y asegure que tus transacciones financieras sean seguras. Sin estas funcionalidades, Legacy OS no puede operar.
                            </p>
                          </div>
                        </div>
                      )}

                      {activeTab === 'analytics' && (
                        <div className="space-y-4">
                          <div className="p-6 rounded-[24px] border border-gray-100 hover:border-gray-200 transition-colors">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="font-black text-gray-900">Google Analytics & Hotjar</h3>
                              <button 
                                onClick={() => togglePreference('analytics')}
                                className={`relative w-14 h-7 rounded-full transition-all duration-300 ${preferences.analytics ? 'bg-black shadow-[0_0_15px_rgba(0,0,0,0.1)]' : 'bg-gray-200'}`}
                              >
                                <div className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-white transition-transform duration-300 ${preferences.analytics ? 'translate-x-7' : 'translate-x-0'} shadow-sm`} />
                              </button>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed">
                              Analizamos datos anónimos para entender en qué secciones pasan más tiempo nuestros usuarios y dónde podemos optimizar la carga de los componentes de alto rendimiento 3D.
                            </p>
                          </div>
                        </div>
                      )}

                      {activeTab === 'marketing' && (
                        <div className="space-y-4">
                          <div className="p-6 rounded-[24px] border border-gray-100 hover:border-gray-200 transition-colors">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="font-black text-gray-900">Píxeles de Publicidad</h3>
                              <button 
                                onClick={() => togglePreference('marketing')}
                                className={`relative w-14 h-7 rounded-full transition-all duration-300 ${preferences.marketing ? 'bg-black shadow-[0_0_15px_rgba(0,0,0,0.1)]' : 'bg-gray-200'}`}
                              >
                                <div className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-white transition-transform duration-300 ${preferences.marketing ? 'translate-x-7' : 'translate-x-0'} shadow-sm`} />
                              </button>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed">
                              Utilizamos el Meta Pixel y LinkedIn Insight para medir el éxito de nuestras campañas y ofrecerte invitaciones exclusivas a eventos de la comunidad Fit Legacy que realmente te interesen.
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Footer Actions */}
                <div className="px-10 py-8 bg-[#F8F9FA]/50 border-t border-gray-100 flex items-center justify-between">
                  <button 
                    onClick={() => {
                      setPreferences({ essential: true, analytics: false, marketing: false });
                    }}
                    className="text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest"
                  >
                    Rechazar Todo
                  </button>
                  <div className="flex gap-4">
                    <button
                      onClick={handleSave}
                      className="px-8 py-4 border border-gray-900 text-gray-900 rounded-[20px] text-sm font-black tracking-tight hover:bg-white transition-all active:scale-[0.98]"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="px-8 py-4 bg-black text-white rounded-[20px] text-sm font-black tracking-tight hover:bg-gray-800 transition-all shadow-xl shadow-black/10 active:scale-[0.98]"
                    >
                      Permitir Todo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
