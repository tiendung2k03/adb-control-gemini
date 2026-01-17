#!/usr/bin/env python3
import sys
import os
import json

# Add current directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from get_screen import get_screen_state

def get_summary():
    state = get_screen_state()
    if state.get("error"):
        return state
    
    elements = state.get("elements", [])
    summary = []
    for el in elements:
        # Only include elements with text or meaningful IDs
        if el.get("text") or (el.get("id") and "id/" in el.get("id")):
            summary.append({
                "text": el.get("text"),
                "id": el.get("id").split("/")[-1] if el.get("id") else None,
                "center": el.get("center"),
                "type": el.get("type")
            })
    
    return summary

if __name__ == "__main__":
    print(json.dumps(get_summary(), indent=2))
