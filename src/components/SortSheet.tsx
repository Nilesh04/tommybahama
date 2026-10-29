import React from 'react';
import { X, Check } from 'lucide-react';
import { SortOption } from '../types';

interface SortSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSort: SortOption;
  onSelectSort: (option: SortOption) => void;
}

const SORT_OPTIONS: { id: SortOption; label: string; description: string }[] = [
  { id: 'featured', label: 'Featured', description: 'Curated Tommy Bahama highlights' },
  { id: 'newest', label: 'Newest Arrivals', description: 'Fresh season releases' },
  { id: 'best_selling', label: 'Best Selling', description: 'Most beloved island favorites' },
  { id: 'price_asc', label: 'Price: Low to High', description: 'Entry luxury to statement pieces' },
  { id: 'price_desc', label: 'Price: High to Low', description: 'Premier silk & cashmere collections' },
  { id: 'rating', label: 'Customer Rating', description: 'Highest rated by verified islanders' }
];

export const SortSheet: React.FC<SortSheetProps> = ({
  isOpen,
  onClose,
  selectedSort,
  onSelectSort
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative w-full bg-[#FAF8F5] rounded-t-3xl overflow-hidden shadow-2xl z-10 text-left animate-in slide-in-from-bottom duration-250">
        <div className="w-10 h-1 bg-[#D1C9BE] rounded-full mx-auto mt-2.5 shrink-0" />

        <div className="px-5 py-3.5 border-b border-[#E8E2D5] flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-[#1B2E3D]">
            Sort By
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#1B2E3D] hover:bg-[#EBE5DB]"
            aria-label="Close sort sheet"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 divide-y divide-[#EFEAE1]">
          {SORT_OPTIONS.map(opt => {
            const isSelected = selectedSort === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => {
                  onSelectSort(opt.id);
                  onClose();
                }}
                className={`w-full py-3 px-3 flex items-center justify-between rounded-xl transition-colors ${
                  isSelected ? 'bg-white shadow-xs text-[#1E6B7B]' : 'hover:bg-white/60 text-[#1B2E3D]'
                }`}
              >
                <div>
                  <span className={`text-sm font-semibold block ${isSelected ? 'text-[#1E6B7B]' : 'text-[#1B2E3D]'}`}>
                    {opt.label}
                  </span>
                  <span className="text-[11px] text-[#6B7B88]">
                    {opt.description}
                  </span>
                </div>
                {isSelected && (
                  <Check className="w-4 h-4 text-[#1E6B7B] shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
