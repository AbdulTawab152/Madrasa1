import Image from 'next/image';

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

type Props = {
  params: {
    slug: string;
  };
};

export default async function IftahDetailPage({ params }: Props) {
  const { slug } = params;

  // Fetch Iftah by slug
  const resIftah = await fetch(
    `https://lawngreen-dragonfly-304220.hostingersite.com/api/iftah/${slug}`,
    { cache: "no-store" } // ensures SSR
  );

  if (!resIftah.ok) return <div>Iftah not found</div>;
  const iftah: Iftah = await resIftah.json();

  // Fetch Mufty if available
  let mufty: Mufty | null = null;
  if (iftah.mufti_id) {
    const resMufty = await fetch(
      `https://lawngreen-dragonfly-304220.hostingersite.com/api/mufty/${iftah.mufti_id}`,
      { cache: "no-store" }
    );
    if (resMufty.ok) mufty = await resMufty.json();
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{iftah.title}</h1>

      {mufty && (
        <p className="text-gray-700 mb-2">
          <strong>Mufty:</strong> {mufty.full_name}
        </p>
      )}

      <p className="mt-4 text-gray-800">
        <strong>Question:</strong> {iftah.question}
      </p>
      <p className="mt-2 text-gray-800">
        <strong>Answer:</strong> {iftah.answer}
      </p>

      <p className="mt-2 text-gray-500 text-sm">
        <strong>Date:</strong> {iftah.date}
      </p>

      {iftah.note && (
        <p className="mt-1 text-gray-500 text-sm">
          <strong>Note:</strong> {iftah.note}
        </p>
      )}

      {iftah.attachment && (
        <a
          href={iftah.attachment}
          target="_blank"
          className="text-blue-500 hover:underline mt-2 block"
        >
          Attachment
        </a>
      )}
    </div>
  );
}
