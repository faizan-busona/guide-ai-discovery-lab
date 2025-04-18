
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Tool, User, Comment, Category, PriceFilter, SortOption } from '@/types/types';
import { mockTools, mockUsers, mockComments, mockCategories, mockCurrentUser } from '@/lib/mockData';
import { toast } from '@/components/ui/sonner';

interface AppContextType {
  // User & Auth
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<void>;
  
  // Tools
  tools: Tool[];
  categories: Category[];
  getToolById: (id: string) => Tool | undefined;
  getToolsByCategory: (category: string) => Tool[];
  getFeaturedTools: () => Tool[];
  getRelatedTools: (toolId: string) => Tool[];
  
  // Comments
  comments: Comment[];
  getToolComments: (toolId: string) => Comment[];
  addComment: (toolId: string, rating: number, text: string) => void;
  hideComment: (commentId: string) => void;
  
  // Bookmarks
  toggleBookmark: (toolId: string) => void;
  isBookmarked: (toolId: string) => boolean;
  
  // Search & Filters
  searchTools: (query: string) => Tool[];
  semanticSearch: (query: string) => Promise<Tool[]>;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  priceFilter: PriceFilter;
  setPriceFilter: (price: PriceFilter) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  filteredTools: Tool[];
  
  // Admin
  addTool: (tool: Omit<Tool, 'id' | 'createdAt' | 'viewCount'>) => void;
  updateTool: (toolId: string, updates: Partial<Tool>) => void;
  toggleToolHidden: (toolId: string) => void;
  toggleToolFeatured: (toolId: string) => void;
  addCategory: (name: string, linkedTags: string[]) => void;
  updateCategory: (categoryId: string, updates: Partial<Category>) => void;
  toggleCategoryHidden: (categoryId: string) => void;
  blockUser: (userId: string) => void;
  unblockUser: (userId: string) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(mockCurrentUser);
  const [tools, setTools] = useState<Tool[]>(mockTools);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('All');
  const [sortOption, setSortOption] = useState<SortOption>('Rating');

