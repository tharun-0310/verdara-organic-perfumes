require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const Product = require('../src/models/Product');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not set in .env file.');
  console.error('   Copy .env.example to .env and fill in your Atlas connection string.');
  process.exit(1);
}

const products = [
  {
    name: 'Forest Dew',
    slug: 'forest-dew',
    shortDescription: 'A deep, mossy breath of ancient woodland at dawn.',
    description:
      'Forest Dew is an earthy, grounding fragrance that transports you to a misty forest at first light. Vetiver and oakmoss form a rich base while bergamot cuts through with luminous citrus clarity. Cedarwood anchors the composition with quiet, enduring warmth. Each bottle captures the sensation of morning dew settling on a forest floor.',
    price: 128,
    category: 'eau-de-parfum',
    fragranceFamily: 'woody',
    topNotes: ['Bergamot', 'Green Leaf', 'Pine Needle'],
    heartNotes: ['Cedarwood', 'Oakmoss', 'Violet Leaf'],
    baseNotes: ['Vetiver', 'Earthy Musk', 'Amber'],
    ingredients: ['Vetiver Root Extract', 'Cedarwood Essential Oil', 'Oakmoss Absolute', 'Bergamot Oil', 'Pine Needle Distillate', 'Violet Leaf Absolute'],
    images: ['/assets/products/forest-dew-1.webp', '/assets/products/forest-dew-2.webp'],
    liquidColor: '#2d6a4f',
    glassTint: '#d8f3dc',
    labelColor: '#1b4332',
    accentColor: '#c9a84c',
    glowColor: '#52b788',
    capColor: '#1b2e1f',
    envColor1: '#1a3a2a',
    envColor2: '#0d1f17',
    particleColor: '#74c69d',
    size: '50ml',
    availableSizes: ['30ml', '50ml', '100ml'],
    stock: 85,
    featured: true,
  },
  {
    name: 'Rose Veil',
    slug: 'rose-veil',
    shortDescription: 'A soft, powdery veil of organic rose and white musk.',
    description:
      'Rose Veil is a delicate, romantic fragrance built around the finest organic rose absolute. Peony adds a fresh green floral facet, while vanilla smooths the heart into something quietly sensual. White musk lifts the entire composition skyward, leaving a silken trail that lingers like a memory of silk on skin.',
    price: 148,
    category: 'eau-de-parfum',
    fragranceFamily: 'floral',
    topNotes: ['Rose Absolute', 'Peony', 'Lychee'],
    heartNotes: ['Organic Rose Centifolia', 'Jasmine Sambac', 'Magnolia'],
    baseNotes: ['Vanilla Absolute', 'White Musk', 'Sandalwood'],
    ingredients: ['Organic Rose Centifolia Absolute', 'Peony Petal Extract', 'Vanilla Absolute', 'White Musk', 'Jasmine Sambac Absolute', 'Sandalwood Oil'],
    images: ['/assets/products/rose-veil-1.webp', '/assets/products/rose-veil-2.webp'],
    liquidColor: '#f4a7b9',
    glassTint: '#fce4ec',
    labelColor: '#880e4f',
    accentColor: '#f8bbd0',
    glowColor: '#f48fb1',
    capColor: '#4a1942',
    envColor1: '#3d1a2e',
    envColor2: '#1a0d17',
    particleColor: '#f8bbd0',
    size: '50ml',
    availableSizes: ['30ml', '50ml', '100ml'],
    stock: 92,
    featured: true,
  },
  {
    name: 'Citrus Bloom',
    slug: 'citrus-bloom',
    shortDescription: 'A sun-warmed burst of Mediterranean citrus and neroli.',
    description:
      'Citrus Bloom is a luminous, energising fragrance inspired by sun-drenched citrus orchards in full bloom. Bergamot and lemon peel open with electric brightness. Orange blossom and neroli bring a creamy, honeyed softness. The dry-down is warm, clean, and quietly golden — a fragrance that feels like pure sunlight.',
    price: 118,
    category: 'eau-de-toilette',
    fragranceFamily: 'citrus',
    topNotes: ['Bergamot', 'Lemon Peel', 'Grapefruit'],
    heartNotes: ['Orange Blossom', 'Neroli', 'White Tea'],
    baseNotes: ['Vetiver', 'Musk', 'Cedarwood'],
    ingredients: ['Bergamot Essential Oil', 'Cold-Pressed Lemon Peel', 'Neroli Absolute', 'Orange Blossom Water', 'Grapefruit Extract', 'Organic Cedarwood Oil'],
    images: ['/assets/products/citrus-bloom-1.webp', '/assets/products/citrus-bloom-2.webp'],
    liquidColor: '#ffa040',
    glassTint: '#fff9e6',
    labelColor: '#b85c00',
    accentColor: '#ffd700',
    glowColor: '#ffca28',
    capColor: '#3e2000',
    envColor1: '#3d2200',
    envColor2: '#1a0f00',
    particleColor: '#ffcc02',
    size: '50ml',
    availableSizes: ['30ml', '50ml', '100ml'],
    stock: 110,
    featured: true,
  },
  {
    name: 'Ocean Mist',
    slug: 'ocean-mist',
    shortDescription: 'A clean, mineral breath of open ocean and water lily.',
    description:
      'Ocean Mist captures the feeling of standing at the edge of the sea as mist rolls in from the water. Sea salt and water lily create an airy, aquatic opening. White musk and driftwood bring depth and a quiet sense of solitude. This is a fragrance for those who find peace in open spaces and the rhythm of water.',
    price: 122,
    category: 'eau-de-toilette',
    fragranceFamily: 'aquatic',
    topNotes: ['Sea Salt', 'Water Lily', 'Cucumber'],
    heartNotes: ['Aquatic Accord', 'Iris', 'Cyclamen'],
    baseNotes: ['Driftwood', 'White Musk', 'Ambergris'],
    ingredients: ['Sea Salt Extract', 'Water Lily Absolute', 'Iris Root', 'Driftwood Accord', 'White Musk', 'Ambergris Tincture'],
    images: ['/assets/products/ocean-mist-1.webp', '/assets/products/ocean-mist-2.webp'],
    liquidColor: '#00b4d8',
    glassTint: '#e0f7fa',
    labelColor: '#01579b',
    accentColor: '#b0e0e6',
    glowColor: '#4fc3f7',
    capColor: '#0d2137',
    envColor1: '#0d2137',
    envColor2: '#061320',
    particleColor: '#80deea',
    size: '50ml',
    availableSizes: ['30ml', '50ml', '100ml'],
    stock: 78,
    featured: false,
  },
  {
    name: 'Lavender Haze',
    slug: 'lavender-haze',
    shortDescription: 'A dreamy, calming haze of Provençal lavender and iris.',
    description:
      'Lavender Haze is a meditative, soft fragrance inspired by fields of Provençal lavender in the hour before dusk. Lavender absolute opens with its unmistakable clarity. Iris root adds a cool, powdery elegance at the heart. Vanilla and sandalwood create a warm, enveloping base that fades like a slow exhale into the evening.',
    price: 132,
    category: 'eau-de-parfum',
    fragranceFamily: 'herbal',
    topNotes: ['Lavender Absolute', 'Bergamot', 'Mint'],
    heartNotes: ['Iris Root', 'Violet', 'Rose'],
    baseNotes: ['Vanilla', 'Sandalwood', 'Tonka Bean'],
    ingredients: ['Lavender Absolute', 'Iris Root Absolute', 'Organic Bergamot Oil', 'Vanilla Absolute', 'Sandalwood Oil', 'Tonka Bean Extract'],
    images: ['/assets/products/lavender-haze-1.webp', '/assets/products/lavender-haze-2.webp'],
    liquidColor: '#9b59b6',
    glassTint: '#f3e5f5',
    labelColor: '#6a1b9a',
    accentColor: '#ce93d8',
    glowColor: '#ba68c8',
    capColor: '#311b47',
    envColor1: '#2d1b69',
    envColor2: '#1a0d3d',
    particleColor: '#ce93d8',
    size: '50ml',
    availableSizes: ['30ml', '50ml', '100ml'],
    stock: 65,
    featured: true,
  },
  {
    name: 'Golden Oud',
    slug: 'golden-oud',
    shortDescription: 'A rich, cinematic oud with saffron warmth and sandalwood depth.',
    description:
      'Golden Oud is the most opulent expression in the Verdara collection — a deep, resinous composition centred around rare aged oud wood. Saffron threads weave golden warmth through the opening. Amber adds a honeyed, animalic resonance. Sandalwood in the base creates a creamy, enduring foundation. This is a fragrance to be worn with intention.',
    price: 198,
    category: 'parfum',
    fragranceFamily: 'oriental',
    topNotes: ['Saffron', 'Cardamom', 'Pink Pepper'],
    heartNotes: ['Oud Wood', 'Rose Absolute', 'Incense'],
    baseNotes: ['Amber', 'Sandalwood', 'Vetiver', 'Musk'],
    ingredients: ['Aged Oud Wood Oil', 'Saffron Absolute', 'Ambergris', 'Sandalwood Essential Oil', 'Cardamom Extract', 'Rose Absolute'],
    images: ['/assets/products/golden-oud-1.webp', '/assets/products/golden-oud-2.webp'],
    liquidColor: '#c8960c',
    glassTint: '#fdf3d0',
    labelColor: '#5d3a00',
    accentColor: '#ffd700',
    glowColor: '#f4a020',
    capColor: '#1a0a00',
    envColor1: '#1a0a00',
    envColor2: '#0d0500',
    particleColor: '#f4a020',
    size: '50ml',
    availableSizes: ['30ml', '50ml'],
    stock: 40,
    featured: true,
  },
];

const seed = async () => {
  try {
    console.log('🌿 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected.');

    console.log('🗑️  Clearing existing products...');
    await Product.deleteMany({});

    console.log('🌱 Seeding products...');
    const inserted = await Product.insertMany(products);

    console.log(`✅ Successfully seeded ${inserted.length} Verdara perfumes:`);
    inserted.forEach((p) => console.log(`   🍃 ${p.name} (${p.slug})`));
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
    process.exit(0);
  }
};

seed();
