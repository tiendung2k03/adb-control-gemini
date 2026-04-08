# Perception: Screen Analysis and Identification

AureDroid provides multiple ways for an AI agent to "see" and understand what is happening on an Android screen.

## 📱 UI Hierarchy Perception

The most accurate way to understand the screen is through the UI hierarchy (Accessibility Tree).

### `get_screen_summary` (Recommended)
- **Purpose:** Returns a token-efficient summary of only the most important interactive elements (text, description, ID, and coordinates).
- **Benefit:** Faster to execute and consumes fewer AI tokens, making it ideal for initial exploration.

### `get_screen`
- **Purpose:** Returns a full list of interactive elements, including their types and full resource IDs.
- **Benefit:** Essential when precise identification (e.g., differentiating between two similar buttons) is required.

### `inspect_ui`
- **Purpose:** Dumps the full, raw XML hierarchy of the screen.
- **Benefit:** For expert debugging or when the standard tools fail to capture a specific element.

## 👁️ Visual Perception (OpenCV)

AureDroid integrates OpenCV for scenarios where UI hierarchy is not available (e.g., within games, maps, or custom-rendered apps).

### `visual_perception`
- **How it works:** Uses **Template Matching** to find a specific image on the current screen.
- **Setup:**
  1. Save template images (e.g., a specific button icon) as `.png` or `.jpg` in a directory.
  2. Provide the directory path and the name of the template to the tool.
- **Use Cases:** Finding specific icons, buttons in non-standard apps, or checking for visual changes.

## 🔍 Smart Finder

The `smart_finder` tool is a high-level search utility that automatically scans the UI hierarchy for elements matching a query.

- **Query:** Can be a partial string of text, ID, or description.
- **Result:** Returns the center coordinates of all matching elements.
- **Strategy:** Often used internally by `run_ai_script` for efficient element identification.
