import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  oneDark,
  vscDarkPlus,
  dracula,
  nightOwl,
  atomDark,
} from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { MarkdownRendererProps, MarkdownTheme, CodeBlockTheme } from './types'

const codeThemes: Record<CodeBlockTheme, typeof oneDark> = {
  oneDark,
  vsDark: vscDarkPlus,
  dracula,
  nightOwl,
  atomDark,
}

const defaultTheme: MarkdownTheme = {
  textColor: '#d1d5db',
  headingColor: '#ffffff',
  strongColor: '#ffffff',
  linkColor: '#06b6d4',
  linkHoverColor: '#22d3ee',
  inlineCodeBg: 'rgba(255, 255, 255, 0.1)',
  inlineCodeColor: '#06b6d4',
  codeBlockTheme: 'oneDark',
  codeBlockStyle: {
    margin: '1rem 0',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
  },
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      style={{
        position: 'absolute',
        right: '0.75rem',
        top: '0.75rem',
        padding: '0.5rem',
        borderRadius: '0.5rem',
        background: 'rgba(255, 255, 255, 0.1)',
        border: 'none',
        cursor: 'pointer',
        color: copied ? '#10b981' : '#9ca3af',
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => {
        if (!copied) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
      }}
      title="Copy to clipboard"
    >
      {copied ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  )
}

export function MarkdownRenderer({
  content,
  theme = {},
  className,
  components: customComponents,
}: MarkdownRendererProps) {
  const mergedTheme = { ...defaultTheme, ...theme }
  const codeStyle = codeThemes[mergedTheme.codeBlockTheme || 'oneDark']

  const baseComponents = {
    h1: ({ children }: { children?: React.ReactNode }) => (
      <h1 style={{ color: mergedTheme.headingColor }} className="text-3xl font-bold mt-8 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 style={{ color: mergedTheme.headingColor }} className="text-2xl font-bold mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 style={{ color: mergedTheme.headingColor }} className="text-xl font-bold mt-8 mb-3">
        {children}
      </h3>
    ),
    p: ({ children }: { children?: React.ReactNode }) => (
      <p style={{ color: mergedTheme.textColor }} className="leading-relaxed mb-4">
        {children}
      </p>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong style={{ color: mergedTheme.strongColor }} className="font-semibold">
        {children}
      </strong>
    ),
    a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
      <a
        href={href}
        style={{ color: mergedTheme.linkColor }}
        className="hover:underline"
      >
        {children}
      </a>
    ),
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul style={{ color: mergedTheme.textColor }} className="list-disc list-inside mb-4 space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => (
      <ol style={{ color: mergedTheme.textColor }} className="list-decimal list-inside mb-4 space-y-2">
        {children}
      </ol>
    ),
    li: ({ children }: { children?: React.ReactNode }) => (
      <li style={{ color: mergedTheme.textColor }}>{children}</li>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote
        style={{ borderLeftColor: mergedTheme.linkColor, color: mergedTheme.textColor }}
        className="border-l-4 pl-4 italic my-4 opacity-80"
      >
        {children}
      </blockquote>
    ),
    code: ({ className, children, ...props }: { className?: string; children?: React.ReactNode }) => {
      const match = /language-(\w+)/.exec(className || '')
      const codeString = String(children).replace(/\n$/, '')
      const isCodeBlock = codeString.includes('\n') || match

      if (isCodeBlock) {
        return (
          <div style={{ position: 'relative' }}>
            <CopyButton code={codeString} />
            <SyntaxHighlighter
              style={codeStyle}
              language={match ? match[1] : 'text'}
              PreTag="div"
              customStyle={mergedTheme.codeBlockStyle}
            >
              {codeString}
            </SyntaxHighlighter>
          </div>
        )
      }

      return (
        <code
          style={{
            backgroundColor: mergedTheme.inlineCodeBg,
            color: mergedTheme.inlineCodeColor,
          }}
          className="px-1.5 py-0.5 rounded text-sm"
          {...props}
        >
          {children}
        </code>
      )
    },
    pre: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
  }

  const components = { ...baseComponents, ...customComponents }

  return (
    <article className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </article>
  )
}
