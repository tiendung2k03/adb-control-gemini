#!/usr/bin/env python3
import sys
import os
import json
import time
import base64

# Add current directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from execute_action import execute_action

def run_batch(actions_json: str):
    try:
        actions = json.loads(actions_json)
        if not isinstance(actions, list):
            return {"status": "error", "message": "Input must be a JSON array of actions"}
        
        results = []
        for action in actions:
            res = execute_action(action)
            results.append(res)
            if res.get("status") == "error":
                break
            # Small delay between actions in batch
            time.sleep(0.2)
            
        return {"status": "success", "results": results}
    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"status": "error", "message": "Usage: python execute_batch.py <base64_json_string>"}))
        sys.exit(1)

    try:
        base64_json_string = sys.argv[1]
        # It's better to remove the quotes that shell might add
        if base64_json_string.startswith("'") and base64_json_string.endswith("'"):
            base64_json_string = base64_json_string[1:-1]

        actions_json = base64.b64decode(base64_json_string).decode('utf-8')
    except (base64.binascii.Error, UnicodeDecodeError) as e:
        print(json.dumps({"status": "error", "message": f"Invalid base64 input: {str(e)}"}))
        sys.exit(1)

    if not actions_json.strip():
        print(json.dumps({"status": "error", "message": "No input provided"}))
        sys.exit(1)
        
    result = run_batch(actions_json)
    print(json.dumps(result))