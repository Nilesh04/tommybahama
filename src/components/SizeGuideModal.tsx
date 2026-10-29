import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [activeTab, setActiveTab] = useState<'men' | 'women'>('men');

  if (!isSizeGuideOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-[#FAF8F5] text-left animate-in fade-in duration-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#E8E2D5] bg-white flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <Ruler className="w-5 h-5 text-[#1E6B7B]" />
          <h3 className="font-serif text-lg font-bold text-[#1B2E3D]">
            Size & Fit Guide
          </h3>
        </div>
        <button
          onClick={() => setIsSizeGuideOpen(false)}
          className="p-1 rounded-full text-[#1B2E3D] hover:bg-[#EBE5DB]"
          aria-label="Close size guide"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

        {/* Tab Switcher: Men / Women */}
        <div className="p-4 bg-white border-b border-[#E8E2D5] flex gap-2">
          <button
            onClick={() => setActiveTab('men')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg uppercase tracking-wider transition-colors ${
              activeTab === 'men'
                ? 'bg-[#1B2E3D] text-white shadow-xs'
                : 'bg-[#F2EDE4] text-[#1B2E3D] hover:bg-[#EAE3D6]'
            }`}
          >
            Men's Sizing
          </button>
          <button
            onClick={() => setActiveTab('women')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg uppercase tracking-wider transition-colors ${
              activeTab === 'women'
                ? 'bg-[#1B2E3D] text-white shadow-xs'
                : 'bg-[#F2EDE4] text-[#1B2E3D] hover:bg-[#EAE3D6]'
            }`}
          >
            Women's Sizing
          </button>
        </div>

        {/* Chart Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs text-[#1B2E3D]">
          <p className="text-[#6B7B88] text-[11px] leading-relaxed">
            All Tommy Bahama garments are cut for a relaxed, easy island silhouette. If you are between sizes, we recommend sizing down for a closer tailored fit.
          </p>

          {activeTab === 'men' ? (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider mb-2 text-[#1B2E3D]">
                  Men's Shirts & Polos (Inches)
                </h4>
                <div className="overflow-x-auto border border-[#E8E2D5] rounded-xl bg-white">
                  <table className="w-full text-left text-xs tabular-nums">
                    <thead className="bg-[#F8F6F0] text-[#6B7B88] border-b border-[#E8E2D5]">
                      <tr>
                        <th className="p-2.5 font-semibold">Size</th>
                        <th className="p-2.5 font-semibold">Chest</th>
                        <th className="p-2.5 font-semibold">Neck</th>
                        <th className="p-2.5 font-semibold">Waist</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFEAE1]">
                      <tr>
                        <td className="p-2.5 font-semibold">S</td>
                        <td className="p-2.5">36 - 38"</td>
                        <td className="p-2.5">14.5 - 15"</td>
                        <td className="p-2.5">30 - 32"</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold">M</td>
                        <td className="p-2.5">39 - 41"</td>
                        <td className="p-2.5">15.5 - 16"</td>
                        <td className="p-2.5">33 - 35"</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold">L</td>
                        <td className="p-2.5">42 - 44"</td>
                        <td className="p-2.5">16.5 - 17"</td>
                        <td className="p-2.5">36 - 38"</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold">XL</td>
                        <td className="p-2.5">45 - 47"</td>
                        <td className="p-2.5">17.5 - 18"</td>
                        <td className="p-2.5">39 - 41"</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold">XXL</td>
                        <td className="p-2.5">48 - 50"</td>
                        <td className="p-2.5">18.5 - 19"</td>
                        <td className="p-2.5">42 - 44"</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider mb-2 text-[#1B2E3D]">
                  Men's Pants & Shorts
                </h4>
                <div className="overflow-x-auto border border-[#E8E2D5] rounded-xl bg-white">
                  <table className="w-full text-left text-xs tabular-nums">
                    <thead className="bg-[#F8F6F0] text-[#6B7B88] border-b border-[#E8E2D5]">
                      <tr>
                        <th className="p-2.5 font-semibold">Waist Size</th>
                        <th className="p-2.5 font-semibold">Hip</th>
                        <th className="p-2.5 font-semibold">Standard Inseam</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFEAE1]">
                      <tr>
                        <td className="p-2.5 font-semibold">30 - 32</td>
                        <td className="p-2.5">37 - 39"</td>
                        <td className="p-2.5">30" or 32"</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold">34 - 36</td>
                        <td className="p-2.5">41 - 43"</td>
                        <td className="p-2.5">32" or 34"</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold">38 - 40</td>
                        <td className="p-2.5">45 - 47"</td>
                        <td className="p-2.5">32"</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider mb-2 text-[#1B2E3D]">
                  Women's Dresses & Tops (Inches)
                </h4>
                <div className="overflow-x-auto border border-[#E8E2D5] rounded-xl bg-white">
                  <table className="w-full text-left text-xs tabular-nums">
                    <thead className="bg-[#F8F6F0] text-[#6B7B88] border-b border-[#E8E2D5]">
                      <tr>
                        <th className="p-2.5 font-semibold">Size</th>
                        <th className="p-2.5 font-semibold">Numeric</th>
                        <th className="p-2.5 font-semibold">Bust</th>
                        <th className="p-2.5 font-semibold">Waist</th>
                        <th className="p-2.5 font-semibold">Hips</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFEAE1]">
                      <tr>
                        <td className="p-2.5 font-semibold">XS</td>
                        <td className="p-2.5">0 - 2</td>
                        <td className="p-2.5">33 - 34"</td>
                        <td className="p-2.5">25 - 26"</td>
                        <td className="p-2.5">35 - 36"</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold">S</td>
                        <td className="p-2.5">4 - 6</td>
                        <td className="p-2.5">35 - 36"</td>
                        <td className="p-2.5">27 - 28"</td>
                        <td className="p-2.5">37 - 38"</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold">M</td>
                        <td className="p-2.5">8 - 10</td>
                        <td className="p-2.5">37 - 38"</td>
                        <td className="p-2.5">29 - 30"</td>
                        <td className="p-2.5">39 - 40"</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold">L</td>
                        <td className="p-2.5">12 - 14</td>
                        <td className="p-2.5">40 - 41.5"</td>
                        <td className="p-2.5">32 - 33.5"</td>
                        <td className="p-2.5">42 - 43.5"</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-semibold">XL</td>
                        <td className="p-2.5">16</td>
                        <td className="p-2.5">43"</td>
                        <td className="p-2.5">35"</td>
                        <td className="p-2.5">45"</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E8E2D5] bg-white text-right">
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="py-2.5 px-6 rounded-xl bg-[#1B2E3D] hover:bg-[#132533] text-white text-xs font-semibold uppercase tracking-wider"
          >
            Got It
          </button>
        </div>
    </div>
  );
};
