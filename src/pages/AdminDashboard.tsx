
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { 
  Tool, 
  PlusCircle, 
  Edit, 
  Eye, 
  EyeOff, 
  Star, 
  Users, 
  MessageSquare, 
  Tag, 
  Bookmark, 
  BarChart
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { currentUser, tools, comments } = useApp();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  if (!currentUser?.isAdmin) {
    navigate('/');
    toast({
      title: "Access Denied",
      description: "You don't have permission to access the admin dashboard",
      variant: "destructive",
    });
    return null;
  }
  
  // Dashboard stats
  const totalTools = tools.length;
  const featuredTools = tools.filter(tool => tool.featured).length;
  const hiddenTools = tools.filter(tool => tool.hidden).length;
  const totalComments = comments.length;
  const hiddenComments = comments.filter(comment => comment.hidden).length;
  
  // Most viewed tools
  const mostViewedTools = [...tools]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 5);
  
  // Top rated tools
  const topRatedTools = [...tools]
    .filter(tool => tool.ratingCount > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50">
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
          
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <DashboardCard 
                  title="Total Tools" 
                  value={totalTools.toString()} 
                  icon={<Tool className="h-8 w-8 text-ai-primary" />} 
                />
                
                <DashboardCard 
                  title="Total Comments" 
                  value={totalComments.toString()} 
                  icon={<MessageSquare className="h-8 w-8 text-ai-secondary" />} 
                />
                
                <DashboardCard 
                  title="Featured Tools" 
                  value={featuredTools.toString()} 
                  icon={<Star className="h-8 w-8 text-yellow-500" />} 
                />
                
                <DashboardCard 
                  title="Hidden Tools" 
                  value={hiddenTools.toString()} 
                  icon={<EyeOff className="h-8 w-8 text-gray-500" />} 
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Most Viewed Tools</CardTitle>
                    <CardDescription>
                      Tools with the highest view counts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {mostViewedTools.map((tool) => (
                        <li key={tool.id} className="flex justify-between items-center border-b pb-2">
                          <span className="font-medium">{tool.name}</span>
                          <span className="text-gray-500">{tool.viewCount} views</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Top Rated Tools</CardTitle>
                    <CardDescription>
                      Tools with the highest ratings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {topRatedTools.map((tool) => (
                        <li key={tool.id} className="flex justify-between items-center border-b pb-2">
                          <span className="font-medium">{tool.name}</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                            <span>{tool.rating.toFixed(1)}</span>
                            <span className="text-gray-500 ml-1">({tool.ratingCount})</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Tools Tab */}
            <TabsContent value="tools">
              <div className="bg-white p-6 rounded-lg border mb-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Manage Tools</h2>
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Tool
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="p-3 border-b">Name</th>
                        <th className="p-3 border-b">Category</th>
                        <th className="p-3 border-b">Price</th>
                        <th className="p-3 border-b">Rating</th>
                        <th className="p-3 border-b">Featured</th>
                        <th className="p-3 border-b">Status</th>
                        <th className="p-3 border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tools.map((tool) => (
                        <tr key={tool.id} className="border-b hover:bg-gray-50">
                          <td className="p-3">{tool.name}</td>
                          <td className="p-3">{tool.categories.join(', ')}</td>
                          <td className="p-3">{tool.price}</td>
                          <td className="p-3">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                              <span>{tool.rating.toFixed(1)}</span>
                              <span className="text-gray-500 ml-1">({tool.ratingCount})</span>
                            </div>
                          </td>
                          <td className="p-3">
                            {tool.featured ? (
                              <span className="inline-block bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                                Featured
                              </span>
                            ) : (
                              <span className="text-gray-400 text-xs">Not Featured</span>
                            )}
                          </td>
                          <td className="p-3">
                            {tool.hidden ? (
                              <span className="inline-block bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                                Hidden
                              </span>
                            ) : (
                              <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                                Visible
                              </span>
                            )}
                          </td>
                          <td className="p-3">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                {tool.hidden ? (
                                  <Eye className="h-4 w-4" />
                                ) : (
                                  <EyeOff className="h-4 w-4" />
                                )}
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Star className={`h-4 w-4 ${tool.featured ? 'text-yellow-400 fill-current' : ''}`} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Add New Tool</CardTitle>
                  <CardDescription>
                    Fill out the form to add a new AI tool to the platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Tool Name</Label>
                        <Input id="name" placeholder="Enter tool name" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="price">Price</Label>
                        <select 
                          id="price" 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <option value="">Select pricing</option>
                          <option value="Free">Free</option>
                          <option value="Paid">Paid</option>
                          <option value="Freemium">Freemium</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="oneLiner">One Liner</Label>
                      <Input id="oneLiner" placeholder="Brief description (1-2 sentences)" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Full Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Detailed description of the tool" 
                        rows={5}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="categories">Categories</Label>
                        <Input id="categories" placeholder="E.g., Text, Image (comma separated)" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="tags">Tags</Label>
                        <Input id="tags" placeholder="E.g., writing, design (comma separated)" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="externalLink">External Link</Label>
                        <Input id="externalLink" placeholder="https://example.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="videoLink">Video Link (Optional)</Label>
                        <Input id="videoLink" placeholder="https://youtube.com/watch?v=..." />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="logo">Logo Upload</Label>
                      <Input id="logo" type="file" />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="featured" 
                        className="h-4 w-4 rounded border-gray-300 text-ai-primary focus:ring-ai-primary"
                      />
                      <Label htmlFor="featured" className="text-sm font-normal">
                        Mark as featured tool
                      </Label>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Add Tool
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Categories Tab */}
            <TabsContent value="categories">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Category Management</CardTitle>
                    <CardDescription>
                      Manage existing categories
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* List of categories would go here */}
                      <div className="border rounded-md p-3 flex justify-between items-center">
                        <div>
                          <p className="font-medium">Text</p>
                          <p className="text-sm text-gray-500">Tags: writing, content, copywriting, summarization</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <EyeOff className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-md p-3 flex justify-between items-center">
                        <div>
                          <p className="font-medium">Image</p>
                          <p className="text-sm text-gray-500">Tags: image generation, design, avatar, art</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <EyeOff className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Category</CardTitle>
                    <CardDescription>
                      Create a new category and link tags
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="categoryName">Category Name</Label>
                        <Input id="categoryName" placeholder="E.g., Audio" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="linkedTags">Linked Tags</Label>
                        <Input id="linkedTags" placeholder="E.g., podcast, music, sound (comma separated)" />
                      </div>
                      
                      <Button type="submit" className="w-full">
                        Add Category
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage user accounts and permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Input placeholder="Search users by name or email" />
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-left">
                          <th className="p-3 border-b">Name</th>
                          <th className="p-3 border-b">Email</th>
                          <th className="p-3 border-b">Role</th>
                          <th className="p-3 border-b">Status</th>
                          <th className="p-3 border-b">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-gray-50">
                          <td className="p-3">Admin User</td>
                          <td className="p-3">admin@example.com</td>
                          <td className="p-3">
                            <span className="inline-block bg-ai-soft-purple text-ai-primary px-2 py-1 rounded text-xs">
                              Admin
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                              Active
                            </span>
                          </td>
                          <td className="p-3">
                            <Button variant="ghost" size="sm" disabled>
                              Block
                            </Button>
                          </td>
                        </tr>
                        
                        <tr className="border-b hover:bg-gray-50">
                          <td className="p-3">Jane Smith</td>
                          <td className="p-3">jane@example.com</td>
                          <td className="p-3">
                            <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              User
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                              Active
                            </span>
                          </td>
                          <td className="p-3">
                            <Button variant="ghost" size="sm">
                              Block
                            </Button>
                          </td>
                        </tr>
                        
                        <tr className="border-b hover:bg-gray-50">
                          <td className="p-3">Michael Brown</td>
                          <td className="p-3">michael@example.com</td>
                          <td className="p-3">
                            <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                              User
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                              Active
                            </span>
                          </td>
                          <td className="p-3">
                            <Button variant="ghost" size="sm">
                              Block
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

function DashboardCard({ title, value, icon }: DashboardCardProps) {
  return (
    <Card>
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        {icon}
      </CardContent>
    </Card>
  );
}

export default AdminDashboard;
