import type { CSSProperties, ReactNode } from 'react'

export interface PresentationEmbedProps {
  /** URL of the presentation (Marp, Reveal.js, Google Slides, etc.) */
  src: string
  /** Title for the iframe (accessibility) */
  title: string
  /** Height of the embed - can be CSS value or 'auto' for viewport-based */
  height?: string | number
  /** Minimum height when using auto height */
  minHeight?: string | number
  /** Additional CSS class for the container */
  className?: string
  /** Custom styles for the container */
  style?: CSSProperties
  /** Border radius for the container */
  borderRadius?: string
  /** Border color/style */
  border?: string
  /** Background color while loading */
  backgroundColor?: string
  /** Whether to allow fullscreen */
  allowFullscreen?: boolean
}

export interface PresentationPreviewProps {
  /** URL of the presentation */
  src: string
  /** Title for the iframe */
  title: string
  /** Click handler - typically navigation */
  onClick?: () => void
  /** URL to link to (alternative to onClick) */
  href?: string
  /** Additional CSS class */
  className?: string
  /** Aspect ratio (default: 16/9) */
  aspectRatio?: number
  /** Overlay content to show on hover */
  overlayContent?: ReactNode
  /** Gradient overlay from bottom */
  showGradient?: boolean
  /** Label to show at bottom left */
  label?: string
  /** Icon component to show next to label */
  labelIcon?: ReactNode
}
