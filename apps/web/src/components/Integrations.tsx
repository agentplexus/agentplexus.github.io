// Homepage integrations - simple logo cloud
// Place logo files in /public/integrations/ as SVG or PNG with transparent background

const integrations = [
  { name: 'OpenAI', logo: '/integrations/openai.svg' },
  { name: 'Anthropic', logo: '/integrations/anthropic.svg' },
  { name: 'Google Gemini', logo: '/integrations/gemini.svg' },
  { name: 'xAI', logo: '/integrations/xai.svg' },
  { name: 'Opik', logo: '/integrations/opik.svg' },
  { name: 'Phoenix', logo: '/integrations/phoenix.svg' },
  { name: 'Langfuse', logo: '/integrations/langfuse.svg' },
  { name: 'Docker', logo: '/integrations/docker.svg' },
  { name: 'Kubernetes', logo: '/integrations/kubernetes.svg' },
  { name: 'Helm', logo: '/integrations/helm.svg' },
  { name: 'Twilio', logo: '/integrations/twilio.svg' },
  { name: 'ElevenLabs', logo: '/integrations/elevenlabs.svg' },
  { name: 'Serper', logo: '/integrations/serper.svg' },
  { name: 'SerpApi', logo: '/integrations/serpapi.svg' },
]

export function Integrations() {
  return (
    <section id="integrations" className="py-20 px-4" role="region" aria-label="Integrations">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Integrations</span>
          </h2>
          <p className="text-lg text-gray-300">
            Works with your existing stack
          </p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-6 md:gap-8 items-center justify-items-center">
          {integrations.map((integration) => (
            <div
              key={integration.name}
              className="group flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-xl bg-white/5 hover:bg-white/10 transition-colors p-3"
              title={integration.name}
            >
              <img
                src={integration.logo}
                alt={integration.name}
                className="w-full h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity filter brightness-0 invert"
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="/integrations"
            className="text-plexus-cyan hover:text-plexus-cyan-light focus-visible:text-plexus-cyan-light transition-colors text-sm rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
          >
            View all integrations →
          </a>
        </div>
      </div>
    </section>
  )
}
