import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Card, CardBadge, CardContent, CardFooter, CardMedia } from "./Card";
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
  const imageUrl = getImageUrl(blog.image, fallbackImage) ?? fallbackImage;

  return (
    <Card className="h-full">
      <CardMedia className="aspect-[16/10]">
        <Image
          src={imageUrl}
          alt={blog.title}
          fill
          sizes="(min-width: 1280px) 340px, (min-width: 768px) 45vw, 90vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          priority={false}
        />

        <CardBadge className="absolute top-4 left-4 bg-white/90 text-primary-700">
          Blog Insight
        </CardBadge>
      </CardMedia>

      <CardContent className="gap-4">
        <h3 className="text-xl font-semibold leading-tight text-primary-900 transition-colors duration-300 group-hover:text-primary-600">
          {blog.title}
        </h3>

        <p className="text-sm leading-relaxed text-primary-600 line-clamp-3">
          {blog.excerpt}
        </p>

        <CardFooter className="border-0 p-0 pt-2">
          <Link
            href={`/top-blog/${blog.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition-colors duration-200 hover:text-primary-700 outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Read more
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
