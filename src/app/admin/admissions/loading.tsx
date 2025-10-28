export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
          <span className="ml-4 text-gray-600 font-medium">در حال بارگذاری داشبورد...</span>
        </div>
      </div>
    </div>
  );
}

