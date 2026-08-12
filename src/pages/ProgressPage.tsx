import { useApp } from '../context/AppContext'
import { getCareer } from '../data/careers'
import { roadmaps } from '../data/roadmaps'
import { computeTaskStatus, computeMilestoneStatus } from '../context/AppContext'
import { motion } from 'framer-motion'
import { Flame, Target, TrendingUp, CheckCircle2, Circle, Activity } from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar,
} from 'recharts'

export function ProgressPage() {
  const { user, roadmapProgress, checkIns, activity, getStreak, getOverallProgress, getCompletedTaskCount, getCompletedMilestoneCount } = useApp()

  if (!user || !user.careerId) {
    return <div className="min-h-screen flex items-center justify-center pt-20"><p className="text-ink-300">Loading...</p></div>
  }

  const career = getCareer(user.careerId)!
  const colors = career.colors
  const roadmap = roadmaps[user.careerId]
  const progress = roadmapProgress[user.careerId]
  const streak = getStreak()
  const overallProgress = getOverallProgress()
  const completedTasks = getCompletedTaskCount()
  const completedMilestones = getCompletedMilestoneCount()

  // Weekly activity data (last 7 days)
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const dateStr = d.toISOString().slice(0, 10)
    const dayActivity = activity.filter((a) => a.date.slice(0, 10) === dateStr)
    const tasks = dayActivity.filter((a) => a.type === 'task').length
    const dayLabel = d.toLocaleDateString(undefined, { weekday: 'short' })
    return { day: dayLabel, tasks, date: dateStr }
  })

  const maxWeekly = Math.max(...last7.map((d) => d.tasks), 1)

  // Milestone progress data
  const milestoneData = roadmap.milestones.map((m, i) => {
    const completed = m.tasks.filter((t) => computeTaskStatus(user.careerId!, m.id, t.id, progress) === 'completed').length
    const pct = Math.round((completed / m.tasks.length) * 100)
    return { name: m.title, phase: i + 1, completed, total: m.tasks.length, pct, status: computeMilestoneStatus(user.careerId!, m.id, progress) }
  })

  const recentActivity = activity.slice(0, 10)

  return (
    <div className="min-h-screen pt-20 pb-20 lg:pb-12" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-5xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: colors.accent }}>Progress</span>
          <h1 className="mt-3 font-display text-4xl lg:text-5xl font-bold text-white text-balance">Your journey so far.</h1>
          <p className="mt-3" style={{ color: colors.textMuted }}>{career.title} · {completedTasks} tasks completed · {completedMilestones} phases done</p>
        </motion.div>

        {/* Top stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Overall Progress" value={`${overallProgress}%`} icon={<Target size={18} />} colors={colors} />
          <StatCard label="Tasks Done" value={String(completedTasks)} icon={<CheckCircle2 size={18} />} colors={colors} />
          <StatCard label="Phases Done" value={`${completedMilestones}/${roadmap.milestones.length}`} icon={<TrendingUp size={18} />} colors={colors} />
          <StatCard label="Streak" value={`${streak} days`} icon={<Flame size={18} />} colors={colors} />
        </div>

        {/* Charts row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly activity chart */}
          <div className="rounded-2xl border p-6" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
            <div className="flex items-center gap-2 mb-4">
              <Activity size={18} style={{ color: colors.accent }} />
              <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: colors.accent }}>Weekly Activity</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={last7}>
                <defs>
                  <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={colors.accent} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={colors.accent} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="day"
                  tick={{ fill: colors.textMuted, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: colors.textMuted, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                  domain={[0, maxWeekly]}
                />
                <Tooltip
                  contentStyle={{
                    background: colors.bg,
                    border: `1px solid ${colors.accent}30`,
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: colors.text,
                  }}
                  labelStyle={{ color: colors.text }}
                />
                <Area
                  type="monotone"
                  dataKey="tasks"
                  stroke={colors.accent}
                  strokeWidth={2}
                  fill="url(#activityGradient)"
                  dot={{ fill: colors.accent, r: 3 }}
                  name="Tasks completed"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Overall radial */}
          <div className="rounded-2xl border p-6" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
            <div className="flex items-center gap-2 mb-4">
              <Target size={18} style={{ color: colors.accent }} />
              <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: colors.accent }}>Overall Completion</span>
            </div>
            <div className="relative">
              <ResponsiveContainer width="100%" height={200}>
                <RadialBarChart
                  innerRadius="70%"
                  outerRadius="100%"
                  data={[{ value: overallProgress, fill: colors.accent }]}
                  startAngle={90}
                  endAngle={90 - (360 * overallProgress) / 100}
                >
                  <RadialBar background={{ fill: colors.bg }} dataKey="value" cornerRadius={10} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="font-display text-4xl font-bold text-white">{overallProgress}%</span>
                <span className="text-xs" style={{ color: colors.textMuted }}>complete</span>
              </div>
            </div>
          </div>
        </div>

        {/* Phase progress */}
        <div className="rounded-2xl border p-6 mb-8" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
          <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: colors.accent }}>Phase Progress</span>
          <div className="mt-6 space-y-4">
            {milestoneData.map((m) => (
              <div key={m.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {m.status === 'completed' ? (
                      <CheckCircle2 size={16} style={{ color: colors.accent }} />
                    ) : m.status === 'active' ? (
                      <Circle size={16} style={{ color: colors.accent, fill: colors.accent + '40' }} />
                    ) : (
                      <Circle size={16} style={{ color: colors.textMuted }} />
                    )}
                    <span className="text-sm font-medium" style={{ color: m.status === 'locked' ? colors.textMuted : colors.text }}>
                      Phase {m.phase}: {m.name}
                    </span>
                  </div>
                  <span className="text-xs font-mono" style={{ color: colors.accent }}>
                    {m.completed}/{m.total}
                  </span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: colors.bg }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${m.pct}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full rounded-full"
                    style={{ background: m.status === 'locked' ? colors.textMuted + '40' : colors.accent }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="rounded-2xl border p-6" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
          <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: colors.accent }}>Recent Activity</span>
          {recentActivity.length === 0 ? (
            <p className="mt-4 text-sm" style={{ color: colors.textMuted }}>No activity yet. Complete your first task to get started.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {recentActivity.map((act) => (
                <div key={act.id} className="flex items-center gap-3 text-sm">
                  <span className="w-6 text-center" style={{ color: colors.accent }}>
                    {act.type === 'task' ? '✓' : act.type === 'checkin' ? '●' : act.type === 'milestone' ? '◆' : '↻'}
                  </span>
                  <span style={{ color: colors.text }}>{act.label}</span>
                  <span className="ml-auto text-xs" style={{ color: colors.textMuted }}>
                    {new Date(act.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, icon, colors }: { label: string; value: string; icon: React.ReactNode; colors: { accent: string; text: string; textMuted: string; bgSoft: string } }) {
  return (
    <div className="rounded-2xl border p-5" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
      <div className="flex items-center gap-2 mb-2" style={{ color: colors.accent }}>
        {icon}
      </div>
      <p className="font-display text-2xl font-bold text-white">{value}</p>
      <p className="text-xs mt-1" style={{ color: colors.textMuted }}>{label}</p>
    </div>
  )
}
