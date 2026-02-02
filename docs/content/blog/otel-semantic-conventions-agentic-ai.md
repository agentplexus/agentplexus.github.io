# OpenTelemetry Semantic Conventions for Agentic AI

Modern AI systems are evolving from single-model interactions to multi-agent architectures. An orchestrator coordinates specialized agents—research, synthesis, verification, quality—each making LLM calls, invoking tools, and passing context to other agents. When something goes wrong, where do you look?

OpenTelemetry's GenAI semantic conventions cover model identification, token usage, and basic agent identity. But they don't address the unique challenges of multi-agent systems: tracking workflows across agents, measuring handoff latency, understanding task dependencies, and attributing costs to specific agents and operations.

We built semantic conventions that extend OpenTelemetry's `gen_ai.agent.*` namespace to fill this gap.

## The Observability Gap

OpenTelemetry GenAI covers:
- Model identification (`gen_ai.system`, `gen_ai.request.model`)
- Token usage (`gen_ai.usage.*`)
- Tool definitions (`gen_ai.tool.*`)
- Basic agent identity (`gen_ai.agent.id`, `gen_ai.agent.name`)

What's missing:
- **Workflows** - End-to-end sessions spanning multiple agents
- **Tasks** - Units of work performed by individual agents
- **Handoffs** - Communication and delegation between agents
- **Tool Calls** - Actual tool invocations (not just definitions)

## Extending the Namespace

We extend `gen_ai.agent.*` with four new concept areas:

```text
gen_ai.agent.*              # Agent identity (aligned with OTel)
gen_ai.agent.workflow.*     # Workflow/session tracking
gen_ai.agent.task.*         # Task execution
gen_ai.agent.handoff.*      # Agent-to-agent communication
gen_ai.agent.tool_call.*    # Tool invocations
```

The design principles:
- **Extend, don't replace** - Works alongside existing GenAI conventions
- **Avoid collisions** - `tool_call.*` vs OTel's `tool.*` (definitions vs invocations)
- **Enable convergence** - Minimal migration if OTel adopts these concepts upstream

## Workflow Tracking

Workflows represent end-to-end processing sessions:

```yaml
gen_ai.agent.workflow.id: "wf-550e8400-e29b-41d4-a716-446655440000"
gen_ai.agent.workflow.name: "statistics-extraction"
gen_ai.agent.workflow.status: "completed"
gen_ai.agent.workflow.task.count: 5
gen_ai.agent.workflow.task.completed_count: 5
gen_ai.agent.workflow.duration: 45000
gen_ai.usage.total_tokens: 15420
gen_ai.usage.cost: 0.0847
```

At a glance: workflow health, task success rate, duration, and cost.

## Task Execution

Tasks represent individual units of work:

```yaml
gen_ai.agent.task.id: "task-research-001"
gen_ai.agent.task.name: "extract_gdp_statistics"
gen_ai.agent.task.type: "extraction"
gen_ai.agent.id: "research-agent-1"
gen_ai.agent.task.llm.call_count: 3
gen_ai.agent.task.tool_call.count: 7
gen_ai.agent.task.duration: 12500
gen_ai.agent.task.error.type: "rate_limit"
gen_ai.agent.task.error.message: "OpenAI rate limit exceeded"
```

Immediate visibility: which agent failed, what it was doing, and why.

## Agent Handoffs

Handoffs track agent-to-agent communication:

```yaml
gen_ai.agent.handoff.id: "ho-789"
gen_ai.agent.handoff.type: "delegate"
gen_ai.agent.handoff.from.agent.id: "orchestrator"
gen_ai.agent.handoff.to.agent.id: "synthesis-agent"
gen_ai.agent.handoff.payload.size: 4096
gen_ai.agent.handoff.latency: 23
gen_ai.agent.handoff.status: "completed"
```

Understand communication patterns, measure latency, identify bottlenecks between agents.

## Tool Call Invocations

