interface PageSkeletonProps {
  type?: 'articles' | 'courses' | 'books' | 'authors' | 'events' | 'blogs' | 'default';
  showFilters?: boolean;
  cardCount?: number;
}

export default function PageSkeleton({ 
  type = 'default', 
  showFilters = true, 
  cardCount = 6 
}: PageSkeletonProps) {
  const renderCardSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
      {/* Image Placeholder */}
      <div className="h-48 bg-gray-200 animate-pulse"></div>
      
      {/* Content Placeholder */}
      <div className="p-6">
        <div className="flex items-center mb-3">
          <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
        
        <div className="h-6 w-full bg-gray-200 rounded animate-pulse mb-3"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-3"></div>
        
        <div className="space-y-2 mb-4">
          <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
      </div>
      
      {/* Button Placeholder */}
      <div className="px-6 pb-6">
        <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );

  const renderFilterSkeleton = () => (
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
  );

  const renderListSkeleton = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6">
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
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Filter Section */}
          {showFilters && renderFilterSkeleton()}

          {/* Content Section */}
          {type === 'articles' || type === 'courses' || type === 'books' || type === 'events' || type === 'blogs' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(cardCount)].map((_, index) => (
                <div key={index}>
                  {renderCardSkeleton()}
                </div>
              ))}
            </div>
          ) : type === 'authors' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(cardCount)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
                  {/* Author Image Placeholder */}
                  <div className="h-64 bg-gray-200 animate-pulse"></div>
                  
                  {/* Author Content */}
                  <div className="p-6 text-center">
                    <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mx-auto mb-3"></div>
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
                    <div className="space-y-2 mb-4">
                      <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-3 w-3/4 bg-gray-200 rounded animate-pulse mx-auto"></div>
                    </div>
                    <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse mx-auto"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            renderListSkeleton()
          )}
        </div>
      </div>
    </div>
  );
}

