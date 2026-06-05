'use client';

import { useEffect } from 'react';

/**
 * ScrollObserver — attaches a single IntersectionObserver to every
 * [data-animate] element on the page and adds the "in-view" class when
 * each element enters the viewport.
 *
 * All animation states are defined in globals.css using GPU-composited
 * properties only (opacity + transform), so there is zero layout thrash.
 */
export default function ScrollObserver() {
    useEffect(() => {
        const elements = document.querySelectorAll('[data-animate]');

        if (!elements.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        observer.unobserve(entry.target); // fire once, then stop watching
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: '0px 0px -48px 0px', // trigger a bit before the bottom edge
            }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return null; // renders nothing, purely side-effect
}
