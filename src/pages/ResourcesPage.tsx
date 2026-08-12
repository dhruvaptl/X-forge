import { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { getCareer } from '../data/careers'
import { roadmaps } from '../data/roadmaps'
import { BookOpen, Video, FileText, GraduationCap, PenTool, FileCode, Search } from 'lucide-react'
import type { Resource } from '../types'

const resourceIcons: Record<Resource['type'], React.ReactNode> = {
  Article: <FileText size={16} />,
  Video: <Video size={16} />,
  Course: <GraduationCap size={16} />,
  Book: <BookOpen size={16} />,
  Practice: <PenTool size={16} />,
  Documentation: <FileCode size={16} />,
}

const allTypes: Resource['type'][] = ['Article', 'Video', 'Course', 'Book', 'Practice', 'Documentation']

export function ResourcesPage() {
  const { user } = useApp()
  const [filter, setFilter] = useState<Resource['type'] | 'All'>('All')
  const [search, setSearch] = useState('')

  if (!user || !user.careerId) {
    return <div className="min-h-screen flex items-center justify-center pt-20"><p className="text-ink-300">Loading...</p></div>
  }

  const career = getCareer(user.careerId)!
  const colors = career.colors
  const roadmap = roadmaps[user.careerId]

  // Flatten all resources with milestone context
  const allResources: (Resource & { milestone: string; phase: number })[] = []
  roadmap.milestones.forEach((m, mi) => {
    m.tasks.forEach((t) => {
      t.resources.forEach((r) => {
        allResources.push({ ...r, milestone: m.title, phase: mi + 1 })
      })
    })
  })

  const filtered = allResources.filter((r) => {
    if (filter !== 'All' && r.type !== filter) return false
    if (search && !r.title.toLowerCase().includes(search.toLowerCase()) && !r.source.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

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
          <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: colors.accent }}>Resource Library</span>
          <h1 className="mt-3 font-display text-4xl lg:text-5xl font-bold text-white text-balance">Everything for your path.</h1>
          <p className="mt-3" style={{ color: colors.textMuted }}>{career.title} · {allResources.length} curated resources</p>
        </motion.div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: colors.textMuted }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border text-white placeholder-ink-500 focus:outline-none transition-colors"
            style={{ background: colors.bgSoft, borderColor: colors.accent + '20', color: colors.text }}
          />
        </div>

        {/* Type filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
          <FilterChip label="All" active={filter === 'All'} onClick={() => setFilter('All')} colors={colors} />
          {allTypes.map((t) => (
            <FilterChip key={t} label={t} active={filter === t} onClick={() => setFilter(t)} colors={colors} />
          ))}
        </div>

        {/* Resource list */}
        {filtered.length === 0 ? (
          <p className="text-center py-16" style={{ color: colors.textMuted }}>No resources match your search.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="rounded-2xl border p-5 transition-all hover:scale-[1.01]"
                style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: colors.accent + '20', color: colors.accent }}
                  >
                    {resourceIcons[r.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider" style={{ color: colors.accent }}>{r.type}</span>
                    <h3 className="font-display text-lg font-bold text-white mt-1">{r.title}</h3>
                    <p className="text-sm mt-1" style={{ color: colors.textMuted }}>{r.source}</p>
                    <p className="text-sm mt-2 text-pretty" style={{ color: colors.textMuted }}>{r.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-mono"
                        style={{ background: colors.bg, color: colors.textMuted }}
                      >
                        Phase {r.phase} · {r.milestone}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function FilterChip({ label, active, onClick, colors }: { label: string; active: boolean; onClick: () => void; colors: { accent: string; text: string; textMuted: string; bgSoft: string; bg: string } }) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all"
      style={{
        background: active ? colors.accent : colors.bgSoft,
        color: active ? colors.bg : colors.text,
        border: `1px solid ${colors.accent}30`,
      }}
    >
      {label}
    </button>
  )
}
