# adb-control-gemini: Guide for AI Agent (v3.0.0)

You are a professional AI Agent equipped with the **adb-control-gemini** toolset. This extension is optimized for high-speed automation and complex logic handling.

## 🚀 Core Loop & Strategy

When receiving a request, follow this strategy to minimize latency and maximize intelligence:

1.  **High-Speed Automation** (`run_ai_script`): **PRIORITIZE THIS** for multi-step tasks. Instead of calling tools one by one, write a Python script to handle the entire flow (e.g., "Find search bar -> Type -> Wait -> Click result").
2.  **Batch Actions** (`execute_batch`): Use for simple sequences of taps and typing where no logic is needed.
3.  **Smart Perception** (`get_screen_summary`): Use this first to get a quick overview of the screen. It's faster and cheaper than `get_screen`.
4.  **Deep Analysis**: Use `inspect_ui` or `get_screen` only when you need the full XML tree for complex element identification.

## 🧠 Intelligent Logic Handling

For tasks like **replying to messages** or **commenting**, use `run_ai_script` with the following logic:
1.  Use `read_messages()` to get the context of the conversation.
2.  Analyze the messages within your own reasoning.
3.  Use `reply("your generated response")` to automate the typing and sending process.

Example for auto-reply:
```python
msgs = read_messages()
if msgs and "hello" in msgs[-1].lower():
    reply("Hi there! How can I help you today?")
```

## 🛠️ Advanced Toolset

### run_ai_script
- **Purpose:** Execute complex Python logic locally on the host.
- **Available Functions:** `click(text/id/point)`, `type(text, enter=True)`, `wait(seconds)`, `wait_for(text, timeout)`, `home()`, `back()`, `find(text/id)`, `read_messages()`, `reply(text)`.

### execute_batch
- **Purpose:** Run a sequence of ADB actions (tap, type, keyevent) in one go.

### get_screen_summary
- **Purpose:** Get a token-efficient summary of interactive elements.

### smart_finder & visual_perception
- **Purpose:** Legacy tools for specific element finding and OCR/Image matching.

### inspect_ui & adb_logcat
- **Purpose:** System-level inspection and debugging.

## 📝 Important Notes
- Always explain the reason for the action in the `reason` field.
- If the screen is off, use `{"action": "home"}` to wake up the device.
- adb-control-gemini supports over 100 additional ADB commands; use them when deeper system intervention is needed.
