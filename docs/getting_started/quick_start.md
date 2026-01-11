# Quick Start Guide

This guide will help you get started quickly with the `adb-control-gemini` extension.

## 1. Check Device Connection

Before performing any action, make sure your Android device is connected and ADB is working:

```
/android:status
```
This command will provide information about the battery status, screen status, and the currently running application.

If the device is not connected or detected, you will receive an error message. Please refer to the [Installation Guide](/docs/getting_started/installation.md) to troubleshoot the connection.

## 2. Basic Actions

### Take a screenshot
To take a screenshot of the device and save it locally:

```
/android:screenshot
```
The result will return the path of the screenshot file saved on your computer.

### Go to Home Screen
To return the device to the home screen:

```
/android:reset
```
This command is equivalent to pressing the Home button on the device.

### Turn Wi-Fi On/Off
To turn on Wi-Fi:

```
/android:wifi_on
```

To turn off Wi-Fi:

```
/android:wifi_off
```

### Type Text
You can type text directly into your Android device. For example, to type "Hello Gemini" into an input field:

```
execute_action({"action": "type", "text": "Hello Gemini", "reason": "Type text into the input field"})
```
*Note*: The `type` command automatically handles Telex for Vietnamese.

### Tap a Specific Location
If you know the X, Y coordinates on the screen, you can simulate a tap:

```
execute_action({"action": "tap", "coordinates": [500, 1000], "reason": "Tap the middle of the screen"})
```
*Note*: These coordinates are just an example, you need to determine the exact coordinates from the results of `get_screen` or `dumpsys`.

### Swipe on the Screen
To simulate a swipe from one point to another:

```
execute_action({"action": "swipe", "start_coordinates": [500, 1500], "end_coordinates": [500, 500], "duration": 200, "reason": "Scroll up"})
```

## 3. Get Screen State

To understand the current UI structure of the application, you can get the screen state as JSON:

```
get_screen()
```
The result will be a JSON object describing the interactive UI elements on the screen, including ID, text, type, coordinates, and clickability.

## 4. Find UI Element

Based on the `get_screen` result, you can search for a specific element:

```
find_element(text="Settings")
```
This command will return the elements with the text "Settings" on the screen.

For more details on all available ADB commands, please refer to the [ADB Command Reference](/docs/commands_reference/adb_commands.md).