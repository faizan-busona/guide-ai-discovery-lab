
export interface Tool {
  id: string;
  name: string;
  logo: string;
  oneLiner: string;
  description: string;
  tags: string[];
  categories: string[];
  price: 'Free' | 'Paid' | 'Freemium';
  rating: number;
  ratingCount: number;
  videoLink?: string;
  externalLink: string;
  viewCount: number;
  featured: boolean;
  hidden: boolean;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isAdmin: boolean;
  blocked: boolean;
  bookmarks: string[];
  createdAt: Date;
}

export interface Comment {
  id: string;
  toolId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  text: string;
  hidden: boolean;
  hiddenBy?: string;
  hiddenAt?: Date;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  linkedTags: string[];
  hidden: boolean;
}

export type PriceFilter = 'All' | 'Free' | 'Paid' | 'Freemium';
export type SortOption = 'Rating' | 'Latest' | 'Trending';
