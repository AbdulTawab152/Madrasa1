import Link from "next/link";

type Iftah = {
  id: number;
  tag_id: number;
  title: string;
  slug: string;
  question: string;
  answer: string;
  date: string;
  note?: string;
  mufti_id: number;
  is_published: boolean;
  attachment?: string;
  is_top?: boolean;
};

type Mufty = {
  id: number;
  full_name: string;
};

// Fetch all Iftahs
async function getIftahs(): Promise<Iftah[]> {
  const res = await fetch("https://lawngreen-dragonfly-304220.hostingersite.com/api/iftah");
  if (!res.ok) return [];
  return res.json();
}

// Fetch all Mufties
async function getMufties(): Promise<Mufty[]> {
  const res = await fetch("https://lawngreen-dragonfly-304220.hostingersite.com/api/mufties");
  if (!res.ok) return [];
  return res.json();
}

export default async function IftahList() {
  const [iftahs, mufties] = await Promise.all([getIftahs(), getMufties()]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">All Iftahs</h1>
      <ul className="space-y-6">
        {iftahs.map((item) => {
          const mufty = mufties.find((m) => m.id === item.mufti_id);
          return (
            <li key={item.id} className="p-4 border rounded-lg">
              <Link
                href={`/iftah/${item.slug}`}
                className="text-blue-600 font-semibold hover:underline"
              >
                {item.title}
              </Link>

              {mufty && (
                <p className="text-gray-700 mt-1">
                  <strong>Mufty:</strong> {mufty.full_name}
                </p>
              )}

              <p className="mt-2 text-gray-600">
                <strong>Question:</strong> {item.question}
              </p>
              <p className="mt-1 text-gray-600">
                <strong>Answer:</strong> {item.answer}
              </p>
              <p className="mt-1 text-gray-500 text-sm">
                <strong>Date:</strong> {item.date}
              </p>
              {item.note && (
                <p className="mt-1 text-gray-500 text-sm">
                  <strong>Note:</strong> {item.note}
                </p>
              )}
              {item.attachment && (
                <a
                  href={item.attachment}
                  target="_blank"
                  className="text-blue-500 hover:underline mt-1 block"
                >
                  Attachment
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
