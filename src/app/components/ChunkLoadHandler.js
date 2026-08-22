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
                (msg.includes('/_next/static/') && msg.includes('404'))
            );
        };

        const triggerReload = () => {
            const lastReload = sessionStorage.getItem('mr2_chunk_err_reload');
            const now = Date.now();
            // Prevent infinite reload loop by enforcing a 12-second window
            if (!lastReload || now - parseInt(lastReload, 10) > 12000) {
                sessionStorage.setItem('mr2_chunk_err_reload', String(now));
                window.location.reload();
            }
        };

        const handleWindowError = (event) => {
            const target = event.target || event.srcElement;
            
            // Check for resource loading failures (script or CSS link tags for Next.js chunks)
            if (target && (target.tagName === 'SCRIPT' || target.tagName === 'LINK')) {
                const url = target.src || target.href || '';
                if (url.includes('/_next/static/')) {
                    console.warn('[Mr² Labs Autorecovery] Detected missing chunk resource 404:', url);
                    triggerReload();
                    return;
                }
            }

            // Check standard JS error messages
            if (event.message && isChunkError(event.message)) {
                console.warn('[Mr² Labs Autorecovery] Intercepted ChunkLoadError:', event.message);
                triggerReload();
            }
        };

        const handleUnhandledRejection = (event) => {
            const reason = event.reason;
            if (!reason) return;

            const message = reason.message || reason.name || String(reason);
            if (isChunkError(message)) {
                console.warn('[Mr² Labs Autorecovery] Intercepted unhandled promise ChunkLoadError:', message);
                triggerReload();
            }
        };

        // Attach listeners with capture true to catch non-bubbling resource errors
        window.addEventListener('error', handleWindowError, true);
        window.addEventListener('unhandledrejection', handleUnhandledRejection);

        return () => {
            window.removeEventListener('error', handleWindowError, true);
            window.removeEventListener('unhandledrejection', handleUnhandledRejection);
        };
    }, []);

    return null;
}
