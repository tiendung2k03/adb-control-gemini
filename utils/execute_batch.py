#!/usr/bin/env python3
import sys
import os
import json
import time

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
    input_data = sys.stdin.read()
    if not input_data.strip():
        print(json.dumps({"status": "error", "message": "No input provided"}))
        sys.exit(1)
        
    result = run_batch(input_data)
    print(json.dumps(result))
