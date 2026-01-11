#!/usr/bin/env python
"""
Execute Action - Action Module

Executes a single action on the Android device via ADB.
This is the "action" step of the agent loop.

Usage:
    echo '{"action":"tap","coordinates":[540,1200]}' | python execute_action.py
    python execute_action.py --json '{"action":"home"}'
"""

import sys
import os
import json
import argparse
import time
from datetime import datetime
from typing import Dict, Any

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from utils import adb_helper

# --- START VIETNAMESE TELEX CONVERSION ---
ACCENT_MAP = {
    'a': ['a', 'á', 'à', 'ả', 'ã', 'ạ'],
    'ă': ['ă', 'ắ', 'ằ', 'ẳ', 'ẵ', 'ặ'],
    'â': ['â', 'ấ', 'ầ', 'ẩ', 'ẫ', 'ậ'],
    'e': ['e', 'é', 'è', 'ẻ', 'ẽ', 'ẹ'],
    'ê': ['ê', 'ế', 'ề', 'ể', 'ễ', 'ệ'],
    'i': ['i', 'í', 'ì', 'ỉ', 'ĩ', 'ị'],
    'o': ['o', 'ó', 'ò', 'ỏ', 'õ', 'ọ'],
    'ô': ['ô', 'ố', 'ồ', 'ổ', 'ỗ', 'ộ'],
    'ơ': ['ơ', 'ớ', 'ờ', 'ở', 'ỡ', 'ợ'],
    'u': ['u', 'ú', 'ù', 'ủ', 'ũ', 'ụ'],
    'ư': ['ư', 'ứ', 'ừ', 'ử', 'ữ', 'ự'],
    'y': ['y', 'ý', 'ỳ', 'ỷ', 'ỹ', 'ỵ']
}

TONE_MARKS = {
    's': 1, # sharp
    'f': 2, # falling
    'r': 3, # asking
    'x': 4, # tilde
    'j': 5, # dot
    'z': 0  # remove tone
}

# Mapping for special characters like 'aa' -> 'â'
SPECIAL_CHARS = {
    'aa': 'â', 'AA': 'Â',
    'aw': 'ă', 'AW': 'Ă',
    'ee': 'ê', 'EE': 'Ê',
    'oo': 'ô', 'OO': 'Ô',
    'ow': 'ơ', 'OW': 'Ơ',
    'uw': 'ư', 'UW': 'Ư',
    'dd': 'đ', 'DD': 'Đ'
}

VOWELS = "aeiouyAEIOUYăâêôơưĂÂÊÔƠƯ"

def convert_telex_to_vietnamese(text: str) -> str:
    
    def get_base_vowel(char: str) -> str:
        # Check if the character is an accented vowel or a base vowel (case-insensitive)
        char_lower = char.lower()
        for base, accents in ACCENT_MAP.items():
            if char_lower in [v.lower() for v in accents]:
                return base
        return char_lower # If not found in ACCENT_MAP, return its lowercase

    def apply_tone(vowel_char: str, tone_index: int) -> str:
        is_upper = vowel_char.isupper()
        base_vowel = get_base_vowel(vowel_char) # Get base vowel, already lowercased from get_base_vowel
        
        if base_vowel in ACCENT_MAP and 0 <= tone_index < len(ACCENT_MAP[base_vowel]):
            result_vowel = ACCENT_MAP[base_vowel][tone_index]
            return result_vowel.upper() if is_upper else result_vowel
        return vowel_char # Return original if cannot apply tone

    output_chars = []
    i = 0
    
    # Process text character by character
    while i < len(text):
        matched_special = False
        # Try to match longest special character sequences first
        for telex_seq, viet_char in sorted(SPECIAL_CHARS.items(), key=lambda x: len(x[0]), reverse=True):
            if text[i:i+len(telex_seq)].lower() == telex_seq.lower(): # Case-insensitive match for telex_seq
                output_chars.append(viet_char)
                i += len(telex_seq)
                matched_special = True
                break
        
        if matched_special:
            continue # Move to next character after replacement

        # If no special character sequence matched, handle single character
        current_char = text[i]

        if current_char.lower() in TONE_MARKS:
            tone_index = TONE_MARKS[current_char.lower()]
            
            # Find the target vowel for tone application in `output_chars`
            target_vowel_idx = -1
            # Search backward in output_chars from its end
            for j in range(len(output_chars) - 1, -1, -1):
                if not output_chars[j].isalpha(): # Word boundary
                    break
                # Check if it's a vowel that can take a tone
                if get_base_vowel(output_chars[j]) in ACCENT_MAP:
                    target_vowel_idx = j
                    break
            
            if target_vowel_idx != -1:
                # Apply the tone to the found vowel
                original_vowel_char = output_chars[target_vowel_idx]
                modified_vowel_char = apply_tone(original_vowel_char, tone_index)
                output_chars[target_vowel_idx] = modified_vowel_char
                # The tone mark character itself is consumed and not added to output_chars
            # Else: If no vowel found or not applicable, just drop the tone mark
        else:
            # Not a special sequence, not a tone mark, just append the character
            output_chars.append(current_char)
        
        i += 1 # Move to next input character
            
    return "".join(output_chars)

