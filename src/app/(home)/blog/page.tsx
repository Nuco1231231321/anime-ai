"use client";

import { Sparkles, ArrowLeft, Calendar, User, Clock, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BlogPage() {
    return (
        <div className="flex h-screen w-full bg-[#050505] text-zinc-100 overflow-hidden font-sans">
            <main className="flex-1 h-full overflow-y-auto custom-scrollbar relative bg-[#08080A]">
                <section className="relative w-full h-[50vh] flex flex-col items-center justify-center px-6 overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/hero/architecture-modern.webp"
                            className="w-full h-full object-cover opacity-40 scale-110 blur-sm"
                            alt="Blog Hero"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/80 to-transparent" />
                    </div>

                    <div className="relative z-10 max-w-4xl w-full">

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest uppercase">
                                    Guide
                                </span>
                                <span className="w-1 h-1 rounded-full bg-zinc-700" />
                                <div className="flex items-center gap-2 text-zinc-500 text-xs font-medium">
                                    <Calendar className="w-3 h-3" /> Jan 8, 2026
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white mb-8 leading-[1.1]">
                                How to Use <span className="text-indigo-500">Anime AI Art Generator</span> to Create Top-Tier Anime Art in 2026?
                            </h1>

                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center overflow-hidden">
                                        <img src="/avatar-placeholder.png" className="w-full h-full object-cover" alt="Author" />
                                    </div>
                                </div>
                                <div className="h-8 w-px bg-white/5" />
                                <div className="flex flex-col">
                                    <p className="text-sm font-bold text-white">8 min</p>
                                    <p className="text-[11px] text-zinc-500">Read time</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="max-w-4xl mx-auto px-6 pb-32">
                    <div className="prose prose-invert prose-zinc max-w-none">
                        <p className="text-xl text-zinc-400 leading-relaxed mb-12">
                            In 2026, the boundaries of anime art are being redefined. If you are looking for the most powerful <strong>Anime AI Art Generator</strong>, you have come to the right place. Today, AI is no longer just about generating a random image; it's about letting you control every pixel like an animation director.
                        </p>

                        <h2 className="text-3xl font-bold text-white mt-16 mb-8 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-indigo-500" />
                            </div>
                            1. Why 2026's Anime AI Art Generator is Different?
                        </h2>
                        <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                            In the past, AI-generated content was often criticized for "uncanny valley" effects or style inconsistencies. But today's <strong>AI Art Generator Anime</strong> technology—powered by our Seedream engine and top-tier RTX processing—has solved these pain points:
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0 mb-12">
                            <li className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                <h3 className="text-white font-bold text-lg mb-2">Style Precision</h3>
                                <p className="text-zinc-500 text-sm">Whether it's classic 90s cel-shaded or modern cinematic light, switch styles instantly with perfect consistency.</p>
                            </li>
                            <li className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                <h3 className="text-white font-bold text-lg mb-2">Composition Stability</h3>
                                <p className="text-zinc-500 text-sm">Integrated Prompt Hub ensures complex "perspective" or "full-body" shots maintain perfect proportions every time.</p>
                            </li>
                        </ul>

                        <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 mb-12 group">
                            <div className="absolute inset-0 bg-zinc-900 animate-pulse group-hover:hidden" />
                            {/* [Placeholder for actual image] */}
                            <div className="absolute inset-0 flex items-center justify-center text-zinc-700 bg-zinc-900 flex-col gap-2">
                                <p className="text-sm font-medium">Comparison: Standard AI vs Pollo AI</p>
                                <span className="text-[10px] text-zinc-800">[Upload Image: Professional Art Style Capture]</span>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mt-20 mb-8">2. Deep Dive: Three Steps to Your Anime Masterpiece</h2>
                        <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                            To stand out among the crowd of <strong>Anime AI Generator</strong> users, you need to master the right "incantations."
                        </p>

                        <div className="space-y-8 mb-16">
                            <div className="flex gap-6 items-start">
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center text-indigo-500 font-bold">1</div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Enable Your Prompt Hub</h3>
                                    <p className="text-zinc-500">Go to our editor and you'll find the input bar is not just a text box, but an intelligent hub. Click to expand advanced settings.</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center text-indigo-500 font-bold">2</div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Configure Art Parameters</h3>
                                    <p className="text-zinc-500">Quickly toggle Ratio (16:9 for movies, 9:16 for stories) and Model (Seedream 4.0 for elite detail).</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center text-indigo-500 font-bold">3</div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">Structure Your Prompt</h3>
                                    <p className="text-zinc-500">Use specialized templates for structured results that the AI can truly understand.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-[32px] p-8 md:p-12 mb-16 relative overflow-hidden">
                            <div className="relative z-10">
                                <h4 className="text-indigo-400 font-black italic tracking-wider text-xs uppercase mb-4">Recommended Prompt Template</h4>
                                <code className="block text-indigo-100 text-lg md:text-2xl bg-black/40 p-6 rounded-2xl border border-white/5 font-mono mb-6 leading-relaxed">
                                    (masterpiece:1.2), (highres), anime style, [Subject Character], [Action/State], [Specific Background], cinematic lighting, [Art Style Tag]
                                </code>
                                <button className="bg-indigo-500 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-indigo-600 transition-all flex items-center gap-2">
                                    Copy Template <Sparkles className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px]" />
                        </div>

                        <h2 className="text-3xl font-bold text-white mt-20 mb-8">3. FAQ — Breaking Your Creative Blocks</h2>
                        <div className="space-y-6">
                            {[
                                { q: "Why are my generated images blurry?", a: "Ensure you've selected 'Seedream 4.0' in the model menu. It's optimized for crisp 4K lines." },
                                { q: "Is the generator free to use?", a: "We offer daily credits. For RTX 8090 priority and high-upscales, check our pro plans." },
                                { q: "Can I use these for commercial projects?", a: "Yes, users on our Pro and Enterprise tiers own full commercial rights to their output." }
                            ].map((faq, i) => (
                                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                    <h4 className="text-white font-bold mb-2">Q: {faq.q}</h4>
                                    <p className="text-zinc-500 text-sm leading-relaxed">A: {faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-24 p-12 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[48px] text-center relative overflow-hidden group">
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-black italic text-white mb-6">Join the Revolution</h2>
                            <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">The magical "Let's Create" portal is waiting for you. Turn your imagination into pixels today.</p>
                            <Link href="/generator" className="inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-[24px] font-black text-lg hover:scale-105 transition-transform shadow-2xl">
                                Start Creating Now <ChevronRight className="w-6 h-6" />
                            </Link>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
                    </div>
                </section>
            </main>
        </div>
    );
}
