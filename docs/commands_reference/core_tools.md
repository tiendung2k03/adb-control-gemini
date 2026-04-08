# Core Tools Reference

This page documents the core MCP tools provided by AureDroid. These tools are the foundation for high-speed automation and complex interaction.

## 🛠 `run_ai_script`

**Purpose:** Execute complex Python logic locally on the host to interact with the device.

- **Parameter:** `code` (String): The Python code to execute.
- **Context:** Pre-imports all functions from `ai_runtime.py`.
- **Note:** Code is base64-encoded internally for safe transmission.

## 🛠 `execute_action`

**Purpose:** Executes a single UI action (tap, type, home, etc.) on the device.

- **Parameter:** `action_json` (String): A JSON object describing the action.
- **Example:** `{"action":"tap", "coordinates":[500,1000]}`
- **Fallback:** Automatically uses ZeroTap if configured, falling back to ADB.

## 🛠 `execute_batch`

**Purpose:** Executes a sequence of ADB actions in a single command.

- **Parameter:** `actions_json` (String): A JSON array of action objects.
- **Example:** `[{"action":"home"}, {"action":"wait"}, {"action":"tap", "coordinates":[100,200]}]`

## 🛠 `get_screen_summary`

**Purpose:** Returns a token-efficient summary of the current screen's interactive elements.

- **Output:** JSON list of elements with `text`, `desc`, `id`, `center`, and `type`.

## 🛠 `get_screen`

**Purpose:** Returns a detailed list of all interactive elements on the screen.

- **Output:** JSON list of elements with full resource IDs and accessibility properties.

## 🛠 `setup_zerotap`

**Purpose:** Configures the ZeroTap server for high-speed UI actions.

- **Parameters:** `url`, `token`, `device_id` (Optional).

## 🛠 `inspect_ui`

**Purpose:** Captures the full raw XML hierarchy of the current screen.

- **Parameter:** `device` (Optional): ADB serial number.

## 🛠 `visual_perception`

**Purpose:** Uses OpenCV template matching to find images on the screen.

- **Parameters:** `directory`, `template_name`, `threshold` (Optional).

## 🛠 `adb_devices`

**Purpose:** Lists all connected Android devices and emulators.

## 🛠 `adb_logcat`

**Purpose:** Retrieves system and application logs from the device.

- **Parameters:** `device` (Optional), `lines` (Optional, default: 50), `filter` (Optional).

## 🛠 `check_env`

**Purpose:** Verifies the ADB environment and Android device connection.
