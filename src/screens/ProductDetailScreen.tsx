import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Star,
  ShieldCheck,
  Truck,
  RefreshCw,
  Ruler,
  Check,
  ChevronDown,
  ShoppingBag,
  Sparkles,
  Share2,
  Maximize2,
  X,
  ChevronRight,
  ChevronLeft,
  Sun,
  Waves,
  MessageSquarePlus
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { MOCK_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Review } from '../types';

interface ProductDetailScreenProps {
  productId: string;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ productId }) => {
  const {
    closeProductDetails,
    addToBag,
    isFavorite,
    toggleFavorite,
    setIsSizeGuideOpen,
    cartCount,
    navigateToTab,
    showToast
  } = useShop();

  const product = MOCK_PRODUCTS.find(p => p.id === productId) || MOCK_PRODUCTS[0];

  // User selections
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [sizeError, setSizeError] = useState(false);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  // Lightbox full-screen image view
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Accordion state
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    details: true,
    fabric: false,
    shipping: false,
    reviews: true
  });

  // Local reviews state (starts with product.reviews, allows user to add a review)
  const [reviewsList, setReviewsList] = useState<Review[]>(product.reviews || []);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');

  // Touch swipe handling for mobile photo gallery
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const favorited = isFavorite(product.id);

  const toggleAccordion = (key: string) => {
    setOpenAccordions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > 45 && product.images.length > 1) {
      // Next image
      setActiveImageIndex(prev => (prev + 1) % product.images.length);
    } else if (distance < -45 && product.images.length > 1) {
      // Previous image
      setActiveImageIndex(prev => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  const handleSelectSize = (sz: string) => {
    setSelectedSize(sz);
    setSizeError(false);
  };

  const handleAddToBag = () => {
    if (!selectedSize) {
      setSizeError(true);
      // Scroll smoothly to size selector if needed
      const sizeElem = document.getElementById('pdp-size-selector');
      if (sizeElem) {
        sizeElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    addToBag(product, selectedColor, selectedSize, quantity);
    setIsAddedSuccess(true);
    setTimeout(() => {
      setIsAddedSuccess(false);
    }, 2000);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
    showToast(`Resort link for "${product.name}" copied to clipboard!`);
  };

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewTitle.trim() || !newReviewComment.trim()) {
      showToast('Please provide a title and review comment.');
      return;
    }

    const newRev: Review = {
      id: `rev-user-${Date.now()}`,
      author: newReviewAuthor.trim() || 'Island Traveler',
      rating: newReviewRating,
      date: 'Just now',
      title: newReviewTitle.trim(),
      comment: newReviewComment.trim(),
      verified: true
    };

    setReviewsList([newRev, ...reviewsList]);
    setIsWriteReviewOpen(false);
    setNewReviewTitle('');
    setNewReviewComment('');
    setNewReviewAuthor('');
    showToast('Thank you for sharing your verified island review!');
  };

  // Recommended products in the same category or overall bestsellers
  const recommended = MOCK_PRODUCTS.filter(
    p => p.id !== product.id && (p.category === product.category || p.tags?.includes('Best Seller'))
  ).slice(0, 4);

  // Review statistics
  const totalReviews = reviewsList.length;
  const averageRating = totalReviews > 0
    ? (reviewsList.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : product.rating.toFixed(1);

  return (
    <div className="min-h-full bg-[#FAF8F5] pb-28 text-left selection:bg-[#1E6B7B]/20">
      {/* Dedicated Mobile PDP Header */}
      <header className="sticky top-0 z-30 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E8E2D5] px-3.5 py-2.5 flex items-center justify-between gap-2 shadow-2xs">
        <button
          onClick={closeProductDetails}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F0EBE1] text-[#1B2E3D] transition-colors focus:outline-none shrink-0 active:scale-95"
          aria-label="Back to Browse"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 text-center truncate px-2">
          <span className="font-serif text-xs font-bold text-[#1B2E3D] uppercase tracking-wider block truncate">
            {product.name}
          </span>
          <span className="text-[9px] uppercase tracking-widest text-[#788896]">
            {product.category.replace('_', ' & ')} · {product.subcategory}
          </span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {/* Share */}
          <button
            onClick={handleShare}
            aria-label="Share product"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F0EBE1] text-[#1B2E3D] transition-colors active:scale-95"
          >
            <Share2 className="w-4 h-4 text-[#64748B]" />
          </button>

          {/* Favorite */}
          <button
            onClick={() => toggleFavorite(product.id)}
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F0EBE1] text-[#1B2E3D] transition-colors active:scale-95"
          >
            <Heart
              className={`w-4 h-4 ${
                favorited ? 'fill-[#DE7056] text-[#DE7056]' : 'text-[#64748B]'
              }`}
            />
          </button>

          {/* Bag with Counter */}
          <button
            onClick={() => {
              closeProductDetails();
              navigateToTab('bag');
            }}
            aria-label="View Shopping Bag"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F0EBE1] text-[#1B2E3D] transition-colors relative active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-[#1B2E3D]" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full text-[9px] font-bold flex items-center justify-center bg-[#1E6B7B] text-white tabular-nums shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-md mx-auto px-3.5 pt-3">
        {/* Main Product Layout */}
        <div className="space-y-5">
          {/* Section 1: Image Gallery with Swipe & Zoom */}
          <div className="space-y-2.5">
            {/* Primary Large Image */}
            <div
              className="relative aspect-4/5 w-full bg-[#F5F2EB] rounded-2xl overflow-hidden border border-[#E8E2D5] shadow-xs select-none cursor-pointer"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={() => setIsLightboxOpen(true)}
            >
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-all duration-300"
                referrerPolicy="no-referrer"
              />

              {/* Tag indicator */}
              {product.tags && product.tags.length > 0 && (
                <div className="absolute top-3 left-3 pointer-events-none">
                  <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-sm bg-[#1B2E3D]/85 backdrop-blur-xs text-[#F8F6F0] shadow-2xs">
                    {product.tags[0]}
                  </span>
                </div>
              )}

              {/* Lightbox Zoom Icon Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLightboxOpen(true);
                }}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                aria-label="Expand image fullscreen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>

              {/* Image Slide Pagination Dots */}
              {product.images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-full pointer-events-auto">
                  {product.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIndex(i);
                      }}
                      className={`h-1.5 rounded-full transition-all ${
                        activeImageIndex === i ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                      }`}
                      aria-label={`Go to photo ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-18 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#1E6B7B] ring-2 ring-[#1E6B7B]/30'
                        : 'border-[#DDD6C8] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Product Title, Pricing & Ratings */}
          <div className="space-y-3">
            <div>
              {/* Category Breadcrumb & Review Rating */}
              <div className="flex items-center justify-between text-xs text-[#6B7B88] mb-1">
                <span className="uppercase tracking-widest font-semibold text-[10px]">
                  {product.category.replace('_', ' & ')} · {product.subcategory}
                </span>

                <button
                  onClick={() => {
                    setOpenAccordions(prev => ({ ...prev, reviews: true }));
                    const revElem = document.getElementById('pdp-reviews-section');
                    if (revElem) {
                      revElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="flex items-center gap-1 text-[#1B2E3D] hover:underline"
                >
                  <div className="flex items-center text-[#E5B869]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(Number(averageRating))
                            ? 'fill-[#E5B869] text-[#E5B869]'
                            : 'text-[#CBD5E1]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-xs tabular-nums">{averageRating}</span>
                  <span className="text-[#6B7B88]">({totalReviews})</span>
                </button>
              </div>

              {/* Product Title */}
              <h1 className="font-serif text-2xl font-bold text-[#1B2E3D] leading-tight mb-1">
                {product.name}
              </h1>
              {product.subtitle && (
                <p className="text-xs text-[#6B7B88] font-medium mb-2.5">
                  {product.subtitle}
                </p>
              )}

              {/* Price Display & Savings */}
              <div className="flex items-baseline gap-2.5 mb-2.5 flex-wrap">
                <span className="text-2xl font-bold text-[#1B2E3D] tabular-nums">
                  ${product.price}
                </span>
                {product.comparePrice && (
                  <span className="text-sm text-[#94A3B8] line-through tabular-nums">
                    ${product.comparePrice}
                  </span>
                )}
                {product.comparePrice && (
                  <span className="text-xs font-semibold text-[#B93822] bg-[#B93822]/10 px-2 py-0.5 rounded-sm">
                    Save ${product.comparePrice - product.price} (
                    {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% off)
                  </span>
                )}
              </div>

              {/* Island Fit & Stock Guarantee */}
              <div className="flex flex-col gap-1.5 pt-1 text-xs text-[#475569]">
                <div className="flex items-center gap-2">
                  <Sun className="w-3.5 h-3.5 text-[#E5B869] shrink-0" />
                  <span className="font-medium text-[#1B2E3D]">
                    Signature Relaxed Island Fit — Designed for effortless drape in warm breezes
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#2E6F4E] font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#2E6F4E] shrink-0 animate-pulse" />
                  <span>
                    {product.stockStatus === 'in_stock'
                      ? 'In Stock · Complimentary Resort Delivery over $125'
                      : 'Low Stock · Only a few pieces remaining in inventory'}
                  </span>
                </div>
              </div>
            </div>

            <hr className="border-[#E8E2D5]" />

            {/* Color Swatches */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#1B2E3D]">
                  Color: <span className="font-semibold text-[#1E6B7B] normal-case">{selectedColor}</span>
                </label>
                <span className="text-[11px] text-[#788896]">
                  {product.colors.length} {product.colors.length === 1 ? 'shade' : 'island shades'}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(col => {
                  const isSelected = selectedColor === col.name;
                  return (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col.name)}
                      aria-label={`Select color ${col.name}`}
                      className={`relative min-h-[36px] px-3 py-1.5 rounded-xl border flex items-center gap-2 transition-all active:scale-95 ${
                        isSelected
                          ? 'border-[#1E6B7B] bg-white ring-2 ring-[#1E6B7B]/20 shadow-xs'
                          : 'border-[#E0DACE] bg-white hover:border-[#1B2E3D]'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-black/20 shrink-0"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span className="text-xs font-medium text-[#1B2E3D]">{col.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selector */}
            <div id="pdp-size-selector">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1B2E3D]">
                    Select Size:
                  </label>
                  {selectedSize ? (
                    <span className="text-xs font-bold text-[#1E6B7B] uppercase">{selectedSize}</span>
                  ) : (
                    <span className="text-[11px] text-[#94A3B8] font-normal italic">Required</span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs text-[#1E6B7B] hover:text-[#132533] flex items-center gap-1 font-semibold underline underline-offset-2"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size & Fit Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map(sz => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => handleSelectSize(sz)}
                      className={`h-11 rounded-xl text-xs font-semibold border transition-all active:scale-95 flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#1B2E3D] text-white border-[#1B2E3D] shadow-sm font-bold'
                          : 'bg-white text-[#1B2E3D] border-[#DDD6C8] hover:border-[#1B2E3D]'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>

              {/* Size selection validation error */}
              {sizeError && (
                <div className="p-2.5 mt-2 bg-[#FEE2E2] border border-[#F87171] rounded-xl flex items-center gap-2 text-xs text-[#991B1B] animate-in fade-in duration-200">
                  <Sparkles className="w-3.5 h-3.5 text-[#DC2626] shrink-0" />
                  <span className="font-semibold">Please select your size before adding to bag.</span>
                </div>
              )}

              <p className="text-[11px] text-[#788896] mt-2">
                Fit Note: Relaxed island cut. If between sizes or seeking a trim fit, choose one size down.
              </p>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center justify-between pt-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1B2E3D]">
                Quantity:
              </label>
              <div className="flex items-center border border-[#DDD6C8] bg-white rounded-xl overflow-hidden shadow-2xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-9 flex items-center justify-center text-[#1B2E3D] hover:bg-[#F2EDE4] active:scale-90 text-sm font-bold"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-xs text-[#1B2E3D] tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-9 flex items-center justify-center text-[#1B2E3D] hover:bg-[#F2EDE4] active:scale-90 text-sm font-bold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Section 3: Island Craftsmanship Spotlight */}
          <div className="bg-[#F4EFE6] border border-[#E0D8CA] rounded-2xl p-3.5 space-y-2.5">
            <div className="flex items-center gap-2 text-[#1E6B7B]">
              <Waves className="w-4 h-4" />
              <span className="text-[11px] uppercase font-bold tracking-widest text-[#1B2E3D]">
                Island Craftsmanship & Signatures
              </span>
            </div>
            <div className="grid grid-cols-1 gap-2 text-xs text-[#475569]">
              <div className="flex items-start gap-2 bg-white/70 p-2.5 rounded-xl border border-[#E8E2D5]">
                <Sun className="w-4 h-4 text-[#E5B869] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1B2E3D] block text-[11px]">Sandwashed Resort Textile</span>
                  <span className="text-[11px]">Mineral-washed for a buttery-soft lived-in hand that drapes naturally in warm climates.</span>
                </div>
              </div>
              <div className="flex items-start gap-2 bg-white/70 p-2.5 rounded-xl border border-[#E8E2D5]">
                <Sparkles className="w-4 h-4 text-[#1E6B7B] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-[#1B2E3D] block text-[11px]">Artisanal Trims & Finishes</span>
                  <span className="text-[11px]">Finished with genuine carved coconut shell buttons, clean French seams, and side vents.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Mobile Accordions for Deep Product Information */}
          <div className="border-t border-[#E8E2D5] divide-y divide-[#E8E2D5]">
            {/* Accordion 1: Details & Features */}
            <div>
              <button
                onClick={() => toggleAccordion('details')}
                className="w-full py-3.5 flex items-center justify-between text-left group"
              >
                <span className="font-serif text-sm font-bold text-[#1B2E3D]">
                  Product Details & Silhouette
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#6B7B88] transition-transform duration-200 ${
                    openAccordions.details ? 'rotate-180 text-[#1E6B7B]' : ''
                  }`}
                />
              </button>

              {openAccordions.details && (
                <div className="pb-4 space-y-2.5 text-xs text-[#475569] leading-relaxed animate-in fade-in duration-200">
                  <p>{product.description}</p>
                  <ul className="space-y-1.5 pt-1">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#1E6B7B] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Accordion 2: Fabric & Care */}
            <div>
              <button
                onClick={() => toggleAccordion('fabric')}
                className="w-full py-3.5 flex items-center justify-between text-left group"
              >
                <span className="font-serif text-sm font-bold text-[#1B2E3D]">
                  Fabric Composition & Care
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#6B7B88] transition-transform duration-200 ${
                    openAccordions.fabric ? 'rotate-180 text-[#1E6B7B]' : ''
                  }`}
                />
              </button>

              {openAccordions.fabric && (
                <div className="pb-4 space-y-3 text-xs text-[#475569] leading-relaxed animate-in fade-in duration-200">
                  <div className="bg-white p-3 rounded-xl border border-[#E8E2D5] space-y-2">
                    <div>
                      <span className="font-bold text-[#1B2E3D] block text-[11px] uppercase tracking-wider">
                        Material
                      </span>
                      <span className="text-xs">{product.fabric}</span>
                    </div>
                    <div className="pt-2 border-t border-[#F0EBE1]">
                      <span className="font-bold text-[#1B2E3D] block text-[11px] uppercase tracking-wider">
                        Care Instructions
                      </span>
                      <span className="text-xs">{product.care}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#788896]">
                    Crafted from long-staple fibers for enduring shape and color retention across seasons of sunshine.
                  </p>
                </div>
              )}
            </div>

            {/* Accordion 3: Shipping & Returns */}
            <div>
              <button
                onClick={() => toggleAccordion('shipping')}
                className="w-full py-3.5 flex items-center justify-between text-left group"
              >
                <span className="font-serif text-sm font-bold text-[#1B2E3D]">
                  Resort Delivery & Returns
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#6B7B88] transition-transform duration-200 ${
                    openAccordions.shipping ? 'rotate-180 text-[#1E6B7B]' : ''
                  }`}
                />
              </button>

              {openAccordions.shipping && (
                <div className="pb-4 space-y-2.5 text-xs text-[#475569] leading-relaxed animate-in fade-in duration-200">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-white rounded-xl border border-[#E8E2D5] space-y-1">
                      <Truck className="w-4 h-4 text-[#1E6B7B]" />
                      <span className="font-bold text-[#1B2E3D] block text-[11px]">Free Shipping</span>
                      <p className="text-[10px] text-[#6B7B88]">Complimentary standard ground delivery on orders over $125.</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-[#E8E2D5] space-y-1">
                      <RefreshCw className="w-4 h-4 text-[#1E6B7B]" />
                      <span className="font-bold text-[#1B2E3D] block text-[11px]">30-Day Returns</span>
                      <p className="text-[10px] text-[#6B7B88]">Effortless prepaid returns in unworn condition with tags.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 4: Verified Island Reviews */}
            <div id="pdp-reviews-section">
              <button
                onClick={() => toggleAccordion('reviews')}
                className="w-full py-3.5 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-2">
                  <span className="font-serif text-sm font-bold text-[#1B2E3D]">
                    Verified Island Reviews
                  </span>
                  <span className="text-xs text-[#6B7B88] tabular-nums">
                    ({totalReviews})
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#6B7B88] transition-transform duration-200 ${
                    openAccordions.reviews ? 'rotate-180 text-[#1E6B7B]' : ''
                  }`}
                />
              </button>

              {openAccordions.reviews && (
                <div className="pb-4 space-y-3.5 text-xs text-[#475569] animate-in fade-in duration-200">
                  {/* Reviews Summary Card */}
                  <div className="p-3.5 bg-white rounded-2xl border border-[#E8E2D5] flex items-center justify-between gap-4">
                    <div className="text-center shrink-0">
                      <div className="text-3xl font-bold font-serif text-[#1B2E3D] tabular-nums">
                        {averageRating}
                      </div>
                      <div className="flex items-center justify-center text-[#E5B869] my-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(Number(averageRating))
                                ? 'fill-[#E5B869] text-[#E5B869]'
                                : 'text-[#CBD5E1]'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-[#788896] block tabular-nums">
                        {totalReviews} reviews
                      </span>
                    </div>

                    <div className="flex-1 space-y-1">
                      {[
                        { stars: '5★', pct: 86 },
                        { stars: '4★', pct: 10 },
                        { stars: '3★', pct: 4 }
                      ].map(bar => (
                        <div key={bar.stars} className="flex items-center gap-2 text-[10px] text-[#6B7B88]">
                          <span className="w-5">{bar.stars}</span>
                          <div className="flex-1 h-1.5 bg-[#EFEAE1] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#E5B869] rounded-full"
                              style={{ width: `${bar.pct}%` }}
                            />
                          </div>
                          <span className="w-6 text-right tabular-nums">{bar.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Write a review button */}
                  <button
                    onClick={() => setIsWriteReviewOpen(true)}
                    className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#F4EFE6] border border-[#DDD6C8] text-[#1B2E3D] text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <MessageSquarePlus className="w-3.5 h-3.5 text-[#1E6B7B]" />
                    <span>Write an Island Review</span>
                  </button>

                  {/* Review List */}
                  <div className="space-y-2.5">
                    {reviewsList.map(rev => (
                      <div
                        key={rev.id}
                        className="p-3 bg-white rounded-xl border border-[#E8E2D5] space-y-1 text-left"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-[#E5B869]">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < rev.rating
                                    ? 'fill-[#E5B869] text-[#E5B869]'
                                    : 'text-[#CBD5E1]'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] text-[#94A3B8]">{rev.date}</span>
                        </div>
                        <h4 className="font-bold text-[#1B2E3D] text-xs">{rev.title}</h4>
                        <p className="text-[11px] text-[#475569] leading-relaxed">{rev.comment}</p>
                        <div className="flex items-center gap-1 text-[10px] text-[#2E6F4E] font-medium pt-1">
                          <Check className="w-3 h-3" />
                          <span>{rev.author} (Verified Buyer)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 5: Complete the Island Look */}
          <div className="pt-6 border-t border-[#E8E2D5]">
            <div className="mb-3.5">
              <span className="text-[10px] tracking-wider uppercase text-[#6B7B88] font-bold block">
                Resort Coordination
              </span>
              <h3 className="font-serif text-lg font-bold text-[#1B2E3D]">
                Complete The Island Look
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {recommended.map(rec => (
                <ProductCard key={rec.id} product={rec} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Purchase Bar (Mobile Ergonomics) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#E8E2D5] p-3 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3">
          <div className="tabular-nums">
            <span className="text-[10px] uppercase text-[#6B7B88] block font-medium">Total</span>
            <span className="font-bold text-base text-[#1B2E3D]">
              ${(product.price * quantity).toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAddToBag}
            className={`flex-1 py-3 px-5 rounded-xl text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all ${
              isAddedSuccess
                ? 'bg-[#1E6B7B]'
                : 'bg-[#1B2E3D] hover:bg-[#132533]'
            }`}
          >
            {isAddedSuccess ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Added to Bag! ✓</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>
                  Add to Bag {selectedSize ? `· ${selectedSize}` : ''}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Full-Screen Image Lightbox Modal */}
      {isLightboxOpen && (
        <div className="absolute inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between text-white z-10">
            <span className="text-xs font-serif tracking-wider uppercase opacity-80">
              {product.name} ({activeImageIndex + 1}/{product.images.length})
            </span>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close image zoom"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Image with Navigation */}
          <div className="relative flex-1 flex items-center justify-center my-auto">
            {product.images.length > 1 && (
              <button
                onClick={() =>
                  setActiveImageIndex(
                    prev => (prev - 1 + product.images.length) % product.images.length
                  )
                }
                className="absolute left-2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors z-20"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="max-h-[75vh] max-w-full object-contain rounded-xl select-none"
              referrerPolicy="no-referrer"
            />

            {product.images.length > 1 && (
              <button
                onClick={() =>
                  setActiveImageIndex(prev => (prev + 1) % product.images.length)
                }
                className="absolute right-2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors z-20"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Thumbnails */}
          <div className="flex justify-center gap-2 overflow-x-auto py-2 z-10">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`w-12 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx
                    ? 'border-white scale-105'
                    : 'border-white/30 opacity-60'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Write a Review Modal */}
      {isWriteReviewOpen && (
        <div className="absolute inset-0 z-50 bg-[#FAF8F5] flex flex-col animate-in fade-in duration-200">
          <div className="px-4 py-3 border-b border-[#E8E2D5] bg-white flex items-center justify-between shrink-0">
            <h3 className="font-serif text-base font-bold text-[#1B2E3D]">
              Write an Island Review
            </h3>
            <button
              onClick={() => setIsWriteReviewOpen(false)}
              className="p-1 rounded-full text-[#1B2E3D] hover:bg-[#EBE5DB]"
              aria-label="Close review modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleAddReviewSubmit} className="flex-1 p-4 overflow-y-auto space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#788896] block mb-1">
                Reviewing
              </span>
              <p className="font-serif font-bold text-sm text-[#1B2E3D]">
                {product.name}
              </p>
            </div>

            {/* Rating Stars */}
            <div>
              <label className="text-xs font-bold text-[#1B2E3D] block mb-1.5">
                Overall Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReviewRating(star)}
                    className="p-1 text-[#E5B869] hover:scale-115 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= newReviewRating ? 'fill-[#E5B869]' : 'text-[#CBD5E1]'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Author */}
            <div>
              <label className="text-xs font-bold text-[#1B2E3D] block mb-1">
                Your Name & Resort Location
              </label>
              <input
                type="text"
                value={newReviewAuthor}
                onChange={e => setNewReviewAuthor(e.target.value)}
                placeholder="e.g. Elena M. from Palm Beach, FL"
                className="w-full px-3 py-2 bg-white border border-[#DDD6C8] rounded-xl text-xs text-[#1B2E3D] placeholder-[#94A3B8] focus:outline-none focus:border-[#1E6B7B]"
              />
            </div>

            {/* Review Title */}
            <div>
              <label className="text-xs font-bold text-[#1B2E3D] block mb-1">
                Review Headline *
              </label>
              <input
                type="text"
                required
                value={newReviewTitle}
                onChange={e => setNewReviewTitle(e.target.value)}
                placeholder="e.g. Unbelievable comfort and gorgeous color"
                className="w-full px-3 py-2 bg-white border border-[#DDD6C8] rounded-xl text-xs text-[#1B2E3D] placeholder-[#94A3B8] focus:outline-none focus:border-[#1E6B7B]"
              />
            </div>

            {/* Review Comment */}
            <div>
              <label className="text-xs font-bold text-[#1B2E3D] block mb-1">
                Your Island Experience *
              </label>
              <textarea
                required
                rows={4}
                value={newReviewComment}
                onChange={e => setNewReviewComment(e.target.value)}
                placeholder="Tell other travelers about the fabric drape, sizing, and how it holds up in warm weather..."
                className="w-full px-3 py-2 bg-white border border-[#DDD6C8] rounded-xl text-xs text-[#1B2E3D] placeholder-[#94A3B8] focus:outline-none focus:border-[#1E6B7B]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#1B2E3D] hover:bg-[#132533] text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-md"
              >
                Submit Island Review
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
