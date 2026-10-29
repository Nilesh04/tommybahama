import React from 'react';
import { ChevronRight } from 'lucide-react';
import { CATEGORY_TILES } from '../data/products';
import { useShop } from '../context/ShopContext';
import { MainCategory } from '../types';

export const CategoryTiles: React.FC = () => {
  const { navigateToCategory } = useShop();

  return (
    <section className="py-4 px-3 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-2.5 px-0.5">
        <div>
          <span className="text-[9px] tracking-[0.2em] uppercase text-[#788896] font-bold">
            Curated Collections
          </span>
          <h2 className="font-serif text-lg font-bold text-[#1B2E3D]">
            Shop by Category
          </h2>
        </div>
      </div>

      {/* Grid of category tiles */}
      <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
        {CATEGORY_TILES.map(cat => (
          <button
            key={cat.id}
            onClick={() => navigateToCategory(cat.id as MainCategory)}
            className="group relative overflow-hidden rounded-xl bg-[#EBE5DB] aspect-[4/5] text-left transition-all active:scale-[0.98] focus:outline-none"
          >
            {/* Background Image */}
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              referrerPolicy="no-referrer"
            />
            {/* Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#132533]/90 via-[#132533]/20 to-transparent" />

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3 text-white">
              <span className="text-[9px] tracking-wider uppercase text-[#E5B869] font-medium block mb-0.5">
                {cat.count}
              </span>
              <h3 className="font-serif text-sm font-semibold text-white leading-tight flex items-center justify-between">
                <span>{cat.title}</span>
                <ChevronRight className="w-3.5 h-3.5 text-white/70 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </h3>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
