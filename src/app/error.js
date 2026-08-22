'use client';

import { useEffect, useState } from 'react';

export default function GlobalErrorPage({ error, reset }) {
    const [isChunkError, setIsChunkError] = useState(false);

    useEffect(() => {
        const errStr = String(error?.message || error?.name || error || '').toLowerCase();
        const detected = (
            errStr.includes('chunkloaderror') ||
            errStr.includes('loading chunk') ||
            errStr.includes('failed to fetch dynamically imported module') ||
            errStr.includes('css chunk') ||
            errStr.includes('/_next/static/')
        );

        if (detected) {
            setIsChunkError(true);
            const lastReload = sessionStorage.getItem('mr2_chunk_err_reload');
            const now = Date.now();
            if (!lastReload || now - parseInt(lastReload, 10) > 12000) {
                sessionStorage.setItem('mr2_chunk_err_reload', String(now));
                const timer = setTimeout(() => {
                    window.location.reload();
                }, 800);
                return () => clearTimeout(timer);
            }
        }
    }, [error]);

    const handleManualReload = () => {
        sessionStorage.setItem('mr2_chunk_err_reload', String(Date.now()));
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-100 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 text-center backdrop-blur-xl shadow-2xl">
                <div className="w-16 h-16 bg-[#0066FF]/10 rounded-2xl border border-[#0066FF]/20 flex items-center justify-center mx-auto mb-6">
                    {isChunkError ? (
                        <svg className="w-8 h-8 text-[#0066FF] animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    )}
                </div>

                <h1 className="text-2xl font-bold tracking-tight mb-2">
                    {isChunkError ? 'Updating Application...' : 'Something went wrong'}
                </h1>
                
                <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
                    {isChunkError
                        ? 'A new version of Mr² Labs has been deployed. Refreshing to load the latest code and performance updates...'
                        : 'An unexpected application error occurred. You can retry the action or reload the page.'}
                </p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleManualReload}
                        className="w-full py-3 px-4 bg-[#0066FF] hover:bg-[#0052CC] text-white font-medium rounded-xl transition-all shadow-lg shadow-[#0066FF]/20 flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Refresh Page Now
                    </button>

                    {!isChunkError && reset && (
                        <button
                            onClick={() => reset()}
                            className="w-full py-3 px-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium rounded-xl transition-all"
                        >
                            Try Again
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
