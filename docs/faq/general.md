# Frequently Asked Questions (FAQ)

This is a list of frequently asked questions about the `adb-control-gemini` extension and how to use it.

## Installation and Connection

### Q: I get the error "ADB not found". What should I do?
A: This error means that your system cannot find the ADB tool.
   - **Solution:** Make sure you have installed the Android SDK Platform-Tools and the directory containing ADB has been added to your system's `PATH` environment variable. Please refer to the [Installation Guide](/docs/getting_started/installation.md) for detailed steps.

### Q: My device is not detected, or I see "No Android device connected".
A: There may be several reasons why the device is not detected:
   - **Check the USB cable:** Make sure the USB cable is securely connected and not faulty.
   - **Enable USB Debugging:** This mode must be enabled in Developer Options on your device. See the [Installation Guide](/docs/getting_started/installation.md) for how to enable it.
   - **Allow USB debugging:** When connecting the device to the computer for the first time after enabling USB debugging, your device will display a window asking "Allow USB debugging?". You must accept it, and it is best to select "Always allow from this computer".
   - **Install Driver:** On Windows, you may need to install a specific ADB/OEM driver for your device.
   - **Restart ADB Server:** Try running `adb kill-server` and then `adb start-server` in your terminal.
### Q: Can I use this extension with emulators?
A: Yes, this extension works well with both physical Android devices and emulators. Make sure your emulator is running and can be detected by ADB (`adb devices`).

### Q: I get a "SecurityException" or "INJECT_EVENTS" error when trying to tap or type.
A: This error occurs because the device's security settings prevent ADB from simulating touch or input events.
   - **Cause:** Android requires the `INJECT_EVENTS` permission for these actions, which is often restricted for security reasons.
   - **Solution (Physical Devices):** 
     1. Go to **Developer Options** on your device.
     2. Look for a setting named **"USB debugging (Security settings)"** (common on Xiaomi/MIUI devices) or **"Disable adb authorization timeout"**.
     3. Enable it. You may need to sign in to your device's account (e.g., Mi Account) to toggle this.
     4. If the setting doesn't exist, ensure you've granted all permissions when the "Allow USB debugging" prompt appeared.
   - **Solution (Emulators):** Emulators usually don't have this restriction, but if they do, check the emulator's settings for "Input" or "Security" options.

## Using Commands

### Q: Why do some commands require root privileges?
A: Some ADB commands that interact with sensitive parts of the Android system (e.g., changing battery status, remounting system partitions) require superuser (root) privileges.If your device is not rooted, these commands will not work.

### Q: How do I find the X, Y coordinates for the `tap` or `swipe` command?
A: You can use the `get_screen()` command to get the current UI structure of the screen. The JSON result will contain UI elements with `center` (center coordinates) and `bounds` attributes. You can use these coordinates.  - Alternatively, you can enable "Pointer location" or "Show touches" in Developer Options on your device to see the coordinates directly on the screen when you touch it.

### Q: Does the `type` command support Vietnamese with accents?
A: Yes, the `type` command has a built-in feature to convert Telex to Vietnamese with accents, helping you to enter Vietnamese text naturally.

### Q: Can I use more advanced ADB commands (e.g., `adb shell cmd <service> <command>`)?
A: This extension provides common ADB commands packaged as convenient functions. For more complex shell commands not on the list, you can still execute them through the `execute_action` function or through the Gemini CLI's `run_shell_command` tool, but you need to be careful with the syntax and how to escape characters.

## Debugging and Advanced

### Q: How do I view the device's logs for debugging?
A: You can use the `logcat` command to display the device's real-time logs, or `logcat_file <local_file_path>` to save the logs to a file on your computer. You can also filter the logs by tag using `logcat_tag <tag>`.

### Q: I want to understand more about how this extension works. Where should I look?
A: You can view the extension's source code (especially the Python files in the `utils/` directory and `mcp-server/src/index.ts`) to understand how the commands are implemented and how they communicate with ADB.