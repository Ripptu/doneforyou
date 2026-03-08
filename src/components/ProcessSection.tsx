import React from "react";
import { motion } from "framer-motion";
import {
  Megaphone,
  PenTool,
  Palette,
  Settings,
  Rocket,
  Handshake,
} from "lucide-react";

export default function ProcessSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" } },
  };

  return (
    <section className="relative w-full py-24 px-4 sm:px-8 flex flex-col items-center justify-center text-center">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-5xl mx-auto w-full"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-16 tracking-tight drop-shadow-md"
        >
          Dein Sorgenfrei-Prozess: Von der Strategie zum Erfolg.
        </motion.h2>

        <div className="flex flex-col gap-6 lg:gap-8">
          {[
            {
              title: "Strategie & Copywriting",
              desc: "Wir definieren deine Ziele & schreiben verkaufspsychologische Texte. Du lieferst nichts, wir erledigen alles.",
              icons: [
                <Megaphone key="1" className="w-6 h-6" />,
                <PenTool key="2" className="w-6 h-6" />,
              ],
            },
            {
              title: "Premium-Design & UX",
              desc: "Wir bauen ein maßgeschneidertes, hochkonvertierendes Design. Keine Templates, volle Performance.",
              icons: [
                <Palette key="1" className="w-6 h-6" />,
                <Settings key="2" className="w-6 h-6" />,
              ],
            },
            {
              title: "Launch & Post-Support",
              desc: "Wir übernehmen Hosting, SEO & die Übergabe. Du erhältst 14 Tage Post-Launch VIP Support.",
              icons: [
                <Rocket key="1" className="w-6 h-6" />,
                <Handshake key="2" className="w-6 h-6" />,
              ],
            },
          ].map((step, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-6 text-left"
            >
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 border border-white/30 flex items-center justify-center text-white shadow-inner">
                <div className="flex -space-x-2">
                  {step.icons.map((icon, i) => (
                    <div
                      key={i}
                      className="bg-black/40 p-2 rounded-full backdrop-blur-md border border-white/10"
                    >
                      {icon}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
                  <span className="text-white/40 font-mono font-bold text-xl">
                    0{idx + 1}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {step.title}
                  </h3>
                </div>
                <p className="text-white/70 text-base sm:text-lg leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
