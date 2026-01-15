#!/usr/bin/env python3
"""
Get Screen State - Perception Module

Dumps Android UI accessibility tree and converts to structured JSON.
This is the "perception" step of the agent loop.

Usage:
    python get_screen.py                    # Output JSON to stdout
    python get_screen.py --verbose          # Include debug info
"""

import sys
import os
import json
import argparse
import xml.etree.ElementTree as ET
from typing import List, Dict, Optional

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from utils import adb_helper


SCREEN_DUMP_PATH = "/sdcard/window_dump.xml"
LOCAL_DUMP_PATH = "window_dump.xml"


def parse_interactive_elements(xml_content: str) -> List[Dict]:
    """
    Parse Android accessibility XML and return interactive elements.

    Filters for elements that are:
    - clickable=true OR
    - focusable=true OR
    - have text/content-desc

    Args:
        xml_content: Raw XML string from uiautomator dump

    Returns:
        List of element dictionaries with:
        - id: resource-id
        - text: text or content-desc
        - type: UI element class name
        - bounds: original bounds string
        - center: [x, y] coordinates
        - clickable: boolean
        - action: "tap" or "read"
    """
    try:
        root = ET.fromstring(xml_content)
    except ET.ParseError as e:
        print(json.dumps({"error": f"XML parse error: {str(e)}"}), file=sys.stderr)
        return []

    elements = []

    for node in root.iter():
        # Extract attributes
        is_clickable = node.attrib.get("clickable") == "true"
        is_focusable = node.attrib.get("focusable") == "true" or node.attrib.get("focus") == "true"
        text = node.attrib.get("text", "")
        desc = node.attrib.get("content-desc", "")
        resource_id = node.attrib.get("resource-id", "")

        # Skip empty containers with no interaction or information
        if not is_clickable and not is_focusable and not text and not desc:
            continue

        # Parse bounds: "[x1,y1][x2,y2]" → center coordinates
        bounds = node.attrib.get("bounds")
        if not bounds:
            continue

        try:
            # Extract coordinates: "[140,200][400,350]" → [140, 200, 400, 350]
            coords = bounds.replace("][", ",").replace("[", "").replace("]", "").split(",")
            x1, y1, x2, y2 = map(int, coords)

            center_x = (x1 + x2) // 2
            center_y = (y1 + y2) // 2

            element = {
                "id": resource_id,
                "text": text or desc,  # Fallback to content-desc if text is empty
                "type": node.attrib.get("class", "").split(".")[-1],  # Short class name
                "bounds": bounds,
                "center": [center_x, center_y],
                "clickable": is_clickable,
                "action": "tap" if is_clickable else "read"
            }
            elements.append(element)

        except (ValueError, IndexError):
            # Malformed bounds - skip this element
            continue

    return elements


def get_screen_state(verbose: bool = False) -> Dict:
    """
    Get current screen state from connected Android device.

    Steps:
    1. Dump UI hierarchy to device storage
    2. Pull XML file to local
    3. Parse and extract interactive elements
    4. Cleanup temp files

    Args:
        verbose: If True, include debug information

    Returns:
        Dictionary with:
        - elements: List of UI elements
        - error: Error message (if failed)
    """
    result = {"elements": [], "error": None}

    # Check device connection
    if not adb_helper.check_device_connected():
        result["error"] = "No Android device connected. Run 'adb devices' to check."
        return result

    try:
        # Step 1: Dump UI hierarchy on device
        if verbose:
            print(f"Dumping UI hierarchy to {SCREEN_DUMP_PATH}...", file=sys.stderr)

        stdout, stderr, code = adb_helper.run_adb([
            "shell", "uiautomator", "dump", SCREEN_DUMP_PATH
        ])

        if code != 0 or "ERROR" in stderr.upper():
            result["error"] = f"UI dump failed: {stderr}"
            return result

        # Step 2: Pull XML to local
        if verbose:
            print(f"Pulling XML to {LOCAL_DUMP_PATH}...", file=sys.stderr)

        stdout, stderr, code = adb_helper.run_adb([
            "pull", SCREEN_DUMP_PATH, LOCAL_DUMP_PATH
        ])

        if code != 0:
            result["error"] = f"Failed to pull XML: {stderr}"
            return result

        # Step 3: Read and parse XML
        if not os.path.exists(LOCAL_DUMP_PATH):
            result["error"] = "Window dump file not found after pull"
            return result

        with open(LOCAL_DUMP_PATH, "r", encoding="utf-8") as f:
            xml_content = f.read()

        elements = parse_interactive_elements(xml_content)
        result["elements"] = elements

        if verbose:
            print(f"Found {len(elements)} interactive elements", file=sys.stderr)

    except Exception as e:
        result["error"] = f"Unexpected error: {str(e)}"

    finally:
        # Step 4: Cleanup
        # Delete local XML file
        if os.path.exists(LOCAL_DUMP_PATH):
            try:
                os.remove(LOCAL_DUMP_PATH)
                if verbose:
                    print(f"Cleaned up {LOCAL_DUMP_PATH}", file=sys.stderr)
            except:
                pass

        # Delete XML from device
        adb_helper.run_adb(["shell", "rm", SCREEN_DUMP_PATH])
        if verbose:
            print(f"Cleaned up {SCREEN_DUMP_PATH} from device", file=sys.stderr)

    return result


def main():
    parser = argparse.ArgumentParser(
        description="Get current Android screen state as JSON"
    )
    parser.add_argument(
        "--verbose", "-v",
        action="store_true",
        help="Print debug information to stderr"
    )
    args = parser.parse_args()

    result = get_screen_state(verbose=args.verbose)

    if result["error"]:
        # Output error as JSON to stdout for consistent parsing
        print(json.dumps({"error": result["error"]}))
        sys.exit(1)
    else:
        # Output elements array as JSON
        print(json.dumps(result["elements"], indent=2))
        sys.exit(0)


if __name__ == "__main__":
    main()