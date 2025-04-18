
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useApp } from '@/context/AppContext';

export function FilterBar() {
  const { 
    categories, 
    categoryFilter, 
    setCategoryFilter, 
    priceFilter, 
    setPriceFilter, 
    sortOption, 
    setSortOption 
  } = useApp();
  
  const visibleCategories = categories.filter(c => !c.hidden);
  
  return (
    <div className="w-full py-4 flex flex-col md:flex-row gap-4 md:items-center justify-between">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={categoryFilter === '' ? 'secondary' : 'outline'}
          className="category-badge"
          onClick={() => setCategoryFilter('')}
        >
          All Tools
        </Button>
        
        {visibleCategories.map((category) => (
          <Button
            key={category.id}
            variant={categoryFilter === category.name ? 'secondary' : 'outline'}
            className={`category-badge ${
              categoryFilter === category.name ? 'category-badge-active' : ''
            }`}
            onClick={() => setCategoryFilter(category.name)}
          >
            {category.name}
          </Button>
        ))}
      </div>
      
      <div className="flex gap-2 flex-wrap">
        <Select
          value={priceFilter}
          onValueChange={(value) => setPriceFilter(value as any)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Prices</SelectItem>
            <SelectItem value="Free">Free</SelectItem>
            <SelectItem value="Paid">Paid</SelectItem>
            <SelectItem value="Freemium">Freemium</SelectItem>
          </SelectContent>
        </Select>
        
        <Select
          value={sortOption}
          onValueChange={(value) => setSortOption(value as any)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Rating">Highest Rated</SelectItem>
            <SelectItem value="Latest">Newest</SelectItem>
            <SelectItem value="Trending">Trending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
