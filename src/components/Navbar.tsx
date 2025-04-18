
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Menu, 
  X, 
  LogIn, 
  LogOut, 
  User, 
  BookmarkIcon, 
  ShieldCheck 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useApp } from '@/context/AppContext';

export function Navbar() {
  const { currentUser, logout } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-ai-primary flex items-center justify-center">
              <span className="text-white font-semibold">A</span>
            </div>
            <span className="font-bold text-xl hidden md:inline-block">AIGuideHub</span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="text-sm font-medium hover:text-ai-primary transition-colors">
              Home
            </Link>
            <Link to="/categories" className="text-sm font-medium hover:text-ai-primary transition-colors">
              Categories
            </Link>
            <Link to="/trending" className="text-sm font-medium hover:text-ai-primary transition-colors">
              Trending
            </Link>
          </nav>
        </div>
        
        <div className="hidden md:flex md:w-1/3 lg:w-1/2 mx-4">
          <form onSubmit={handleSearch} className="w-full relative">
            <Input
              type="text"
              placeholder="Search for AI tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </form>
        </div>
        
        <div className="flex items-center gap-4">
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/bookmarks" className="flex items-center">
                    <BookmarkIcon className="mr-2 h-4 w-4" />
                    <span>Bookmarks</span>
                  </Link>
                </DropdownMenuItem>
                {currentUser.isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="flex items-center">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={logout} className="flex items-center text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="outline" size="sm">
              <Link to="/login" className="flex items-center">
                <LogIn className="mr-2 h-4 w-4" />
                <span>Login</span>
              </Link>
            </Button>
          )}
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                <Link to="/" className="text-sm font-medium hover:text-ai-primary transition-colors">
                  Home
                </Link>
                <Link to="/categories" className="text-sm font-medium hover:text-ai-primary transition-colors">
                  Categories
                </Link>
                <Link to="/trending" className="text-sm font-medium hover:text-ai-primary transition-colors">
                  Trending
                </Link>
                <form onSubmit={handleSearch} className="relative mt-4">
                  <Input
                    type="text"
                    placeholder="Search for AI tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </form>
                {!currentUser && (
                  <Button asChild variant="outline" className="mt-4">
                    <Link to="/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Login</span>
                    </Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
