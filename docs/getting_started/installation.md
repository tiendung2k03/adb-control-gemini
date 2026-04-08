# Installation Guide

Follow these steps to set up **AureDroid** for use with Gemini CLI.

## 1. Install Android Platform-Tools (ADB)

ADB (Android Debug Bridge) is the foundation of AureDroid.

### On Termux (Android)
```bash
pkg install android-tools
```

### On Windows
1.  Download [SDK Platform-Tools for Windows](https://developer.android.com/studio/releases/platform-tools).
2.  Extract the ZIP and add the folder path to your system's `Path` environment variable.

### On macOS/Linux
1.  Use a package manager like Homebrew: `brew install --cask android-platform-tools`.
2.  Or download manually from the Android Developer site.

## 2. Prepare Your Android Device

1.  Enable **Developer Options** (Tap Build Number 7 times in Settings > About Phone).
2.  Enable **USB Debugging**.
3.  (Recommended) Enable **USB Debugging (Security settings)** if available (e.g., on Xiaomi/MIUI) to allow automated clicks.
4.  Connect your device to your computer via USB.

## 3. Install AureDroid Extension

Install the extension directly via Gemini CLI:

```bash
gemini extension install https://github.com/tiendung2k03/adb-control-gemini/
```

## 4. Install Dependencies

Navigate to the extension's directory:

```bash
cd ~/.gemini/extensions/adb-control-gemini

# 1. Install Node.js dependencies for MCP server
cd mcp-server
npm install
npm run build
cd ..

# 2. Install Python dependencies for advanced logic
pip install -r requirements.txt
```

## 5. Verify Setup

Run the `check_env` tool through Gemini CLI to ensure everything is connected and ready:

```
check_env()
```
If successful, you will see your device ID listed.
