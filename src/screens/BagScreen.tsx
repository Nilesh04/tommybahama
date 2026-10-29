import React, { useState } from 'react';
import { Trash2, ShoppingBag, ArrowRight, Truck, Tag, ShieldCheck, Plus, Minus, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const BagScreen: React.FC = () => {
  const {
    cartItems,
    updateCartQuantity,
    removeFromBag,
    cartSubtotal,
    freeShippingThreshold,
    shippingCost,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    discountAmount,
    estimatedTax,
    cartTotal,
    setIsCheckoutOpen,
    navigateToTab,
    openProductDetails
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  return (
    <div className="min-h-full pb-28 bg-[#FAF8F5]">
      {/* Header */}
      <div className="bg-[#FDFBF7] border-b border-[#E8E2D5] px-3.5 py-3 text-left">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl font-bold text-[#1B2E3D]">
              Shopping Bag
            </h1>
            <p className="text-[11px] text-[#788896] tabular-nums mt-0.5">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your bag
            </p>
          </div>

          {cartItems.length > 0 && (
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
        {cartItems.length > 0 ? (
          <div className="space-y-3">
            {/* Free Shipping Progress Indicator */}
            <div className="bg-white p-3 rounded-xl border border-[#E8E2D5] space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-[#1B2E3D]">
                <div className="flex items-center gap-1.5 text-[11px]">
                  <Truck className="w-3.5 h-3.5 text-[#1E6B7B]" />
                  <span>
                    {amountNeededForFreeShipping === 0 || appliedPromo?.freeShipping
                      ? 'You unlocked Free Resort Shipping!'
                      : `Add $${amountNeededForFreeShipping.toFixed(2)} for Free Shipping`}
                  </span>
                </div>
                <span className="text-[10px] text-[#788896] tabular-nums font-normal">
                  $125 Goal
                </span>
              </div>
              <div className="w-full bg-[#EFEAE1] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#1E6B7B] h-full rounded-full transition-all duration-300"
                  style={{ width: `${appliedPromo?.freeShipping ? 100 : freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Itemized List */}
            <div className="bg-white rounded-2xl border border-[#E8E2D5] divide-y divide-[#F0EBE1] overflow-hidden">
              {cartItems.map(item => (
                <div key={item.id} className="p-3 flex gap-2.5 items-start text-left">
                  {/* Item Image */}
                  <div
                    className="w-16 h-20 rounded-lg bg-[#F5F2EB] overflow-hidden shrink-0 cursor-pointer border border-[#E8E2D5]"
                    onClick={() => openProductDetails(item.productId)}
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Info & Stepper */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                    <div>
                      <div className="flex items-start justify-between gap-1.5">
                        <h3
                          onClick={() => openProductDetails(item.productId)}
                          className="font-serif text-xs font-semibold text-[#1B2E3D] hover:text-[#1E6B7B] cursor-pointer line-clamp-1 leading-snug"
                        >
                          {item.product.name}
                        </h3>
                        <button
                          onClick={() => removeFromBag(item.id)}
                          aria-label={`Remove ${item.product.name} from bag`}
                          className="text-[#94A3B8] hover:text-[#8B261E] p-0.5 rounded transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[10px] text-[#788896] mt-0.5 space-x-1.5">
                        <span>Color: <strong className="text-[#1B2E3D] font-medium">{item.selectedColor}</strong></span>
                        <span>·</span>
                        <span>Size: <strong className="text-[#1B2E3D] font-medium">{item.selectedSize}</strong></span>
                      </div>
                    </div>

                    <div className="pt-1.5 flex items-center justify-between">
                      {/* Stepper */}
                      <div className="flex items-center border border-[#DDD6C8] rounded-md overflow-hidden bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#1B2E3D] hover:bg-[#F2EDE4] active:scale-90"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="w-6 text-center font-bold text-xs text-[#1B2E3D] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#1B2E3D] hover:bg-[#F2EDE4] active:scale-90"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      {/* Line Total */}
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#1B2E3D] tabular-nums">
                          ${(item.unitPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Input Box */}
            <div className="bg-white p-4 rounded-3xl border border-[#E8E2D5] space-y-2 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1B2E3D] flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#1E6B7B]" />
                <span>Promotional Discount Code</span>
              </span>

              {appliedPromo ? (
                <div className="p-3 bg-[#2E6F4E]/10 border border-[#2E6F4E]/20 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#2E6F4E]">
                      Code "{appliedPromo.code}" applied
                    </span>
                    <span className="text-[11px] text-[#2E6F4E]/80 block">
                      {appliedPromo.discountPercent > 0
                        ? `${appliedPromo.discountPercent}% Off entire order`
                        : 'Free complimentary shipping'}
                    </span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="p-1 text-[#2E6F4E] hover:text-black"
                    aria-label="Remove promo code"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter code (e.g. ALOHA20, ISLANDFREE)"
                    className="flex-1 px-3.5 py-2.5 bg-[#F8F6F0] border border-[#DDD6C8] rounded-xl text-xs uppercase tracking-wider focus:outline-none focus:border-[#1E6B7B]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#1B2E3D] hover:bg-[#132533] text-white text-xs font-semibold rounded-xl uppercase tracking-wider transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </form>
              )}

              {promoError && (
                <p className="text-xs text-red-600 font-medium">{promoError}</p>
              )}

              <p className="text-[11px] text-[#6B7B88]">
                Valid test demo codes: <span className="font-semibold text-[#1B2E3D]">ALOHA20</span> (20% off) or <span className="font-semibold text-[#1B2E3D]">ISLANDFREE</span> (Free shipping).
              </p>
            </div>

            {/* Order Summary Card */}
            <div className="bg-white p-5 rounded-3xl border border-[#E8E2D5] space-y-2.5 tabular-nums text-left">
              <h3 className="font-serif text-base font-bold text-[#1B2E3D] mb-2">
                Order Summary
              </h3>

              <div className="flex justify-between text-xs text-[#6B7B88]">
                <span>Bag Subtotal</span>
                <span className="text-[#1B2E3D] font-medium">${cartSubtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-xs text-[#2E6F4E] font-medium">
                  <span>Promotional Savings ({appliedPromo?.code})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-xs text-[#6B7B88]">
                <span>Estimated Shipping</span>
                <span className="text-[#1B2E3D] font-medium">
                  {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-xs text-[#6B7B88]">
                <span>Estimated Tax (8.25% mock)</span>
                <span className="text-[#1B2E3D] font-medium">${estimatedTax.toFixed(2)}</span>
              </div>

              <div className="pt-3 border-t border-[#F0EBE1] flex justify-between font-bold text-base text-[#1B2E3D]">
                <span>Estimated Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full mt-4 py-4 px-6 rounded-2xl bg-[#1B2E3D] hover:bg-[#132533] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-black/10 active:scale-[0.99] transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Empty Bag Screen */
          <div className="py-20 text-center max-w-sm mx-auto bg-white rounded-3xl border border-[#E8E2D5] p-8 mt-6">
            <div className="w-16 h-16 rounded-full bg-[#FAF0E1] text-[#1E6B7B] flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1B2E3D] mb-1">
              Your Shopping Bag is Empty
            </h3>
            <p className="text-xs text-[#6B7B88] leading-relaxed mb-6">
              Looks like you haven't packed any island styles yet. Explore our silk shirts, breezy linen dresses, and resort accessories.
            </p>
            <button
              onClick={() => navigateToTab('shop')}
              className="py-3 px-6 rounded-full bg-[#1B2E3D] hover:bg-[#132533] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
