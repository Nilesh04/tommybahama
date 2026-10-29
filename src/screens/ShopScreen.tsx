import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, X, RotateCcw } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { MOCK_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { FilterSheet } from '../components/FilterSheet';
import { SortSheet } from '../components/SortSheet';
import { MainCategory, SortOption } from '../types';

const CATEGORIES: { id: MainCategory | 'all'; label: string; subcategories: string[] }[] = [
  { id: 'all', label: 'All', subcategories: [] },
  { id: 'men', label: "Men's", subcategories: ['Shirts', 'Polos', 'Pants & Shorts', 'Swimwear', 'Sweaters'] },
  { id: 'women', label: "Women's", subcategories: ['Dresses', 'Shirts', 'Tops', 'Pants'] },
  { id: 'swim', label: "Women's Swim", subcategories: ['Swimwear', 'Cover-Ups'] },
  { id: 'big_tall', label: 'Big & Tall', subcategories: ['Shirts', 'Polos', 'Pants & Shorts'] },
  { id: 'beach_home', label: 'Beach & Home', subcategories: ['Beach Towels', 'Outdoor Accessories', 'Home Accessories'] },
  { id: 'accessories', label: 'Accessories', subcategories: ['Hats', 'Eyewear', 'Bags & Luggage', 'Jewelry'] }
];

export const ShopScreen: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory
  } = useShop();

  // Filters state
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortOption>('featured');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlySale, setOnlySale] = useState(false);
  const [maxPrice, setMaxPrice] = useState(300);

  const activeCategoryObj = CATEGORIES.find(c => c.id === selectedCategory) || CATEGORIES[0];

  const handleToggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleToggleColor = (colorName: string) => {
    setSelectedColors(prev =>
      prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]
    );
  };

  const handleClearFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setOnlyInStock(false);
    setOnlySale(false);
    setMaxPrice(300);
    setSelectedSubcategory(null);
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Subcategory filter
      if (selectedSubcategory && product.subcategory !== selectedSubcategory) {
        return false;
      }
      // Price filter
      if (product.price > maxPrice) {
        return false;
      }
      // In Stock filter
      if (onlyInStock && product.stockStatus !== 'in_stock') {
        return false;
      }
      // Sale filter
      if (onlySale && !product.tags?.includes('Sale') && !product.comparePrice) {
        return false;
      }
      // Sizes filter
      if (selectedSizes.length > 0) {
        const matchesSize = selectedSizes.some(sz => product.sizes.includes(sz));
        if (!matchesSize) return false;
      }
      // Colors filter
      if (selectedColors.length > 0) {
        const matchesColor = selectedColors.some(col =>
          product.colors.some(c => c.name.toLowerCase().includes(col.toLowerCase()))
        );
        if (!matchesColor) return false;
      }
      return true;
    }).sort((a, b) => {
      if (selectedSort === 'newest') {
        const aNew = a.tags?.includes('New Arrival') ? 1 : 0;
        const bNew = b.tags?.includes('New Arrival') ? 1 : 0;
        return bNew - aNew;
      }
      if (selectedSort === 'price_asc') {
        return a.price - b.price;
      }
      if (selectedSort === 'price_desc') {
        return b.price - a.price;
      }
      if (selectedSort === 'rating') {
        return b.rating - a.rating;
      }
      if (selectedSort === 'best_selling') {
        const aBest = a.tags?.includes('Best Seller') ? 1 : 0;
        const bBest = b.tags?.includes('Best Seller') ? 1 : 0;
        return bBest - aBest || b.reviewCount - a.reviewCount;
      }
      return 0; // featured default order
    });
  }, [
    selectedCategory,
    selectedSubcategory,
    selectedSort,
    selectedSizes,
    selectedColors,
    onlyInStock,
    onlySale,
    maxPrice
  ]);

  const activeFilterCount =
    (selectedSizes.length > 0 ? 1 : 0) +
    (selectedColors.length > 0 ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (onlySale ? 1 : 0) +
    (maxPrice < 300 ? 1 : 0) +
    (selectedSubcategory ? 1 : 0);

  return (
    <div className="min-h-full pb-24 bg-[#FAF8F5]">
      {/* Category Tabs (Clean Segmented Bar) */}
      <div className="bg-[#FDFBF7] border-b border-[#E8E2D5] sticky top-0 z-20 shadow-xs">
        <div className="max-w-md mx-auto px-2.5 overflow-x-auto no-scrollbar flex items-center gap-1.5 py-2">
          {CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedSubcategory(null);
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-[#1B2E3D] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#1B2E3D] hover:bg-[#F0EBE1]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Subcategories (if selected department has subcategories) */}
        {activeCategoryObj.subcategories.length > 0 && (
          <div className="px-3 py-1.5 border-t border-[#F0EBE1] flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-[#F8F6F0]">
            <button
              onClick={() => setSelectedSubcategory(null)}
              className={`text-[10px] px-2 py-0.5 rounded-md whitespace-nowrap transition-colors ${
                !selectedSubcategory
                  ? 'bg-white text-[#1B2E3D] font-bold shadow-xs'
                  : 'text-[#788896] hover:text-[#1B2E3D]'
              }`}
            >
              All {activeCategoryObj.label}
            </button>
            {activeCategoryObj.subcategories.map(sub => {
              const isSubActive = selectedSubcategory === sub;
              return (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub)}
                  className={`text-[10px] px-2 py-0.5 rounded-md whitespace-nowrap transition-colors ${
                    isSubActive
                      ? 'bg-white text-[#1E6B7B] font-bold shadow-xs'
                      : 'text-[#788896] hover:text-[#1B2E3D]'
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Catalog Title, Count & Controls */}
      <div className="max-w-md mx-auto px-3 pt-3 pb-1.5">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h1 className="font-serif text-lg font-bold text-[#1B2E3D] leading-tight">
              {selectedCategory === 'all'
                ? 'All Island Styles'
                : selectedSubcategory
                ? `${activeCategoryObj.label} · ${selectedSubcategory}`
                : activeCategoryObj.label}
            </h1>
            <span className="text-[10px] text-[#788896] font-medium tabular-nums">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Style' : 'Styles'}
            </span>
          </div>

          {/* Filter & Sort Action Triggers */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setIsSortOpen(true)}
              className="h-8 px-2.5 rounded-lg border border-[#DDD6C8] bg-white text-xs font-semibold text-[#1B2E3D] flex items-center gap-1 hover:bg-[#F2EDE4] transition-colors"
            >
              <ArrowUpDown className="w-3 h-3 text-[#1E6B7B]" />
              <span className="capitalize">{selectedSort === 'price_asc' ? '$ Low' : selectedSort === 'price_desc' ? '$ High' : selectedSort === 'best_selling' ? 'Best' : selectedSort}</span>
            </button>

            <button
              onClick={() => setIsFilterOpen(true)}
              className={`h-8 px-2.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors ${
                activeFilterCount > 0
                  ? 'bg-[#1E6B7B] text-white border-[#1E6B7B]'
                  : 'bg-white border-[#DDD6C8] text-[#1B2E3D] hover:bg-[#F2EDE4]'
              }`}
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-3.5 h-3.5 rounded-full bg-white text-[#1E6B7B] text-[9px] font-bold flex items-center justify-center tabular-nums">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Active Filter Chips with quick remove */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-1 pt-2">
            {selectedSubcategory && (
              <span className="text-[10px] bg-white border border-[#DDD6C8] text-[#1B2E3D] px-2 py-0.5 rounded-md flex items-center gap-1">
                {selectedSubcategory}
                <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setSelectedSubcategory(null)} />
              </span>
            )}
            {selectedSizes.map(sz => (
              <span key={sz} className="text-[10px] bg-white border border-[#DDD6C8] text-[#1B2E3D] px-2 py-0.5 rounded-md flex items-center gap-1">
                Size {sz}
                <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => handleToggleSize(sz)} />
              </span>
            ))}
            {selectedColors.map(col => (
              <span key={col} className="text-[10px] bg-white border border-[#DDD6C8] text-[#1B2E3D] px-2 py-0.5 rounded-md flex items-center gap-1">
                {col}
                <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => handleToggleColor(col)} />
              </span>
            ))}
            {onlyInStock && (
              <span className="text-[10px] bg-white border border-[#DDD6C8] text-[#1B2E3D] px-2 py-0.5 rounded-md flex items-center gap-1">
                In Stock
                <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setOnlyInStock(false)} />
              </span>
            )}
            {onlySale && (
              <span className="text-[10px] bg-[#B93822]/10 border border-[#B93822]/20 text-[#B93822] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                Sale
                <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setOnlySale(false)} />
              </span>
            )}
            {maxPrice < 300 && (
              <span className="text-[10px] bg-white border border-[#DDD6C8] text-[#1B2E3D] px-2 py-0.5 rounded-md flex items-center gap-1">
                &lt;${maxPrice}
                <X className="w-2.5 h-2.5 cursor-pointer" onClick={() => setMaxPrice(300)} />
              </span>
            )}
            <button
              onClick={handleClearFilters}
              className="text-[10px] text-[#1E6B7B] font-semibold hover:underline pl-0.5"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* 2-Column Product Grid */}
      <div className="max-w-md mx-auto px-3 pt-2">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty Filter State */
          <div className="py-16 text-center bg-white rounded-3xl border border-[#E8E2D5] p-6 max-w-md mx-auto mt-6">
            <RotateCcw className="w-10 h-10 text-[#6B7B88] mx-auto mb-3 opacity-60" />
            <h3 className="font-serif text-lg font-bold text-[#1B2E3D] mb-1">
              No matching island styles
            </h3>
            <p className="text-xs text-[#6B7B88] leading-relaxed mb-5">
              We couldn't find any items matching your selected criteria. Try adjusting your filters or price range.
            </p>
            <button
              onClick={handleClearFilters}
              className="py-2.5 px-5 rounded-full bg-[#1B2E3D] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#132533] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Filter Bottom Sheet */}
      <FilterSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedSizes={selectedSizes}
        onToggleSize={handleToggleSize}
        selectedColors={selectedColors}
        onToggleColor={handleToggleColor}
        onlyInStock={onlyInStock}
        onToggleInStock={() => setOnlyInStock(!onlyInStock)}
        onlySale={onlySale}
        onToggleSale={() => setOnlySale(!onlySale)}
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
        onClearAll={handleClearFilters}
        totalFilteredCount={filteredProducts.length}
      />

      {/* Sort Bottom Sheet */}
      <SortSheet
        isOpen={isSortOpen}
        onClose={() => setIsSortOpen(false)}
        selectedSort={selectedSort}
        onSelectSort={setSelectedSort}
      />
    </div>
  );
};
