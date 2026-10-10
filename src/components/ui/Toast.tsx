'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils';

type ToastType = 'success' | 'error' | 'info';

interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastContextType {
  toast: (options: { type?: ToastType; title: string; description?: string }) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toast = useCallback(
    ({ type = 'info', title, description }: { type?: ToastType; title: string; description?: string }) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { id, type, title, description }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 5000);
    },
    []
  );

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={cn(
                'pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-lg shadow-2xl',
                t.type === 'success' && 'bg-[#0a0e12]/95 border-[#25d366]/40 text-[#dfe7e0]',
                t.type === 'error' && 'bg-[#0a0e12]/95 border-[#e0231c]/50 text-[#dfe7e0]',
                t.type === 'info' && 'bg-[#0a0e12]/95 border-[rgba(223,231,224,0.2)] text-[#dfe7e0]'
              )}
            >
              {t.type === 'success' && <CheckCircle2 className="h-5 w-5 text-[#25d366] shrink-0 mt-0.5" />}
              {t.type === 'error' && <AlertCircle className="h-5 w-5 text-[#e0231c] shrink-0 mt-0.5" />}
              <div className="flex-1 text-sm">
                <div className="font-medium text-white">{t.title}</div>
                {t.description && <div className="text-xs text-[#aab4ad] mt-0.5 leading-relaxed">{t.description}</div>}
              </div>
              <button
                type="button"
                onClick={() => removeToast(t.id)}
                className="text-[#aab4ad] hover:text-white transition-colors"
                aria-label="Close notification"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
