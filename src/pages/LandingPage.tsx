import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { careers } from '../data/careers'
import { Logo } from '../components/Logo'
import { ArrowRight, ArrowDown, Eye } from 'lucide-react'

export function LandingPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % careers.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [autoPlay])

  const activeCareer = careers[activeIndex]

  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background image with crossfade */}
        <div className="absolute inset-0">
          <AnimatePresence mode="sync">
            <motion.div
              key={activeCareer.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <img
                src={activeCareer.images.hero}
                alt={activeCareer.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/50 to-ink-950" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-transparent to-ink-950/30" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Career accent glow */}
        <div
          className="absolute top-0 right-0 w-[60vw] h-[60vh] opacity-20 blur-[120px] transition-colors duration-1000 pointer-events-none"
          style={{ background: activeCareer.colors.accent }}
        />

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 w-full pt-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <Logo size="xl" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white text-balance"
            >
              Stop searching for career advice.
              <br />
              <span className="italic font-light text-ink-200">Start forging your path.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-lg lg:text-xl text-ink-200 max-w-2xl text-pretty leading-relaxed"
            >
              Discover careers nobody put on the brochure — then turn curiosity into an actual plan.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/signup"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-white text-ink-950 font-semibold rounded-xl hover:bg-ink-100 transition-all hover:scale-[1.02] active:scale-95"
              >
                FORGE MY PATH
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/explore"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all"
              >
                EXPLORE CAREERS
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Career switcher strip */}
        <div
          className="relative z-10 mt-16 lg:mt-0 pb-12"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {careers.map((career, i) => (
                <button
                  key={career.id}
                  onClick={() => setActiveIndex(i)}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl border transition-all whitespace-nowrap ${
                    i === activeIndex
                      ? 'border-white/30 bg-white/10'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                  style={i === activeIndex ? { borderColor: career.colors.accent + '60' } : {}}
                >
                  <span
                    className="text-xs font-mono font-bold w-6"
                    style={{ color: i === activeIndex ? career.colors.accent : undefined }}
                  >
                    {career.number}
                  </span>
                  <span className={`text-sm font-medium ${i === activeIndex ? 'text-white' : 'text-ink-300'}`}>
                    {career.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden lg:block">
          <ArrowDown size={20} className="text-ink-400 animate-bounce" />
        </div>
      </section>

      {/* GOSSIP NEXT DOOR */}
      <section className="relative py-20 lg:py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
                <Eye size={16} className="text-ink-300" />
                <span className="text-sm font-medium text-ink-200">GOSSIP NEXT DOOR</span>
              </div>
              <h2 className="font-display text-3xl lg:text-5xl font-bold leading-tight text-white text-balance">
                Apparently, people get paid to do <span className="italic font-light">THIS.</span>
              </h2>
              <p className="mt-4 text-lg text-ink-300 text-pretty">
                Six careers you probably have not heard on a brochure. Real jobs. Real paths. Real people doing them right now.
              </p>
              <Link
                to="/explore"
                className="group mt-8 inline-flex items-center gap-2 text-white font-semibold text-lg hover:gap-3 transition-all"
              >
                Explore the rabbit hole
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-4">
                {careers.slice(0, 4).map((career, i) => (
                  <Link
                    key={career.id}
                    to={`/career/${career.id}`}
                    className={`group relative overflow-hidden rounded-2xl border border-white/10 ${i % 2 === 1 ? 'sm:mt-8' : ''}`}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={career.images.detail}
                        alt={career.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <span className="text-xs font-mono font-bold text-ink-300">{career.number}</span>
                      <h3 className="font-display text-xl font-bold text-white mt-1">{career.title}</h3>
                      <p className="text-sm text-ink-300 mt-1 line-clamp-2 italic">"{career.tagline}"</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DISCOVERY TEASER */}
      <section className="relative py-20 lg:py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 text-center">
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-white text-balance max-w-3xl mx-auto">
            What if your career is hiding in plain sight?
          </h2>
          <p className="mt-6 text-lg text-ink-300 max-w-2xl mx-auto text-pretty">
            Pick a world. Step inside. See the reality, the vibe, the path — then decide if you want to forge it.
          </p>
          <Link
            to="/explore"
            className="group mt-10 inline-flex items-center gap-2 px-8 py-4 bg-white text-ink-950 font-semibold rounded-xl hover:bg-ink-100 transition-all hover:scale-[1.02] active:scale-95"
          >
            Discover Careers
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Career number strip */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {careers.map((career) => (
              <Link
                key={career.id}
                to={`/career/${career.id}`}
                className="group relative overflow-hidden rounded-xl border border-white/10 aspect-[3/4]"
              >
                <img
                  src={career.images.gallery[0]}
                  alt={career.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-ink-950/60 group-hover:bg-ink-950/30 transition-colors" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 text-left">
                  <span className="text-xs font-mono font-bold text-ink-300">{career.number}</span>
                  <span className="font-display text-sm font-bold text-white leading-tight mt-1">{career.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 lg:py-32 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={careers[3].images.hero}
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-ink-950/80" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-white text-balance">
            Stop scrolling career advice.
            <br />
            <span className="italic font-light">Start doing the work.</span>
          </h2>
          <p className="mt-6 text-lg text-ink-200 text-pretty">
            Pick a career. Get a roadmap. Complete your first task today.
          </p>
          <Link
            to="/signup"
            className="group mt-10 inline-flex items-center gap-2 px-8 py-4 bg-white text-ink-950 font-semibold rounded-xl hover:bg-ink-100 transition-all hover:scale-[1.02] active:scale-95"
          >
            FORGE MY PATH
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo size="sm" />
          <p className="text-sm text-ink-400 text-center">
            X-FORGE — Discover careers nobody put on the brochure.
          </p>
          <div className="flex gap-4 text-sm text-ink-400">
            <Link to="/explore" className="hover:text-white transition-colors">Explore</Link>
            <Link to="/signup" className="hover:text-white transition-colors">Sign Up</Link>
            <Link to="/login" className="hover:text-white transition-colors">Log In</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
