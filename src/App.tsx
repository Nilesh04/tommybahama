/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AppHeader } from './components/AppHeader';
import { AnnouncementBar } from './components/AnnouncementBar';
import { BottomNavigation } from './components/BottomNavigation';
import { HomeScreen } from './screens/HomeScreen';
import { ShopScreen } from './screens/ShopScreen';
import { SearchScreen } from './screens/SearchScreen';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { BagScreen } from './screens/BagScreen';
import { ProductDetailScreen } from './screens/ProductDetailScreen';
import { DemoCheckoutModal } from './components/DemoCheckoutModal';
import { StoreLocatorModal } from './components/StoreLocatorModal';
import { AccountModal } from './components/AccountModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { ToastNotification } from './components/ToastNotification';

import { MobileFrame } from './components/MobileFrame';

const AppContent: React.FC = () => {
  const { activeTab, selectedProductId } = useShop();

  return (
    <MobileFrame>
      <div className="min-h-full bg-[#F8F6F0] text-[#1B2E3D] flex flex-col font-sans selection:bg-[#1E6B7B]/15">
        {/* Top Announcement Bar & App Header (Only on main tabs) */}
        {!selectedProductId && (
          <>
            <AnnouncementBar />
            <AppHeader />
          </>
        )}

        {/* Main View Area */}
        <main className="flex-1 w-full max-w-7xl mx-auto">
          {selectedProductId ? (
            <ProductDetailScreen productId={selectedProductId} />
          ) : (
            <>
              {activeTab === 'home' && <HomeScreen />}
              {activeTab === 'shop' && <ShopScreen />}
              {activeTab === 'search' && <SearchScreen />}
              {activeTab === 'favorites' && <FavoritesScreen />}
              {activeTab === 'bag' && <BagScreen />}
            </>
          )}
        </main>

        {/* Persistent Bottom Navigation (Hidden on PDP to allow full Add-to-Bag bar) */}
        {!selectedProductId && <BottomNavigation />}

        {/* Interactive Modals */}
        <DemoCheckoutModal />
        <StoreLocatorModal />
        <AccountModal />
        <SizeGuideModal />
        <ToastNotification />
      </div>
    </MobileFrame>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
