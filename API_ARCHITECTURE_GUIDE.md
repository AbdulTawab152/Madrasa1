# API Architecture Guide

This guide explains the standardized API architecture implemented across the application.

## Overview

The new API architecture provides:
- ✅ Unified error handling and retry logic
- ✅ Consistent loading states with reusable components
- ✅ Smart fallback strategy (fallback for lists, errors for details)
- ✅ Toast notification system for non-critical errors
- ✅ Environment-aware logging (minimal in production, verbose in development)

## Core Components

### 1. Logger (`src/lib/logger.ts`)

Environment-aware logging utility that respects production vs development environments.

**Usage:**
```typescript
import { logger } from '@/lib/logger';

// Different log levels
logger.debug('Debug message', { context: 'data' });
logger.info('Info message', { count: 10 });
logger.warn('Warning message', { error });
logger.error('Error message', error, { endpoint: '/api/blogs' });

// API-specific logging
logger.apiRequest('/api/blogs', { page: 1 });
logger.apiResponse('/api/blogs', 123, 200); // duration, status
logger.apiError('/api/blogs', error, 404);

// Performance timing
const endTimer = logger.startTimer('Fetch blogs');
// ... do work ...
endTimer(); // Logs duration
```

**Configuration:**
- Production: Only ERROR and WARN logs
- Development: All log levels with detailed context
- Test: No logs

### 2. Toast Notifications (`src/components/Toast.tsx`)

Toast notification system for user feedback.

**Usage:**
```typescript
import { useToast } from '@/components/Toast';

function MyComponent() {
  const toast = useToast();
  
  // Show different toast types
  toast.success('Operation successful!');
  toast.error('Something went wrong');
  toast.warning('Please check your input');
  toast.info('Information message');
  
  // With custom duration (default 5000ms)
  toast.success('Quick message', 3000);
}
```

**Features:**
- Auto-dismiss after configurable duration
- Queue management (max 3 toasts by default)
- Dismissible by user
- Beautiful animations
- Color-coded by type (success, error, warning, info)

### 3. Unified Loader (`src/components/loading/UnifiedLoader.tsx`)

Single source of truth for all loading states.

**Usage:**
```typescript
import UnifiedLoader from '@/components/loading/UnifiedLoader';

// Different variants for different UI patterns
<UnifiedLoader variant="card-grid" count={6} showFilters />
<UnifiedLoader variant="list" count={5} />
<UnifiedLoader variant="detail" />
<UnifiedLoader variant="form" />
<UnifiedLoader variant="inline" />
```

**Variants:**
- `card-grid`: For blog cards, article cards, course cards (default)
- `list`: For table-like list views
- `detail`: For detail/single item pages
- `form`: For form loading states
- `inline`: For small inline loading indicators

### 4. Error Display (`src/components/ErrorDisplay.tsx`)

Standardized error display component with error classification.

**Usage:**
```typescript
import ErrorDisplay, { classifyError } from '@/components/ErrorDisplay';

function MyComponent() {
  const [error, setError] = useState(null);
  
  if (error) {
    return (
      <ErrorDisplay
        error={error}
        errorType={classifyError(error)}
        variant="inline"
        onRetry={handleRetry}
        retrying={isRetrying}
      />
    );
  }
}
```

**Error Types:**
- `network`: Connection errors, timeouts
- `server`: 5xx errors
- `not-found`: 404 errors
- `unknown`: Other errors

**Variants:**
- `full`: Full-page error display
- `inline`: Inline error with retry button
- `minimal`: Small error message

### 5. Enhanced Error Boundary (`src/components/ErrorBoundary.tsx`)

Catches and handles React errors with better UX.

**Usage:**
```typescript
import ErrorBoundary from '@/components/ErrorBoundary';

<ErrorBoundary variant="full" onReset={handleReset}>
  <YourComponent />
</ErrorBoundary>

// For inline errors
<ErrorBoundary variant="inline">
  <YourComponent />
</ErrorBoundary>
```

## API Hooks

### useApi Hook

Generic hook for all API calls with built-in loading, error handling, and toast notifications.

**Usage:**
```typescript
import { useApi } from '@/hooks/useApi';
import { BlogsApi } from '@/lib/api';

function BlogsList() {
  const { 
    data, 
    isLoading, 
    error, 
    errorType, 
    refetch 
  } = useApi(
    () => BlogsApi.getAll({ page: 1 }),
    {
      enabled: true,
      showToast: true,
      isDetail: false, // false for list endpoints, true for detail
    }
  );

  if (isLoading) return <UnifiedLoader variant="card-grid" />;
  if (error) return <ErrorDisplay error={error} errorType={errorType} onRetry={refetch} />;

  return <div>{/* Render data */}</div>;
}
```

### useApiMutation Hook

For form submissions and mutations.

**Usage:**
```typescript
import { useApiMutation } from '@/hooks/useApi';
import { ContactApi } from '@/lib/api';

function ContactForm() {
  const toast = useToast();
  
  const { mutate, isLoading, error } = useApiMutation(
    (data) => ContactApi.submit(data),
    {
      onSuccess: (data) => {
        toast.success('Message sent successfully!');
        // Clear form, etc.
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const handleSubmit = async (formData) => {
    try {
      await mutate(formData);
    } catch (err) {
      // Error already handled by hook
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}
```

## API Service Classes

All API service classes follow a consistent pattern:

### List Endpoints (getAll)
- Use fallback data on error
- Show toast notification (optional)
- Always return success response

