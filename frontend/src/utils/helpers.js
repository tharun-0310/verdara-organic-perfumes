/**
 * Format a price number to USD currency string
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
};

/**
 * Clamp a number between min and max
 */
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/**
 * Linear interpolation
 */
export const lerp = (start, end, t) => start + (end - start) * t;

/**
 * Map a value from one range to another
 */
export const mapRange = (value, inMin, inMax, outMin, outMax) => {
  const mapped = ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
  return clamp(mapped, Math.min(outMin, outMax), Math.max(outMin, outMax));
};

/**
 * Detect low-powered devices (mobile + reduced capability)
 */
export const isLowPoweredDevice = () => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const deviceMemory = navigator.deviceMemory;
  const cpuCores = navigator.hardwareConcurrency;

  return isMobile || (deviceMemory && deviceMemory < 4) || (cpuCores && cpuCores < 4);
};

/**
 * Detect if WebGL is supported
 */
export const isWebGLSupported = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
};

/**
 * Truncate text to a given length
 */
export const truncate = (text, length = 100) => {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
};

/**
 * Generate star rating array
 */
export const getStars = (rating, max = 5) => {
  return Array.from({ length: max }, (_, i) => ({
    filled: i < Math.floor(rating),
    half: i === Math.floor(rating) && rating % 1 >= 0.5,
    empty: i >= Math.ceil(rating),
  }));
};

/**
 * Slugify a string
 */
export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');

/**
 * Debounce function
 */
export const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};
