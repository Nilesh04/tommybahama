import React from 'react';
import { HeroBanner } from '../components/HeroBanner';
import { CategoryTiles } from '../components/CategoryTiles';
import { ProductCarousel } from '../components/ProductCarousel';
import { EditorialBanner } from '../components/EditorialBanner';
import { AppFooter } from '../components/AppFooter';
import { MOCK_PRODUCTS } from '../data/products';

export const HomeScreen: React.FC = () => {
  const newArrivals = MOCK_PRODUCTS.filter(p => p.tags?.includes('New Arrival') || p.tags?.includes('Best Seller')).slice(0, 8);
  const linenCollection = MOCK_PRODUCTS.filter(p => p.tags?.includes('Linen') || p.tags?.includes('Island Icon')).slice(0, 8);
  const resortEssentials = MOCK_PRODUCTS.filter(p => p.tags?.includes('Resort Essential') || p.tags?.includes('Best Seller')).slice(0, 8);

  return (
    <div className="min-h-screen pb-16">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Shop by Category */}
      <CategoryTiles />

      {/* Featured Collection: New Arrivals */}
      <ProductCarousel
        title="New Season Arrivals"
        subtitle="Fresh from the Island Atelier"
        products={newArrivals}
      />

      {/* Editorial Lifestyle Section */}
      <EditorialBanner />

      {/* Linen & Island Icons */}
      <ProductCarousel
        title="The Pure Linen Collection"
        subtitle="Airy European Flax & Sandwashed Silks"
        products={linenCollection}
      />

      {/* Resort Essentials */}
      <ProductCarousel
        title="Resort Essentials"
        subtitle="Curated for Warm Days & Balmy Nights"
        products={resortEssentials}
      />

      {/* Footer Content */}
      <AppFooter />
    </div>
  );
};
