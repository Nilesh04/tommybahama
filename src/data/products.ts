import { Product } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_resort_lifestyle_1793114082967.jpg';
export const EDITORIAL_IMAGE = '/src/assets/images/editorial_island_life_1793114084118.jpg';
export const CAT_MEN_IMAGE = '/src/assets/images/category_men_linen_1793114084995.jpg';
export const CAT_WOMEN_IMAGE = '/src/assets/images/category_women_resort_1793114085699.jpg';
export const CAT_BEACH_IMAGE = '/src/assets/images/category_beach_home_1793114085331.jpg';

export const SAMPLE_REVIEWS = [
  {
    id: 'rev-1',
    author: 'David M. from Maui, HI',
    rating: 5,
    date: '2 weeks ago',
    title: 'The gold standard of island comfort',
    comment: 'The drape and breathable weave on this shirt are unmatched. Wore it to sunset dinner in Wailea and got compliments all evening.',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Sarah K. from Naples, FL',
    rating: 5,
    date: '1 month ago',
    title: 'Flawless fit and luxurious fabric',
    comment: 'Feels effortless yet incredibly elevated. Washes easily on gentle cycle and packs beautifully for Caribbean trips without wrinkles.',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Robert C. from San Diego, CA',
    rating: 4,
    date: '1 month ago',
    title: 'Classic Tommy Bahama quality',
    comment: 'True to size with just enough ease through the chest and shoulders for tropical humidity. Premium shell buttons add great detail.',
    verified: true,
  },
];

