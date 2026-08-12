import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Logo } from './Logo'
import { useApp } from '../context/AppContext'
import { Menu, X, User, LogOut, Compass, Sparkles, BarChart3, Route, BookOpen } from 'lucide-react'

const navLinks = [
  { to: '/explore', label: 'Explore' },
  { to: '/path', label: 'My Path' },
  { to: '/today', label: "Today's Move" },
  { to: '/progress', label: 'Progress' },
  { to: '/resources', label: 'Resources' },
]

export function Navbar() {
  const { user, logOut } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    handler()
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const isLanding = location.pathname === '/'
  const isActive = (path: string) => location.pathname === path

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isLanding
            ? 'bg-ink-950/85 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-ink-50 hover:text-white transition-colors">
            <Logo size="sm" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  isActive(link.to)
                    ? 'text-white bg-white/10'
                    : 'text-ink-200 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive('/profile')
                      ? 'text-white bg-white/10'
                      : 'text-ink-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <User size={16} />
                  {user.name}
                </Link>
                <button
                  onClick={() => { logOut(); navigate('/') }}
                  className="p-2 text-ink-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  title="Log out"
                >
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-ink-200 hover:text-white transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 text-sm font-semibold bg-white text-ink-950 rounded-lg hover:bg-ink-100 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-ink-100"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-ink-950/95 backdrop-blur-xl pt-16 animate-fade-in">
          <div className="flex flex-col p-6 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-5 py-4 text-lg font-medium rounded-xl transition-all ${
                  isActive(link.to)
                    ? 'text-white bg-white/10'
                    : 'text-ink-200 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-2" />
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="px-5 py-4 text-lg font-medium text-ink-200 hover:text-white hover:bg-white/5 rounded-xl transition-all flex items-center gap-3"
                >
                  <User size={20} /> {user.name}
                </Link>
                <button
                  onClick={() => { logOut(); navigate('/') }}
                  className="px-5 py-4 text-lg font-medium text-ink-300 hover:text-white hover:bg-white/5 rounded-xl transition-all flex items-center gap-3 text-left"
                >
                  <LogOut size={20} /> Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-4 text-lg font-medium text-ink-200 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-4 text-lg font-semibold bg-white text-ink-950 rounded-xl text-center"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Mobile bottom bar — intentionally designed for mobile */}
      {user && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-ink-950/90 backdrop-blur-xl border-t border-white/10">
          <div className="flex items-center justify-around h-14">
            {navLinks.map((link) => {
              const Icon = link.to === '/explore' ? Compass
                : link.to === '/today' ? Sparkles
                : link.to === '/progress' ? BarChart3
                : link.to === '/path' ? Route
                : BookOpen
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors ${
                    isActive(link.to) ? 'text-white' : 'text-ink-400'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-[10px] font-medium">{link.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
