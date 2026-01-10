# Hướng dẫn sử dụng nhanh

Hướng dẫn này sẽ giúp bạn bắt đầu sử dụng tiện ích mở rộng `adb-control-gemini` một cách nhanh chóng.

## 1. Kiểm tra kết nối thiết bị

Trước khi thực hiện bất kỳ hành động nào, hãy đảm bảo thiết bị Android của bạn đã được kết nối và ADB đang hoạt động:

```
/android:status
```
Lệnh này sẽ cung cấp thông tin về trạng thái pin, trạng thái màn hình và ứng dụng đang chạy hiện tại.

Nếu thiết bị chưa được kết nối hoặc phát hiện, bạn sẽ nhận được thông báo lỗi. Hãy tham khảo [Hướng dẫn cài đặt](/docs/getting_started/installation.md) để khắc phục sự cố kết nối.

## 2. Các hành động cơ bản

### Chụp ảnh màn hình
Để chụp ảnh màn hình của thiết bị và lưu cục bộ:

```
/android:screenshot
```
Kết quả sẽ trả về đường dẫn của file ảnh màn hình được lưu trên máy tính của bạn.

### Về màn hình chính
Để đưa thiết bị về màn hình chính:

```
/android:reset
```
Lệnh này tương đương với việc nhấn nút Home trên thiết bị.

### Bật/Tắt Wi-Fi
Để bật Wi-Fi:

```
/android:wifi_on
```

Để tắt Wi-Fi:

```
/android:wifi_off
```

### Nhập văn bản
Bạn có thể nhập văn bản trực tiếp vào thiết bị Android. Ví dụ, để nhập "Hello Gemini" vào một trường nhập liệu:

```
execute_action({"action": "type", "text": "Hello Gemini", "reason": "Nhập văn bản vào trường nhập liệu"})
```
*Lưu ý*: Lệnh `type` tự động xử lý Telex cho tiếng Việt.

### Chạm vào một vị trí cụ thể
Nếu bạn biết tọa độ X, Y trên màn hình, bạn có thể mô phỏng một lần chạm:

```
execute_action({"action": "tap", "coordinates": [500, 1000], "reason": "Chạm vào giữa màn hình"})
```
*Lưu ý*: Tọa độ này chỉ mang tính ví dụ, bạn cần xác định tọa độ chính xác từ kết quả của `get_screen` hoặc `dumpsys`.

### Vuốt trên màn hình
Để mô phỏng thao tác vuốt từ điểm này sang điểm khác:

```
execute_action({"action": "swipe", "start_coordinates": [500, 1500], "end_coordinates": [500, 500], "duration": 200, "reason": "Cuộn lên"})
```

## 3. Lấy trạng thái màn hình

Để hiểu cấu trúc UI hiện tại của ứng dụng, bạn có thể lấy trạng thái màn hình dưới dạng JSON:

```
get_screen()
```
Kết quả sẽ là một đối tượng JSON mô tả các phần tử UI tương tác trên màn hình, bao gồm ID, văn bản, loại, tọa độ và khả năng click.

## 4. Tìm kiếm phần tử UI

Dựa trên kết quả `get_screen`, bạn có thể tìm kiếm một phần tử cụ thể:

```
find_element(text="Cài đặt")
```
Lệnh này sẽ trả về các phần tử có văn bản "Cài đặt" trên màn hình.

Để biết thêm chi tiết về tất cả các lệnh ADB có sẵn, hãy tham khảo [Tham chiếu lệnh ADB](/docs/commands_reference/adb_commands.md).
