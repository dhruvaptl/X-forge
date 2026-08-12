import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp, computeTaskStatus, computeMilestoneStatus } from '../context/AppContext'
import { getCareer } from '../data/careers'
import { roadmaps } from '../data/roadmaps'
import { dailyDiscoveries, gossipItems, personalityMessages, moodLabels } from '../data/content'
import { ArrowRight, Flame, Target, TrendingUp, Eye, Utensils, Check, Sparkles } from 'lucide-react'
import type { Mood } from '../types'

export function DashboardPage() {
  const { user, getStreak, getOverallProgress, checkIn, hasCheckedInToday, todayCheckIn, completeTask, activity } = useApp()

  if (!user || !user.careerId) {
    return <div className="min-h-screen flex items-center justify-center pt-20"><p className="text-ink-300">Loading...</p></div>
  }

  const career = getCareer(user.careerId)!
  const colors = career.colors
  const roadmap = roadmaps[user.careerId]
  const progress = useApp().roadmapProgress[user.careerId]

  // Find today's move = first active task
  let todayTask: { milestoneId: string; taskId: string; title: string; time: string; description: string } | null = null
  for (const milestone of roadmap.milestones) {
    for (const task of milestone.tasks) {
      const status = computeTaskStatus(user.careerId!, milestone.id, task.id, progress)
      if (status === 'active') {
        todayTask = { milestoneId: milestone.id, taskId: task.id, title: task.title, time: task.time, description: task.description }
        break
      }
    }
    if (todayTask) break
  }

  // Find current phase
  const currentMilestone = roadmap.milestones.find((m) =>
    computeMilestoneStatus(user.careerId!, m.id, progress) === 'active'
  )

  // Find next milestone
  const nextMilestoneIndex = roadmap.milestones.findIndex((m) =>
    computeMilestoneStatus(user.careerId!, m.id, progress) === 'active'
  )
  const nextMilestone = nextMilestoneIndex >= 0 && nextMilestoneIndex + 1 < roadmap.milestones.length
    ? roadmap.milestones[nextMilestoneIndex + 1]
    : null

  const streak = getStreak()
  const overallProgress = getOverallProgress()

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  // Today's discovery
  const discoveries = dailyDiscoveries[user.careerId]
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
  const todayDiscovery = discoveries[dayOfYear % discoveries.length]

  // Gossip for current career
  const gossip = gossipItems.find((g) => g.careerId === user.careerId) ?? gossipItems[0]

  const moods: Mood[] = ['locked-in', 'okay', 'overwhelmed', 'curious', 'procrastinating']
  const todayMood = todayCheckIn()?.mood

  const handleMoodClick = (mood: Mood) => {
    checkIn(mood)
  }

  const recentActivity = activity.slice(0, 5)

  return (
    <div className="min-h-screen pt-20 pb-20 lg:pb-12" style={{ backgroundColor: colors.bg }}>
      <style>{`:root { --accent: ${colors.accent}; }`}</style>

      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl lg:text-5xl font-bold text-white text-balance">
            {greeting.toUpperCase()}, {user.name.toUpperCase()}
          </h1>
          <p className="mt-3 text-lg font-light italic" style={{ color: colors.accentSoft }}>
            "Ready to forge today's move?"
          </p>
        </motion.div>

        {/* Career badge */}
        <div className="mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full border" style={{ borderColor: colors.accent + '30', background: colors.bgSoft }}>
          <span className="text-xs font-mono font-bold" style={{ color: colors.accent }}>CAREER</span>
          <span className="text-sm font-bold text-white">{career.title}</span>
          <Link to="/explore" className="text-xs underline" style={{ color: colors.textMuted }}>switch</Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* TODAY'S MOVE — large card */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border p-6 lg:p-8" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: colors.accent }}>Today's Move</span>
                <Sparkles size={18} style={{ color: colors.accent }} />
              </div>
              {todayTask ? (
                <>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-white text-balance">{todayTask.title}</h2>
                  <p className="mt-3 text-pretty" style={{ color: colors.textMuted }}>{todayTask.description}</p>
                  <div className="mt-4 flex items-center gap-4 text-sm" style={{ color: colors.accent }}>
                    <span>⏱ {todayTask.time}</span>
                  </div>
                  <button
                    onClick={() => completeTask(todayTask!.milestoneId, todayTask!.taskId, todayTask!.title)}
                    className="mt-6 inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-95"
                    style={{ background: colors.accent, color: colors.bg }}
                  >
                    <Check size={18} /> Mark Complete
                  </button>
                </>
              ) : (
                <>
                  <h2 className="font-display text-2xl font-bold text-white">All tasks complete!</h2>
                  <p className="mt-3" style={{ color: colors.textMuted }}>You have completed every task in this roadmap. That is genuinely impressive.</p>
                </>
              )}
            </div>

            {/* YOUR PATH */}
            <div className="mt-6 rounded-2xl border p-6 lg:p-8" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: colors.accent }}>Your Path</span>
                <Link to="/path" className="text-sm font-medium hover:underline" style={{ color: colors.accent }}>View roadmap →</Link>
              </div>

              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-display text-3xl font-bold text-white">{overallProgress}%</span>
                  <span className="text-sm" style={{ color: colors.textMuted }}>complete</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: colors.bg }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${overallProgress}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: colors.accent }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-mono uppercase" style={{ color: colors.textMuted }}>Current Phase</p>
                  <p className="font-display text-lg font-bold text-white mt-1">{currentMilestone?.title ?? '—'}</p>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase" style={{ color: colors.textMuted }}>Next Milestone</p>
                  <p className="font-display text-lg font-bold text-white mt-1">{nextMilestone?.title ?? 'Final phase'}</p>
                </div>
              </div>
            </div>

            {/* RECENT ACTIVITY */}
            {recentActivity.length > 0 && (
              <div className="mt-6 rounded-2xl border p-6" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
                <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: colors.accent }}>Recent Activity</span>
                <div className="mt-4 space-y-3">
                  {recentActivity.map((act) => (
                    <div key={act.id} className="flex items-center gap-3 text-sm">
                      <span style={{ color: colors.accent }}>
                        {act.type === 'task' ? '✓' : act.type === 'checkin' ? '●' : act.type === 'milestone' ? '◆' : '↻'}
                      </span>
                      <span style={{ color: colors.text }}>{act.label}</span>
                      <span className="ml-auto text-xs" style={{ color: colors.textMuted }}>
                        {new Date(act.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* STREAK */}
            <div className="rounded-2xl border p-6" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
              <div className="flex items-center gap-3 mb-2">
                <Flame size={24} style={{ color: colors.accent }} />
                <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: colors.accent }}>Streak</span>
              </div>
              <p className="font-display text-4xl font-bold text-white">{streak} <span className="text-lg font-normal" style={{ color: colors.textMuted }}>days</span></p>
              <p className="mt-2 text-sm" style={{ color: colors.textMuted }}>
                {streak > 0 ? personalityMessages.hype[streak % personalityMessages.hype.length] : 'Come back daily to build your streak.'}
              </p>
            </div>

            {/* DAILY CHECK-IN */}
            <div className="rounded-2xl border p-6" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
              <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: colors.accent }}>Today's Check-in</span>
              <p className="mt-2 text-sm" style={{ color: colors.textMuted }}>How are you feeling about your path today?</p>
              <div className="mt-4 grid grid-cols-5 gap-2">
                {moods.map((mood) => {
                  const info = moodLabels[mood]
                  const selected = todayMood === mood
                  return (
                    <button
                      key={mood}
                      onClick={() => handleMoodClick(mood)}
                      className={`flex flex-col items-center gap-1 py-3 rounded-lg border transition-all ${
                        selected ? 'scale-105' : 'hover:scale-105'
                      }`}
                      style={{
                        borderColor: selected ? colors.accent : colors.accent + '20',
                        background: selected ? colors.accent + '20' : 'transparent',
                      }}
                      title={info.label}
                    >
                      <span className="text-lg">{info.emoji}</span>
                      <span className="text-[9px] font-medium" style={{ color: colors.textMuted }}>{info.label}</span>
                    </button>
                  )
                })}
              </div>
              {hasCheckedInToday() && (
                <p className="mt-3 text-xs italic" style={{ color: colors.accentSoft }}>
                  {personalityMessages.dialogue.ready}
                </p>
              )}
            </div>

            {/* GOSSIP NEXT DOOR */}
            <div className="rounded-2xl border p-6" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
              <div className="flex items-center gap-2 mb-3">
                <Eye size={16} style={{ color: colors.accent }} />
                <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: colors.accent }}>Gossip Next Door 👀</span>
              </div>
              <p className="font-display text-lg italic font-light text-white text-pretty">"{gossip.text}"</p>
              <p className="mt-2 text-sm" style={{ color: colors.textMuted }}>{gossip.hook}</p>
            </div>

            {/* TODAY'S DISCOVERY */}
            <div className="rounded-2xl border p-6" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={16} style={{ color: colors.accent }} />
                <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: colors.accent }}>Today's Discovery</span>
              </div>
              <p className="text-pretty" style={{ color: colors.text }}>{todayDiscovery}</p>
            </div>

            {/* DINNER TABLE CONVO */}
            <div className="rounded-2xl border p-6" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
              <div className="flex items-center gap-2 mb-3">
                <Utensils size={16} style={{ color: colors.accent }} />
                <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: colors.accent }}>Dinner Table Convo 🍽️</span>
              </div>
              <p className="text-sm" style={{ color: colors.text }}>How do you explain being a {career.title}?</p>
              <Link to={`/career/${user.careerId}`} className="mt-3 inline-flex items-center gap-1 text-sm font-medium hover:underline" style={{ color: colors.accent }}>
                Get the script <ArrowRight size={14} />
              </Link>
            </div>

            {/* PERSONALIZED MESSAGE */}
            {user.roleModel && (
              <div className="rounded-2xl border p-6" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
                <div className="flex items-center gap-2 mb-3">
                  <Target size={16} style={{ color: colors.accent }} />
                  <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: colors.accent }}>Personalized</span>
                </div>
                <p className="text-pretty italic" style={{ color: colors.accentSoft }}>
                  Still building toward the kind of career {user.roleModel} would recognize.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
