import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { getCareer, careers } from '../data/careers'
import type { ExperienceLevel, Availability, CommStyle, CareerId } from '../types'
import { User, Edit2, RefreshCw, LogOut, Check, X, ArrowRight } from 'lucide-react'

const experienceLabels: Record<ExperienceLevel, string> = {
  beginner: 'Beginner',
  some: 'Some experience',
  advanced: 'Advanced',
}

const availabilityLabels: Record<Availability, string> = {
  '<5': 'Less than 5 hours/week',
  '5-15': '5–15 hours/week',
  '15+': '15+ hours/week',
}

const commStyleLabels: Record<CommStyle, string> = {
  bestie: 'Bestie',
  mentor: 'Mentor',
  'drill-sergeant': 'Drill Sergeant',
  softie: 'Softie',
  chaos: 'Chaos Mode',
}

export function ProfilePage() {
  const { user, updateProfile, switchCareer, resetRoadmap, logOut, getOverallProgress } = useApp()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [showSwitchConfirm, setShowSwitchConfirm] = useState<CareerId | null>(null)
  const [editName, setEditName] = useState(user?.name ?? '')
  const [editEmail, setEditEmail] = useState(user?.email ?? '')
  const [editRoleModel, setEditRoleModel] = useState(user?.roleModel ?? '')

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center pt-20"><p className="text-ink-300">Loading...</p></div>
  }

  const career = getCareer(user.careerId)
  const colors = career?.colors ?? { bg: '#080807', bgSoft: '#1c1c19', accent: '#d4a574', accentSoft: '#e8d5b8', text: '#e9e8e3', textMuted: '#7a786e' }
  const overallProgress = getOverallProgress()

  const handleSave = () => {
    updateProfile({ name: editName.trim() || user.name, email: editEmail.trim() || user.email, roleModel: editRoleModel })
    setEditing(false)
  }

  const handleSwitchCareer = (id: CareerId) => {
    switchCareer(id)
    setShowSwitchConfirm(null)
    navigate('/dashboard')
  }

  const handleReset = () => {
    resetRoadmap()
    setShowResetConfirm(false)
    navigate('/path')
  }

  const handleLogOut = () => {
    logOut()
    navigate('/')
  }

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
          <span className="font-mono text-xs font-bold uppercase tracking-widest" style={{ color: colors.accent }}>Profile</span>
          <h1 className="mt-3 font-display text-4xl lg:text-5xl font-bold text-white text-balance">Your account.</h1>
        </motion.div>

        {/* Profile card */}
        <div className="rounded-2xl border p-6 lg:p-8 mb-6" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center font-display text-xl font-bold"
                style={{ background: colors.accent + '20', color: colors.accent }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-white">{user.name}</h2>
                <p className="text-sm" style={{ color: colors.textMuted }}>{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => setEditing(!editing)}
              className="p-2.5 rounded-lg border transition-all hover:scale-105"
              style={{ borderColor: colors.accent + '20', color: colors.accent }}
            >
              {editing ? <X size={18} /> : <Edit2 size={18} />}
            </button>
          </div>

          {editing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: colors.text }}>Name</label>
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-white focus:outline-none transition-colors"
                  style={{ background: colors.bg, borderColor: colors.accent + '20', color: colors.text }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: colors.text }}>Email</label>
                <input
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-white focus:outline-none transition-colors"
                  style={{ background: colors.bg, borderColor: colors.accent + '20', color: colors.text }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: colors.text }}>Role Model (optional)</label>
                <input
                  value={editRoleModel}
                  onChange={(e) => setEditRoleModel(e.target.value)}
                  placeholder="Who inspires you?"
                  className="w-full px-4 py-3 rounded-xl border text-white placeholder-ink-500 focus:outline-none transition-colors"
                  style={{ background: colors.bg, borderColor: colors.accent + '20', color: colors.text }}
                />
              </div>
              <button
                onClick={handleSave}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02]"
                style={{ background: colors.accent, color: colors.bg }}
              >
                <Check size={16} /> Save changes
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <InfoRow label="Current Career" value={career?.title ?? 'None'} colors={colors} />
              <InfoRow label="Experience" value={user.experience ? experienceLabels[user.experience] : 'Not set'} colors={colors} />
              <InfoRow label="Weekly Availability" value={user.availability ? availabilityLabels[user.availability] : 'Not set'} colors={colors} />
              <InfoRow label="Role Model" value={user.roleModel || 'Not set'} colors={colors} />
              <InfoRow label="Communication Style" value={user.commStyle ? commStyleLabels[user.commStyle] : 'Not set'} colors={colors} />
              <InfoRow label="Overall Progress" value={`${overallProgress}%`} colors={colors} />
            </div>
          )}
        </div>

        {/* Switch career */}
        <div className="rounded-2xl border p-6 mb-6" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
          <div className="flex items-center gap-2 mb-4">
            <RefreshCw size={18} style={{ color: colors.accent }} />
            <h3 className="font-display text-lg font-bold text-white">Switch Career</h3>
          </div>
          <p className="text-sm mb-4" style={{ color: colors.textMuted }}>Your current progress stays saved per career. You can switch back anytime.</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {careers.filter((c) => c.id !== user.careerId).map((c) => (
              <button
                key={c.id}
                onClick={() => setShowSwitchConfirm(c.id)}
                className="group flex items-center gap-3 p-3 rounded-xl border transition-all hover:scale-[1.02] text-left"
                style={{ borderColor: colors.accent + '15', background: colors.bg }}
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                  <img src={c.images.gallery[0]} alt={c.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white">{c.title}</p>
                  <p className="text-xs truncate" style={{ color: colors.textMuted }}>{c.tagline}</p>
                </div>
                <ArrowRight size={16} className="shrink-0 group-hover:translate-x-0.5 transition-transform" style={{ color: colors.accent }} />
              </button>
            ))}
          </div>
        </div>

        {/* Reset roadmap */}
        <div className="rounded-2xl border p-6 mb-6" style={{ borderColor: colors.accent + '20', background: colors.bgSoft }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-bold text-white">Reset Roadmap</h3>
              <p className="text-sm mt-1" style={{ color: colors.textMuted }}>Clear all progress for {career?.title}. This cannot be undone.</p>
            </div>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="shrink-0 px-4 py-2.5 rounded-xl border font-semibold text-sm transition-all hover:scale-105"
              style={{ borderColor: '#ef444440', color: '#ef4444', background: '#ef444410' }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Log out */}
        <button
          onClick={handleLogOut}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border font-medium transition-all hover:scale-[1.01]"
          style={{ borderColor: colors.accent + '20', color: colors.textMuted, background: colors.bgSoft }}
        >
          <LogOut size={18} /> Log Out
        </button>
      </div>

      {/* Reset confirmation modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="rounded-2xl border p-6 max-w-sm w-full" style={{ borderColor: colors.accent + '30', background: colors.bg }}>
            <h3 className="font-display text-xl font-bold text-white">Reset roadmap?</h3>
            <p className="mt-3 text-sm" style={{ color: colors.textMuted }}>
              This will permanently clear all your progress for {career?.title}. You will start from phase 1. This cannot be undone.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-3 rounded-xl border font-medium text-sm transition-all"
                style={{ borderColor: colors.accent + '20', color: colors.text }}
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all"
                style={{ background: '#ef4444', color: '#fff' }}
              >
                Yes, reset it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Switch career confirmation modal */}
      {showSwitchConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="rounded-2xl border p-6 max-w-sm w-full" style={{ borderColor: colors.accent + '30', background: colors.bg }}>
            <h3 className="font-display text-xl font-bold text-white">Switch career?</h3>
            <p className="mt-3 text-sm" style={{ color: colors.textMuted }}>
              You will switch to {getCareer(showSwitchConfirm)?.title}. Your {career?.title} progress is saved and you can switch back anytime.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowSwitchConfirm(null)}
                className="flex-1 py-3 rounded-xl border font-medium text-sm transition-all"
                style={{ borderColor: colors.accent + '20', color: colors.text }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleSwitchCareer(showSwitchConfirm)}
                className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all"
                style={{ background: colors.accent, color: colors.bg }}
              >
                Switch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function InfoRow({ label, value, colors }: { label: string; value: string; colors: { accent: string; text: string; textMuted: string } }) {
  return (
    <div className="flex items-center justify-between py-2 border-b" style={{ borderColor: colors.accent + '10' }}>
      <span className="text-sm" style={{ color: colors.textMuted }}>{label}</span>
      <span className="text-sm font-medium" style={{ color: colors.text }}>{value}</span>
    </div>
  )
}
