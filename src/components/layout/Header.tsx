"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const { user, isLoading, login, logout } = useAuth();
  const { theme, mounted } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Gallery", href: "/gallery" },
    { name: "Generator", href: "/generator" },
    { name: "Pricing", href: "/pricing" },
    { name: "FAQ", href: "/faq" },
    { name: "Blog", href: "/blog" },
    { name: "Terms", href: "/terms" },
    { name: "Privacy", href: "/privacy" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isScrolled
          ? "bg-[var(--header-bg)] backdrop-blur-md py-3 shadow-2xl"
          : "bg-transparent py-5"
          }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-[var(--text-primary)] tracking-tight group">
            <span className="group-hover:opacity-80 transition-opacity">
              Anime<span className="text-indigo-400 font-black">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${isScrolled
                  ? "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  : "text-white/80 hover:text-white"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3 lg:gap-6">

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {isLoading ? (
                <div className="w-8 h-8 rounded-full bg-zinc-700 animate-pulse"></div>
              ) : user ? (
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 bg-zinc-800/80 rounded-full text-xs font-bold text-zinc-300 border border-white/10">
                    {user.credits} Credits
                  </div>
                  <div
                    onClick={logout}
                    className="w-8 h-8 rounded-full overflow-hidden border border-white/20 cursor-pointer hover:scale-105 transition-all"
                  >
                    {user.picture ? <img src={user.picture} alt={user.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-indigo-500" />}
                  </div>
                </div>
              ) : (
                <button onClick={login} className="text-sm font-bold bg-white text-black px-5 py-2 rounded-full hover:bg-zinc-200 transition-all">
                  Login
                </button>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="lg:hidden flex items-center gap-3">
              <button className="text-[var(--text-primary)]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:hidden fixed inset-0 bg-[#050505] z-40 flex flex-col p-6 pt-20"
            >
              <button className="absolute top-5 right-5 text-white/50 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-7 h-7" />
              </button>

              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-semibold text-white py-2 border-b border-white/5"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Auth Section */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  {user ? (
                    <div className="flex items-center gap-3 p-3 bg-zinc-900 rounded-xl">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
                        {user.picture ? (
                          <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
                            <span className="text-white font-bold">{user.name?.charAt(0)?.toUpperCase()}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-semibold text-sm">{user.name}</div>
                        <div className="text-xs text-zinc-500">{user.credits} credits</div>
                      </div>
                      <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-xs font-medium text-zinc-500 hover:text-white">
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { login(); setIsMobileMenuOpen(false); }}
                      className="w-full py-3 bg-zinc-800 rounded-xl text-white font-semibold text-center"
                    >
                      Login with Google
                    </button>
                  )}
                </div>

                <Link
                  href="/generator"
                  className="w-full py-3 bg-white text-black rounded-xl font-bold text-center mt-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Try Free
                </Link>

                <div className="mt-auto pt-8 flex gap-4 text-xs text-zinc-600">
                  <Link href="/privacy" className="hover:text-zinc-400">Privacy</Link>
                  <Link href="/terms" className="hover:text-zinc-400">Terms</Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}