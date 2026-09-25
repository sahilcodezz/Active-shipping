export const SplitButton = ({ text, href, onClick, variant = 'default', icon, className = '' }) => {
  const characters = text.split('')

  const content = (
    <>
      <span className="roll-text-wrapper">
        <span className="roll-text-primary">
          {characters.map((char, index) => (
            <span
              key={index}
              className="roll-char"
              style={{ '--char-index': index, '--char-amt': characters.length }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
        <span className="roll-text-copy" aria-hidden="true">
          {characters.map((char, index) => (
            <span
              key={index}
              className="roll-char"
              style={{ '--char-index': index, '--char-amt': characters.length }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      </span>
      {icon && <span className="btn-icon">{icon}</span>}
    </>
  )

  if (href) {
    return (
      <a href={href} className={`seasats-roll-btn ${variant} ${className}`}>
        {content}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={`seasats-roll-btn ${variant} ${className}`}>
      {content}
    </button>
  )
}
