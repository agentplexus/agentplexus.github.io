import type { CSSProperties } from 'react'

export type CodeBlockTheme = 'oneDark' | 'vsDark' | 'dracula' | 'nightOwl' | 'atomDark'

export interface MarkdownTheme {
  /** Text color for paragraphs */
  textColor?: string
  /** Text color for headings */
  headingColor?: string
  /** Text color for bold/strong text */
  strongColor?: string
  /** Text color for links */
  linkColor?: string
  /** Link hover color */
  linkHoverColor?: string
  /** Background color for inline code */
  inlineCodeBg?: string
  /** Text color for inline code */
  inlineCodeColor?: string
  /** Code block theme name */
  codeBlockTheme?: CodeBlockTheme
  /** Custom styles for code blocks */
  codeBlockStyle?: CSSProperties
}

export interface MarkdownRendererProps {
  /** Markdown content to render */
  content: string
  /** Theme configuration */
  theme?: MarkdownTheme
  /** Additional CSS class for the container */
  className?: string
  /** Custom component overrides */
  components?: Record<string, React.ComponentType<unknown>>
}
