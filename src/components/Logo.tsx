interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showWordmark?: boolean
  className?: string
}

export function Logo({ size = 'md', showWordmark = true, className = '' }: LogoProps) {
  const sizes = {
    sm: { mark: 28, font: 'text-lg' },
    md: { mark: 36, font: 'text-xl' },
    lg: { mark: 52, font: 'text-3xl' },
    xl: { mark: 80, font: 'text-5xl' },
  }
  const s = sizes[size]

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={s.mark}
        height={s.mark}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* The X mark: two crossed forge-sparks forming an X, with a center node */}
        <g>
          {/* Left beam */}
          <path
            d="M20 20 L48 50 L20 80"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Right beam */}
          <path
            d="M80 20 L52 50 L80 80"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Center forge spark */}
          <circle cx="50" cy="50" r="6" fill="currentColor" />
          {/* Small accent sparks */}
          <circle cx="50" cy="14" r="3" fill="currentColor" opacity="0.5" />
          <circle cx="50" cy="86" r="3" fill="currentColor" opacity="0.5" />
        </g>
      </svg>
      {showWordmark && (
        <span className={`font-display font-bold tracking-tight ${s.font} leading-none`}>
          X<span className="font-light">-</span>FORGE
        </span>
      )}
    </div>
  )
}
