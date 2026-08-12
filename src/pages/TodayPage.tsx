import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useApp, computeTaskStatus } from '../context/AppContext'
import { getCareer } from '../data/careers'
import { roadmaps } from '../data/roadmaps'
import { dailyDiscoveries, personalityMessages, moodLabels } from '../data/content'
import { Check, Flame, Eye, Sparkles, ArrowRight } from 'lucide-react'
import type { Mood } from '../types'

export function TodayPage() {
  const { user, roadmapProgress, completeTask, checkIn, hasCheckedInToday, todayCheckIn, getStreak } = useApp()
  const [dialogueIndex, setDialogueIndex] = useState(0)

  if (!user || !user.careerId) {
    return <div className="min-h-screen flex items-center justify-center pt-20"><p className="text-ink-300">Loading...</p></div>
  }

  const career = getCareer(user.careerId)!
  const colors = career.colors
  const roadmap = roadmaps[user.careerId]
  const progress = roadmapProgress[user.careerId]

  // Find today's task
  let todayTask: { milestoneId: string; taskId: string; title: string; time: string; description: string; why: string; resources: { title: string; source: string; type: string }[] } | null = null
  for (const milestone of roadmap.milestones) {
    for (const task of milestone.tasks) {
      const status = computeTaskStatus(user.careerId!, milestone.id, task.id, progress)
      if (status === 'active') {
        todayTask = { milestoneId: milestone.id, taskId: task.id, title: task.title, time: task.time, description: task.description, why: task.why, resources: task.resources.map(r => ({ title: r.title, source: r.source, type: r.type })) }
        break
      }
    }
    if (todayTask) break
  }

  const discoveries = dailyDiscoveries[user.careerId]
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
  const todayDiscovery = discoveries[dayOfYear % discoveries.length]

  const streak = getStreak()
  const moods: Mood[] = ['locked-in', 'okay', 'overwhelmed', 'curious', 'procrastinating']
  const todayMood = todayCheckIn()?.mood

  const answers = personalityMessages.dialogue.answers

  const handleAnswer = () => {
    setDialogueIndex((prev) => (prev + 1) % answers.length)
  }

  const isComplete = !todayTask

  return (
    <div className="min-h-screen pt-20 pb-20 lg:pb-12" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-3xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <Flame size={24} style={{ color: colors.accent }} />
            <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: colors.accent }}>
              🔥 {streak} day streak
            </span>
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-white text-balance">
            Today's Move
          </h1>
        </motion.div>

        {/* Dialogue */}
        <div className="mb-8 rounded-2xl border p-6" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
          <p className="font-display text-lg italic font-light" style={{ color: colors.accentSoft }}>
            "{personalityMessages.dialogue.ready}"
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {answers.map((ans, i) => (
              <button
                key={i}
                onClick={handleAnswer}
                className="px-3 py-1.5 rounded-lg text-sm border transition-all hover:scale-105"
                style={{
                  borderColor: dialogueIndex === i ? colors.accent : colors.accent + '20',
                  background: dialogueIndex === i ? colors.accent + '20' : 'transparent',
                  color: colors.text,
                }}
              >
                "{ans}"
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={dialogueIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-3 text-sm italic"
              style={{ color: colors.accent }}
            >
              "{personalityMessages.dialogue.response}"
            </motion.p>
          </AnimatePresence>
        </div>

        {/* TODAY'S TASK */}
        <div className="rounded-2xl border p-6 lg:p-8 mb-6" style={{ borderColor: colors.accent + '25', background: colors.bgSoft }}>
          {isComplete ? (
            <div className="text-center py-8">
              <Sparkles size={32} style={{ color: colors.accent }} className="mx-auto" />
              <h2 className="mt-4 font-display text-2xl font-bold text-white">All caught up.</h2>
              <p className="mt-2" style={{ color: colors.textMuted }}>
                {personalityMessages.hype[0]}
              </p>
              <p className="mt-1 text-sm" style={{ color: colors.textMuted }}>Come back tomorrow for your next move.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: colors.accent }}>Your next action</span>
              </div>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-white text-balance">{todayTask!.title}</h2>
              <p className="mt-3 text-pretty" style={{ color: colors.textMuted }}>{todayTask!.description}</p>

              <div className="mt-6 p-4 rounded-xl" style={{ background: colors.bg }}>
                <p className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: colors.accent }}>Why it matters</p>
                <p className="text-sm text-pretty" style={{ color: colors.text }}>{todayTask!.why}</p>
              </div>

              <div className="mt-4 flex items-center gap-4 text-sm" style={{ color: colors.accent }}>
                <span>⏱ {todayTask!.time}</span>
              </div>

              <button
                onClick={() => completeTask(todayTask!.milestoneId, todayTask!.taskId, todayTask!.title)}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-4 font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-95"
                style={{ background: colors.accent, color: colors.bg }}
              >
                <Check size={20} /> Mark Complete
              </button>
            </>
          )}
        </div>

        {/* DAILY CHECK-IN */}
        <div className="rounded-2xl border p-6 mb-6" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
          <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: colors.accent }}>Today's Check-in</span>
          <p className="mt-2" style={{ color: colors.textMuted }}>How are you feeling?</p>
          <div className="mt-4 grid grid-cols-5 gap-2">
            {moods.map((mood) => {
              const info = moodLabels[mood]
              const selected = todayMood === mood
              return (
                <button
                  key={mood}
                  onClick={() => checkIn(mood)}
                  className={`flex flex-col items-center gap-1 py-3 rounded-lg border transition-all ${selected ? 'scale-105' : 'hover:scale-105'}`}
                  style={{
                    borderColor: selected ? colors.accent : colors.accent + '20',
                    background: selected ? colors.accent + '20' : 'transparent',
                  }}
                >
                  <span className="text-xl">{info.emoji}</span>
                  <span className="text-[10px] font-medium" style={{ color: colors.textMuted }}>{info.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* TODAY'S DISCOVERY */}
        <div className="rounded-2xl border p-6 mb-6" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
          <div className="flex items-center gap-2 mb-3">
            <Eye size={16} style={{ color: colors.accent }} />
            <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: colors.accent }}>Today's Discovery 👀</span>
          </div>
          <p className="font-display text-lg font-light italic text-white text-pretty">"{todayDiscovery}"</p>
        </div>

        {/* Streak / Hype message */}
        {streak > 0 && (
          <div className="rounded-2xl border p-6 text-center" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
            <p className="font-display text-lg italic" style={{ color: colors.accentSoft }}>
              {personalityMessages.hype[streak % personalityMessages.hype.length]}
            </p>
          </div>
        )}

        {!hasCheckedInToday() && streak === 0 && (
          <div className="rounded-2xl border p-6 text-center" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
            <p className="font-display text-sm italic" style={{ color: colors.textMuted }}>
              {personalityMessages.console[0]}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