# --- END VIETNAMESE TELEX CONVERSION ---

LOG_FILE = "logs/execution.log"


def log_action(action_type: str, details: str, status: str):
    """
    Log action execution to file.

    Args:
        action_type: Type of action (tap, type, home, etc.)
        details: Action details (coordinates, text, etc.)
        status: SUCCESS or ERROR
    """
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_entry = f"[{timestamp}] ACTION: {action_type}({details}) -> {status}\n"

    try:
        os.makedirs("logs", exist_ok=True)
        with open(LOG_FILE, "a", encoding="utf-8") as f:
            f.write(log_entry)
    except:
        pass  # Don't fail action execution due to logging errors


def validate_action(action: Dict[str, Any]) -> tuple[bool, str]:
    """
    Validate action JSON format.

    Args:
        action: Action dictionary

    Returns:
        Tuple of (is_valid, error_message)
    """
    if not isinstance(action, dict):
        return False, "Action must be a JSON object"

    if "action" not in action:
        return False, "Missing 'action' field"

    action_type = action["action"]
    valid_actions = ["tap", "type", "home", "back", "wait", "done", "start_intent", "swipe", "open_app", "screenshot", "long_press", "drag_and_drop", "get_current_package"]

    if action_type not in valid_actions:
        return False, f"Invalid action type '{action_type}'. Must be one of: {valid_actions}"

    # Validate action-specific fields
    if action_type == "tap":
        if "coordinates" not in action:
            return False, "tap action requires 'coordinates' field"
        coords = action["coordinates"]
        if not isinstance(coords, list) or len(coords) != 2:
            return False, "coordinates must be [x, y] array"
        if not all(isinstance(c, (int, float)) for c in coords):
            return False, "coordinates must be numeric"

    elif action_type == "type":
        if "text" not in action:
            return False, "type action requires 'text' field"
        if not isinstance(action["text"], str):
            return False, "text must be a string"
    
    elif action_type == "start_intent":
        if "uri" not in action:
            return False, "start_intent action requires 'uri' field"
        if not isinstance(action["uri"], str):
            return False, "uri must be a string"
        if "package" not in action:
            return False, "package must be a string"
        if not isinstance(action["package"], str):
            return False, "package must be a string"
    
    elif action_type == "swipe":
        if "start_coordinates" not in action:
            return False, "swipe action requires 'start_coordinates' field"
        start_coords = action["start_coordinates"]
        if not isinstance(start_coords, list) or len(start_coords) != 2:
            return False, "start_coordinates must be [x, y] array"
        if not all(isinstance(c, (int, float)) for c in start_coords):
            return False, "coordinates must be numeric"

        if "end_coordinates" not in action:
            return False, "end_coordinates must be [x, y] array"
        end_coords = action["end_coordinates"]
        if not isinstance(end_coords, list) or len(end_coords) != 2:
            return False, "end_coordinates must be [x, y] array"
        if not all(isinstance(c, (int, float)) for c in end_coords):
            return False, "coordinates must be numeric"
        
        if "duration" in action:
            if not isinstance(action["duration"], (int, float)):
                return False, "duration must be a number"
            if action["duration"] < 0:
                return False, "duration cannot be negative"
    
    elif action_type == "open_app":
        if "package_name" not in action:
            return False, "open_app action requires 'package_name' field"
        if not isinstance(action["package_name"], str):
            return False, "package_name must be a string"

    elif action_type == "screenshot":
        if "file_path" in action and not isinstance(action["file_path"], str):
            return False, "file_path must be a string if provided"

    elif action_type == "long_press":
        if "coordinates" not in action:
            return False, "long_press action requires 'coordinates' field"
        coords = action["coordinates"]
        if not isinstance(coords, list) or len(coords) != 2:
            return False, "coordinates must be [x, y] array"
        if "duration" in action and not isinstance(action["duration"], (int, float)):
            return False, "duration must be a number"

    elif action_type == "drag_and_drop":
        if "start_coordinates" not in action or "end_coordinates" not in action:
            return False, "drag_and_drop action requires 'start_coordinates' and 'end_coordinates' fields"
        if not isinstance(action["start_coordinates"], list) or len(action["start_coordinates"]) != 2:
            return False, "start_coordinates must be [x, y] array"
        if not isinstance(action["end_coordinates"], list) or len(action["end_coordinates"]) != 2:
            return False, "end_coordinates must be [x, y] array"

    return True, ""