export const MOCK_PRODUCTS: Product[] = [
  // MEN - SHIRTS & POLOS
  {
    id: 'tb-m-01',
    name: 'Catalina Del Ray Silk Camp Shirt',
    subtitle: '100% Washed Sandwashed Silk',
    category: 'men',
    subcategory: 'Shirts',
    price: 148,
    description: 'An iconic island signature. Crafted from pure sandwashed silk with a relaxed camp collar, coconut shell buttons, and subtle pickstitch detailing. Naturally temperature-regulating for breezy warm-weather comfort.',
    features: [
      '100% Sandwashed Silk for an ultra-soft sueded feel',
      'Relaxed fit with open camp collar',
      'Genuine carved coconut buttons',
      'Side vents with straight hem designed to be worn untucked',
      'Naturally breathable and temperature-regulating'
    ],
    fabric: '100% Silk Twill',
    care: 'Machine wash cold on gentle cycle with mild silk detergent. Hang to dry or dry clean.',
    colors: [
      { name: 'Seafoam Mist', hex: '#A8C3B8' },
      { name: 'Island Navy', hex: '#1B2E3D' },
      { name: 'Coral Sunset', hex: '#DE7056' },
      { name: 'Sand Dune', hex: '#D6C8B4' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      CAT_MEN_IMAGE,
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 184,
    stockStatus: 'in_stock',
    tags: ['Best Seller', 'Island Icon'],
    isFeatured: true,
    reviews: SAMPLE_REVIEWS
  },
  {
    id: 'tb-m-02',
    name: 'Emfielder 2.0 Moisture-Wicking Polo',
    subtitle: 'Supima Cotton & IslandZone Tech',
    category: 'men',
    subcategory: 'Polos',
    price: 118,
    description: 'The definitive resort polo. Combines the luxurious softness of Supima cotton with high-performance moisture-wicking technology and UPF 30 sun protection for effortless days on the golf course or the marina patio.',
    features: [
      'IslandZone moisture management keeps you cool and dry',
      '71% Supima cotton, 29% polyester',
      'Embroidered marlin icon at left chest',
      'Ribbed collar and cuffs with contrast tipping',
      'UPF 30 sun protection'
    ],
    fabric: '71% Supima Cotton, 29% Moisture-Wicking Polyester',
    care: 'Machine wash cold, tumble dry low. Do not bleach.',
    colors: [
      { name: 'Deep Ocean Blue', hex: '#1C3A5A' },
      { name: 'Key Lime', hex: '#7BA05B' },
      { name: 'Bright White', hex: '#FFFFFF' },
      { name: 'Cayman Orange', hex: '#E86A38' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 312,
    stockStatus: 'in_stock',
    tags: ['Best Seller'],
    isFeatured: true,
    reviews: SAMPLE_REVIEWS
  },
  {
    id: 'tb-m-03',
    name: 'Breezeway Relaxed Irish Linen Shirt',
    subtitle: '100% Pure Long-Staple Linen',
    category: 'men',
    subcategory: 'Shirts',
    price: 135,
    comparePrice: 155,
    description: 'Woven from airy European flax with garment-washed softness. Tailored with a clean button-down collar and chest pocket, this breezy shirt stays effortlessly crisp in tropical humidity.',
    features: [
      'Pre-washed pure European linen prevents shrinking',
      'Subtle crosshatch slub texture',
      'Single chest patch pocket',
      'Adjustable button cuffs and locker loop at back pleat'
    ],
    fabric: '100% Pure European Linen',
    care: 'Machine wash cold on gentle. Line dry, warm iron if desired for a crisp finish.',
    colors: [
      { name: 'Natural Sand', hex: '#E2D7C5' },
      { name: 'Bleached Sky', hex: '#99B8D1' },
      { name: 'White Lagoon', hex: '#F5F5F0' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      CAT_MEN_IMAGE,
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 96,
    stockStatus: 'in_stock',
    tags: ['Linen', 'Sale'],
    isFeatured: false,
    reviews: SAMPLE_REVIEWS
  },
  {
    id: 'tb-m-04',
    name: 'Boracay 8-Inch Island Stretch Chino Shorts',
    subtitle: 'Cotton TENCEL Blend with Stretch',
    category: 'men',
    subcategory: 'Pants & Shorts',
    price: 98,
    description: 'Engineered with revolutionary TENCEL modal blend for silky softness and two-way stretch. Features a modern 8-inch inseam that transitions seamlessly from yacht decks to dinner.',
    features: [
      '77% cotton, 20% TENCEL modal, 3% spandex',
      'Signature marlin embroidery inside waistband',
      'Quarter-top front pockets and button-through back welt pockets',
      '8-inch inseam'
    ],
    fabric: 'Cotton-Modal-Elastane Twill',
    care: 'Machine wash warm, tumble dry medium.',
    colors: [
      { name: 'Khaki Stone', hex: '#C2B69D' },
      { name: 'Coastal Navy', hex: '#182736' },
      { name: 'Sage Leaf', hex: '#7E8B75' }
    ],
    sizes: ['30', '32', '34', '36', '38', '40'],
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 240,
    stockStatus: 'in_stock',
    tags: ['Best Seller', 'Resort Essential'],
    isFeatured: true
  },
  {
    id: 'tb-m-05',
    name: 'Monterey Coast Garment-Dyed Linen Pant',
    subtitle: 'Relaxed Drawstring Trouser',
    category: 'men',
    subcategory: 'Pants & Shorts',
    price: 145,
    description: 'The epitome of island relaxation. Designed with a comfortable elastic waistband, inner woven drawstring, and relaxed straight leg that rolls up effortlessly for walking along the surf.',
    features: [
      '100% breathable linen twill',
      'Elastic waist with braided cotton drawstring',
      'Deep slash front pockets and secure rear pockets',
      '32-inch inseam with clean finished hem'
    ],
    fabric: '100% Garment-Dyed Linen',
    care: 'Machine wash cold, tumble dry low.',
    colors: [
      { name: 'Natural Oatmeal', hex: '#D7CDBE' },
      { name: 'Deep Indigo', hex: '#1A2938' },
      { name: 'Olive Grove', hex: '#585F49' }
    ],
    sizes: ['30', '32', '34', '36', '38'],
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 78,
    stockStatus: 'in_stock',
    tags: ['Linen', 'Resort Essential']
  },
  {
    id: 'tb-m-06',
    name: 'Castaway Cove Tropical Floral Silk Shirt',
    subtitle: 'Limited Hawaiian Heritage Print',
    category: 'men',
    subcategory: 'Shirts',
    price: 158,
    description: 'Hand-drawn vintage palm and hibiscus motifs screen-printed on heavy sandwashed silk. Complete with pattern-matched chest pocket and genuine mother-of-pearl buttons.',
    features: [
      'Archival hand-painted island flora illustration',
      'Precision matched front chest pocket',
      '100% Sandwashed heavy silk jacquard',
      'Side vents with reinforced bartacks'
    ],
    fabric: '100% Sandwashed Silk Jacquard',
    care: 'Dry clean recommended or gentle hand wash in cold water.',
    colors: [
      { name: 'Teal Lagoon', hex: '#1E6B7B' },
      { name: 'Golden Guava', hex: '#D98236' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      CAT_MEN_IMAGE,
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 5.0,
    reviewCount: 64,
    stockStatus: 'low_stock',
    tags: ['New Arrival', 'Island Icon'],
    isFeatured: true
  },
  {
    id: 'tb-m-07',
    name: 'Naples Coast 6-Inch Swim Trunks',
    subtitle: 'Quick-Dry Recycled Performance Fabric',
    category: 'men',
    subcategory: 'Swimwear',
    price: 89,
    description: 'Crafted from sustainable recycled polyester with 4-way stretch and ultra-fast drying finish. Includes an ultra-soft compression mesh basket liner for zero chafing.',
    features: [
      'UPF 50+ maximum sun defense',
      'Comfort stretch waistband with tipped drawcord',
      'Anti-chafe micro-mesh supportive inner liner',
      'Rear drainage grommets and key loop'
    ],
    fabric: '90% Recycled Polyester, 10% Spandex',
    care: 'Rinse with fresh water after swimming. Machine wash cold.',
    colors: [
      { name: 'Aquamarine Wave', hex: '#3AAFA9' },
      { name: 'Sunset Coral Print', hex: '#DE6B48' },
      { name: 'Midnight Marlin', hex: '#17252A' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 115,
    stockStatus: 'in_stock',
    tags: ['New Arrival']
  },
  {
    id: 'tb-m-08',
    name: 'Seaview Shoreline Quarter-Zip Pullover',
    subtitle: 'IslandZone Thermal Regulation',
    category: 'men',
    subcategory: 'Sweaters',
    price: 128,
    description: 'The ideal layer when sea breezes pick up after sunset. Features a brushed waffle interior that traps warmth without weight, and a smooth moisture-wicking exterior.',
    features: [
      'Quarter-zip mock neck with contrast trim',
      'Brushed waffle micro-fleece interior',
      'Signature contrast marlin embroidery on neck yoke',
      'Moisture-wicking, anti-static finish'
    ],
    fabric: '85% Polyester, 15% Spandex French Terry',
    care: 'Machine wash cold on gentle, tumble dry low.',
    colors: [
      { name: 'Oatmeal Heather', hex: '#CEC5B7' },
      { name: 'Pacific Blue', hex: '#2B506E' },
      { name: 'Palm Leaf Heather', hex: '#44624A' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 88,
    stockStatus: 'in_stock',
    tags: ['Resort Essential']
  },

  // WOMEN - DRESSES & TOPS
  {
    id: 'tb-w-01',
    name: 'Breezy Hibiscus Tiered Silk Maxi Dress',
    subtitle: '100% Silk Georgette with Lining',
    category: 'women',
    subcategory: 'Dresses',
    price: 248,
    description: 'Float through warm balmy evenings in this sweeping tiered maxi dress. Features a flattering V-neckline, smocked elastic waist for effortless shape, and cascading floral botanical panels.',
    features: [
      'Pure silk georgette with soft breathable cotton lawn lining',
      'Tiered skirt with gentle movement',
      'Smocked back bodice for customized comfort and fit',
      'Subtle metallic lurex pinstripe accents'
    ],
    fabric: '100% Silk with 100% Cotton Lining',
    care: 'Dry clean only to maintain silk luster and shape.',
    colors: [
      { name: 'Tropical Paradise Floral', hex: '#DE5D83' },
      { name: 'Ocean Mist Blue', hex: '#5B8C85' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      CAT_WOMEN_IMAGE,
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 142,
    stockStatus: 'in_stock',
    tags: ['New Arrival', 'Best Seller', 'Island Icon'],
    isFeatured: true,
    reviews: SAMPLE_REVIEWS
  },
  {
    id: 'tb-w-02',
    name: 'Two Palms Classic Raw Linen Shirt',
    subtitle: '100% Pure Washed Linen',
    category: 'women',
    subcategory: 'Shirts',
    price: 118,
    description: 'An essential women’s resort staple. Lightweight garment-washed linen with convertible roll-tab sleeves and flattering curved shirttail hem. Wear it buttoned or open as a beach cover-up.',
    features: [
      '100% pure European flax linen',
      'Roll-tab long sleeves for versatile styling',
      'Twin flap chest pockets with button closure',
      'Relaxed boyfriend cut with feminine tailored shoulders'
    ],
    fabric: '100% Pure Washed Linen',
    care: 'Machine wash cold on gentle. Line dry or tumble dry low.',
    colors: [
      { name: 'Coconut Cream', hex: '#FDFBF7' },
      { name: 'Turquoise Cove', hex: '#2E8B99' },
      { name: 'Blush Hibiscus', hex: '#EAA9A2' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 220,
    stockStatus: 'in_stock',
    tags: ['Linen', 'Best Seller'],
    isFeatured: true
  },
  {
    id: 'tb-w-03',
    name: 'Sunset Palms Linen Halter Midi Dress',
    subtitle: 'Pure Linen with Hand-Embroidery',
    category: 'women',
    subcategory: 'Dresses',
    price: 198,
    comparePrice: 225,
    description: 'Delicate tropical vine embroidery frames the neckline of this breezy halter dress. Side seam pockets and a tiered A-line skirt keep it practical and timelessly graceful.',
    features: [
      'Self-tie halter neckline with keyhole opening',
      'Hidden side-seam pockets',
      'Pre-washed linen for soft, crinkle-resistant texture',
      'Midi length hitting just below mid-calf'
    ],
    fabric: '100% Linen',
    care: 'Hand wash cold or machine wash delicate bag. Lay flat to dry.',
    colors: [
      { name: 'Crisp White & Palm Green', hex: '#F0F2EB' },
      { name: 'Sunlit Papaya', hex: '#F29C38' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      CAT_WOMEN_IMAGE,
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 67,
    stockStatus: 'in_stock',
    tags: ['Sale', 'Resort Essential']
  },
  {
    id: 'tb-w-04',
    name: 'Ashby Isle Ribbed Split-Neck Top',
    subtitle: 'Modal Cotton Stretch Rib',
    category: 'women',
    subcategory: 'Tops',
    price: 78,
    description: 'The ultra-soft everyday layering top. Knit in a fine micro-rib with a split notch collar and three-quarter sleeves that pair perfectly with linen trousers or beach shorts.',
    features: [
      'Silky smooth modal blend with shape retention',
      'Three-quarter sleeves with split cuff detail',
      'Feminine notch V-neckline',
      'Hip-skimming straight hem'
    ],
    fabric: '57% Cotton, 38% Modal, 5% Spandex',
    care: 'Machine wash cold, tumble dry low.',
    colors: [
      { name: 'Island Navy', hex: '#1B2E3D' },
      { name: 'Sand Taupe', hex: '#D2C8BC' },
      { name: 'White', hex: '#FFFFFF' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 94,
    stockStatus: 'in_stock',
    tags: ['Resort Essential']
  },
  {
    id: 'tb-w-05',
    name: 'Boracay Stretch Ankle Trouser',
    subtitle: 'Silky Modal Island Stretch',
    category: 'women',
    subcategory: 'Pants',
    price: 128,
    description: 'Tailored comfort that flatters every silhouette. Designed with a pull-on waistband, faux fly, and sleek front seam accents that elongate the legs for resort chic styling.',
    features: [
      'Smoothing stretch fabric that never bags out',
      'Faux fly with front pintuck detailing',
      'Pull-on contoured comfort waistband',
      '27-inch ankle length inseam with side ankle slits'
    ],
    fabric: '65% Cotton, 32% TENCEL Modal, 3% Spandex',
    care: 'Machine wash cold, line dry.',
    colors: [
      { name: 'Bleached Khaki', hex: '#E0D5C1' },
      { name: 'Dark Navy', hex: '#162330' },
      { name: 'Classic Black', hex: '#1F1F1F' }
    ],
    sizes: ['0', '2', '4', '6', '8', '10', '12'],
    images: [
      'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 168,
    stockStatus: 'in_stock',
    tags: ['Best Seller']
  },
  {
    id: 'tb-w-06',
    name: 'Wailea Palms Button-Front Linen Skirt',
    subtitle: 'Flax Linen with Tortoise Buttons',
    category: 'women',
    subcategory: 'Dresses',
    price: 138,
    description: 'A romantic high-waisted linen skirt adorned with real tortoiseshell buttons down the center front. Features functional deep slash pockets and an elastic back waist.',
    features: [
      'Pure linen with lightweight cotton lining',
      'Faux tortoiseshell buttons',
      'Elastic back waistband for custom fit',
      'Deep slash front pockets'
    ],
    fabric: '100% Linen',
    care: 'Machine wash delicate, hang to dry.',
    colors: [
      { name: 'Sage Green', hex: '#7D8C7C' },
      { name: 'Oatmeal Natural', hex: '#DED5C6' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      CAT_WOMEN_IMAGE,
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 52,
    stockStatus: 'in_stock',
    tags: ['New Arrival', 'Linen']
  },

  // WOMEN'S SWIM
  {
    id: 'tb-s-01',
    name: 'Pearl Shirred Bandeau One-Piece Swimsuit',
    subtitle: 'Tummy-Control Power Mesh Lining',
    category: 'swim',
    subcategory: 'Swimwear',
    price: 168,
    description: 'Sculpts and flatters with elegant front shirring and hidden power mesh panels. Comes with a removable halter strap and molded foam cups for customizable support and confidence.',
    features: [
      'Miraclesuit-inspired smoothing power mesh lining',
      'Removable halter strap converts to bandeau',
      'Built-in soft molded cups and silicone grip tape along bustline',
      'Full rear coverage and UPF 50+ UV protection'
    ],
    fabric: '80% Nylon, 20% Xtra Life LYCRA Spandex (chlorine resistant)',
    care: 'Hand wash in cold water after every wear. Do not wring or bleach.',
    colors: [
      { name: 'Sapphire Ocean', hex: '#1A4D6E' },
      { name: 'Black Onyx', hex: '#1C1C1C' },
      { name: 'Hibiscus Coral', hex: '#DE5D4E' }
    ],
    sizes: ['4', '6', '8', '10', '12', '14', '16'],
    images: [
      'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 204,
    stockStatus: 'in_stock',
    tags: ['Best Seller', 'Island Icon'],
    isFeatured: true,
    reviews: SAMPLE_REVIEWS
  },
  {
    id: 'tb-s-02',
    name: 'St. Kitts Reversible Triangle Bikini Top & Hipster',
    subtitle: 'Reversible Botanical to Solid Print',
    category: 'swim',
    subcategory: 'Swimwear',
    price: 98,
    comparePrice: 118,
    description: 'Two swim looks in one luxurious suit. Features an exquisite tropical botanical watercolor print on one side that reverses to a rich oceanic solid. Finished with gold bead hardware.',
    features: [
      'Fully reversible print-to-solid design',
      'Brushed gold-tone cord ends and sliders',
      'Adjustable neck and back tie closures',
      'Removable quick-dry padded cups'
    ],
    fabric: '85% Recycled Polyamide, 15% Elastane',
    care: 'Rinse in cold water, dry flat in shade.',
    colors: [
      { name: 'Emerald Palms / Deep Teal', hex: '#1E6B7B' },
      { name: 'Papaya Bloom / Sand', hex: '#F08A5D' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 88,
    stockStatus: 'in_stock',
    tags: ['Sale', 'Resort Essential']
  },
  {
    id: 'tb-s-03',
    name: 'Lanai Lace-Trim Chiffon Tunic Cover-Up',
    subtitle: 'Sheer Breezy Beachside Caftan',
    category: 'swim',
    subcategory: 'Cover-Ups',
    price: 118,
    description: 'Slip on effortless luxury over your swimsuit. Cut from weightless semi-sheer chiffon with crochet lace trim along the deep V-neck and fluttering kimono sleeves.',
    features: [
      'Featherlight semi-sheer chiffon drape',
      'Intricate crochet lace inserts',
      'Drawstring waist with tassel ties',
      'Mid-thigh length with breezy side slits'
    ],
    fabric: '100% Polyester Chiffon',
    care: 'Hand wash cold, line dry.',
    colors: [
      { name: 'Pure White Lace', hex: '#FFFFFF' },
      { name: 'Aqua Lagoon', hex: '#48A9A6' }
    ],
    sizes: ['XS/S', 'M/L', 'XL/XXL'],
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 71,
    stockStatus: 'in_stock',
    tags: ['Resort Essential']
  },

  // BIG & TALL
  {
    id: 'tb-bt-01',
    name: 'Big & Tall Emfielder Performance Island Polo',
    subtitle: 'Extended Length & Generous Chest Cut',
    category: 'big_tall',
    subcategory: 'Polos',
    price: 128,
    description: 'Engineered specifically for taller and broader builds. Extended body length ensures it stays tucked, with generous armholes and shoulder room plus IslandZone cooling technology.',
    features: [
      'Proportioned for Big (1X-5X) and Tall (LT-4XLT)',
      'Moisture-wicking Supima cotton blend',
      '2 inches of added body length prevents ride-up',
      'Anti-curl rib collar with contrast accent tipping'
    ],
    fabric: '71% Supima Cotton, 29% Polyester',
    care: 'Machine wash warm, tumble dry low.',
    colors: [
      { name: 'Navy Blue', hex: '#1B2E3D' },
      { name: 'Sea Salt White', hex: '#F8F6F0' },
      { name: 'Ocean Mist', hex: '#5E8B99' }
    ],
    sizes: ['1XB', '2XB', '3XB', '4XB', 'LT', 'XLT', '2XLT', '3XLT'],
    images: [
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 156,
    stockStatus: 'in_stock',
    tags: ['Best Seller'],
    isFeatured: true
  },
  {
    id: 'tb-bt-02',
    name: 'Big & Tall Catalina Washed Silk Camp Shirt',
    subtitle: 'Pure Sandwashed Silk in Extended Sizes',
    category: 'big_tall',
    subcategory: 'Shirts',
    price: 158,
    description: 'Our iconic pure silk camp shirt, masterfully proportioned for taller and larger gentlemen. Features broad back pleats for effortless mobility and genuine coconut buttons.',
    features: [
      '100% Sandwashed Silk Twill',
      'Graduated sleeve lengths and extended torso drop',
      'Generous back box pleat for full range of motion',
      'Carved coconut buttons'
    ],
    fabric: '100% Sandwashed Silk',
    care: 'Machine wash cold on gentle or dry clean.',
    colors: [
      { name: 'Island Navy', hex: '#1B2E3D' },
      { name: 'Sand Cream', hex: '#E2D7C5' },
      { name: 'Sage Leaf', hex: '#8C9A84' }
    ],
    sizes: ['1XB', '2XB', '3XB', '4XB', 'LT', 'XLT', '2XLT', '3XLT'],
    images: [
      CAT_MEN_IMAGE,
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 5.0,
    reviewCount: 92,
    stockStatus: 'in_stock',
    tags: ['Island Icon']
  },
  {
    id: 'tb-bt-03',
    name: 'Big & Tall Boracay Island Chino Short',
    subtitle: 'Relaxed Fit with Comfort Stretch',
    category: 'big_tall',
    subcategory: 'Pants & Shorts',
    price: 108,
    description: 'The best-selling Boracay short engineered for larger frames with an extra-roomy thigh cut and flexible elastic interior waistband tabs.',
    features: [
      'Modal-rich stretch cotton twill',
      'Hidden interior stretch waistband expansion',
      '9-inch inseam tailored to hit right at the knee'
    ],
    fabric: '77% Cotton, 20% TENCEL Modal, 3% Spandex',
    care: 'Machine wash cold, tumble dry low.',
    colors: [
      { name: 'Khaki Stone', hex: '#C2B69D' },
      { name: 'Coastal Navy', hex: '#182736' }
    ],
    sizes: ['42', '44', '46', '48', '50', '52'],
    images: [
      'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 79,
    stockStatus: 'in_stock',
    tags: ['Resort Essential']
  },

  // BEACH & HOME
  {
    id: 'tb-bh-01',
    name: 'Sunseeker Cabana Striped Velour Beach Towel',
    subtitle: 'Plush 600 GSM Zero-Twist Cotton',
    category: 'beach_home',
    subcategory: 'Beach Towels',
    price: 58,
    description: 'An oversized resort-grade beach towel with sheared velour on one side for cloud-soft lounging and absorbent terry loops on the other. Woven in classic cabana nautical stripes.',
    features: [
      'Generous 40 x 70 inch luxury dimensions',
      '100% long-staple Turkish cotton at 600 GSM',
      'Dual texture: velvety velour side and thirsty terry side',
      'Colorfast yarn-dye withstands sun and salt water'
    ],
    fabric: '100% Turkish Ring-Spun Cotton',
    care: 'Machine wash warm, tumble dry medium.',
    colors: [
      { name: 'Nautical Navy & Cream', hex: '#1C3144' },
      { name: 'Turquoise Coral Wave', hex: '#2E8B99' },
      { name: 'Palm Leaf Green', hex: '#3E6B48' }
    ],
    sizes: ['Oversized (40" x 70")'],
    images: [
      CAT_BEACH_IMAGE,
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 310,
    stockStatus: 'in_stock',
    tags: ['Best Seller', 'Resort Essential'],
    isFeatured: true,
    reviews: SAMPLE_REVIEWS
  },
  {
    id: 'tb-bh-02',
    name: 'Bahama Breeze Teakwood & Sandalwood Candle',
    subtitle: 'Natural Coconut Soy Wax 3-Wick Candle',
    category: 'beach_home',
    subcategory: 'Home Accessories',
    price: 45,
    description: 'Fill your sanctuary with the scent of coastal paradise. Infused with warm sandalwood, sun-bleached driftwood, cracked coconut, and sea salt breeze. Hand-poured in a textured ceramic vessel.',
    features: [
      'Burn time: approximately 65 hours',
      'Hand-poured coconut soy blend wax with lead-free cotton wicks',
      'Matte glazed stoneware vessel with reusable bamboo lid',
      'Top notes: Sea Salt & Bergamot; Heart: White Coconut; Base: Teak & Amber'
    ],
    fabric: 'Ceramic Jar, Coconut Soy Wax',
    care: 'Trim wick to 1/4 inch before each lighting.',
    colors: [
      { name: 'Island Sand Stoneware', hex: '#D7CBB5' }
    ],
    sizes: ['14.5 oz (3-Wick)'],
    images: [
      CAT_BEACH_IMAGE,
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 145,
    stockStatus: 'in_stock',
    tags: ['New Arrival']
  },
  {
    id: 'tb-bh-03',
    name: 'Woven Seagrass Resort Market & Beach Tote',
    subtitle: 'Hand-Braided Natural Seagrass with Leather Trim',
    category: 'beach_home',
    subcategory: 'Outdoor Accessories',
    price: 95,
    description: 'Handcrafted by artisanal weavers from natural harvested seagrass with genuine vegetable-tanned leather handles. Roomy enough for two plush beach towels, sunblock, and your favorite island read.',
    features: [
      'Handwoven sustainable natural seagrass',
      'Supple full-grain leather shoulder straps (10" drop)',
      'Internal zip pocket for phone, keys, and cards',
      'Magnetic snap top closure with reinforced flat base'
    ],
    fabric: '100% Seagrass with Cowhide Leather Straps',
    care: 'Spot clean with damp cloth, air dry thoroughly.',
    colors: [
      { name: 'Natural Sand Straw', hex: '#D9C8A9' }
    ],
    sizes: ['One Size (19"W x 14"H x 7"D)'],
    images: [
      CAT_BEACH_IMAGE,
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 189,
    stockStatus: 'in_stock',
    tags: ['Best Seller', 'Island Icon'],
    isFeatured: true
  },
  {
    id: 'tb-bh-04',
    name: 'Deluxe Wicker & Canvas Insulated Picnic Cooler',
    subtitle: 'Insulated Thermal Lining with Wooden Cutting Board',
    category: 'beach_home',
    subcategory: 'Outdoor Accessories',
    price: 125,
    comparePrice: 150,
    description: 'The ultimate beachside dining companion. Keeps wine and fresh tropical fruit chilled for up to 12 hours. Includes a removable acacia wood serving board and corkscrew holster.',
    features: [
      'Leak-proof antimicrobial insulated thermal interior',
      'Holds up to 4 wine bottles or 16 beverages plus ice',
      'Includes solid acacia serving lid / charcuterie board',
      'Padded canvas shoulder strap for easy carry'
    ],
    fabric: 'Canvas & Rattan Trim with Food-Safe EVA Lining',
    care: 'Wipe interior clean with mild soapy water.',
    colors: [
      { name: 'Navy & Sand', hex: '#1C3144' }
    ],
    sizes: ['One Size'],
    images: [
      CAT_BEACH_IMAGE,
      'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 64,
    stockStatus: 'in_stock',
    tags: ['Sale']
  },

  // ACCESSORIES
  {
    id: 'tb-ac-01',
    name: 'Marlin Heritage Handwoven Panama Straw Hat',
    subtitle: 'Grade 8 Ecuadorian Toquilla Palm Straw',
    category: 'accessories',
    subcategory: 'Hats',
    price: 110,
    description: 'Masterfully handwoven in Ecuador from natural toquilla straw fibers. Features an interior moisture-wicking comfort sweatband and classic grosgrain ribbon band with marlin pin.',
    features: [
      'Authentic Grade 8 handwoven toquilla palm',
      'UPF 50+ sun protection weave',
      'Interior adjustable elastic drawcord for tailored fit',
      'Grosgrain hatband with antique brass marlin emblem'
    ],
    fabric: '100% Ecuadorian Toquilla Palm Straw',
    care: 'Store in cool dry place. Handle by brim, avoid pinching the crown.',
    colors: [
      { name: 'Bleached Bleach Ivory', hex: '#F7F5EE' },
      { name: 'Natural Sand', hex: '#DDD2BE' }
    ],
    sizes: ['M (57cm)', 'L (59cm)', 'XL (61cm)'],
    images: [
      CAT_MEN_IMAGE,
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 178,
    stockStatus: 'in_stock',
    tags: ['Best Seller', 'Island Icon'],
    isFeatured: true,
    reviews: SAMPLE_REVIEWS
  },
  {
    id: 'tb-ac-02',
    name: 'Tortoiseshell Polarized Island Sunglasses',
    subtitle: 'Glare-Reducing Polarized CR-39 Lenses',
    category: 'accessories',
    subcategory: 'Eyewear',
    price: 165,
    description: 'Designed for high glare on open water and bright coastal shorelines. Handmade Italian acetate frame with polarized bronze lenses that enhance color clarity while shielding 100% of UV rays.',
    features: [
      '100% UV400 and polarized glare protection',
      'Handmade Italian cellulose acetate frames',
      '5-barrel German hinges for long-lasting durability',
      'Includes custom protective leather travel case and microfiber cloth'
    ],
    fabric: 'Italian Acetate Frame with Polarized Lenses',
    care: 'Clean lenses with microfiber cloth only.',
    colors: [
      { name: 'Havana Tortoise / Bronze Lens', hex: '#54361E' },
      { name: 'Matte Navy / Ocean Blue Lens', hex: '#1C2E4A' }
    ],
    sizes: ['One Size (52-20-145)'],
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.8,
    reviewCount: 112,
    stockStatus: 'in_stock',
    tags: ['Resort Essential']
  },
  {
    id: 'tb-ac-03',
    name: 'Washed Canvas & Saddle Leather Weekend Duffel',
    subtitle: 'Heavy 18oz Duck Canvas with Brass Hardware',
    category: 'accessories',
    subcategory: 'Bags & Luggage',
    price: 195,
    comparePrice: 235,
    description: 'The definitive resort getaway bag. Built from rugged waxed cotton canvas trimmed with thick saddle leather that patinas gorgeously over years of island travel.',
    features: [
      'Heavy-duty 18oz water-repellent cotton duck canvas',
      'Full-grain saddle leather handles and detachable padded shoulder strap',
      'Separate zippered bottom compartment for shoes or wet swimwear',
      'Meets all major airline carry-on size standards'
    ],
    fabric: '18oz Waxed Cotton Canvas & Full-Grain Leather',
    care: 'Spot clean canvas with damp sponge. Condition leather annually.',
    colors: [
      { name: 'Driftwood Olive & Cognac', hex: '#4F5342' },
      { name: 'Navy & Saddle Brown', hex: '#1B2C3F' }
    ],
    sizes: ['One Size (22"L x 12"W x 11"H)'],
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 84,
    stockStatus: 'in_stock',
    tags: ['Sale', 'Resort Essential']
  },
  {
    id: 'tb-ac-04',
    name: 'Maritime Marlin Braided Leather Wrap Bracelet',
    subtitle: 'Italian Calf Leather with Sterling Silver Clasp',
    category: 'accessories',
    subcategory: 'Jewelry',
    price: 65,
    description: 'Hand-braided supple Italian leather wraps cleanly around the wrist twice, anchored by an engraved sterling silver marlin magnetic shackle clasp.',
    features: [
      'Genuine Italian calfskin braided cord',
      'Solid 925 sterling silver magnetic hook closure',
      'Water and sweat resistant treatment'
    ],
    fabric: 'Genuine Leather, 925 Sterling Silver',
    care: 'Avoid prolonged submersion in salt or chlorine water.',
    colors: [
      { name: 'Cognac Brown', hex: '#7A3E1D' },
      { name: 'Midnight Black', hex: '#1C1C1C' }
    ],
    sizes: ['M (7.5")', 'L (8.25")'],
    images: [
      'https://images.unsplash.com/photo-1611591475155-426477a2f267?auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 95,
    stockStatus: 'in_stock',
    tags: ['New Arrival']
  }
];

export const CATEGORY_TILES = [
  {
    id: 'men',
    title: "Men's Clothing",
    subtitle: 'Silk Camp Shirts & Island Chinos',
    image: CAT_MEN_IMAGE,
    count: '142 Styles'
  },
  {
    id: 'women',
    title: "Women's Clothing",
    subtitle: 'Breezy Linen & Floral Maxi Dresses',
    image: CAT_WOMEN_IMAGE,
    count: '128 Styles'
  },
  {
    id: 'swim',
    title: "Women's Swim",
    subtitle: 'Sculpting One-Pieces & Reversible Bikinis',
    image: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=800&q=80',
    count: '64 Styles'
  },
  {
    id: 'big_tall',
    title: 'Big & Tall',
    subtitle: 'Proportioned For Comfort & Ease',
    image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=800&q=80',
    count: '58 Styles'
  },
  {
    id: 'beach_home',
    title: 'Beach & Home',
    subtitle: 'Velour Towels, Seagrass & Scents',
    image: CAT_BEACH_IMAGE,
    count: '76 Styles'
  },
  {
    id: 'accessories',
    title: 'Accessories',
    subtitle: 'Panama Hats, Leather & Sunglasses',
    image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=800&q=80',
    count: '49 Styles'
  }
];
