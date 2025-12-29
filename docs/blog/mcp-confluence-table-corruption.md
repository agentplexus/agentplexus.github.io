# Why We Built Another Confluence MCP Server

There are already MCP servers for Confluence. Why build another one?

Because existing servers corrupt tables.

## The Problem

When AI assistants edit Confluence pages through MCP, tables often break. Headers disappear, formatting vanishes, sometimes the entire table becomes invalid. The same thing happens with macros that use Confluence's `ac:` namespace.

The root cause is a format mismatch. LLMs naturally generate Markdown or HTML5. Confluence uses a specific Storage Format XHTML that has different rules:

```xml
<!-- Confluence Storage Format -->
<table>
  <tbody>           <!-- Required! No <thead> allowed -->
    <tr>
      <th>Name</th> <!-- Headers go inside tbody -->
    </tr>
    <tr>
      <td>Alice</td>
    </tr>
  </tbody>
</table>
```

When an MCP server converts to/from Markdown or HTML5 internally, data loss is inevitable.

## What We Tried

### Attempt 1: Structured Blocks

Our first approach was an Intermediate Representation (IR)—Go structs that could be rendered to valid XHTML:

```go
page := &storage.Page{
    Blocks: []storage.Block{
        &storage.Heading{Level: 1, Text: "Title"},
        &storage.Table{
            Headers: []string{"Name", "Status"},
            Rows:    []storage.Row{{Cells: []storage.Cell{{Text: "Alice"}}}},
        },
    },
}
```

The LLM produces JSON, Go renders valid XHTML. This worked well for creating new pages.

But it failed for editing. Confluence tables can have column widths, nested lists in cells, inline formatting, custom styles. Our block format couldn't represent all of that:

```xml
<td>
  <p><strong>Bold</strong> and <a href="...">links</a></p>
  <ul><li>Nested list</li></ul>
</td>
```

This became `{text: "Bold and links Nested list"}`. Everything flattened.

### Attempt 2: Raw XHTML Tools

We added tools that work directly with Storage Format XHTML:

| Tool | Description |
|------|-------------|
| `confluence_read_page_xhtml` | Get raw XHTML |
| `confluence_update_page_xhtml` | Update with raw XHTML |

This gave perfect round-trip fidelity. Read a page, modify it, write it back—nothing lost.

The tradeoff: LLMs must understand Storage Format XHTML. But modern models handle this well, and we validate before sending to the API.

## The Solution: Right Tool for the Job

We kept both approaches:

| Scenario | Recommended Tool |
|----------|------------------|
| Create new page | `confluence_create_page` (blocks) |
| Read simple page | `confluence_read_page` (blocks) |
| Read complex page | `confluence_read_page_xhtml` |
| Edit existing page | `confluence_update_page_xhtml` |
| Edit tables | **Always** `confluence_update_page_xhtml` |

Structured blocks are safer for creation—they can't produce invalid XHTML. Raw XHTML tools are necessary for editing—they preserve everything.

## Why This Matters

If you're building AI assistants that interact with Confluence, you'll hit this problem. Tables will break. Users will lose formatting. Round-trip editing will corrupt pages.

The fix isn't better prompting or more careful parsing. It's using the native format for editing and constraining LLM output for creation.

## What's Next: Security-Gated Credentials

The current `mcp-confluence` server uses environment variables for API tokens. This works, but it means plaintext credentials in config files.

We're planning to add [VaultGuard integration](/blog/security-gated-mcp-servers), the same pattern we use in `mcp-omniserp-secure`:

```go
// Future: security-gated credential access
policy, _ := vaultguard.LoadPolicy()
if policy == nil {
    // Permissive mode - use env vars
    runWithEnvCredentials(ctx)
    return
}
// Secure mode - credentials gated on device security
runWithSecureCredentials(ctx, policy)
```

This would allow organizations to require disk encryption, biometric authentication, or minimum security scores before the server can access Confluence tokens.

## Getting Started

```bash
go install github.com/agentplexus/mcp-confluence/cmd/mcp-confluence@latest
```

Configure in Claude Desktop or Claude Code:

```json
{
  "mcpServers": {
    "confluence": {
      "command": "mcp-confluence",
      "env": {
        "CONFLUENCE_BASE_URL": "https://example.atlassian.net/wiki",
        "CONFLUENCE_USERNAME": "user@example.com",
        "CONFLUENCE_API_TOKEN": "your-api-token"
      }
    }
  }
}
```

## Resources

- [mcp-confluence on GitHub](https://github.com/agentplexus/mcp-confluence)
- [mcp-confluence Presentation](https://agentplexus.github.io/mcp-confluence/)
- [Security-Gated MCP Servers with VaultGuard](/blog/security-gated-mcp-servers)
- [Confluence Storage Format Documentation](https://confluence.atlassian.com/doc/confluence-storage-format-790796544.html)
