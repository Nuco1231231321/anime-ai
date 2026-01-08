"use client"

import { useState, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import RedesignedSidebar from "@/components/generator/RedesignedSidebar"
import PromptConsole from "@/components/generator/PromptConsole"
import PlansBanner from "@/components/generator/PlansBanner"
import GenerationResultCard from "@/components/generator/GenerationResultCard"
import WelcomeGuide from "@/components/generator/WelcomeGuide"
import LoginModal from "@/components/LoginModel"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Settings, Coins, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const GUEST_FREE_GENERATIONS = 2
const COST_PER_GENERATION = 30

export default function GeneratorPage() {
  const searchParams = useSearchParams()
  const { user, isLoading: authLoading, login, refreshUser } = useAuth()

  const [activePrompt, setActivePrompt] = useState("")
  const [activeStyle, setActiveStyle] = useState("Vibrant Anime")
  const [activeRatio, setActiveRatio] = useState("1:1")
  const [activeQuantity, setActiveQuantity] = useState(1)
  const [activeModel, setActiveModel] = useState("Seedream 4.0")
  const [isGenerating, setIsGenerating] = useState(false)
  const [history, setHistory] = useState<
    Array<{ id: string; urls: string[]; prompt: string; timestamp: number; style: string; ratio: string }>
  >([])
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  // Guest generation tracking
  const [guestGenerations, setGuestGenerations] = useState(0)

  // Load guest generations count and history from localStorage
  useEffect(() => {
    const savedGuestCount = localStorage.getItem("guest_generations")
    if (savedGuestCount) {
      setGuestGenerations(Number.parseInt(savedGuestCount, 10))
    }

    const savedHistory = localStorage.getItem("anime-gen-history")
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  // Load prompt from URL
  useEffect(() => {
    const prompt = searchParams.get("prompt")
    if (prompt) setActivePrompt(decodeURIComponent(prompt))
  }, [searchParams])

  // Save history to localStorage
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("anime-gen-history", JSON.stringify(history))
    }
  }, [history])

  // Check if user can generate
  const canGenerate = useCallback(() => {
    if (user) {
      return user.credits >= COST_PER_GENERATION
    }
    return guestGenerations < GUEST_FREE_GENERATIONS
  }, [user, guestGenerations])

  const handleGenerate = useCallback(async (): Promise<boolean> => {
    if (!activePrompt.trim() || isGenerating) return false

    // Check if guest needs to login
    if (!user && guestGenerations >= GUEST_FREE_GENERATIONS) {
      setShowLoginModal(true)
      return false
    }

    // Check if logged in user has enough credits
    if (user && user.credits < COST_PER_GENERATION) {
      return false
    }

    setIsGenerating(true)
    setMobileSheetOpen(false)

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: activePrompt,
          style: activeStyle,
          ratio: activeRatio,
          quantity: activeQuantity,
        }),
      })
      if (!response.ok) throw new Error("Generation failed")
      const data = await response.json()
      const urls = data.images || (Array.isArray(data.urls) ? data.urls : [data.url])

      setHistory((prev) => [
        {
          id: Date.now().toString(),
          urls,
          prompt: activePrompt,
          timestamp: Date.now(),
          style: activeStyle,
          ratio: activeRatio,
        },
        ...prev,
      ])

      // Update guest generations or refresh user credits
      if (!user) {
        const newCount = guestGenerations + 1
        setGuestGenerations(newCount)
        localStorage.setItem("guest_generations", newCount.toString())
      } else {
        await refreshUser()
      }

      return true
    } catch (err) {
      console.error(err)
      return false
    } finally {
      setIsGenerating(false)
    }
  }, [activePrompt, activeStyle, activeRatio, activeQuantity, isGenerating, user, guestGenerations, refreshUser])

  const handleRegenerate = useCallback(
    (prompt: string, style: string, ratio: string) => {
      setActivePrompt(prompt)
      setActiveStyle(style)
      setActiveRatio(ratio)
      setTimeout(() => handleGenerate(), 100)
    },
    [handleGenerate],
  )

  const groupHistoryByDate = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayItems = history.filter((item) => item.timestamp >= today.getTime())
    const olderItems = history.filter((item) => item.timestamp < today.getTime())
    return { today: todayItems, older: olderItems }
  }

  const { today: todayHistory, older: olderHistory } = groupHistoryByDate()

  // Calculate display credits
  const displayCredits = user ? user.credits : `${GUEST_FREE_GENERATIONS - guestGenerations}/${GUEST_FREE_GENERATIONS}`
  const remainingGuestGenerations = GUEST_FREE_GENERATIONS - guestGenerations

  return (
    <div className="flex h-[100dvh] bg-[#09090b] text-zinc-100 overflow-hidden">
      <WelcomeGuide />
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={login} />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[260px] border-r border-zinc-800/50 bg-[#09090b]">
        <RedesignedSidebar
          activeStyle={activeStyle}
          setActiveStyle={setActiveStyle}
          activeRatio={activeRatio}
          setActiveRatio={setActiveRatio}
          activeQuantity={activeQuantity}
          setActiveQuantity={setActiveQuantity}
          activeModel={activeModel}
          setActiveModel={setActiveModel}
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-4 lg:px-6 h-14 border-b border-zinc-800/50 bg-[#09090b]">
          {/* Left: Mobile menu + Model */}
          <div className="flex items-center gap-3">
            {/* Mobile Settings */}
            <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2 hover:bg-zinc-800/50 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-zinc-400" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0 bg-[#09090b] border-r border-zinc-800/50">
                <RedesignedSidebar
                  activeStyle={activeStyle}
                  setActiveStyle={setActiveStyle}
                  activeRatio={activeRatio}
                  setActiveRatio={setActiveRatio}
                  activeQuantity={activeQuantity}
                  setActiveQuantity={setActiveQuantity}
                  activeModel={activeModel}
                  setActiveModel={setActiveModel}
                />
              </SheetContent>
            </Sheet>

            {/* Title */}
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-base font-semibold tracking-tight">
                <span className="text-purple-400">AI</span>
                <span className="text-zinc-100 ml-1">Creation</span>
              </span>
            </div>
          </div>

          {/* Right: Credits & Auth */}
          <div className="flex items-center gap-2">
            {/* Credits Display */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
              <Coins className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium tabular-nums">{displayCredits}</span>
            </div>

            {/* Auth Button */}
            {authLoading ? (
              <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-700">
                  {user.picture ? (
                    <img
                      src={user.picture || "/placeholder.svg"}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-purple-600 flex items-center justify-center text-xs font-bold">
                      {user.name?.charAt(0)?.toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button
                onClick={login}
                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </header>

        {/* Mobile Model Display */}
        <div className="lg:hidden px-4 py-3 border-b border-zinc-800/50 bg-zinc-900/30">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-zinc-100">{activeModel}</span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-3xl mx-auto px-4 lg:px-6 py-5 space-y-5">
            {/* Prompt Console */}
            <PromptConsole
              activePrompt={activePrompt}
              setActivePrompt={setActivePrompt}
              isGenerating={isGenerating}
              handleGenerate={handleGenerate}
              credits={user?.credits ?? 0}
              activeQuantity={activeQuantity}
              canGenerate={canGenerate()}
              isGuest={!user}
              remainingGuestGenerations={remainingGuestGenerations}
              onLoginRequired={() => setShowLoginModal(true)}
            />

            {/* Plans Banner - Show for guests after using free generations or for users with low credits */}
            {(!user && guestGenerations > 0) || (user && user.credits < 100) ? <PlansBanner isGuest={!user} /> : null}

            {/* Generation Results */}
            <div className="space-y-5">
              {/* Generating State */}
              <AnimatePresence mode="popLayout">
                {isGenerating && (
                  <motion.div
                    key="generating"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="relative rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 aspect-[4/3] lg:aspect-video flex items-center justify-center"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 border-2 border-purple-500/30 rounded-full animate-spin border-t-purple-500" />
                      <div className="text-center">
                        <p className="text-sm font-medium text-zinc-300">Creating your image...</p>
                        <p className="text-xs text-zinc-500 mt-1">This may take a moment</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Today's Results */}
              {todayHistory.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Today</h3>
                  <div className="space-y-4">
                    {todayHistory.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <GenerationResultCard
                          url={item.urls[0]}
                          prompt={item.prompt}
                          style={item.style}
                          ratio={item.ratio}
                          onRegenerate={() => handleRegenerate(item.prompt, item.style, item.ratio)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Older Results */}
              {olderHistory.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Earlier</h3>
                  <div className="space-y-4">
                    {olderHistory.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <GenerationResultCard
                          url={item.urls[0]}
                          prompt={item.prompt}
                          style={item.style}
                          ratio={item.ratio}
                          onRegenerate={() => handleRegenerate(item.prompt, item.style, item.ratio)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {!isGenerating && history.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-14 h-14 bg-zinc-800/50 rounded-xl flex items-center justify-center mb-4">
                    <Sparkles className="w-7 h-7 text-zinc-600" />
                  </div>
                  <h3 className="text-base font-medium text-zinc-400">No generations yet</h3>
                  <p className="text-sm text-zinc-600 mt-1 max-w-xs">Enter a prompt above to create your first image</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
