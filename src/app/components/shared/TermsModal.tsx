import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { AUTH_LEGAL_NOTICE, TERMS_CONFIRMATION_LABEL, buildLegalUrls } from '@fit-legacy/auth/legal';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export function TermsModal({ isOpen, onClose, onAccept }: TermsModalProps) {
  const [confirmed, setConfirmed] = useState(false);
  const legalBaseUrl = import.meta.env.VITE_LANDING_URL_LOCAL || import.meta.env.VITE_LANDING_URL || window.location.origin;
  const legalUrls = buildLegalUrls(legalBaseUrl);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-[2.5rem] p-10 shadow-2xl overflow-hidden"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-[#0A0A0A] tracking-tight leading-tight mb-4">
              Términos de Servicio y<br />Política de Privacidad
            </h2>
            <p className="text-[14px] text-gray-500 font-medium leading-relaxed px-4">
              {AUTH_LEGAL_NOTICE}{' '}
              <a href={legalUrls.terms} target="_blank" rel="noreferrer" className="text-[#00BCD4] font-bold">Términos del Servicio</a>,{' '}
              <a href={legalUrls.privacy} target="_blank" rel="noreferrer" className="text-[#00BCD4] font-bold">Política de Privacidad</a>{' '}
              y{' '}
              <a href={legalUrls.cookies} target="_blank" rel="noreferrer" className="text-[#00BCD4] font-bold">Política de cookies</a>.
            </p>
          </div>

          <div className="space-y-6 mb-10">
            <div className="flex items-start gap-4 p-4 rounded-3xl bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group" onClick={() => setConfirmed(!confirmed)}>
              <div className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${confirmed ? 'bg-[#00BCD4] border-[#00BCD4]' : 'border-gray-300 group-hover:border-[#00BCD4]'}`}>
                {confirmed && <Check size={14} className="text-white" strokeWidth={4} />}
              </div>
              <p className={`text-[13px] font-black transition-colors ${confirmed ? 'text-[#0A0A0A]' : 'text-gray-400'}`}>
                {TERMS_CONFIRMATION_LABEL}
              </p>
            </div>
          </div>

          <button
            onClick={onAccept}
            disabled={!confirmed}
            className={`w-full py-5 rounded-[1.5rem] font-black text-[13px] uppercase tracking-[0.15em] shadow-xl transition-all ${
              confirmed 
                ? 'bg-[#00BCD4] text-white shadow-[#00BCD4]/20 hover:scale-[1.02] active:scale-[0.98]' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Aceptar y continuar
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
