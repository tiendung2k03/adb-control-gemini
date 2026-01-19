#!/usr/bin/env python3
import sys
import os
import json
import traceback
import base64

# Add current directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import ai_runtime

def run_script(code: str):
    """Executes the provided Python code within the AI runtime context."""
    # Define the execution context with runtime functions
    context = {
        "click": ai_runtime.click,
        "type": ai_runtime.type,
        "wait": ai_runtime.wait,
        "wait_for": ai_runtime.wait_for,
        "home": ai_runtime.home,
        "back": ai_runtime.back,
        "find": ai_runtime.find,
        "print": lambda *args: None, # Suppress print or redirect to stderr
    }
    
    try:
        # Execute the code
        exec(code, context)
        return {"status": "success", "message": "Script executed successfully"}
    except Exception as e:
        error_details = traceback.format_exc()
        return {
            "status": "error", 
            "message": str(e),
            "traceback": error_details
        }

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"status": "error", "message": "Usage: python run_ai_script.py <base64_code_string>"}))
        sys.exit(1)

    try:
        base64_code_string = sys.argv[1]
        # It's better to remove the quotes that shell might add
        if base64_code_string.startswith("'") and base64_code_string.endswith("'"):
            base64_code_string = base64_code_string[1:-1]

        code = base64.b64decode(base64_code_string).decode('utf-8')
    except (base64.binascii.Error, UnicodeDecodeError) as e:
        print(json.dumps({"status": "error", "message": f"Invalid base64 input: {str(e)}"}))
        sys.exit(1)

    if not code.strip():
        print(json.dumps({"status": "error", "message": "No code provided"}))
        sys.exit(1)
        
    result = run_script(code)
    print(json.dumps(result))