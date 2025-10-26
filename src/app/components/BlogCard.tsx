import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getImageUrl } from "@/lib/utils";

interface Blog {
  id: number;
  slug: string;
  title: string;
  image: string;
  excerpt: string;
}

const fallbackImage = "/placeholder-blog.jpg";

export default function BlogCard({ blog }: { blog: Blog }) {
  if (!blog) return null;
  const imageUrl = getImageUrl(blog.image, fallbackImage) ?? fallbackImage;

  return (
    <div className="h-full group relative overflow-hidden rounded-3xl border border-primary-100/70 bg-white shadow-[0_18px_40px_-28px_rgba(15,23,42,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(15,23,42,0.55)]">
      <div className="aspect-[16/10] relative isolate overflow-hidden rounded-3xl border border-white/10 bg-slate-950/5">
        <Image
          src={imageUrl}
          alt={blog.title}
          fill
          sizes="(min-width: 1280px) 340px, (min-width: 768px) 45vw, 90vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          priority={false}
        />

        <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-primary-700 shadow-sm">
          Blog Insight
        </span>
      </div>

      <div className="flex h-full flex-col gap-4 p-6">
        <h3 className="text-xl font-semibold leading-tight text-primary-900 transition-colors duration-300 group-hover:text-primary-600">
          {blog.title}
        </h3>

        <p className="text-sm leading-relaxed text-primary-600 line-clamp-3">
          {blog.excerpt}
        </p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-primary-100/70 pt-2">
          <Link
            href={`/top-blog/${blog.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition-colors duration-200 hover:text-primary-700 outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Read more
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
