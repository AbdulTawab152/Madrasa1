/**
 * UnifiedLoader - Single source of truth for all loading states
 * Supports multiple variants for different UI patterns
 */

interface UnifiedLoaderProps {
  variant?: 'card-grid' | 'list' | 'detail' | 'form' | 'inline';
  count?: number;
  showFilters?: boolean;
  className?: string;
}

export default function UnifiedLoader({
  variant = 'card-grid',
  count = 6,
  showFilters = false,
  className = '',
}: UnifiedLoaderProps) {
  switch (variant) {
    case 'card-grid':
      return <CardGridLoader count={count} showFilters={showFilters} className={className} />;
    case 'list':
      return <ListLoader count={count} showFilters={showFilters} className={className} />;
    case 'detail':
      return <DetailLoader className={className} />;
    case 'form':
      return <FormLoader className={className} />;
    case 'inline':
      return <InlineLoader className={className} />;
    default:
      return <CardGridLoader count={count} showFilters={showFilters} className={className} />;
  }
}

// Card Grid Loader (for blogs, articles, courses, etc.)
function CardGridLoader({ count, showFilters, className }: { count: number; showFilters: boolean; className?: string }) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Filter Section */}
          {showFilters && (
            <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                </div>
                <div className="md:w-64">
                  <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                </div>
              </div>
            </div>
          )}

          {/* Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: count }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// List Loader (for table-like views)
function ListLoader({ count, showFilters, className }: { count: number; showFilters: boolean; className?: string }) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Filter Section */}
          {showFilters && (
            <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6">
              <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
          )}

          {/* List Items */}
          {Array.from({ length: count }).map((_, index) => (
            <ListItemSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Detail Page Loader
function DetailLoader({ className }: { className?: string }) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 ${className}`}>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Category Badge */}
            <div className="inline-block mb-6">
              <div className="h-8 w-32 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
            
            {/* Title */}
            <div className="space-y-4 mb-8">
              <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse mx-auto"></div>
              <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse mx-auto"></div>
            </div>
            
            {/* Meta Info */}
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Featured Image */}
            <div className="mb-8">
              <div className="w-full h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
            </div>
            
            {/* Content Lines */}
            <div className="space-y-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="space-y-3">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Author Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse mx-auto mb-4"></div>
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
              </div>
            </div>
            
            {/* Related Content */}
            <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex space-x-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-3 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Form Loader
function FormLoader({ className }: { className?: string }) {
  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-amber-100 p-8 ${className}`}>
      <div className="space-y-6">
        {/* Form Fields */}
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
        ))}
        
        {/* Submit Button */}
        <div className="h-12 w-full bg-gray-200 rounded-xl animate-pulse"></div>
      </div>
    </div>
  );
}

// Inline Loader (for small loading states)
function InlineLoader({ className }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-8 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
        <span className="text-gray-600 font-medium">Loading...</span>
      </div>
    </div>
  );
}

// Reusable Card Skeleton - Professional Design
function CardSkeleton() {
  return (
    <div className="group overflow-hidden rounded-3xl border border-primary-100/60 bg-white/95 shadow-soft transition-all duration-300">
      {/* Image Placeholder */}
      <div className="relative h-52 w-full overflow-hidden">
        <div className="h-full w-full bg-gradient-to-br from-primary-100/80 via-primary-50/60 to-amber-100/40 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 via-transparent to-transparent"></div>
        {/* Category Badge Placeholder */}
        <div className="absolute top-4 left-4">
          <div className="h-6 w-20 bg-white/90 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      {/* Content Placeholder */}
      <div className="flex h-full flex-col gap-5 p-6">
        <div className="space-y-3">
          {/* Title */}
          <div className="h-6 w-full bg-primary-100/80 rounded animate-pulse"></div>
          <div className="h-5 w-4/5 bg-primary-50/80 rounded animate-pulse"></div>
          
          {/* Description */}
          <div className="space-y-2">
            <div className="h-3 w-full bg-primary-50/60 rounded animate-pulse"></div>
            <div className="h-3 w-full bg-primary-50/60 rounded animate-pulse"></div>
            <div className="h-3 w-3/4 bg-primary-50/60 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-primary-100/60 pt-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-primary-100/80 rounded animate-pulse"></div>
            <div className="h-4 w-20 bg-primary-100/80 rounded animate-pulse"></div>
          </div>
          <div className="h-9 w-24 bg-primary-100/80 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

// Reusable List Item Skeleton
function ListItemSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"></div>
        <div className="flex-1 space-y-3">
          <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 w-3/4 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

