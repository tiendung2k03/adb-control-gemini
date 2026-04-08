"""
ADB Helper - Shared Android Debug Bridge utilities

Provides common ADB operations with proper error handling.
"""

import subprocess
import os
import shutil
import json
import requests
from typing import List, Tuple, Optional, Dict, Any

def get_zerotap_config() -> Optional[Dict[str, Any]]:
    """
    Read ZeroTap configuration from Gemini CLI settings.
    """
    try:
        settings_path = os.path.expanduser("~/.gemini/settings.json")
        if os.path.exists(settings_path):
            with open(settings_path, "r") as f:
                settings = json.load(f)
                mcp_servers = settings.get("mcpServers", {})
                # Look for 'zerotab' or any server with 'zerotap' in its name
                for name, config in mcp_servers.items():
                    if "zerota" in name.lower():
                        return config
    except Exception as e:
        print(f"Warning: Failed to load ZeroTap config: {e}")
    return None

def run_zerotap_tool(method: str, params: Dict[str, Any]) -> Tuple[str, str, int]:
    """
    Execute a tool on the ZeroTap MCP server.
    """
    config = get_zerotap_config()
    if not config or "url" not in config:
        return "", "ZeroTap config not found in Gemini CLI settings", 1
    
    url = config["url"]
    headers = config.get("headers", {})
    
    # Simple MCP JSON-RPC call
    payload = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "callTool",
        "params": {
            "name": method,
            "arguments": params
        }
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=5)
        result = response.json()
        
        if "error" in result:
            return "", json.dumps(result["error"]), 1
        
        # Extract text content from MCP result
        content = result.get("result", {}).get("content", [])
        text_output = ""
        for item in content:
            if item.get("type") == "text":
                text_output += item.get("text", "")
        
        return text_output, "", 0
    except Exception as e:
        return "", f"ZeroTap connection error: {str(e)}", 1

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