  // Filtered tools based on current filters
  const filteredTools = tools
    .filter(tool => !tool.hidden)
    .filter(tool => categoryFilter ? tool.categories.includes(categoryFilter) : true)
    .filter(tool => priceFilter !== 'All' ? tool.price === priceFilter : true)
    .sort((a, b) => {
      if (sortOption === 'Rating') return b.rating - a.rating;
      if (sortOption === 'Latest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortOption === 'Trending') return b.viewCount - a.viewCount;
      return 0;
    });

  // User & Auth methods
  const login = async (email: string, password: string) => {
    // Mock login - would be an API call in a real app
    const user = mockUsers.find(u => u.email === email);
    if (user && !user.blocked) {
      setCurrentUser(user);
      toast.success('Logged in successfully');
    } else if (user?.blocked) {
      toast.error('Your account has been blocked');
      throw new Error('Account blocked');
    } else {
      toast.error('Invalid email or password');
      throw new Error('Invalid credentials');
    }
  };

  const loginWithGoogle = async () => {
    // Mock Google login - would be OAuth flow in real app
    setCurrentUser(mockUsers[1]); // Use Jane as sample user
    toast.success('Logged in with Google');
  };

  const logout = () => {
    setCurrentUser(null);
    toast.success('Logged out successfully');
  };

  const signup = async (name: string, email: string, password: string) => {
    // Mock signup - would be an API call in a real app
    if (mockUsers.some(u => u.email === email)) {
      toast.error('Email already in use');
      throw new Error('Email already in use');
    }
    
    const newUser: User = {
      id: String(mockUsers.length + 1),
      name,
      email,
      isAdmin: false,
      blocked: false,
      bookmarks: [],
      createdAt: new Date()
    };
    
    // In a real app, this would save to a database
    // mockUsers.push(newUser);
    setCurrentUser(newUser);
    toast.success('Account created successfully');
  };

  // Tool methods
  const getToolById = (id: string) => {
    return tools.find(tool => tool.id === id);
  };

  const getToolsByCategory = (category: string) => {
    return tools.filter(tool => 
      !tool.hidden && tool.categories.includes(category)
    );
  };

  const getFeaturedTools = () => {
    return tools.filter(tool => !tool.hidden && tool.featured);
  };

  const getRelatedTools = (toolId: string) => {
    const tool = getToolById(toolId);
    if (!tool) return [];
    
    return tools
      .filter(t => 
        t.id !== toolId && 
        !t.hidden && 
        t.categories.some(cat => tool.categories.includes(cat))
      )
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  };

  // Comment methods
  const getToolComments = (toolId: string) => {
    return comments
      .filter(comment => comment.toolId === toolId && !comment.hidden)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  };

  const addComment = (toolId: string, rating: number, text: string) => {
    if (!currentUser) {
      toast.error('You must be logged in to leave a comment');
      return;
    }
    
    const newComment: Comment = {
      id: String(comments.length + 1),
      toolId,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      rating,
      text,
      hidden: false,
      createdAt: new Date()
    };
    
    setComments([...comments, newComment]);
    
    // Update tool rating
    const toolComments = [...comments, newComment].filter(c => c.toolId === toolId && !c.hidden);
    const newRating = toolComments.reduce((sum, c) => sum + c.rating, 0) / toolComments.length;
    
    setTools(tools.map(tool => {
      if (tool.id === toolId) {
        return {
          ...tool,
          rating: parseFloat(newRating.toFixed(1)),
          ratingCount: toolComments.length
        };
      }
      return tool;
    }));
    
    toast.success('Comment added successfully');
  };

  const hideComment = (commentId: string) => {
    if (!currentUser?.isAdmin) {
      toast.error('Only admins can hide comments');
      return;
    }
    
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          hidden: true,
          hiddenBy: currentUser.id,
          hiddenAt: new Date()
        };
      }
      return comment;
    }));
    
    toast.success('Comment hidden successfully');
  };

  // Bookmark methods
  const toggleBookmark = (toolId: string) => {
    if (!currentUser) {
      toast.error('You must be logged in to bookmark tools');
      return;
    }
    
    const isAlreadyBookmarked = currentUser.bookmarks.includes(toolId);
    
    setCurrentUser({
      ...currentUser,
      bookmarks: isAlreadyBookmarked
        ? currentUser.bookmarks.filter(id => id !== toolId)
        : [...currentUser.bookmarks, toolId]
    });
    
    toast.success(isAlreadyBookmarked 
      ? 'Tool removed from bookmarks' 
      : 'Tool added to bookmarks'
    );
  };

  const isBookmarked = (toolId: string) => {
    return currentUser ? currentUser.bookmarks.includes(toolId) : false;
  };

  // Search methods
  const searchTools = (query: string) => {
    if (!query) return [];
    
    const searchLower = query.toLowerCase();
    return tools.filter(tool => 
      !tool.hidden && (
        tool.name.toLowerCase().includes(searchLower) ||
        tool.oneLiner.toLowerCase().includes(searchLower) ||
        tool.description.toLowerCase().includes(searchLower) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    );
  };

  const semanticSearch = async (query: string): Promise<Tool[]> => {
    // In a real app, this would be an API call to an LLM
    // For now, we'll just simulate it with a basic search
    if (!query) return [];
    
    // Parse basic intents from the query
    const queryLower = query.toLowerCase();
    
    // Price intents
    let priceIntent = '';
    if (queryLower.includes('free')) {
      priceIntent = 'Free';
    } else if (queryLower.includes('paid')) {
      priceIntent = 'Paid';
    }
    
    // Category/tag intents - look for keyword matches
    const possibleCategories = categories.filter(cat => 
      queryLower.includes(cat.name.toLowerCase()) || 
      cat.linkedTags.some(tag => queryLower.includes(tag))
    );
    
    // Filter tools based on detected intents
    return tools.filter(tool => {
      if (tool.hidden) return false;
      
      // Check price match
      const priceMatch = !priceIntent || tool.price === priceIntent;
      
      // Check category match
      const categoryMatch = possibleCategories.length === 0 || 
        possibleCategories.some(cat => 
          tool.categories.includes(cat.name) || 
          tool.tags.some(tag => cat.linkedTags.includes(tag))
        );
      
      return priceMatch && categoryMatch;
    }).sort((a, b) => b.rating - a.rating);
  };

  // Admin methods
  const addTool = (tool: Omit<Tool, 'id' | 'createdAt' | 'viewCount'>) => {
    if (!currentUser?.isAdmin) {
      toast.error('Only admins can add tools');
      return;
    }
    
    const newTool: Tool = {
      ...tool,
      id: String(tools.length + 1),
      viewCount: 0,
      createdAt: new Date()
    };
    
    setTools([...tools, newTool]);
    toast.success('Tool added successfully');
  };

  const updateTool = (toolId: string, updates: Partial<Tool>) => {
    if (!currentUser?.isAdmin) {
      toast.error('Only admins can update tools');
      return;
    }
    
    setTools(tools.map(tool => {
      if (tool.id === toolId) {
        return { ...tool, ...updates };
      }
      return tool;
    }));
    
    toast.success('Tool updated successfully');
  };

  const toggleToolHidden = (toolId: string) => {
    if (!currentUser?.isAdmin) {
      toast.error('Only admins can hide/show tools');
      return;
    }
    
    setTools(tools.map(tool => {
      if (tool.id === toolId) {
        return { ...tool, hidden: !tool.hidden };
      }
      return tool;
    }));
    
    toast.success('Tool visibility updated');
  };

  const toggleToolFeatured = (toolId: string) => {
    if (!currentUser?.isAdmin) {
      toast.error('Only admins can feature/unfeature tools');
      return;
    }
    
    setTools(tools.map(tool => {
      if (tool.id === toolId) {
        return { ...tool, featured: !tool.featured };
      }
      return tool;
    }));
    
    toast.success('Tool featured status updated');
  };

  const addCategory = (name: string, linkedTags: string[]) => {
    if (!currentUser?.isAdmin) {
      toast.error('Only admins can add categories');
      return;
    }
    
    const newCategory: Category = {
      id: String(categories.length + 1),
      name,
      linkedTags,
      hidden: false
    };
    
    setCategories([...categories, newCategory]);
    toast.success('Category added successfully');
  };

  const updateCategory = (categoryId: string, updates: Partial<Category>) => {
    if (!currentUser?.isAdmin) {
      toast.error('Only admins can update categories');
      return;
    }
    
    setCategories(categories.map(category => {
      if (category.id === categoryId) {
        return { ...category, ...updates };
      }
      return category;
    }));
    
    toast.success('Category updated successfully');
  };

  const toggleCategoryHidden = (categoryId: string) => {
    if (!currentUser?.isAdmin) {
      toast.error('Only admins can hide/show categories');
      return;
    }
    
    setCategories(categories.map(category => {
      if (category.id === categoryId) {
        return { ...category, hidden: !category.hidden };
      }
      return category;
    }));
    
    toast.success('Category visibility updated');
  };

  const blockUser = (userId: string) => {
    if (!currentUser?.isAdmin) {
      toast.error('Only admins can block users');
      return;
    }
    
    // In a real app, this would update a user database
    // For now, we'll just show a success toast
    toast.success('User blocked successfully');
    
    // If blocking the current user, log them out
    if (currentUser && currentUser.id === userId) {
      logout();
    }
  };

  const unblockUser = (userId: string) => {
    if (!currentUser?.isAdmin) {
      toast.error('Only admins can unblock users');
      return;
    }
    
    // In a real app, this would update a user database
    // For now, we'll just show a success toast
    toast.success('User unblocked successfully');
  };

  const contextValue: AppContextType = {
    currentUser,
    login,
    loginWithGoogle,
    logout,
    signup,
    tools,
    categories,
    getToolById,
    getToolsByCategory,
    getFeaturedTools,
    getRelatedTools,
    comments,
    getToolComments,
    addComment,
    hideComment,
    toggleBookmark,
    isBookmarked,
    searchTools,
    semanticSearch,
    categoryFilter,
    setCategoryFilter,
    priceFilter,
    setPriceFilter,
    sortOption,
    setSortOption,
    filteredTools,
    addTool,
    updateTool,
    toggleToolHidden,
    toggleToolFeatured,
    addCategory,
    updateCategory,
    toggleCategoryHidden,
    blockUser,
    unblockUser
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
