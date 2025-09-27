interface DetailPageSkeletonProps {
  type?: 'article' | 'course' | 'book' | 'author' | 'event' | 'blog' | 'graduated-student' | 'awlayaa' | 'tasawwuf' | 'iftah';
  showSidebar?: boolean;
  showComments?: boolean;
  showRelated?: boolean;
}

export default function DetailPageSkeleton({ 
  type = 'article',
  showSidebar = true,
  showComments = true,
  showRelated = true
}: DetailPageSkeletonProps) {
  const renderHeroSkeleton = () => (
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
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContentSkeleton = () => (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Featured Image */}
          <div className="mb-8">
            <div className="w-full h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>
          
          {/* Content */}
          <div className="space-y-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
          
          {/* Tags */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        {showSidebar && (
          <div className="space-y-8">
            {/* Author Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse mx-auto mb-4"></div>
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-3/4 bg-gray-200 rounded animate-pulse mx-auto"></div>
                </div>
              </div>
            </div>
            
            {/* Related Content */}
            {showRelated && (
              <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
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
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderCommentsSkeleton = () => (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-8"></div>
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse flex-shrink-0"></div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50">
      {renderHeroSkeleton()}
      {renderContentSkeleton()}
      {showComments && renderCommentsSkeleton()}
    </div>
  );
}
