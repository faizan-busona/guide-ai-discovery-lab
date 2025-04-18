
import { Tool, User, Comment, Category } from '@/types/types';

// Mock Categories Data
export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Text',
    linkedTags: ['writing', 'content', 'copywriting', 'summarization'],
    hidden: false
  },
  {
    id: '2',
    name: 'Image',
    linkedTags: ['image generation', 'design', 'avatar', 'art'],
    hidden: false
  },
  {
    id: '3',
    name: 'Voice',
    linkedTags: ['voice', 'text-to-speech', 'transcription', 'audio'],
    hidden: false
  },
  {
    id: '4',
    name: 'Chat',
    linkedTags: ['chatbot', 'conversation', 'assistant'],
    hidden: false
  },
  {
    id: '5',
    name: 'Video',
    linkedTags: ['video', 'animation', 'editing'],
    hidden: false
  }
];

// Mock Tools Data
export const mockTools: Tool[] = [
  {
    id: '1',
    name: 'WriterAI',
    logo: '/placeholder.svg',
    oneLiner: 'Create compelling content with AI-powered assistance',
    description: 'WriterAI helps you create professional-quality blog posts, articles, and marketing copy with AI-powered suggestions. Perfect for content creators, marketers, and businesses looking to scale their content creation.',
    tags: ['writing', 'content', 'copywriting'],
    categories: ['Text'],
    price: 'Freemium',
    rating: 4.7,
    ratingCount: 142,
    externalLink: 'https://example.com',
    viewCount: 1240,
    featured: true,
    hidden: false,
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'ImageCraft',
    logo: '/placeholder.svg',
    oneLiner: 'Generate stunning images from text descriptions',
    description: 'ImageCraft lets you create beautiful, original images simply by describing what you want. Use it for marketing materials, social media posts, website graphics, and more.',
    tags: ['image generation', 'design', 'art'],
    categories: ['Image'],
    price: 'Free',
    rating: 4.2,
    ratingCount: 89,
    externalLink: 'https://example.com',
    viewCount: 980,
    featured: true,
    hidden: false,
    createdAt: new Date('2023-02-20')
  },
  {
    id: '3',
    name: 'VoiceGenius',
    logo: '/placeholder.svg',
    oneLiner: 'Convert text to natural-sounding speech in seconds',
    description: 'VoiceGenius transforms your written content into lifelike speech in multiple languages and accents. Perfect for creating podcasts, voice-overs, accessible content, and more.',
    tags: ['voice', 'text-to-speech', 'audio'],
    categories: ['Voice'],
    price: 'Paid',
    rating: 4.8,
    ratingCount: 156,
    externalLink: 'https://example.com',
    videoLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    viewCount: 1450,
    featured: false,
    hidden: false,
    createdAt: new Date('2023-03-05')
  },
  {
    id: '4',
    name: 'SummarizeBot',
    logo: '/placeholder.svg',
    oneLiner: 'Condense long articles into clear, concise summaries',
    description: 'SummarizeBot uses advanced AI to distill lengthy content into accurate, readable summaries. Save time on research, stay informed on multiple topics, and quickly grasp key information.',
    tags: ['summarization', 'content', 'reading'],
    categories: ['Text'],
    price: 'Free',
    rating: 4.5,
    ratingCount: 68,
    externalLink: 'https://example.com',
    viewCount: 860,
    featured: false,
    hidden: false,
    createdAt: new Date('2023-04-10')
  },
  {
    id: '5',
    name: 'AvatarMaker',
    logo: '/placeholder.svg',
    oneLiner: 'Create personalized AI avatars from your photos',
    description: 'AvatarMaker transforms your photos into stylized avatars for social media, gaming profiles, or business use. Choose from dozens of artistic styles and customization options.',
    tags: ['avatar', 'image generation', 'design'],
    categories: ['Image'],
    price: 'Freemium',
    rating: 4.3,
    ratingCount: 112,
    externalLink: 'https://example.com',
    viewCount: 1120,
    featured: false,
    hidden: false,
    createdAt: new Date('2023-05-15')
  },
  {
    id: '6',
    name: 'TranscribeNow',
    logo: '/placeholder.svg',
    oneLiner: 'Convert audio to text with high accuracy',
    description: 'TranscribeNow automatically converts audio recordings to text with industry-leading accuracy. Perfect for meetings, interviews, lectures, and more.',
    tags: ['transcription', 'voice', 'audio'],
    categories: ['Voice'],
    price: 'Paid',
    rating: 4.6,
    ratingCount: 93,
    externalLink: 'https://example.com',
    viewCount: 940,
    featured: false,
    hidden: false,
    createdAt: new Date('2023-06-20')
  },
  {
    id: '7',
    name: 'ChatCompanion',
    logo: '/placeholder.svg',
    oneLiner: 'Intelligent chatbot for customer support and engagement',
    description: 'ChatCompanion helps businesses automate customer interactions with a smart, trainable AI chatbot. Improve response times, increase satisfaction, and reduce support costs.',
    tags: ['chatbot', 'customer service', 'conversation'],
    categories: ['Chat'],
    price: 'Freemium',
    rating: 4.4,
    ratingCount: 75,
    externalLink: 'https://example.com',
    viewCount: 780,
    featured: true,
    hidden: false,
    createdAt: new Date('2023-07-01')
  },
  {
    id: '8',
    name: 'VideoEdit Pro',
    logo: '/placeholder.svg',
    oneLiner: 'Edit videos with AI-powered tools and effects',
    description: 'VideoEdit Pro simplifies video editing with intelligent features like auto-cutting, enhancement, and creative effects. Make professional-quality videos without extensive editing knowledge.',
    tags: ['video', 'editing', 'animation'],
    categories: ['Video'],
    price: 'Paid',
    rating: 4.7,
    ratingCount: 120,
    externalLink: 'https://example.com',
    videoLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    viewCount: 1350,
    featured: false,
    hidden: false,
    createdAt: new Date('2023-08-15')
  }
];

