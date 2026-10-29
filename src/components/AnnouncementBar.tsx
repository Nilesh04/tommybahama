import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-[#1B2E3D] text-[#F8F6F0] text-xs py-2 px-4 transition-all relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex-1 flex items-center justify-center gap-2 text-center text-[11px] sm:text-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#E5B869] shrink-0" />
          <p className="font-medium tracking-wide">
            <span>Complimentary Resort Shipping on Orders $125+</span>
            <span className="hidden sm:inline text-white/40 mx-2">|</span>
            <span className="hidden sm:inline text-[#E5B869] font-semibold">Code: ALOHA20 for 20% Off</span>
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-white/60 hover:text-white p-1 rounded-sm focus:outline-none shrink-0"
          aria-label="Dismiss promotional announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
