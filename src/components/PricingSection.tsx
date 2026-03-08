import React from "react";
import { motion } from "framer-motion";
import {
  Check,
  X,
  Rocket,
  TrendingUp,
  Crown,
  Star,
  ShieldCheck,
  Lock,
} from "lucide-react";

export default function PricingSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-1 mb-6"
          >
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="ml-2 text-sm font-medium text-white/80">
              <strong className="text-white">5/5</strong> von 29+ zufriedenen
              Kunden
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Dein Sorgenfrei-Paket-Vergleich
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60"
          >
            Einfach, transparent und auf maximales Wachstum ausgelegt.
          </motion.p>
        </div>

        {/* Pricing Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center"
        >
          {/* Left Card: Basis Paket */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className="relative bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl flex flex-col h-full"
          >
            <div className="mb-8">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-white">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Basis Paket
              </h3>
              <p className="text-sm text-white/60 min-h-[40px]">
                Perfekter Start für Einzelunternehmer.
              </p>
              <div className="mt-6 flex items-baseline text-5xl font-extrabold tracking-tight text-white">
                1.499€
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm text-white/80">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Bis zu 3 maßgeschneiderte Unterseiten</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/80">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Premium Hosting & Domain Setup</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/80">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Basis On-Page SEO</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/40">
                <X className="w-5 h-5 shrink-0" />
                <span>Verkaufspsychologisches Copywriting</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/40">
                <X className="w-5 h-5 shrink-0" />
                <span>Aktive Lead-Generierung</span>
              </li>
            </ul>

            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-6 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Jetzt Angebot sichern
            </motion.button>
          </motion.div>

          {/* Center Card: Wachstums Paket (HERO) */}
          <motion.div
            variants={cardVariants}
            className="relative bg-black/60 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.1)] flex flex-col h-full lg:scale-105 z-10 ring-1 ring-white/30"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg">
              Bestseller ⚡
            </div>

            <div className="mb-8 mt-2">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-white">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Wachstums Paket
              </h3>
              <p className="text-sm text-white/60 min-h-[40px]">
                Der digitale Vertriebsmitarbeiter für messbar mehr Leads.
              </p>

              <div className="mt-6 flex flex-col">
                <span className="text-white/40 line-through text-lg font-medium">
                  3.499€
                </span>
                <div className="flex items-baseline text-6xl font-extrabold tracking-tight text-white">
                  2.999€
                </div>
              </div>
            </div>

            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-6 flex items-center gap-2 text-sm text-red-200 font-medium">
              <span>⚠️</span> Nur noch 1 von 3 Plätzen frei!
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm text-white/90">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-medium">
                  Bis zu 7 maßgeschneiderte Unterseiten
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/90">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-medium">
                  "Done-for-You" Copywriting inkl.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/90">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Lead-Generierung (WhatsApp, Calendly)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/90">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Premium Performance & UX Design</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/90">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>14 Tage Post-Launch VIP Support</span>
              </li>
            </ul>

            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-6 rounded-xl bg-white text-black font-bold hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Jetzt Angebot sichern
            </motion.button>
          </motion.div>

          {/* Right Card: Agentur Paket */}
          <motion.div
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className="relative bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl flex flex-col h-full"
          >
            <div className="mb-8">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-white">
                <Crown className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Agentur Paket
              </h3>
              <p className="text-sm text-white/60 min-h-[40px]">
                Maximale Skalierung & Brand-Autorität.
              </p>
              <div className="mt-6 flex items-baseline text-5xl font-extrabold tracking-tight text-white">
                4.999€
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm text-white/80">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Bis zu 12 individuelle Unterseiten</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/80">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Komplettes Branding & Logo-Design</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/80">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>High-End GSAP Animationen</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/80">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Erweitertes SEO & Content-Strategie</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/80">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>24/7 Prioritäts-Support</span>
              </li>
            </ul>

            <motion.button
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 px-6 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Jetzt Angebot sichern
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Trust Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 flex flex-col items-center justify-center gap-6"
        >
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm font-medium text-white/60">
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4" /> SSL Secure
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> 100% Sicher
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" /> Digistore24
              Verified
            </span>
          </div>

          <div className="flex items-center justify-center gap-6 opacity-50 grayscale">
            <span className="font-bold text-xl tracking-tighter text-white">
              PayPal
            </span>
            <span className="font-bold text-xl tracking-tight text-white">
              Klarna.
            </span>
            <span className="font-bold text-xl italic text-white">VISA</span>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-white/80 -mr-2 mix-blend-screen"></div>
              <div className="w-6 h-6 rounded-full bg-white/50 mix-blend-screen"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
