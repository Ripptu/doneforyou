import React, { useState, useEffect } from 'react';
import { ArrowUpRight, CheckCircle2, Sparkles, Zap, ShieldCheck, X } from 'lucide-react';
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
    <div className="relative h-[100dvh] w-full overflow-hidden font-sans text-[#222]">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260228_065522_522e2295-ba22-457e-8fdb-fbcd68109c73.mp4" type="video/mp4" />
      </video>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col h-[100dvh] px-4 sm:px-8 items-center justify-center">
        
        <main className="flex flex-col items-center justify-center text-center w-full max-w-5xl mx-auto relative">
          
          {/* Animated Glow Behind Card */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[70%] bg-gradient-to-r from-red-500/30 via-orange-500/20 to-yellow-500/30 blur-[120px] rounded-full -z-10 pointer-events-none"
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.8, 1.2, 0.8], rotate: [0, 90, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          />

          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="mb-2 sm:mb-4 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#222]/5 backdrop-blur-xl border border-[#222]/10 text-[#222] font-bold text-[10px] sm:text-xs lg:text-sm tracking-widest uppercase shadow-sm flex items-center gap-1.5 sm:gap-2 relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
            </motion.div>
            <span>Sonderangebot - Spare 33%</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <span className="font-semibold text-[26px] sm:text-[36px] lg:text-[60px] leading-[1.1] tracking-[-1px] sm:tracking-[-2px] lg:tracking-[-3px] text-[#222]">
              Dein digitaler Auftritt.
            </span>
            <span className="font-serif italic text-[30px] sm:text-[40px] lg:text-[64px] leading-[1] text-[#222] mt-0.5 sm:mt-1">
              Einfach & Sorgenfrei
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="mt-2 sm:mt-4 text-[12px] sm:text-[15px] lg:text-[16px] font-medium text-[#222]/80 max-w-[90%] sm:max-w-2xl leading-tight sm:leading-normal"
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
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-4 text-[9px] sm:text-[11px] lg:text-xs text-gray-500 font-medium">
                    <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500" />
                    Keine versteckten Kosten. Jederzeit kündbar.
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
    </div>
  );
}
