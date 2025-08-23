// app/iftah/page.tsx
import IftahSection from "./../components/iftah/page"; // مسیر کامپوننت افتاح خود را درست وارد کنید
import { IftahApi } from "../../lib/api"; // مسیر درست API

interface Author {
  name: string;
  bio?: string;
}

export interface Iftah {
  id: number;
  title: string;
  slug: string;
  question: string;
  answer: string;
  mufti?: Author;
  category?: string;
  tags?: string[];
  references?: string[];
  isPublished?: boolean;
  viewCount?: number;
  is_published?: boolean;
}

export default async function IftahPage() {
  // fetch تمام افتاح‌ها
  const res = await IftahApi.getAll();
  const iftahItems = Array.isArray(res.data) ? (res.data as Iftah[]) : [];

  return (
    <main className="max-w-6xl mt-32 mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">لیست افتاح‌ها</h1>
    
      <IftahSection fatwas={iftahItems} showAll={true} />
    </main>
  );
}
