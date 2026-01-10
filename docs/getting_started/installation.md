# Hướng dẫn cài đặt

Đây là hướng dẫn chi tiết để cài đặt ADB (Android Debug Bridge) và tiện ích mở rộng `adb-control-gemini` cho Gemini CLI.

## 1. Cài đặt Android SDK Platform-Tools (bao gồm ADB)

ADB là một công cụ dòng lệnh cho phép bạn giao tiếp với một thiết bị Android. Nó là một phần của Android SDK Platform-Tools.

### Trên Windows:
1. Tải xuống [SDK Platform-Tools cho Windows](https://developer.android.com/studio/releases/platform-tools).
2. Giải nén tệp ZIP vào một vị trí dễ nhớ (ví dụ: `C:\platform-tools`).
3. Thêm đường dẫn của thư mục `platform-tools` vào biến môi trường `Path` của hệ thống:
   - Nhấn `Win + R`, gõ `sysdm.cpl`, nhấn Enter.
   - Chuyển đến tab `Advanced`, sau đó nhấp vào `Environment Variables`.
   - Trong phần `System variables`, tìm `Path`, chọn nó và nhấp vào `Edit`.
   - Nhấp vào `New` và thêm đường dẫn đến thư mục `platform-tools` của bạn (ví dụ: `C:\platform-tools`).
   - Nhấn `OK` cho tất cả các cửa sổ.
4. Mở một cửa sổ Command Prompt mới và gõ `adb --version` để kiểm tra.

### Trên macOS:
1. Tải xuống [SDK Platform-Tools cho macOS](https://developer.android.com/studio/releases/platform-tools).
2. Giải nén tệp ZIP vào một vị trí (ví dụ: `/Users/yourusername/platform-tools`).
3. Mở Terminal và thêm đường dẫn vào biến môi trường `PATH`. Bạn có thể chỉnh sửa tệp `~/.zshrc` hoặc `~/.bash_profile`:
   ```bash
   echo 'export PATH=$PATH:/Users/yourusername/platform-tools' >> ~/.zshrc
   source ~/.zshrc
   ```
   (Thay `/Users/yourusername/platform-tools` bằng đường dẫn thực tế của bạn)
4. Mở một cửa sổ Terminal mới và gõ `adb --version` để kiểm tra.

### Trên Linux:
1. Tải xuống [SDK Platform-Tools cho Linux](https://developer.android.com/studio/releases/platform-tools).
2. Giải nén tệp ZIP (ví dụ: `~/platform-tools`).
3. Thêm đường dẫn vào biến môi trường `PATH` bằng cách chỉnh sửa `~/.bashrc` hoặc `~/.zshrc`:
   ```bash
   echo 'export PATH=$PATH:~/platform-tools' >> ~/.bashrc
   source ~/.bashrc
   ```
   (Thay `~/platform-tools` bằng đường dẫn thực tế của bạn)
4. Mở một cửa sổ Terminal mới và gõ `adb --version` để kiểm tra.

## 2. Bật USB Debugging trên thiết bị Android

Để ADB có thể giao tiếp với thiết bị của bạn, bạn cần bật chế độ gỡ lỗi USB (USB Debugging).

1.  **Bật Tùy chọn nhà phát triển (Developer Options):**
    *   Mở ứng dụng `Settings` (Cài đặt) trên thiết bị Android của bạn.
    *   Cuộn xuống và tìm `About phone` (Thông tin điện thoại) hoặc `About tablet` (Thông tin máy tính bảng).
    *   Tìm `Build number` (Số bản dựng) và chạm vào nó liên tục (khoảng 7 lần) cho đến khi bạn thấy thông báo "You are now a developer!" (Bạn đã là nhà phát triển!).
2.  **Bật USB Debugging:**
    *   Quay lại màn hình `Settings` chính.
    *   Tìm `Developer options` (Tùy chọn nhà phát triển) (thường nằm trong `System` hoặc ngay bên dưới `About phone`).
    *   Cuộn xuống và tìm `USB debugging` (Gỡ lỗi USB) và bật nó lên.
3.  Kết nối thiết bị Android của bạn với máy tính bằng cáp USB. Trên thiết bị Android, bạn có thể được hỏi "Allow USB debugging?" (Cho phép gỡ lỗi USB?), hãy chọn `Always allow from this computer` (Luôn cho phép từ máy tính này) và nhấn `OK`.

## 3. Cài đặt tiện ích mở rộng `adb-control-gemini`

Tiện ích mở rộng này có thể được cài đặt trực tiếp từ repository GitHub bằng lệnh của Gemini CLI.

1.  **Cài đặt trực tiếp từ GitHub:**
    *   Chạy lệnh sau trong terminal của bạn, thay thế `<URL-GITHUB-CUA-EXTENSION>` bằng URL GitHub của repository tiện ích mở rộng này:
        ```bash
        gemini extension install <URL-GITHUB-CUA-EXTENSION>
        ```
        Ví dụ:
        ```bash
        gemini extension install https://github.com/your-username/adb-control-gemini.git
        ```
        (Thay `https://github.com/your-username/adb-control-gemini.git` bằng URL GitHub thực tế của repository tiện ích mở rộng này).

2.  **Cài đặt các phụ thuộc (nếu có):**
    *   Sau khi cài đặt tiện ích mở rộng, bạn có thể cần cài đặt các phụ thuộc của nó. Điều hướng đến thư mục cài đặt của tiện ích mở rộng (thường nằm trong thư mục cài đặt của Gemini CLI hoặc thư mục `extensions/` của nó) và chạy các lệnh sau:
        ```bash
        # Ví dụ: Nếu tiện ích mở rộng được cài đặt tại ~/.gemini/extensions/adb-control-gemini
        cd ~/.gemini/extensions/adb-control-gemini

        # Đối với Node.js dependencies (trong thư mục mcp-server nếu có)
        cd mcp-server
        npm install
        cd ..

        # Đối với Python dependencies
        pip install -r requirements.txt
        ```

Sau khi cài đặt, tiện ích mở rộng sẽ tự động kích hoạt và các lệnh của nó sẽ có sẵn trong Gemini CLI.
