import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2 } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toastMessage } = useShop();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-auto max-w-[90vw]">
      <div className="bg-[#1B2E3D]/95 backdrop-blur-md text-[#F8F6F0] text-xs font-medium px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 border border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-200">
        <CheckCircle2 className="w-4 h-4 text-[#E5B869] shrink-0" />
        <span className="truncate">{toastMessage.text}</span>
      </div>
    </div>
  );
};
