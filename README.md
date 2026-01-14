# ADB Control Gemini - MCP Server

This project is a **Gemini CLI Extension** upgraded to an **MCP Server (Model Context Protocol)**, allowing AI models (like Claude, Gemini) to control Android devices via ADB (Android Debug Bridge).

## 🚀 Key Features

- **Device Control**: Supports over 100 ADB commands from basic to advanced (tap, swipe, type, install, screenshot, logcat, etc.).
- **UI Automation**: Find UI elements by text and perform actions.
- **App Management**: Install, debug, list, and manage application packages.
- **System Monitoring**: Check battery, memory, CPU, temperature, and network status.
- **MCP Integration**: Acts as a complete MCP Server, easily connecting with AI Agents.

## 🛠 System Requirements

- **Node.js**: Version 18 or higher.
- **Python**: Version 3.10 or higher.
- **ADB**: Installed and added to the environment variable (PATH).
- **Android Device**: "USB Debugging" mode enabled.

## 📦 Installation

```bash
gemini extension install https://github.com/tiendung2k03/adb-control-gemini/
```

### Directory Structure
- `commands/android/`: Contains ADB command definitions as `.toml` files.
- `utils/`: Python scripts to support complex ADB logic processing.
- `mcp-server/`: TypeScript source code of the MCP Server.
- `dist/`: Compiled JavaScript source code.

## 📝 Typical Command List

| Command | Description |
|---|---|
| `connect` | Connect to a device via TCP/IP. |
| `screenshot` | Take a screenshot of the device. |
| `install` | Install an application from an APK file. |
| `logcat` | View real-time system logs. |
| `input_tap` | Simulate a tap at coordinates. |

## 🤝 Contribution

All contributions to improve the project are welcome. Please create an **Issue** or send a **Pull Request**.

## 📄 License

This project is released under the **Apache-2.0** license.
