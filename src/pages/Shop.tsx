import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import mockData from '../data/mockData.json';
import type { Product } from '../types/index';
 
export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearchQuery = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category') || 'All';
  
  const [selectedCategory, setSelectedCategory] = useState<string>(urlCategory);
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    setSelectedCategory(urlCategory);
    setSearchQuery(urlSearchQuery);
  }, [urlSearchQuery, urlCategory]);

  const filteredProducts = useMemo(() => {
    return (mockData.products as unknown as Product[]).filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query) {
      searchParams.set('search', query);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="pt-24 md:pt-32 pb-24 min-h-screen bg-white" data-jc-id="VS9G4D">
      <div className="container-custom" data-jc-id="VS9FYF">
        {/* Header Section */}
        <div className="mb-12" data-jc-id="VS9FA7">
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold mb-6 text-gray-400" data-jc-id="VS9F7I">
            <Link to="/" className="hover:text-brand-primary transition-colors" data-jc-id="VS9DWE">Home</Link>
            <ChevronRight className="w-3 h-3" data-jc-id="VS9D6I"/>
            <span className="text-brand-secondary" data-jc-id="VS9D28">Shop</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6" data-jc-id="VS9CCF">
            <div data-jc-id="VS9BMK">
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-brand-secondary mb-4" data-jc-id="VS9BKU">
                {searchQuery ? `Results for "${searchQuery}"` : 'The Collection'}
              </h1>
              <p className="text-gray-500 max-w-2xl text-sm md:text-base leading-relaxed" data-jc-id="VS9A3D">
                {searchQuery 
                  ? `Showing ${filteredProducts.length} items matching your search criteria.`
                  : 'Explore our range of premium minimalist essentials. Find the perfect piece to elevate your everyday.'}
              </p>
            </div>
            
            <div className="flex items-center gap-4" data-jc-id="VS8RKX">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400" data-jc-id="VS8QYD">Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-brand-surface border border-gray-100 rounded-full text-xs font-bold text-brand-secondary focus:ring-2 focus:ring-brand-primary/10 appearance-none cursor-pointer pr-10 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27none%27%20viewBox%3D%270%200%2024%2024%27%20stroke%3D%27currentColor%27%3E%3Cpath%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%20stroke-width%3D%272%27%20d%3D%27m19%209-7%207-7-7%27%2F%3E%3C%2Fsvg%3E')] bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat outline-none"
              data-jc-id="VS8Q6U">
                <option value="newest" data-jc-id="VS85BA">Latest Arrivals</option>
                <option value="price-low" data-jc-id="VS84NX">Price: Low to High</option>
                <option value="price-high" data-jc-id="VS84HW">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filters & Search - New Centered Stacked Layout */}
        <div className="flex flex-col gap-8 mb-16 py-12 border-y border-gray-100 items-center" data-jc-id="VS830G">
          {/* Search Bar - Center Top */}
          <div className="relative w-full max-w-2xl" data-jc-id="VS81O8">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" data-jc-id="VS81J6"/>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-16 pr-6 py-4 bg-brand-surface border border-gray-100 rounded-full text-base font-medium focus:bg-white focus:border-brand-primary/30 focus:ring-4 focus:ring-brand-primary/5 transition-all outline-none"
            data-jc-id="VS80SJ"/>
          </div>

          {/* Categories - Horizontal below Search */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3" data-jc-id="VS7GZD">
            {['All', ...mockData.categories.map(c => c.name)].map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer ${
                  selectedCategory === cat 
                    ? 'bg-brand-primary text-white shadow-luxe' 
                    : 'bg-brand-surface text-gray-400 hover:bg-white hover:text-brand-primary hover:shadow-sm border border-transparent hover:border-gray-100'
                }`}
              data-jc-id="VS7G4B">
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10" data-jc-id="VS6VC5">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} data-jc-id="VS6TYA"/>
            ))}
          </div>
        ) : (
          <div className="py-24 md:py-32 text-center bg-brand-surface rounded-brand border border-dashed border-gray-200" data-jc-id="VS6T7D">
            <div className="max-w-xs mx-auto" data-jc-id="VS6SE8">
              <Search className="w-12 h-12 text-gray-200 mx-auto mb-6" data-jc-id="VS6RRV"/>
              <h3 className="text-xl font-heading font-bold text-brand-secondary mb-2" data-jc-id="VS6RLQ">No products found</h3>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed" data-jc-id="VS6QU6">
                We couldn't find any products matching your search. Try different keywords or browse our categories.
              </p>
              <button 
                onClick={() => { handleCategoryChange('All'); handleSearchChange(''); }}
                className="btn-primary w-full py-3"
              data-jc-id="VS6PBY">
                Reset all filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
