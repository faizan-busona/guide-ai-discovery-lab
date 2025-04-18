
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { NaturalSearchBar } from '@/components/NaturalSearchBar';
import { ToolCard } from '@/components/ToolCard';
import { FilterBar } from '@/components/FilterBar';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';

const Index = () => {
  const { getFeaturedTools, filteredTools } = useApp();
  const featuredTools = getFeaturedTools();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-white to-ai-soft-purple">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-ai-primary to-ai-tertiary">
                Find the perfect AI tool for any task
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10">
                Discover AI tools through natural language search. 
                Just describe what you need, and we'll find the right tools for you.
              </p>
              
              <NaturalSearchBar />
              
              <div className="mt-6 text-sm text-gray-500">
                Try: "helps me write blog posts" or "generates images from text"
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Tools Section */}
        {featuredTools.length > 0 && (
          <section className="py-12 bg-white">
            <div className="container px-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Featured Tools</h2>
                <Link to="/tools" className="text-ai-primary flex items-center hover:underline">
                  View all <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} featured={true} />
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* All Tools Section */}
        <section className="py-12 bg-gray-50">
          <div className="container px-4">
            <h2 className="text-2xl font-bold mb-6">Discover AI Tools</h2>
            
            <FilterBar />
            
            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {filteredTools.slice(0, 6).map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No tools found matching your filters.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => window.location.reload()}
                >
                  Reset Filters
                </Button>
              </div>
            )}
            
            {filteredTools.length > 6 && (
              <div className="text-center mt-8">
                <Link to="/tools">
                  <Button variant="outline">
                    View All Tools
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container px-4">
            <h2 className="text-2xl font-bold mb-10 text-center">How AIGuideHub Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-ai-soft-purple rounded-full flex items-center justify-center text-ai-primary font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Describe Your Need</h3>
                <p className="text-gray-600">
                  Use natural language to tell us what you want to accomplish with AI.
                </p>
              </div>
              
              <div className="text-center p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-ai-soft-purple rounded-full flex items-center justify-center text-ai-primary font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Discover Tools</h3>
                <p className="text-gray-600">
                  Get personalized recommendations based on your specific needs.
                </p>
              </div>
              
              <div className="text-center p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-ai-soft-purple rounded-full flex items-center justify-center text-ai-primary font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Read Reviews & Try</h3>
                <p className="text-gray-600">
                  See what real users think and find the perfect tool for your needs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
