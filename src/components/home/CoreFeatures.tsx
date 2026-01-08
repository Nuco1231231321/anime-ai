"use client";

import { motion } from "framer-motion";

export default function CoreFeatures() {
  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      {/* 装饰背景光 */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Everything needed to
            <br />
            <span className="text-zinc-500">master anime creation.</span>
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[800px]">
          
          {/* Card 1: 核心体验 - 速度 & 质量 (占据左上大块 2x1) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-zinc-900/50 border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden group hover:border-white/10 transition-colors"
          >
            <div className="relative z-10 max-w-md">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Professional Grade <span className="text-purple-400">Generation Engine</span>
              </h3>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-8">
                Powered by state-of-the-art GPU clusters. Experience lightning-fast generation speeds without compromising on the intricate details of your artwork.
              </p>
              {/* SEO Tags / Feature Pills */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300">Fast Generation</span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300">High Resolution</span>
                <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300">Start for Free</span>
              </div>
            </div>
            
            {/* 占位图区域：建议放一张展现 GPU/速度/渲染质量 的抽象科技图 */}
            <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-purple-900/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 right-6 w-48 h-32 bg-zinc-800/50 rounded-xl border border-white/5 flex items-center justify-center text-xs text-zinc-600">
               [Image: Speed Graphic]
            </div>
          </motion.div>

          {/* Card 2: 移动端适配 (占据右上长条 1x2) */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="md:row-span-2 bg-[#0A0A0A] border border-white/5 rounded-3xl p-8 relative overflow-hidden group hover:border-purple-500/20 transition-colors"
          >
             <div className="relative z-10 text-center md:text-left">
               <h3 className="text-2xl font-bold text-white mb-3">Mobile Studio</h3>
               <p className="text-zinc-500 text-sm mb-8">
                 Your creative studio in your pocket. Fully optimized for creating on iOS and Android devices.
               </p>
             </div>

             {/* 占位图区域：这里放手机 Mockup */}
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-zinc-800 rounded-t-3xl border-t border-x border-white/10 flex items-center justify-center text-xs text-zinc-600 shadow-2xl">
                [Image: Phone App Mockup]
             </div>
             {/* 底部光晕 */}
             <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900/30 to-transparent" />
          </motion.div>

          {/* Card 3: 核心技术/模型 (占据左下 1x1) */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 flex flex-col justify-between group hover:bg-zinc-900/50 transition-colors"
          >
             <div>
               <h3 className="text-xl font-bold text-white mb-2">Advanced Models</h3>
               <p className="text-zinc-500 text-sm">Access premium models like Animagine XL & Pony Diffusion V6.</p>
             </div>
             {/* 占位图区域：放一张极其精致的细节图，展示模型能力 */}
             <div className="mt-6 w-full h-32 bg-zinc-800/50 rounded-xl border border-white/5 flex items-center justify-center text-xs text-zinc-600">
                [Image: Model Detail Shot]
             </div>
          </motion.div>

          {/* Card 4: 商业用途 (占据中下 1x1) - 这是付费的重要卖点 */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3 }}
             className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 flex flex-col justify-between group hover:bg-zinc-900/50 transition-colors"
          >
             <div>
               <h3 className="text-xl font-bold text-white mb-2">Commercial Rights</h3>
               <p className="text-zinc-500 text-sm">Full ownership of your creations for commercial projects.</p>
             </div>
             {/* 占位图区域：放一张“版权/商业”相关的抽象图或证书图 */}
             <div className="mt-6 w-full h-32 bg-zinc-800/50 rounded-xl border border-white/5 flex items-center justify-center text-xs text-zinc-600">
                [Image: Commercial Badge]
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}