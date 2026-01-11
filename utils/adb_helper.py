"""
ADB Helper - Shared Android Debug Bridge utilities

Provides common ADB operations with proper error handling.
"""

import subprocess
import os
import shutil
from typing import List, Tuple


def get_adb_path() -> str:
    """
    Get the path to ADB binary.

    Checks:
    1. ADB_PATH environment variable
    2. adb in system PATH

    Returns:
        str: Path to ADB binary

    Raises:
        FileNotFoundError: If ADB is not found
    """
    # Check environment variable first
    adb_path = os.environ.get("ADB_PATH")
    if adb_path and os.path.exists(adb_path):
        return adb_path

    # Check if adb is in PATH
    adb_path = shutil.which("adb")
    if adb_path:
        return adb_path

    raise FileNotFoundError(
        "ADB not found. Please install Android Platform Tools and ensure "
        "'adb' is in your PATH, or set ADB_PATH environment variable."
    )


def run_adb(args: List[str], timeout: int = 30) -> Tuple[str, str, int]:
    """
    Execute an ADB command.

    Args:
        args: List of command arguments (e.g., ["devices", "-l"])
        timeout: Command timeout in seconds (default: 30)

    Returns:
        Tuple of (stdout, stderr, return_code)

    Example:
        stdout, stderr, code = run_adb(["shell", "input", "tap", "100", "200"])
    """
    try:
        adb_path = get_adb_path()
        result = subprocess.run(
            [adb_path] + args,
            capture_output=True,
            text=True,
            timeout=timeout
        )
        return result.stdout.strip(), result.stderr.strip(), result.returncode

    except subprocess.TimeoutExpired:
        return "", f"ADB command timed out after {timeout}s", 1
    except FileNotFoundError as e:
        return "", str(e), 127
    except Exception as e:
        return "", f"ADB command failed: {str(e)}", 1


def check_device_connected() -> bool:
    """
    Check if an Android device is connected and authorized.

    Returns:
        bool: True if device is connected and ready, False otherwise
    """
    stdout, stderr, code = run_adb(["devices"])

    if code != 0:
        return False

    # Parse output: skip header, check for device entries
    lines = stdout.split('\n')[1:]  # Skip "List of devices attached"
    for line in lines:
        if line.strip() and '\tdevice' in line:
            return True

    return False


def get_connected_device_id() -> str:
    """
    Get the ID of the first connected device.

    Returns:
        str: Device ID (e.g., "emulator-5554" or serial number)

    Raises:
        RuntimeError: If no device is connected
    """
    stdout, stderr, code = run_adb(["devices"])

    if code != 0:
        raise RuntimeError(f"Failed to get devices: {stderr}")

    lines = stdout.split('\n')[1:]  # Skip header
    for line in lines:
        if line.strip() and '\tdevice' in line:
            return line.split('\t')[0]

    raise RuntimeError(
        "No Android device connected. Please connect a device and enable USB debugging."
    )