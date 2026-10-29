import React from 'react';
import { ShoppingBag, MapPin, User } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AppHeader: React.FC = () => {
  const {
    cartCount,
    navigateToTab,
    setIsStoreLocatorOpen,
    setIsAccountOpen,
    closeProductDetails,
    selectedProductId
  } = useShop();

  const handleLogoClick = () => {
    closeProductDetails();
    navigateToTab('home');
  };

  return (
    <header className="sticky top-0 z-30 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E8E2D5] px-3.5 py-2 transition-shadow">
      <div className="w-full flex items-center justify-between gap-2">
        {/* Left Side: Store Locator */}
        <div className="w-10 flex items-center justify-start">
          <button
            onClick={() => setIsStoreLocatorOpen(true)}
            aria-label="Find a Tommy Bahama Store"
            className="w-9 h-9 flex items-center justify-center text-[#1B2E3D]/80 hover:text-[#1B2E3D] hover:bg-[#F0EBE1] rounded-full transition-colors active:scale-95"
            title="Find a Store"
          >
            <MapPin className="w-4 h-4 stroke-[1.8]" />
          </button>
        </div>

        {/* Center: Brand Wordmark */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-1 min-w-0">
          <button
            onClick={handleLogoClick}
            className="group flex flex-col items-center justify-center focus:outline-none"
          >
            <span className="font-serif text-base sm:text-lg tracking-[0.2em] uppercase font-bold text-[#1B2E3D] group-hover:text-[#1E6B7B] transition-colors leading-tight truncate">
              Tommy Bahama
            </span>
            <span className="text-[8px] tracking-[0.26em] uppercase text-[#788896] font-medium">
              Island Life
            </span>
          </button>
        </div>

        {/* Right Side: Account Profile & Bag */}
        <div className="flex items-center justify-end gap-0.5">
          <button
            onClick={() => setIsAccountOpen(true)}
            aria-label="Account Profile & Orders"
            className="w-9 h-9 flex items-center justify-center text-[#1B2E3D]/80 hover:text-[#1B2E3D] hover:bg-[#F0EBE1] rounded-full transition-colors active:scale-95"
            title="Account & Orders"
          >
            <User className="w-4 h-4 stroke-[1.8]" />
          </button>

          <button
            onClick={() => {
              closeProductDetails();
              navigateToTab('bag');
            }}
            aria-label="View Shopping Bag"
            className="relative w-9 h-9 flex items-center justify-center text-[#1B2E3D]/80 hover:text-[#1B2E3D] hover:bg-[#F0EBE1] rounded-full transition-colors active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute 0 top-0.5 right-0.5 bg-[#1E6B7B] text-white text-[9px] font-bold h-4 min-w-4 px-1 rounded-full flex items-center justify-center shadow-xs tabular-nums">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
