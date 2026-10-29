import React, { useState } from 'react';
import { X, User, Package, MapPin, Heart, HelpCircle, LogOut, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { MockOrder } from '../types';

const INITIAL_MOCK_ORDERS: MockOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'TB-928410',
    date: 'October 18, 2026',
    status: 'Delivered',
    items: [
      {
        productName: 'Catalina Del Ray Silk Camp Shirt',
        color: 'Seafoam Mist',
        size: 'L',
        quantity: 1,
        price: 148,
        image: '/src/assets/images/category_men_linen_1793114084995.jpg'
      },
      {
        productName: 'Boracay 8-Inch Island Chino Shorts',
        color: 'Khaki Stone',
        size: '34',
        quantity: 1,
        price: 98,
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80'
      }
    ],
    shippingAddress: '742 Evergreen Terrace, Honolulu, HI 96815',
    total: 246.00
  },
  {
    id: 'ord-102',
    orderNumber: 'TB-884192',
    date: 'September 2, 2026',
    status: 'Delivered',
    items: [
      {
        productName: 'Sunseeker Cabana Striped Velour Beach Towel',
        color: 'Nautical Navy & Cream',
        size: 'Oversized',
        quantity: 2,
        price: 58,
        image: '/src/assets/images/category_beach_home_1793114085331.jpg'
      }
    ],
    shippingAddress: '742 Evergreen Terrace, Honolulu, HI 96815',
    total: 116.00
  }
];

