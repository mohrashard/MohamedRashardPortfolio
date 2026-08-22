'use client';

import { useEffect } from 'react';

export function WebVitals() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    try {
      // Native PerformanceObserver tracking LCP, FCP, CLS, and INP metrics
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (process.env.NODE_ENV === 'development') {
            const val = entry.value !== undefined ? entry.value : entry.startTime;
            console.log(`[Web Vitals] ${entry.name || entry.entryType}:`, Math.round(val * 100) / 100);
          }
        }
      });

      observer.observe({ type: 'largest-contentful-paint', buffered: true });
      observer.observe({ type: 'paint', buffered: true });
      observer.observe({ type: 'layout-shift', buffered: true });
      observer.observe({ type: 'first-input', buffered: true });

      return () => observer.disconnect();
    } catch (e) {
      // Safe fallback if browser doesn't support specific observer entry types
    }
  }, []);

  return null;
}
