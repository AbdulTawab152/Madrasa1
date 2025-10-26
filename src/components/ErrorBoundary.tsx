'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import ErrorDisplay, { classifyError, ErrorType } from './ErrorDisplay';
import { logger } from '@/lib/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  variant?: 'full' | 'inline' | 'minimal';
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorType: ErrorType;
  retrying: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false, 
      errorType: 'unknown',
      retrying: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    const errorType = classifyError(error);
    return { 
      hasError: true, 
      error,
      errorType,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('ErrorBoundary caught an error', error, {
      componentStack: errorInfo.componentStack,
    });
  }

  handleRetry = async () => {
    this.setState({ retrying: true });
    
    // Small delay to show retrying state
    await new Promise(resolve => setTimeout(resolve, 500));
    
    this.setState({ 
      hasError: false, 
      error: undefined,
      retrying: false,
    });
    
    // Call onReset if provided
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError && this.state.error) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Use ErrorDisplay component with appropriate variant
      return (
        <ErrorDisplay
          error={this.state.error}
          errorType={this.state.errorType}
          variant={this.props.variant || 'full'}
          onRetry={this.handleRetry}
          retrying={this.state.retrying}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

