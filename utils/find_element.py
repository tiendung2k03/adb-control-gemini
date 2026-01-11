#!/usr/bin/env python3
"""
Find Element - Utility Module

Finds UI elements on the Android screen based on various criteria.
Uses output from get_screen.py.

Usage:
    python find_element.py --text "Settings"
    python find_element.py --type "EditText" --clickable true
"""

import sys
import os
import json
import argparse
from typing import List, Dict, Any, Optional

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from utils import get_screen


def find_element(
    text: Optional[str] = None,
    element_type: Optional[str] = None,
    resource_id: Optional[str] = None,
    clickable: Optional[bool] = None
) -> List[Dict[str, Any]]:
    """
    Finds UI elements on the current screen based on provided criteria.

    Args:
        text: Text or content-desc of the element.
        element_type: Type of the UI element (e.g., "EditText", "Button").
        resource_id: Resource ID of the element.
        clickable: Boolean indicating if the element should be clickable.

    Returns:
        A list of matching UI elements.
    """
    screen_state = get_screen.get_screen_state()
    if screen_state["error"]:
        print(json.dumps({"error": screen_state["error"]}), file=sys.stderr)
        return []

    elements = screen_state["elements"]
    matching_elements = []

    for element in elements:
        match = True
        if text is not None and text.lower() not in element.get("text", "").lower():
            match = False
        if element_type is not None and element_type.lower() != element.get("type", "").lower():
            match = False
        if resource_id is not None and resource_id != element.get("id", ""):
            match = False
        if clickable is not None and clickable != element.get("clickable", False):
            match = False
        
        if match:
            matching_elements.append(element)
    
    return matching_elements


def main():
    parser = argparse.ArgumentParser(
        description="Finds UI elements on the current Android screen."
    )
    parser.add_argument(
        "--text",
        type=str,
        help="Text or content-desc of the element to find."
    )
    parser.add_argument(
        "--type",
        dest="element_type", # Map to element_type in find_element function
        type=str,
        help="Type of the UI element (e.g., 'EditText', 'Button')."
    )
    parser.add_argument(
        "--id",
        dest="resource_id", # Map to resource_id in find_element function
        type=str,
        help="Resource ID of the element to find."
    )
    parser.add_argument(
        "--clickable",
        type=str,
        choices=['true', 'false'],
        help="Whether the element should be clickable ('true' or 'false')."
    )
    args = parser.parse_args()

    # Convert clickable string to boolean
    clickable_bool = None
    if args.clickable == 'true':
        clickable_bool = True
    elif args.clickable == 'false':
        clickable_bool = False

    found_elements = find_element(
        text=args.text,
        element_type=args.element_type,
        resource_id=args.resource_id,
        clickable=clickable_bool
    )

    print(json.dumps(found_elements, indent=2))
    if not found_elements:
        sys.exit(1) # Indicate failure if no elements are found
    else:
        sys.exit(0)


if __name__ == "__main__":
    main()