# ADB Control Gemini - MCP Server

Dự án này là một **Gemini CLI Extension** được nâng cấp thành **MCP Server (Model Context Protocol)**, cho phép các mô hình AI (như Claude, Gemini) điều khiển thiết bị Android thông qua ADB (Android Debug Bridge).

## 🚀 Tính năng chính

- **Điều khiển thiết bị**: Hỗ trợ hơn 100 lệnh ADB từ cơ bản đến nâng cao (tap, swipe, type, install, screenshot, logcat, v.v.).
- **Tự động hóa UI**: Tìm kiếm phần tử UI theo văn bản và thực hiện hành động.
- **Quản lý ứng dụng**: Cài đặt, gỡ lỗi, liệt kê và quản lý các gói ứng dụng.
- **Theo dõi hệ thống**: Kiểm tra pin, bộ nhớ, CPU, nhiệt độ và trạng thái mạng.
- **Tích hợp MCP**: Hoạt động như một MCP Server hoàn chỉnh, dễ dàng kết nối với các AI Agent.

## 🛠 Yêu cầu hệ thống

- **Node.js**: Phiên bản 18 trở lên.
- **Python**: Phiên bản 3.10 trở lên.
- **ADB**: Đã được cài đặt và thêm vào biến môi trường (PATH).
- **Thiết bị Android**: Đã bật chế độ "Gỡ lỗi USB" (USB Debugging).

## 📦 Cài đặt

1. **Clone repository**:
   ```bash
   git clone https://github.com/tiendung2k03/adb-control-gemini.git
   cd adb-control-gemini
   ```

2. **Cài đặt dependencies cho thư mục gốc**:
   ```bash
   npm install
   ```

3. **Cài đặt và Build MCP Server**:
   ```bash
   cd mcp-server
   npm install
   npm run build
   ```

## 🖥 Sử dụng

### Khởi động MCP Server
```bash
cd mcp-server
npm start
```

### Cấu trúc thư mục
- `commands/android/`: Chứa các định nghĩa lệnh ADB dưới dạng tệp `.toml`.
- `utils/`: Các script Python hỗ trợ xử lý logic ADB phức tạp.
- `mcp-server/`: Mã nguồn TypeScript của MCP Server.
- `dist/`: Mã nguồn JavaScript đã được biên dịch.

## 📝 Danh sách lệnh tiêu biểu

| Lệnh | Mô tả |
|------|-------|
| `connect` | Kết nối với thiết bị qua TCP/IP. |
| `screenshot` | Chụp ảnh màn hình thiết bị. |
| `install` | Cài đặt ứng dụng từ tệp APK. |
| `logcat` | Xem nhật ký hệ thống thời gian thực. |
| `input_tap` | Mô phỏng thao tác chạm vào tọa độ. |

## 🤝 Đóng góp

Mọi đóng góp nhằm cải thiện dự án đều được hoan nghênh. Vui lòng tạo **Issue** hoặc gửi **Pull Request**.

## 📄 Giấy phép

Dự án này được phát hành dưới giấy phép **Apache-2.0**.
