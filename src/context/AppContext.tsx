import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type {
  UserProfile,
  CareerId,
  ExperienceLevel,
  Availability,
  CommStyle,
  ActivityEntry,
  DayCheckIn,
  Mood,
  TaskStatus,
  MilestoneStatus,
} from '../types'
import { roadmaps } from '../data/roadmaps'

interface RoadmapProgress {
  // key: `${milestoneId}-${taskId}` -> true if completed
  completedTasks: Record<string, boolean>
  // key: milestoneId -> status override
  milestoneStatuses: Record<string, MilestoneStatus>
}

interface AppState {
  user: UserProfile | null
  roadmapProgress: Record<CareerId, RoadmapProgress>
  checkIns: DayCheckIn[]
  activity: ActivityEntry[]
  // auth
  signUp: (name: string, email: string) => void
  logIn: (email: string) => void
  logOut: () => void
  // onboarding
  setOnboardingData: (data: Partial<UserProfile>) => void
  completeOnboarding: () => void
  // career
  switchCareer: (careerId: CareerId) => void
  // tasks
  completeTask: (milestoneId: string, taskId: string, taskTitle: string) => void
  uncompleteTask: (milestoneId: string, taskId: string) => void
  // profile
  updateProfile: (data: Partial<UserProfile>) => void
  resetRoadmap: () => void
  // daily
  checkIn: (mood: Mood) => void
  hasCheckedInToday: () => boolean
  todayCheckIn: () => DayCheckIn | null
  // streak
  getStreak: () => number
  // derived
  getOverallProgress: () => number
  getCompletedTaskCount: () => number
  getCompletedMilestoneCount: () => number
  getTodayDiscovery: () => string
}

const AppContext = createContext<AppState | null>(null)

const STORAGE_KEY = 'xforge_state_v1'

interface PersistShape {
  user: UserProfile | null
  roadmapProgress: Record<string, RoadmapProgress>
  checkIns: DayCheckIn[]
  activity: ActivityEntry[]
}

function loadState(): PersistShape {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as PersistShape
  } catch { /* ignore */ }
  return { user: null, roadmapProgress: {}, checkIns: [], activity: [] }
}

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function computeTaskStatus(
  careerId: CareerId,
  milestoneId: string,
  taskId: string,
  progress: RoadmapProgress | undefined,
): TaskStatus {
  if (!progress) {
    // first task of first milestone is active by default
    const roadmap = roadmaps[careerId]
    const firstMilestone = roadmap.milestones[0]
    if (milestoneId === firstMilestone.id && taskId === firstMilestone.tasks[0].id) return 'active'
    return 'locked'
  }
  const key = `${milestoneId}-${taskId}`
  if (progress.completedTasks[key]) return 'completed'

  const roadmap = roadmaps[careerId]
  const milestone = roadmap.milestones.find((m) => m.id === milestoneId)
  if (!milestone) return 'locked'

  // Check if all prior tasks in this milestone are completed
  const taskIndex = milestone.tasks.findIndex((t) => t.id === taskId)
  if (taskIndex === 0) {
    // first task — active if milestone is active or completed
    const msStatus = progress.milestoneStatuses[milestoneId]
    if (msStatus === 'completed') return 'completed'
    return 'active'
  }
  const prevTask = milestone.tasks[taskIndex - 1]
  const prevKey = `${milestoneId}-${prevTask.id}`
  if (progress.completedTasks[prevKey]) return 'active'
  return 'locked'
}

function computeMilestoneStatus(
  careerId: CareerId,
  milestoneId: string,
  progress: RoadmapProgress | undefined,
): MilestoneStatus {
  if (progress?.milestoneStatuses[milestoneId]) {
    return progress.milestoneStatuses[milestoneId]
  }
  const roadmap = roadmaps[careerId]
  const milestoneIndex = roadmap.milestones.findIndex((m) => m.id === milestoneId)
  if (milestoneIndex === 0) return 'active'

  // Check if previous milestone is completed
  const prevMilestone = roadmap.milestones[milestoneIndex - 1]
  const prevKey = `${prevMilestone.id}-${prevMilestone.tasks[prevMilestone.tasks.length - 1].id}`
  if (progress?.completedTasks[prevKey]) {
    // check if all tasks in current milestone are also done
    const currentMilestone = roadmap.milestones[milestoneIndex]
    const allDone = currentMilestone.tasks.every((t) => progress.completedTasks[`${milestoneId}-${t.id}`])
    if (allDone) return 'completed'
    return 'active'
  }
  return 'locked'
}

