"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  showToast: (message: string, variant?: ToastVariant, duration?: number) => void;
  hideToast: (id: string) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

interface ToastProviderProps {
  children: React.ReactNode;
  maxToasts?: number;
}

export function ToastProvider({ children, maxToasts = 3 }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = 'info', duration = 5000) => {
      const id = `toast-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const newToast: Toast = { id, message, variant, duration };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        // Keep only the most recent toasts
        return updated.slice(-maxToasts);
      });

      // Auto-dismiss
      if (duration > 0) {
        setTimeout(() => hideToast(id), duration);
      }
    },
    [maxToasts, hideToast]
  );

  const success = useCallback(
    (message: string, duration?: number) => showToast(message, 'success', duration),
    [showToast]
  );

  const error = useCallback(
    (message: string, duration?: number) => showToast(message, 'error', duration),
    [showToast]
  );

  const warning = useCallback(
    (message: string, duration?: number) => showToast(message, 'warning', duration),
    [showToast]
  );

  const info = useCallback(
    (message: string, duration?: number) => showToast(message, 'info', duration),
    [showToast]
  );

  const value: ToastContextValue = {
    toasts,
    showToast,
    hideToast,
    success,
    error,
    warning,
    info,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={hideToast} />
    </ToastContext.Provider>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => onDismiss(toast.id), 300);
  };

  useEffect(() => {
    // Add entrance animation
    const timer = setTimeout(() => setIsExiting(false), 10);
    return () => clearTimeout(timer);
  }, []);

  const variantStyles = {
    success: {
      bg: 'bg-green-50 border-green-200',
      text: 'text-green-800',
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-800',
      icon: <XCircle className="h-5 w-5 text-red-600" />,
    },
    warning: {
      bg: 'bg-amber-50 border-amber-200',
      text: 'text-amber-800',
      icon: <AlertCircle className="h-5 w-5 text-amber-600" />,
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      icon: <Info className="h-5 w-5 text-blue-600" />,
    },
  };

  const style = variantStyles[toast.variant];

  return (
    <div
      className={`
        pointer-events-auto
        ${style.bg} ${style.text}
        border rounded-lg shadow-lg px-4 py-3 
        flex items-start gap-3 min-w-[320px] max-w-md
        transition-all duration-150 ease-out
        ${isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}
      `}
      role="alert"
    >
      <div className="flex-shrink-0 mt-0.5">{style.icon}</div>
      <p className="flex-1 text-sm font-medium leading-relaxed">{toast.message}</p>
      <button
        onClick={handleDismiss}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

// Optional: Hook for toast without provider (creates inline toast)
export function useToastFallback() {
  const showToast = useCallback((message: string, variant: ToastVariant = 'info') => {
    // Fallback implementation - just console log
    const emoji = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️',
    };
    console.log(`${emoji[variant]} ${message}`);
  }, []);

  return {
    showToast,
    success: (msg: string) => showToast(msg, 'success'),
    error: (msg: string) => showToast(msg, 'error'),
    warning: (msg: string) => showToast(msg, 'warning'),
    info: (msg: string) => showToast(msg, 'info'),
  };
}

