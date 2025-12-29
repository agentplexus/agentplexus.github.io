# Building a Multi-Agent Statistics Verification System

## The Problem: LLMs Hallucinate Statistics

When you ask an LLM for statistics, you often get confident-sounding numbers that are completely made up. "According to a 2023 study, 73% of developers prefer..." - except that study doesn't exist, and neither does that number.

We needed a system that could find real statistics from real sources, with actual URLs and verbatim excerpts that could be verified. Not hallucinated data from the model's training, but facts from the live web.

## First Attempt: Single Agent with Search

Our first approach was straightforward: give an LLM access to web search and ask it to find statistics. We used OmniSerp to search and OmniLLM to process results.

The results were disappointing. The agent would find relevant pages but then "summarize" statistics that didn't actually appear on those pages. It was mixing real URLs with hallucinated numbers - arguably worse than pure hallucination because it looked more credible.

## Second Attempt: Adding Verification

We split the work into two agents: one to find and extract statistics, another to verify them. The verification agent would re-fetch the source URL and check if the quoted excerpt actually existed.

This helped catch obvious hallucinations, but the verification agent itself would sometimes "confirm" statistics that weren't there. One LLM covering for another's mistakes.

## The Breakthrough: Separation of Concerns

The key insight was that different parts of the pipeline needed different approaches:

1. **Search** doesn't need an LLM at all - OmniSerp returns structured results directly.
2. **Extraction** needs an LLM but should be constrained to finding verbatim text, not summarizing.
3. **Verification** should be mechanical - does this exact string exist in this page?
4. **Orchestration** should be deterministic, not LLM-driven.

This led to our 4-agent architecture with clear boundaries.

## The Final Architecture

**Research Agent**: Pure search via OmniSerp. No LLM involvement. Returns URLs, titles, and snippets.

**Synthesis Agent**: Uses OmniLLM to extract statistics from fetched web pages. Constrained to find verbatim excerpts containing numbers - no paraphrasing allowed.

**Verification Agent**: Re-fetches source pages and mechanically checks if the claimed excerpt exists. Flags any discrepancies.

**Orchestration Agent**: Coordinates the pipeline using Eino's graph-based workflow. Deterministic execution order, no LLM decision-making about what to do next.

## Why AgentPlexus Modules Mattered

**OmniLLM** let us swap between Gemini, Claude, and GPT-4 with environment variables. Different models have different strengths for extraction vs. synthesis tasks. We could experiment without code changes.

**OmniSerp** abstracted away the search provider. Started with Serper, tested SerpAPI, switched based on rate limits and result quality.

**OmniObserve** was crucial for debugging. When statistics were wrong, we could trace back through the pipeline to see exactly where hallucination occurred. The zero-config integration with OmniLLM made this trivial.

## Lessons Learned

**Separate concerns aggressively.** Each agent should do one thing. If an agent needs to search AND extract AND verify, split it up.

**Don't let LLMs orchestrate other LLMs.** Use deterministic workflows (we used Eino) for coordination. LLM-based orchestration adds another source of unpredictability.

**Verification must be mechanical.** If you ask an LLM "does this excerpt appear on this page?", it will sometimes say yes when it doesn't. Use string matching.

**Provider abstraction pays off.** We tested 5 different LLM providers during development. Without OmniLLM, each switch would have been a major refactor.

**Observability isn't optional.** Multi-agent systems are hard to debug. Being able to see every LLM call, latency, and token usage was essential.

## Results

The final system achieves high accuracy on verified statistics. When it returns a statistic, you can click the source URL and find the exact quoted text on that page.

It's slower than a single LLM call - the pipeline takes 30-60 seconds depending on topic complexity. But the results are trustworthy, which is the whole point.

The architecture is also extensible. Adding new verification methods or search providers is straightforward because each component has a clean interface.
