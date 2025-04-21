
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleUser, BookmarkIcon, Wrench, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/lib/supabase-types';

const Dashboard = () => {
  const { user, profile, signOut } = useAuth();
  const [bookmarksCount, setBookmarksCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Dashboard | AIGuideHub';
    
    const fetchUserData = async () => {
      if (!user) return;
      
      try {
        // Fetch bookmarks count
        const { count, error } = await supabase
          .from('bookmarks')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id);
          
        if (!error && count !== null) {
          setBookmarksCount(count);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('You have been signed out successfully');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Button onClick={handleSignOut} variant="outline" className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <CircleUser className="h-9 w-9 text-ai-primary mr-3" />
                  <div>
                    <p className="font-medium">{profile?.name || 'User'}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Bookmarks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <BookmarkIcon className="h-9 w-9 text-ai-primary mr-3" />
                  <div>
                    <p className="font-medium">{bookmarksCount} tools</p>
                    <p className="text-sm text-gray-500">Saved for later</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Account Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Wrench className="h-9 w-9 text-ai-primary mr-3" />
                  <div>
                    <p className="font-medium">{profile?.is_admin ? 'Admin' : 'User'}</p>
                    <p className="text-sm text-gray-500">{profile?.is_admin ? 'Full access' : 'Standard access'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link 
                to="/bookmarks" 
                className="block p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium flex items-center">
                  <BookmarkIcon className="h-4 w-4 mr-2 text-ai-primary" />
                  Your Bookmarks
                </h3>
                <p className="text-sm text-gray-500">View and manage your saved tools</p>
              </Link>
              
              <Link 
                to="/" 
                className="block p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium flex items-center">
                  <Wrench className="h-4 w-4 mr-2 text-ai-primary" />
                  Discover Tools
                </h3>
                <p className="text-sm text-gray-500">Find new AI tools for your workflow</p>
              </Link>
              
              {profile?.is_admin && (
                <Link 
                  to="/admin" 
                  className="block p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <h3 className="font-medium">Admin Dashboard</h3>
                  <p className="text-sm text-gray-500">Manage tools and users</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
