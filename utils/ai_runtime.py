import sys
import os
import time
import json
import xml.etree.ElementTree as ET
from typing import Optional, Tuple, List, Dict

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from utils import adb_helper

class AIRuntime:
    def __init__(self):
        self.screen_dump_path = "/sdcard/ai_runtime_dump.xml"
        self.local_dump_path = "ai_runtime_dump.xml"

    def _get_xml(self) -> Optional[str]:
        """Dumps and pulls UI hierarchy."""
        try:
            adb_helper.run_adb(["shell", "uiautomator", "dump", self.screen_dump_path])
            adb_helper.run_adb(["pull", self.screen_dump_path, self.local_dump_path])
            if os.path.exists(self.local_dump_path):
                with open(self.local_dump_path, "r", encoding="utf-8") as f:
                    content = f.read()
                os.remove(self.local_dump_path)
                return content
        except Exception:
            return None
        return None

    def _parse_bounds(self, bounds_str: str) -> Optional[Tuple[int, int]]:
        try:
            coords = bounds_str.replace("][", ",").replace("[", "").replace("]", "").split(",")
            x1, y1, x2, y2 = map(int, coords)
            return (x1 + x2) // 2, (y1 + y2) // 2
        except:
            return None

    def find(self, text: str = None, resource_id: str = None, content_desc: str = None, query: str = None) -> Optional[Tuple[int, int]]:
        """Finds element coordinates by text, id, description, or a general query."""
        xml = self._get_xml()
        if not xml: return None
        
        try:
            root = ET.fromstring(xml)
            for node in root.iter():
                node_text = node.attrib.get("text", "").lower()
                node_desc = node.attrib.get("content-desc", "").lower()
                node_id = node.attrib.get("resource-id", "").lower()
                
                match = False
                if query:
                    q = query.lower()
                    if q in node_text or q in node_desc or q in node_id: match = True
                else:
                    if text and text.lower() in node_text: match = True
                    if resource_id and resource_id.lower() in node_id: match = True
                    if content_desc and content_desc.lower() in node_desc: match = True
                
                if match:
                    bounds = node.attrib.get("bounds")
                    if bounds:
                        return self._parse_bounds(bounds)
        except:
            pass
        return None

    def click(self, text: str = None, resource_id: str = None, content_desc: str = None, query: str = None, point: Tuple[int, int] = None) -> bool:
        """Clicks on an element or a point. Supports text, resource_id, content_desc, or a general query."""
        target = point
        if not target and (text or resource_id or content_desc or query):
            target = self.find(text=text, resource_id=resource_id, content_desc=content_desc, query=query)
        
        if target:
            x, y = target
            adb_helper.run_adb(["shell", "input", "tap", str(x), str(y)])
            return True
        return False

    def type(self, text: str, enter: bool = True):
        """Types text and optionally presses enter."""
        # Escape spaces for ADB
        escaped_text = text.replace(" ", "%s")
        adb_helper.run_adb(["shell", "input", "text", escaped_text])
        if enter:
            adb_helper.run_adb(["shell", "input", "keyevent", "66"])

    def wait(self, seconds: float):
        time.sleep(seconds)

    def wait_for(self, query: str, timeout: int = 10) -> bool:
        """Waits for an element (text, desc, or id) to appear."""
        start = time.time()
        while time.time() - start < timeout:
            if self.find(query=query):
                return True
            time.sleep(1)
        return False

    def home(self):
        adb_helper.run_adb(["shell", "input", "keyevent", "3"])

    def back(self):
        adb_helper.run_adb(["shell", "input", "keyevent", "4"])

    def get_elements(self) -> List[Dict]:
        """Returns all interactive elements on screen."""
        xml = self._get_xml()
        if not xml: return []
        
        elements = []
        try:
            root = ET.fromstring(xml)
            for node in root.iter():
                text = node.attrib.get("text", "")
                desc = node.attrib.get("content-desc", "")
                res_id = node.attrib.get("resource-id", "")
                bounds = node.attrib.get("bounds")
                
                if (text or desc or res_id) and bounds:
                    center = self._parse_bounds(bounds)
                    if center:
                        elements.append({
                            "text": text,
                            "desc": desc,
                            "id": res_id,
                            "center": center,
                            "class": node.attrib.get("class", "")
                        })
        except:
            pass
        return elements

    def read_messages(self, container_id: str = None) -> List[str]:
        """Reads visible messages from the screen, checking both text and content-desc."""
        elements = self.get_elements()
        messages = []
        for el in elements:
            content = el["text"] or el["desc"]
            if content and ("message" in el["id"].lower() or "text" in el["class"].lower() or "chat" in el["id"].lower()):
                messages.append(content)
        return messages

    def reply(self, text: str, input_id: str = None):
        """Finds input field, types reply and sends. Checks text, desc, and id for hints."""
        if input_id:
            self.click(resource_id=input_id)
        else:
            # Try to find common input field hints in ID, Text, or Content-Desc
            hints = ["message", "edit", "reply", "comment", "nhập", "tin nhắn", "bình luận"]
            found = False
            for hint in hints:
                if self.click(query=hint):
                    found = True
                    break
        
        self.type(text)

# Global instance for scripts to use
runtime = AIRuntime()

def click(text=None, resource_id=None, content_desc=None, query=None, point=None): return runtime.click(text, resource_id, content_desc, query, point)
def type(text, enter=True): return runtime.type(text, enter)
def wait(seconds): return runtime.wait(seconds)
def wait_for(query, timeout=10): return runtime.wait_for(query, timeout)
def home(): return runtime.home()
def back(): return runtime.back()
def find(text=None, resource_id=None, content_desc=None, query=None): return runtime.find(text, resource_id, content_desc, query)
def get_elements(): return runtime.get_elements()
def read_messages(container_id=None): return runtime.read_messages(container_id)
def reply(text, input_id=None): return runtime.reply(text, input_id)
