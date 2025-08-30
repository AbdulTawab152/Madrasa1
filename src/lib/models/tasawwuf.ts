// Category model
export interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

// Tasawwuf post model
export interface Tasawwuf {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string | null;
  date: string;
  is_published: number; // 0 or 1 from backend
  shared_by: string;
  is_top: number; // 0 or 1 from backend
  category_id: number;
  created_at: string;
  updated_at: string;
  category: Category;
}
