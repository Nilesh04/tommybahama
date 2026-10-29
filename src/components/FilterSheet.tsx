import React from 'react';
import { X, Check, RotateCcw } from 'lucide-react';
import { MainCategory } from '../types';

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: MainCategory | 'all';
  onSelectCategory: (cat: MainCategory | 'all') => void;
  selectedSizes: string[];
  onToggleSize: (size: string) => void;
  selectedColors: string[];
  onToggleColor: (color: string) => void;
  onlyInStock: boolean;
  onToggleInStock: () => void;
  onlySale: boolean;
  onToggleSale: () => void;
  maxPrice: number;
  onMaxPriceChange: (val: number) => void;
  onClearAll: () => void;
  totalFilteredCount: number;
}

const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '30', '32', '34', '36', '38'];
const AVAILABLE_COLORS = [
  { name: 'Navy', hex: '#1B2E3D' },
  { name: 'Teal', hex: '#1E6B7B' },
  { name: 'Sand', hex: '#D7CBB5' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Coral', hex: '#DE7056' },
  { name: 'Olive', hex: '#585F49' },
  { name: 'Black', hex: '#1A1A1A' }
];

export const FilterSheet: React.FC<FilterSheetProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  selectedSizes,
  onToggleSize,
  selectedColors,
  onToggleColor,
  onlyInStock,
  onToggleInStock,
  onlySale,
  onToggleSale,
  maxPrice,
  onMaxPriceChange,
  onClearAll,
  totalFilteredCount
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Sheet Container */}
      <div className="relative w-full bg-[#FAF8F5] rounded-t-3xl max-h-[85%] flex flex-col overflow-hidden shadow-2xl z-10 animate-in slide-in-from-bottom duration-250">
        {/* Grab Handle for touch */}
        <div className="w-10 h-1 bg-[#D1C9BE] rounded-full mx-auto mt-2.5 shrink-0" />

        {/* Header */}
        <div className="px-5 py-3.5 border-b border-[#E8E2D5] flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-[#1B2E3D]">
            Filter Products
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={onClearAll}
              className="text-xs text-[#6B7B88] hover:text-[#1B2E3D] flex items-center gap-1 px-2 py-1 rounded-md"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#1B2E3D] hover:bg-[#EBE5DB]"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Filter Content */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-left">
          {/* Category Section */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B2E3D] mb-2.5">
              Department
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Departments' },
                { id: 'men', label: "Men's" },
                { id: 'women', label: "Women's" },
                { id: 'swim', label: "Women's Swim" },
                { id: 'big_tall', label: 'Big & Tall' },
                { id: 'beach_home', label: 'Beach & Home' },
                { id: 'accessories', label: 'Accessories' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id as any)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-[#1B2E3D] text-white shadow-xs'
                      : 'bg-white text-[#1B2E3D] border border-[#DDD6C8] hover:border-[#1B2E3D]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes Section */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B2E3D] mb-2.5">
              Size
            </h4>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_SIZES.map(sz => {
                const isSelected = selectedSizes.includes(sz);
                return (
                  <button
                    key={sz}
                    onClick={() => onToggleSize(sz)}
                    className={`min-w-10 h-9 px-2 text-xs font-semibold rounded-lg border transition-all ${
                      isSelected
                        ? 'bg-[#1E6B7B] text-white border-[#1E6B7B] shadow-xs'
                        : 'bg-white text-[#1B2E3D] border-[#DDD6C8] hover:border-[#1B2E3D]'
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Colors Section */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B2E3D] mb-2.5">
              Color Family
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_COLORS.map(col => {
                const isSelected = selectedColors.includes(col.name);
                return (
                  <button
                    key={col.name}
                    onClick={() => onToggleColor(col.name)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium text-left transition-all ${
                      isSelected
                        ? 'bg-[#1E6B7B]/10 border-[#1E6B7B] text-[#1E6B7B]'
                        : 'bg-white border-[#E0DACE] text-[#1B2E3D]'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/20 shrink-0"
                      style={{ backgroundColor: col.hex }}
                    />
                    <span className="flex-1 truncate">{col.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Max Price Range Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B2E3D]">
                Max Price
              </h4>
              <span className="text-xs font-bold text-[#1E6B7B] tabular-nums">
                Up to ${maxPrice}
              </span>
            </div>
            <input
              type="range"
              min={40}
              max={300}
              step={10}
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(Number(e.target.value))}
              className="w-full accent-[#1E6B7B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#6B7B88] mt-1 tabular-nums">
              <span>$40</span>
              <span>$150</span>
              <span>$300+</span>
            </div>
          </div>

          {/* Toggles: In Stock & Sale */}
          <div className="pt-2 border-t border-[#E8E2D5] space-y-3">
            <label className="flex items-center justify-between cursor-pointer py-1">
              <div>
                <span className="text-xs font-semibold text-[#1B2E3D] block">In Stock Only</span>
                <span className="text-[11px] text-[#6B7B88]">Hide backordered styles</span>
              </div>
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={onToggleInStock}
                className="w-5 h-5 accent-[#1E6B7B] rounded-sm cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer py-1">
              <div>
                <span className="text-xs font-semibold text-[#1B2E3D] block">Sale Items Only</span>
                <span className="text-[11px] text-[#6B7B88]">Discounted resort styles</span>
              </div>
              <input
                type="checkbox"
                checked={onlySale}
                onChange={onToggleSale}
                className="w-5 h-5 accent-[#1E6B7B] rounded-sm cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#E8E2D5] bg-white flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-[#1B2E3D] hover:bg-[#132533] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md text-center"
          >
            Show {totalFilteredCount} {totalFilteredCount === 1 ? 'Style' : 'Styles'}
          </button>
        </div>
      </div>
    </div>
  );
};
