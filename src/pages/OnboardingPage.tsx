import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { careers, getCareer } from '../data/careers'
import type { CareerId, ExperienceLevel, Availability, CommStyle } from '../types'
import { ArrowRight, ArrowLeft, Check, SkipForward } from 'lucide-react'

const experienceOptions: { value: ExperienceLevel; label: string; desc: string }[] = [
  { value: 'beginner', label: 'Beginner', desc: 'Just starting to explore this' },
  { value: 'some', label: 'Some experience', desc: 'I have tried a few things' },
  { value: 'advanced', label: 'Advanced', desc: 'I have real experience already' },
]

const availabilityOptions: { value: Availability; label: string; desc: string }[] = [
  { value: '<5', label: 'Less than 5 hours', desc: 'A few focused sessions' },
  { value: '5-15', label: '5–15 hours', desc: 'Steady weekly commitment' },
  { value: '15+', label: '15+ hours', desc: 'All in. Multiple sessions daily' },
]

const commStyleOptions: { value: CommStyle; label: string; desc: string; emoji: string }[] = [
  { value: 'bestie', label: 'Bestie', desc: 'Hype me up, keep it casual', emoji: '👯' },
  { value: 'mentor', label: 'Mentor', desc: 'Guide me with wisdom', emoji: '🧭' },
  { value: 'drill-sergeant', label: 'Drill Sergeant', desc: 'No excuses. Push me.', emoji: '🎖️' },
  { value: 'softie', label: 'Softie', desc: 'Gentle encouragement', emoji: '🫶' },
  { value: 'chaos', label: 'Chaos Mode', desc: 'Surprise me', emoji: '🎲' },
]

