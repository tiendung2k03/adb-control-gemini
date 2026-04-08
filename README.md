# AureDroid - Advanced Android Control for AI Agents

**AureDroid** (formerly ADB Control Gemini) is a premium **Gemini CLI Extension** and **MCP Server (Model Context Protocol)** that provides superior Android control and automation capabilities for AI agents. It allows models like Gemini to interact with Android devices through ADB, with added intelligence from OpenCV and high-speed Python automation.

## 🚀 Key Features

- **High-Speed Automation (AI Runtime):** Execute complex Python scripts directly on the host to minimize round-trip latency and handle multi-step tasks intelligently.
- **ZeroTap Integration:** Configure a ZeroTap server to drastically speed up UI interactions (tap, swipe, type).
- **Smart Element Finding:** Find UI elements extremely fast by text, ID, or description with token-efficient screen summaries.
- **Visual Perception (OpenCV):** Recognize on-screen images using Template Matching for complex visual tasks.
- **Comprehensive Device Control:** Over 100 ADB commands available, from basic navigation to deep system settings.
- **Optimized MCP Server:** Performance-oriented, loading all commands into memory at startup for fast and stable execution.

## 🛠 System Requirements

- **Node.js**: v18+
- **Python**: v3.10+
- **Python Libraries**: `opencv-python`, `numpy` (for Visual Perception)
- **ADB**: Installed and added to the system's PATH.
- **Android Device**: USB Debugging enabled.

## 📦 Installation

```bash
gemini extension install https://github.com/tiendung2k03/adb-control-gemini/
```

After installation, navigate to the extension's directory (usually `~/.gemini/extensions/adb-control-gemini`) and install dependencies:

```bash
# Install Node.js dependencies
cd mcp-server
npm install
npm run build
cd ..

# Install Python dependencies
pip install -r requirements.txt
```

## 📖 Documentation

- [**Installation Guide**](/docs/getting_started/installation.md) - Requirements and setup.
- [**Quick Start**](/docs/getting_started/quick_start.md) - Basic usage and first steps.
- [**Core Features**](/docs/core_features/ai_runtime.md) - AI Runtime, Perception, and ZeroTap.
- [**ADB Command Reference**](/docs/commands_reference/adb_commands.md) - List of all 100+ supported commands.
- [**FAQ & Troubleshooting**](/docs/faq/troubleshooting.md) - Common issues and fixes.

## ✍️ Author
Developed by the AureDroid Team.
[Join Channel Telegram](https://t.me/auredroid_channel)
[Join Group Telegram](https://t.me/auredroid_chat)

## 🤝 Contribution
Contributions are welcome! Please create an Issue or send a Pull Request.

## 📄 License
This project is released under the **Apache-2.0** license.
