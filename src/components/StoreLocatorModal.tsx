import React, { useState } from 'react';
import { X, MapPin, Phone, Clock, Navigation, Search, CheckCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { MOCK_STORES } from '../data/stores';

export const StoreLocatorModal: React.FC = () => {
  const { isStoreLocatorOpen, setIsStoreLocatorOpen, showToast } = useShop();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

  if (!isStoreLocatorOpen) return null;

  const filteredStores = MOCK_STORES.filter(store => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      store.name.toLowerCase().includes(q) ||
      store.city.toLowerCase().includes(q) ||
      store.state.toLowerCase().includes(q) ||
      store.zip.includes(q)
    );
  });

  const handleDirections = (storeName: string) => {
    showToast(`Opening simulated directions to ${storeName}`);
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-[#FAF8F5] text-left animate-in fade-in duration-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#E8E2D5] bg-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-[#1E6B7B] mb-0.5">
              <MapPin className="w-4 h-4" />
              <span className="text-[10px] uppercase font-bold tracking-widest">
                Store Locator
              </span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1B2E3D]">
              Find a Tommy Bahama
            </h3>
          </div>
          <button
            onClick={() => setIsStoreLocatorOpen(false)}
            className="p-1 rounded-full text-[#1B2E3D] hover:bg-[#EBE5DB]"
            aria-label="Close store locator"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-[#E8E2D5] bg-[#F4EFE6]">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-[#6B7B88]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, state, or ZIP code (e.g. Honolulu, Naples, 92262)"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DDD6C8] rounded-xl text-xs text-[#1B2E3D] placeholder-[#94A3B8] focus:outline-none focus:border-[#1E6B7B]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-xs text-[#6B7B88] hover:text-[#1B2E3D]"
              >
                Clear
              </button>
            )}
          </div>
          <span className="text-[10px] text-[#788896] mt-1.5 block">
            Showing {filteredStores.length} demo locations · All store hours and dining available
          </span>
        </div>

        {/* Store List */}
        <div className="p-4 overflow-y-auto space-y-3.5 flex-1 divide-y divide-[#EFEAE1]">
          {filteredStores.map(store => (
            <div
              key={store.id}
              className={`pt-3.5 first:pt-0 transition-colors ${
                selectedStoreId === store.id ? 'bg-[#1E6B7B]/5 -mx-4 px-4 py-3 rounded-xl' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#1E6B7B] bg-[#1E6B7B]/10 px-2 py-0.5 rounded-sm inline-block mb-1">
                    {store.type}
                  </span>
                  <h4 className="font-serif text-base font-bold text-[#1B2E3D] leading-snug">
                    {store.name}
                  </h4>
                </div>
                {store.distance && (
                  <span className="text-xs font-semibold text-[#1B2E3D] bg-white border border-[#E8E2D5] px-2 py-0.5 rounded-md tabular-nums shrink-0">
                    {store.distance}
                  </span>
                )}
              </div>

              {/* Address & Contacts */}
              <div className="space-y-1 text-xs text-[#4E6171] mb-2.5">
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#1B2E3D] shrink-0" />
                  <span>{store.address}, {store.city}, {store.state} {store.zip}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#1B2E3D] shrink-0" />
                  <span>{store.hours}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#1B2E3D] shrink-0" />
                  <span>{store.phone}</span>
                </p>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {store.features.map((feat, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] text-[#55697A] bg-white border border-[#E5E0D5] px-2 py-0.5 rounded-sm"
                  >
                    {feat}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDirections(store.name)}
                  className="flex-1 py-2 px-3 rounded-lg bg-[#1B2E3D] hover:bg-[#132533] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>View Directions</span>
                </button>
                <a
                  href={`tel:${store.phone.replace(/[^0-9]/g, '')}`}
                  className="py-2 px-3 rounded-lg border border-[#DDD6C8] bg-white hover:bg-[#F2EDE4] text-xs font-semibold text-[#1B2E3D] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>
              </div>
            </div>
          ))}

          {filteredStores.length === 0 && (
            <div className="py-12 text-center text-[#6B7B88]">
              <MapPin className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-semibold text-[#1B2E3D]">No demo stores found</p>
              <p className="text-xs text-[#6B7B88] mt-1">Try searching for Honolulu, Palm Springs, Naples, or Scottsdale.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-[#E8E2D5] bg-white flex items-center justify-between text-xs text-[#6B7B88]">
          <span className="text-[11px]">Island locations across HI, CA, FL, AZ, & TX</span>
          <button
            onClick={() => setIsStoreLocatorOpen(false)}
            className="text-xs font-semibold text-[#1E6B7B] hover:underline"
          >
            Close
          </button>
        </div>
    </div>
  );
};