**Example:**
```typescript
export class BlogsApi {
  static async getAll(params: ListParams = {}) {
    try {
      logger.info('Fetching blogs from API', { page, limit });
      const result = await apiClient.get(endpoints.blogs, { params });
      
      if (!result.success) {
        throw new Error(result.error || 'API request failed');
      }
      
      return result;
    } catch (error) {
      logger.warn('Blogs API failed, using fallback data', { error });
      
      const fallback = getFallbackData("blogs");
      return {
        data: fallback,
        success: true,
        message: "Using cached data due to API unavailability",
        pagination: createPaginationMeta({ page, limit, total: fallback.length }),
      };
    }
  }
}
```

### Detail Endpoints (getById, getBySlug)
- Throw errors (caught by ErrorBoundary)
- No fallback data by default
- User sees error page with retry option

**Example:**
```typescript
static async getBySlug(slug: string) {
  try {
    const result = await apiClient.get(`${endpoints.blogs}/${slug}`);
    if (!result.success) {
      throw new Error(result.error || 'API request failed');
    }
    return result;
  } catch (error) {
    logger.warn('Blog getBySlug failed', { slug, error });
    
    // For detail endpoints, throw error to be caught by ErrorBoundary
    if (!apiConfig.fallback.useForDetailEndpoints) {
      throw error;
    }
    
    // Otherwise return fallback
    return { data: null, success: true };
  }
}
```

### Submit Endpoints (form submissions)
- Show inline validation errors
- Toast notifications for success
- Return error for proper error handling

## Configuration (`src/lib/config.ts`)

The API configuration controls behavior across the application:

```typescript
export const apiConfig = {
  // ... existing config ...
  
  // Error handling configuration
  errorHandling: {
    maxRetries: 3,
    retryDelay: 1000, // ms
    retryableStatusCodes: [408, 429, 500, 502, 503, 504],
    suppressedStatusCodes: [404], // Don't log these in production
  },
  
  // Toast notification preferences
  notifications: {
    showSuccessToast: false,
    showErrorToast: true,
    toastDuration: 5000, // ms
  },
  
  // Logging configuration
  logging: {
    enableApiLogs: process.env.NODE_ENV === 'development',
    enablePerformanceLogs: process.env.NODE_ENV === 'development',
    suppressedErrors: ['404'],
  },
  
  // Fallback data configuration
  fallback: {
    useForListEndpoints: true,
    useForDetailEndpoints: false,
    showFallbackMessage: true,
  },
};
```

## Migration Guide

### Updating Existing Components

#### Before (Old Pattern):
```typescript
function BlogsList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        const response = await BlogsApi.getAll({ page: 1 });
        setBlogs(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  if (loading) return <PageSkeleton type="blogs" />;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{/* Render blogs */}</div>;
}
```

#### After (New Pattern):
```typescript
function BlogsList() {
  const { data: blogs, isLoading, error, errorType, refetch } = useApi(
    () => BlogsApi.getAll({ page: 1 }),
    { isDetail: false, showToast: true }
  );

  if (isLoading) return <UnifiedLoader variant="card-grid" count={6} />;
  if (error) return <ErrorDisplay error={error} errorType={errorType} onRetry={refetch} />;

  return <div>{/* Render blogs */}</div>;
}
```

### Updating Forms

#### Before:
```typescript
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const handleSubmit = async (data) => {
  setLoading(true);
  try {
    await ContactApi.submit(data);
    // Show success message
  } catch (err) {
    setError(err);
  } finally {
    setLoading(false);
  }
};
```

#### After:
```typescript
const toast = useToast();

const { mutate, isLoading } = useApiMutation(
  (data) => ContactApi.submit(data),
  {
    onSuccess: () => toast.success('Submitted successfully!'),
    onError: (err) => toast.error(err.message),
  }
);

const handleSubmit = async (data) => {
  await mutate(data);
};
```

## Best Practices

1. **Use UnifiedLoader everywhere** - Don't create custom loading skeletons
2. **Wrap detail pages in ErrorBoundary** - Let errors propagate for better UX
3. **Use logger instead of console.log** - Respects environment settings
4. **Use toast for success feedback** - Better UX than inline messages
5. **Follow the fallback strategy** - Lists use fallback, details throw errors
6. **Always include retry functionality** - Users appreciate being able to retry
7. **Use environment-aware patterns** - Verbose in dev, quiet in production

## Testing

### Development Mode
- All logs visible in console
- API calls show timing and parameters
- Errors display full stack traces

### Production Mode
- Only ERROR and WARN logs
- 404 errors completely suppressed
- Clean user-facing error messages

## Troubleshooting

### Toast notifications not showing
```typescript
// Make sure ToastProvider is in your layout
import { ToastProvider } from '@/components/Toast';

<ToastProvider>
  <YourApp />
</ToastProvider>
```

### Logs not appearing
```typescript
// Check environment
console.log(process.env.NODE_ENV); // Should be 'development' to see all logs
```

### Errors not caught by ErrorBoundary
```typescript
// Make sure detail endpoints throw errors:
if (!apiConfig.fallback.useForDetailEndpoints) {
  throw error; // This allows ErrorBoundary to catch it
}
```

## Future Enhancements

- Request/response caching layer
- Optimistic updates for mutations
- Real-time synchronization
- Offline support with service workers
- Request deduplication
- Query invalidation and refetching

## Support

For questions or issues with the API architecture, refer to:
- `/src/lib/api.ts` - API client and service classes
- `/src/hooks/useApi.ts` - API hooks
- `/src/lib/logger.ts` - Logging utility
- `/src/components/Toast.tsx` - Toast notifications
- This guide!

