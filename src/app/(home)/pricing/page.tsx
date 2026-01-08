"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, Zap, ShieldCheck, Crown, Plus, Minus, RefreshCcw, Lock } from "lucide-react";

// --- Data Configuration ---

const plans = [
    {
        name: "Starter",
        price: { monthly: 9.9, yearly: 7.9 },
        desc: "For hobbyists starting their anime journey.",
        features: [
            "200 High-speed credits / mo",
            "Standard Image Generation",
            "Remove Watermark",
            "Personal Use Only",
            "Basic Upscaling (2K)",
        ],
        icon: <Zap className="w-5 h-5 text-zinc-400" />,
        isPopular: false,
    },
    {
        name: "Pro",
        price: { monthly: 24.9, yearly: 19.9 },
        desc: "The perfect balance for serious creators.",
        features: [
            "800 High-speed credits / mo",
            "Character Lock (Beta)",
            "Advanced AI Models (V6 Stable)",
            "Priority Generation Queue",
            "Commercial Rights",
            "Ultra-HD Upscaling (4K)",
            "Early Access to Video Gen",
        ],
        icon: <Crown className="w-5 h-5 text-indigo-400" />,
        isPopular: true,
    },
    {
        name: "Studio",
        price: { monthly: 49.9, yearly: 39.9 },
        desc: "Unlimited power for professional projects.",
        features: [
            "2500 High-speed credits / mo",
            "Private Mode (Stealth Gen)",
            "Bulk Generation (Batch)",
            "Priority API Access",
            "Full Commercial License",
            "Dedicated Support",
            "Maximum Video Gen Quota",
        ],
        icon: <ShieldCheck className="w-5 h-5 text-purple-400" />,
        isPopular: false,
    },
];

const faqs = [
    {
        question: "How does the 14-day refund policy work?",
        answer: "We offer a 'Creative Satisfaction' guarantee. If you've used less than 10% of your monthly credits and are unhappy with the results within the first 14 days, contact us for a full refund. No questions asked."
    },
    {
        question: "Can I upgrade or downgrade my plan later?",
        answer: "Absolutely. You can change your plan at any time. When upgrading, the prorated amount will be charged immediately. Downgrades take effect at the end of your current billing cycle."
    },
    {
        question: "Do my unused credits roll over?",
        answer: "For the Pro and Studio plans, up to 2 months' worth of unused credits roll over to the next month. Starter plan credits reset monthly to keep costs low."
    },
    {
        question: "Is my payment information secure?",
        answer: "Yes. We use Stripe for payment processing, which is the industry standard for security. We do not store any of your credit card details on our servers."
    }
];

// --- Components ---

