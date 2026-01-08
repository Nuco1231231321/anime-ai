"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
    Download,
    Share2,
    Maximize2,
    MoreHorizontal,
    Sparkles,
    ThumbsUp,
    ThumbsDown,
    Wand2,
    Copy,
    X,
    Trash2,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Props {
    url: string
    prompt: string
    style?: string
    ratio?: string
    isGenerating?: boolean
    onRegenerate?: () => void
}

export default function GenerationResultCard({ url, prompt, style, ratio, isGenerating, onRegenerate }: Props) {
    const [copied, setCopied] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [liked, setLiked] = useState<boolean | null>(null)
    const [menuOpen, setMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const copyPrompt = () => {
        navigator.clipboard.writeText(prompt)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
        setMenuOpen(false)
    }

    const handleDownload = async () => {
        try {
            const response = await fetch(url)
            const blob = await response.blob()
            const blobUrl = window.URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = blobUrl
            link.download = `anime-${Date.now()}.png`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(blobUrl)
        } catch (error) {
            console.error("Download failed:", error)
        }
        setMenuOpen(false)
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "AI Generated Image",
                    text: prompt,
                    url: window.location.href,
                })
            } catch (error) {
                console.error("Share failed:", error)
            }
        } else {
            navigator.clipboard.writeText(window.location.href)
        }
        setMenuOpen(false)
    }

    if (isGenerating) {
        return (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden aspect-[4/3] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                    <span className="text-xs text-zinc-500">Generating...</span>
                </div>
            </div>
        )
    }

    return (
        <>
            {/* Card Container */}
            <div className="flex flex-col lg:flex-row gap-4 group">
                {/* Image */}
                <div className="relative flex-1 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                    <img
                        src={url || "/placeholder.svg"}
                        alt="Generated image"
                        className="w-full aspect-[4/3] lg:aspect-auto lg:h-[360px] object-cover cursor-pointer"
                        onClick={() => setIsFullscreen(true)}
                    />

                    {/* Hover Actions - Desktop */}
                    <div className="hidden lg:flex absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                            <div className="flex gap-2">
                                <IconButton icon={<Download className="w-4 h-4" />} onClick={handleDownload} />
                                <IconButton icon={<Share2 className="w-4 h-4" />} onClick={handleShare} />
                            </div>
                            <IconButton icon={<Maximize2 className="w-4 h-4" />} onClick={() => setIsFullscreen(true)} />
                        </div>
                    </div>
                </div>

                {/* Info Panel - Desktop */}
                <div className="hidden lg:flex w-[280px] flex-col bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <div className="flex-1">
                        <p className="text-sm text-zinc-300 leading-relaxed line-clamp-5">{prompt}</p>

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-2 mt-4 text-xs text-zinc-500">
                            <div className="flex items-center gap-1 px-2 py-1 bg-zinc-800/50 rounded">
                                <Sparkles className="w-3 h-3 text-amber-400" />
                                <span>{style || "Lucid Origin"}</span>
                            </div>
                            <span>1344 × 768</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 mt-3 border-t border-zinc-800 flex items-center justify-between">
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="p-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors"
                            >
                                <MoreHorizontal className="w-5 h-5" />
                            </button>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {menuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 4 }}
                                        className="absolute bottom-full left-0 mb-2 w-40 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl overflow-hidden z-20"
                                    >
                                        <button
                                            onClick={copyPrompt}
                                            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-zinc-300 hover:bg-zinc-700 transition-colors"
                                        >
                                            <Copy className="w-4 h-4" />
                                            {copied ? "Copied!" : "Copy Prompt"}
                                        </button>
                                        <button
                                            onClick={handleDownload}
                                            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-zinc-300 hover:bg-zinc-700 transition-colors"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download
                                        </button>
                                        <button
                                            onClick={handleShare}
                                            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-zinc-300 hover:bg-zinc-700 transition-colors"
                                        >
                                            <Share2 className="w-4 h-4" />
                                            Share
                                        </button>
                                        <button className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-400 hover:bg-zinc-700 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setLiked(liked === true ? null : true)}
                                className={`p-2 rounded-lg transition-colors ${liked === true
                                    ? "text-purple-400 bg-purple-500/10"
                                    : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                                    }`}
                            >
                                <ThumbsUp className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setLiked(liked === false ? null : false)}
                                className={`p-2 rounded-lg transition-colors ${liked === false ? "text-red-400 bg-red-500/10" : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                                    }`}
                            >
                                <ThumbsDown className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Bottom Bar */}
            <div className="lg:hidden mt-3 space-y-3">
                <p className="text-sm text-zinc-400 line-clamp-2">{prompt}</p>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {onRegenerate && (
                            <button
                                onClick={onRegenerate}
                                className="flex items-center gap-1.5 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-xs font-medium text-zinc-300 hover:bg-zinc-700 transition-colors active:scale-95"
                            >
                                <Wand2 className="w-3.5 h-3.5" />
                                Iterate
                            </button>
                        )}
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="p-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded-lg transition-colors"
                            >
                                <MoreHorizontal className="w-5 h-5" />
                            </button>

                            <AnimatePresence>
                                {menuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 4 }}
                                        className="absolute bottom-full left-0 mb-2 w-40 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl overflow-hidden z-20"
                                    >
                                        <button
                                            onClick={copyPrompt}
                                            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-zinc-300 hover:bg-zinc-700 transition-colors"
                                        >
                                            <Copy className="w-4 h-4" />
                                            {copied ? "Copied!" : "Copy Prompt"}
                                        </button>
                                        <button
                                            onClick={handleDownload}
                                            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-zinc-300 hover:bg-zinc-700 transition-colors"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download
                                        </button>
                                        <button
                                            onClick={handleShare}
                                            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-zinc-300 hover:bg-zinc-700 transition-colors"
                                        >
                                            <Share2 className="w-4 h-4" />
                                            Share
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                        <div className="flex items-center gap-1 px-2 py-1 bg-zinc-800/50 rounded">
                            <Sparkles className="w-3 h-3 text-amber-400" />
                            <span>{style || "Lucid Origin"}</span>
                        </div>
                        <span>1344 × 768</span>
                    </div>
                </div>
            </div>

            {/* Fullscreen Modal */}
            <AnimatePresence>
                {isFullscreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
                        onClick={() => setIsFullscreen(false)}
                    >
                        <button
                            className="absolute top-4 right-4 p-2.5 bg-zinc-800/80 hover:bg-zinc-700 rounded-full transition-colors z-10"
                            onClick={() => setIsFullscreen(false)}
                        >
                            <X className="w-5 h-5 text-zinc-300" />
                        </button>
                        <img
                            src={url || "/placeholder.svg"}
                            alt="Fullscreen view"
                            className="max-w-full max-h-full object-contain rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                            <IconButton icon={<Download className="w-5 h-5" />} onClick={handleDownload} large />
                            <IconButton icon={<Share2 className="w-5 h-5" />} onClick={handleShare} large />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

function IconButton({
    icon,
    onClick,
    large,
}: {
    icon: React.ReactNode
    onClick?: () => void
    large?: boolean
}) {
    return (
        <button
            onClick={(e) => {
                e.stopPropagation()
                onClick?.()
            }}
            className={`${large ? "p-3" : "p-2"
                } bg-black/60 backdrop-blur-sm border border-zinc-700/50 rounded-lg text-zinc-300 hover:bg-zinc-800 transition-all active:scale-95`}
        >
            {icon}
        </button>
    )
}
