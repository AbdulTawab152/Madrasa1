// Base types
export interface BaseEntity {
  id: number;
  unique_id?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Blog types (matching existing API structure)
export interface Blog extends BaseEntity {
  name: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  image?: string;
  date: string;
  is_published: boolean;
  is_top: boolean;
  category_id: number;
  excerpt?: string;
  featuredImage?: string;
  author?: Author;
  tags?: string[];
  publishedAt?: string;
  readTime?: number;
}

// Course types (matching existing API structure)
export interface Course extends BaseEntity {
  name: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  image?: string;
  date: string;
  is_published: boolean;
  is_top: boolean;
  category_id: number;
  featuredImage?: string;
  instructor?: Author;
  level?: 'beginner' | 'intermediate' | 'advanced';
  duration?: number; // in minutes
  lessons?: number;
  price?: number;
  isFree?: boolean;
  enrollmentCount?: number;
  rating?: number;
  enrolled?: string;
  tags?: string[];
}

// Author types (matching existing API structure)
export interface Author extends BaseEntity {
  first_name: string;
  last_name: string;
  father_name: string;
  grandfather_name: string;
  full_address: string;
  dob: string;
  image?: string | null;
  bio: string;
  is_published: boolean;
  contact_no?: string | null;
  is_alive: boolean;
  // Additional fields for compatibility
  name?: string;
  avatar?: string;
  email?: string;
  website?: string;
  socialMedia?: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  };
  specialization?: string[];
  books?: Book[];
  courses?: Course[];
}

// Book types (matching existing API structure)
export interface Book extends BaseEntity {
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
  // Additional fields for compatibility
  slug?: string;
  coverImage?: string;
  author?: Author;
  publisher?: string;
  isbn?: string;
  language?: string;
  category?: string;
  price?: number;
  isFree?: boolean;
  downloadUrl?: string;
  rating?: number;
  tags?: string[];
}

// Event types
export interface Event extends BaseEntity {
  title: string;
  slug: string;
  description: string;
  content?: string;
  featuredImage?: string;
  startDate: string;
  endDate: string;
  location?: string;
  isOnline?: boolean;
  meetingUrl?: string;
  organizer?: Author;
  category?: string;
  maxAttendees?: number;
  currentAttendees?: number;
  isFree?: boolean;
  price?: number;
  registrationRequired?: boolean;
  tags?: string[];
  date?: string;
  is_published?: boolean;
}

// Fatwa types
export interface Fatwa extends BaseEntity {
  title: string;
  slug: string;
  question: string;
  answer: string;
  mufti?: Author;
  category?: string;
  tags?: string[];
  references?: string[];
  isPublished?: boolean;
  viewCount?: number;
  is_published?: boolean;
}

// Article types
export interface Article extends BaseEntity {
  title: string;
  slug: string;
  content: string;
  description?: string;
  excerpt?: string;
  featuredImage?: string;
  author?: Author;
  category?: string;
  tags?: string[];
  publishedAt?: string;
  readTime?: number;
  viewCount?: number;
  is_published?: boolean;
}

// Graduation types
export interface Graduation extends BaseEntity {
  studentName: string;
  slug: string;
  photo?: string;
  graduationDate: string;
  course?: string;
  grade?: string;
  certificate?: string;
  testimonial?: string;
  achievements?: string[];
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  success: boolean;
  message?: string;
}

// Navigation types
export interface NavigationItem {
  name: string;
  href: string;
  icon?: string;
  children?: NavigationItem[];
}

// Form types
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterForm {
  email: string;
  name?: string;
}

// Search types
export interface SearchResult {
  type: 'blog' | 'course' | 'author' | 'book' | 'event' | 'fatwa' | 'article';
  id: string;
  title: string;
  description?: string;
  url: string;
  score: number;
}

export interface SearchFilters {
  type?: string[];
  category?: string[];
  author?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  priceRange?: {
    min: number;
    max: number;
  };
}

// User types
export interface User extends BaseEntity {
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin' | 'moderator';
  isActive: boolean;
  preferences?: {
    language?: string;
    theme?: 'light' | 'dark';
    notifications?: boolean;
  };
}

// Common utility types
export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface LoadingState {
  status: Status;
  error?: string;
}

// Component prop types
export interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
}