def execute_action(action: Dict[str, Any]) -> Dict[str, Any]:
    """
    Execute a single action on the Android device.

    Args:
        action: Action dictionary with format:
            {"action": "tap", "coordinates": [x, y], "reason": "..."}
            {"action": "type", "text": "Hello", "reason": "..."}
            {"action": "home", "reason": "..."}
            {"action": "back", "reason": "..."}
            {"action": "wait", "reason": "..."}
            {"action": "done", "reason": "..."}

    Returns:
        Result dictionary:
            {"status": "success", "action": "tap", "message": "..."}
            {"status": "error", "message": "..."}
    """
    # Validate action format
    is_valid, error_msg = validate_action(action)
    if not is_valid:
        return {"status": "error", "message": error_msg}

    # Check device connection (except for done/wait)
    action_type = action["action"]
    if action_type not in ["done", "wait"]:
        if not adb_helper.check_device_connected():
            return {
                "status": "error",
                "message": "No Android device connected"
            }

    # Execute action
    try:
        if action_type == "tap":
            x, y = action["coordinates"]
            x, y = int(x), int(y)

            stdout, stderr, code = adb_helper.run_adb([
                "shell", "input", "tap", str(x), str(y)
            ])

            if code != 0:
                log_action("tap", f"{x},{y}", f"ERROR: {stderr}")
                return {
                    "status": "error",
                    "message": f"Tap failed: {stderr}"
                }

            log_action("tap", f"{x},{y}", "SUCCESS")
            return {
                "status": "success",
                "action": "tap",
                "message": f"Tapped at ({x}, {y})"
            }

        elif action_type == "type":
            text = convert_telex_to_vietnamese(action["text"])
            # Enclose the text in single quotes for adb shell to handle spaces and special characters correctly
            # The 'adb shell input text' command generally handles spaces correctly when the entire string is quoted.
            # Using '%s' for spaces is typically for direct adb commands without Python's quoting.
            # However, the primary limitation observed is with Unicode characters, not spaces.
            quoted_text = f"'{text}'" 

            stdout, stderr, code = adb_helper.run_adb([
                "shell", "input", "text", quoted_text
            ])

            if code != 0:
                log_action("type", text, f"ERROR: {stderr}")
                return {
                    "status": "error",
                    "message": f"Type failed: {stderr}"
                }

            log_action("type", text, "SUCCESS")
            return {
                "status": "success",
                "action": "type",
                "message": f"Typed: {text}"
            }

        elif action_type == "home":
            stdout, stderr, code = adb_helper.run_adb([
                "shell", "input", "keyevent", "KEYCODE_HOME"  # FIX: was KEYWORDS_HOME
            ])

            if code != 0:
                log_action("home", "", f"ERROR: {stderr}")
                return {
                    "status": "error",
                    "message": f"Home failed: {stderr}"
                }

            log_action("home", "", "SUCCESS")
            return {
                "status": "success",
                "action": "home",
                "message": "Pressed Home button"
            }

        elif action_type == "back":
            stdout, stderr, code = adb_helper.run_adb([
                "shell", "input", "keyevent", "KEYCODE_BACK"  # FIX: was KEYWORDS_BACK
            ])

            if code != 0:
                log_action("back", "", f"ERROR: {stderr}")
                return {
                    "status": "error",
                    "message": f"Back failed: {stderr}"
                }

            log_action("back", "", "SUCCESS")
            return {
                "status": "success",
                "action": "back",
                "message": "Pressed Back button"
            }

        elif action_type == "wait":
            time.sleep(2)
            log_action("wait", "2s", "SUCCESS")
            return {
                "status": "success",
                "action": "wait",
                "message": "Waited 2 seconds"
            }

        elif action_type == "done":
            log_action("done", "", "SUCCESS")
            return {
                "status": "success",
                "action": "done",
                "message": "Goal achieved - task complete"
            }

        elif action_type == "start_intent":
            uri = action["uri"]
            package = action["package"]
            
            stdout, stderr, code = adb_helper.run_adb([
                "shell", "am", "start", "-a", "android.intent.action.VIEW",
                "-d", uri, package
            ])

            if code != 0:
                log_action("start_intent", f"uri={uri}, package={package}", f"ERROR: {stderr}")
                return {
                    "status": "error",
                    "message": f"Start Intent failed: {stderr}"
                }

            log_action("start_intent", f"uri={uri}, package={package}", "SUCCESS")
            return {
                "status": "success",
                "action": "start_intent",
                "message": f"Started intent with URI: {uri} and package: {package}"
            }
        
        elif action_type == "swipe":
            start_x, start_y = action["start_coordinates"]
            end_x, end_y = action["end_coordinates"]
            duration = action.get("duration")

            adb_command = [
                "shell", "input", "swipe",
                str(int(start_x)), str(int(start_y)),
                str(int(end_x)), str(int(end_y))
            ]
            if duration is not None:
                adb_command.append(str(int(duration)))

            stdout, stderr, code = adb_helper.run_adb(adb_command)

            details = f"start=[{start_x},{start_y}], end=[{end_x},{end_y}]"
            if duration is not None:
                details += f", duration={duration}"

            if code != 0:
                log_action("swipe", details, f"ERROR: {stderr}")
                return {
                    "status": "error",
                    "message": f"Swipe failed: {stderr}"
                }

            log_action("swipe", details, "SUCCESS")
            return {
                "status": "success",
                "action": "swipe",
                "message": f"Swiped from [{start_x},{start_y}] to [{end_x},{end_y}]" + (f" over {duration}ms" if duration else "")
            }

        elif action_type == "open_app":
            package_name = action["package_name"]

            stdout, stderr, code = adb_helper.run_adb([
                "shell", "monkey", "-p", package_name,
                "-c", "android.intent.category.LAUNCHER", "1"
            ])

            if code != 0:
                log_action("open_app", f"package_name={package_name}", f"ERROR: {stderr}")
                return {
                    "status": "error",
                    "message": f"Open app failed: {stderr}"
                }

            log_action("open_app", f"package_name={package_name}", "SUCCESS")
            return {
                "status": "success",
                "action": "open_app",
                "message": f"Opened app with package: {package_name}"
            }

        elif action_type == "screenshot":
            local_file_path = action.get("file_path")
            
            # Generate a temporary file name on the device
            device_screenshot_path = f"/sdcard/screenshot_{int(time.time())}.png"

            # Capture screenshot on device
            stdout, stderr, code = adb_helper.run_adb([
                "shell", "screencap", "-p", device_screenshot_path
            ])
            if code != 0:
                log_action("screenshot", device_screenshot_path, f"ERROR: {stderr}")
                return {
                    "status": "error",
                    "message": f"Screenshot failed on device: {stderr}"
                }
            
            message = f"Screenshot saved on device: {device_screenshot_path}"
            
            # If local_file_path is provided, pull the screenshot to local machine
            if local_file_path:
                stdout, stderr, code = adb_helper.run_adb([
                    "pull", device_screenshot_path, local_file_path
                ])
                if code != 0:
                    log_action("screenshot", local_file_path, f"ERROR: {stderr}")
                    # Still return success for device capture if pull failed
                    return {
                        "status": "warning",
                        "message": f"Screenshot saved on device but failed to pull to local: {stderr}"
                    }
                message = f"Screenshot saved to local: {local_file_path} (also on device: {device_screenshot_path})"
            
            # Clean up screenshot on device (optional, but good practice)
            adb_helper.run_adb(["shell", "rm", device_screenshot_path])

            log_action("screenshot", local_file_path or device_screenshot_path, "SUCCESS")
            return {
                "status": "success",
                "action": "screenshot",
                "message": message
            }

        elif action_type == "long_press":
            x, y = action["coordinates"]
            duration = action.get("duration", 1000) # Default 1s

            stdout, stderr, code = adb_helper.run_adb([
                "shell", "input", "swipe", str(x), str(y), str(x), str(y), str(int(duration))
            ])

            if code != 0:
                log_action("long_press", f"{x},{y}, duration={duration}", f"ERROR: {stderr}")
                return {"status": "error", "message": f"Long press failed: {stderr}"}

            log_action("long_press", f"{x},{y}, duration={duration}", "SUCCESS")
            return {"status": "success", "action": "long_press", "message": f"Long pressed at ({x}, {y}) for {duration}ms"}

        elif action_type == "drag_and_drop":
            sx, sy = action["start_coordinates"]
            ex, ey = action["end_coordinates"]
            duration = action.get("duration", 1000)

            stdout, stderr, code = adb_helper.run_adb([
                "shell", "input", "draganddrop", str(sx), str(sy), str(ex), str(ey), str(int(duration))
            ])

            if code != 0:
                # Fallback to swipe if draganddrop is not supported on older Android versions
                stdout, stderr, code = adb_helper.run_adb([
                    "shell", "input", "swipe", str(sx), str(sy), str(ex), str(ey), str(int(duration))
                ])
                if code != 0:
                    log_action("drag_and_drop", f"from={sx},{sy}, to={ex},{ey}", f"ERROR: {stderr}")
                    return {"status": "error", "message": f"Drag and drop failed: {stderr}"}

            log_action("drag_and_drop", f"from={sx},{sy}, to={ex},{ey}", "SUCCESS")
            return {"status": "success", "action": "drag_and_drop", "message": f"Dragged from ({sx}, {sy}) to ({ex}, {ey})"}

        elif action_type == "get_current_package":
            stdout, stderr, code = adb_helper.run_adb([
                "shell", "dumpsys", "window", "|", "grep", "-E", "'mCurrentFocus|mFocusedApp'"
            ])
            
            if code != 0:
                log_action("get_current_package", "", f"ERROR: {stderr}")
                return {"status": "error", "message": f"Failed to get current package: {stderr}"}

            log_action("get_current_package", stdout, "SUCCESS")
            return {"status": "success", "action": "get_current_package", "message": stdout}

    except Exception as e:
        log_action(action_type, "", f"ERROR: {str(e)}")
        return {
            "status": "error",
            "message": f"Execution error: {str(e)}"
        }


def main():
    parser = argparse.ArgumentParser(
        description="Execute a single action on Android device"
    )
    parser.add_argument(
        "--json",
        type=str,
        help="Action JSON string (alternative to stdin)"
    )
    args = parser.parse_args()

    # Get action JSON from --json flag or stdin
    if args.json:
        action_json = args.json
    else:
        action_json = sys.stdin.read().strip()

    if not action_json:
        print(json.dumps({
            "status": "error",
            "message": "No action provided. Use --json flag or pipe JSON via stdin"
        }))
        sys.exit(1)

    # Parse JSON
    try:
        action = json.loads(action_json)
    except json.JSONDecodeError as e:
        print(json.dumps({
            "status": "error",
            "message": f"Invalid JSON: {str(e)}"
        }))
        sys.exit(1)

    # Execute action
    result = execute_action(action)

    # Output result
    print(json.dumps(result, indent=2))

    # Exit with appropriate code
    if result["status"] == "error":
        sys.exit(3)
    elif result.get("action") == "done":
        sys.exit(0)
    else:
        sys.exit(0)


if __name__ == "__main__":
    main()