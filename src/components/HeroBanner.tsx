import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HERO_IMAGE } from '../data/products';
import { useShop } from '../context/ShopContext';

export const HeroBanner: React.FC = () => {
  const { navigateToTab, setSelectedCategory, setSelectedSubcategory } = useShop();

  const handleShopNewArrivals = () => {
    setSelectedCategory('all');
    setSelectedSubcategory(null);
    navigateToTab('shop');
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#1B2E3D]">
      {/* Background Image with warm coastal grading and measured scrim */}
      <div className="relative aspect-[4/3] sm:aspect-16/9 w-full overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Tommy Bahama resort fashion on tropical shoreline"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark scrim for 4.5:1 text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#132533]/90 via-[#132533]/35 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white flex flex-col items-start max-w-sm">
        <span className="text-[9px] tracking-[0.22em] uppercase text-[#E5B869] font-bold mb-1">
          New Resort Season
        </span>
        <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight mb-1.5">
          Your Escape Starts Here
        </h1>
        <p className="text-xs text-white/85 font-normal leading-relaxed mb-3.5 line-clamp-2">
          Effortless style inspired by island living, pure washed silks, and breezy European linens.
        </p>
        <button
          onClick={handleShopNewArrivals}
          className="group inline-flex items-center gap-1.5 bg-[#F8F6F0] text-[#1B2E3D] hover:bg-white text-xs font-semibold tracking-wide uppercase px-4 py-2.5 rounded-full shadow-md active:scale-95 transition-all"
        >
          <span>Shop New Arrivals</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#1E6B7B] group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </section>
  );
};
