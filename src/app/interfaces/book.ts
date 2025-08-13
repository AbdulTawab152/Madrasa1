export interface Book {
  id: number;
  unique_id: string;
  book_category_id: number;
  author_id: number;
  title: string;
  edition: string;
  pages: number;
  description: string;
  written_year: string;
  pdf_file: string;
  is_published: boolean;
  downloadable: boolean;
  image: string;
  is_in_library: boolean;
}
