import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openProductDetails, isFavorite, toggleFavorite } = useShop();
  const [imageError, setImageError] = useState(false);
  const favorited = isFavorite(product.id);

  // Fallback image URL or styled placeholder
  const primaryImage = imageError || !product.images[0]
    ? 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
    : product.images[0];

  const primaryTag = product.tags?.[0];

  return (
    <div className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-[#EDE8DF] shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:shadow-md transition-all">
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full bg-[#F5F2EB] overflow-hidden cursor-pointer" onClick={() => openProductDetails(product.id)}>
        <img
          src={primaryImage}
          alt={product.name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Quiet Subtle Editorial Tag */}
        {primaryTag && (
          <div className="absolute top-2 left-2">
            <span className={`text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-sm ${
              primaryTag === 'Sale'
                ? 'bg-[#B93822] text-white'
                : 'bg-[#1B2E3D]/85 backdrop-blur-xs text-[#F8F6F0]'
            }`}>
              {primaryTag}
            </span>
          </div>
        )}

        {/* Favorite Heart Toggle Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          aria-label={favorited ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
          className="absolute top-1.5 right-1.5 w-7 h-7 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-[#1B2E3D] shadow-xs active:scale-90 transition-all z-10"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              favorited ? 'fill-[#DE7056] text-[#DE7056]' : 'text-[#64748B]'
            }`}
          />
        </button>
      </div>

      {/* Product Details info */}
      <div className="p-2 sm:p-2.5 flex flex-col flex-1 justify-between text-left cursor-pointer" onClick={() => openProductDetails(product.id)}>
        <div>
          {/* Subcategory & Rating */}
          <div className="flex items-center justify-between text-[10px] text-[#788896] mb-0.5">
            <span className="uppercase tracking-wider font-semibold truncate max-w-[90px]">
              {product.subcategory}
            </span>
            <div className="flex items-center gap-0.5 text-[#1B2E3D]">
              <Star className="w-2.5 h-2.5 fill-[#E5B869] text-[#E5B869]" />
              <span className="font-bold text-[10px] tabular-nums">{product.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Product Name */}
          <h4 className="font-serif text-xs font-semibold text-[#1B2E3D] group-hover:text-[#1E6B7B] transition-colors line-clamp-2 leading-snug mb-1">
            {product.name}
          </h4>
        </div>

        {/* Pricing and Color Dots */}
        <div className="pt-1.5 border-t border-[#F0EBE1] flex items-center justify-between mt-auto">
          {/* Prices */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs sm:text-sm font-bold text-[#1B2E3D] tabular-nums">
              ${product.price}
            </span>
            {product.comparePrice && (
              <span className="text-[10px] text-[#94A3B8] line-through tabular-nums">
                ${product.comparePrice}
              </span>
            )}
          </div>

          {/* Color preview dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center -space-x-1" title={`${product.colors.length} colors available`}>
              {product.colors.slice(0, 3).map((col, idx) => (
                <span
                  key={idx}
                  className="w-2.5 h-2.5 rounded-full border border-white shadow-2xs"
                  style={{ backgroundColor: col.hex }}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-[8px] text-[#788896] font-medium pl-1 tabular-nums">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
