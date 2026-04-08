# Troubleshooting & FAQ

Common issues and their solutions when using AureDroid.

## 🔴 ADB Not Found
- **Issue:** Extension reports "ADB command failed" or "ADB not found in PATH".
- **Solution:** Ensure `android-platform-tools` (Termux) or SDK Platform-Tools (Windows/Mac) are installed and the folder is in your system's `PATH`.

## 🔴 No Android Device Connected
- **Issue:** `adb_devices()` returns an empty list.
- **Solution:** 
  1.  Check your USB cable.
  2.  Ensure **USB Debugging** is enabled in Developer Options.
  3.  Verify your device's connection with `adb devices` in a separate terminal.
  4.  Restart the ADB server: `adb kill-server` and `adb start-server`.

## 🔴 SecurityException: INJECT_EVENTS
- **Issue:** `execute_action` fails with a security error when tapping or typing.
- **Solution:** Many Android skins (especially MIUI on Xiaomi) require a specific setting to allow ADB to inject touch events. Go to **Developer Options** and enable **"USB debugging (Security settings)"**.

## 🔴 Python Dependency Error
- **Issue:** `run_ai_script` or perception tools fail with `ImportError`.
- **Solution:** Make sure all dependencies in `requirements.txt` are installed in your Python environment: `pip install -r requirements.txt`.

## 🔴 ZeroTap Not Working
- **Issue:** Configured ZeroTap but UI actions are still slow.
- **Solution:**
  1.  Ensure the ZeroTap server is running and accessible from your host.
  2.  Verify the URL and Token provided in `setup_zerotap`.
  3.  AureDroid automatically falls back to standard ADB if ZeroTap is unavailable.

## ❓ Frequently Asked Questions

### Q: Does this work with rooted devices?
**A:** Yes! AureDroid supports many root-only ADB commands like `remount`, `battery_reset`, and `su`.

### Q: Can I use multiple devices at once?
**A:** Yes, you can specify the target device using the `device_id` parameter in several tools (e.g., `inspect_ui`, `adb_logcat`).

### Q: Is this extension safe to use?
**A:** AureDroid only executes commands on your local device. Always ensure your Python environment is secure and avoid running untrusted scripts.
