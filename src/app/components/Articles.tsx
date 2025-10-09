import { ArticlesApi, extractArray } from "@/lib/api";
import TraditionalContentSection from "./TraditionalContentSection";

type RawArticle = {
  id: number;
  name?: string;
  title?: string;
  description?: string;
  content?: string;
  category?: string | { name?: string } | null;
  category_id?: string | number | null;
  author?: string | { name?: string } | null;
  shared_by?: string | null;
  image?: string | null;
  thumbnail?: string | null;
  slug?: string | null;
  tags?: unknown;
  is_published?: boolean | number | null;
  view_count?: number | null;
  viewCount?: number | null;
  created_at?: string | null;
  published_at?: string | null;
  date?: string | null;
};

async function fetchArticlesData(): Promise<RawArticle[]> {
  const response = await ArticlesApi.getAll();

  if (!response.success) {
    throw new Error(response.error || "Unable to load articles");
  }

  return extractArray<RawArticle>(response.data);
}

interface ArticlesPreviewProps {
  limit?: number;
}

export default async function ArticlesPreview({ limit }: ArticlesPreviewProps) {
  const articlesData = await fetchArticlesData();
  
  // Map the API response to match the expected ContentItem interface
  const mappedArticles = articlesData.map((item) => {
        // Handle author field - ensure it's always a string or undefined
        let authorName = 'Anonymous';
    if (item.author) {
      if (typeof item.author === 'string') {
        authorName = item.author;
      } else if (typeof item.author === 'object' && item.author.name) {
        authorName = item.author.name;
      }
    }
    
    // Handle category field - ensure it's always a string
    let categoryName = 'General';
    if (item.category) {
      if (typeof item.category === 'string') {
        categoryName = item.category;
      } else if (typeof item.category === 'object' && item.category.name) {
        categoryName = item.category.name;
      }
    } else if (item.category_id) {
      categoryName = String(item.category_id);
    }

    return {
      id: item.id,
      title: item.name || item.title || 'Untitled Article',
      description: item.description || item.content || '',
      category: categoryName,
      published_at: item.created_at || item.published_at || item.date || undefined,
      author: { name: authorName },
      shared_by: item.shared_by || authorName,
      image: item.image || item.thumbnail || undefined,
      slug: item.slug || `article-${item.id}`,
      tags: Array.isArray(item.tags) ? item.tags : [],
      is_published: item.is_published !== false,
      viewCount: item.view_count || item.viewCount || 0
    };
  });
  
  const displayArticles = limit ? mappedArticles.slice(0, limit) : mappedArticles;

  return (
    <TraditionalContentSection 
      articles={displayArticles}
      showAll={!limit}
      title="جامعة العلوم الإسلامية"
      subtitle="دار الافتاء"
    />
  );
}
