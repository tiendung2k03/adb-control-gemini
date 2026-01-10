# Tham chiếu lệnh ADB

Dưới đây là danh sách chi tiết các lệnh ADB có sẵn thông qua tiện ích mở rộng `adb-control-gemini`, được phân loại để dễ dàng tìm kiếm và sử dụng. Mỗi lệnh đi kèm với mô tả và ví dụ thực thi.

## KẾT NỐI – SERVER
- `abi`: Lấy thông tin ABI của thiết bị.
- `connect <IP:PORT>`: Kết nối thiết bị Android với máy tính qua TCP/IP, cho phép điều khiển thiết bị không dây.
- `devices`: Liệt kê tất cả các thiết bị Android đang kết nối với máy tính qua USB hoặc TCP/IP.
- `devices_long`: Liệt kê tất cả các thiết bị Android đang kết nối, bao gồm thông tin chi tiết.
- `disconnect`: Ngắt kết nối với thiết bị Android qua TCP/IP.
- `get_serial`: Lấy số serial của thiết bị.
- `get_state`: Lấy trạng thái kết nối của thiết bị.
- `kill_server`: Dừng hoàn toàn máy chủ ADB đang chạy trên máy tính.
- `pair <IP:PORT>, <mã ghép nối>`: Ghép nối với thiết bị Android qua Wi-Fi.
- `start_server`: Khởi động máy chủ ADB trên máy tính.
- `tcpip <port>`: Khởi động lại ADB ở chế độ TCP/IP trên một cổng cụ thể.
- `usb`: Chuyển ADB sang chế độ USB.
- `wait_device`: Chờ đợi thiết bị được kết nối.

## THIẾT BỊ – HỆ THỐNG
- `android_version`: Lấy phiên bản Android của thiết bị.
- `brand`: Lấy tên thương hiệu của thiết bị.
- `cpuinfo`: Hiển thị thông tin CPU của thiết bị.
- `disk_usage`: Hiển thị thông tin sử dụng bộ nhớ trong của thiết bị.
- `getprop`: Lấy thông tin thuộc tính hệ thống của thiết bị.
- `hardware`: Lấy thông tin phần cứng của thiết bị.
- `locale`: Lấy ngôn ngữ và khu vực hiện tại của thiết bị.
- `manufacturer`: Lấy tên nhà sản xuất của thiết bị.
- `meminfo`: Hiển thị thông tin bộ nhớ của thiết bị.
- `model`: Lấy tên model của thiết bị.
- `sdk_version`: Lấy phiên bản SDK của thiết bị.
- `thermal`: Hiển thị thông tin nhiệt độ của thiết bị.
- `timezone`: Lấy múi giờ hiện tại của thiết bị.
- `uptime`: Hiển thị thời gian hoạt động của thiết bị.

## SHELL – TIẾN TRÌNH
- `env`: Hiển thị các biến môi trường của shell.
- `id`: Hiển thị thông tin người dùng và nhóm.
- `jobs`: Liệt kê các công việc trong shell.
- `kill <PID>`: Kết thúc một tiến trình bằng PID.
- `killall <tên tiến trình>`: Kết thúc tất cả các tiến trình có tên cụ thể.
- `ps`: Liệt kê các tiến trình đang chạy trên thiết bị.
- `root`: Khởi động lại ADB với quyền root.
- `shell`: Mở một shell tương tác trên thiết bị.
- `su <lệnh>`: Chạy lệnh với quyền superuser (chỉ trên thiết bị đã root).
- `top`: Hiển thị các tiến trình đang sử dụng nhiều tài nguyên nhất.
- `unroot`: Khởi động lại ADB không có quyền root.
- `whoami`: Hiển thị tên người dùng hiện tại.

## FILE – THƯ MỤC
- `cat <file_path>`: Hiển thị nội dung của tệp.
- `chmod <permissions>, <path>`: Thay đổi quyền của tệp hoặc thư mục.
- `chown <owner:group>, <path>`: Thay đổi chủ sở hữu của tệp hoặc thư mục.
- `cp <source_path>, <destination_path>`: Sao chép tệp hoặc thư mục trên thiết bị.
- `du <path>`: Hiển thị dung lượng sử dụng của tệp hoặc thư mục.
- `find <directory>, <tên tệp/pattern>`: Tìm kiếm tệp trên thiết bị.
- `head <file_path>`: Hiển thị những dòng đầu của tệp.
- `less <file_path>`: Xem nội dung của tệp theo từng trang (nếu có sẵn).
- `ls <path (tùy chọn)>`: Liệt kê nội dung của một thư mục.
- `mkdir <directory_path>`: Tạo thư mục trên thiết bị.
- `mount_ro <partition_path>`: Mount lại phân vùng hệ thống ở chế độ chỉ đọc.
- `mount_rw <partition_path>`: Mount lại phân vùng hệ thống ở chế độ đọc-ghi (yêu cầu quyền root).
- `mv <source_path>, <destination_path>`: Di chuyển hoặc đổi tên tệp/thư mục trên thiết bị.
- `pull <remote_path>, <local_path>`: Sao chép tệp hoặc thư mục từ thiết bị về máy tính.
- `push <local_path>, <remote_path>`: Sao chép tệp hoặc thư mục từ máy tính lên thiết bị.
- `rm <file_path>`: Xóa tệp trên thiết bị.
- `rmdir <directory_path>`: Xóa thư mục rỗng trên thiết bị.
- `stat <path>`: Hiển thị thông tin trạng thái tệp hoặc thư mục.
- `tail <file_path>`: Hiển thị những dòng cuối của tệp.
- `tree <path (tùy chọn)>`: Hiển thị cấu trúc cây thư mục (nếu có sẵn).

