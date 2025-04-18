
import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function NaturalSearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const fixedPrompt = "Find me an AI tool that";
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?nq=${encodeURIComponent(query.trim())}`);
    }
  };
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="search-bar-container">
        <span className="search-bar-prompt">{fixedPrompt}</span>
        <div className="relative">
          <Input
            type="text"
            value={query}
            onChange={handleChange}
            className="search-bar-input h-12 text-lg pr-24"
            placeholder="helps me write blog posts for free..."
          />
          <Button 
            type="submit" 
            className="absolute right-1 top-1 h-10"
          >
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </form>
  );
}
