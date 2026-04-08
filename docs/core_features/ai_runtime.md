# High-Speed Automation with AI Runtime

The **AI Runtime** is the most powerful feature of AureDroid. It allows the AI agent to execute complex Python scripts directly on the host machine, interacting with the Android device without the need for constant round-trips to the AI model.

## 🚀 Why use AI Runtime?

- **Low Latency:** Multi-step actions happen instantly without waiting for AI reasoning between each step.
- **Complex Logic:** Use Python's logic (loops, conditionals) to handle dynamic UI states.
- **High Success Rate:** Wait for elements to appear or retry actions based on screen feedback.

## 🛠 Available Functions

When using the `run_ai_script` tool, the following functions are pre-imported and ready to use:

| Function | Description |
|---|---|
| `click(text/id/point/query)` | Clicks on an element by text, resource ID, or coordinates. |
| `type(text, enter=True)` | Types text into the focused field and optionally presses Enter. |
| `wait(seconds)` | Pauses the script execution for a given duration. |
| `wait_for(query, timeout=10)` | Waits for an element to appear on the screen. |
| `find(text/id/query)` | Returns the center coordinates of an element if found. |
| `get_elements()` | Returns a list of all interactive elements on the screen. |
| `read_messages()` | Extracts visible messages from chat applications. |
| `reply(text)` | Finds an input field, types the text, and sends it. |
| `home()` | Returns the device to the Home screen. |
| `back()` | Simulates pressing the Back button. |

## 📝 Example Script: Auto-Reply to WhatsApp

```python
# Wait for WhatsApp to be open and messages to appear
if wait_for("WhatsApp", timeout=5):
    msgs = read_messages()
    if msgs:
        last_msg = msgs[-1].lower()
        if "hello" in last_msg:
            reply("Hi! How can I help you today?")
        elif "price" in last_msg:
            reply("The price list is pinned at the top of the group.")
```

## 🧠 Best Practices for AI

1.  **Always use `wait_for`** before interacting with a new screen to ensure the UI is loaded.
2.  **Combine multiple actions** into a single script to minimize execution costs.
3.  **Check for existence** using `find()` before calling `click()` if the UI might change.
