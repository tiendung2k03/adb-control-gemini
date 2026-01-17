# Hướng dẫn Nâng cấp adb-control-gemini

Tài liệu này mô tả các tính năng mới được thêm vào để tăng tốc độ xử lý và giảm thiểu "thinking overhead" cho AI.

## 1. AI Scripting (`run_ai_script`)

Thay vì ra lệnh từng bước, AI có thể viết một đoạn script Python ngắn để thực thi logic phức tạp ngay tại máy host. Điều này loại bỏ độ trễ khi phải gửi dữ liệu qua lại giữa AI và thiết bị cho từng thao tác nhỏ.

**Các hàm hỗ trợ sẵn:**
- `click(text=None, resource_id=None, point=None)`: Click vào phần tử theo text, ID hoặc tọa độ.
- `type(text, enter=True)`: Nhập văn bản (tự động escape khoảng trắng).
- `wait(seconds)`: Tạm dừng script.
- `wait_for(text, timeout=10)`: Đợi cho đến khi một text xuất hiện trên màn hình.
- `home()`, `back()`: Các phím điều hướng cơ bản.
- `find(text=None, resource_id=None)`: Tìm tọa độ của phần tử.

**Ví dụ:**
```python
if wait_for("Search"):
    click(text="Search")
    type("Manus AI")
    wait(1)
    click(text="Enter")
```

## 2. Batch Execution (`execute_batch`)

Cho phép gửi một danh sách các hành động JSON trong một lần gọi duy nhất. Phù hợp cho các chuỗi thao tác cố định như điền form.

**Ví dụ:**
```json
[
  {"action": "tap", "coordinates": [500, 1000]},
  {"action": "type", "text": "Hello World"},
  {"action": "home"}
]
```

## 3. Screen Summary (`get_screen_summary`)

Công cụ này trả về một phiên bản rút gọn của cấu trúc màn hình, chỉ bao gồm các phần tử có text hoặc ID quan trọng.
- **Nhanh hơn**: Giảm thời gian xử lý JSON.
- **Tiết kiệm Token**: Giúp AI tập trung vào các phần tử tương tác được mà không bị nhiễu bởi các container trống.

## 4. Tối ưu hóa ADB Helper

Các lệnh `input text` đã được cải tiến để xử lý khoảng trắng tốt hơn thông qua việc tự động chuyển đổi sang định dạng `%s` khi cần thiết trong `ai_runtime`.

---
**Lưu ý**: Để sử dụng các tính năng này, hãy đảm bảo bạn đã cập nhật file `mcp-server/src/index.ts` và các file trong thư mục `utils/`.
