import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllCategory?: string;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({
  title,
  subtitle,
  products,
  viewAllCategory
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { navigateToTab, setSelectedCategory } = useShop();

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleViewAll = () => {
    if (viewAllCategory) {
      setSelectedCategory(viewAllCategory as any);
    } else {
      setSelectedCategory('all');
    }
    navigateToTab('shop');
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="py-3.5 max-w-md mx-auto">
      {/* Header with Title & View All */}
      <div className="px-3 flex items-end justify-between mb-2.5">
        <div>
          {subtitle && (
            <span className="text-[9px] tracking-[0.2em] uppercase text-[#788896] font-bold block mb-0.5">
              {subtitle}
            </span>
          )}
          <h2 className="font-serif text-lg font-bold text-[#1B2E3D]">
            {title}
          </h2>
        </div>

        <button
          onClick={handleViewAll}
          className="text-[11px] font-semibold text-[#1E6B7B] hover:text-[#132533] transition-colors py-1 px-1.5 focus:outline-none"
        >
          View All ({products.length})
        </button>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-2.5 overflow-x-auto no-scrollbar px-3 pb-2 snap-x snap-mandatory"
      >
        {products.map(product => (
          <div
            key={product.id}
            className="w-[145px] sm:w-[170px] shrink-0 snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};
