import { Link } from 'react-router-dom'
import { Copy, Check, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const installCommand = `go get github.com/agentplexus/omnillm
go get github.com/agentplexus/omniobserve`

const codeExample = `package main

import (
    "github.com/agentplexus/omnillm"
    "github.com/agentplexus/omniobserve"
)

func main() {
    // Create an LLM client - works with any provider
    client := omnillm.New(omnillm.WithProvider("anthropic"))

    // Add observability (Langfuse, Phoenix hooks also available)
    client.Use(omniobserve.OpikHook())

    // Use it - same API regardless of provider
    resp, _ := client.Chat(ctx, []omnillm.Message{
        {Role: "user", Content: "Hello, world!"},
    })
}`

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <div className="absolute right-3 top-3 z-10">
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 focus-visible:bg-white/20 transition-colors text-gray-400 hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
          aria-label="Copy code to clipboard"
          aria-pressed={copied}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
        <span aria-live="polite" role="status" className="sr-only">
          {copied ? 'Code copied to clipboard' : ''}
        </span>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: '0.75rem',
          fontSize: '0.875rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

export function GettingStarted() {
  return (
    <section id="getting-started" className="py-24 px-4" role="region" aria-label="Getting Started">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Getting Started</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Add powerful capabilities to your AI agents in minutes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Install */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-plexus-cyan/20 text-plexus-cyan text-sm flex items-center justify-center">1</span>
              Install the modules you need
            </h3>
            <CodeBlock code={installCommand} language="bash" />
            <p className="text-gray-500 text-sm mt-3">
              Each module is independent. Install only what you use.
            </p>
          </div>

          {/* Use */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-plexus-purple/20 text-plexus-purple text-sm flex items-center justify-center">2</span>
              Use them together
            </h3>
            <CodeBlock code={codeExample} language="go" />
          </div>
        </div>

        {/* Features row */}
        <div className="grid sm:grid-cols-3 gap-6 mt-12">
          <div className="text-center p-6 rounded-xl border border-white/10 bg-plexus-slate/30">
            <div className="text-3xl font-bold text-plexus-cyan mb-2">5 min</div>
            <div className="text-gray-400">to first API call</div>
          </div>
          <div className="text-center p-6 rounded-xl border border-white/10 bg-plexus-slate/30">
            <div className="text-3xl font-bold text-plexus-purple mb-2">0 lock-in</div>
            <div className="text-gray-400">swap providers anytime</div>
          </div>
          <div className="text-center p-6 rounded-xl border border-white/10 bg-plexus-slate/30">
            <div className="text-3xl font-bold text-plexus-pink mb-2">1 line</div>
            <div className="text-gray-400">to add observability</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/projects/stats-agent-team"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-plexus-cyan to-plexus-purple text-white font-medium hover:opacity-90 focus-visible:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple focus-visible:ring-offset-2 focus-visible:ring-offset-plexus-dark"
          >
            See a complete project
            <ArrowRight size={18} />
          </Link>
          <p className="text-gray-500 text-sm mt-3">
            Multi-agent system using OmniLLM, OmniSerp, and OmniObserve
          </p>
        </div>
      </div>
    </section>
  )
}
