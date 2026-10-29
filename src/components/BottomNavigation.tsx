import React from 'react';
import { Home, Compass, Search, Heart, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const BottomNavigation: React.FC = () => {
  const { activeTab, navigateToTab, cartCount, favorites, selectedProductId } = useShop();

  const navItems = [
    {
      id: 'home' as const,
      label: 'Home',
      icon: Home
    },
    {
      id: 'shop' as const,
      label: 'Shop',
      icon: Compass
    },
    {
      id: 'search' as const,
      label: 'Search',
      icon: Search
    },
    {
      id: 'favorites' as const,
      label: 'Favorites',
      icon: Heart,
      badge: favorites.length > 0 ? favorites.length : undefined
    },
    {
      id: 'bag' as const,
      label: 'Bag',
      icon: ShoppingBag,
      badge: cartCount > 0 ? cartCount : undefined
    }
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-lg border-t border-[#E8E2D5] shadow-[0_-4px_20px_rgba(0,0,0,0.04)] pb-safe transition-all"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center h-16 px-1">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id && !selectedProductId;

          return (
            <button
              key={item.id}
              onClick={() => navigateToTab(item.id)}
              className={`relative flex flex-col items-center justify-center min-h-[44px] py-1 transition-all active:scale-95 group focus:outline-none`}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative flex items-center justify-center">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 stroke-[1.9] ${
                    isActive
                      ? 'text-[#1E6B7B] scale-110'
                      : 'text-[#64748B] group-hover:text-[#1B2E3D]'
                  } ${item.id === 'favorites' && isActive && favorites.length > 0 ? 'fill-[#1E6B7B]' : ''}`}
                />
                {item.badge !== undefined && (
                  <span
                    className={`absolute -top-1.5 -right-2.5 h-4 min-w-4 px-1 rounded-full text-[9px] font-bold flex items-center justify-center shadow-xs tabular-nums text-white ${
                      item.id === 'favorites' ? 'bg-[#DE7056]' : 'bg-[#1E6B7B]'
                    }`}
                  >
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] tracking-tight mt-1 font-medium transition-colors ${
                  isActive ? 'text-[#1E6B7B] font-semibold' : 'text-[#64748B] group-hover:text-[#1B2E3D]'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#1E6B7B]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
