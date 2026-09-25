import { Sun, Moon } from 'lucide-react'

export const OrbitGlowToggle = ({ theme, onToggle }) => {
  const isDark = theme === 'dark'

  const handleClick = (e) => {
    onToggle(e)
  }

  return (
    <div className="orbit-glow-container" title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}>
      {/* Outer Orbit Track with Revolving Satellite */}
      <div className={`orbit-ring ${isDark ? 'orbit-dark' : 'orbit-light'}`}>
        <div className="orbit-satellite"></div>
      </div>

      {/* Orbit Ambient Glow */}
      <div className={`orbit-glow-halo ${isDark ? 'glow-dark' : 'glow-light'}`}></div>

      {/* Interactive Core Button */}
      <button
        onClick={handleClick}
        className={`orbit-toggle-core ${isDark ? 'core-dark' : 'core-light'}`}
        aria-label={`Toggle theme (currently ${theme})`}
      >
        <div className="orbit-icon-wrapper">
          {isDark ? (
            <Sun size={18} className="orbit-icon sun-icon" />
          ) : (
            <Moon size={18} className="orbit-icon moon-icon" />
          )}
        </div>
      </button>
    </div>
  )
}
