// import IftahQuestionForm from "@/app/components/iftah/IftahQuestionForm";

// App Configuration
export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'Anwarul Uloom',
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Islamic Learning Platform',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  version: '1.0.0',
} as const;

// API Configuration
const defaultApiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://lawngreen-dragonfly-304220.hostingersite.com/api';

const inferStorageBase = () => {
  if (process.env.NEXT_PUBLIC_API_STORAGE_URL) {
    return process.env.NEXT_PUBLIC_API_STORAGE_URL;
  }

  // Try the correct storage path structure
  const baseUrl = defaultApiBase.replace('/api', '');
  return `${baseUrl}/madrasa/public/storage`;
};

export const apiConfig = {
  baseUrl: defaultApiBase, // Always use domain-based API
  storageBaseUrl: inferStorageBase(),
  cache: {
    duration: parseInt(process.env.NEXT_PUBLIC_CACHE_DURATION || '300'), // 5 minutes for better performance
    revalidate: parseInt(process.env.NEXT_PUBLIC_REVALIDATE_INTERVAL || '300'), // 5 minutes
  },
} as const;

// Generate endpoints from base URL
export const endpoints = {
  blogs: `${apiConfig.baseUrl}/blogs`, // Use external API temporarily
  courses: `${apiConfig.baseUrl}/courses`,
  // course: `${apiConfig.baseUrl}/course`,
  authors: `${apiConfig.baseUrl}/authors`,
  books: `${apiConfig.baseUrl}/books`,
  book: `${apiConfig.baseUrl}/book`,
  events: `${apiConfig.baseUrl}/events`,  // لیست
  event: `${apiConfig.baseUrl}/event`, 
  iftah: `${apiConfig.baseUrl}/iftah`,
  IftahQuestionForm: `${apiConfig.baseUrl}/iftah-question`,
  csrfCookie: `${apiConfig.baseUrl}/sanctum/csrf-cookie`,
  articles: `${apiConfig.baseUrl}/articles`,
  graduated: `${apiConfig.baseUrl}/graduations`,
  awlyaa: `${apiConfig.baseUrl}/awlyaa`,
  gallery: `${apiConfig.baseUrl}/gallery`,
  donation: `${apiConfig.baseUrl}/donate-info-for-web`,
  tasawwuf: `${apiConfig.baseUrl}/tasawwuf`,
  contact: `${apiConfig.baseUrl}/contact`,


  awlyaaCharts: `${apiConfig.baseUrl}/awlyaa-charts-hierarchy`,
} as const;


// Feature Flags
export const features = {
  analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  notifications: process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS === 'true',
  search: process.env.NEXT_PUBLIC_ENABLE_SEARCH === 'true',
} as const;

// Navigation Configuration
export const navigation = {
  main: [
    { name: 'home', href: '/', icon: 'home' },
    { name: 'courses', href: '/courses', icon: 'course' },
    { name: 'iftah', href: '/iftah', icon: 'fatwa' },
  
    { name: 'article', href: '/articles', icon: 'article' },
    { name: 'awlayaa', href: '/awlayaa', icon: 'awlayaa' },
    { name: 'awlyaacharts', href: '/awlyaa-charts', icon: 'chart' },
    { name: 'books', href: '/book', icon: 'book' },
    { name: 'donation', href: '/donation', icon: 'donation' },
    { name: 'blogs', href: '/blogs', icon: 'blog' },
    { name: 'author', href: '/authors', icon: 'author' },

    { name: 'event', href: '/event', icon: 'event' },
    { name: 'tasawwuf', href: '/tasawwuf', icon: 'tasawwuf' },
    { name: 'graduation', href: '/graduated-students', icon: 'graduation' },
  
    { name: 'contact', href: '/contact', icon: 'contact' },  
    // { name: 'Gallery', href: '/gallery', icon: '' },
  ],
} as const;
