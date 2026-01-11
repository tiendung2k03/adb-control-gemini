#!/usr/bin/env python3
"""
Manage App - Utility Module

Performs various application management actions via ADB.

Usage:
    python manage_app.py --action list
    python manage_app.py --action install --apk_path "/path/to/your/app.apk"
    python manage_app.py --action uninstall --package_name "com.example.app"
    python manage_app.py --action clear --package_name "com.example.app"
"""

import sys
import os
import json
import argparse
import re
from typing import Dict, Any, List, Optional

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from utils import adb_helper


def manage_app(
    action: str,
    package_name: Optional[str] = None,
    apk_path: Optional[str] = None
) -> Dict[str, Any]:
    """
    Performs various application management actions.

    Args:
        action: The action to perform ("list", "install", "uninstall", "clear").
        package_name: The package name of the application (required for "uninstall", "clear").
        apk_path: The path to the APK file (required for "install").

    Returns:
        A dictionary containing the result of the operation.
    """
    result: Dict[str, Any] = {"action": action, "success": False, "message": ""}

    if not adb_helper.check_device_connected():
        result["message"] = "No Android device connected. Run 'adb devices' to check."
        return result

    try:
        adb_command: List[str] = []
        if action == "list":
            adb_command = ["shell", "pm", "list", "packages"]
            stdout, stderr, code = adb_helper.run_adb(adb_command)
            if code == 0:
                packages = [line.replace("package:", "") for line in stdout.splitlines() if line.startswith("package:")]
                result["success"] = True
                result["packages"] = packages
                result["message"] = f"Listed {len(packages)} packages."
            else:
                result["message"] = f"Failed to list packages: {stderr}"
        
        elif action == "install":
            if not apk_path:
                result["message"] = "apk_path is required for install action."
                return result
            if not os.path.exists(apk_path):
                result["message"] = f"APK file not found at: {apk_path}"
                return result
            
            adb_command = ["install", apk_path] # adb install is a direct adb command
            stdout, stderr, code = adb_helper.run_adb(adb_command)
            if code == 0 and "Success" in stdout:
                result["success"] = True
                result["message"] = f"Successfully installed {os.path.basename(apk_path)}"
            else:
                result["message"] = f"Failed to install {os.path.basename(apk_path)}: {stderr or stdout}"

        elif action == "uninstall":
            if not package_name:
                result["message"] = "package_name is required for uninstall action."
                return result
            
            adb_command = ["shell", "pm", "uninstall", package_name]
            stdout, stderr, code = adb_helper.run_adb(adb_command)
            if code == 0 and "Success" in stdout:
                result["success"] = True
                result["message"] = f"Successfully uninstalled {package_name}"
            else:
                result["message"] = f"Failed to uninstall {package_name}: {stderr or stdout}"

        elif action == "clear":
            if not package_name:
                result["message"] = "package_name is required for clear action."
                return result
            
            adb_command = ["shell", "pm", "clear", package_name]
            stdout, stderr, code = adb_helper.run_adb(adb_command)
            if code == 0 and "Success" in stdout:
                result["success"] = True
                result["message"] = f"Successfully cleared data for {package_name}"
            else:
                result["message"] = f"Failed to clear data for {package_name}: {stderr or stdout}"
        
        else:
            result["message"] = f"Unknown action: {action}"

    except Exception as e:
        result["message"] = f"Unexpected error: {str(e)}"

    return result


def main():
    parser = argparse.ArgumentParser(
        description="Performs various Android application management actions."
    )
    parser.add_argument(
        "--action",
        type=str,
        choices=["list", "install", "uninstall", "clear"],
        required=True,
        help="The action to perform (list, install, uninstall, clear)."
    )
    parser.add_argument(
        "--package_name",
        type=str,
        help="The package name of the application (required for uninstall, clear)."
    )
    parser.add_argument(
        "--apk_path",
        type=str,
        help="The path to the APK file on the local machine (required for install)."
    )
    args = parser.parse_args()

    # Validate args based on action
    if args.action in ["uninstall", "clear"] and not args.package_name:
        print(json.dumps({"success": False, "message": f"package_name is required for '{args.action}' action."}), indent=2)
        sys.exit(1)
    if args.action == "install" and not args.apk_path:
        print(json.dumps({"success": False, "message": "apk_path is required for 'install' action."}), indent=2)
        sys.exit(1)


    info = manage_app(
        action=args.action,
        package_name=args.package_name,
        apk_path=args.apk_path
    )

    print(json.dumps(info, indent=2))
    if not info["success"]:
        sys.exit(1)
    else:
        sys.exit(0)


if __name__ == "__main__":
    main()