export type MainCategory = 'men' | 'women' | 'swim' | 'big_tall' | 'beach_home' | 'accessories';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: MainCategory;
  subcategory: string;
  price: number;
  comparePrice?: number;
  description: string;
  features: string[];
  fabric: string;
  care: string;
  colors: ProductColor[];
  sizes: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  stockStatus: 'in_stock' | 'low_stock';
  tags?: ('New Arrival' | 'Best Seller' | 'Resort Essential' | 'Linen' | 'Island Icon' | 'Sale')[];
  isFeatured?: boolean;
  reviews?: Review[];
}

export interface CartItem {
  id: string; // Composite: `${productId}_${color}_${size}`
  productId: string;
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  unitPrice: number;
}

export type SortOption = 'featured' | 'newest' | 'price_asc' | 'price_desc' | 'best_selling' | 'rating';

export interface FilterState {
  category?: MainCategory;
  subcategory?: string;
  sizes: string[];
  colors: string[];
  priceMin?: number;
  priceMax?: number;
  onlyInStock: boolean;
  onlySale: boolean;
  tag?: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  type: 'Retail Store' | 'Store & Marlin Bar' | 'Restaurant & Bar';
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  hours: string;
  features: string[];
  distance?: string;
}

export interface MockOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: 'Order Placed' | 'In Transit' | 'Delivered';
  items: {
    productName: string;
    color: string;
    size: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  shippingAddress: string;
  total: number;
}
