export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
            <span className="ml-4 text-gray-600 font-medium">
              در حال بارگذاری فرم ثبت‌نام...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

