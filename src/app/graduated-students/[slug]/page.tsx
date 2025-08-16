import Image from 'next/image';

interface Graduation {
  id: number;
  slug: string;
  title: string;
  description?: string;
  content?: string;
  image?: string;
  date?: string;
  shared_by?: string;
  category_id?: string | number;
}

// تابع fetch جزئیات بر اساس slug
async function fetchGraduationDetail(slug: string): Promise<Graduation | null> {
  try {
    const res = await fetch(`https://lawngreen-dragonfly-304220.hostingersite.com/api/graduations/${slug}`, {
      // در حالت development یا وقتی میخوای اطلاعات همیشه تازه بیاد از این استفاده کن
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error('Graduation not found:', res.status);
      return null;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

const getImageUrl = (img?: string) => {
  if (img && img.startsWith("http")) return img;
  return `https://lawngreen-dragonfly-304220.hostingersite.com/storage/${img}`;
};

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function GraduationDetailPage({ params }: PageProps) {
  const { slug } = params;

  const graduation = await fetchGraduationDetail(slug);

  if (!graduation) {
    return (
      <main className="min-h-screen p-8">
        <h1 className="text-2xl font-bold">موردی یافت نشد.</h1>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-8 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-4xl font-bold mb-4">{graduation.title}</h1>
      <Image
        src={getImageUrl(graduation.image)}
        alt={graduation.title}
        className="w-full h-auto rounded-lg mb-6"
      />
      <p className="text-gray-700 leading-relaxed">{graduation.description || graduation.content}</p>

      <div className="mt-6 text-gray-600 text-sm">
        <p>Date: {graduation.date || 'N/A'}</p>
        <p>Shared by: {graduation.shared_by || 'N/A'}</p>
        <p>Category ID: {graduation.category_id || 'N/A'}</p>
      </div>
    </main>
  );
}
