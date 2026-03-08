import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ShieldCheck, Lock, CheckCircle } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(1); // Open second item by default

  const faqs = [
    {
      q: "👉 Muss ich die Texte liefern?",
      a: "🚫 Nein, unser Paket beinhaltet vollständiges Copywriting. Wir schreiben verkaufspsychologische Texte, die deine Zielgruppe überzeugen. Du musst nichts vorbereiten.",
    },
    {
      q: "👉 Was ist, wenn ich unzufrieden bin?",
      a: "✅ Wir bieten 100% Sorgenfrei-Garantie und 14 Tage Post-Launch Support für Anpassungen. Wir arbeiten so lange, bis du absolut begeistert bist.",
    },
    {
      q: "👉 Wie lange dauert ein Projekt?",
      a: "⏱️ In der Regel benötigen wir 4-6 Wochen von der Strategie bis zum Launch. Wir arbeiten effizient und transparent.",
    },
    {
      q: "👉 Welche fortlaufenden Kosten entstehen?",
      a: "💡 Keine versteckten Kosten. Hosting und Wartung sind im ersten Jahr inklusive. Danach bieten wir faire, transparente Pakete an.",
    },
  ];

  return (
    <section className="relative w-full py-24 px-4 sm:px-8 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl mx-auto w-full"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-16 tracking-tight drop-shadow-md">
          Häufige Fragen & Einwände. Transparenz ist uns wichtig.
        </h2>

        <div className="flex flex-col gap-4 mb-20 text-left">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={false}
              animate={{
                backgroundColor:
                  openIndex === idx
                    ? "rgba(255,255,255,0.15)"
                    : "rgba(255,255,255,0.05)",
              }}
              className="border border-white/20 rounded-2xl overflow-hidden backdrop-blur-xl transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="text-lg sm:text-xl font-semibold text-white">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-6 h-6 text-white/70" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-white/80 text-base sm:text-lg leading-relaxed font-medium">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Final Trust */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm sm:text-base text-white/80 font-semibold bg-black/40 backdrop-blur-md py-4 px-6 rounded-full border border-white/10 shadow-2xl">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-green-400" /> SSL Secure
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" /> 100% Sicher
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-purple-400" /> Digistore24
            Verified
          </div>
        </div>
      </motion.div>
    </section>
  );
}
