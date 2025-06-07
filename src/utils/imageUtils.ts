// Image optimization utilities

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImages = async (sources: string[]): Promise<void> => {
  try {
    await Promise.all(sources.map(preloadImage));
  } catch (error) {
    console.warn('Some images failed to preload:', error);
  }
};

// Create optimized image URLs (for future WebP conversion)
export const getOptimizedImageUrl = (src: string): string => {
  // For now, return the original URL
  // In a real implementation, you might add query parameters for image optimization
  return src;
};

// Lazy loading intersection observer
export const createLazyLoadObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void
): IntersectionObserver => {
  return new IntersectionObserver(callback, {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  });
}; 