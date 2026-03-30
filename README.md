# OpenConclave Plugin for Claude Code

AI agent orchestration with visual workflow automation.

## Install (two steps)

**Step 1: Install OpenConclave**

macOS / Linux:
```bash
curl -fsSL https://openconclave.com/install.sh | bash
```

Windows (PowerShell):
```powershell
irm https://openconclave.com/install.ps1 | iex
```

This installs the server to `~/.openconclave-app/`.

**Step 2: Install the Claude Code plugin**

```
/plugin marketplace add openconclave/openconclave-marketplace
/plugin install openconclave
```

## What the plugin adds

- **MCP tools** — list/create/trigger workflows, get runs, manage schedules
- **SessionStart hook** — auto-starts the server when Claude Code opens
- **`/openconclave:create-workflow`** skill — build workflows from natural language
- **`/openconclave`** command — quick status and actions

## What the install script adds

- **Server** — API on port 4000, UI on port 5173
- **Channel** — workflow outputs and prompt questions in your terminal
- **`openconclave` command** — start the server from anywhere

## Links

- [Website](https://openconclave.com)
- [GitHub](https://github.com/openconclave/openconclave)
- [Documentation](https://github.com/openconclave/openconclave/blob/master/WHAT_IS_OPENCONCLAVE.md)
