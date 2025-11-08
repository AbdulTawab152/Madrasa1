import { NextRequest, NextResponse } from 'next/server';
import { BlogsApi, ArticlesApi, CoursesApi, AuthorsApi, BooksApi, EventsApi, IftahApi } from '@/lib/api';

const API_BASE_URL = 'https://lawngreen-dragonfly-304220.hostingersite.com/api';

interface SearchResult {
  type: 'blog' | 'course' | 'author' | 'book' | 'event' | 'fatwa' | 'article';
  id: number | string;
  title: string;
  description?: string;
  slug?: string;
  url: string;
  image?: string;
  date?: string;
  author?: string;
  score?: number;
}

interface SearchResponse {
  success: boolean;
  query: string;
  results: SearchResult[];
  total: number;
  types: {
    article: number;
    blog: number;
    course: number;
    author: number;
    book: number;
    event: number;
    fatwa: number;
  };
  error?: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    if (!query.trim()) {
      return NextResponse.json<SearchResponse>({
        success: true,
        query: '',
        results: [],
        total: 0,
        types: {
          article: 0,
          blog: 0,
          course: 0,
          author: 0,
          book: 0,
          event: 0,
          fatwa: 0,
        },
      });
    }

    const results: SearchResult[] = [];
    const searchTerm = query.toLowerCase().trim();

    // Search in parallel
    const [blogsRes, articlesRes, coursesRes, authorsRes, booksRes, eventsRes, iftahRes] = await Promise.allSettled([
      BlogsApi.getAll({ search: searchTerm, limit: 10 }),
      ArticlesApi.getAll({ search: searchTerm, limit: 10 }),
      CoursesApi.getAll({ search: searchTerm, limit: 10 }),
      AuthorsApi.getAll({ search: searchTerm, limit: 10 }),
      BooksApi.getAll({ search: searchTerm, limit: 10 }),
      EventsApi.getAll({ search: searchTerm, limit: 10 }),
      IftahApi.getAll({ limit: 100 }),
    ]);

    // Process blogs
    if (blogsRes.status === 'fulfilled' && blogsRes.value.success) {
      const blogs = Array.isArray(blogsRes.value.data) ? blogsRes.value.data : [];
      blogs.forEach((blog: any) => {
        if (blog.title?.toLowerCase().includes(searchTerm) || blog.description?.toLowerCase().includes(searchTerm)) {
          results.push({
            type: 'blog',
            id: blog.id,
            title: blog.title || '',
            description: blog.description || blog.excerpt,
            slug: blog.slug,
            url: `/blogs/${blog.slug}`,
            image: blog.featuredImage || blog.image,
            date: blog.publishedAt || blog.created_at,
            author: blog.author?.name || blog.author,
          });
        }
      });
    }

    // Process articles
    if (articlesRes.status === 'fulfilled' && articlesRes.value.success) {
      const articles = Array.isArray(articlesRes.value.data) ? articlesRes.value.data : [];
      articles.forEach((article: any) => {
        if (article.title?.toLowerCase().includes(searchTerm) || article.description?.toLowerCase().includes(searchTerm)) {
          results.push({
            type: 'article',
            id: article.id,
            title: article.title || '',
            description: article.description || article.excerpt,
            slug: article.slug,
            url: `/articles/${article.slug}`,
            image: article.featuredImage || article.image,
            date: article.publishedAt || article.created_at,
            author: article.author?.name || article.author,
          });
        }
      });
    }

    // Process courses
    if (coursesRes.status === 'fulfilled' && coursesRes.value.success) {
      const courses = Array.isArray(coursesRes.value.data) ? coursesRes.value.data : [];
      courses.forEach((course: any) => {
        if (course.title?.toLowerCase().includes(searchTerm) || course.description?.toLowerCase().includes(searchTerm)) {
          results.push({
            type: 'course',
            id: course.id,
            title: course.title || course.name || '',
            description: course.description,
            slug: course.slug,
            url: `/courses/${course.slug}`,
            image: course.image || course.featuredImage,
            date: course.created_at,
          });
        }
      });
    }

    // Process authors
    if (authorsRes.status === 'fulfilled' && authorsRes.value.success) {
      const authors = Array.isArray(authorsRes.value.data) ? authorsRes.value.data : [];
      authors.forEach((author: any) => {
        const fullName = `${author.first_name || ''} ${author.last_name || ''}`.trim();
        if (fullName.toLowerCase().includes(searchTerm) || author.bio?.toLowerCase().includes(searchTerm)) {
          results.push({
            type: 'author',
            id: author.id,
            title: fullName,
            description: author.bio,
            url: `/authors/${author.id}`,
            image: author.image,
          });
        }
      });
    }

    // Process books
    if (booksRes.status === 'fulfilled' && booksRes.value.success) {
      const books = Array.isArray(booksRes.value.data) ? booksRes.value.data : [];
      books.forEach((book: any) => {
        if (book.title?.toLowerCase().includes(searchTerm) || book.description?.toLowerCase().includes(searchTerm)) {
          results.push({
            type: 'book',
            id: book.id,
            title: book.title || '',
            description: book.description,
            url: `/book/${book.id}`,
            image: book.image,
            date: book.written_year,
            author: book.author ? `${book.author.first_name || ''} ${book.author.last_name || ''}`.trim() : undefined,
          });
        }
      });
    }

    // Process events
    if (eventsRes.status === 'fulfilled' && eventsRes.value.success) {
      const events = Array.isArray(eventsRes.value.data) ? eventsRes.value.data : [];
      events.forEach((event: any) => {
        if (event.title?.toLowerCase().includes(searchTerm) || event.description?.toLowerCase().includes(searchTerm)) {
          results.push({
            type: 'event',
            id: event.id,
            title: event.title || event.name || '',
            description: event.description,
            slug: event.slug,
            url: `/event/${event.slug}`,
            image: event.image || event.featuredImage,
            date: event.date || event.created_at,
          });
        }
      });
    }

    // Process fatwas (iftah)
    if (iftahRes.status === 'fulfilled' && iftahRes.value.success) {
      const fatwas = Array.isArray(iftahRes.value.data) ? iftahRes.value.data : [];
      fatwas.forEach((fatwa: any) => {
        if (fatwa.question?.toLowerCase().includes(searchTerm) || fatwa.answer?.toLowerCase().includes(searchTerm)) {
          results.push({
            type: 'fatwa',
            id: fatwa.id,
            title: fatwa.question || '',
            description: fatwa.answer,
            slug: fatwa.slug,
            url: `/iftah/${fatwa.slug}`,
            date: fatwa.created_at,
          });
        }
      });
    }

    // Count by type
    const types = {
      article: results.filter(r => r.type === 'article').length,
      blog: results.filter(r => r.type === 'blog').length,
      course: results.filter(r => r.type === 'course').length,
      author: results.filter(r => r.type === 'author').length,
      book: results.filter(r => r.type === 'book').length,
      event: results.filter(r => r.type === 'event').length,
      fatwa: results.filter(r => r.type === 'fatwa').length,
    };

    return NextResponse.json<SearchResponse>({
      success: true,
      query,
      results,
      total: results.length,
      types,
    }, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json<SearchResponse>(
      {
        success: false,
        query: '',
        results: [],
        total: 0,
        types: {
          article: 0,
          blog: 0,
          course: 0,
          author: 0,
          book: 0,
          event: 0,
          fatwa: 0,
        },
        error: error instanceof Error ? error.message : 'Failed to perform search',
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

