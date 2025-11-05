// app/articles/[slug]/page.tsx
import { ArticlesApi, extractArray } from "../../../lib/api";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getImageUrl } from "@/lib/utils";
import { cleanText } from "@/lib/textUtils";
import VideoPlayer from "@/app/components/VideoPlayer";
import Breadcrumb from "@/components/Breadcrumb";

interface Article {
  title: string;
  slug: string;
  content: string;
  description?: string;
  excerpt?: string;
  featuredImage?: string;
  video_url?: string;
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
  const rawArticle = Array.isArray(articlePayload)
    ? (articlePayload[0] as any | undefined)
    : (articlePayload as any | undefined);

  if (!rawArticle) notFound();

  // Process the article to ensure category is properly handled
  const article: Article = {
    ...rawArticle,
    category: typeof rawArticle.category === 'string' 
      ? rawArticle.category 
      : rawArticle.category?.name || 'General'
  };

  let relatedArticles: Article[] = [];
  try {
    const relatedResponse = await ArticlesApi.getAll({ limit: 6 });
    if (relatedResponse.success) {
      const data = extractArray<any>(relatedResponse.data);
      relatedArticles = data
        .filter((a) => a.slug !== slug)
        .slice(0, 3)
        .map((item) => ({
          ...item,
          category: typeof item.category === 'string' 
            ? item.category 
            : item.category?.name || 'General'
        }));
    }
  } catch (relatedError) {
    console.warn("Failed to load related articles:", relatedError);
  }

  return (
    <main className="min-h-screen mt-32 bg-gradient-to-b from-amber-50/30 to-white">
      <Breadcrumb />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Article Content */}
          <div className="flex-1">
        <article className="mb-16">
              <div className="bg-white overflow-hidden">
                {/* Article Meta */}
                <div className="px-8 pt-8 pb-4">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      {article.category && (
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-[10px] md:text-sm font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                          {article.category}
                        </span>
                      )}
                    
                    </div>
                  
                  </div>
                  
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            {cleanText(article.title)}
          </h1>
                </div>

                {/* Media Section */}
                {article.video_url && (
                  <div className="px-8 mb-8">
                    <VideoPlayer
                      videoUrl={article.video_url}
                      posterUrl={article.featuredImage || article.image || ""}
                      title={article.title}
                    />
                  </div>
                )}

                {(article.featuredImage || article.image) && !article.video_url && (
                  <div className="relative w-full h-64 sm:h-80 md:h-96 mx-8 mb-8 rounded-2xl overflow-hidden  group">
              <Image
                src={
                  getImageUrl(article.featuredImage || article.image, "/placeholder-blog.jpg") ||
                  "/placeholder-blog.jpg"
                }
                alt={article.title}
                fill
                sizes="100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-200"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </div>
          )}

                {/* Article Content */}
                <div className="px-8 pb-8">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-md sm:text-lg text-gray-700 leading-relaxed mb-6">
                      {cleanText(article.description)}
                    </p>
                    
                    {article.content && (
                      <div 
                        className="text-gray-800 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                      />
                    )}
                  </div>
                </div>
              </div>
        </article>
          </div>

          {/* Related Articles Sidebar - Desktop Only */}
          {relatedArticles.length > 0 && (
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-8">
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  {/* Sidebar Header */}
                  <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Related Articles</h3>
                   
                  </div>

                  {/* Articles List */}
                  <div className="p-4">
                    <div className="space-y-4">
                      {relatedArticles.map((item, index) => (
                        <Link
                          key={item.slug}
                          href={`/articles/${item.slug}`}
                          className="group block p-4 bg-gray-50 rounded-xl hover:bg-blue-50  transition-all duration-150 border border-gray-100 hover:border-blue-200"
                        >
                          {/* Article Image */}
                          <div className="relative h-32 rounded-lg overflow-hidden mb-3">
                            {(() => {
                              const imageUrl = getImageUrl(item.featuredImage || item.image);
                              return imageUrl ? (
                                <Image
                                  src={imageUrl}
                                  alt={item.title}
                                  fill
                                  sizes="320px"
                                  className="object-cover group-hover:scale-105 transition-transform duration-150"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100">
                                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20"></div>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-4xl text-blue-400">📄</div>
                                  </div>
                                </div>
                              );
                            })()}
                            
                            {/* Category Badge */}
                            {item.category && (
                              <div className="absolute top-2 left-2">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-blue-700">
                                  {item.category}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div>
                            <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-2 line-clamp-2 leading-tight">
                              {cleanText(item.title)}
                            </h4>
                            
                            <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                              {cleanText(item.description) || "Continue reading..."}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Articles - Mobile Bottom Section */}
        {relatedArticles.length > 0 && (
          <div className="lg:hidden mt-8">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {/* Section Header */}
              <div className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">Related Articles</h3>
                <p className="text-sm text-gray-600 mt-1">Continue exploring more content</p>
              </div>

              {/* Articles Grid - Mobile */}
              <div className="p-4">
                <div className="grid gap-4">
                  {relatedArticles.map((item, index) => (
                <Link
                  key={item.slug}
                  href={`/articles/${item.slug}`}
                      className="group flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all duration-150 border border-gray-100 hover:border-blue-200"
                    >
                      {/* Article Image */}
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                        {(() => {
                          const imageUrl = getImageUrl(item.featuredImage || item.image);
                          return imageUrl ? (
                            <Image
                              src={imageUrl}
                              alt={item.title}
                              fill
                              sizes="96px"
                              className="object-cover group-hover:scale-105 transition-transform duration-150"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100">
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20"></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-2xl text-blue-400">📄</div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Category Badge */}
                        {item.category && (
                          <div className="mb-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                              {item.category}
                            </span>
                          </div>
                        )}
                        
                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-2 line-clamp-2 leading-tight">
                    {cleanText(item.title)}
                        </h4>
                        
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {cleanText(item.description) || "Continue reading..."}
                        </p>
                      </div>
                </Link>
              ))}
            </div>
              </div>
            </div>
          </div>
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
