# Tham chiếu lệnh Slash Commands

Tiện ích mở rộng `adb-control-gemini` cung cấp một số lệnh tùy chỉnh (Slash Commands) để thực hiện các tác vụ tự động hóa phổ biến một cách nhanh chóng. Các lệnh này được thiết kế để đơn giản hóa các quy trình phức tạp thành một lệnh duy nhất.

## Danh sách Slash Commands

### `/android:status`
- **Mô tả:** Kiểm tra nhanh trạng thái hiện tại của thiết bị Android. Lệnh này thu thập thông tin về mức pin, trạng thái sạc, trạng thái màn hình (bật/tắt/khóa) và tên gói ứng dụng đang hoạt động ở foreground.
- **Cách sử dụng:**
    ```
    /android:status
    ```
- **Ví dụ phản hồi:**
    ```json
    {
      "battery_level": "85%",
      "charging_status": "not charging",
      "screen_status": "ON",
      "current_app": "com.android.settings"
    }
    ```
- **Mục đích:** Hữu ích để có cái nhìn tổng quan về thiết bị trước khi thực hiện các hành động khác hoặc để gỡ lỗi nhanh.

### `/android:wifi_on`
- **Mô tả:** Tự động thực hiện quy trình bật Wi-Fi trên thiết bị Android. Lệnh này sẽ gửi một lệnh ADB để kích hoạt Wi-Fi.
- **Cách sử dụng:**
    ```
    /android:wifi_on
    ```
- **Mục đích:** Đơn giản hóa việc bật Wi-Fi mà không cần tương tác thủ công trên thiết bị.

### `/android:screenshot`
- **Mô tả:** Chụp ảnh màn hình của thiết bị Android và lưu ảnh đó vào một tệp cục bộ trên máy tính. Lệnh này sẽ báo cáo đường dẫn của tệp đã lưu.
- **Cách sử dụng:**
    ```
    /android:screenshot
    ```
- **Ví dụ phản hồi:**
    ```
    Screenshot saved to local: /path/to/your/screenshot_1704987654.png (also on device: /sdcard/screenshot_1704987654.png)
    ```
- **Mục đích:** Dễ dàng ghi lại trạng thái màn hình của thiết bị cho mục đích kiểm tra, báo cáo hoặc gỡ lỗi.

### `/android:reset`
- **Mô tả:** Đưa thiết bị Android về màn hình chính, thường được sử dụng để bắt đầu một tác vụ mới từ trạng thái sạch. Lệnh này sẽ mô phỏng việc nhấn nút HOME.
- **Cách sử dụng:**
    ```
    /android:reset
    ```
- **Mục đích:** Đảm bảo thiết bị ở trạng thái ban đầu mong muốn trước khi bắt đầu một chuỗi hành động tự động.
