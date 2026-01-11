# Slash Commands Reference

The `adb-control-gemini` extension provides several custom commands (Slash Commands) to quickly perform common automation tasks. These commands are designed to simplify complex processes into a single command.

## List of Slash Commands

### `/android:status`
- **Description:** Quickly check the current status of the Android device. This command collects information about the battery level, charging status, screen status (on/off/locked), and the package name of the foreground application.
- **Usage:**
    ```
    /android:status
    ```
- **Example Response:**
    ```json
    {
      "battery_level": "85%",
      "charging_status": "not charging",
      "screen_status": "ON",
      "current_app": "com.android.settings"
    }
    ```
- **Purpose:** Useful for getting an overview of the device before performing other actions or for quick debugging.

### `/android:wifi_on`
- **Description:** Automatically performs the process of turning on Wi-Fi on the Android device. This command will send an ADB command to enable Wi-Fi.
- **Usage:**
    ```
    /android:wifi_on
    ```
- **Purpose:** Simplifies turning on Wi-Fi without manual interaction on the device.

### `/android:screenshot`
- **Description:** Takes a screenshot of the Android device and saves it to a local file on the computer. This command will report the path of the saved file.
- **Usage:**
    ```
    /android:screenshot
    ```
- **Example Response:**
    ```
    Screenshot saved to local: /path/to/your/screenshot_1704987654.png (also on device: /sdcard/screenshot_1704987654.png)
    ```
- **Purpose:** Easily record the device's screen state for testing, reporting, or debugging purposes.

### `/android:reset`
- **Description:** Returns the Android device to the home screen, often used to start a new task from a clean state. This command will simulate pressing the HOME button.
- **Usage:**
    ```
    /android:reset
    ```
- **Purpose:** Ensures the device is in the desired initial state before starting a sequence of automated actions.