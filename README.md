# AureDroid - Advanced Android Control for AI Agents

**AureDroid** (formerly ADB Control Gemini) is a premium **Gemini CLI Extension** and **MCP Server (Model Context Protocol)** that provides superior Android control and automation capabilities for AI agents. It allows models like Gemini to interact with Android devices through ADB, with added intelligence from OpenCV and smart search.

## 🚀 Key Features

- **Smart Element Finding:** Find UI elements extremely fast by text, ID, or description, without needing the AI to parse the full screen XML.
- **Visual Perception (OpenCV):** Recognize on-screen images using Template Matching. Users can supply a directory of sample images for the AI to perform complex visual tasks (e.g., finding a specific icon or button).
- **Comprehensive Device Control**: Supports over 100 ADB commands, from basic taps and swipes to advanced actions like file management, logcat, and system settings.
- **App Management**: Install, debug, list, and manage application packages.
- **System Monitoring**: Check battery, memory, CPU, temperature, and network status.
- **Optimized MCP Server**: The server is performance-optimized, loading all commands into memory at startup for fast and stable execution.

## 🛠 System Requirements

- **Node.js**: v18+
- **Python**: v3.10+
- **Python Libraries**: `opencv-python`, `numpy`
- **ADB**: Installed and added to the system's PATH.
- **Android Device**: USB Debugging mode enabled.

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
| `smart_finder` | Find a UI element by text or resource-id. |
| `visual_perception`| Find an image on the screen using a template. |
| `install` | Install an application from an APK file. |
| `logcat` | View real-time system logs. |
| `input_tap` | Simulate a tap at coordinates. |


## ✍️ Author
Developed by the AuraDroid Team.
[Join Channel Telegram](https://t.me/auredroid_channel)

## 👥 Chat
[Join Group Telegram](https://t.me/auredroid_chat)

## 🤝 Contribution

All contributions to improve the project are welcome. Please create an **Issue** or send a **Pull Request**.

## 📄 License

This project is released under the **Apache-2.0** license.
