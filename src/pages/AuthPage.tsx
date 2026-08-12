import { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Logo } from '../components/Logo'
import { ArrowRight } from 'lucide-react'

interface AuthPageProps {
  mode: 'login' | 'signup'
}

export function AuthPage({ mode }: AuthPageProps) {
  const { signUp, logIn } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const preselectedCareer = (location.state as { preselectedCareer?: string } | null)?.preselectedCareer

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email.trim()) {
      setError('Email is required.')
      return
    }
    if (mode === 'signup' && !name.trim()) {
      setError('Name is required.')
      return
    }
    if (mode === 'signup') {
      signUp(name.trim(), email.trim())
      navigate('/onboarding', { state: { preselectedCareer } })
    } else {
      logIn(email.trim())
      navigate('/onboarding')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5 pt-20 pb-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block text-ink-50"><Logo size="lg" /></Link>
        </div>

        <div className="rounded-2xl border border-white/10 bg-ink-900/60 backdrop-blur-xl p-8">
          <h1 className="font-display text-2xl font-bold text-white text-center">
            {mode === 'signup' ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="mt-2 text-center text-ink-400 text-sm">
            {mode === 'signup'
              ? 'Start forging your path in under a minute.'
              : 'Log in to continue your journey.'}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-ink-200 mb-1.5">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 bg-ink-950 border border-white/10 rounded-xl text-white placeholder-ink-500 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-ink-200 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-ink-950 border border-white/10 rounded-xl text-white placeholder-ink-500 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink-200 mb-1.5">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-ink-950 border border-white/10 rounded-xl text-white placeholder-ink-500 focus:outline-none focus:border-white/30 transition-colors"
              />
              <p className="mt-1.5 text-xs text-ink-500">Demo mode — password is not stored.</p>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              className="w-full py-3.5 bg-white text-ink-950 font-semibold rounded-xl hover:bg-ink-100 transition-colors flex items-center justify-center gap-2 group"
            >
              {mode === 'signup' ? 'Create account' : 'Log in'}
              <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-400">
            {mode === 'signup' ? (
              <>Already have an account? <Link to="/login" className="text-white font-medium underline">Log in</Link></>
            ) : (
              <>New here? <Link to="/signup" className="text-white font-medium underline">Create an account</Link></>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
