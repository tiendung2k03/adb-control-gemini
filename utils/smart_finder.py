#!/usr/bin/env python3
import sys
import os
import json
import xml.etree.ElementTree as ET
from typing import List, Dict, Optional

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from utils import adb_helper

SCREEN_DUMP_PATH = "/sdcard/nexus_dump.xml"
LOCAL_DUMP_PATH = "nexus_dump.xml"

def get_xml_dump():
    """Dumps UI hierarchy and pulls it to local."""
    try:
        adb_helper.run_adb(["shell", "uiautomator", "dump", SCREEN_DUMP_PATH])
        adb_helper.run_adb(["pull", SCREEN_DUMP_PATH, LOCAL_DUMP_PATH])
        if os.path.exists(LOCAL_DUMP_PATH):
            with open(LOCAL_DUMP_PATH, "r", encoding="utf-8") as f:
                content = f.read()
            os.remove(LOCAL_DUMP_PATH)
            return content
    except Exception as e:
        return None
    return None

def parse_bounds(bounds_str: str):
    """Parses '[x1,y1][x2,y2]' into center (x, y)."""
    try:
        coords = bounds_str.replace("][", ",").replace("[", "").replace("]", "").split(",")
        x1, y1, x2, y2 = map(int, coords)
        return (x1 + x2) // 2, (y1 + y2) // 2
    except:
        return None

def find_element(query: str, search_type: str = "auto"):
    """
    Finds an element based on a query string.
    search_type: 'auto', 'text', 'id', 'desc', ...
    """
    xml_content = get_xml_dump()
    if not xml_content:
        return {"error": "Failed to get UI dump"}

    try:
        root = ET.fromstring(xml_content)
    except:
        return {"error": "Failed to parse XML"}

    results = []
    query_lower = query.lower()

    for node in root.iter():
        text = node.attrib.get("text", "")
        resource_id = node.attrib.get("resource-id", "")
        content_desc = node.attrib.get("content-desc", "")
        bounds = node.attrib.get("bounds", "")

        match = False
        if search_type == "text" and query_lower in text.lower():
            match = True
        elif search_type == "id" and query_lower in resource_id.lower():
            match = True
        elif search_type == "desc" and query_lower in content_desc.lower():
            match = True
        elif search_type == "auto":
            if query_lower in text.lower() or query_lower in resource_id.lower() or query_lower in content_desc.lower():
                match = True

        if match and bounds:
            center = parse_bounds(bounds)
            if center:
                results.append({
                    "text": text,
                    "id": resource_id,
                    "desc": content_desc,
                    "center": center,
                    "class": node.attrib.get("class", "")
                })

    return {"elements": results}

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "Query required"}))
        sys.exit(1)
    
    query = sys.argv[1]
    search_type = sys.argv[2] if len(sys.argv) > 2 else "auto"
    print(json.dumps(find_element(query, search_type), indent=2))
