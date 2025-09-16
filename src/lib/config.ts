// App Configuration
export const appConfig = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'Anwarul Uloom',
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Islamic Learning Platform',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  version: '1.0.0',
} as const;

// API Configuration
export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://lawngreen-dragonfly-304220.hostingersite.com/api',
  cache: {
    duration: parseInt(process.env.NEXT_PUBLIC_CACHE_DURATION || '300'), // 5 minutes for better performance
    revalidate: parseInt(process.env.NEXT_PUBLIC_REVALIDATE_INTERVAL || '300'), // 5 minutes
  },
} as const;

// Generate endpoints from base URL
export const endpoints = {
  blogs: `${apiConfig.baseUrl}/blogs`,
  courses: `${apiConfig.baseUrl}/courses`,
  authors: `${apiConfig.baseUrl}/authors`,
  books: `${apiConfig.baseUrl}/books`,
  book: `${apiConfig.baseUrl}/book`,
  events: `${apiConfig.baseUrl}/events`,
  iftah: `${apiConfig.baseUrl}/iftah`,
  articles: `${apiConfig.baseUrl}/articles`,
  graduated: `${apiConfig.baseUrl}/graduations`,
  awlyaa: `${apiConfig.baseUrl}/awlyaa`,
  gallery: `${apiConfig.baseUrl}/gallery`,
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
    { name: 'Home', href: '/', icon: 'home' },
    { name: 'Courses', href: '/courses', icon: 'course' },
    { name: 'Blogs', href: '/blogs', icon: 'blog' },
    { name: 'Graduation', href: '/graduated-students', icon: 'graduation' },
    { name: 'iftah', href: '/iftah', icon: 'fatwa' },
  
   
    { name: 'Author', href: '/authors', icon: 'author' },
    { name: 'Book', href: '/book', icon: 'book' },
    { name: 'Event', href: '/event', icon: 'event' },
    { name: 'Tasawof', href: '/tasawwuf', icon: 'tasawwuf' },
    { name: 'Donation', href: '/donation', icon: 'donation' },
  
    { name: 'Article', href: '/articles', icon: 'article' },
    { name: 'Awalyaa', href: '/awlayaa', icon: 'awlayaa' },
    // { name: 'Gallery', href: '/gallery', icon: '' },
  ],
} as const;
