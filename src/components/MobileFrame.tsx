import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Maximize2,
  Minimize2,
  Wifi,
  Battery,
  Sparkles,
  ShoppingBag,
  Heart,
  Palette,
  RotateCw,
  Monitor
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface MobileFrameProps {
  children: React.ReactNode;
}

type DeviceType = 'iphone' | 'pixel' | 'none';
type ChassisColor = 'black' | 'titanium' | 'navy' | 'sand';

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const { cartCount, toastMessage, favorites } = useShop();

  const [device, setDevice] = useState<DeviceType>('iphone');
  const [chassisColor, setChassisColor] = useState<ChassisColor>('black');
  const [scale, setScale] = useState<number>(1);
  const [isDynamicIslandActive, setIsDynamicIslandActive] = useState(false);
  const [dynamicIslandContent, setDynamicIslandContent] = useState<{ icon: 'cart' | 'heart' | 'info'; text: string } | null>(null);

  // Time in status bar
  const [timeStr, setTimeStr] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      // 12-hour format without AM/PM for clean iOS style
      const displayHours = hours % 12 || 12;
      setTimeStr(`${displayHours}:${formattedMinutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Responsive scale and viewport adaptation
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // On actual mobile phones or very narrow screens (< 600px), switch to frameless edge-to-edge
      if (w < 600) {
        setDevice('none');
        return;
      }

      // On desktop/tablets, compute ideal scale to fit available viewport height
      const targetHeight = 844 + 110;
      if (h < targetHeight) {
        const fitScale = Math.max(0.65, Math.min(1, (h - 90) / 844));
        setScale(Number(fitScale.toFixed(2)));
      } else {
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Trigger Dynamic Island pop animation on toast or cart change
  useEffect(() => {
    if (toastMessage) {
      const isFav = toastMessage.text.toLowerCase().includes('favorite');
      const isCart = toastMessage.text.toLowerCase().includes('bag') || toastMessage.text.toLowerCase().includes('cart');
      
      setDynamicIslandContent({
        icon: isFav ? 'heart' : isCart ? 'cart' : 'info',
        text: toastMessage.text.slice(0, 24)
      });
      setIsDynamicIslandActive(true);
      const timer = setTimeout(() => {
        setIsDynamicIslandActive(false);
      }, 2600);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const colorStyles = {
    black: {
      bezel: 'bg-[#18191B] border-[#2B2D31]',
      ring: 'shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.12),0_0_0_4px_#2B2D31,0_0_0_5px_#141517]',
      accent: '#2B2D31',
      label: 'Titanium Black'
    },
    titanium: {
      bezel: 'bg-[#403E3B] border-[#57534E]',
      ring: 'shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.2),0_0_0_4px_#57534E,0_0_0_5px_#2E2D2B]',
      accent: '#57534E',
      label: 'Natural Titanium'
    },
    navy: {
      bezel: 'bg-[#15222E] border-[#223547]',
      ring: 'shadow-[0_25px_60px_-15px_rgba(15,30,45,0.5),0_0_0_1px_rgba(255,255,255,0.15),0_0_0_4px_#223547,0_0_0_5px_#0E1720]',
      accent: '#223547',
      label: 'Island Navy'
    },
    sand: {
      bezel: 'bg-[#B0A290] border-[#C8BCAF]',
      ring: 'shadow-[0_25px_60px_-15px_rgba(60,50,40,0.35),0_0_0_1px_rgba(255,255,255,0.3),0_0_0_4px_#C8BCAF,0_0_0_5px_#8F8372]',
      accent: '#C8BCAF',
      label: 'Warm Sandstone'
    }
  };

  const selectedChassis = colorStyles[chassisColor];

  // If frameless mode is chosen by user
  if (device === 'none') {
    return (
      <div className="relative min-h-screen bg-[#ECE7DF] bg-[radial-gradient(#DCD5C9_1px,transparent_1px)] [background-size:16px_16px] flex flex-col items-center">
        {/* Floating toolbar to toggle back to frame */}
        <div className="fixed top-3 right-4 z-50">
          <button
            onClick={() => setDevice('iphone')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1B2E3D]/90 hover:bg-[#1B2E3D] text-[#F8F6F0] rounded-full text-xs font-medium shadow-lg backdrop-blur-md transition-all active:scale-95 border border-white/20"
            title="Switch back to Mobile Device Frame"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#E5B869]" />
            <span className="hidden sm:inline">Show Phone Frame</span>
          </button>
        </div>
        <div className="w-full max-w-[430px] min-h-screen bg-[#FAF8F5] shadow-2xl relative flex flex-col">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECE7DF] bg-[radial-gradient(#DCD5C9_1px,transparent_1px)] [background-size:16px_16px] text-[#1B2E3D] flex flex-col items-center justify-start p-2 sm:p-4 md:py-6 overflow-x-hidden selection:bg-[#1E6B7B]/15">
      {/* Top Prototype Control Bar (Desktop/Presentation) */}
      <header className="w-full max-w-4xl mx-auto mb-4 flex flex-wrap items-center justify-between gap-3 px-4 py-2 bg-white/80 backdrop-blur-md rounded-2xl border border-[#DCD5C9] shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-[#1B2E3D] text-[#E5B869] flex items-center justify-center font-serif font-bold text-xs shadow-xs">
            TB
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xs sm:text-sm font-bold text-[#1B2E3D]">
                Tommy Bahama Mobile App
              </span>
              <span className="text-[10px] bg-[#1E6B7B]/10 text-[#1E6B7B] font-semibold px-2 py-0.5 rounded-full">
                Interactive Prototype
              </span>
            </div>
            <span className="text-[11px] text-[#6B7B88] hidden sm:block">
              Client-ready mobile shopping experience · Touch & gesture optimized
            </span>
          </div>
        </div>

        {/* Prototype Toolbar Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Device Model Switcher */}
          <div className="flex items-center bg-[#F2EDE4] p-0.5 rounded-xl text-xs border border-[#DDD6C8]">
            <button
              onClick={() => setDevice('iphone')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                device === 'iphone'
                  ? 'bg-white text-[#1B2E3D] shadow-xs font-semibold'
                  : 'text-[#6B7B88] hover:text-[#1B2E3D]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">iPhone 16 Pro</span>
              <span className="sm:hidden">iPhone</span>
            </button>
            <button
              onClick={() => setDevice('pixel')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                device === 'pixel'
                  ? 'bg-white text-[#1B2E3D] shadow-xs font-semibold'
                  : 'text-[#6B7B88] hover:text-[#1B2E3D]'
              }`}
            >
              <span className="hidden sm:inline">Pixel 9 Pro</span>
              <span className="sm:hidden">Pixel</span>
            </button>
          </div>

          {/* Color Switcher */}
          <div className="hidden md:flex items-center gap-1 bg-[#F2EDE4] p-1 rounded-xl border border-[#DDD6C8]">
            {(['black', 'titanium', 'navy', 'sand'] as ChassisColor[]).map((c) => (
              <button
                key={c}
                onClick={() => setChassisColor(c)}
                title={colorStyles[c].label}
                className={`w-5 h-5 rounded-full transition-transform ${
                  chassisColor === c ? 'scale-115 ring-2 ring-[#1E6B7B]' : 'hover:scale-105 opacity-80'
                }`}
                style={{
                  backgroundColor:
                    c === 'black'
                      ? '#18191B'
                      : c === 'titanium'
                      ? '#57534E'
                      : c === 'navy'
                      ? '#15222E'
                      : '#C8BCAF'
                }}
              />
            ))}
          </div>

          {/* Scale Switcher */}
          <div className="hidden lg:flex items-center bg-[#F2EDE4] p-0.5 rounded-xl text-[11px] border border-[#DDD6C8]">
            {[1, 0.9, 0.82].map((s) => (
              <button
                key={s}
                onClick={() => setScale(s)}
                className={`px-2 py-0.5 rounded-md font-medium transition-colors ${
                  scale === s
                    ? 'bg-white text-[#1B2E3D] font-bold shadow-xs'
                    : 'text-[#6B7B88] hover:text-[#1B2E3D]'
                }`}
              >
                {Math.round(s * 100)}%
              </button>
            ))}
          </div>

          {/* Full Screen / Unframe Toggle */}
          <button
            onClick={() => setDevice('none')}
            title="Expand to Full Screen Viewport"
            className="p-1.5 rounded-xl bg-[#F2EDE4] hover:bg-white text-[#1B2E3D] border border-[#DDD6C8] transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Outer Device Chassis Wrapper */}
      <div
        className="relative transition-all duration-300 flex items-center justify-center my-auto shrink-0"
        style={{
          width: 390 * scale,
          height: 844 * scale
        }}
      >
        <div
          className="relative transition-transform duration-300 flex items-center justify-center shrink-0 origin-top"
          style={{ transform: `scale(${scale})` }}
        >
          {/* Hardware Buttons on Phone Edges */}
          {device === 'iphone' ? (
            <>
              {/* Left side: Action Button, Volume Up, Volume Down */}
              <div className="absolute -left-[5px] top-[108px] w-[5px] h-[28px] bg-[#3A3D42] rounded-l-sm" />
              <div className="absolute -left-[5px] top-[152px] w-[5px] h-[48px] bg-[#3A3D42] rounded-l-sm" />
              <div className="absolute -left-[5px] top-[210px] w-[5px] h-[48px] bg-[#3A3D42] rounded-l-sm" />
              {/* Right side: Power Button */}
              <div className="absolute -right-[5px] top-[158px] w-[5px] h-[68px] bg-[#3A3D42] rounded-r-sm" />
            </>
          ) : (
            <>
              {/* Pixel: Power & Volume on Right */}
              <div className="absolute -right-[5px] top-[140px] w-[5px] h-[40px] bg-[#3A3D42] rounded-r-sm" />
              <div className="absolute -right-[5px] top-[195px] w-[5px] h-[64px] bg-[#3A3D42] rounded-r-sm" />
            </>
          )}

          {/* Smartphone Chassis Frame */}
          <div
            className={`relative w-[390px] h-[844px] shrink-0 p-3 sm:p-3.5 rounded-[52px] ${selectedChassis.bezel} ${selectedChassis.ring} transition-all duration-300 flex flex-col`}
          >
          {/* Top Micro Speaker Slit */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-black/60 rounded-full z-40 pointer-events-none" />

          {/* Inner OLED Glass Screen Container */}
          <div className="relative w-full h-full rounded-[42px] overflow-hidden bg-[#FAF8F5] flex flex-col [transform:translateZ(0)] shadow-inner">
            {/* Native Mobile Status Bar (iOS / Android) */}
            <div className="relative h-11 px-6 bg-[#FDFBF7] text-[#1B2E3D] flex items-center justify-between text-xs font-semibold z-40 shrink-0 select-none border-b border-black/[0.04]">
              {/* Left: Clock */}
              <div className="w-16 flex items-center">
                <span className="font-semibold text-[13px] tracking-tight">{timeStr}</span>
              </div>

              {/* Center: Dynamic Island (iPhone) or Camera Punch Hole (Pixel) */}
              <div className="flex-1 flex justify-center items-center">
                {device === 'iphone' ? (
                  <div
                    className={`bg-black text-white rounded-full transition-all duration-300 flex items-center justify-between px-3 z-50 shadow-sm ${
                      isDynamicIslandActive
                        ? 'h-8 min-w-[210px] px-3.5 gap-2'
                        : 'h-[26px] w-[98px]'
                    }`}
                  >
                    {isDynamicIslandActive ? (
                      <>
                        <div className="flex items-center gap-1.5 text-xs">
                          {dynamicIslandContent?.icon === 'heart' && (
                            <Heart className="w-3.5 h-3.5 fill-[#DE7056] text-[#DE7056]" />
                          )}
                          {dynamicIslandContent?.icon === 'cart' && (
                            <ShoppingBag className="w-3.5 h-3.5 text-[#E5B869]" />
                          )}
                          {dynamicIslandContent?.icon === 'info' && (
                            <Sparkles className="w-3.5 h-3.5 text-[#E5B869]" />
                          )}
                          <span className="text-[11px] font-medium text-white truncate max-w-[120px]">
                            {dynamicIslandContent?.text || 'Tommy Bahama'}
                          </span>
                        </div>
                        <span className="w-2.5 h-2.5 rounded-full bg-[#1E6B7B] animate-pulse" />
                      </>
                    ) : (
                      <>
                        {/* Camera sensor dot */}
                        <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] ml-0.5" />
                        {/* Audio/sensor dot */}
                        <div className="w-2 h-2 rounded-full bg-[#151515] mr-0.5" />
                      </>
                    )}
                  </div>
                ) : (
                  /* Pixel Punch Hole Camera */
                  <div className="w-3.5 h-3.5 rounded-full bg-black ring-2 ring-[#222]" />
                )}
              </div>

              {/* Right: Signal, 5G/Wi-Fi, Battery */}
              <div className="w-16 flex items-center justify-end gap-1.5 text-[#1B2E3D]">
                {/* Cellular Signal Bars */}
                <svg className="w-4 h-3 fill-current" viewBox="0 0 17 12">
                  <rect x="0" y="8" width="2.5" height="4" rx="0.5" />
                  <rect x="4" y="6" width="2.5" height="6" rx="0.5" />
                  <rect x="8" y="3" width="2.5" height="9" rx="0.5" />
                  <rect x="12" y="0" width="2.5" height="12" rx="0.5" />
                </svg>

                {/* Wi-Fi Icon */}
                <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />

                {/* Battery Icon */}
                <div className="flex items-center gap-0.5">
                  <div className="w-5 h-2.5 rounded-[3px] border border-current p-0.5 flex items-center">
                    <div className="w-full h-full bg-[#1B2E3D] rounded-[1px]" />
                  </div>
                  <div className="w-0.5 h-1 bg-current rounded-r-xs" />
                </div>
              </div>
            </div>

            {/* Scrollable Mobile App Root Container */}
            <div
              id="mobile-scroll-container"
              className="flex-1 w-full overflow-y-auto overflow-x-hidden no-scrollbar relative flex flex-col"
            >
              {children}
            </div>

            {/* Bottom Floating iOS Home Indicator Bar */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
              <div className="w-32 h-1 bg-[#1B2E3D]/30 rounded-full" />
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Bottom Subtle Prototype Note */}
      <footer className="mt-4 text-center text-xs text-[#788896]">
        <span>Simulating mobile touch interactions · Responsive viewport active</span>
      </footer>
    </div>
  );
};
