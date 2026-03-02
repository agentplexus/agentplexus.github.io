import { Link } from 'react-router-dom'
import { ArrowRight, Play, BookOpen, Clock, GraduationCap, Bot, Workflow, Code, Layers } from 'lucide-react'

interface Course {
  name: string
  slug: string
  description: string
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  topics: string[]
  highlights: { icon: typeof Bot; text: string }[]
  presentationUrl?: string
}

const courses: Course[] = [
  {
    name: 'Building Subagents with Claude Code & Kiro CLI',
    slug: 'building-subagents',
    description:
      'Learn to create custom subagents using multi-agent-spec and assistantkit. Define agents in markdown, generate platform-specific plugins, and load them into Claude Code and Kiro CLI.',
    duration: '45 min',
    level: 'Intermediate',
    topics: ['multi-agent-spec', 'assistantkit', 'Claude Code', 'Kiro CLI'],
    highlights: [
      { icon: Bot, text: 'Custom subagent definitions' },
      { icon: Code, text: 'YAML frontmatter + Markdown' },
      { icon: Workflow, text: 'Plugin generation workflow' },
      { icon: Layers, text: 'Multi-platform deployment' },
    ],
    presentationUrl: 'https://plexusone.github.io/agentplexus-academy/agents-claude-code-kiro-cli/presentation.html',
  },
  {
    name: 'Claude Code: Agent Teams vs Subagents',
    slug: 'agent-teams-subagents',
    description:
      'Master multi-agent orchestration in Claude Code. Learn when to use subagents (Task tool) for focused work vs agent teams (TeammateTool) for collaborative debugging and code review.',
    duration: '60 min',
    level: 'Intermediate',
    topics: ['Subagents', 'Agent Teams', 'Task Tool', 'TeammateTool'],
    highlights: [
      { icon: Bot, text: 'Built-in & custom subagents' },
      { icon: Workflow, text: '13 TeammateTool operations' },
      { icon: Layers, text: 'Parallel execution patterns' },
      { icon: Code, text: 'Real-world use cases' },
    ],
    presentationUrl: 'https://plexusone.github.io/agentplexus-academy/claude-code-agent-teams-subagents/presentation.html',
  },
]

const levelColors = {
  Beginner: 'bg-green-500/20 text-green-400',
  Intermediate: 'bg-yellow-500/20 text-yellow-400',
  Advanced: 'bg-red-500/20 text-red-400',
}

export function AcademyPage() {
  return (
    <div className="min-h-screen bg-plexus-dark pt-28 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Academy</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Learn to build AI agents, multi-agent systems, and agentic workflows.
          </p>
        </div>

        <div className="grid gap-8">
          {courses.map((course) => (
            <div
              key={course.slug}
              className="rounded-xl border border-white/10 bg-plexus-slate/30 p-6 hover:border-white/20 transition-colors"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-white">
                      {course.name}
                    </h2>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${levelColors[course.level]}`}>
                      {course.level}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock size={14} />
                      {course.duration}
                    </span>
                  </div>

                  <p className="text-gray-400 mb-4">
                    {course.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1 rounded-full text-sm bg-plexus-purple/20 text-plexus-purple-light"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-2 mb-4">
                    {course.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-400"
                      >
                        <highlight.icon size={14} className="text-plexus-cyan shrink-0" />
                        {highlight.text}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      to={`/academy/${course.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-plexus-cyan to-plexus-purple text-white text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      <GraduationCap size={14} />
                      Start Course <ArrowRight size={14} />
                    </Link>
                    {course.presentationUrl && (
                      <a
                        href={course.presentationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-gray-300 text-sm hover:bg-white/5 transition-colors"
                      >
                        <BookOpen size={14} />
                        View Slides
                      </a>
                    )}
                  </div>
                </div>

                {/* Presentation Preview */}
                {course.presentationUrl && (
                  <div className="lg:w-80 shrink-0">
                    <Link
                      to={`/academy/${course.slug}`}
                      className="block rounded-lg overflow-hidden border border-white/10 hover:border-plexus-purple/50 transition-colors group"
                    >
                      <div className="relative aspect-video bg-plexus-dark">
                        <iframe
                          src={course.presentationUrl}
                          title={`${course.name} Preview`}
                          className="w-full h-full pointer-events-none"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-plexus-dark/80 via-transparent to-transparent" />
                        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-white/70 text-xs">
                          <Play size={12} className="text-plexus-cyan" />
                          View presentation
                        </div>
                        <div className="absolute inset-0 bg-plexus-purple/0 group-hover:bg-plexus-purple/10 transition-colors" />
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
