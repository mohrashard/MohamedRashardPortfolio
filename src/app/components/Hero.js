"use client";
import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
    Float,
    MeshDistortMaterial,
    GradientTexture,
    PerspectiveCamera,
    OrbitControls,
    Points,
    PointMaterial,
    MeshWobbleMaterial
} from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram, Rocket, Briefcase, ChevronDown } from "lucide-react";
import * as THREE from "three";

// --- 3D Components ---

function ParticleField({ count = 2000 }) {
    const pointsRef = useRef(null);
    const [mouse] = useState(() => new THREE.Vector2());

    // Create a distribution that feels like a nebula
    const points = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 20;
            p[i * 3 + 1] = (Math.random() - 0.5) * 20;
            p[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return p;
    }, [count]);

    useFrame((state) => {
        if (!pointsRef.current) return;
        // Subtle drift based on mouse
        const x = (state.mouse.x * 0.2);
        const y = (state.mouse.y * 0.2);
        pointsRef.current.rotation.y += 0.001 + (x * 0.005);
        pointsRef.current.rotation.x += 0.0005 + (y * 0.005);
    });

    return (
        <Points ref={pointsRef} positions={points} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#818cf8"
                size={0.015}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

function FloatingCore() {
    return (
        <Float speed={2} rotationIntensity={2} floatIntensity={2}>
            <mesh>
                <icosahedronGeometry args={[2.2, 20]} />
                <MeshDistortMaterial
                    distort={0.45}
                    speed={5}
                    roughness={0}
                    metalness={1}
                    emissive="#1e1b4b"
                    emissiveIntensity={0.5}
                >
                    <GradientTexture
                        stops={[0, 0.4, 0.8, 1]}
                        colors={['#0ea5e9', '#6366f1', '#4338ca', '#1e3a8a']}
                    />
                </MeshDistortMaterial>
            </mesh>
            {/* Outer wireframe shell for technical feel */}
            <mesh scale={1.1}>
                <icosahedronGeometry args={[2.2, 2]} />
                <meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.1} />
            </mesh>
        </Float>
    );
}

// --- UI Components ---

