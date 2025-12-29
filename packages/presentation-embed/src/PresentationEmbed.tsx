import type { PresentationEmbedProps } from './types'

/**
 * Embeds a presentation (Marp, Reveal.js, Google Slides, etc.) in an iframe
 */
export function PresentationEmbed({
  src,
  title,
  height = 'auto',
  minHeight = '500px',
  className = '',
  style,
  borderRadius = '0.75rem',
  border = '1px solid rgba(255, 255, 255, 0.1)',
  backgroundColor = '#ffffff',
  allowFullscreen = true,
}: PresentationEmbedProps) {
  const computedHeight = height === 'auto'
    ? 'calc(100vh - 300px)'
    : typeof height === 'number'
      ? `${height}px`
      : height

  const computedMinHeight = typeof minHeight === 'number'
    ? `${minHeight}px`
    : minHeight

  return (
    <div
      className={className}
      style={{
        borderRadius,
        border,
        backgroundColor,
        overflow: 'hidden',
        ...style,
      }}
    >
      <iframe
        src={src}
        title={title}
        style={{
          width: '100%',
          height: computedHeight,
          minHeight: computedMinHeight,
          border: 'none',
          display: 'block',
        }}
        allow={allowFullscreen ? 'fullscreen' : undefined}
      />
    </div>
  )
}
