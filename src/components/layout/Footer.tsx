import Link from "next/link";
import { Github, Twitter, MessageSquare, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 py-12 border-t border-white/5 text-zinc-400">
      <div className="container mx-auto px-4 max-w-7xl flex flex-col items-center text-center md:flex-row md:justify-between">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <Link href="/" className="flex items-center justify-center md:justify-start gap-2 text-2xl font-bold text-white mb-2">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            AnimeAI
          </Link>
          <p className="text-sm max-w-xs mx-auto md:mx-0">Create your perfect anime characters and scenes with the best free AI generator.</p>
          <p className="text-xs mt-1">Free Anime AI Generator - No Sign Up, No Watermark.</p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-6 md:mb-0">
          <Link href="#features" className="hover:text-white transition-colors text-sm">Features</Link>
          <Link href="#models" className="hover:text-white transition-colors text-sm">Models/Tools</Link>
          <Link href="#prompt-library" className="hover:text-white transition-colors text-sm">Prompt Library</Link>
          <Link href="#blog" className="hover:text-white transition-colors text-sm">Blog</Link>
          <Link href="#pricing" className="hover:text-white transition-colors text-sm">Pricing</Link>
        </nav>

        <div className="flex items-center gap-4">
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
            <MessageSquare className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="mt-12 text-center text-xs text-zinc-600">
        &copy; {new Date().getFullYear()} AnimeAI. All rights reserved.
      </div>
    </footer>
  );
}