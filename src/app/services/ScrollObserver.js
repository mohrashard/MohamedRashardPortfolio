'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * ScrollObserver - attaches a single IntersectionObserver to every
 * [data-animate] element on the page and adds the "in-view" class when
 * each element enters the viewport.
 */
export default function ScrollObserver() {
    const pathname = usePathname();

    useEffect(() => {
        const observeElements = () => {
            const elements = document.querySelectorAll('[data-animate]:not(.in-view)');

            if (!elements.length) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('in-view');
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.05,
                    rootMargin: '100px 0px 100px 0px', // Generous margin so elements reveal smoothly before scrolling into view
                }
            );

            elements.forEach((el) => observer.observe(el));
            return observer;
        };

        const observer = observeElements();

        // Safety fallback: re-scan after 300ms in case of delayed hydration or client-side rendering
        const timer = setTimeout(() => {
            observeElements();
        }, 300);

        return () => {
            clearTimeout(timer);
            if (observer) observer.disconnect();
        };
    }, [pathname]);

    return null;
}
