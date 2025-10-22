"use client";

import { AlertCircle, WifiOff, ServerCrash, RefreshCw } from 'lucide-react';

export type ErrorType = 'network' | 'server' | 'not-found' | 'unknown';

interface ErrorDisplayProps {
  error: Error | string;
  errorType?: ErrorType;
  variant?: 'full' | 'inline' | 'minimal';
  onRetry?: () => void;
  retrying?: boolean;
  className?: string;
}

export default function ErrorDisplay({
  error,
  errorType = 'unknown',
  variant = 'inline',
  onRetry,
  retrying = false,
  className = '',
}: ErrorDisplayProps) {
  const errorMessage = typeof error === 'string' ? error : error.message;

  const errorConfig = {
    network: {
      icon: <WifiOff className="h-12 w-12 text-red-500" />,
      title: 'Network Connection Error',
      message: 'Unable to connect to the server. Please check your internet connection.',
      color: 'red',
    },
    server: {
      icon: <ServerCrash className="h-12 w-12 text-orange-500" />,
      title: 'Server Error',
      message: 'The server encountered an error. Please try again later.',
      color: 'orange',
    },
    'not-found': {
      icon: <AlertCircle className="h-12 w-12 text-amber-500" />,
      title: 'Content Not Found',
      message: 'The content you are looking for could not be found.',
      color: 'amber',
    },
    unknown: {
      icon: <AlertCircle className="h-12 w-12 text-gray-500" />,
      title: 'Something Went Wrong',
      message: errorMessage || 'An unexpected error occurred.',
      color: 'gray',
    },
  };

  const config = errorConfig[errorType];

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-2 text-sm text-red-600 ${className}`}>
        <AlertCircle className="h-4 w-4" />
        <span>{errorMessage}</span>
        {onRetry && (
          <button
            onClick={onRetry}
            disabled={retrying}
            className="text-red-700 underline hover:text-red-800 disabled:opacity-50"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div
        className={`bg-${config.color}-50 border border-${config.color}-200 rounded-xl p-6 ${className}`}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">{config.icon}</div>
          <div className="flex-1 min-w-0">
            <h3 className={`text-lg font-semibold text-${config.color}-900 mb-2`}>
              {config.title}
            </h3>
            <p className={`text-${config.color}-700 mb-4`}>{config.message}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                disabled={retrying}
                className={`
                  inline-flex items-center gap-2 px-4 py-2 rounded-lg
                  bg-${config.color}-600 text-white font-semibold
                  hover:bg-${config.color}-700 transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                <RefreshCw className={`h-4 w-4 ${retrying ? 'animate-spin' : ''}`} />
                {retrying ? 'Retrying...' : 'Try Again'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Full page error
  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 ${className}`}>
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl border border-amber-100 p-8 text-center">
          <div className="flex justify-center mb-6">{config.icon}</div>
          <h2 className={`text-2xl font-bold text-${config.color}-900 mb-3`}>
            {config.title}
          </h2>
          <p className={`text-${config.color}-700 mb-6 leading-relaxed`}>
            {config.message}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              disabled={retrying}
              className={`
                w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                bg-${config.color}-600 text-white font-semibold text-lg
                hover:bg-${config.color}-700 transition-all transform hover:-translate-y-0.5
                disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed
                shadow-lg hover:shadow-xl
              `}
            >
              <RefreshCw className={`h-5 w-5 ${retrying ? 'animate-spin' : ''}`} />
              {retrying ? 'Retrying...' : 'Try Again'}
            </button>
          )}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <a
              href="/"
              className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
            >
              ← Return to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Utility function to classify errors
export function classifyError(error: Error | unknown): ErrorType {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    
    if (message.includes('network') || message.includes('fetch failed') || message.includes('timeout')) {
      return 'network';
    }
    
    if (message.includes('404') || message.includes('not found')) {
      return 'not-found';
    }
    
    if (message.includes('500') || message.includes('502') || message.includes('503')) {
      return 'server';
    }
  }
  
  return 'unknown';
}

