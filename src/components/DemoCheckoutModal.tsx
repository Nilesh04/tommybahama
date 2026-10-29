import React, { useState } from 'react';
import { X, ArrowLeft, Check, ShieldCheck, Truck, CreditCard, Lock, CheckCircle2, ChevronRight, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const DemoCheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartItems,
    cartSubtotal,
    discountAmount,
    estimatedTax,
    clearBag,
    navigateToTab,
    showToast
  } = useShop();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  // Form states with realistic default demo data so testing is super smooth!
  const [contact, setContact] = useState({
    email: 'kai.sterling@islanddemo.com',
    firstName: 'Kai',
    lastName: 'Sterling',
    phone: '(808) 555-0192'
  });

  const [shipping, setShipping] = useState({
    address: '742 Evergreen Terrace',
    apt: 'Apt 4B',
    city: 'Honolulu',
    state: 'HI',
    zip: '96815',
    country: 'United States'
  });

  const [shippingMethod, setShippingMethod] = useState<{
    id: string;
    name: string;
    price: number;
    days: string;
  }>({
    id: 'standard',
    name: 'Resort Standard Ground',
    price: cartSubtotal >= 125 ? 0 : 9.99,
    days: '3-5 Business Days'
  });

  const [payment, setPayment] = useState({
    method: 'card' as 'card' | 'apple_pay',
    cardNumber: '•••• •••• •••• 4242',
    expDate: '08/29',
    cvc: '888',
    nameOnCard: 'Kai Sterling'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [completedOrderNumber, setCompletedOrderNumber] = useState('');

  if (!isCheckoutOpen) return null;

  const currentTotal = Math.max(0, cartSubtotal - discountAmount + shippingMethod.price + (cartSubtotal > 0 ? estimatedTax : 0));

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!contact.email.includes('@')) errs.email = 'Valid email required';
    if (!contact.firstName) errs.firstName = 'First name required';
    if (!contact.lastName) errs.lastName = 'Last name required';
    if (!contact.phone) errs.phone = 'Phone number required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!shipping.address) errs.address = 'Street address required';
    if (!shipping.city) errs.city = 'City required';
    if (!shipping.state) errs.state = 'State required';
    if (!shipping.zip) errs.zip = 'Postal code required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      setStep(5);
    } else if (step === 5) {
      // Complete Order simulation
      const orderNum = `TB-${Math.floor(100000 + Math.random() * 900000)}`;
      setCompletedOrderNumber(orderNum);
      setStep(6);
      clearBag();
      showToast(`Order ${orderNum} confirmed successfully!`);
    }
  };

  const handleBack = () => {
    if (step > 1 && step < 6) {
      setStep((step - 1) as any);
    }
  };

  const handleFinish = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    navigateToTab('home');
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-[#FAF8F5] text-left animate-in fade-in duration-200 overflow-hidden">
      {/* Header */}
      <div className="px-3.5 py-2.5 border-b border-[#E8E2D5] bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            {step > 1 && step < 6 && (
              <button
                onClick={handleBack}
                className="p-1 rounded-full text-[#1B2E3D] hover:bg-[#F2EDE4]"
                aria-label="Previous step"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-[#1E6B7B] block">
                {step === 6 ? 'Confirmed' : `Step ${step} of 5`}
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#1B2E3D]">
                {step === 1 && 'Contact Information'}
                {step === 2 && 'Shipping Address'}
                {step === 3 && 'Shipping Method'}
                {step === 4 && 'Payment Method'}
                {step === 5 && 'Review Your Order'}
                {step === 6 && 'Order Confirmed'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-[#2E6F4E]/10 text-[#2E6F4E] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Simulated Demo</span>
            </span>
            <button
              onClick={() => {
                if (step === 6) handleFinish();
                else setIsCheckoutOpen(false);
              }}
              className="p-1 rounded-full text-[#1B2E3D] hover:bg-[#EBE5DB]"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Progress Bar */}
        {step < 6 && (
          <div className="w-full bg-[#E8E2D5] h-1 flex">
            <div
              className="bg-[#1E6B7B] h-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        )}

        {/* Step Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* STEP 1: CONTACT */}
          {step === 1 && (
            <div className="space-y-3.5">
              <div className="bg-[#FAF0E1] p-3 rounded-xl border border-[#EED7B7] text-[#633D10] text-[11px]">
                Enter contact details for order confirmation and island delivery updates.
              </div>

              <div>
                <label className="font-semibold text-[#1B2E3D] block mb-1">Email Address *</label>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  placeholder="your.email@island.com"
                  className={`w-full px-3.5 py-2.5 bg-white border rounded-xl focus:outline-none focus:border-[#1E6B7B] ${
                    errors.email ? 'border-red-500' : 'border-[#DDD6C8]'
                  }`}
                />
                {errors.email && <span className="text-red-500 text-[10px] mt-0.5 block">{errors.email}</span>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#1B2E3D] block mb-1">First Name *</label>
                  <input
                    type="text"
                    value={contact.firstName}
                    onChange={(e) => setContact({ ...contact, firstName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-xl focus:outline-none focus:border-[#1E6B7B] ${
                      errors.firstName ? 'border-red-500' : 'border-[#DDD6C8]'
                    }`}
                  />
                  {errors.firstName && <span className="text-red-500 text-[10px] mt-0.5 block">{errors.firstName}</span>}
                </div>
                <div>
                  <label className="font-semibold text-[#1B2E3D] block mb-1">Last Name *</label>
                  <input
                    type="text"
                    value={contact.lastName}
                    onChange={(e) => setContact({ ...contact, lastName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-xl focus:outline-none focus:border-[#1E6B7B] ${
                      errors.lastName ? 'border-red-500' : 'border-[#DDD6C8]'
                    }`}
                  />
                  {errors.lastName && <span className="text-red-500 text-[10px] mt-0.5 block">{errors.lastName}</span>}
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#1B2E3D] block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  placeholder="(808) 555-0192"
                  className={`w-full px-3.5 py-2.5 bg-white border rounded-xl focus:outline-none focus:border-[#1E6B7B] ${
                    errors.phone ? 'border-red-500' : 'border-[#DDD6C8]'
                  }`}
                />
                {errors.phone && <span className="text-red-500 text-[10px] mt-0.5 block">{errors.phone}</span>}
              </div>
            </div>
          )}

          {/* STEP 2: SHIPPING ADDRESS */}
          {step === 2 && (
            <div className="space-y-3.5">
              <div>
                <label className="font-semibold text-[#1B2E3D] block mb-1">Street Address *</label>
                <input
                  type="text"
                  value={shipping.address}
                  onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                  placeholder="742 Evergreen Terrace"
                  className={`w-full px-3.5 py-2.5 bg-white border rounded-xl focus:outline-none focus:border-[#1E6B7B] ${
                    errors.address ? 'border-red-500' : 'border-[#DDD6C8]'
                  }`}
                />
                {errors.address && <span className="text-red-500 text-[10px] mt-0.5 block">{errors.address}</span>}
              </div>

              <div>
                <label className="font-semibold text-[#1B2E3D] block mb-1">Apartment, Suite, Unit (Optional)</label>
                <input
                  type="text"
                  value={shipping.apt}
                  onChange={(e) => setShipping({ ...shipping, apt: e.target.value })}
                  placeholder="Apt 4B"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DDD6C8] rounded-xl focus:outline-none focus:border-[#1E6B7B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#1B2E3D] block mb-1">City *</label>
                  <input
                    type="text"
                    value={shipping.city}
                    onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-xl focus:outline-none focus:border-[#1E6B7B] ${
                      errors.city ? 'border-red-500' : 'border-[#DDD6C8]'
                    }`}
                  />
                  {errors.city && <span className="text-red-500 text-[10px] mt-0.5 block">{errors.city}</span>}
                </div>
                <div>
                  <label className="font-semibold text-[#1B2E3D] block mb-1">State / Territory *</label>
                  <input
                    type="text"
                    value={shipping.state}
                    onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                    placeholder="HI"
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-xl focus:outline-none focus:border-[#1E6B7B] ${
                      errors.state ? 'border-red-500' : 'border-[#DDD6C8]'
                    }`}
                  />
                  {errors.state && <span className="text-red-500 text-[10px] mt-0.5 block">{errors.state}</span>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#1B2E3D] block mb-1">Postal Code *</label>
                  <input
                    type="text"
                    value={shipping.zip}
                    onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-xl focus:outline-none focus:border-[#1E6B7B] ${
                      errors.zip ? 'border-red-500' : 'border-[#DDD6C8]'
                    }`}
                  />
                  {errors.zip && <span className="text-red-500 text-[10px] mt-0.5 block">{errors.zip}</span>}
                </div>
                <div>
                  <label className="font-semibold text-[#1B2E3D] block mb-1">Country</label>
                  <input
                    type="text"
                    disabled
                    value={shipping.country}
                    className="w-full px-3.5 py-2.5 bg-[#F0EBE1] border border-[#DDD6C8] rounded-xl text-[#6B7B88] cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SHIPPING METHOD */}
          {step === 3 && (
            <div className="space-y-3">
              {[
                {
                  id: 'standard',
                  name: 'Resort Standard Ground',
                  price: cartSubtotal >= 125 ? 0 : 9.99,
                  days: '3-5 Business Days',
                  desc: cartSubtotal >= 125 ? 'Free on orders $125+' : 'Reliable island doorstep delivery'
                },
                {
                  id: 'expedited',
                  name: 'Island Express Priority',
                  price: 19.99,
                  days: '2 Business Days',
                  desc: 'Fast tracking via air courier'
                },
                {
                  id: 'overnight',
                  name: 'Next-Day Lanai Rush',
                  price: 34.99,
                  days: 'Next Day by 3 PM',
                  desc: 'Guaranteed urgent delivery for upcoming getaway'
                }
              ].map(opt => {
                const isSelected = shippingMethod.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setShippingMethod(opt)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-white border-[#1E6B7B] shadow-sm ring-1 ring-[#1E6B7B]'
                        : 'bg-white border-[#E5E0D5] hover:border-[#1B2E3D]'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-[#1E6B7B]" />
                        <span className="font-bold text-[#1B2E3D] text-xs">{opt.name}</span>
                      </div>
                      <p className="text-[11px] text-[#6B7B88]">{opt.desc} · {opt.days}</p>
                    </div>
                    <span className="font-bold text-[#1B2E3D] tabular-nums text-xs">
                      {opt.price === 0 ? 'FREE' : `$${opt.price.toFixed(2)}`}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* STEP 4: PAYMENT (DEMO ONLY) */}
          {step === 4 && (
            <div className="space-y-3.5">
              <div className="bg-[#EBF3F5] p-3 rounded-xl border border-[#CCE2E7] text-[#134954] text-[11px] flex items-center gap-2">
                <Lock className="w-4 h-4 shrink-0 text-[#1E6B7B]" />
                <span>Demo mode: Safe simulated payment. No real credit card charge occurs.</span>
              </div>

              {/* Payment Method Switcher */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPayment({ ...payment, method: 'card' })}
                  className={`py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 font-semibold ${
                    payment.method === 'card'
                      ? 'bg-[#1B2E3D] text-white border-[#1B2E3D]'
                      : 'bg-white border-[#DDD6C8] text-[#1B2E3D]'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Credit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPayment({ ...payment, method: 'apple_pay' })}
                  className={`py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 font-semibold ${
                    payment.method === 'apple_pay'
                      ? 'bg-black text-white border-black'
                      : 'bg-white border-[#DDD6C8] text-[#1B2E3D]'
                  }`}
                >
                  <span> Pay Demo</span>
                </button>
              </div>

              {payment.method === 'card' ? (
                <div className="space-y-3 bg-white p-4 rounded-2xl border border-[#E8E2D5]">
                  <div>
                    <label className="font-semibold text-[#1B2E3D] block mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      value={payment.nameOnCard}
                      onChange={(e) => setPayment({ ...payment, nameOnCard: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F8F6F0] border border-[#DDD6C8] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#1B2E3D] block mb-1">Card Number (Simulated)</label>
                    <input
                      type="text"
                      value={payment.cardNumber}
                      onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-[#F8F6F0] border border-[#DDD6C8] rounded-lg font-mono tabular-nums"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-semibold text-[#1B2E3D] block mb-1">Expiration</label>
                      <input
                        type="text"
                        value={payment.expDate}
                        onChange={(e) => setPayment({ ...payment, expDate: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F8F6F0] border border-[#DDD6C8] rounded-lg font-mono tabular-nums"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-[#1B2E3D] block mb-1">Security Code</label>
                      <input
                        type="text"
                        value={payment.cvc}
                        onChange={(e) => setPayment({ ...payment, cvc: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F8F6F0] border border-[#DDD6C8] rounded-lg font-mono tabular-nums"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-2xl border border-[#E8E2D5] text-center space-y-2">
                  <div className="text-xl font-bold"> Pay Instant Checkout</div>
                  <p className="text-xs text-[#6B7B88]">
                    Ready to authenticate with biometric Face ID / Touch ID simulation.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: REVIEW */}
          {step === 5 && (
            <div className="space-y-4">
              {/* Items Preview */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8E2D5]">
                <h4 className="font-bold text-[#1B2E3D] mb-2.5 flex items-center justify-between">
                  <span>Bag Items ({cartItems.length})</span>
                  <span className="text-[#1E6B7B] cursor-pointer" onClick={() => setStep(1)}>Edit</span>
                </h4>
                <div className="space-y-2.5 divide-y divide-[#F0EBE1]">
                  {cartItems.map(item => (
                    <div key={item.id} className="pt-2 first:pt-0 flex items-center gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-14 object-cover rounded-lg bg-[#F5F2EB]"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#1B2E3D] truncate">{item.product.name}</p>
                        <p className="text-[10px] text-[#6B7B88]">{item.selectedColor} · Size {item.selectedSize} · Qty {item.quantity}</p>
                      </div>
                      <span className="font-bold text-xs text-[#1B2E3D] tabular-nums">
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address Summary */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8E2D5]">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-[#1B2E3D]">Shipping To</h4>
                  <button onClick={() => setStep(2)} className="text-[11px] text-[#1E6B7B] font-semibold">Change</button>
                </div>
                <p className="text-[#6B7B88] leading-relaxed">
                  {contact.firstName} {contact.lastName}<br />
                  {shipping.address} {shipping.apt}<br />
                  {shipping.city}, {shipping.state} {shipping.zip}<br />
                  {contact.phone}
                </p>
              </div>

              {/* Delivery Method Summary */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8E2D5] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[#1B2E3D]">{shippingMethod.name}</h4>
                  <p className="text-[11px] text-[#6B7B88]">{shippingMethod.days}</p>
                </div>
                <span className="font-bold text-[#1B2E3D] tabular-nums">
                  {shippingMethod.price === 0 ? 'FREE' : `$${shippingMethod.price.toFixed(2)}`}
                </span>
              </div>

              {/* Totals Breakdown */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8E2D5] space-y-1.5 tabular-nums">
                <div className="flex justify-between text-[#6B7B88]">
                  <span>Subtotal</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#2E6F4E] font-medium">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#6B7B88]">
                  <span>Shipping</span>
                  <span>{shippingMethod.price === 0 ? 'FREE' : `$${shippingMethod.price.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-[#6B7B88]">
                  <span>Estimated Tax (8.25%)</span>
                  <span>${estimatedTax.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-[#F0EBE1] flex justify-between font-bold text-sm text-[#1B2E3D]">
                  <span>Total Amount</span>
                  <span>${currentTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: ORDER SUCCESS CONFIRMATION */}
          {step === 6 && (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#2E6F4E]/10 text-[#2E6F4E] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#2E6F4E] font-bold">
                  Order Successfully Placed
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1B2E3D] mt-1">
                  Mahalo, {contact.firstName}!
                </h3>
                <p className="text-xs text-[#6B7B88] mt-1">
                  Your simulated order has been placed. We sent a receipt to <span className="font-semibold text-[#1B2E3D]">{contact.email}</span>.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#E8E2D5] text-left max-w-sm mx-auto space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-[#6B7B88]">Order Number:</span>
                  <span className="font-bold text-[#1B2E3D] font-mono">{completedOrderNumber}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#6B7B88]">Estimated Delivery:</span>
                  <span className="font-semibold text-[#1B2E3D]">Thursday, Oct 29</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#6B7B88]">Carrier:</span>
                  <span className="font-semibold text-[#1B2E3D]">Island Air Express</span>
                </div>
                <div className="flex justify-between text-xs pt-2 border-t border-[#F0EBE1]">
                  <span className="text-[#6B7B88]">Destination:</span>
                  <span className="font-semibold text-[#1B2E3D]">{shipping.city}, {shipping.state}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleFinish}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#1B2E3D] hover:bg-[#132533] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg shadow-black/10"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Next Button */}
        {step < 6 && (
          <div className="p-4 border-t border-[#E8E2D5] bg-white flex items-center justify-between gap-3">
            <div className="tabular-nums">
              <span className="text-[10px] uppercase text-[#6B7B88] block">Total</span>
              <span className="font-bold text-base text-[#1B2E3D]">${currentTotal.toFixed(2)}</span>
            </div>

            <button
              onClick={handleNext}
              className="py-3 px-6 rounded-xl bg-[#1B2E3D] hover:bg-[#132533] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-md"
            >
              <span>{step === 5 ? 'Place Demo Order' : 'Continue'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
    </div>
  );
};
