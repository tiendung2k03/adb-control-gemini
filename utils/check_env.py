#!/usr/bin/env python3
import sys
import os
import subprocess
import shutil

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from utils import adb_helper

def check_env():
    print("--- Checking Android Agent Environment ---")
    
    # 1. Check Python version
    print(f"Python version: {sys.version.split()[0]}")
    
    # 2. Check ADB
    adb_path = shutil.which("adb")
    if adb_path:
        print(f"ADB found at: {adb_path}")
        try:
            version = subprocess.check_output([adb_path, "version"], text=True).splitlines()[0]
            print(f"ADB version: {version}")
        except:
            print("Could not get ADB version.")
    else:
        print("ERROR: ADB not found in PATH.")
    
    # 3. Check Device Connection
    if adb_helper.check_device_connected():
        device_id = adb_helper.get_connected_device_id()
        print(f"Device connected: {device_id}")
    else:
        print("WARNING: No Android device connected or authorized.")
    
    # 4. Check dependencies
    try:
        import PIL
        print("Pillow (PIL) is installed.")
    except ImportError:
        print("WARNING: Pillow is not installed. Screenshot features might be limited.")

if __name__ == "__main__":
    check_env()