## ỨNG DỤNG – PACKAGE
- `app_info <package_name>`: Hiển thị thông tin chi tiết về ứng dụng (dumpsys).
- `app_permissions <package_name>`: Liệt kê các quyền của ứng dụng.
- `app_path <package_name>`: Lấy đường dẫn cài đặt của ứng dụng.
- `clear_data <package_name>`: Xóa dữ liệu của một ứng dụng.
- `disable_app <package_name>`: Vô hiệu hóa một ứng dụng.
- `enable_app <package_name>`: Bật một ứng dụng đã bị vô hiệu hóa.
- `force_stop <package_name>`: Buộc dừng một ứng dụng.
- `grant_permission <package_name>, <permission>`: Cấp quyền cho ứng dụng.
- `install <đường dẫn APK trên máy tính>`: Cài đặt ứng dụng từ tệp APK.
- `install_multiple <đường dẫn đến các APK trên máy tính>`: Cài đặt nhiều APK cho một ứng dụng.
- `install_replace <đường dẫn APK trên máy tính>`: Cài đặt lại ứng dụng, giữ nguyên dữ liệu.
- `list_packages`: Liệt kê tất cả các gói ứng dụng đã cài đặt.
- `list_packages_system`: Liệt kê các gói ứng dụng hệ thống đã cài đặt.
- `list_packages_user`: Liệt kê các gói ứng dụng đã cài đặt cho người dùng.
- `revoke_permission <package_name>, <permission>`: Thu hồi quyền của ứng dụng.
- `set_app_debuggable <package_name>`: Đặt ứng dụng là debuggable.
- `uninstall <package_name>`: Gỡ cài đặt một ứng dụng.

## LOG – DEBUG
- `anr_traces`: Hiển thị các dấu vết ANR (Application Not Responding).
- `bugreport <path>`: Tạo một báo cáo lỗi đầy đủ.
- `dumpsys <service_name (tùy chọn)>`: Hiển thị thông tin chẩn đoán hệ thống.
- `dumpsys_activity`: Hiển thị thông tin về Activity Manager.
- `dumpsys_package`: Hiển thị thông tin về Package Manager.
- `dumpsys_window`: Hiển thị thông tin về Window Manager.
- `logcat`: Hiển thị nhật ký logcat của thiết bị.
- `logcat_clear`: Xóa nhật ký logcat hiện có.
- `logcat_file <local_file_path>`: Ghi nhật ký logcat ra tệp trên máy tính.
- `logcat_tag <tag>`: Lọc nhật ký logcat theo tag.
- `tombstones`: Liệt kê các tệp tombstones (thông tin lỗi ứng dụng).

## MÀN HÌNH – MEDIA
- `media_scan <path>`: Yêu cầu MediaScanner quét lại thư mục.
- `pull_record <remote_path>, <local_file_path>`: Kéo tệp ghi màn hình từ thiết bị về máy tính.
- `screenrecord <thời gian (giây)>`: Quay video màn hình của thiết bị.
- `screenrecord_bitrate <bitrate (Mbps)>`: Quay video màn hình với tốc độ bit cụ thể.
- `screenrecord_size <width x height>`: Quay video màn hình với kích thước cụ thể.
- `screenshot <local_file_path (tùy chọn)>`: Chụp ảnh màn hình của thiết bị và lưu cục bộ.

