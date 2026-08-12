export type CareerId =
  | 'sommelier'
  | 'oceanographer'
  | 'food-researcher'
  | 'sailor'
  | 'pageant'
  | 'cartographer'

export type TaskStatus = 'locked' | 'active' | 'completed'
export type MilestoneStatus = 'locked' | 'active' | 'completed'

export interface Resource {
  id: string
  type: 'Article' | 'Video' | 'Course' | 'Book' | 'Practice' | 'Documentation'
  title: string
  source: string
  description: string
}

export interface Task {
  id: string
  title: string
  why: string
  time: string
  description: string
  resources: Resource[]
  status: TaskStatus
}

export interface Milestone {
  id: string
  title: string
  description: string
  status: MilestoneStatus
  tasks: Task[]
}

export interface Roadmap {
  careerId: CareerId
  milestones: Milestone[]
}

export interface CareerVibe {
  love: string[]
  hate: string[]
}

export interface Career {
  id: CareerId
  number: string
  title: string
  tagline: string
  shortDescription: string
  longDescription: string
  whatTheyDo: string[]
  aesthetic: string
  reality: string
  vibe: CareerVibe
  entryPath: string[]
  skills: string[]
  microcopy: string[]
  gossip: string
  dinnerTable: {
    normal: string
    parents: string
    dinner: string
    friends: string
  }
  images: {
    hero: string
    detail: string
    gallery: string[]
  }
  colors: {
    name: string
    bg: string
    bgSoft: string
    accent: string
    accentSoft: string
    accentDeep: string
    text: string
    textMuted: string
  }
}

export type CommStyle = 'bestie' | 'mentor' | 'drill-sergeant' | 'softie' | 'chaos'
export type ExperienceLevel = 'beginner' | 'some' | 'advanced'
export type Availability = '<5' | '5-15' | '15+'
export type Mood = 'locked-in' | 'okay' | 'overwhelmed' | 'curious' | 'procrastinating'

export interface UserProfile {
  name: string
  email: string
  careerId: CareerId | null
  experience: ExperienceLevel | null
  availability: Availability | null
  roleModel: string
  commStyle: CommStyle | null
  onboarded: boolean
}

export interface DayCheckIn {
  date: string
  mood: Mood
}

export interface ActivityEntry {
  id: string
  date: string
  type: 'task' | 'milestone' | 'checkin' | 'career-switch'
  label: string
}
