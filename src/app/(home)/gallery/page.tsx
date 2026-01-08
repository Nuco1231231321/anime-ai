"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Search,
    ImageIcon,
    Video,
    Zap,
    Maximize2,
    Layout,
    Sparkles,
    Heart,
    ArrowRight
} from "lucide-react";
import Masonry from "react-masonry-css";

export default function GalleryPage() {
    const [search, setSearch] = useState("");

    const modes = [
        { label: "Image Generation", icon: <ImageIcon className="w-5 h-5 md:w-6 md:h-6" />, active: true, href: "/generator" },
        { label: "AI Video", icon: <Video className="w-5 h-5 md:w-6 md:h-6" />, active: false, href: "#", badge: "Soon" },
        { label: "Upscaler", icon: <Maximize2 className="w-5 h-5 md:w-6 md:h-6" />, active: false, href: "#" },
    ];

    // Using your local file paths with randomized aspect ratios for a natural masonry feel
    const galleryImages = [
        { title: "School Hallway Masterpiece", author: "AnimeLab", image: "/gallery/anime-girl-sailor-uniform-school-hallway-masterpiece.webp", aspect: "aspect-[2/3]" },
        { title: "Cyber Idol Concert", author: "NeonStar", image: "/gallery/masterpiece-anime-idol-singer-concert-stage-outfit.webp", aspect: "aspect-square" },
        { title: "Clinical White Ward", author: "HealthArt", image: "/gallery/masterpiece-anime-nurse-uniform-stethoscope-hospital.webp", aspect: "aspect-[3/4]" },
        { title: "Iridescent Streetwear", author: "FutureVibe", image: "/gallery/modern-anime-girl-iridescent-jacket-holographic-aesthetic.webp", aspect: "aspect-[9/16]" },
        { title: "3D Cinematic Render", author: "PixarStyle", image: "/gallery/pixar-disney-style-3d-anime-girl-cinematic-render.webp", aspect: "aspect-[2/3]" },
        { title: "Ghibli Nostalgic Bus Stop", author: "SpiritStudio", image: "/gallery/ghibli-inspired-nostalgic-countryside-bus-stop-scenery.webp", aspect: "aspect-video" },
        { title: "Premium Stage Performance", author: "IdolManager", image: "/gallery/masterpiece-anime-idol-singer-concert-stage-outfit.webp", aspect: "aspect-[3/4]" },
        { title: "Holographic Vision 2026", author: "Visionary", image: "/gallery/modern-anime-girl-iridescent-jacket-holographic-aesthetic.webp", aspect: "aspect-square" },
    ];

    // Responsive breakpoints for Masonry grid
    const breakpointColumnsObj = {
        default: 4,
        1280: 3,
        768: 2,
        640: 1
    };

    return (
        <div className="min-h-screen bg-[#050507] text-white font-sans selection:bg-purple-500/30">

            {/* Hero Section */}
            <section className="relative w-full pt-32 pb-20 flex flex-col items-center justify-center px-6 overflow-hidden">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-600/10 blur-[120px]" />
                </div>

                <div className="relative z-10 w-full max-w-4xl text-center space-y-10">
                    <div className="space-y-4">
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase italic">
                            Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Anime</span>
                        </h1>
                        <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-2xl mx-auto tracking-tight">
                            Start your creative journey with the world&apos;s most advanced anime AI models.
                        </p>
                    </div>

                    {/* Search & Action Bar */}
                    <div className="relative max-w-2xl mx-auto group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-[28px] opacity-20 group-focus-within:opacity-40 blur-lg transition duration-1000" />
                        <div className="relative flex items-center bg-[#0F0F12]/80 backdrop-blur-2xl border border-white/10 rounded-[24px] px-2 py-2 gap-2 shadow-2xl">
                            <div className="pl-4">
                                <Search className="w-5 h-5 text-zinc-500" />
                            </div>
                            <input
                                type="text"
                                placeholder="A girl running under cherry blossoms..."
                                className="flex-1 bg-transparent border-none outline-none text-sm md:text-base text-white placeholder:text-zinc-600 py-3"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Link
                                href={`/generator?prompt=${encodeURIComponent(search)}`}
                                className="bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-[18px] text-sm font-black transition-all flex items-center gap-2 shrink-0"
                            >
                                <Sparkles className="w-4 h-4 fill-black" />
                                Generate
                            </Link>
                        </div>
                    </div>

                    {/* Quick Nav Toggles */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {modes.map((mode) => (
                            <Link
                                key={mode.label}
                                href={mode.href}
                                className={`group flex items-center gap-3 px-5 py-2.5 rounded-full border transition-all ${mode.active
                                    ? "bg-white/10 border-white/20 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                                    : "bg-transparent border-white/5 text-zinc-500 hover:border-white/20 hover:text-zinc-300"
                                    }`}
                            >
                                {mode.icon}
                                <span className="text-[11px] font-bold uppercase tracking-widest">{mode.label}</span>
                                {mode.badge && (
                                    <span className="bg-purple-600 text-[8px] px-1.5 py-0.5 rounded-full text-white font-black uppercase">
                                        {mode.badge}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Masonry Gallery Feed */}
            <section className="px-6 md:px-10 pb-32 max-w-[1800px] mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                        <h2 className="text-2xl font-black tracking-tight uppercase">Community Feed</h2>
                    </div>
                    <button className="text-xs font-bold text-zinc-500 hover:text-white flex items-center gap-2 transition-colors uppercase tracking-widest">
                        Explore More <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Real Masonry Layout */}
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="flex w-auto -ml-6"
                    columnClassName="pl-6 bg-clip-padding"
                >
                    {galleryImages.map((item, i) => (
                        <div key={i} className="mb-6 group relative cursor-pointer">
                            <div className={`relative w-full ${item.aspect} rounded-[24px] overflow-hidden bg-[#121217] border border-white/5 group-hover:border-purple-500/40 transition-all duration-500 shadow-2xl`}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 brightness-[0.8] group-hover:brightness-105"
                                    loading="lazy"
                                />

                                {/* Info & Interaction Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                                    <div className="flex items-end justify-between">
                                        <div className="space-y-1">
                                            <h3 className="text-sm font-black text-white">{item.title}</h3>
                                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">by {item.author}</p>
                                        </div>
                                        <button className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors border border-white/5">
                                            <Heart className="w-4 h-4 text-white" />
                                        </button>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <button className="flex-1 py-2.5 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-tighter hover:bg-zinc-200 transition-colors">
                                            Remix Prompt
                                        </button>
                                        <button className="w-10 h-10 flex items-center justify-center bg-zinc-800 text-white rounded-xl hover:bg-zinc-700 transition-colors border border-white/5">
                                            <Zap className="w-4 h-4 fill-white" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Masonry>
            </section>

            {/* Mobile Action Button */}
            <div className="fixed bottom-8 right-8 md:hidden z-50">
                <Link href="/generator" className="w-16 h-16 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.5)] border border-white/20 active:scale-90 transition-all">
                    <Zap className="w-7 h-7 text-white fill-white" />
                </Link>
            </div>
        </div>
    );
}