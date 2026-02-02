# Security-Gated MCP Servers with VaultGuard

MCP servers need API keys. The standard approach is environment variables in your Claude Desktop config:

```json
{
  "mcpServers": {
    "search": {
      "command": "mcp-omniserp",
      "env": {
        "SERPER_API_KEY": "sk-live-abc123..."
      }
    }
  }
}
```

This works, but it's plaintext credentials in a JSON file. On a shared machine, compromised device, or after a breach, those keys are exposed.

We added VaultGuard support to `mcp-omniserp` to enable a better pattern: **security-gated credentials**.

## The Problem with Environment Variables

Environment variables in MCP configs have several issues:

1. **Plaintext storage** — Keys sit in JSON files readable by any process
2. **No access control** — Any application can read them
3. **No security context** — Keys are available regardless of device state
4. **Difficult rotation** — Changing keys requires editing multiple config files

For production MCP servers handling sensitive data (Confluence, Slack, databases), this isn't acceptable.

## The VaultGuard Pattern

VaultGuard combines two AgentPlexus modules:

- **OmniVault** — Multi-provider secret management (env, file, keyring, AWS)
- **Posture** — Cross-platform security assessment (TPM, disk encryption, biometrics)

Together, they enable **security-gated credential access**: secrets are only released when the device meets security requirements.

## How It Works

### 1. Store credentials in OS keychain

Instead of environment variables, store API keys in your operating system's secure credential store:

```bash
# macOS
security add-generic-password -s "omnivault" -a "SERPER_API_KEY" -w "your-key"

# Linux (requires libsecret)
secret-tool store --label="SERPER_API_KEY" service omnivault account SERPER_API_KEY

# Windows (PowerShell)
cmdkey /generic:omnivault:SERPER_API_KEY /user:SERPER_API_KEY /pass:your-key
```

### 2. Define security policy (optional)

Create `~/.agentplexus/policy.json` to enforce security requirements:

```json
{
  "version": 1,
  "local": {
    "require_encryption": true,
    "min_security_score": 50
  }
}
```

This policy requires:
- Disk encryption enabled (FileVault, BitLocker, LUKS)
- Security score of at least 50/100

### 3. Server retrieves credentials securely

```go
// Load policy from config files
policy, err := vaultguard.LoadPolicy()

// Create VaultGuard with keyring backend
keyringVault := keyring.New(keyring.Config{
    ServiceName: "omnivault",
})

sv, err := vaultguard.New(&vaultguard.Config{
    CustomVault: keyringVault,
    Policy:      policy,
})

// Security check happens automatically
// If device doesn't meet policy, this fails
result := sv.SecurityResult()
log.Printf("Security: score=%d, encrypted=%v",
    result.Score,
    result.Details.Local.DiskEncrypted)

// Retrieve API key (security-gated)
apiKey, err := sv.GetValue(ctx, "SERPER_API_KEY")
```

### 4. Graceful fallback

If no policy is configured, the server falls back to environment variables:

```go
policy, err := vaultguard.LoadPolicy()
if policy == nil {
    // No policy - use env vars (permissive mode)
    apiKey := os.Getenv("SERPER_API_KEY")
    runServer(apiKey)
    return
}

// Policy exists - use secure credentials
runWithSecureCredentials(policy)
```

This allows gradual adoption without breaking existing setups. Your current environment variable configuration continues to work—VaultGuard only activates when you add a policy.

## What Security Posture Checks

Posture evaluates device security across platforms:

| Check | macOS | Windows | Linux |
|-------|-------|---------|-------|
| Disk Encryption | FileVault | BitLocker | LUKS |
| Secure Boot | Apple Silicon | UEFI Secure Boot | UEFI Secure Boot |
| TPM | Secure Enclave | TPM 2.0 | TPM 2.0 |
| Biometrics | Touch ID | Windows Hello | - |
| Firewall | Application Firewall | Windows Firewall | iptables/nftables |

Each check contributes to a 0-100 security score. Policies can require minimum scores or specific features.

## Policy Examples

