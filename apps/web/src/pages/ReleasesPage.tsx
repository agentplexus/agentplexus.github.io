import { useEffect, useRef } from 'react'

// Default releases JSON URL
const DEFAULT_RELEASES_URL = '/releases/agentplexus-releases.json'

export function ReleasesPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<any>(null)

  useEffect(() => {
    let cancelled = false

    // Load external scripts and styles
    const loadDependencies = async () => {
      // If ReleaseLogViewer is already loaded, just init
      if ((window as any).ReleaseLogViewer) {
        if (!cancelled) initViewer()
        return
      }

      // Load styles
      const styles = [
        'https://unpkg.com/cal-heatmap/dist/cal-heatmap.css',
        'https://unpkg.com/@grokify/releaselog/dist/releaselog-viewer.css'
      ]

      for (const href of styles) {
        if (!document.querySelector(`link[href="${href}"]`)) {
          const link = document.createElement('link')
          link.rel = 'stylesheet'
          link.href = href
          document.head.appendChild(link)
        }
      }

      // Load scripts in order
      const scripts = [
        { src: 'https://d3js.org/d3.v7.min.js', check: () => (window as any).d3 },
        { src: 'https://unpkg.com/@popperjs/core@2/dist/umd/popper.min.js', check: () => (window as any).Popper },
        { src: 'https://unpkg.com/cal-heatmap/dist/cal-heatmap.min.js', check: () => (window as any).CalHeatmap },
        { src: 'https://unpkg.com/cal-heatmap/dist/plugins/Tooltip.min.js', check: () => (window as any).Tooltip },
        { src: 'https://unpkg.com/cal-heatmap/dist/plugins/CalendarLabel.min.js', check: () => (window as any).CalendarLabel },
        { src: 'https://unpkg.com/@grokify/releaselog/dist/releaselog-viewer.min.js', check: () => (window as any).ReleaseLogViewer }
      ]

      for (const { src, check } of scripts) {
        await loadScript(src, check)
        // Expose createPopper globally for cal-heatmap Tooltip plugin
        if (src.includes('popper') && (window as any).Popper) {
          (window as any).createPopper = (window as any).Popper.createPopper
        }
      }

      if (!cancelled) initViewer()
    }

    const loadScript = (src: string, check: () => any): Promise<void> => {
      return new Promise((resolve, reject) => {
        // If the global is already available, we're done
        if (check()) {
          resolve()
          return
        }

        const existingScript = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement
        if (existingScript) {
          // Script tag exists but may still be loading - poll for the global
          const pollForGlobal = () => {
            if (check()) {
              resolve()
            } else {
              setTimeout(pollForGlobal, 50)
            }
          }
          pollForGlobal()
          return
        }

        // Create and load new script
        const script = document.createElement('script')
        script.src = src
        script.onload = () => resolve()
        script.onerror = () => reject(new Error(`Failed to load ${src}`))
        document.body.appendChild(script)
      })
    }

    const initViewer = () => {
      if (!containerRef.current) return
      if (viewerRef.current) return // Already initialized

      const ReleaseLogViewer = (window as any).ReleaseLogViewer
      if (!ReleaseLogViewer) {
        console.error('ReleaseLogViewer not loaded')
        return
      }

      // Clear container
      containerRef.current.innerHTML = ''

      // Get URL from query parameter or use default
      const params = new URLSearchParams(window.location.search)
      const urlParam = params.get('url') || DEFAULT_RELEASES_URL

      // AgentPlexus cyan color palette for heatmap
      const heatmapColors = ['#1e293b', '#164e63', '#0e7490', '#06b6d4', '#22d3ee']

      viewerRef.current = new ReleaseLogViewer(containerRef.current, {
        showUrlBar: false,
        showHeader: true,
        showHeatmap: true,
        heatmapColors: heatmapColors,
        onLoad: () => {
          // Update browser URL when data loads
          const urlInput = document.querySelector('.rlv-url-input') as HTMLInputElement
          if (urlInput && urlInput.value && urlInput.value !== DEFAULT_RELEASES_URL) {
            const url = new URL(window.location.href)
            url.searchParams.set('url', urlInput.value)
            window.history.replaceState({}, '', url)
          }
        }
      })

      // Set input value and load
      setTimeout(() => {
        const urlInput = document.querySelector('.rlv-url-input') as HTMLInputElement
        if (urlInput) {
          urlInput.value = urlParam
        }
        viewerRef.current.loadUrl(urlParam)
      }, 0)
    }

    loadDependencies()

    // Cleanup on unmount
    return () => {
      cancelled = true
      if (viewerRef.current && viewerRef.current.destroy) {
        viewerRef.current.destroy()
      }
      viewerRef.current = null
    }
  }, [])

  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: '#0a0e1a' }}>
      {/* AgentPlexus dark theme overrides for ReleaseLog viewer */}
      <style>{`
        /* Override ReleaseLog CSS variables for AgentPlexus dark theme */
        #releases-container {
          --rlv-color-text: #e2e8f0;
          --rlv-color-text-muted: #94a3b8;
          --rlv-color-text-disabled: #64748b;
          --rlv-color-link: #06b6d4;
          --rlv-color-link-hover: #22d3ee;
          --rlv-color-bg: #0a0e1a;
          --rlv-color-bg-white: #0f172a;
          --rlv-color-border: #334155;
          --rlv-color-border-light: #1e293b;
          --rlv-color-focus: #8b5cf6;
          --rlv-color-focus-ring: rgba(139, 92, 246, 0.4);
          --rlv-color-error: #f87171;
          --rlv-color-error-bg: rgba(248, 113, 113, 0.1);
          --rlv-color-success: #34d399;
          --rlv-color-success-bg: rgba(52, 211, 153, 0.1);
          --rlv-color-warning: #fbbf24;
          --rlv-color-accent: #8b5cf6;
          --rlv-color-accent-emphasis: #a78bfa;
          --rlv-color-prerelease: #ec4899;
        }

        /* Heatmap legend cells - use cyan gradient like GitHub green */
        #releases-container .rlv-heatmap-legend-cell[data-level="0"] { background: #1e293b; }
        #releases-container .rlv-heatmap-legend-cell[data-level="1"] { background: #164e63; }
        #releases-container .rlv-heatmap-legend-cell[data-level="2"] { background: #0e7490; }
        #releases-container .rlv-heatmap-legend-cell[data-level="3"] { background: #06b6d4; }
        #releases-container .rlv-heatmap-legend-cell[data-level="4"] { background: #22d3ee; }

        /* Cal-heatmap empty cells background - only cells without data */
        #releases-container .ch-subdomain-bg { fill: #1e293b; }
        /* Ensure data cells show their colors (don't override with !important) */
        #releases-container rect[data-value="0"] { fill: #1e293b; }

        /* Cal-heatmap tooltip */
        #ch-tooltip,
        #ch-tooltip * {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
        }
        #ch-tooltip {
          background: #0f172a !important;
          color: #e2e8f0 !important;
          padding: 8px 12px !important;
          border-radius: 6px !important;
          border: 1px solid #334155 !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5) !important;
          font-size: 13px !important;
          line-height: 1.4 !important;
          max-width: 250px !important;
        }

        /* Footer link color */
        #releases-container .rlv-footer a {
          color: #06b6d4;
        }
        #releases-container .rlv-footer a:hover {
          color: #22d3ee;
        }

        /* Table header hover - override hardcoded light color */
        #releases-container .rlv-table th:hover {
          background: #1e293b;
        }

        /* Links dropdown background */
        #releases-container .rlv-links-dropdown {
          background: #0f172a;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5);
        }
        #releases-container .rlv-links-dropdown a:hover,
        #releases-container .rlv-links-dropdown a:focus {
          background: #1e293b;
        }

        /* Links button hover */
        #releases-container .rlv-links-btn:hover {
          background: #1e293b;
        }

        /* Pagination button hover */
        #releases-container .rlv-pagination-buttons button:hover:not(:disabled) {
          background: #1e293b;
        }

        /* Heatmap nav button hover */
        #releases-container .rlv-heatmap-nav:hover {
          background: #1e293b;
        }
      `}</style>

      <div ref={containerRef} id="releases-container" className="w-full" />
    </div>
  )
}
