import React, { useState, useEffect } from 'react';
import { ArrowUpRight, CheckCircle2, Sparkles, Zap, ShieldCheck, X, Star, Lock, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, AnimatePresence } from 'motion/react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.8
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20, filter: "blur(10px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.5, type: "spring", stiffness: 100 } }
};

export default function App() {
  // Exit Intent State
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !sessionStorage.getItem('exitPopupShown')) {
        setShowExitPopup(true);
        sessionStorage.setItem('exitPopupShown', 'true');
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  // 3D Tilt & Spotlight Setup
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);
  const spotlightOpacity = useMotionValue(0);
  const spotlightBackground = useMotionTemplate`radial-gradient(800px circle at ${spotlightX}px ${spotlightY}px, rgba(255,255,255,0.6), transparent 40%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);

    spotlightX.set(mouseXPos);
    spotlightY.set(mouseYPos);
    spotlightOpacity.set(1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    spotlightOpacity.set(0);
  };

  return (
    <div className="relative w-full bg-black font-sans text-[#222]">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 -z-10 pointer-events-none"
        style={{ width: '100vw', height: '100dvh', objectFit: 'cover' }}
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260228_065522_522e2295-ba22-457e-8fdb-fbcd68109c73.mp4" type="video/mp4" />
      </video>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col min-h-[100dvh] lg:h-[100dvh] w-full overflow-x-hidden overflow-y-auto lg:overflow-hidden px-4 sm:px-8 pt-[max(env(safe-area-inset-top),1.5rem)] pb-[max(env(safe-area-inset-bottom),1.5rem)] lg:pt-0 lg:pb-0 items-center justify-center">
        
        <main className="flex flex-col items-center justify-center text-center w-full max-w-5xl mx-auto relative flex-1">
          
          {/* Animated Glow Behind Card */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[70%] bg-gradient-to-r from-red-500/30 via-orange-500/20 to-yellow-500/30 blur-[120px] rounded-full -z-10 pointer-events-none"
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.8, 1.2, 0.8], rotate: [0, 90, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          />

          {/* Star Rating */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-5 bg-white/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/50 shadow-sm"
          >
            <div 
              className="flex"
              onMouseLeave={() => setHoveredStar(null)}
            >
              {[1, 2, 3, 4, 5].map((star) => {
                const isActive = hoveredStar ? star <= hoveredStar : true;
                return (
                  <motion.div
                    key={star}
                    onMouseEnter={() => setHoveredStar(star)}
                    animate={{
                      scale: hoveredStar === star ? 1.2 : 1,
                      color: isActive ? "#eab308" : "#d1d5db",
                    }}
                    transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
                    className="cursor-pointer px-[1px]"
                  >
                    <Star 
                      className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-300 ${
                        isActive ? "fill-current" : "fill-transparent"
                      }`} 
                    />
                  </motion.div>
                );
              })}
            </div>
            <span className="text-[10px] sm:text-xs font-medium text-[#222]/80">
              <strong className="text-[#222]">5/5</strong> von 29+ zufriedenen Kunden
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <span className="font-semibold text-[24px] sm:text-[36px] lg:text-[60px] leading-[1.1] tracking-[-1px] sm:tracking-[-2px] lg:tracking-[-3px] text-[#222]">
              Dein digitaler Auftritt.
            </span>
            <span className="font-serif italic text-[28px] sm:text-[40px] lg:text-[64px] leading-[1] text-[#222] mt-0.5 sm:mt-1">
              Einfach & Sorgenfrei
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-1.5 sm:mt-4 text-[11px] sm:text-[15px] lg:text-[16px] font-medium text-[#222]/80 max-w-[90%] sm:max-w-2xl leading-tight sm:leading-normal"
          >
            Wir kümmern uns um alles. Von der Konzeption und dem Design bis hin zu Hosting, Wartung und fortlaufenden Updates.
          </motion.p>

          {/* 3D Card Container */}
          <div className="mt-4 sm:mt-8 w-full relative" style={{ perspective: 2000 }}>
            <motion.div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              initial={{ opacity: 0, y: 60, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.6, type: "spring", stiffness: 80 }}
              className="relative flex flex-col lg:flex-row gap-1.5 sm:gap-2 bg-white/30 backdrop-blur-3xl p-1.5 sm:p-2 rounded-[28px] sm:rounded-[40px] border border-white/50 shadow-[0_30px_100px_rgba(0,0,0,0.15)] w-full"
            >
              
              {/* Spotlight Effect */}
              <motion.div
                className="pointer-events-none absolute -inset-px rounded-[28px] sm:rounded-[40px] opacity-0 transition-opacity duration-300 z-50 mix-blend-overlay"
                style={{ opacity: spotlightOpacity, background: spotlightBackground }}
              />

              {/* Floating Bestseller Badge */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-3 sm:-top-5 -right-1 sm:-right-3 lg:-right-6 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white font-bold px-3 sm:px-5 py-1 sm:py-2 text-[10px] sm:text-sm rounded-full shadow-xl border-2 border-white/50 z-50 flex items-center gap-1 sm:gap-1.5"
                style={{ transform: "translateZ(60px) rotate(10deg)" }}
              >
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 fill-white" />
                Bestseller
              </motion.div>

              {/* Left: Pricing Details */}
              <div 
                className="flex-1 bg-white/95 rounded-[24px] sm:rounded-[32px] p-4 sm:p-6 lg:p-8 relative overflow-hidden flex flex-col text-left shadow-lg border border-white"
                style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
              >
                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>

                <motion.div 
                  className="absolute top-0 left-[-150%] w-[150%] h-full bg-gradient-to-r from-transparent via-white/90 to-transparent skew-x-[-25deg] pointer-events-none z-10"
                  animate={{ left: ["-150%", "250%"] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", repeatDelay: 3 }}
                />
                
                <h3 className="text-lg sm:text-2xl font-bold text-[#222] mb-0.5 sm:mb-1 tracking-tight" style={{ transform: "translateZ(20px)" }}>Premium Paket</h3>
                <p className="text-gray-500 text-[10px] sm:text-xs lg:text-sm mb-3 sm:mb-6 font-medium leading-tight" style={{ transform: "translateZ(15px)" }}>Das Rundum-Sorglos-Paket für dein Business.</p>
                
                <div className="flex items-end gap-2 sm:gap-3 mb-1 sm:mb-2" style={{ transform: "translateZ(40px)" }}>
                  <motion.span 
                    initial={{ scale: 0.5, opacity: 0, filter: "blur(10px)" }}
                    animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 1.2 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-br from-gray-900 via-gray-700 to-black bg-clip-text text-transparent tracking-tighter drop-shadow-sm leading-none"
                  >
                    999€
                  </motion.span>
                  <div className="flex flex-col pb-0.5 sm:pb-1.5 relative">
                    <span className="text-sm sm:text-xl text-gray-400 font-bold leading-none">1.499€</span>
                    {/* Animated Strike-through */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "115%" }}
                      transition={{ duration: 0.6, delay: 1.6, ease: "easeOut" }}
                      className="absolute top-1/2 left-[-5%] h-[1.5px] sm:h-[2.5px] bg-red-500 -rotate-6 origin-left rounded-full shadow-[0_0_8px_rgba(239,68,68,0.4)]"
                    />
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs lg:text-sm font-semibold text-gray-400 mb-3 sm:mb-6" style={{ transform: "translateZ(20px)" }}>pro Monat <span className="mx-1 sm:mx-2">•</span> monatlich kündbar</p>
                
                {/* Limitierte Kapazität */}
                <div className="flex items-center gap-2 mb-4 sm:mb-6 p-2 sm:p-2.5 bg-red-50/80 border border-red-100 rounded-lg text-red-600 text-[10px] sm:text-xs font-medium shadow-sm" style={{ transform: "translateZ(25px)" }}>
                  <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  Achtung: Nur noch 2 von 5 Plätzen für diesen Monat verfügbar!
                </div>

                <div className="mt-auto" style={{ transform: "translateZ(30px)" }}>
                  <motion.a 
                    href="https://www.digistore24.com/product/673489"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, boxShadow: "0 15px 30px -10px rgba(0,0,0,0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-gray-900 to-black text-white text-[13px] sm:text-[15px] font-medium py-2.5 sm:py-3.5 rounded-full flex items-center justify-center gap-1.5 sm:gap-2 transition-all shadow-lg group/btn relative overflow-hidden border border-gray-800"
                  >
                    <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                      Jetzt Angebot sichern
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      >
                        <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      </motion.div>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover/btn:translate-x-[150%] transition-transform duration-700 ease-in-out" />
                  </motion.a>
                  
                  {/* Zahlungsarten */}
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 opacity-70 grayscale">
                    <span className="text-[9px] sm:text-[10px] font-bold border border-gray-300 rounded px-1.5 py-0.5">PayPal</span>
                    <span className="text-[9px] sm:text-[10px] font-bold border border-gray-300 rounded px-1.5 py-0.5">VISA</span>
                    <span className="text-[9px] sm:text-[10px] font-bold border border-gray-300 rounded px-1.5 py-0.5">Mastercard</span>
                    <span className="text-[9px] sm:text-[10px] font-bold border border-gray-300 rounded px-1.5 py-0.5 bg-[#FFB3C7] text-black border-none grayscale-0">Klarna.</span>
                  </div>

                  {/* Trust Badges */}
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-3 text-[9px] sm:text-[10px] text-gray-500 font-medium">
                    <div className="flex items-center gap-1"><Lock className="w-3 h-3" /> SSL Secure</div>
                    <div className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> 100% Sicher</div>
                    <div className="flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Digistore24 Verified</div>
                  </div>
                </div>
              </div>

              {/* Right: Features */}
              <div 
                className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col justify-center text-left"
                style={{ transform: "translateZ(20px)" }}
              >
                <h4 className="text-sm sm:text-base lg:text-lg font-bold text-[#222] mb-2 sm:mb-5 flex items-center gap-2">
                  Was ist alles inklusive?
                </h4>
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-2 lg:flex lg:flex-col gap-x-2 gap-y-1 sm:gap-2.5"
                >
                  {[
                    "Maßgeschneidertes Webdesign",
                    "Premium Hosting & Domain",
                    "Laufende Wartung & Updates",
                    "SEO & Performance Optimierung",
                    "Unbegrenzte Anpassungen",
                    "24/7 Prioritäts-Support"
                  ].map((feature, idx) => (
                    <motion.div 
                      key={idx} 
                      variants={itemVariants} 
                      whileHover={{ x: 8, backgroundColor: "rgba(255,255,255,0.4)" }}
                      className="flex items-center gap-1.5 sm:gap-3 p-1.5 sm:p-2 -ml-1.5 sm:-ml-2 rounded-lg sm:rounded-xl transition-colors cursor-default group/item border border-transparent hover:border-white/40"
                    >
                      <motion.div 
                        className="flex-shrink-0 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 rounded-full p-0.5 sm:p-1 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                        whileHover={{ rotate: 360, scale: 1.15 }}
                        transition={{ duration: 0.5, type: "spring" }}
                      >
                        <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                      </motion.div>
                      <span className="font-semibold text-[#222]/90 text-[10px] sm:text-[13px] lg:text-[15px] group-hover/item:text-[#222] transition-colors leading-tight">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* FAQ Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={() => setShowFaq(true)}
            className="mt-4 sm:mt-8 text-xs sm:text-sm font-medium text-[#222]/60 hover:text-[#222] flex items-center gap-1.5 transition-colors bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 shadow-sm"
          >
            <HelpCircle className="w-4 h-4" />
            Noch Fragen? Hier klicken.
          </motion.button>

        </main>
      </div>

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowExitPopup(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative bg-white/90 backdrop-blur-3xl p-8 sm:p-10 rounded-[40px] border border-white/50 shadow-[0_30px_100px_rgba(0,0,0,0.3)] max-w-lg w-full text-center overflow-hidden"
            >
              <button 
                onClick={() => setShowExitPopup(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <Zap size={32} className="text-white" />
              </div>
              
              <h2 className="text-3xl font-bold text-[#222] mb-4 tracking-tight">Warte! Bevor du gehst...</h2>
              <p className="text-gray-600 mb-8 font-medium">
                Das Angebot für <span className="text-[#222] font-bold">999€ statt 1.499€</span> gilt nur für kurze Zeit. 
                Sichere dir jetzt deinen digitalen Premium-Auftritt, bevor der Preis wieder steigt!
              </p>
              
              <div className="flex flex-col gap-3">
                <motion.a 
                  href="https://www.digistore24.com/product/673489"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-gray-900 to-black text-white text-[16px] font-bold py-4 rounded-full flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all border border-gray-800"
                  onClick={() => setShowExitPopup(false)}
                >
                  Jetzt Rabatt sichern
                  <ArrowUpRight size={18} />
                </motion.a>
                <button 
                  onClick={() => setShowExitPopup(false)}
                  className="w-full text-gray-500 text-sm font-medium py-3 hover:text-gray-800 transition-colors"
                >
                  Nein danke, ich zahle lieber den vollen Preis
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FAQ Modal */}
      <AnimatePresence>
        {showFaq && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowFaq(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative bg-white/90 backdrop-blur-3xl p-6 sm:p-8 rounded-[32px] border border-white/50 shadow-[0_30px_100px_rgba(0,0,0,0.3)] max-w-lg w-full text-left overflow-hidden"
            >
              <button 
                onClick={() => setShowFaq(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 transition-colors"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-xl sm:text-2xl font-bold text-[#222] mb-6 flex items-center gap-2">
                <HelpCircle className="text-orange-500 w-6 h-6" />
                Häufige Fragen
              </h2>
              
              <div className="space-y-4 sm:space-y-5 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {/* 1. Vertrauen & Expertise */}
                <div className="bg-white/50 p-4 rounded-2xl border border-white/60">
                  <h4 className="font-bold text-[#222] text-sm sm:text-base">Warum eine Flatrate statt eines Einmalpreises?</h4>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1.5 leading-relaxed">Eine erfolgreiche Website ist kein einmaliges Projekt. Sie benötigt kontinuierliche Pflege, Sicherheits-Updates und fortlaufende SEO-Anpassungen, um dauerhaft sichtbar zu bleiben und Kunden zu gewinnen. Mit unserer Flatrate hast du immer eine technisch und inhaltlich perfekte Seite, ohne unkalkulierbare Zusatzkosten.</p>
                </div>
                <div className="bg-white/50 p-4 rounded-2xl border border-white/60">
                  <h4 className="font-bold text-[#222] text-sm sm:text-base">Haben Sie Erfahrung in meiner Branche?</h4>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1.5 leading-relaxed">Ja. Wir sind spezialisiert auf Coaches, Berater und Finanzdienstleister. Wir kennen deine spezifischen Herausforderungen – von der DSGVO-konformen Lead-Generierung bis hin zum Aufbau von Expertenstatus durch gezieltes Design und Copywriting.</p>
                </div>
                <div className="bg-white/50 p-4 rounded-2xl border border-white/60">
                  <h4 className="font-bold text-[#222] text-sm sm:text-base">Wie schnell sehe ich Ergebnisse?</h4>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1.5 leading-relaxed">Das neue Premium-Design und die Conversion-Optimierung wirken sofort ab Live-Schaltung. Für organische Sichtbarkeit (SEO) bei Google solltest du ehrlich mit 4 bis 6 Monaten rechnen, bis sich spürbare und stabile Rankings aufbauen.</p>
                </div>

                {/* 2. Prozess & Zusammenarbeit */}
                <div className="bg-white/50 p-4 rounded-2xl border border-white/60">
                  <h4 className="font-bold text-[#222] text-sm sm:text-base">Wie viel Zeit muss ich investieren?</h4>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1.5 leading-relaxed">Fast keine. Deine Zeit ist dein wichtigstes Gut. Wir bieten einen echten "Done-for-You" Service. Nach einem kurzen Kickoff-Call übernehmen wir den kompletten Prozess von Design über Texte bis zur Technik.</p>
                </div>
                <div className="bg-white/50 p-4 rounded-2xl border border-white/60">
                  <h4 className="font-bold text-[#222] text-sm sm:text-base">Was passiert, wenn ich eine Änderung brauche?</h4>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1.5 leading-relaxed">Schreib uns einfach eine kurze Nachricht über unseren direkten WhatsApp-Support. Wir setzen Textänderungen, neue Bilder oder neue Unterseiten umgehend für dich um – alles in der Flatrate inklusive.</p>
                </div>
                <div className="bg-white/50 p-4 rounded-2xl border border-white/60">
                  <h4 className="font-bold text-[#222] text-sm sm:text-base">Wie funktioniert der Start?</h4>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1.5 leading-relaxed">Nach der sicheren Buchung über Digistore24 erhältst du sofort Zugang zu unserem kurzen Onboarding. Dort fragst du deinen Wunschtermin für den Kickoff-Call an und wir starten direkt mit der Umsetzung.</p>
                </div>

                {/* 3. Technik & Strategie */}
                <div className="bg-white/50 p-4 rounded-2xl border border-white/60">
                  <h4 className="font-bold text-[#222] text-sm sm:text-base">Ist meine Website mobiloptimiert?</h4>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1.5 leading-relaxed">Absolut. Da über 70% deiner potenziellen Klienten über das Smartphone suchen werden, entwickeln wir im "Mobile-First" Ansatz. Deine Seite wird auf jedem Gerät perfekt aussehen und blitzschnell laden.</p>
                </div>
                <div className="bg-white/50 p-4 rounded-2xl border border-white/60">
                  <h4 className="font-bold text-[#222] text-sm sm:text-base">Übernehmen Sie auch das Hosting und die Sicherheit?</h4>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1.5 leading-relaxed">Ja. Wir kümmern uns um das blitzschnelle Premium-Hosting, SSL-Zertifikate, tägliche Backups und alle technischen Updates im Hintergrund. Du musst dich um nichts Technisches mehr kümmern.</p>
                </div>
                <div className="bg-white/50 p-4 rounded-2xl border border-white/60">
                  <h4 className="font-bold text-[#222] text-sm sm:text-base">Helfen Sie mir bei der Lead-Generierung?</h4>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1.5 leading-relaxed">Das ist unser Hauptziel. Wir bauen keine digitalen Visitenkarten, sondern Vertriebsmaschinen. Durch strategisch platzierte Call-to-Actions, optimierte Formulare und verkaufspsychologisches Design verwandeln wir Besucher in echte Anfragen.</p>
                </div>

                {/* 4. Vertrag & Kündigung */}
                <div className="bg-white/50 p-4 rounded-2xl border border-white/60">
                  <h4 className="font-bold text-[#222] text-sm sm:text-base">Gibt es eine Mindestlaufzeit?</h4>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1.5 leading-relaxed">Nein. Wir binden unsere Kunden durch exzellente Leistung, nicht durch Knebelverträge. Das Paket ist jederzeit monatlich kündbar. Volle Flexibilität und null Risiko für dich.</p>
                </div>
                <div className="bg-white/50 p-4 rounded-2xl border border-white/60">
                  <h4 className="font-bold text-[#222] text-sm sm:text-base">Was ist alles im Preis enthalten?</h4>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1.5 leading-relaxed">Alles, was du für einen Premium-Auftritt brauchst: Individuelles Webdesign, fortlaufende SEO-Optimierung, Premium-Hosting, technologische Wartung, persönlicher WhatsApp-Support und unbegrenzte inhaltliche Änderungen.</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