### Require disk encryption only

```json
{
  "version": 1,
  "local": {
    "require_encryption": true
  }
}
```

### High-security workstation

```json
{
  "version": 1,
  "local": {
    "require_encryption": true,
    "require_secure_boot": true,
    "require_biometrics": true,
    "min_security_score": 80
  }
}
```

### Different requirements by environment

```json
{
  "version": 1,
  "local": {
    "require_encryption": true,
    "min_security_score": 50
  },
  "cloud": {
    "require_workload_identity": true,
    "allowed_regions": ["us-east-1", "us-west-2"]
  }
}
```

## Benefits

### For developers

- **No secrets in config files** — Keys stay in OS credential store
- **Portable** — Same code works on macOS, Windows, Linux
- **Graceful degradation** — Falls back to env vars if no policy

### For security teams

- **Enforceable policies** — Define minimum security requirements
- **Audit trail** — Security check results are logged
- **Zero-trust ready** — Credentials only released on verified devices

### For organizations

- **Compliance** — Demonstrate credential protection controls
- **Incident response** — Compromised device can't access secrets without meeting policy
- **Gradual rollout** — Permissive mode for migration

## Applying the Pattern to Other MCP Servers

The VaultGuard pattern can be applied to any MCP server:

```go
import (
    keyring "github.com/agentplexus/omnivault-keyring"
    "github.com/agentplexus/vaultguard"
)

func main() {
    policy, _ := vaultguard.LoadPolicy()

    if policy == nil {
        // Permissive mode - use env vars
        token := os.Getenv("MY_API_TOKEN")
        runServer(token)
        return
    }

    // Secure mode - use VaultGuard
    sv, err := vaultguard.New(&vaultguard.Config{
        CustomVault: keyring.New(keyring.Config{ServiceName: "omnivault"}),
        Policy:      policy,
    })
    if err != nil {
        log.Fatalf("Security check failed: %v", err)
    }
    defer sv.Close()

    token, _ := sv.GetValue(ctx, "MY_API_TOKEN")
    runServer(token)
}
```

We're planning to add this pattern to:
- `mcp-confluence` — Confluence API tokens
- `mcp-stats-agent` — Statistics agent API keys
- Future MCP servers in the AgentPlexus ecosystem

## Getting Started

### Install mcp-omniserp

```bash
go install github.com/agentplexus/omniserp/cmd/mcp-omniserp@latest
```

### Option 1: Use environment variables (existing behavior)

```json
{
  "mcpServers": {
    "search": {
      "command": "mcp-omniserp",
      "env": {
        "SERPER_API_KEY": "your-key"
      }
    }
  }
}
```

### Option 2: Use secure credentials with VaultGuard

Store your API key in the OS keychain:

```bash
# macOS
security add-generic-password -s "omnivault" -a "SERPER_API_KEY" -w "your-key"
```

Configure Claude Desktop (no `env` block needed):

```json
{
  "mcpServers": {
    "search": {
      "command": "mcp-omniserp"
    }
  }
}
```

Add a security policy:

```bash
mkdir -p ~/.agentplexus
cat > ~/.agentplexus/policy.json << 'EOF'
{
  "version": 1,
  "local": {
    "require_encryption": true,
    "min_security_score": 50
  }
}
EOF
```

## Conclusion

Environment variables are convenient but insufficient for production MCP servers. VaultGuard provides a pattern for security-gated credentials:

1. Store secrets in OS credential stores (not config files)
2. Define security policies (encryption, score thresholds)
3. Gate credential access on device security posture
4. Fall back gracefully when no policy is configured

The pattern is reusable across any MCP server. We're applying it to our Confluence, search, and future MCP servers—and you can apply it to yours.

## Resources

- [mcp-omniserp on GitHub](https://github.com/agentplexus/omniserp)
- [VaultGuard documentation](https://agentplexus.github.io/vaultguard/)
- [OmniVault documentation](https://github.com/agentplexus/omnivault)
- [Posture documentation](https://github.com/agentplexus/posture)
