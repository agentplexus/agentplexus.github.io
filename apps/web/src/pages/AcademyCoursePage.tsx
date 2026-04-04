import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Github, CheckCircle, BookOpen, Clock, GraduationCap } from 'lucide-react'
import { PresentationEmbed } from '@plexusone/presentation-embed'

interface Course {
  name: string
  slug: string
  tagline: string
  description: string
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  presentationUrl?: string
  githubUrl?: string
  prerequisites: string[]
  learningObjectives: string[]
  topics: {
    title: string
    description: string
  }[]
  resources: {
    name: string
    url: string
    type: 'github' | 'docs' | 'external'
  }[]
}

const courses: Record<string, Course> = {
  'building-subagents': {
    name: 'Building Subagents with Claude Code & Kiro CLI',
    slug: 'building-subagents',
    tagline: 'Create custom AI subagents using multi-agent-spec and assistantkit',
    description:
      'Learn to define custom subagents using the multi-agent-spec format, generate platform-specific plugins with assistantkit, and load them into Claude Code and Kiro CLI. This course covers the complete workflow from specification to deployment.',
    duration: '45 min',
    level: 'Intermediate',
    presentationUrl: 'https://plexusone.github.io/agentplexus-academy/agents-claude-code-kiro-cli/presentation.html',
    githubUrl: 'https://github.com/plexusone/agentplexus-academy/tree/main/agents-claude-code-kiro-cli',
    prerequisites: [
      'Basic understanding of Claude Code or Kiro CLI',
      'Familiarity with YAML and Markdown',
      'Understanding of AI agents and LLMs',
    ],
    learningObjectives: [
      'Understand what subagents are and when to use them',
      'Define agents using multi-agent-spec format (YAML frontmatter + Markdown)',
      'Create skills and commands for reusable knowledge',
      'Generate platform-specific plugins with assistantkit',
      'Load and use custom subagents in Claude Code and Kiro CLI',
    ],
    topics: [
      {
        title: 'What Are Subagents?',
        description: 'Core concepts, architecture, built-in subagents, and comparison with agent teams.',
      },
      {
        title: 'multi-agent-spec',
        description: 'The specification format for agents, skills, commands, and deployments.',
      },
      {
        title: 'Agent Definition Format',
        description: 'YAML frontmatter fields: name, description, model, tools, allowedTools, requires.',
      },
      {
        title: 'assistantkit CLI',
        description: 'Installation, generation commands, and deployment configuration.',
      },
      {
        title: 'Hands-On: Building Subagents',
        description: 'Step-by-step creation of custom subagents from scratch.',
      },
      {
        title: 'Loading & Using',
        description: 'Integration with Claude Code and Kiro CLI, permissions, and parallel execution.',
      },
    ],
    resources: [
      {
        name: 'multi-agent-spec',
        url: 'https://github.com/plexusone/multi-agent-spec',
        type: 'github',
      },
      {
        name: 'assistantkit',
        url: 'https://github.com/plexusone/assistantkit',
        type: 'github',
      },
      {
        name: 'agent-team-release (Example)',
        url: 'https://github.com/plexusone/agent-team-release',
        type: 'github',
      },
    ],
  },
  'agent-teams-subagents': {
    name: 'Claude Code: Agent Teams vs Subagents',
    slug: 'agent-teams-subagents',
    tagline: 'Master Multi-Agent Orchestration',
    description:
      'Complete course on parallel AI development in Claude Code. Learn the two multi-agent patterns: subagents for focused work within a single session, and agent teams for collaborative tasks requiring direct inter-agent communication.',
    duration: '60 min',
    level: 'Intermediate',
    presentationUrl: 'https://plexusone.github.io/agentplexus-academy/claude-code-agent-teams-subagents/presentation.html',
    githubUrl: 'https://github.com/plexusone/agentplexus-academy/tree/main/claude-code-agent-teams-subagents',
    prerequisites: [
      'Experience with Claude Code',
      'Basic understanding of AI agents',
      'Familiarity with command-line tools',
    ],
    learningObjectives: [
      'Understand subagent architecture and one-way communication',
      'Create custom subagents with markdown files and hooks',
      'Enable and configure agent teams with TeammateTool',
      'Apply decision frameworks for choosing patterns',
      'Implement parallel execution and cost optimization',
    ],
    topics: [
      {
        title: 'What Are Subagents?',
        description: 'Definition, architecture, built-in subagents (Explore, Plan, general-purpose, Bash).',
      },
      {
        title: 'The Task Tool',
        description: 'Foundation of subagent execution, DAG dependencies, parallel execution.',
      },
      {
        title: 'What Are Agent Teams?',
        description: 'Independent Claude Code sessions, shared task list, direct messaging.',
      },
      {
        title: 'TeammateTool Operations',
        description: '13 operations: spawnTeam, message, broadcast, cleanup, plan approval, and more.',
      },
      {
        title: 'Decision Framework',
        description: 'When workers need to talk: subagents for focused work, teams for collaboration.',
      },
      {
        title: 'Implementation & Best Practices',
        description: 'Custom subagent creation, team configuration, cost optimization strategies.',
      },
    ],
    resources: [
      {
        name: 'Tutorial',
        url: 'https://github.com/plexusone/agentplexus-academy/blob/main/claude-code-agent-teams-subagents/tutorial.md',
        type: 'docs',
      },
      {
        name: 'Architecture Comparison',
        url: 'https://github.com/plexusone/agentplexus-academy/blob/main/claude-code-agent-teams-subagents/architecture-comparison.md',
        type: 'docs',
      },
      {
        name: 'Claude Code Subagents Docs',
        url: 'https://docs.anthropic.com/en/docs/claude-code/sub-agents',
        type: 'external',
      },
      {
        name: 'Claude Code Agent Teams Docs',
        url: 'https://docs.anthropic.com/en/docs/claude-code/agent-teams',
        type: 'external',
      },
    ],
  },
}

