import type { PresentationPreviewProps } from './types'

/**
 * A clickable thumbnail preview of a presentation with overlay effects
 */
export function PresentationPreview({
  src,
  title,
  onClick,
  href,
  className = '',
  aspectRatio = 16 / 9,
  overlayContent,
  showGradient = true,
  label,
  labelIcon,
}: PresentationPreviewProps) {
  const paddingBottom = `${(1 / aspectRatio) * 100}%`

  const content = (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom,
        overflow: 'hidden',
      }}
    >
      {/* Iframe preview - non-interactive */}
      <iframe
        src={src}
        title={title}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          pointerEvents: 'none',
        }}
      />

      {/* Gradient overlay */}
      {showGradient && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%, transparent 100%)',
          }}
        />
      )}

      {/* Label at bottom left */}
      {label && (
        <div
          style={{
            position: 'absolute',
            bottom: '0.5rem',
            left: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.75rem',
          }}
        >
          {labelIcon}
          {label}
        </div>
      )}

      {/* Custom overlay content */}
      {overlayContent && (
        <div style={{ position: 'absolute', inset: 0 }}>
          {overlayContent}
        </div>
      )}
    </div>
  )

  // Wrap in anchor or button based on props
  if (href) {
    return (
      <a
        href={href}
        style={{ display: 'block', textDecoration: 'none' }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    )
  }

  if (onClick) {
    return (
      <button
        onClick={onClick}
        style={{
          display: 'block',
          width: '100%',
          padding: 0,
          border: 'none',
          background: 'none',
          cursor: 'pointer',
        }}
        type="button"
      >
        {content}
      </button>
    )
  }

  return content
}
