import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp, computeTaskStatus, computeMilestoneStatus } from '../context/AppContext'
import { getCareer } from '../data/careers'
import { roadmaps } from '../data/roadmaps'
import { Check, Lock, Play, ChevronDown, Clock, ArrowRight, BookOpen } from 'lucide-react'
import type { Task, MilestoneStatus } from '../types'

export function RoadmapPage() {
  const { user, roadmapProgress, completeTask, uncompleteTask } = useApp()
  const [expandedMilestone, setExpandedMilestone] = useState<string | null>(null)
  const [expandedTask, setExpandedTask] = useState<string | null>(null)

  if (!user || !user.careerId) {
    return <div className="min-h-screen flex items-center justify-center pt-20"><p className="text-ink-300">Loading...</p></div>
  }

  const career = getCareer(user.careerId)!
  const colors = career.colors
  const roadmap = roadmaps[user.careerId]
  const progress = roadmapProgress[user.careerId]

  // Auto-expand the active milestone
  const activeMilestone = roadmap.milestones.find((m) => computeMilestoneStatus(user.careerId!, m.id, progress) === 'active')
  const openMilestone = expandedMilestone ?? activeMilestone?.id ?? roadmap.milestones[0].id

  const handleMilestoneToggle = (id: string) => {
    setExpandedMilestone(expandedMilestone === id ? null : id)
    setExpandedTask(null)
  }

  const statusIcon = (status: MilestoneStatus) => {
    if (status === 'completed') return <Check size={18} />
    if (status === 'active') return <Play size={16} />
    return <Lock size={16} />
  }

  const statusLabel = (status: MilestoneStatus) => {
    if (status === 'completed') return 'COMPLETED'
    if (status === 'active') return 'ACTIVE'
    return 'LOCKED'
  }

  const handleTaskClick = (milestoneId: string, task: Task) => {
    const status = computeTaskStatus(user.careerId!, milestoneId, task.id, progress)
    if (status === 'locked') return
    if (expandedTask === task.id) {
      setExpandedTask(null)
    } else {
      setExpandedTask(task.id)
    }
  }

  const handleComplete = (milestoneId: string, task: Task) => {
    const status = computeTaskStatus(user.careerId!, milestoneId, task.id, progress)
    if (status === 'completed') {
      uncompleteTask(milestoneId, task.id)
    } else if (status === 'active') {
      completeTask(milestoneId, task.id, task.title)
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-20 lg:pb-12" style={{ backgroundColor: colors.bg }}>
      <div className="max-w-4xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: colors.accent }}>Your Roadmap</span>
          <h1 className="mt-3 font-display text-4xl lg:text-5xl font-bold text-white text-balance">{career.title}</h1>
          <p className="mt-3" style={{ color: colors.textMuted }}>Six phases. Real tasks. Complete them in order.</p>
        </div>

        {/* Milestones */}
        <div className="space-y-3">
          {roadmap.milestones.map((milestone, i) => {
            const status = computeMilestoneStatus(user.careerId!, milestone.id, progress)
            const isOpen = openMilestone === milestone.id
            const completedTasks = milestone.tasks.filter((t) =>
              computeTaskStatus(user.careerId!, milestone.id, t.id, progress) === 'completed'
            ).length
            const milestoneProgress = Math.round((completedTasks / milestone.tasks.length) * 100)

            return (
              <div
                key={milestone.id}
                className="rounded-2xl border overflow-hidden transition-all"
                style={{
                  borderColor: status === 'locked' ? colors.accent + '10' : colors.accent + '25',
                  background: colors.bgSoft + (status === 'locked' ? '40' : '80'),
                  opacity: status === 'locked' ? 0.6 : 1,
                }}
              >
                {/* Milestone header */}
                <button
                  onClick={() => handleMilestoneToggle(milestone.id)}
                  disabled={status === 'locked' && !isOpen}
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <div
                    className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: status === 'completed' ? colors.accent : status === 'active' ? colors.accent + '20' : colors.bg,
                      color: status === 'completed' ? colors.bg : status === 'active' ? colors.accent : colors.textMuted,
                    }}
                  >
                    {statusIcon(status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold" style={{ color: colors.accent }}>PHASE {i + 1}</span>
                      <span className="font-mono text-xs" style={{ color: status === 'completed' ? colors.accent : colors.textMuted }}>
                        {statusLabel(status)}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-white mt-1">{milestone.title}</h3>
                    <p className="text-sm truncate" style={{ color: colors.textMuted }}>{milestone.description}</p>
                  </div>
                  <div className="shrink-0 flex items-center gap-3">
                    {milestoneProgress > 0 && (
                      <span className="text-xs font-mono font-bold" style={{ color: colors.accent }}>{milestoneProgress}%</span>
                    )}
                    <ChevronDown
                      size={20}
                      className="transition-transform"
                      style={{ color: colors.textMuted, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </div>
                </button>

                {/* Milestone body */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-2">
                        {/* Progress bar */}
                        <div className="h-1 rounded-full overflow-hidden mb-4" style={{ background: colors.bg }}>
                          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${milestoneProgress}%`, background: colors.accent }} />
                        </div>

                        {milestone.tasks.map((task) => {
                          const taskStatus = computeTaskStatus(user.careerId!, milestone.id, task.id, progress)
                          const isTaskOpen = expandedTask === task.id
                          return (
                            <div
                              key={task.id}
                              className="rounded-xl border overflow-hidden"
                              style={{ borderColor: colors.accent + '15', background: colors.bg + '60' }}
                            >
                              <button
                                onClick={() => handleTaskClick(milestone.id, task)}
                                disabled={taskStatus === 'locked'}
                                className="w-full flex items-center gap-3 p-4 text-left transition-colors disabled:cursor-not-allowed"
                              >
                                <div
                                  className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs"
                                  style={{
                                    background: taskStatus === 'completed' ? colors.accent : taskStatus === 'active' ? colors.accent + '20' : colors.bg,
                                    color: taskStatus === 'completed' ? colors.bg : taskStatus === 'active' ? colors.accent : colors.textMuted,
                                  }}
                                >
                                  {taskStatus === 'completed' ? <Check size={14} /> : taskStatus === 'locked' ? <Lock size={12} /> : <Play size={12} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={`font-medium ${taskStatus === 'completed' ? 'line-through' : ''}`} style={{ color: taskStatus === 'locked' ? colors.textMuted : colors.text }}>
                                    {task.title}
                                  </p>
                                  <div className="flex items-center gap-3 mt-0.5 text-xs" style={{ color: colors.textMuted }}>
                                    <span className="flex items-center gap-1"><Clock size={12} /> {task.time}</span>
                                    <span className="flex items-center gap-1"><BookOpen size={12} /> {task.resources.length} resources</span>
                                  </div>
                                </div>
                                <ChevronDown
                                  size={16}
                                  className="shrink-0 transition-transform"
                                  style={{ color: colors.textMuted, transform: isTaskOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                />
                              </button>

                              {/* Task detail */}
                              <AnimatePresence>
                                {isTaskOpen && taskStatus !== 'locked' && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="px-4 pb-4 pt-1 space-y-4">
                                      <div>
                                        <p className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: colors.accent }}>Why it matters</p>
                                        <p className="text-sm text-pretty" style={{ color: colors.textMuted }}>{task.why}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs font-mono uppercase tracking-wider mb-1" style={{ color: colors.accent }}>Description</p>
                                        <p className="text-sm text-pretty" style={{ color: colors.text }}>{task.description}</p>
                                      </div>
                                      {task.resources.length > 0 && (
                                        <div>
                                          <p className="text-xs font-mono uppercase tracking-wider mb-2" style={{ color: colors.accent }}>Resources</p>
                                          <div className="space-y-2">
                                            {task.resources.map((res) => (
                                              <div key={res.id} className="flex items-start gap-3 p-3 rounded-lg border" style={{ borderColor: colors.accent + '15' }}>
                                                <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase" style={{ background: colors.accent + '20', color: colors.accent }}>
                                                  {res.type}
                                                </span>
                                                <div className="flex-1 min-w-0">
                                                  <p className="text-sm font-medium" style={{ color: colors.text }}>{res.title}</p>
                                                  <p className="text-xs mt-0.5" style={{ color: colors.textMuted }}>{res.source}</p>
                                                  <p className="text-xs mt-1 text-pretty" style={{ color: colors.textMuted }}>{res.description}</p>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                      <button
                                        onClick={() => handleComplete(milestone.id, task)}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all hover:scale-[1.02] active:scale-95"
                                        style={{
                                          background: taskStatus === 'completed' ? 'transparent' : colors.accent,
                                          color: taskStatus === 'completed' ? colors.textMuted : colors.bg,
                                          border: taskStatus === 'completed' ? `1px solid ${colors.accent}30` : 'none',
                                        }}
                                      >
                                        {taskStatus === 'completed' ? (
                                          <>↩ Mark incomplete</>
                                        ) : (
                                          <><Check size={16} /> Mark complete</>
                                        )}
                                      </button>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
