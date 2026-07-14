const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required.'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required.'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required.'],
      maxlength: [200, 'Short description cannot exceed 200 characters.'],
    },
    description: {
      type: String,
      required: [true, 'Description is required.'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required.'],
      min: [0, 'Price cannot be negative.'],
    },
    category: {
      type: String,
      enum: ['eau-de-parfum', 'eau-de-toilette', 'parfum', 'body-mist'],
      default: 'eau-de-parfum',
    },
    fragranceFamily: {
      type: String,
      enum: ['floral', 'woody', 'citrus', 'aquatic', 'oriental', 'herbal', 'musky'],
      required: [true, 'Fragrance family is required.'],
    },
    topNotes: [{ type: String }],
    heartNotes: [{ type: String }],
    baseNotes: [{ type: String }],
    ingredients: [{ type: String }],
    images: [{ type: String }],
    modelUrl: { type: String, default: null },

    // 3D Scene Properties
    liquidColor: { type: String, default: '#a3c9a8' },
    glassTint: { type: String, default: '#e8f4e8' },
    labelColor: { type: String, default: '#2d5a27' },
    accentColor: { type: String, default: '#c9a84c' },
    glowColor: { type: String, default: '#7ec8a0' },
    capColor: { type: String, default: '#2c2c2c' },
    envColor1: { type: String, default: '#1a3a2a' },
    envColor2: { type: String, default: '#0d1f17' },
    particleColor: { type: String, default: '#7ec8a0' },

    size: {
      type: String,
      default: '50ml',
    },
    availableSizes: [{ type: String }],

    stock: {
      type: Number,
      default: 100,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Text search index
productSchema.index({ name: 'text', description: 'text', fragranceFamily: 'text' });

module.exports = mongoose.model('Product', productSchema);