Tool calls track actual function invocations (distinct from OTel's `gen_ai.tool.*` which describes tool definitions):

```yaml
gen_ai.agent.tool_call.id: "tc-search-042"
gen_ai.agent.tool_call.name: "web_search"
gen_ai.agent.tool_call.type: "search"
gen_ai.agent.tool_call.duration: 850
gen_ai.agent.tool_call.http.status_code: 200
gen_ai.agent.tool_call.response.size: 15360
gen_ai.agent.tool_call.retry_count: 1
```

## Implementation: Middleware Approach

The conventions are implemented as middleware that minimizes code changes:

```go
import (
    "github.com/agentplexus/omniobserve/agentops"
    "github.com/agentplexus/omniobserve/agentops/middleware"
)

// 1. Create a store
store, _ := agentops.Open("postgres", agentops.WithDSN(dsn))

// 2. Start a workflow
ctx, workflow, _ := middleware.StartWorkflow(ctx, store,
    "statistics-extraction",
    middleware.WithInitiator("user:123"),
)
defer middleware.CompleteWorkflow(ctx)

// 3. Wrap agent HTTP handlers (automatic task creation)
handler := middleware.AgentHandler(middleware.AgentHandlerConfig{
    AgentID:   "synthesis-agent",
    AgentType: "synthesis",
    Store:     store,
})(yourHandler)

// 4. Use instrumented client (automatic handoff tracking)
client := middleware.NewAgentClient(http.DefaultClient,
    middleware.AgentClientConfig{
        FromAgentID: "orchestrator",
        Store:       store,
    },
)

// 5. Wrap tool calls (automatic timing and error tracking)
results, _ := middleware.ToolCall(ctx, "web_search",
    func() ([]Result, error) {
        return searchService.Search(query)
    },
    middleware.WithToolType("search"),
)
```

## What the Middleware Tracks

| Component | What It Tracks | Code Changes |
|-----------|----------------|--------------|
| `StartWorkflow()` | Lifecycle, duration, task counts | ~3 lines |
| `AgentHandler()` | Task timing, HTTP status, errors | ~5 lines/agent |
| `NewAgentClient()` | Handoff latency, payload size | ~5 lines shared |
| `ToolCall()` | Execution time, request/response size | ~3 lines/call |

## Automatic Context Propagation

Context flows automatically across boundaries:

**Within a process:** Workflow, task, agent info attached to `context.Context`

**Across services (HTTP headers):**
```text
X-AgentOps-Workflow-ID: wf-550e8400-...
X-AgentOps-Task-ID: task-123
X-AgentOps-Agent-ID: orchestrator
```

No manual ID passing required.

## Practical Use Cases

**Debugging Failed Workflows:**
```sql
SELECT task_name, agent_id, error_type, error_message
FROM tasks
WHERE workflow_id = 'wf-550e8400-...'
  AND status = 'failed';
```

**Cost Attribution by Agent:**
```sql
SELECT agent_type, SUM(total_tokens) as tokens
FROM tasks
GROUP BY agent_type;
```

**Finding Bottlenecks:**
```sql
SELECT from_agent_id, to_agent_id, AVG(latency) as avg_latency
FROM handoffs
GROUP BY from_agent_id, to_agent_id;
```

## YAML Model Definitions

Following OTel's approach, conventions are defined in YAML:

```text
model/
├── registry.yaml   # Attribute definitions
├── spans.yaml      # Span type definitions
└── events.yaml     # Event type definitions
```

These serve as the source of truth for code generation, documentation, and validation.

## Compatibility

The conventions are designed to work with:
- **OpenTelemetry GenAI Semantic Conventions** - Extends `gen_ai.agent.*` namespace
- **OpenTelemetry Trace Context** - Standard W3C trace propagation
- **OpenInference (Arize Phoenix)** - Compatible attribute naming

## What's Next

These conventions are part of OmniObserve's AgentOps module. We're actively developing:
- Additional storage backends beyond PostgreSQL
- OpenTelemetry exporter integration
- Dashboard templates for Grafana and similar tools
- Language bindings beyond Go

Multi-agent AI systems deserve first-class observability. Standard semantic conventions make that possible.
