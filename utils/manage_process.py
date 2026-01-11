#!/usr/bin/env python3
"""
Manage Process - Utility Module

Manages processes on the Android device (list, kill).

Usage:
    python manage_process.py --action list
    python manage_process.py --action kill --package_name "com.example.app"
    python manage_process.py --action kill --pid "1234"
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


def manage_process(
    action: str,
    package_name: Optional[str] = None,
    pid: Optional[str] = None
) -> Dict[str, Any]:
    """
    Manages processes on the Android device.

    Args:
        action: The action to perform ("list", "kill").
        package_name: The package name of the application (for "kill" action).
        pid: The Process ID (for "kill" action).

    Returns:
        A dictionary containing the result of the operation.
    """
    result: Dict[str, Any] = {"action": action, "success": False, "message": ""}

    if not adb_helper.check_device_connected():
        result["message"] = "No Android device connected. Run 'adb devices' to check."
        return result

    try:
        if action == "list":
            adb_command = ["shell", "ps", "-A"] # -A for all processes
            stdout, stderr, code = adb_helper.run_adb(adb_command)
            if code == 0:
                processes = []
                # Skip header, parse output
                lines = stdout.splitlines()
                if lines:
                    header = lines[0].split()
                    for line in lines[1:]:
                        parts = line.split()
                        if len(parts) >= 9: # Ensure enough columns for standard ps output
                            process_info = {
                                "user": parts[0],
                                "pid": parts[1],
                                "ppid": parts[2],
                                "vsz": parts[3],
                                "rss": parts[4],
                                "wchan": parts[5],
                                "addr": parts[6],
                                "s": parts[7],
                                "name": " ".join(parts[8:]) # Command name can have spaces
                            }
                            processes.append(process_info)
                result["success"] = True
                result["processes"] = processes
                result["message"] = f"Listed {len(processes)} processes."
            else:
                result["message"] = f"Failed to list processes: {stderr}"
        
        elif action == "kill":
            kill_command: List[str] = []
            if pid:
                kill_command = ["shell", "kill", str(pid)]
            elif package_name:
                # Use ps, grep, awk, xargs kill
                kill_command = ["shell", f"ps | grep {package_name} | awk '{{print \$2}}' | xargs kill"]
            else:
                result["message"] = "Either package_name or pid is required for kill action."
                return result
            
            stdout, stderr, code = adb_helper.run_adb(kill_command)
            # kill command often returns code 0 even if process wasn't found or killed
            # need to check stderr for specific messages
            if code == 0 or "No such process" not in stderr: # crude check
                result["success"] = True
                result["message"] = f"Attempted to kill process (PID: {pid}, Package: {package_name}). Output: {stdout}, Error: {stderr}"
            else:
                result["message"] = f"Failed to kill process (PID: {pid}, Package: {package_name}): {stderr or stdout}"

        else:
            result["message"] = f"Unknown action: {action}"

    except Exception as e:
        result["message"] = f"Unexpected error: {str(e)}"

    return result


def main():
    parser = argparse.ArgumentParser(
        description="Manages processes on the Android device (list, kill)."
    )
    parser.add_argument(
        "--action",
        type=str,
        choices=["list", "kill"],
        required=True,
        help="The action to perform ('list', 'kill')."
    )
    parser.add_argument(
        "--package_name",
        type=str,
        help="The package name of the application (for 'kill' action)."
    )
    parser.add_argument(
        "--pid",
        type=str,
        help="The Process ID (for 'kill' action)."
    )
    args = parser.parse_args()

    # Validate args based on action
    if args.action == "kill" and not (args.package_name or args.pid):
        print(json.dumps({"success": False, "message": "Either package_name or pid is required for 'kill' action."}, indent=2))
        sys.exit(1)

    info = manage_process(
        action=args.action,
        package_name=args.package_name,
        pid=args.pid
    )

    print(json.dumps(info, indent=2))
    if not info["success"]:
        sys.exit(1)
    else:
        sys.exit(0)


if __name__ == "__main__":
    main()