function recomputeMilestoneStatuses(careerId: CareerId, progress: RoadmapProgress): RoadmapProgress {
  const roadmap = roadmaps[careerId]
  const newStatuses: Record<string, MilestoneStatus> = {}
  for (const milestone of roadmap.milestones) {
    const allTasksDone = milestone.tasks.every((t) => progress.completedTasks[`${milestone.id}-${t.id}`])
    if (allTasksDone) {
      newStatuses[milestone.id] = 'completed'
    } else {
      // active if any task is completed or it is the first non-completed milestone
      const anyDone = milestone.tasks.some((t) => progress.completedTasks[`${milestone.id}-${t.id}`])
      if (anyDone) {
        newStatuses[milestone.id] = 'active'
      }
    }
  }
  // find the first milestone with no completed tasks -> mark active if previous is completed
  let prevCompleted = true
  for (const milestone of roadmap.milestones) {
    if (newStatuses[milestone.id] === 'completed') {
      prevCompleted = true
      continue
    }
    if (prevCompleted && !newStatuses[milestone.id]) {
      newStatuses[milestone.id] = 'active'
      prevCompleted = false
    } else if (!newStatuses[milestone.id]) {
      newStatuses[milestone.id] = 'locked'
      prevCompleted = false
    }
  }
  return { ...progress, milestoneStatuses: newStatuses }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistShape>(loadState)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch { /* ignore */ }
  }, [state])

  const ensureProgress = (careerId: CareerId): RoadmapProgress => {
    const existing = state.roadmapProgress[careerId]
    if (existing) return existing
    return { completedTasks: {}, milestoneStatuses: {} }
  }

  const addActivity = (type: ActivityEntry['type'], label: string): ActivityEntry => ({
    id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    date: new Date().toISOString(),
    type,
    label,
  })

  const signUp = (name: string, email: string) => {
    const user: UserProfile = {
      name, email,
      careerId: null, experience: null, availability: null,
      roleModel: '', commStyle: null, onboarded: false,
    }
    setState((s) => ({ ...s, user }))
  }

  const logIn = (email: string) => {
    setState((s) => {
      if (s.user && s.user.email === email) return s
      const name = email.split('@')[0]?.replace(/[._]/g, ' ') || 'Friend'
      const capitalized = name.split(' ').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      return {
        ...s,
        user: {
          name: capitalized, email,
          careerId: null, experience: null, availability: null,
          roleModel: '', commStyle: null, onboarded: false,
        },
      }
    })
  }

  const logOut = () => {
    setState({ user: null, roadmapProgress: {}, checkIns: [], activity: [] })
  }

  const setOnboardingData = (data: Partial<UserProfile>) => {
    setState((s) => ({
      ...s,
      user: s.user ? { ...s.user, ...data } : null,
    }))
  }

  const completeOnboarding = () => {
    setState((s) => ({
      ...s,
      user: s.user ? { ...s.user, onboarded: true } : null,
    }))
  }

  const switchCareer = (careerId: CareerId) => {
    setState((s) => {
      if (!s.user) return s
      const newActivity = addActivity('career-switch', `Switched to ${careerId}`)
      return {
        ...s,
        user: { ...s.user, careerId },
        activity: [newActivity, ...s.activity].slice(0, 50),
      }
    })
  }

  const completeTask = (milestoneId: string, taskId: string, taskTitle: string) => {
    setState((s) => {
      if (!s.user?.careerId) return s
      const careerId = s.user.careerId
      const progress = ensureProgress(careerId)
      const key = `${milestoneId}-${taskId}`
      const newProgress: RoadmapProgress = {
        ...progress,
        completedTasks: { ...progress.completedTasks, [key]: true },
      }
      const recomputed = recomputeMilestoneStatuses(careerId, newProgress)
      const newActivity = addActivity('task', `Completed: ${taskTitle}`)
      return {
        ...s,
        roadmapProgress: { ...s.roadmapProgress, [careerId]: recomputed },
        activity: [newActivity, ...s.activity].slice(0, 50),
      }
    })
  }

  const uncompleteTask = (milestoneId: string, taskId: string) => {
    setState((s) => {
      if (!s.user?.careerId) return s
      const careerId = s.user.careerId
      const progress = ensureProgress(careerId)
      const key = `${milestoneId}-${taskId}`
      const newCompleted = { ...progress.completedTasks }
      delete newCompleted[key]
      const newProgress: RoadmapProgress = {
        ...progress,
        completedTasks: newCompleted,
      }
      const recomputed = recomputeMilestoneStatuses(careerId, newProgress)
      return {
        ...s,
        roadmapProgress: { ...s.roadmapProgress, [careerId]: recomputed },
      }
    })
  }

  const updateProfile = (data: Partial<UserProfile>) => {
    setState((s) => ({
      ...s,
      user: s.user ? { ...s.user, ...data } : null,
    }))
  }

  const resetRoadmap = () => {
    setState((s) => {
      if (!s.user?.careerId) return s
      const careerId = s.user.careerId
      const newProgress = { ...s.roadmapProgress }
      delete newProgress[careerId]
      return { ...s, roadmapProgress: newProgress }
    })
  }

  const checkIn = (mood: Mood) => {
    setState((s) => {
      const today = todayStr()
      const existing = s.checkIns.find((c) => c.date === today)
      if (existing) {
        return {
          ...s,
          checkIns: s.checkIns.map((c) => (c.date === today ? { ...c, mood } : c)),
        }
      }
      const newActivity = addActivity('checkin', `Checked in: ${mood}`)
      return {
        ...s,
        checkIns: [...s.checkIns, { date: today, mood }].slice(-60),
        activity: [newActivity, ...s.activity].slice(0, 50),
      }
    })
  }

  const hasCheckedInToday = () => {
    return state.checkIns.some((c) => c.date === todayStr())
  }

  const todayCheckIn = () => {
    return state.checkIns.find((c) => c.date === todayStr()) ?? null
  }

  const getStreak = () => {
    if (state.checkIns.length === 0) return 0
    const dates = state.checkIns.map((c) => c.date).sort()
    let streak = 1
    for (let i = dates.length - 1; i > 0; i--) {
      const curr = new Date(dates[i])
      const prev = new Date(dates[i - 1])
      const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)
      if (diff === 1) streak++
      else break
    }
    // Check if last check-in is today or yesterday
    const lastDate = dates[dates.length - 1]
    const last = new Date(lastDate)
    const today = new Date(todayStr())
    const diffToToday = (today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
    if (diffToToday > 1) return 0
    return streak
  }

  const getOverallProgress = () => {
    if (!state.user?.careerId) return 0
    const careerId = state.user.careerId
    const progress = state.roadmapProgress[careerId]
    const roadmap = roadmaps[careerId]
    const totalTasks = roadmap.milestones.reduce((sum, m) => sum + m.tasks.length, 0)
    if (totalTasks === 0) return 0
    const completed = progress ? Object.values(progress.completedTasks).filter(Boolean).length : 0
    return Math.round((completed / totalTasks) * 100)
  }

  const getCompletedTaskCount = () => {
    if (!state.user?.careerId) return 0
    const progress = state.roadmapProgress[state.user.careerId]
    if (!progress) return 0
    return Object.values(progress.completedTasks).filter(Boolean).length
  }

  const getCompletedMilestoneCount = () => {
    if (!state.user?.careerId) return 0
    const progress = state.roadmapProgress[state.user.careerId]
    if (!progress) return 0
    return Object.values(progress.milestoneStatuses).filter((s) => s === 'completed').length
  }

  const getTodayDiscovery = () => {
    if (!state.user?.careerId) return ''
    // import dailyDiscoveries lazily
    return '' // handled in component
  }

  const value: AppState = {
    user: state.user,
    roadmapProgress: state.roadmapProgress,
    checkIns: state.checkIns,
    activity: state.activity,
    signUp, logIn, logOut,
    setOnboardingData, completeOnboarding,
    switchCareer,
    completeTask, uncompleteTask,
    updateProfile, resetRoadmap,
    checkIn, hasCheckedInToday, todayCheckIn,
    getStreak,
    getOverallProgress, getCompletedTaskCount, getCompletedMilestoneCount,
    getTodayDiscovery,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

export { computeTaskStatus, computeMilestoneStatus }
