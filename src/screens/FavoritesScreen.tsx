import React from 'react';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { MOCK_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const FavoritesScreen: React.FC = () => {
  const { favorites, toggleFavorite, openProductDetails, navigateToTab } = useShop();

  const favoriteProducts = MOCK_PRODUCTS.filter(p => favorites.includes(p.id));

  return (
    <div className="min-h-full pb-24 bg-[#FAF8F5]">
      {/* Header */}
      <div className="bg-[#FDFBF7] border-b border-[#E8E2D5] px-3.5 py-3 text-left">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl font-bold text-[#1B2E3D]">
              My Island Favorites
            </h1>
            <p className="text-[11px] text-[#788896] tabular-nums mt-0.5">
              {favoriteProducts.length} {favoriteProducts.length === 1 ? 'saved style' : 'saved styles'}
            </p>
          </div>

          {favoriteProducts.length > 0 && (
            <button
              onClick={() => navigateToTab('shop')}
              className="text-xs font-semibold text-[#1E6B7B] hover:underline"
            >
              Continue Shopping
            </button>
          )}
        </div>
      </div>

      <div className="max-w-md mx-auto px-3 pt-3">
        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            {favoriteProducts.map(product => (
              <div key={product.id} className="relative flex flex-col">
                <ProductCard product={product} />

                {/* Quick Add / Select Size shortcut button under card */}
                <button
                  onClick={() => openProductDetails(product.id)}
                  className="mt-1 py-1.5 px-2 bg-white hover:bg-[#F2EDE4] border border-[#DDD6C8] rounded-lg text-[11px] font-semibold text-[#1B2E3D] flex items-center justify-center gap-1 transition-colors shadow-2xs"
                >
                  <ShoppingBag className="w-3 h-3 text-[#1E6B7B]" />
                  <span>Select Size</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 text-center max-w-sm mx-auto bg-white rounded-3xl border border-[#E8E2D5] p-8 mt-6">
            <div className="w-16 h-16 rounded-full bg-[#FAF0E1] text-[#DE7056] flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1B2E3D] mb-1">
              Your favorites list is empty
            </h3>
            <p className="text-xs text-[#6B7B88] leading-relaxed mb-6">
              Tap the heart icon on any silk shirt, linen dress, or beach accessory to save your favorite styles for later.
            </p>
            <button
              onClick={() => navigateToTab('shop')}
              className="py-3 px-6 rounded-full bg-[#1B2E3D] hover:bg-[#132533] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
            >
              Discover Island Styles
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
