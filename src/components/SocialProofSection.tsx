import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function SocialProofSection() {
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
        className="max-w-7xl mx-auto w-full"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-16 tracking-tight drop-shadow-md"
        >
          Bewährte Exzellenz. Vertrauen durch Ergebnisse.
        </motion.h2>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {[
            {
              name: "Max Mustermann",
              company: "Muster GmbH",
              img: "https://picsum.photos/seed/web1/800/600",
            },
            {
              name: "Sarah Schmidt",
              company: "Schmidt & Co",
              img: "https://picsum.photos/seed/web2/800/600",
            },
            {
              name: "Jan Becker",
              company: "Becker Consulting",
              img: "https://picsum.photos/seed/web3/800/600",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl overflow-hidden"
            >
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-black/20">
                <img
                  src={item.img}
                  alt={`${item.company} Website`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="mt-4 mb-2 px-2 text-left">
                <p className="text-white font-semibold text-lg">{item.name}</p>
                <p className="text-white/60 text-sm">{item.company}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {[
            {
              text: "Christian hat unsere Vision perfekt umgesetzt. Endlich eine Website, die Kunden gewinnt!",
              name: "Michael Weber",
              company: "Weber Immobilien",
            },
            {
              text: "Unglaubliche Performance und GSAP Animationen. Ein echtes Premium-Erlebnis.",
              name: "Julia Wagner",
              company: "Wagner Design Studio",
            },
          ].map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 text-left shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <Star className="w-5 h-5 fill-transparent text-yellow-400 opacity-30" />
                </div>
                <p className="text-white/90 text-lg sm:text-xl font-medium leading-relaxed mb-8">
                  "{testimonial.text}"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/20 flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-bold">{testimonial.name}</p>
                  <p className="text-white/60 text-sm">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
