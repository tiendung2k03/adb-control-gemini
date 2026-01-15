#!/usr/bin/env python3
import sys
import os
import json
import cv2
import numpy as np

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from utils import adb_helper

SCREENSHOT_PATH = "screen.png"

def find_image_in_screen(template_path: str, threshold: float = 0.8):
    """
    Finds a template image on the current screen using OpenCV Template Matching.
    """
    if not os.path.exists(template_path):
        return {"error": f"Template file not found: {template_path}"}

    # 1. Take screenshot
    try:
        adb_helper.run_adb(["shell", "screencap", "-p", "/sdcard/screen.png"])
        adb_helper.run_adb(["pull", "/sdcard/screen.png", SCREENSHOT_PATH])
    except Exception as e:
        return {"error": f"Failed to take screenshot: {str(e)}"}

    if not os.path.exists(SCREENSHOT_PATH):
        return {"error": "Screenshot file not found after pull"}

    # 2. Load images
    screen = cv2.imread(SCREENSHOT_PATH)
    template = cv2.imread(template_path)
    
    if screen is None or template is None:
        return {"error": "Failed to load images for processing. Ensure template is a valid image."}

    # 3. Template Matching
    result = cv2.matchTemplate(screen, template, cv2.TM_CCOEFF_NORMED)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)

    # Cleanup
    if os.path.exists(SCREENSHOT_PATH):
        os.remove(SCREENSHOT_PATH)

    if max_val >= threshold:
        # Get center of the match
        h, w = template.shape[:2]
        center_x = max_loc[0] + w // 2
        center_y = max_loc[1] + h // 2
        return {
            "status": "success",
            "center": [center_x, center_y],
            "confidence": float(max_val)
        }
    else:
        return {
            "status": "not_found",
            "confidence": float(max_val),
            "threshold": threshold
        }

def scan_directory_for_template(directory: str, template_name: str, threshold: float = 0.8):
    """
    Scans a directory for an image file matching the template_name and finds it on screen.
    """
    if not os.path.isdir(directory):
        return {"error": f"Directory not found: {directory}"}
    
    # Try common extensions
    for ext in ['.png', '.jpg', '.jpeg']:
        path = os.path.join(directory, template_name + ext)
        if os.path.exists(path):
            return find_image_in_screen(path, threshold)
            
    return {"error": f"Template '{template_name}' not found in {directory}"}

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Usage: visual_perception.py <directory> <template_name> [threshold]"}))
        sys.exit(1)
    
    directory = sys.argv[1]
    template_name = sys.argv[2]
    threshold = float(sys.argv[3]) if len(sys.argv) > 3 else 0.8
    
    print(json.dumps(scan_directory_for_template(directory, template_name, threshold), indent=2))
