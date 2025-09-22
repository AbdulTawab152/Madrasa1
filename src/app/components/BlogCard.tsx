import Link from "next/link";
import Image from "next/image";

interface Blog {
  id: number;
  slug: string;
  title: string;
  image: string;
  excerpt: string;
}

export default function BlogCard({ blog }: { blog: Blog }) {
  // اینجا imageUrl را تعریف کن چون blog موجود است
  const imageUrl = blog.image.startsWith("http")
    ? blog.image
    : `https://lawngreen-dragonfly-304220.hostingersite.com${blog.image}`;

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <Image
        src={imageUrl}
        alt={blog.title}
        width={400}
        height={250}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{blog.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{blog.excerpt}</p>
        <Link
          href={`/top-blog/${blog.slug}`}
          className="text-blue-500 outline-none focus:outline-none focus:ring-0"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}
