import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { getCareer, careers } from '../data/careers'
import { roadmaps } from '../data/roadmaps'
import { useApp } from '../context/AppContext'
import { ArrowLeft, ArrowRight, Check, Flame, Compass, Eye, Heart, Zap, Layers, Map as MapIcon, Lightbulb } from 'lucide-react'

export function CareerDetailPage() {
  const { careerId } = useParams<{ careerId: string }>()
  const navigate = useNavigate()
  const { user, switchCareer } = useApp()
  const [dinnerMode, setDinnerMode] = useState<'normal' | 'parents' | 'dinner' | 'friends'>('normal')

  const career = getCareer(careerId)
  if (!career) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-ink-300 text-lg">Career not found.</p>
          <Link to="/explore" className="mt-4 inline-block text-white underline">Back to Explore</Link>
        </div>
      </div>
    )
  }

  const roadmap = roadmaps[career.id]
  const firstMilestone = roadmap.milestones[0]
  const firstTask = firstMilestone.tasks[0]
  const colors = career.colors

  const handleForge = () => {
    if (!user) {
      navigate('/signup', { state: { preselectedCareer: career.id } })
    } else if (!user.onboarded) {
      switchCareer(career.id)
      navigate('/onboarding')
    } else {
      switchCareer(career.id)
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bg }}>
      {/* Apply career colors via CSS vars */}
      <style>{`:root { --accent: ${colors.accent}; --accent-soft: ${colors.accentSoft}; --accent-deep: ${colors.accentDeep}; }`}</style>

      {/* HERO */}
      <section className="relative min-h-[75vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={career.images.hero} alt={career.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, ${colors.bg}40, ${colors.bg}90), linear-gradient(to right, ${colors.bg}80, transparent)` }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 w-full pb-12 lg:pb-20 pt-24">
          <Link to="/explore" className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-opacity hover:opacity-70" style={{ color: colors.accentSoft }}>
            <ArrowLeft size={16} /> Back to Explore
          </Link>
          <div className="max-w-3xl">
            <span className="font-mono text-sm font-bold" style={{ color: colors.accent }}>
              CAREER {career.number}
            </span>
            <h1 className="mt-3 font-display text-5xl lg:text-7xl font-bold leading-[1.05] text-white text-balance">
              {career.title}
            </h1>
            <p className="mt-6 text-xl lg:text-2xl font-light italic text-pretty" style={{ color: colors.accentSoft }}>
              "{career.tagline}"
            </p>
            <p className="mt-6 text-lg leading-relaxed max-w-2xl text-pretty" style={{ color: colors.text }}>
              {career.longDescription}
            </p>
          </div>
        </div>
      </section>

      {/* WHAT THEY ACTUALLY DO */}
      <section className="py-16 lg:py-24 border-t" style={{ borderColor: colors.accent + '20' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <div className="inline-flex items-center gap-2 mb-4" style={{ color: colors.accent }}>
                  <Compass size={20} />
                  <span className="font-mono text-xs font-bold uppercase tracking-widest">What they actually do</span>
                </div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-white">
                  The daily reality.
                </h2>
              </div>
            </div>
            <div className="lg:col-span-8">
              <ul className="space-y-4">
                {career.whatTheyDo.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-4 p-4 rounded-xl border" style={{ borderColor: colors.accent + '15', background: colors.bgSoft + '60' }}
                  >
                    <span className="shrink-0 mt-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold" style={{ background: colors.accent + '20', color: colors.accent }}>
                      {i + 1}
                    </span>
                    <span style={{ color: colors.text }}>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AESTHETIC vs REALITY */}
      <section className="py-16 lg:py-24 border-t" style={{ borderColor: colors.accent + '20' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <div className="relative overflow-hidden rounded-2xl border p-8 lg:p-10" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
              <div className="absolute top-0 right-0 w-40 h-40 opacity-10 blur-3xl" style={{ background: colors.accent }} />
              <Eye size={24} style={{ color: colors.accent }} />
              <h3 className="mt-4 font-mono text-xs font-bold uppercase tracking-widest" style={{ color: colors.accent }}>The Aesthetic</h3>
              <p className="mt-3 text-lg lg:text-xl font-display font-light italic text-white leading-relaxed text-pretty">
                {career.aesthetic}
              </p>
            </div>
            <div className="relative overflow-hidden rounded-2xl border p-8 lg:p-10" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
              <div className="absolute top-0 right-0 w-40 h-40 opacity-10 blur-3xl" style={{ background: colors.accentDeep }} />
              <Zap size={24} style={{ color: colors.accent }} />
              <h3 className="mt-4 font-mono text-xs font-bold uppercase tracking-widest" style={{ color: colors.accent }}>The Reality</h3>
              <p className="mt-3 text-lg lg:text-xl font-display font-light text-pretty" style={{ color: colors.textMuted }}>
                {career.reality}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WOULD I VIBE WITH THIS? */}
      <section className="py-16 lg:py-24 border-t" style={{ borderColor: colors.accent + '20' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4" style={{ color: colors.accent }}>
              <Heart size={20} />
              <span className="font-mono text-xs font-bold uppercase tracking-widest">Would I vibe with this?</span>
            </div>
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-white">
              Honest. Not hype.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            <div className="rounded-2xl border p-8" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
              <h3 className="font-display text-xl font-bold" style={{ color: colors.accent }}>You might love it if...</h3>
              <ul className="mt-4 space-y-3">
                {career.vibe.love.map((item, i) => (
                  <li key={i} className="flex items-start gap-3" style={{ color: colors.text }}>
                    <Check size={18} className="shrink-0 mt-0.5" style={{ color: colors.accent }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border p-8" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
              <h3 className="font-display text-xl font-bold" style={{ color: colors.textMuted }}>You might hate it if...</h3>
              <ul className="mt-4 space-y-3">
                {career.vibe.hate.map((item, i) => (
                  <li key={i} className="flex items-start gap-3" style={{ color: colors.textMuted }}>
                    <span className="shrink-0 mt-0.5 text-base">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ENTRY PATH + SKILLS */}
      <section className="py-16 lg:py-24 border-t" style={{ borderColor: colors.accent + '20' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 mb-4" style={{ color: colors.accent }}>
                <MapIcon size={20} />
                <span className="font-mono text-xs font-bold uppercase tracking-widest">Entry Path</span>
              </div>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-white mb-8">How you get there.</h2>
              <div className="space-y-3">
                {career.entryPath.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold shrink-0" style={{ background: colors.accent + '20', color: colors.accent }}>
                        {i + 1}
                      </span>
                      {i < career.entryPath.length - 1 && <div className="w-px h-6 mt-1" style={{ background: colors.accent + '30' }} />}
                    </div>
                    <p className="pt-1.5 text-pretty" style={{ color: colors.text }}>{step}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 mb-4" style={{ color: colors.accent }}>
                <Layers size={20} />
                <span className="font-mono text-xs font-bold uppercase tracking-widest">Skills</span>
              </div>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-white mb-8">What you will build.</h2>
              <div className="flex flex-wrap gap-3">
                {career.skills.map((skill) => (
                  <span key={skill} className="px-4 py-2 rounded-lg border text-sm font-medium" style={{ borderColor: colors.accent + '30', background: colors.bgSoft, color: colors.text }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP PREVIEW */}
      <section className="py-16 lg:py-24 border-t" style={{ borderColor: colors.accent + '20' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="inline-flex items-center gap-2 mb-4" style={{ color: colors.accent }}>
            <Lightbulb size={20} />
            <span className="font-mono text-xs font-bold uppercase tracking-widest">Roadmap Preview</span>
          </div>
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-white mb-8">Your path, laid out.</h2>
          <div className="flex items-center gap-3 flex-wrap">
            {roadmap.milestones.map((m, i) => (
              <div key={m.id} className="flex items-center gap-3">
                <div className="px-4 py-3 rounded-xl border" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
                  <span className="text-xs font-mono font-bold" style={{ color: colors.accent }}>PHASE {i + 1}</span>
                  <p className="text-sm font-bold text-white mt-1">{m.title}</p>
                </div>
                {i < roadmap.milestones.length - 1 && <ArrowRight size={16} style={{ color: colors.accent + '60' }} />}
              </div>
            ))}
          </div>

          {/* First action */}
          <div className="mt-12 rounded-2xl border p-8" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
            <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: colors.accent }}>First Action</span>
            <h3 className="mt-2 font-display text-xl lg:text-2xl font-bold text-white">{firstTask.title}</h3>
            <p className="mt-3 text-pretty" style={{ color: colors.textMuted }}>{firstTask.description}</p>
            <div className="mt-4 flex items-center gap-4 text-sm" style={{ color: colors.accent }}>
              <span>⏱ {firstTask.time}</span>
              <span>·</span>
              <span>{firstMilestone.title}</span>
            </div>
          </div>
        </div>
      </section>

      {/* DINNER TABLE CONVO */}
      <section className="py-16 lg:py-24 border-t" style={{ borderColor: colors.accent + '20' }}>
        <div className="max-w-4xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-2xl">🍽️</span>
            <h2 className="mt-3 font-display text-2xl lg:text-3xl font-bold text-white">Dinner Table Convo</h2>
            <p className="mt-3" style={{ color: colors.textMuted }}>How do you explain being a {career.title} to...</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {(['normal', 'parents', 'dinner', 'friends'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setDinnerMode(mode)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  dinnerMode === mode ? 'text-white' : ''
                }`}
                style={{
                  background: dinnerMode === mode ? colors.accent : colors.bgSoft,
                  color: dinnerMode === mode ? colors.bg : colors.text,
                  border: `1px solid ${colors.accent}30`,
                }}
              >
                {mode === 'normal' ? 'Explain normally' : mode === 'parents' ? 'Explain to my parents' : mode === 'dinner' ? 'Dinner table version' : 'Tell my friends'}
              </button>
            ))}
          </div>
          <div className="rounded-2xl border p-8" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
            <p className="text-lg leading-relaxed text-pretty" style={{ color: colors.text }}>
              {career.dinnerTable[dinnerMode]}
            </p>
          </div>
        </div>
      </section>

      {/* FORGE CTA */}
      <section className="py-20 lg:py-32 border-t" style={{ borderColor: colors.accent + '20' }}>
        <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center">
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-white text-balance">
            Ready to forge this path?
          </h2>
          <p className="mt-6 text-lg text-pretty" style={{ color: colors.textMuted }}>
            Get the full roadmap, complete your first task today, and track your progress.
          </p>
          <button
            onClick={handleForge}
            className="group mt-10 inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-95"
            style={{ background: colors.accent, color: colors.bg }}
          >
            FORGE THIS PATH
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          {user && !user.onboarded && (
            <p className="mt-4 text-sm" style={{ color: colors.textMuted }}>
              You will finish setup first. Takes 2 minutes.
            </p>
          )}
        </div>
      </section>

      {/* Other careers */}
      <section className="py-16 border-t" style={{ borderColor: colors.accent + '20' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <h3 className="font-display text-xl font-bold text-white mb-6">Explore other worlds</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {careers.filter((c) => c.id !== career.id).map((c) => (
              <Link
                key={c.id}
                to={`/career/${c.id}`}
                className="group shrink-0 w-48 rounded-xl overflow-hidden border border-white/10"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={c.images.gallery[0]} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3">
                  <span className="text-xs font-mono text-ink-400">{c.number}</span>
                  <p className="font-display font-bold text-white text-sm mt-0.5">{c.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