export const AccountModal: React.FC = () => {
  const { isAccountOpen, setIsAccountOpen, navigateToTab, showToast } = useShop();
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [activeSection, setActiveSection] = useState<'profile' | 'orders' | 'addresses'>('profile');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  if (!isAccountOpen) return null;

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSignedIn(true);
    showToast('Signed in as Kai Sterling (Demo Account)');
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    showToast('Signed out of demo account');
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-[#FAF8F5] text-left animate-in fade-in duration-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#E8E2D5] bg-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-[#1E6B7B]" />
          <h3 className="font-serif text-lg font-bold text-[#1B2E3D]">
            {isSignedIn ? 'My Island Account' : 'Welcome to Tommy Bahama'}
          </h3>
        </div>
        <button
          onClick={() => setIsAccountOpen(false)}
          className="p-1 rounded-full text-[#1B2E3D] hover:bg-[#EBE5DB]"
          aria-label="Close account modal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

        {/* Body */}
        {isSignedIn ? (
          <div className="flex-1 overflow-y-auto">
            {/* Profile Overview Card */}
            <div className="p-5 bg-gradient-to-br from-[#1B2E3D] to-[#254157] text-white">
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-12 h-12 rounded-full bg-[#E5B869] text-[#1B2E3D] font-serif font-bold text-lg flex items-center justify-center shadow-md">
                  KS
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-white">
                    Kai Sterling
                  </h4>
                  <p className="text-xs text-white/70">
                    kai.sterling@islanddemo.com
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-[#E5B869] font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Island Club Rewards: 1,420 Pts</span>
                </span>
                <span className="text-white/60 text-[11px]">Resort Elite Tier</span>
              </div>
            </div>

            {/* Sub-navigation tabs */}
            <div className="flex border-b border-[#E8E2D5] bg-white">
              <button
                onClick={() => setActiveSection('profile')}
                className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider text-center transition-colors border-b-2 ${
                  activeSection === 'profile'
                    ? 'border-[#1E6B7B] text-[#1E6B7B]'
                    : 'border-transparent text-[#6B7B88] hover:text-[#1B2E3D]'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveSection('orders')}
                className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider text-center transition-colors border-b-2 ${
                  activeSection === 'orders'
                    ? 'border-[#1E6B7B] text-[#1E6B7B]'
                    : 'border-transparent text-[#6B7B88] hover:text-[#1B2E3D]'
                }`}
              >
                Order History (2)
              </button>
              <button
                onClick={() => setActiveSection('addresses')}
                className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wider text-center transition-colors border-b-2 ${
                  activeSection === 'addresses'
                    ? 'border-[#1E6B7B] text-[#1E6B7B]'
                    : 'border-transparent text-[#6B7B88] hover:text-[#1B2E3D]'
                }`}
              >
                Addresses
              </button>
            </div>

            {/* Content per tab */}
            <div className="p-5 space-y-4">
              {activeSection === 'profile' && (
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-2xl border border-[#E8E2D5] space-y-3">
                    <button
                      onClick={() => setActiveSection('orders')}
                      className="w-full flex items-center justify-between py-1.5 text-xs text-[#1B2E3D] hover:text-[#1E6B7B]"
                    >
                      <div className="flex items-center gap-2.5">
                        <Package className="w-4 h-4 text-[#1E6B7B]" />
                        <span className="font-semibold">View Past Orders & Tracking</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
                    </button>

                    <button
                      onClick={() => {
                        setIsAccountOpen(false);
                        navigateToTab('favorites');
                      }}
                      className="w-full flex items-center justify-between py-1.5 text-xs text-[#1B2E3D] hover:text-[#1E6B7B]"
                    >
                      <div className="flex items-center gap-2.5">
                        <Heart className="w-4 h-4 text-[#DE7056]" />
                        <span className="font-semibold">My Saved Favorites</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
                    </button>

                    <button
                      onClick={() => setActiveSection('addresses')}
                      className="w-full flex items-center justify-between py-1.5 text-xs text-[#1B2E3D] hover:text-[#1E6B7B]"
                    >
                      <div className="flex items-center gap-2.5">
                        <MapPin className="w-4 h-4 text-[#1E6B7B]" />
                        <span className="font-semibold">Saved Shipping Addresses</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
                    </button>
                  </div>

                  {/* Customer Service Help Box */}
                  <div className="bg-[#FAF0E1] p-4 rounded-2xl border border-[#EED7B7] flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-[#8F5A1D] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-serif text-xs font-bold text-[#633D10]">
                        Need Personal Styling or Help?
                      </h5>
                      <p className="text-[11px] text-[#7A4E1B] mt-0.5 leading-relaxed">
                        Our island specialists are available 7 days a week at 1-866-986-8282 or via chat.
                      </p>
                    </div>
                  </div>

                  {/* Sign Out Button */}
                  <button
                    onClick={handleSignOut}
                    className="w-full py-2.5 px-4 rounded-xl border border-[#DDD6C8] bg-white hover:bg-[#F2EDE4] text-xs font-semibold text-[#8B261E] flex items-center justify-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out of Demo Account</span>
                  </button>
                </div>
              )}

              {activeSection === 'orders' && (
                <div className="space-y-3">
                  {INITIAL_MOCK_ORDERS.map(order => (
                    <div
                      key={order.id}
                      className="bg-white p-4 rounded-2xl border border-[#E8E2D5] text-xs"
                    >
                      <div className="flex items-center justify-between pb-2.5 border-b border-[#F0EBE1] mb-2.5">
                        <div>
                          <span className="font-bold text-[#1B2E3D] block">{order.orderNumber}</span>
                          <span className="text-[10px] text-[#6B7B88]">{order.date}</span>
                        </div>
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-[#2E6F4E] bg-[#2E6F4E]/10 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{order.status}</span>
                        </span>
                      </div>

                      <div className="space-y-2 mb-3">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2.5">
                            <img
                              src={item.image}
                              alt={item.productName}
                              className="w-10 h-10 object-cover rounded-lg bg-[#F5F2EB]"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-[#1B2E3D] truncate">{item.productName}</p>
                              <p className="text-[10px] text-[#6B7B88]">
                                {item.color} · Size {item.size} · Qty {item.quantity}
                              </p>
                            </div>
                            <span className="font-bold tabular-nums text-[#1B2E3D]">${item.price}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-[#F0EBE1] flex items-center justify-between text-[11px] text-[#6B7B88]">
                        <span>Shipped to: Honolulu, HI</span>
                        <span className="font-bold text-xs text-[#1B2E3D] tabular-nums">
                          Total: ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'addresses' && (
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded-2xl border border-[#1E6B7B] relative text-xs">
                    <span className="text-[10px] uppercase font-bold text-[#1E6B7B] tracking-wider mb-1 block">
                      Default Shipping Address
                    </span>
                    <h5 className="font-bold text-[#1B2E3D] text-sm">Kai Sterling</h5>
                    <p className="text-[#6B7B88] mt-1 leading-relaxed">
                      742 Evergreen Terrace<br />
                      Apt 4B<br />
                      Honolulu, HI 96815<br />
                      United States
                    </p>
                    <p className="text-[11px] text-[#6B7B88] mt-2">Phone: (808) 555-0192</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Sign In Form */
          <div className="p-6">
            <div className="text-center mb-6">
              <h4 className="font-serif text-xl font-bold text-[#1B2E3D] mb-1">
                Sign In to Your Island Account
              </h4>
              <p className="text-xs text-[#6B7B88]">
                Track orders, save favorite styles, and access exclusive island rewards.
              </p>
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#1B2E3D] block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="e.g. kai.sterling@islanddemo.com"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DDD6C8] rounded-xl text-xs text-[#1B2E3D] focus:outline-none focus:border-[#1E6B7B]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#1B2E3D] block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#DDD6C8] rounded-xl text-xs text-[#1B2E3D] focus:outline-none focus:border-[#1E6B7B]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#1B2E3D] hover:bg-[#132533] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
              >
                Sign In (Demo Account)
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignedIn(true);
                    showToast('Created simulated island account');
                  }}
                  className="text-xs font-semibold text-[#1E6B7B] hover:underline"
                >
                  Create New Account
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Footer */}
        <div className="p-3.5 border-t border-[#E8E2D5] bg-white flex justify-end">
          <button
            onClick={() => setIsAccountOpen(false)}
            className="py-2 px-5 rounded-xl bg-[#1B2E3D] text-white text-xs font-semibold uppercase tracking-wider"
          >
            Close
          </button>
        </div>
    </div>
  );
};
