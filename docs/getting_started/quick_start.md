# Quick Start: Basic Usage

Once installed, AureDroid gives your AI agent superpowers for Android control. Here are the first steps to start using it.

## 1. Check Connection

Verify that your device is recognized:

```
adb_devices()
```
or 
```
check_env()
```

## 2. Peek at the Screen

Get a quick summary of the current UI:

```
get_screen_summary()
```
The result will contain text labels and IDs of interactive elements like "Settings" or "Log in".

## 3. Simple Interaction

You can perform simple actions using `execute_action`:

- **Tap a button:** `execute_action({"action":"tap", "coordinates":[500,1200]})`
- **Type text:** `execute_action({"action":"type", "text":"Hello AureDroid"})`
- **Go Home:** `execute_action({"action":"home"})`

## 4. Run Multiple Actions (Batch)

For a simple sequence, use `execute_batch`:

```json
execute_batch([
  {"action":"home"},
  {"action":"wait"},
  {"action":"tap", "coordinates":[100,200]}
])
```

## 5. Explore Complex Automation

For powerful tasks like WhatsApp auto-reply or navigating complex menus, use **AI Runtime**. Instead of calling tools one by one, your agent can write a Python script and run it using `run_ai_script`.

**Example:**
```python
if find("Search"):
    click("Search")
    type("Settings")
    wait(1)
    click("Settings")
```
Refer to the [**AI Runtime Guide**](/docs/core_features/ai_runtime.md) for all available functions.
