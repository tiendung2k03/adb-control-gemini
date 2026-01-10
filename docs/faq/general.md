# Câu hỏi thường gặp (FAQ)

Đây là danh sách các câu hỏi thường gặp về tiện ích mở rộng `adb-control-gemini` và cách sử dụng nó.

## Cài đặt và Kết nối

### Q: Tôi gặp lỗi "ADB not found". Tôi phải làm gì?
A: Lỗi này có nghĩa là hệ thống của bạn không tìm thấy công cụ ADB.
   - **Giải pháp:** Đảm bảo rằng bạn đã cài đặt Android SDK Platform-Tools và thư mục chứa ADB đã được thêm vào biến môi trường `PATH` của hệ thống. Vui lòng tham khảo [Hướng dẫn cài đặt](/docs/getting_started/installation.md) để biết các bước chi tiết.

### Q: Thiết bị của tôi không được phát hiện, hoặc tôi thấy "No Android device connected".
A: Có thể có một số lý do khiến thiết bị không được phát hiện:
   - **Kiểm tra cáp USB:** Đảm bảo cáp USB được kết nối chắc chắn và không bị lỗi.
   - **Bật chế độ gỡ lỗi USB (USB Debugging):** Chế độ này phải được bật trong Tùy chọn nhà phát triển trên thiết bị của bạn. Xem [Hướng dẫn cài đặt](/docs/getting_started/installation.md) để biết cách bật.
   - **Cho phép gỡ lỗi USB:** Khi kết nối thiết bị với máy tính lần đầu tiên sau khi bật gỡ lỗi USB, thiết bị của bạn sẽ hiển thị một cửa sổ hỏi "Allow USB debugging?". Bạn phải chấp nhận nó, và tốt nhất là chọn "Always allow from this computer".
   - **Cài đặt Driver:** Trên Windows, bạn có thể cần cài đặt driver ADB/OEM cụ thể cho thiết bị của mình.
   - **Khởi động lại ADB Server:** Thử chạy `adb kill-server` và sau đó `adb start-server` trong terminal của bạn.

### Q: Tôi có thể sử dụng tiện ích mở rộng này với các thiết bị giả lập (emulator) không?
A: Có, tiện ích mở rộng này hoạt động tốt với cả thiết bị Android vật lý và giả lập. Đảm bảo rằng giả lập của bạn đang chạy và có thể được ADB phát hiện (`adb devices`).

## Sử dụng lệnh

### Q: Tại sao một số lệnh yêu cầu quyền root?
A: Một số lệnh ADB tương tác với các phần nhạy cảm của hệ thống Android (ví dụ: thay đổi trạng thái pin, remount phân vùng hệ thống) yêu cầu quyền superuser (root). Nếu thiết bị của bạn chưa được root, các lệnh này sẽ không hoạt động.

### Q: Làm thế nào để tìm tọa độ X, Y cho lệnh `tap` hoặc `swipe`?
A: Bạn có thể sử dụng lệnh `get_screen()` để lấy cấu trúc UI hiện tại của màn hình. Kết quả JSON sẽ chứa các phần tử UI với thuộc tính `center` (tọa độ trung tâm) và `bounds` (ranh giới). Bạn có thể sử dụng các tọa độ này.
   - Ngoài ra, bạn có thể bật "Pointer location" hoặc "Show touches" trong Tùy chọn nhà phát triển trên thiết bị để xem trực tiếp tọa độ trên màn hình khi chạm.

### Q: Lệnh `type` có hỗ trợ tiếng Việt có dấu không?
A: Có, lệnh `type` đã được tích hợp tính năng chuyển đổi Telex sang tiếng Việt có dấu, giúp bạn nhập văn bản tiếng Việt một cách tự nhiên.

### Q: Tôi có thể sử dụng các lệnh ADB nâng cao hơn không (ví dụ: `adb shell cmd <service> <command>`)?
A: Tiện ích mở rộng này cung cấp các lệnh ADB phổ biến được đóng gói thành các hàm tiện lợi. Đối với các lệnh shell phức tạp hơn không có trong danh sách, bạn vẫn có thể thực hiện thông qua chức năng `execute_action` hoặc thông qua công cụ `run_shell_command` của Gemini CLI, nhưng cần cẩn thận với cú pháp và cách escape ký tự.

## Gỡ lỗi và Nâng cao

### Q: Làm thế nào để xem nhật ký (logs) của thiết bị để gỡ lỗi?
A: Bạn có thể sử dụng lệnh `logcat` để hiển thị nhật ký thời gian thực của thiết bị, hoặc `logcat_file <local_file_path>` để lưu nhật ký vào một tệp trên máy tính. Bạn cũng có thể lọc nhật ký theo tag bằng `logcat_tag <tag>`.

### Q: Tôi muốn hiểu sâu hơn về cách tiện ích mở rộng này hoạt động. Tôi nên xem ở đâu?
A: Bạn có thể xem mã nguồn của tiện ích mở rộng (đặc biệt là các file Python trong thư mục `utils/` và `mcp-server/src/index.ts`) để hiểu cách các lệnh được triển khai và cách giao tiếp với ADB.