const TypingEffect = () => {
    const titles = ["Software Engineer", "AI/ML Expert", "Web Architect", "Full-Stack Dev"];
    const [index, setIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    React.useEffect(() => {
        const timeout = setTimeout(() => {
            const currentTitle = titles[index % titles.length];
            if (!isDeleting) {
                setDisplayText(currentTitle.substring(0, displayText.length + 1));
                if (displayText === currentTitle) {
                    setTimeout(() => setIsDeleting(true), 2500);
                }
            } else {
                setDisplayText(currentTitle.substring(0, displayText.length - 1));
                if (displayText === "") {
                    setIsDeleting(false);
                    setIndex(index + 1);
                }
            }
        }, isDeleting ? 40 : 80);
        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, index]);

    return (
        <div className="h-8 flex items-center">
            <span className="text-blue-400 font-mono tracking-wider">
                {"> "} {displayText}
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2 h-5 bg-blue-400 ml-1 align-middle"
                />
            </span>
        </div>
    );
};

export default function Hero() {
    return (
        <section id="home" className="relative w-full h-screen bg-[#020202] overflow-hidden">

            {/* Background Mesh Gradient */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full" />
            </div>

            {/* 3D Engine Layer */}
            <div className="absolute inset-0 z-0">
                <Canvas dpr={[1, 2]}>
                    <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                    <ambientLight intensity={0.2} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#6366f1" />
                    <pointLight position={[-10, -10, -10]} intensity={1} color="#0ea5e9" />

                    <FloatingCore />
                    <ParticleField />

                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.3}
                    />
                </Canvas>
            </div>

            {/* Content Layer */}
            <div className="relative z-10 w-full h-full flex items-center px-6 md:px-16 pt-20 pointer-events-none">
                <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-8 items-center">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8 pointer-events-auto"
                    >
                        <div className="space-y-4">


                            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[0.95] tracking-tighter">
                                <motion.span
                                    initial={{ filter: "blur(10px)", opacity: 0 }}
                                    animate={{ filter: "blur(0px)", opacity: 1 }}
                                    transition={{ duration: 1 }}
                                >
                                    MOHAMED
                                </motion.span>
                                <br />
                                <motion.span
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 1 }}
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400"
                                >
                                    RASHARD RIZMI.
                                </motion.span>
                            </h1>

                            <TypingEffect />
                        </div>

                        <p className="text-slate-400 max-w-md text-lg leading-relaxed font-light">
                            Crafting <span className="text-white font-medium">digital intelligence</span> through high-performance code and neural architectures.
                        </p>

                        <div className="flex flex-wrap gap-6 pt-4">
                            <motion.a
                                whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(99,102,241,0.8), 0 0 80px rgba(59,130,246,0.6)" }}
                                whileTap={{ scale: 0.95 }}
                                animate={{
                                    boxShadow: ["0px 0px 30px rgba(99,102,241,0.5), 0px 0px 50px rgba(59,130,246,0.3)", "0px 0px 60px rgba(99,102,241,0.8), 0px 0px 100px rgba(59,130,246,0.5)", "0px 0px 30px rgba(99,102,241,0.5), 0px 0px 50px rgba(59,130,246,0.3)"]
                                }}
                                transition={{
                                    default: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                                    scale: { duration: 0.2 },
                                    boxShadow: { duration: 0.2 } // Fast transition for hover overrides
                                }}
                                href="/labs"
                                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-md flex items-center gap-3 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <Rocket className="relative z-10 w-5 h-5 transition-transform group-hover:-rotate-12" />
                                <span className="relative z-10">LAUNCH LABS</span>
                            </motion.a>

                            <motion.a
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(99,102,241,0.5), 0 0 60px rgba(59,130,246,0.3)", borderColor: "rgba(59,130,246,0.8)" }}
                                whileTap={{ scale: 0.95 }}
                                animate={{
                                    boxShadow: ["0px 0px 15px rgba(99,102,241,0.3)", "0px 0px 35px rgba(99,102,241,0.6)", "0px 0px 15px rgba(99,102,241,0.3)"],
                                    borderColor: ["rgba(59,130,246,0.3)", "rgba(59,130,246,0.6)", "rgba(59,130,246,0.3)"]
                                }}
                                transition={{
                                    default: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                                    scale: { duration: 0.2 }
                                }}
                                href="#contact"
                                className="px-8 py-4 border text-white font-bold rounded-md hover:bg-blue-500/10 transition-all flex items-center gap-3 backdrop-blur-sm"
                            >
                                <Briefcase className="w-4 h-4" />
                                INITIATE CONTACT
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Enhanced Social Sidebar */}
                    <div className="hidden lg:flex flex-col items-end gap-5 pointer-events-auto">
                        {[
                            { icon: <Linkedin size={20} />, link: "https://www.linkedin.com/in/mohamedrashard", label: "LinkedIn" },
                            { icon: <Github size={20} />, link: "https://github.com/mohrashard/", label: "Github" },
                            { icon: <Twitter size={20} />, link: "https://x.com/mrr_labs", label: "Twitter" },
                            { icon: <Instagram size={20} />, link: "https://www.instagram.com/mrr_labs/", label: "Instagram" }
                        ].map((social, i) => (
                            <motion.a
                                key={i}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + (i * 0.1) }}
                                whileHover={{ x: -10, backgroundColor: "rgba(255,255,255,0.1)" }}
                                className="group flex items-center gap-4 text-white/40 hover:text-blue-400 transition-all"
                            >
                                <span className="text-[10px] font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity uppercase">
                                    {social.label}
                                </span>
                                <div className="w-12 h-12 border border-white/5 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-md group-hover:border-blue-500/50">
                                    {social.icon}
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section: Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-30 pointer-events-none"
            >
                <span className="text-[10px] font-bold tracking-[0.4em] text-white uppercase">Scroll</span>
                <ChevronDown className="text-white w-4 h-4" />
            </motion.div>

            {/* Aesthetic Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-50 opacity-10" />

            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#020202] to-transparent z-20 pointer-events-none" />
        </section>
    );
}