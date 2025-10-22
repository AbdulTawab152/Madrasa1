export default function LoadingDonationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="h-8 w-32 bg-gray-200 rounded-full animate-pulse mx-auto mb-6"></div>
            <div className="h-12 w-3/4 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
            <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <div className="h-10 w-96 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
          <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse mx-auto"></div>
        </div>

        <div className="space-y-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
              <div className="flex flex-col lg:flex-row">
                {/* Header Section Skeleton */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 lg:w-1/3 flex-shrink-0">
                  <div className="mb-4">
                    <div className="h-8 w-48 bg-white/20 rounded animate-pulse mb-2"></div>
                    <div className="h-4 w-24 bg-white/20 rounded animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-white/20 rounded animate-pulse"></div>
                    <div className="h-3 w-5/6 bg-white/20 rounded animate-pulse"></div>
                    <div className="h-3 w-4/5 bg-white/20 rounded animate-pulse"></div>
                  </div>
                </div>

                {/* Content Section Skeleton */}
                <div className="p-8 lg:w-2/3">
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-green-600 rounded-xl">
                      <div className="w-6 h-6 bg-white/20 rounded animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-4 w-20 bg-white/20 rounded animate-pulse mb-1"></div>
                        <div className="h-3 w-32 bg-white/20 rounded animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-600 rounded-xl">
                      <div className="w-6 h-6 bg-white/20 rounded animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-4 w-16 bg-white/20 rounded animate-pulse mb-1"></div>
                        <div className="h-3 w-40 bg-white/20 rounded animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-600 rounded-xl md:col-span-2">
                      <div className="w-6 h-6 bg-white/20 rounded animate-pulse"></div>
                      <div className="flex-1">
                        <div className="h-4 w-20 bg-white/20 rounded animate-pulse mb-1"></div>
                        <div className="h-3 w-48 bg-white/20 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl animate-pulse">
                      <div className="h-6 w-32 bg-white/20 rounded mx-auto"></div>
                    </div>
                    <div className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-xl animate-pulse">
                      <div className="h-6 w-24 bg-white/20 rounded mx-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instructions Section Skeleton */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="h-10 w-80 bg-white/20 rounded animate-pulse mx-auto mb-6"></div>
            <div className="h-6 w-2/3 bg-white/20 rounded animate-pulse mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <div className="w-8 h-8 bg-white/20 rounded"></div>
                </div>
                <div className="h-6 w-32 bg-white/20 rounded animate-pulse mx-auto mb-2"></div>
                <div className="h-4 w-full bg-white/20 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators Skeleton */}
      <section className="py-12 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
