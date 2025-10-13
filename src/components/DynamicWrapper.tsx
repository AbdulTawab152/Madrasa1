"use client";

import dynamic from 'next/dynamic';
import React, { ComponentType, Suspense } from 'react';

interface DynamicWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

// Default fallback component
const DefaultFallback = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
  </div>
);

// Dynamic wrapper component
export function DynamicWrapper({ children, fallback = <DefaultFallback /> }: DynamicWrapperProps) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}

// Higher-order component for dynamic imports with error boundary
export function withDynamicImport<T extends object>(
  Component: ComponentType<T>,
  fallback?: React.ReactNode
) {
  const DynamicComponent = dynamic(() => Promise.resolve(Component), {
    loading: () => fallback || <DefaultFallback />,
    ssr: false, // Disable SSR to prevent hydration mismatches
  });

  return function WrappedComponent(props: T) {
    return (
      <DynamicWrapper fallback={fallback}>
        <DynamicComponent {...props} />
      </DynamicWrapper>
    );
  };
}

// Error boundary component
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center p-8 text-red-600">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
            <p className="text-sm">Please refresh the page to try again.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