// Mock Comments Data
export const mockComments: Comment[] = [
  {
    id: '1',
    toolId: '1',
    userId: '2',
    userName: 'Jane Smith',
    userAvatar: '/placeholder.svg',
    rating: 5,
    text: 'This tool has completely transformed my content creation process. The suggestions are spot-on and save me hours of work every week.',
    hidden: false,
    createdAt: new Date('2023-04-05')
  },
  {
    id: '2',
    toolId: '1',
    userId: '3',
    userName: 'Michael Brown',
    rating: 4,
    text: 'Very useful for generating ideas, though sometimes needs editing. Overall great value for the free tier.',
    hidden: false,
    createdAt: new Date('2023-05-12')
  },
  {
    id: '3',
    toolId: '2',
    userId: '4',
    userName: 'Sarah Johnson',
    userAvatar: '/placeholder.svg',
    rating: 5,
    text: 'The image quality is incredible for a free tool. I use it for all my social media graphics now.',
    hidden: false,
    createdAt: new Date('2023-06-18')
  },
  {
    id: '4',
    toolId: '3',
    userId: '5',
    userName: 'David Wilson',
    rating: 4,
    text: 'The voice quality is amazingly natural. I use it for my podcast intros and nobody can tell it's AI-generated.',
    hidden: false,
    createdAt: new Date('2023-07-22')
  },
  {
    id: '5',
    toolId: '3',
    userId: '6',
    userName: 'Emily Davis',
    userAvatar: '/placeholder.svg',
    rating: 5,
    text: 'Worth every penny! The multilingual support is fantastic, and the voice modulation options are extensive.',
    hidden: false,
    createdAt: new Date('2023-08-10')
  }
];

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    avatar: '/placeholder.svg',
    isAdmin: true,
    blocked: false,
    bookmarks: ['1', '3', '5'],
    createdAt: new Date('2022-12-01')
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: '/placeholder.svg',
    isAdmin: false,
    blocked: false,
    bookmarks: ['2', '4'],
    createdAt: new Date('2023-01-10')
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@example.com',
    isAdmin: false,
    blocked: false,
    bookmarks: ['1', '7'],
    createdAt: new Date('2023-02-15')
  }
];

// Mock current user
export const mockCurrentUser: User | null = {
  id: '2',
  name: 'Jane Smith',
  email: 'jane@example.com',
  avatar: '/placeholder.svg',
  isAdmin: false,
  blocked: false,
  bookmarks: ['2', '4'],
  createdAt: new Date('2023-01-10')
};