## INPUT – ĐIỀU KHIỂN
- `back`: Nhấn nút Back.
- `brightness_auto`: Chuyển sang chế độ độ sáng tự động.
- `brightness_set <mức độ sáng>`: Đặt độ sáng màn hình (0-255).
- `home`: Nhấn nút Home.
- `input_keyevent <mã phím (KEY_CODE)>`: Gửi một sự kiện phím.
- `input_longpress <x>, <y>, <thời gian (ms)>`: Nhấn giữ một vị trí trên màn hình.
- `input_swipe <x1>, <y1>, <x2>, <y2>, <thời gian (ms) (tùy chọn)>`: Vuốt trên màn hình.
- `input_tap <x>, <y>`: Chạm vào một vị trí trên màn hình.
- `input_text <văn bản>`: Nhập văn bản vào thiết bị.
- `power`: Nhấn nút nguồn (tắt/mở màn hình).
- `recents`: Mở màn hình ứng dụng gần đây.
- `volume_down`: Giảm âm lượng.
- `volume_mute`: Tắt/bật tiếng.
- `volume_up`: Tăng âm lượng.

## MẠNG – WIFI – DATA
- `airplane_off`: Tắt chế độ máy bay trên thiết bị.
- `airplane_on`: Bật chế độ máy bay trên thiết bị.
- `data_off`: Tắt dữ liệu di động trên thiết bị.
- `data_on`: Bật dữ liệu di động trên thiết bị.
- `dns`: Hiển thị cấu hình DNS của thiết bị.
- `ifconfig`: Hiển thị cấu hình giao diện mạng.
- `ip_addr`: Hiển thị địa chỉ IP của thiết bị.
- `netstat`: Hiển thị các kết nối mạng và thống kê.
- `ping <host>`: Kiểm tra kết nối mạng đến một host.
- `proxy_clear`: Xóa proxy HTTP toàn cầu.
- `proxy_set <host>, <port>`: Đặt proxy HTTP toàn cầu.
- `route`: Hiển thị bảng định tuyến.
- `wifi_off`: Tắt Wi-Fi trên thiết bị.
- `wifi_on`: Bật Wi-Fi trên thiết bị.

## MÀN HÌNH – UI
- `immersive_mode <package_name>`: Đặt ứng dụng vào chế độ nhập vai toàn màn hình.
- `layout_bounds <0 (tắt) hoặc 1 (bật)>`: Hiển thị ranh giới bố cục của các thành phần UI.
- `pointer_location <0 (tắt) hoặc 1 (bật)>`: Hiển thị thông tin vị trí con trỏ trên màn hình.
- `rotation_lock`: Khóa xoay màn hình ở chế độ hiện tại.
- `rotation_unlock`: Mở khóa xoay màn hình (cho phép tự động xoay).
- `show_touches <0 (tắt) hoặc 1 (bật)>`: Hiển thị các tương tác chạm trên màn hình (để gỡ lỗi UI).
- `wm_density <density (dpi) (tùy chọn)>`: Hiển thị hoặc đặt mật độ DPI màn hình.
- `wm_reset`: Đặt lại kích thước và mật độ màn hình về mặc định.
- `wm_size <width x height (tùy chọn)>`: Hiển thị hoặc đặt kích thước màn hình.

## PIN – NGUỒN
- `battery_level`: Hiển thị mức pin hiện tại của thiết bị.
- `battery_reset`: Đặt lại trạng thái pin về mặc định (yêu cầu quyền root).
- `battery_set_level <level>`: Đặt mức pin mô phỏng (0-100, yêu cầu quyền root).
- `battery_status`: Hiển thị trạng thái pin của thiết bị.
- `charging_off`: Tắt mô phỏng sạc pin (yêu cầu quyền root).
- `charging_on`: Bật mô phỏng sạc pin (yêu cầu quyền root).
- `reboot`: Khởi động lại thiết bị.
- `reboot_bootloader`: Khởi động lại thiết bị vào chế độ Bootloader.
- `reboot_recovery`: Khởi động lại thiết bị vào chế độ Recovery.
- `shutdown`: Tắt thiết bị.
- `stay_awake_off`: Tắt chế độ màn hình luôn sáng.
- `stay_awake_on`: Giữ màn hình luôn sáng khi sạc.

## BẢO MẬT – DEV
- `developer_options_off`: Tắt tùy chọn nhà phát triển.
- `developer_options_on`: Bật tùy chọn nhà phát triển (nếu chưa bật).
- `selinux_enforcing`: Đặt SELinux ở chế độ Enforcing (chặn và ghi log).
- `selinux_permissive`: Đặt SELinux ở chế độ Permissive (cảnh báo nhưng không chặn).
- `selinux_status`: Hiển thị trạng thái SELinux.
- `verify_apps_off`: Tắt xác minh ứng dụng qua ADB.
- `verify_apps_on`: Bật xác minh ứng dụng qua ADB.

## NGUY HIỂM – HÀNH ĐỘNG CAO
- `erase_partition <partition>`: Xóa một phân vùng trên thiết bị (yêu cầu fastboot).
- `flash_image <partition>, <image_file>`: Flash một image vào thiết bị (yêu cầu fastboot).
- `remount`: Remount phân vùng hệ thống để có thể ghi (yêu cầu quyền root).
