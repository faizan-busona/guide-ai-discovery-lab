
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';

const Dashboard = () => {
  const { user, profile, signOut } = useAuth();
  const [userTools, setUserTools] = useState([]);

  useEffect(() => {
    document.title = 'Dashboard | AIGuideHub';
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('You have been signed out successfully');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
          <div className="bg-gray-50 p-4 rounded-md">
            <p><span className="font-medium">Name:</span> {profile?.name || 'Not provided'}</p>
            <p><span className="font-medium">Email:</span> {user?.email}</p>
            <p><span className="font-medium">Account Type:</span> {profile?.is_admin ? 'Admin' : 'User'}</p>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href="/bookmarks" 
              className="block p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
            >
              <h3 className="font-medium">Your Bookmarks</h3>
              <p className="text-sm text-gray-500">View and manage your saved tools</p>
            </a>
            
            <a 
              href="/" 
              className="block p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
            >
              <h3 className="font-medium">Discover Tools</h3>
              <p className="text-sm text-gray-500">Find new AI tools for your workflow</p>
            </a>
            
            {profile?.is_admin && (
              <a 
                href="/admin" 
                className="block p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-medium">Admin Dashboard</h3>
                <p className="text-sm text-gray-500">Manage tools and users</p>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
