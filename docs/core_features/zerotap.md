# ZeroTap Integration: Ultra-Fast UI Actions

**ZeroTap** is a high-performance MCP server that can be integrated with AureDroid to drastically reduce the latency of UI actions like tapping, swiping, and typing.

## 🚀 Why ZeroTap?

- **Near-Instant Speed:** Bypasses slow ADB shell input commands.
- **Improved Accuracy:** Handles Unicode and complex characters perfectly.
- **Scalability:** Optimized for handling many rapid-fire interactions.

## ⚙️ How to Setup

To use ZeroTap, you first need to have a ZeroTap server running and accessible. Then, configure it using the `setup_zerotap` tool:

```
setup_zerotap(
  url="http://192.168.1.100:8486/mcp",
  token="your-auth-token",
  device_id="optional-adb-serial"
)
```

- **URL:** The endpoint for the ZeroTap MCP server.
- **Token:** Your authorization token for ZeroTap.
- **Device ID:** (Optional) If you have multiple devices, you can specify which one uses ZeroTap. If omitted, this configuration becomes the default.

## 🧠 How it works with AureDroid

Once configured, AureDroid's internal tools (like `execute_action` and `run_ai_script`) will **automatically prefer ZeroTap** over standard ADB for supported actions:

1.  AureDroid checks for a valid ZeroTap configuration.
2.  If found, it attempts to execute the action via ZeroTap.
3.  If ZeroTap fails or is not configured, AureDroid seamlessly falls back to standard ADB commands.

This ensures you always get the best possible performance without any changes to your AI agent's logic.
