import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { careers } from '../data/careers'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export function ExplorePage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-mono text-ink-400 uppercase tracking-widest">Discover</span>
            <h1 className="mt-4 font-display text-4xl lg:text-6xl font-bold text-white text-balance leading-tight">
              What if your career is hiding in plain sight?
            </h1>
            <p className="mt-6 text-lg text-ink-300 max-w-2xl text-pretty">
              Six careers you probably have not heard on a brochure. Step into each world — the aesthetic, the reality, the path. Then decide if you want to forge it.
            </p>
          </motion.div>
        </div>

        {/* Editorial career grid — asymmetric, magazine-style */}
        <div className="space-y-6 lg:space-y-8">
          {careers.map((career, i) => {
            const isEven = i % 2 === 0
            return (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              >
                <Link
                  to={`/career/${career.id}`}
                  className="group grid lg:grid-cols-12 gap-6 lg:gap-8 items-center"
                >
                  {/* Image */}
                  <div className={`lg:col-span-7 ${isEven ? '' : 'lg:order-2'}`}>
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 aspect-[16/10] lg:aspect-[16/9]">
                      <img
                        src={career.images.hero}
                        alt={career.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      <div
                        className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-mono font-bold backdrop-blur-md"
                        style={{
                          background: career.colors.accent + '30',
                          color: career.colors.accentSoft,
                          border: `1px solid ${career.colors.accent}40`,
                        }}
                      >
                        {career.number}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`lg:col-span-5 ${isEven ? '' : 'lg:order-1'}`}>
                    <h2 className="font-display text-3xl lg:text-4xl font-bold text-white group-hover:text-white transition-colors">
                      {career.title}
                    </h2>
                    <p className="mt-3 text-lg text-ink-200 italic font-light leading-snug">
                      "{career.tagline}"
                    </p>
                    <p className="mt-4 text-ink-300 text-pretty leading-relaxed">
                      {career.shortDescription}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-white font-semibold">
                      <span>Enter the world</span>
                      <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 lg:mt-32 text-center">
          <p className="text-ink-300 text-lg">Still scrolling?</p>
          <Link
            to="/signup"
            className="group mt-6 inline-flex items-center gap-2 px-8 py-4 bg-white text-ink-950 font-semibold rounded-xl hover:bg-ink-100 transition-all hover:scale-[1.02] active:scale-95"
          >
            FORGE MY PATH
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
