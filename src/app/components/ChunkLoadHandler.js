'use client';

import { useEffect } from 'react';

export default function ChunkLoadHandler() {
    useEffect(() => {
        const isChunkError = (errMessage) => {
            if (!errMessage) return false;
            const msg = String(errMessage).toLowerCase();
            return (
                msg.includes('chunkloaderror') ||
                msg.includes('loading chunk') ||
                msg.includes('failed to fetch dynamically imported module') ||
                msg.includes('css chunk') ||
                (msg.includes('/_next/static/') && (msg.includes('404') || msg.includes('failed')))
            );
        };

        const triggerCacheBypassingReload = () => {
            const lastReload = sessionStorage.getItem('mr2_chunk_err_reload');
            const now = Date.now();
            if (!lastReload || now - parseInt(lastReload, 10) > 8000) {
                sessionStorage.setItem('mr2_chunk_err_reload', String(now));
                const search = window.location.search || '';
                const cleanSearch = search.replace(/([?&])nocache=[^&]*(&|$)/, '$1').replace(/[?&]$/, '');
                const sep = cleanSearch ? '&' : '?';
                window.location.href = window.location.pathname + cleanSearch + sep + 'nocache=' + now;
            }
        };

        const handleWindowError = (event) => {
            const target = event.target || event.srcElement;
            
            if (target && (target.tagName === 'SCRIPT' || target.tagName === 'LINK')) {
                const url = target.src || target.href || '';
                if (url.includes('/_next/static/')) {
                    console.warn('[Mr² Labs Autorecovery] Detected missing chunk resource:', url);
                    triggerCacheBypassingReload();
                    return;
                }
            }

            if (event.message && isChunkError(event.message)) {
                console.warn('[Mr² Labs Autorecovery] Intercepted ChunkLoadError:', event.message);
                triggerCacheBypassingReload();
            }
        };

        const handleUnhandledRejection = (event) => {
            const reason = event.reason;
            if (!reason) return;

            const message = reason.message || reason.name || String(reason);
            if (isChunkError(message)) {
                console.warn('[Mr² Labs Autorecovery] Intercepted unhandled promise ChunkLoadError:', message);
                triggerCacheBypassingReload();
            }
        };

        window.addEventListener('error', handleWindowError, true);
        window.addEventListener('unhandledrejection', handleUnhandledRejection);

        // Native PerformanceObserver tracking LCP, FCP, CLS, and INP metrics
        let observer = null;
        if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
            try {
                observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (process.env.NODE_ENV === 'development') {
                            const val = entry.value !== undefined ? entry.value : entry.startTime;
                            console.log(`[Web Vitals] ${entry.name || entry.entryType}:`, Math.round(val * 100) / 100);
                        }
                    }
                });
                const types = ['largest-contentful-paint', 'paint', 'layout-shift', 'first-input'];
                types.forEach((type) => {
                    try { observer.observe({ type, buffered: true }); } catch (e) {}
                });
            } catch (e) {}
        }

        return () => {
            window.removeEventListener('error', handleWindowError, true);
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
            if (observer) observer.disconnect();
        };
    }, []);

    return null;
}