export function OnboardingPage() {
  const { user, setOnboardingData, completeOnboarding, switchCareer } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const [step, setStep] = useState(0)

  const preselectedCareer = (location.state as { preselectedCareer?: string } | null)?.preselectedCareer
  const [selectedCareer, setSelectedCareer] = useState<CareerId | null>(
    (preselectedCareer as CareerId) ?? user?.careerId ?? null
  )

  const totalSteps = 5

  const handleCareerSelect = (id: CareerId) => {
    setSelectedCareer(id)
  }

  const handleNext = () => {
    if (step === 0 && selectedCareer) {
      switchCareer(selectedCareer)
    }
    if (step < totalSteps - 1) {
      setStep(step + 1)
    } else {
      completeOnboarding()
      navigate('/dashboard')
    }
  }

  const handleSkip = () => {
    setStep(step + 1)
  }

  const career = getCareer(selectedCareer ?? undefined)

  return (
    <div className="min-h-screen pt-20 pb-12 px-5">
      <div className="max-w-2xl mx-auto">
        {/* Progress dots */}
        <div className="flex items-center gap-2 mb-12">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === step ? 'w-8 bg-white' : i < step ? 'w-4 bg-white/60' : 'w-4 bg-white/20'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
          >
            {/* STEP 0: Career */}
            {step === 0 && (
              <div>
                <span className="font-mono text-xs font-bold text-ink-400 uppercase tracking-widest">Step 1 of 5</span>
                <h1 className="mt-3 font-display text-3xl lg:text-4xl font-bold text-white text-balance">
                  Choose your career.
                </h1>
                <p className="mt-3 text-ink-300 text-pretty">Which world do you want to step into?</p>
                <div className="mt-8 grid sm:grid-cols-2 gap-3">
                  {careers.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleCareerSelect(c.id)}
                      className={`group relative overflow-hidden rounded-xl border text-left transition-all ${
                        selectedCareer === c.id ? 'border-white/40' : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        <img src={c.images.gallery[0]} alt={c.title} className={`w-full h-full object-cover transition-all ${selectedCareer === c.id ? 'scale-105' : 'group-hover:scale-105'}`} />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 to-transparent" />
                      {selectedCareer === c.id && (
                        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white text-ink-950 flex items-center justify-center">
                          <Check size={16} />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <span className="text-xs font-mono text-ink-300">{c.number}</span>
                        <p className="font-display font-bold text-white">{c.title}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 1: Experience */}
            {step === 1 && (
              <div>
                <span className="font-mono text-xs font-bold text-ink-400 uppercase tracking-widest">Step 2 of 5</span>
                <h1 className="mt-3 font-display text-3xl lg:text-4xl font-bold text-white text-balance">
                  How much experience do you have?
                </h1>
                <p className="mt-3 text-ink-300 text-pretty">In {career?.title ?? 'this career'}.</p>
                <div className="mt-8 space-y-3">
                  {experienceOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setOnboardingData({ experience: opt.value })}
                      className={`w-full flex items-center justify-between p-5 rounded-xl border transition-all text-left ${
                        user?.experience === opt.value
                          ? 'border-white/40 bg-white/10'
                          : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                      }`}
                    >
                      <div>
                        <p className="font-display text-lg font-bold text-white">{opt.label}</p>
                        <p className="text-sm text-ink-300 mt-0.5">{opt.desc}</p>
                      </div>
                      {user?.experience === opt.value && <Check size={20} className="text-white shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Availability */}
            {step === 2 && (
              <div>
                <span className="font-mono text-xs font-bold text-ink-400 uppercase tracking-widest">Step 3 of 5</span>
                <h1 className="mt-3 font-display text-3xl lg:text-4xl font-bold text-white text-balance">
                  How much time per week?
                </h1>
                <p className="mt-3 text-ink-300 text-pretty">Be honest. We will pace your roadmap accordingly.</p>
                <div className="mt-8 space-y-3">
                  {availabilityOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setOnboardingData({ availability: opt.value })}
                      className={`w-full flex items-center justify-between p-5 rounded-xl border transition-all text-left ${
                        user?.availability === opt.value
                          ? 'border-white/40 bg-white/10'
                          : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                      }`}
                    >
                      <div>
                        <p className="font-display text-lg font-bold text-white">{opt.label}</p>
                        <p className="text-sm text-ink-300 mt-0.5">{opt.desc}</p>
                      </div>
                      {user?.availability === opt.value && <Check size={20} className="text-white shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Role model (optional) */}
            {step === 3 && (
              <div>
                <span className="font-mono text-xs font-bold text-ink-400 uppercase tracking-widest">Step 4 of 5 · Optional</span>
                <h1 className="mt-3 font-display text-3xl lg:text-4xl font-bold text-white text-balance">
                  Who inspires you in this field?
                </h1>
                <p className="mt-3 text-ink-300 text-pretty">A person, a character, a creator — anyone. We will use this to personalize your dashboard.</p>
                <input
                  type="text"
                  value={user?.roleModel ?? ''}
                  onChange={(e) => setOnboardingData({ roleModel: e.target.value })}
                  placeholder="e.g. Jancis Robinson, Jacques Cousteau..."
                  className="mt-8 w-full px-5 py-4 bg-ink-950 border border-white/10 rounded-xl text-white placeholder-ink-500 focus:outline-none focus:border-white/30 transition-colors text-lg"
                />
                <button
                  onClick={handleSkip}
                  className="mt-4 inline-flex items-center gap-2 text-ink-400 hover:text-white transition-colors text-sm font-medium"
                >
                  Skip this <SkipForward size={16} />
                </button>
              </div>
            )}

            {/* STEP 4: Comm style */}
            {step === 4 && (
              <div>
                <span className="font-mono text-xs font-bold text-ink-400 uppercase tracking-widest">Step 5 of 5</span>
                <h1 className="mt-3 font-display text-3xl lg:text-4xl font-bold text-white text-balance">
                  How should X-FORGE talk to you?
                </h1>
                <p className="mt-3 text-ink-300 text-pretty">Pick a communication style. You can change it later.</p>
                <div className="mt-8 space-y-3">
                  {commStyleOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setOnboardingData({ commStyle: opt.value })}
                      className={`w-full flex items-center gap-4 p-5 rounded-xl border transition-all text-left ${
                        user?.commStyle === opt.value
                          ? 'border-white/40 bg-white/10'
                          : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                      }`}
                    >
                      <span className="text-2xl">{opt.emoji}</span>
                      <div className="flex-1">
                        <p className="font-display text-lg font-bold text-white">{opt.label}</p>
                        <p className="text-sm text-ink-300 mt-0.5">{opt.desc}</p>
                      </div>
                      {user?.commStyle === opt.value && <Check size={20} className="text-white shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between">
          {step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-2 text-ink-300 hover:text-white transition-colors font-medium"
            >
              <ArrowLeft size={18} /> Back
            </button>
          ) : <span />}

          <button
            onClick={handleNext}
            disabled={step === 0 && !selectedCareer}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-ink-950 font-semibold rounded-xl hover:bg-ink-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
          >
            {step === totalSteps - 1 ? 'Enter X-FORGE' : 'Continue'}
            <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  )
}
