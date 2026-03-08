import React from "react";
import { motion } from "framer-motion";
import { Zap, ArrowUpRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto flex flex-col items-center"
      >
        {/* Bestseller Badge */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="mb-6 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white font-bold px-4 py-1.5 text-xs sm:text-sm rounded-full shadow-xl border border-white/20 flex items-center gap-1.5"
        >
          <Zap className="w-3.5 h-3.5 fill-white" />
          Bestseller
        </motion.div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-lg">
          Wir verwandeln deine Website in deinen besten Vertriebsmitarbeiter.
        </h1>

        {/* Sub-headline */}
        <p className="text-lg sm:text-xl lg:text-2xl font-medium text-white/90 mb-10 drop-shadow-md">
          Sorgenfrei. Premium. Messbar Profitabel.
        </p>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full sm:w-auto bg-white text-black text-base sm:text-lg font-bold py-4 px-8 rounded-full flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all"
        >
          🚀 Sorgenfrei durchstarten <ArrowUpRight className="w-5 h-5" />
        </motion.button>

        {/* Trust Logos */}
        <div className="flex items-center justify-center gap-3 mt-8 opacity-80">
          <span className="text-[10px] sm:text-xs font-bold border border-white/30 text-white rounded px-2 py-1 backdrop-blur-sm bg-white/10">
            PayPal
          </span>
          <span className="text-[10px] sm:text-xs font-bold border border-white/30 text-white rounded px-2 py-1 backdrop-blur-sm bg-white/10">
            VISA
          </span>
          <span className="text-[10px] sm:text-xs font-bold border border-white/30 text-white rounded px-2 py-1 backdrop-blur-sm bg-white/10">
            Mastercard
          </span>
          <span className="text-[10px] sm:text-xs font-bold border border-white/30 text-black rounded px-2 py-1 bg-[#FFB3C7]">
            Klarna.
          </span>
        </div>
      </motion.div>
    </section>
  );
}
