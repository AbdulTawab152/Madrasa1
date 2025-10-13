// app/articles/[slug]/page.tsx
import { ArticlesApi, extractArray } from "../../../lib/api";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getImageUrl } from "@/lib/utils";
import { cleanText } from "@/lib/textUtils";

interface Article {
  title: string;
  slug: string;
  content: string;
  description?: string;
  excerpt?: string;
  featuredImage?: string;
  author?: string;
  category?: string;
  tags?: string[];
  publishedAt?: string;
  readTime?: number;
  viewCount?: number;
  is_published?: boolean;
  image?: string; // برای جلوگیری از خطا
}

// ✅ PageProps درست
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticleDetailsPage({ params }: PageProps) {
  const { slug } = await params;

  const articleResponse = await ArticlesApi.getBySlug(slug);
  if (!articleResponse.success) {
    notFound();
  }

  const articlePayload = articleResponse.data;
  const article = Array.isArray(articlePayload)
    ? (articlePayload[0] as Article | undefined)
    : (articlePayload as Article | undefined);

  if (!article) notFound();

  let relatedArticles: Article[] = [];
  try {
    const relatedResponse = await ArticlesApi.getAll({ limit: 6 });
    if (relatedResponse.success) {
      const data = extractArray<Article>(relatedResponse.data);
      relatedArticles = data.filter((a) => a.slug !== slug).slice(0, 3);
    }
  } catch (relatedError) {
    console.warn("Failed to load related articles:", relatedError);
  }

  return (
    <main className="min-h-screen mt-32 bg-gradient-to-b from-amber-50/30 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8 bg-white p-4 rounded-xl shadow-sm border border-amber-100">
          <ol className="flex items-center space-x-1 text-sm font-medium">
            <li>
              <Link
                href="/"
                className="flex items-center text-amber-600 hover:text-amber-700 transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <svg
                className="w-4 h-4 mx-2 text-amber-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <Link
                href="/articles"
                className="text-amber-600 hover:text-amber-700 transition-colors"
              >
                Articles
              </Link>
            </li>
          </ol>
        </nav>

        {/* Article Header */}
        <article className="mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            {cleanText(article.title)}
          </h1>

          {(article.featuredImage || article.image) && (
            <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl mb-10 group">
              <Image
                src={
                  getImageUrl(article.featuredImage || article.image, "/placeholder.jpg") ||
                  "/placeholder.jpg"
                }
                alt={article.title}
                fill
                sizes="100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          )}

          <p>{cleanText(article.description)}</p>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Related Articles
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {relatedArticles.map((item) => (
                <Link
                  key={item.slug}
                  href={`/articles/${item.slug}`}
                  className="block bg-white border border-amber-100 rounded-xl p-6 shadow-sm hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {cleanText(item.title)}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {cleanText(item.description) || "Continue reading"}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

// ✅ اگر متادیتا خواستی:
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Article: ${slug}`,
  };
}
