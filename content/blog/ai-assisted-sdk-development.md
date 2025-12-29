# Building Production Go SDKs with Claude Opus 4.5

We built two complete Go SDKs—go-comet-ml-opik and go-elevenlabs—using Claude Opus 4.5 with Claude Code. The first took 4-5 hours. The second followed the same pattern. Here's what we learned about AI-assisted SDK development.

## The Challenge

Both projects started with the same problem: a service with a comprehensive API but no Go SDK.

**go-comet-ml-opik**: Opik is Comet ML's open-source LLM observability platform. Great Python SDK, no Go support. We needed it for OmniObserve.

**go-elevenlabs**: ElevenLabs provides AI audio generation—text-to-speech, voice cloning, music. Powerful API with 204 operations. No official Go SDK.

Industry benchmarks for manual SDK development range from 4 weeks to several months per language, with costs of $50-90K per SDK ([Speakeasy](https://www.speakeasy.com/blog/how-to-build-sdks), [APIMatic](https://www.apimatic.io/blog/2021/09/the-great-sdk-battle-build-vs-buy), [liblab](https://liblab.com/blog/automated-sdk-generation)). We completed our first SDK in an evening.

## The Pattern: OpenAPI → ogen → Wrapper Services

Both SDKs followed the same architecture:

### Step 1: Analyze the OpenAPI Spec

Every modern API has an OpenAPI specification. go-comet-ml-opik's was 15K lines with 201 operations. go-elevenlabs was 54K lines with 204 operations.

Claude Opus 4.5 excels at reading and understanding large specs. We'd ask it to categorize endpoints, identify patterns, and understand the data model. This analysis that might take a human developer a day or two happens in minutes.

### Step 2: Generate Type-Safe Client with ogen

We chose [ogen](https://github.com/ogen-go/ogen) for API client generation. Unlike other generators, ogen:

- Produces type-safe code with no reflection
- Correctly handles optional and nullable fields (`OptString`, `OptNilString`)
- Generates proper Go types for complex oneOf responses

For go-elevenlabs, ogen produced 330K lines of generated code from the 54K line spec. This is code we never have to write or maintain—it's derived directly from the API definition.

### Step 3: Build Wrapper Services

Generated code is correct but not ergonomic. The ogen types use patterns like `NewOptString("value")` that are verbose for users. We wrap these in clean, idiomatic Go interfaces:

```go
// What ogen generates
req := api.TextToSpeechRequest{
    Text:    api.NewOptString("Hello world"),
    ModelID: api.NewOptNilString("eleven_multilingual_v2"),
    VoiceSettings: api.NewOptVoiceSettings(api.VoiceSettings{
        Stability:       api.NewOptFloat64(0.6),
        SimilarityBoost: api.NewOptFloat64(0.8),
    }),
}

// What our wrapper provides
audio, err := client.TextToSpeech().Simple(ctx, voiceID, "Hello world")
```

Claude Opus 4.5 is excellent at generating these wrappers. It understands both the ogen patterns and Go idioms, producing code that uses functional options, proper error handling, and consistent naming.

### Step 4: Test and Document

For each SDK, we created:

- **Test utilities**: Mock servers, request matchers, response builders
- **Unit tests**: Validation, service initialization, response handling
- **Documentation**: MkDocs sites with getting started, service guides, examples

Claude wrote tests alongside implementation, catching issues immediately rather than discovering them later.

## The Numbers

### go-comet-ml-opik

| Metric | Value |
|--------|-------|
| Development time | 4-5 hours |
| Industry benchmark | 4+ weeks per SDK ([APIMatic](https://www.apimatic.io/blog/2021/09/the-great-sdk-battle-build-vs-buy)) |
| Input (Python SDK) | 50+ files, ~20K lines |
| Output | 60+ Go files, ~15K lines |
| Estimated cost | $20-30 |

### go-elevenlabs

| Metric | Value |
|--------|-------|
| OpenAPI spec | 54K lines, 204 operations |
| Generated code | 330K lines |
| Handwritten code | ~8K lines across 44 files |
| Test files | 19 |
| Documentation pages | 32 |
| Services wrapped | 19 |

## Industry Context

SDK development is a known time sink. Here's what SDK generation companies report:

- **[APIMatic](https://www.apimatic.io/blog/2021/09/the-great-sdk-battle-build-vs-buy)**: 4 weeks to build a single SDK in one language, ~$52K total including maintenance
- **[Speakeasy](https://www.speakeasy.com/blog/how-to-build-sdks)**: ~$90K per hand-written SDK
- **[liblab](https://liblab.com/blog/automated-sdk-generation)**: "weeks or months" for manual development, $50K+ per language
- **[Dude Solutions case study](https://www.apimatic.io/blog/2016/06/how-dude-solutions-cut-down-time-to-release-with-apimatic/)**: Reduced SDK release time from 1 week to 18 seconds with automation

These companies sell SDK generation tools, so they have incentive to emphasize manual development costs. But the ballpark is consistent across sources: building a production SDK manually takes weeks, not hours.

## What Claude Opus 4.5 Handles Well

**Large codebase navigation**: Reading 50+ files, cross-referencing patterns, understanding relationships. Claude maintains context across the entire codebase.

**Pattern recognition**: After seeing how one wrapper service should work, it applies the pattern consistently across all services. The functional options, error handling, and documentation style remain uniform.

**ogen type handling**: The `OptString`, `OptNilString`, `OptFloat64` types require careful handling. Claude consistently uses the right constructor and unwrapping patterns.

**Parallel execution**: Claude Code can read multiple files, run multiple commands, and make multiple edits simultaneously. This significantly speeds up exploration and implementation.

## Challenges We Encountered

**golangci-lint configuration**: The linter config format changed between versions. Claude iterated through fixes, running the linter after each change until all issues were resolved.

**oneOf response types**: Some API endpoints return different types. We needed type switches to handle variants correctly. Claude figured out the pattern from the generated code.

**Matching reference implementations**: The Python SDK used decorators and context managers. Claude adapted these to Go idioms—context.Context for propagation, functional options for configuration.

## Key Lessons

**Use ogen, not manual HTTP**: Type-safe code generation eliminates entire classes of bugs. The 330K lines of generated code in go-elevenlabs would be impossible to write and maintain by hand.

**Wrapper services are essential**: Never expose generated code directly. The wrapper layer provides a stable, ergonomic API while allowing the generated layer to be regenerated as the API evolves.

**Write tests with implementation**: Claude naturally writes tests alongside code. This catches issues immediately and ensures the test suite grows with the codebase.

**Document coverage explicitly**: We created API coverage pages showing which methods are implemented. Users know exactly what's available without reading all the code.

**High effort mode matters**: For complex SDK work, Claude's high effort setting enables deeper analysis. It reads more files, considers more patterns, and produces higher quality output.

## The Repeatable Pattern

These two SDKs prove the approach is repeatable:

1. Start with OpenAPI spec
2. Generate typed client with ogen
3. Build wrapper services with functional options
4. Create test utilities and comprehensive tests
5. Write documentation alongside code
6. Use todo tracking for multi-file tasks

The same pattern should work for any API with an OpenAPI specification.

## What's Next

Both SDKs are now dependencies for AgentPlexus modules:

- **go-comet-ml-opik** powers OmniObserve's Opik integration
- **go-elevenlabs** will power OmniVoice's ElevenLabs integration

The SDKs are open source and accepting contributions. The pattern we've described can be applied to other APIs that need Go support.

## The Bottom Line

AI-assisted development isn't about replacing developers—it's about eliminating the tedious translation work between specifications and implementations. The creative decisions (architecture, patterns, API design) remain human. The mechanical translation (reading specs, generating wrappers, writing tests) is dramatically accelerated.

Industry sources suggest manual SDK development takes 4+ weeks per language. We completed ours in hours. Your mileage may vary depending on API complexity, coverage requirements, and how much you trust generated code without extensive review.