const levelColors = {
  Beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
  Intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
}

export function AcademyCoursePage() {
  const { slug } = useParams<{ slug: string }>()
  const course = slug ? courses[slug] : null

  if (!course) {
    return (
      <div className="min-h-screen bg-plexus-dark pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Course Not Found</h1>
          <p className="text-gray-400 mb-8">
            The course you're looking for doesn't exist.
          </p>
          <Link
            to="/academy"
            className="inline-flex items-center gap-2 text-plexus-cyan hover:text-plexus-purple transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Academy
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-plexus-dark pt-28 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back link */}
        <Link
          to="/academy"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-plexus-cyan transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Academy
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${levelColors[course.level]}`}>
              {course.level}
            </span>
            <span className="flex items-center gap-1 text-gray-400">
              <Clock size={16} />
              {course.duration}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {course.name}
          </h1>
          <p className="text-xl text-plexus-cyan mb-4">{course.tagline}</p>
          <p className="text-gray-400 max-w-3xl">{course.description}</p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            {course.presentationUrl && (
              <a
                href={course.presentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-plexus-cyan to-plexus-purple text-white font-medium hover:opacity-90 transition-opacity"
              >
                <GraduationCap size={18} />
                Open Presentation
                <ExternalLink size={14} />
              </a>
            )}
            {course.githubUrl && (
              <a
                href={course.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 text-gray-300 hover:bg-white/5 transition-colors"
              >
                <Github size={18} />
                View Source
              </a>
            )}
          </div>
        </div>

        {/* Info bar - Learning Objectives, Prerequisites, Resources */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Learning objectives */}
          <section className="rounded-xl border border-white/10 bg-plexus-slate/30 p-5">
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <GraduationCap size={18} className="text-plexus-cyan" />
              Learning Objectives
            </h3>
            <ul className="space-y-2">
              {course.learningObjectives.map((objective, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                  <CheckCircle size={14} className="text-green-400 shrink-0 mt-0.5" />
                  {objective}
                </li>
              ))}
            </ul>
          </section>

          {/* Prerequisites */}
          <section className="rounded-xl border border-white/10 bg-plexus-slate/30 p-5">
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <BookOpen size={18} className="text-plexus-purple" />
              Prerequisites
            </h3>
            <ul className="space-y-2">
              {course.prerequisites.map((prereq, idx) => (
                <li key={idx} className="text-sm text-gray-400">
                  • {prereq}
                </li>
              ))}
            </ul>
          </section>

          {/* Resources */}
          <section className="rounded-xl border border-white/10 bg-plexus-slate/30 p-5">
            <h3 className="text-base font-bold text-white mb-3">Resources</h3>
            <ul className="space-y-2">
              {course.resources.map((resource, idx) => (
                <li key={idx}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-plexus-cyan transition-colors"
                  >
                    {resource.type === 'github' ? (
                      <Github size={14} />
                    ) : (
                      <BookOpen size={14} />
                    )}
                    {resource.name}
                    <ExternalLink size={12} className="opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Presentation embed - full width */}
        {course.presentationUrl && (
          <section className="mb-8">
            <PresentationEmbed
              src={course.presentationUrl}
              title={`${course.name} Presentation`}
              height="calc(100vh - 150px)"
              minHeight="600px"
            />
          </section>
        )}

        {/* Course topics - full width */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Course Topics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {course.topics.map((topic, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-white/10 bg-plexus-slate/30 p-4"
              >
                <h3 className="text-base font-semibold text-white mb-1">
                  {idx + 1}. {topic.title}
                </h3>
                <p className="text-gray-400 text-sm">{topic.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
