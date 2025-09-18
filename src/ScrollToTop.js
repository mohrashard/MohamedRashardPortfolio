// ScrollToTop.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use requestAnimationFrame for smoother scrolling
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Instant scroll to prevent animation conflicts
      });
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(scrollToTop, 0);

    // Cleanup
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}