export default function PricingSection() {
    const [isYearly, setIsYearly] = useState(true);
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    return (
        <section className="py-24 bg-[#050505] text-white overflow-hidden relative">
            {/* Background Ambience */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">

                {/* 1. Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-[1.1]">
                            Pricing Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Certainty</span>
                        </h2>
                        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                            Choose a plan that fits your creative workflow. Transparent pricing, no hidden fees, cancel anytime.
                        </p>
                    </motion.div>

                    {/* Toggle Switch */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="mt-10 inline-flex items-center justify-center p-1.5 bg-zinc-900/80 backdrop-blur-sm border border-white/5 rounded-full"
                    >
                        <button
                            onClick={() => setIsYearly(false)}
                            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${!isYearly ? "bg-zinc-800 text-white shadow-lg" : "text-zinc-500 hover:text-zinc-300"}`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setIsYearly(true)}
                            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${isYearly ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "text-zinc-500 hover:text-zinc-300"}`}
                        >
                            Yearly <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded ml-1">Save 20%</span>
                        </button>
                    </motion.div>
                </div>

                {/* 2. Pricing Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mb-24">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative flex flex-col p-8 rounded-[32px] border transition-all duration-500 group ${plan.isPopular
                                ? "bg-zinc-900/60 border-indigo-500/50 shadow-[0_0_80px_rgba(79,70,229,0.15)] md:-translate-y-4 z-10"
                                : "bg-zinc-900/20 border-white/5 hover:border-white/10 hover:bg-zinc-900/40"
                                }`}
                        >
                            {plan.isPopular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg">
                                    <Sparkles className="w-3 h-3 fill-white" /> Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className={`p-3 rounded-2xl border ${plan.isPopular ? "bg-indigo-500/20 border-indigo-500/30 text-indigo-300" : "bg-white/5 border-white/5 text-zinc-400"}`}>
                                        {plan.icon}
                                    </div>
                                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{plan.name}</span>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-black tracking-tighter">
                                        ${isYearly ? plan.price.yearly : plan.price.monthly}
                                    </span>
                                    <span className="text-zinc-500 font-bold">/mo</span>
                                </div>
                                <p className="mt-4 text-sm text-zinc-400 leading-relaxed font-medium">
                                    {plan.desc}
                                </p>
                            </div>

                            <div className="space-y-4 mb-10 flex-grow">
                                {plan.features.map((feature) => (
                                    <div key={feature} className="flex items-start gap-3">
                                        <div className={`mt-1 w-4 h-4 rounded-full flex items-center justify-center border ${plan.isPopular ? "bg-indigo-500/20 border-indigo-500/30" : "bg-white/5 border-white/10"}`}>
                                            <Check className={`w-2.5 h-2.5 ${plan.isPopular ? "text-indigo-300" : "text-zinc-400"}`} />
                                        </div>
                                        <span className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${plan.isPopular
                                ? "bg-white text-black hover:bg-zinc-200 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-[1.02]"
                                : "bg-zinc-800 text-white hover:bg-zinc-700 hover:scale-[1.02]"
                                }`}>
                                Get {plan.name}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* 3. Refund & Guarantee Policy (New Section) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-gradient-to-b from-zinc-900/50 to-zinc-900/20 border border-white/5 rounded-3xl p-8 md:p-12 mb-24 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                        <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 border border-white/10 shadow-xl">
                            <RefreshCcw className="w-8 h-8 text-indigo-400" />
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <h3 className="text-xl font-bold mb-2 text-white">14-Day Money-Back Guarantee</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Not satisfied? We'll refund your payment if you've used less than 10% of your credits within the first 14 days. We believe in building trust with our creators first.
                            </p>
                        </div>
                        <div className="hidden md:block w-px h-16 bg-white/5" />
                        <div className="flex flex-col items-center md:items-start gap-2 min-w-[140px]">
                            <div className="flex items-center gap-2 text-zinc-300 text-xs font-bold uppercase tracking-wider">
                                <Lock className="w-3 h-3" /> Secure SSL
                            </div>
                            <div className="flex items-center gap-2 text-zinc-300 text-xs font-bold uppercase tracking-wider">
                                <ShieldCheck className="w-3 h-3" /> Stripe Pay
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 4. FAQ Section (New Section) */}
                <div className="max-w-3xl mx-auto mb-24">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-black tracking-tight mb-2">Frequently Asked Questions</h3>
                        <p className="text-zinc-500 text-sm">Everything you need to know about the product and billing.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="border border-white/5 rounded-2xl bg-zinc-900/20 overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleAccordion(i)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                                >
                                    <span className="font-bold text-sm md:text-base text-zinc-200">{faq.question}</span>
                                    <div className={`p-1 rounded-full border transition-all duration-300 ${activeAccordion === i ? "bg-indigo-500 border-indigo-500 rotate-180" : "border-white/10 bg-white/5"}`}>
                                        {activeAccordion === i ? <Minus className="w-3 h-3 text-white" /> : <Plus className="w-3 h-3 text-zinc-400" />}
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {activeAccordion === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-6 text-sm text-zinc-400 leading-relaxed border-t border-white/5 pt-4">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 5. Footer Trust Indicators */}
                <div className="flex flex-col items-center">
                    <p className="text-[10px] text-zinc-600 uppercase font-black tracking-[0.3em] mb-6">
                        Trusted Payment Partners
                    </p>
                    <div className="flex items-center gap-8 opacity-30 grayscale filter hover:opacity-50 transition-opacity">
                        <span className="font-black text-xl tracking-tighter">STRIPE</span>
                        <span className="font-black text-xl tracking-tighter">VISA</span>
                        <span className="font-black text-xl tracking-tighter">MASTERCARD</span>
                        <span className="font-black text-xl tracking-tighter">PAYPAL</span>
                    </div>
                </div>

            </div>
        </section>
    );
}