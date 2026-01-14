import React from 'react';

export default function SpaceBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020205]">
            {/* Stars */}
            <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
                backgroundSize: '100px 100px',
                opacity: 0.1
            }}></div>

            {/* The Vortex Container - Centered - Optimized */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-30 pointer-events-none">

                {/* Rotating Accretion Disk */}
                <div className="absolute inset-0 rounded-full mix-blend-screen will-change-transform transform-gpu"
                    style={{
                        background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, #4c1d95 120deg, #2563eb 240deg, transparent 360deg)',
                        filter: 'blur(40px)',
                        transform: 'scale(1.5)',
                        animation: 'spin 20s linear infinite'
                    }}>
                </div>

                {/* Counter-Rotating Inner Ring */}
                <div className="absolute inset-[25%] rounded-full mix-blend-screen will-change-transform transform-gpu"
                    style={{
                        background: 'conic-gradient(from 180deg at 50% 50%, transparent 0deg, #818cf8 100deg, transparent 360deg)',
                        filter: 'blur(30px)',
                        transform: 'scale(1.2)',
                        animation: 'spin 15s linear infinite reverse'
                    }}>
                </div>

                {/* Singularity (Central Void) */}
                <div className="absolute inset-[40%] bg-black rounded-full blur-2xl"></div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes spin {
                    from { transform: rotate(0deg) scale(1.5); }
                    to { transform: rotate(360deg) scale(1.5); }
                }
                 @keyframes spin-reverse {
                    from { transform: rotate(360deg) scale(1.2); }
                    to { transform: rotate(0deg) scale(1.2); }
                }
            `}} />
        </div>
    );
}
