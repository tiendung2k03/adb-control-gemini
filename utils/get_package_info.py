#!/usr/bin/env python3
"""
Get Package Info - Utility Module

Retrieves detailed information about an installed Android package.

Usage:
    python get_package_info.py --package_name "com.android.settings"
"""

import sys
import os
import json
import argparse
import re
from typing import Dict, Any, Optional

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from utils import adb_helper


def get_package_info(package_name: str) -> Dict[str, Any]:
    """
    Retrieves information about a specific Android package.

    Args:
        package_name: The package name of the application (e.g., "com.android.settings").

    Returns:
        A dictionary containing package information or an error message.
    """
    result = {"package_name": package_name, "installed": False, "error": None}

    if not adb_helper.check_device_connected():
        result["error"] = "No Android device connected. Run 'adb devices' to check."
        return result

    try:
        stdout, stderr, code = adb_helper.run_adb([
            "shell", "dumpsys", "package", package_name
        ])

        if code != 0:
            result["error"] = f"ADB command failed: {stderr}"
            return result

        if f"Package couldn't be found: {package_name}" in stderr:
            return result # Not installed

        # Parse the dumpsys output
        result["installed"] = True
        output_lines = stdout.splitlines()

        for line in output_lines:
            line = line.strip()
            if line.startswith("versionName="):
                result["version_name"] = line.split("=")[1]
            elif line.startswith("versionCode="):
                # versionCode=12345 (targetSdk=30)
                match = re.search(r"versionCode=(\d+)", line)
                if match:
                    result["version_code"] = int(match.group(1))
            elif line.startswith("firstInstallTime="):
                result["first_install_time"] = line.split("=")[1]
            elif line.startswith("lastUpdateTime="):
                result["last_update_time"] = line.split("=")[1]
            # Add more parsing for other relevant information as needed

    except Exception as e:
        result["error"] = f"Unexpected error: {str(e)}"

    return result


def main():
    parser = argparse.ArgumentParser(
        description="Retrieves information about an Android package."
    )
    parser.add_argument(
        "--package_name",
        type=str,
        required=True,
        help="The package name of the application (e.g., 'com.android.settings')."
    )
    args = parser.parse_args()

    info = get_package_info(args.package_name)

    print(json.dumps(info, indent=2))
    if info.get("error"):
        sys.exit(1)
    elif not info.get("installed"):
        sys.exit(2) # Indicate not installed with a specific exit code
    else:
        sys.exit(0)


if __name__ == "__main__":
    main()