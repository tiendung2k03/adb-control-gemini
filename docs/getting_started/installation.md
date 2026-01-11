# Installation Guide

This is a detailed guide to installing ADB (Android Debug Bridge) and the `adb-control-gemini` extension for Gemini CLI.

## 1. Install Android SDK Platform-Tools (including ADB)

ADB is a command-line tool that lets you communicate with an Android device. It is part of the Android SDK Platform-Tools.

### On Windows:
1. Download [SDK Platform-Tools for Windows](https://developer.android.com/studio/releases/platform-tools).
2. Unzip the ZIP file to a memorable location (e.g., `C:\platform-tools`).
3. Add the path of the `platform-tools` folder to the system's `Path` environment variable:
   - Press `Win + R`, type `sysdm.cpl`, press Enter.
   - Go to the `Advanced` tab, then click on `Environment Variables`.
   - In the `System variables` section, find `Path`, select it and click `Edit`.
   - Click `New` and add the path to your `platform-tools` folder (e.g., `C:\platform-tools`).
   - Press `OK` for all windows.
4. Open a new Command Prompt window and type `adb --version` to check.

### On macOS:
1. Download [SDK Platform-Tools for macOS](https://developer.android.com/studio/releases/platform-tools).
2. Unzip the ZIP file to a location (e.g., `/Users/yourusername/platform-tools`).
3. Open Terminal and add the path to the `PATH` environment variable. You can edit the `~/.zshrc` or `~/.bash_profile` file:
   ```bash
   echo 'export PATH=$PATH:/Users/yourusername/platform-tools' >> ~/.zshrc
   source ~/.zshrc
   ```
   (Replace `/Users/yourusername/platform-tools` with your actual path)
4. Open a new Terminal window and type `adb --version` to check.

### On Linux:
1. Download [SDK Platform-Tools for Linux](https://developer.android.com/studio/releases/platform-tools).
2. Unzip the ZIP file (e.g., `~/platform-tools`).
3. Add the path to the `PATH` environment variable by editing `~/.bashrc` or `~/.zshrc`:
   ```bash
   echo 'export PATH=$PATH:~/platform-tools' >> ~/.bashrc
   source ~/.bashrc
   ```
   (Replace `~/platform-tools` with your actual path)
4. Open a new Terminal window and type `adb --version` to check.

## 2. Enable USB Debugging on your Android device

For ADB to be able to communicate with your device, you need to enable USB Debugging.

1.  **Enable Developer Options:**
    *   Open the `Settings` app on your Android device.
    *   Scroll down and find `About phone` or `About tablet`.
    *   Find `Build number` and tap it repeatedly (about 7 times) until you see the message "You are now a developer!".
2.  **Enable USB Debugging:**
    *   Go back to the main `Settings` screen.
    *   Find `Developer options` (usually in `System` or just below `About phone`).
    *   Scroll down and find `USB debugging` and turn it on.
3.  Connect your Android device to your computer with a USB cable. On your Android device, you may be asked "Allow USB debugging?", select `Always allow from this computer` and press `OK`.

## 3. Install the `adb-control-gemini` extension

This extension can be installed directly from the GitHub repository using the Gemini CLI command.

1.  **Install directly from GitHub:**
    *   Run the following command in your terminal, replacing `<GITHUB-URL-OF-EXTENSION>` with the GitHub URL of this extension's repository:
        ```bash
        gemini extension install <GITHUB-URL-OF-EXTENSION>
        ```
        Example:
        ```bash
        gemini extension install https://github.com/your-username/adb-control-gemini.git
        ```
        (Replace `https://github.com/your-username/adb-control-gemini.git` with the actual GitHub URL of this extension's repository).

2.  **Install dependencies (if any):**
    *   After installing the extension, you may need to install its dependencies. Navigate to the extension's installation directory (usually in the Gemini CLI's installation directory or its `extensions/` directory) and run the following commands:
        ```bash
        # Example: If the extension is installed at ~/.gemini/extensions/adb-control-gemini
        cd ~/.gemini/extensions/adb-control-gemini

        # For Node.js dependencies (in the mcp-server directory if it exists)
        cd mcp-server
        npm install
        cd ..

        # For Python dependencies
        pip install -r requirements.txt
        ```

After installation, the extension will be automatically activated and its commands will be available in the Gemini CLI.