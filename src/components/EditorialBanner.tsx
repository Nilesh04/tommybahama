import React from 'react';
import { Compass } from 'lucide-react';
import { EDITORIAL_IMAGE } from '../data/products';
import { useShop } from '../context/ShopContext';

export const EditorialBanner: React.FC = () => {
  const { navigateToTab, setSelectedCategory } = useShop();

  const handleExplore = () => {
    setSelectedCategory('all');
    navigateToTab('shop');
  };

  return (
    <section className="py-4 px-3 max-w-md mx-auto">
      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#1B2E3D]">
        <img
          src={EDITORIAL_IMAGE}
          alt="Coastal lanai overlooking tropical waters"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#132533]/95 via-[#132533]/50 to-transparent" />

        <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end items-start text-white">
          <span className="text-[9px] tracking-[0.24em] uppercase text-[#E5B869] font-bold mb-1">
            The Island Mindset
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight mb-1.5">
            Live the Island Life
          </h2>
          <p className="text-xs text-white/85 leading-relaxed mb-3 line-clamp-2 font-normal">
            Embrace the relaxed spirit of endless vacation, fine craftsmanship, and timeless coastal luxury.
          </p>
          <button
            onClick={handleExplore}
            className="inline-flex items-center gap-1.5 bg-[#F8F6F0] text-[#1B2E3D] hover:bg-white text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full transition-all active:scale-95 shadow-md"
          >
            <Compass className="w-3.5 h-3.5 text-[#1E6B7B]" />
            <span>Explore Collection</span>
          </button>
        </div>
      </div>
    </section>
  );
};
