import React, { useMemo } from 'react';
import { Search, X, Clock, TrendingUp, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { MOCK_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { MainCategory } from '../types';

const POPULAR_SEARCHES = [
  'Silk Camp Shirt',
  'Boracay Shorts',
  'Linen Maxi Dress',
  'Emfielder Polo',
  'Velour Beach Towel',
  'Panama Straw Hat',
  'Swimwear'
];

export const SearchScreen: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
    navigateToCategory
  } = useShop();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addRecentSearch(searchQuery);
    }
  };

  const handleSelectTerm = (term: string) => {
    setSearchQuery(term);
    addRecentSearch(term);
  };

  const results = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    return MOCK_PRODUCTS.filter(p => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.colors.some(c => c.name.toLowerCase().includes(q))
      );
    });
  }, [searchQuery]);

  return (
    <div className="min-h-full pb-24 bg-[#FAF8F5]">
      {/* Search Header Bar */}
      <div className="sticky top-0 z-20 bg-[#FDFBF7] border-b border-[#E8E2D5] p-2.5 shadow-xs">
        <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto relative flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-[#788896]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search silk shirts, polos, linen dresses..."
            className="w-full pl-9 pr-9 py-2 bg-white border border-[#DDD6C8] rounded-xl text-xs text-[#1B2E3D] placeholder-[#94A3B8] focus:outline-none focus:border-[#1E6B7B]"
            autoFocus={false}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 p-1 rounded-full text-[#788896] hover:text-[#1B2E3D]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </form>
      </div>

      <div className="max-w-md mx-auto px-3 py-3">
        {/* If no search query typed yet: show Trending, Recent Searches, and Popular Categories */}
        {!searchQuery.trim() ? (
          <div className="space-y-4 max-w-md mx-auto text-left">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1B2E3D] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#1E6B7B]" />
                    <span>Recent Searches</span>
                  </span>
                  <button
                    onClick={clearRecentSearches}
                    className="text-[11px] text-[#6B7B88] hover:text-[#1B2E3D] hover:underline"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectTerm(term)}
                      className="px-3 py-1.5 bg-white border border-[#DDD6C8] hover:border-[#1B2E3D] rounded-full text-xs text-[#1B2E3D] transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B2E3D] flex items-center gap-1.5 mb-2.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#1E6B7B]" />
                <span>Trending Island Searches</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map(term => (
                  <button
                    key={term}
                    onClick={() => handleSelectTerm(term)}
                    className="px-3 py-1.5 bg-white border border-[#DDD6C8] hover:border-[#1B2E3D] rounded-full text-xs font-medium text-[#1B2E3D] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Departments */}
            <div className="pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B2E3D] block mb-2.5">
                Explore Categories
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { label: "Men's Silk & Linen", cat: 'men' as MainCategory },
                  { label: "Women's Resort Wear", cat: 'women' as MainCategory },
                  { label: "Women's Swimwear", cat: 'swim' as MainCategory },
                  { label: 'Big & Tall Island Fits', cat: 'big_tall' as MainCategory },
                  { label: 'Beach Towels & Décor', cat: 'beach_home' as MainCategory },
                  { label: 'Hats & Accessories', cat: 'accessories' as MainCategory }
                ].map(item => (
                  <button
                    key={item.cat}
                    onClick={() => navigateToCategory(item.cat)}
                    className="p-3 bg-white border border-[#E8E2D5] rounded-xl text-left hover:border-[#1E6B7B] text-[#1B2E3D] font-medium transition-all"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Live Search Results */
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-[#6B7B88]">
                Found <span className="font-bold text-[#1B2E3D] tabular-nums">{results.length}</span> results for "{searchQuery}"
              </p>
              {results.length > 0 && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-[#1E6B7B] font-semibold hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                {results.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="py-16 text-center bg-white rounded-3xl border border-[#E8E2D5] p-6 max-w-md mx-auto">
                <Search className="w-10 h-10 text-[#6B7B88] mx-auto mb-3 opacity-40" />
                <h3 className="font-serif text-lg font-bold text-[#1B2E3D] mb-1">
                  No island results for "{searchQuery}"
                </h3>
                <p className="text-xs text-[#6B7B88] leading-relaxed mb-4">
                  Check your spelling or try broader terms like "silk", "shirt", "polo", "linen", or "towel".
                </p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {POPULAR_SEARCHES.slice(0, 4).map(term => (
                    <button
                      key={term}
                      onClick={() => handleSelectTerm(term)}
                      className="px-2.5 py-1 text-xs bg-[#F2EDE4] rounded-md text-[#1B2E3D] hover:bg-[#E8E0D2]"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
