#!/usr/bin/env python3
import sys
import os
import json
import traceback

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
    if len(sys.argv) < 2:
        # Read from stdin if no argument
        code = sys.stdin.read()
    else:
        code = sys.argv[1]
    
    if not code.strip():
        print(json.dumps({"status": "error", "message": "No code provided"}))
        sys.exit(1)
        
    result = run_script(code)
    print(json.dumps(result))
