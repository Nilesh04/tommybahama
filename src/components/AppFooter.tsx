import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, RefreshCw, Truck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AppFooter: React.FC = () => {
  const { setIsStoreLocatorOpen, showToast, setIsAccountOpen } = useShop();

  const handleInfoClick = (title: string, message: string) => {
    showToast(message);
  };

  return (
    <footer className="bg-[#182736] text-[#E0DACE] pt-10 pb-24 px-4 border-t border-[#263C50]">
      <div className="max-w-7xl mx-auto">
        {/* Brand Pillar Trust Indicators */}
        <div className="grid grid-cols-3 gap-3 pb-8 mb-8 border-b border-[#2C445A] text-center">
          <div className="flex flex-col items-center">
            <Truck className="w-5 h-5 text-[#E5B869] mb-1.5" />
            <span className="text-[11px] font-semibold text-white">Free Shipping</span>
            <span className="text-[10px] text-white/60">On orders $125+</span>
          </div>
          <div className="flex flex-col items-center">
            <RefreshCw className="w-5 h-5 text-[#E5B869] mb-1.5" />
            <span className="text-[11px] font-semibold text-white">Island Easy Returns</span>
            <span className="text-[10px] text-white/60">30-day effortless returns</span>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-5 h-5 text-[#E5B869] mb-1.5" />
            <span className="text-[11px] font-semibold text-white">Pure Craftsmanship</span>
            <span className="text-[10px] text-white/60">Finest silks & linens</span>
          </div>
        </div>

        {/* Brand Header */}
        <div className="text-center mb-8">
          <h3 className="font-serif text-lg tracking-[0.2em] uppercase font-bold text-white mb-1">
            Tommy Bahama
          </h3>
          <p className="text-xs text-white/60 max-w-sm mx-auto">
            Purveyors of the relaxed island lifestyle since 1993. Make life one long weekend.
          </p>
        </div>

        {/* Quick Links Accordion / Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs mb-8">
          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-2.5">
              Customer Care
            </h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <button
                  onClick={() => handleInfoClick('Help Center', 'Customer Service: 1-866-986-8282 (Mon–Sat 9AM–6PM EST)')}
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleInfoClick('Shipping Policy', 'Standard delivery 3-5 business days. Express overnight available.')}
                  className="hover:text-white transition-colors"
                >
                  Shipping & Handling
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleInfoClick('Returns Policy', 'Free returns in-store or by mail with prepaid label.')}
                  className="hover:text-white transition-colors"
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsAccountOpen(true)}
                  className="hover:text-white transition-colors"
                >
                  Order Status
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-2.5">
              Discover Stores
            </h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <button
                  onClick={() => setIsStoreLocatorOpen(true)}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#E5B869]" />
                  <span>Find a Store Locator</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsStoreLocatorOpen(true)}
                  className="hover:text-white transition-colors"
                >
                  Marlin Bars & Dining
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleInfoClick('Styling', 'Complimentary in-store styling appointments available.')}
                  className="hover:text-white transition-colors"
                >
                  Book In-Store Styling
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-2.5">
              The Brand
            </h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <button
                  onClick={() => handleInfoClick('About', 'Inspired by the spirit of coastal living and timeless luxury resortwear.')}
                  className="hover:text-white transition-colors"
                >
                  About Tommy Bahama
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleInfoClick('Sustainability', 'Committed to organic cotton, linen, and recycled fibers.')}
                  className="hover:text-white transition-colors"
                >
                  Sustainable Materials
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleInfoClick('Careers', 'Join our island hospitality and retail family.')}
                  className="hover:text-white transition-colors"
                >
                  Careers
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px] mb-2.5">
              Connect With Us
            </h4>
            <div className="space-y-2 text-white/70">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#E5B869]" />
                <span>1-866-986-8282</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E5B869]" />
                <span>islandservice@demo.com</span>
              </p>
              <div className="pt-2 text-[10px] text-white/50 leading-normal">
                Prototype demonstration inspired by Tommy Bahama.
              </div>
            </div>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-6 border-t border-[#263C50] text-center text-[10px] text-white/45">
          <p>© {new Date().getFullYear()} Tommy Bahama Inspired Mobile App. Client demonstration prototype.</p>
        </div>
      </div>
    </footer>
  );
};
