/**
 * Environment-aware logging utility
 * Production: Only ERROR and WARN
 * Development: All levels with detailed context
 */

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

interface LogContext {
  endpoint?: string;
  params?: Record<string, unknown>;
  duration?: number;
  statusCode?: number;
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private isTest = process.env.NODE_ENV === 'test';

  private shouldLog(level: LogLevel): boolean {
    if (this.isTest) return false;
    
    if (!this.isDevelopment) {
      // Production: only ERROR and WARN
      return level === 'ERROR' || level === 'WARN';
    }
    
    // Development: all levels
    return true;
  }

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] [${level}]`;
    
    if (!context || Object.keys(context).length === 0) {
      return `${prefix} ${message}`;
    }

    return `${prefix} ${message}`;
  }

  private getEmoji(level: LogLevel): string {
    switch (level) {
      case 'DEBUG': return '🔍';
      case 'INFO': return 'ℹ️';
      case 'WARN': return '⚠️';
      case 'ERROR': return '❌';
      default: return '📝';
    }
  }

  debug(message: string, context?: LogContext): void {
    if (!this.shouldLog('DEBUG')) return;
    
    console.debug(
      `${this.getEmoji('DEBUG')} ${this.formatMessage('DEBUG', message, context)}`,
      context || ''
    );
  }

  info(message: string, context?: LogContext): void {
    if (!this.shouldLog('INFO')) return;
    
    console.info(
      `${this.getEmoji('INFO')} ${this.formatMessage('INFO', message, context)}`,
      context || ''
    );
  }

  warn(message: string, context?: LogContext): void {
    if (!this.shouldLog('WARN')) return;
    
    console.warn(
      `${this.getEmoji('WARN')} ${this.formatMessage('WARN', message, context)}`,
      context || ''
    );
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    if (!this.shouldLog('ERROR')) return;
    
    const errorDetails = error instanceof Error ? {
      message: error.message,
      stack: this.isDevelopment ? error.stack : undefined,
      ...context
    } : context;

    console.error(
      `${this.getEmoji('ERROR')} ${this.formatMessage('ERROR', message, errorDetails)}`,
      error || ''
    );
  }

  // API-specific logging methods
  apiRequest(endpoint: string, params?: Record<string, unknown>): void {
    this.debug(`API Request: ${endpoint}`, { endpoint, params });
  }

  apiResponse(endpoint: string, duration: number, statusCode: number): void {
    this.debug(`API Response: ${endpoint} (${duration}ms)`, {
      endpoint,
      duration,
      statusCode
    });
  }

  apiError(endpoint: string, error: Error | unknown, statusCode?: number): void {
    // Suppress 404 errors in production
    if (!this.isDevelopment && statusCode === 404) {
      return;
    }

    this.error(`API Error: ${endpoint}`, error, {
      endpoint,
      statusCode
    });
  }

  // Performance logging (development only)
  startTimer(label: string): () => void {
    if (!this.isDevelopment) return () => {};
    
    const start = performance.now();
    return () => {
      const duration = Math.round(performance.now() - start);
      this.debug(`⏱️ ${label}: ${duration}ms`, { duration });
    };
  }

  // Group logging for related operations
  group(label: string, callback: () => void): void {
    if (!this.isDevelopment) {
      callback();
      return;
    }

    console.group(`📦 ${label}`);
    try {
      callback();
    } finally {
      console.groupEnd();
    }
  }
}

// Export singleton instance
export const logger = new Logger();

// Export types
export type { LogLevel, LogContext };

