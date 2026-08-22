'use client';

import { useEffect } from 'react';

export default function WebVitals() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (process.env.NODE_ENV === 'development') {
            const val = entry.value !== undefined ? entry.value : entry.startTime;
            console.log(`[Web Vitals] ${entry.name || entry.entryType}:`, Math.round(val * 100) / 100);
          }
        }
      });

      const types = ['largest-contentful-paint', 'paint', 'layout-shift', 'first-input'];
      types.forEach((type) => {
        try {
          observer.observe({ type, buffered: true });
        } catch (e) {
          // Ignore unsupported entry types
        }
      });

      return () => observer.disconnect();
    } catch (e) {
      // Safe fallback
    }
  }, []);

  return null;
}
