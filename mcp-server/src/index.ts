/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { exec } from 'child_process';
import { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

const server = new McpServer({
  name: 'android-gemini-extension',
  version: '1.0.0', // Version from package.json
});

// Enhanced shell command execution with better error handling
function executeShellCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Command failed: ${command}`);
        console.error(`Error: ${error.message}`);
        // Return a structured error message for the AI to understand
        reject(JSON.stringify({ error: 'CommandExecutionError', message: stderr || error.message }));
        return;
      }
      if (stderr) {
        console.warn(`Command produced stderr: ${stderr}`);
      }
      resolve(stdout);
    });
  });
}

// Centralized tool registration logic to reduce boilerplate
async function registerPythonTool(command: string): Promise<CallToolResult> {
  try {
    const output = await executeShellCommand(command);
    return {
      content: [
        {
          type: 'text',
          text: output,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: typeof error === 'string' ? error : JSON.stringify(error),
        },
      ],
    };
  }
}

// Register get_screen tool
server.tool(
  'get_screen',
  'Lấy trạng thái màn hình hiện tại của thiết bị Android dưới dạng JSON.',
  z.object({}).shape,
  () => registerPythonTool(`python ${process.env.EXTENSION_PATH}/utils/get_screen.py`)
);

// Register execute_action tool
server.tool(
  'execute_action',
  'Thực hiện một hành động trên thiết bị Android (tap, type, swipe, v.v.) dựa trên đối tượng JSON.',
  z.object({
    action_json: z.string().describe('Đối tượng JSON mô tả hành động cần thực hiện, ví dụ: `{"action":"tap", "coordinates":[x,y], "reason":"..."}`'),
  }).shape,
  ({ action_json }) => registerPythonTool(`python ${process.env.EXTENSION_PATH}/utils/execute_action.py --json '${action_json.replace(/'/g, `\'`) }'`)
);

// Register check_env tool
server.tool(
  'check_env',
  'Kiểm tra môi trường ADB và kết nối thiết bị Android.',
  z.object({}).shape,
  () => registerPythonTool(`python ${process.env.EXTENSION_PATH}/utils/check_env.py`)
);

// Register find_element tool
server.tool(
  'find_element',
  'Tìm kiếm phần tử UI trên màn hình Android theo văn bản.',
  z.object({
    text: z.string().describe('Văn bản của phần tử UI cần tìm.'),
  }).shape,
  ({ text }) => registerPythonTool(`python ${process.env.EXTENSION_PATH}/utils/find_element.py --text '${text}'`)
);

// Register manage_app tool
server.tool(
  'manage_app',
  'Quản lý ứng dụng Android (cài đặt, gỡ bỏ, liệt kê).',
  z.object({
    action: z.enum(['install', 'uninstall', 'list']).describe('Hành động quản lý ứng dụng.'),
    package_name: z.string().optional().describe('Tên gói ứng dụng (cho uninstall, list).'),
    file_path: z.string().optional().describe('Đường dẫn đến tệp APK (cho install).'),
  }).shape,
  ({ action, package_name, file_path }) => {
    let command = `python ${process.env.EXTENSION_PATH}/utils/manage_app.py --action ${action}`;
    if (package_name) {
      command += ` --package_name '${package_name}'`;
    }
    if (file_path) {
      command += ` --file_path '${file_path}'`;
    }
    return registerPythonTool(command);
  }
);

// --- Generated from TOML files ---

// Register abi tool
server.tool(
  'abi',
  'Lấy thông tin ABI của thiết bị.\nVí dụ thực thi: adb shell getprop ro.product.cpu.abi.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell getprop ro.product.cpu.abi`)
);

// Register airplane_off tool
server.tool(
  'airplane_off',
  'Tắt chế độ máy bay trên thiết bị.\nVí dụ thực thi: adb shell settings put global airplane_mode_on 0; adb shell am broadcast -a android.intent.action.AIRPLANE_MODE --ez state false.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell settings put global airplane_mode_on 0; adb shell am broadcast -a android.intent.action.AIRPLANE_MODE --ez state false`)
);

// Register airplane_on tool
server.tool(
  'airplane_on',
  'Bật chế độ máy bay trên thiết bị.\nVí dụ thực thi: adb shell settings put global airplane_mode_on 1; adb shell am broadcast -a android.intent.action.AIRPLANE_MODE --ez state true.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell settings put global airplane_mode_on 1; adb shell am broadcast -a android.intent.action.AIRPLANE_MODE --ez state true`)
);

// Register android_version tool
server.tool(
  'android_version',
  'Lấy phiên bản Android của thiết bị.\nVí dụ thực thi: adb shell getprop ro.build.version.release.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell getprop ro.build.version.release`)
);

// Register anr_traces tool
server.tool(
  'anr_traces',
  'Hiển thị các dấu vết ANR (Application Not Responding).\nVí dụ thực thi: adb shell cat /data/anr/traces.txt.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell cat /data/anr/traces.txt`)
);

// Register app_info tool (with parameter)
server.tool(
  'app_info',
  'Hiển thị thông tin chi tiết về ứng dụng (dumpsys).\nNhập các tham số sau: <package_name>.\nVí dụ thực thi: adb shell dumpsys package <package_name>.',
  z.object({
    package_name: z.string().describe('Tên gói ứng dụng.'),
  }).shape,
  ({ package_name }) => registerPythonTool(`adb shell dumpsys package ${package_name}`)
);

// Register app_path tool (with parameter)
server.tool(
  'app_path',
  'Lấy đường dẫn cài đặt của ứng dụng.\nNhập các tham số sau: <package_name>.\nVí dụ thực thi: adb shell pm path <package_name>.',
  z.object({
    package_name: z.string().describe('Tên gói ứng dụng.'),
  }).shape,
  ({ package_name }) => registerPythonTool(`adb shell pm path ${package_name}`)
);

// Register app_permissions tool (with parameter)
server.tool(
  'app_permissions',
  'Liệt kê các quyền của ứng dụng.\nNhập các tham số sau: <package_name>.\nVí dụ thực thi: adb shell dumpsys package <package_name> | grep perm.',
  z.object({
    package_name: z.string().describe('Tên gói ứng dụng.'),
  }).shape,
  ({ package_name }) => registerPythonTool(`adb shell dumpsys package ${package_name} | grep perm`)
);

// Register back tool
server.tool(
  'back',
  'Nhấn nút Back.\nVí dụ thực thi: adb shell input keyevent KEYCODE_BACK.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell input keyevent KEYCODE_BACK`)
);

// Register battery_level tool
server.tool(
  'battery_level',
  'Hiển thị mức pin hiện tại của thiết bị.\nVí dụ thực thi: adb shell dumpsys battery | grep level.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell dumpsys battery | grep level`)
);

// Register battery_reset tool
server.tool(
  'battery_reset',
  'Đặt lại trạng thái pin về mặc định (yêu cầu quyền root).\nVí dụ thực thi: adb shell dumpsys battery reset.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell dumpsys battery reset`)
);

// Register battery_set_level tool (with parameter)
server.tool(
  'battery_set_level',
  'Đặt mức pin mô phỏng (0-100, yêu cầu quyền root).\nNhập các tham số sau: <level>.\nVí dụ thực thi: adb shell dumpsys battery set level <level>.',
  z.object({
    level: z.number().describe('Mức pin (0-100).'),
  }).shape,
  ({ level }) => registerPythonTool(`adb shell dumpsys battery set level ${level}`)
);

// Register battery_status tool
server.tool(
  'battery_status',
  'Hiển thị trạng thái pin của thiết bị.\nVí dụ thực thi: adb shell dumpsys battery | grep status.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell dumpsys battery | grep status`)
);

// Register brand tool
server.tool(
  'brand',
  'Lấy tên thương hiệu của thiết bị.\nVí dụ thực thi: adb shell getprop ro.product.brand.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell getprop ro.product.brand`)
);

// Register brightness_auto tool
server.tool(
  'brightness_auto',
  'Chuyển sang chế độ độ sáng tự động.\nVí dụ thực thi: adb shell settings put system screen_brightness_mode 1.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell settings put system screen_brightness_mode 1`)
);

// Register brightness_set tool (with parameter)
server.tool(
  'brightness_set',
  'Đặt độ sáng màn hình (0-255).\nNhập các tham số sau: <mức độ sáng>.\nVí dụ thực thi: adb shell settings put system screen_brightness <mức độ sáng>.',
  z.object({
    brightness_level: z.number().describe('Mức độ sáng (0-255).'),
  }).shape,
  ({ brightness_level }) => registerPythonTool(`adb shell settings put system screen_brightness ${brightness_level}`)
);

// Register bugreport tool (with parameter)
server.tool(
  'bugreport',
  'Tạo một báo cáo lỗi đầy đủ.\nNhập các tham số sau: <path>.\nVí dụ thực thi: adb bugreport <path>.',
  z.object({
    path: z.string().describe('Đường dẫn lưu báo cáo lỗi.'),
  }).shape,
  ({ path }) => registerPythonTool(`adb bugreport ${path}`)
);

// Register cat tool (with parameter)
server.tool(
  'cat',
  'Hiển thị nội dung của tệp.\nNhập các tham số sau: <file_path>.\nVí dụ thực thi: adb shell cat /sdcard/file.txt.',
  z.object({
    file_path: z.string().describe('Đường dẫn đến tệp.'),
  }).shape,
  ({ file_path }) => registerPythonTool(`adb shell cat ${file_path}`)
);

// Register charging_off tool
server.tool(
  'charging_off',
  'Tắt mô phỏng sạc pin (yêu cầu quyền root).\nVí dụ thực thi: adb shell dumpsys battery set ac 0; adb shell dumpsys battery set usb 0.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell dumpsys battery set ac 0; adb shell dumpsys battery set usb 0`)
);

// Register charging_on tool
server.tool(
  'charging_on',
  'Bật mô phỏng sạc pin (yêu cầu quyền root).\nVí dụ thực thi: adb shell dumpsys battery set ac 1; adb shell dumpsys battery set usb 1.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell dumpsys battery set ac 1; adb shell dumpsys battery set usb 1`)
);

// Register chmod tool (with parameters)
server.tool(
  'chmod',
  'Thay đổi quyền của tệp hoặc thư mục.\nNhập các tham số sau: <permissions>, <path>.\nVí dụ thực thi: adb shell chmod 777 /sdcard/file.txt.',
  z.object({
    permissions: z.string().describe('Quyền (ví dụ: 777).'),
    path: z.string().describe('Đường dẫn đến tệp hoặc thư mục.'),
  }).shape,
  ({ permissions, path }) => registerPythonTool(`adb shell chmod ${permissions} ${path}`)
);

// Register chown tool (with parameters)
server.tool(
  'chown',
  'Thay đổi chủ sở hữu của tệp hoặc thư mục.\nNhập các tham số sau: <owner:group>, <path>.\nVí dụ thực thi: adb shell chown root:root /sdcard/file.txt.',
  z.object({
    owner_group: z.string().describe('Chủ sở hữu và nhóm (ví dụ: root:root).'),
    path: z.string().describe('Đường dẫn đến tệp hoặc thư mục.'),
  }).shape,
  ({ owner_group, path }) => registerPythonTool(`adb shell chown ${owner_group} ${path}`)
);

// Register clear_data tool (with parameter)
server.tool(
  'clear_data',
  'Xóa dữ liệu của một ứng dụng.\nNhập các tham số sau: <package_name>.\nVí dụ thực thi: adb shell pm clear <package_name>.',
  z.object({
    package_name: z.string().describe('Tên gói ứng dụng.'),
  }).shape,
  ({ package_name }) => registerPythonTool(`adb shell pm clear ${package_name}`)
);

// Register connect tool (with parameter)
server.tool(
  'connect',
  'Kết nối thiết bị Android với máy tính qua TCP/IP, cho phép điều khiển thiết bị không dây. Cần IP và cổng của thiết bị. Ví dụ: `adb connect 192.168.1.100:5555`.',
  z.object({
    ip_port: z.string().describe('Địa chỉ IP và cổng (ví dụ: 192.168.1.100:5555).'),
  }).shape,
  ({ ip_port }) => registerPythonTool(`adb connect ${ip_port}`)
);

// Register cp tool (with parameters)
server.tool(
  'cp',
  'Sao chép tệp hoặc thư mục trên thiết bị.\nNhập các tham số sau: <source_path>, <destination_path>.\nVí dụ thực thi: adb shell cp /sdcard/file.txt /sdcard/file_copy.txt.',
  z.object({
    source_path: z.string().describe('Đường dẫn nguồn.'),
    destination_path: z.string().describe('Đường dẫn đích.'),
  }).shape,
  ({ source_path, destination_path }) => registerPythonTool(`adb shell cp ${source_path} ${destination_path}`)
);

// Register cpuinfo tool
server.tool(
  'cpuinfo',
  'Hiển thị thông tin CPU của thiết bị.\nVí dụ thực thi: adb shell cat /proc/cpuinfo.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell cat /proc/cpuinfo`)
);

// Register data_off tool
server.tool(
  'data_off',
  'Tắt dữ liệu di động trên thiết bị.\nVí dụ thực thi: adb shell svc data disable.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell svc data disable`)
);

// Register data_on tool
server.tool(
  'data_on',
  'Bật dữ liệu di động trên thiết bị.\nVí dụ thực thi: adb shell svc data enable.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell svc data enable`)
);

// Register developer_options_off tool
server.tool(
  'developer_options_off',
  'Tắt tùy chọn nhà phát triển.\nVí dụ thực thi: adb shell settings put global development_settings_enabled 0.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell settings put global development_settings_enabled 0`)
);

// Register developer_options_on tool
server.tool(
  'developer_options_on',
  'Bật tùy chọn nhà phát triển (nếu chưa bật).\nVí dụ thực thi: adb shell settings put global development_settings_enabled 1.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell settings put global development_settings_enabled 1`)
);

// Register devices tool
server.tool(
  'devices',
  'Liệt kê tất cả các thiết bị Android (điện thoại, máy tính bảng, giả lập) đang kết nối với máy tính qua USB hoặc TCP/IP, hiển thị trạng thái kết nối. Ví dụ: `adb devices`.',
  z.object({}).shape,
  () => registerPythonTool(`adb devices`)
);

// Register devices_long tool
server.tool(
  'devices_long',
  'Liệt kê tất cả các thiết bị Android đang kết nối, bao gồm thông tin chi tiết như model, sản phẩm, và transport ID. Hữu ích để phân biệt các thiết bị tương tự. Ví dụ: `adb devices -l`.',
  z.object({}).shape,
  () => registerPythonTool(`adb devices -l`)
);

// Register disable_app tool (with parameter)
server.tool(
  'disable_app',
  'Vô hiệu hóa một ứng dụng.\nNhập các tham số sau: <package_name>.\nVí dụ thực thi: adb shell pm disable-user <package_name>.',
  z.object({
    package_name: z.string().describe('Tên gói ứng dụng.'),
  }).shape,
  ({ package_name }) => registerPythonTool(`adb shell pm disable-user ${package_name}`)
);

// Register disconnect tool
server.tool(
  'disconnect',
  'Ngắt kết nối với thiết bị Android qua TCP/IP.\nVí dụ thực thi: adb disconnect.',
  z.object({}).shape,
  () => registerPythonTool(`adb disconnect`)
);

// Register disk_usage tool
server.tool(
  'disk_usage',
  'Hiển thị thông tin sử dụng bộ nhớ trong của thiết bị.\nVí dụ thực thi: adb shell df -h.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell df -h`)
);

// Register dns tool
server.tool(
  'dns',
  'Hiển thị cấu hình DNS của thiết bị.\nVí dụ thực thi: adb shell getprop | grep dns.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell getprop | grep dns`)
);

// Register du tool (with parameter)
server.tool(
  'du',
  'Hiển thị dung lượng sử dụng của tệp hoặc thư mục.\nNhập các tham số sau: <path>.\nVí dụ thực thi: adb shell du -h /sdcard.',
  z.object({
    path: z.string().describe('Đường dẫn đến tệp hoặc thư mục.'),
  }).shape,
  ({ path }) => registerPythonTool(`adb shell du -h ${path}`)
);

// Register dumpsys tool (with optional parameter)
server.tool(
  'dumpsys',
  'Hiển thị thông tin chẩn đoán hệ thống.\nNhập các tham số sau: <service_name (tùy chọn)>.\nVí dụ thực thi: adb shell dumpsys activity.',
  z.object({
    service_name: z.string().optional().describe('Tên dịch vụ (tùy chọn).'),
  }).shape,
  ({ service_name }) => {
    const command = `adb shell dumpsys ${service_name || ''}`;
    return registerPythonTool(command.trim());
  }
);

// Register dumpsys_activity tool
server.tool(
  'dumpsys_activity',
  'Hiển thị thông tin về Activity Manager.\nVí dụ thực thi: adb shell dumpsys activity.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell dumpsys activity`)
);

// Register dumpsys_package tool
server.tool(
  'dumpsys_package',
  'Hiển thị thông tin về Package Manager.\nVí dụ thực thi: adb shell dumpsys package.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell dumpsys package`)
);

// Register dumpsys_window tool
server.tool(
  'dumpsys_window',
  'Hiển thị thông tin về Window Manager.\nVí dụ thực thi: adb shell dumpsys window.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell dumpsys window`)
);

// Register enable_app tool (with parameter)
server.tool(
  'enable_app',
  'Bật một ứng dụng đã bị vô hiệu hóa.\nNhập các tham số sau: <package_name>.\nVí dụ thực thi: adb shell pm enable <package_name>.',
  z.object({
    package_name: z.string().describe('Tên gói ứng dụng.'),
  }).shape,
  ({ package_name }) => registerPythonTool(`adb shell pm enable ${package_name}`)
);

// Register env tool
server.tool(
  'env',
  'Hiển thị các biến môi trường của shell.\nVí dụ thực thi: adb shell env.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell env`)
);

// Register erase_partition tool (with parameter)
server.tool(
  'erase_partition',
  'Xóa một phân vùng trên thiết bị (yêu cầu fastboot).\nNhập các tham số sau: <partition>.\nVí dụ thực thi: fastboot erase <partition> (Lưu ý: Lệnh này không phải adb, mà là fastboot và cần thiết bị ở chế độ bootloader).',
  z.object({
    partition: z.string().describe('Tên phân vùng.'),
  }).shape,
  ({ partition }) => registerPythonTool(`fastboot erase ${partition}`)
);

// Register find tool (with parameters)
server.tool(
  'find',
  'Tìm kiếm tệp trên thiết bị.\nNhập các tham số sau: <directory>, <tên tệp/pattern>.\nVí dụ thực thi: adb shell find /sdcard -name "*.jpg".',
  z.object({
    directory: z.string().describe('Thư mục để tìm kiếm.'),
    file_pattern: z.string().describe('Tên tệp hoặc pattern.'),
  }).shape,
  ({ directory, file_pattern }) => registerPythonTool(`adb shell find ${directory} -name "${file_pattern}"`) // Corrected escaping for file_pattern
);

// Register flash_image tool (with parameters)
server.tool(
  'flash_image',
  'Flash một image vào thiết bị (yêu cầu fastboot).\nNhập các tham số sau: <partition>, <image_file>.\nVí dụ thực thi: fastboot flash <partition> <image_file> (Lưu ý: Lệnh này không phải adb, mà là fastboot và cần thiết bị ở chế độ bootloader).',
  z.object({
    partition: z.string().describe('Tên phân vùng.'),
    image_file: z.string().describe('Đường dẫn đến tệp image.'),
  }).shape,
  ({ partition, image_file }) => registerPythonTool(`fastboot flash ${partition} ${image_file}`)
);

// Register force_stop tool (with parameter)
server.tool(
  'force_stop',
  'Buộc dừng một ứng dụng.\nNhập các tham số sau: <package_name>.\nVí dụ thực thi: adb shell am force-stop <package_name>.',
  z.object({
    package_name: z.string().describe('Tên gói ứng dụng.'),
  }).shape,
  ({ package_name }) => registerPythonTool(`adb shell am force-stop ${package_name}`)
);

// Register get_serial tool
server.tool(
  'get_serial',
  'Lấy số serial của thiết bị.\nVí dụ thực thi: adb get-serialno.',
  z.object({}).shape,
  () => registerPythonTool(`adb get-serialno`)
);

// Register get_state tool
server.tool(
  'get_state',
  'Lấy trạng thái kết nối của thiết bị.\nVí dụ thực thi: adb get-state.',
  z.object({}).shape,
  () => registerPythonTool(`adb get-state`)
);

// Register getprop tool
server.tool(
  'getprop',
  'Lấy thông tin thuộc tính hệ thống của thiết bị.\nVí dụ thực thi: adb shell getprop.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell getprop`)
);

// Register grant_permission tool (with parameters)
server.tool(
  'grant_permission',
  'Cấp quyền cho ứng dụng.\nNhập các tham số sau: <package_name>, <permission>.\nVí dụ thực thi: adb shell pm grant <package_name> android.permission.READ_CONTACTS.',
  z.object({
    package_name: z.string().describe('Tên gói ứng dụng.'),
    permission: z.string().describe('Quyền cần cấp.'),
  }).shape,
  ({ package_name, permission }) => registerPythonTool(`adb shell pm grant ${package_name} ${permission}`)
);

// Register hardware tool
server.tool(
  'hardware',
  'Lấy thông tin phần cứng của thiết bị.\nVí dụ thực thi: adb shell getprop ro.hardware.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell getprop ro.hardware`)
);

// Register head tool (with parameter)
server.tool(
  'head',
  'Hiển thị những dòng đầu của tệp.\nNhập các tham số sau: <file_path>.\nVí dụ thực thi: adb shell head /sdcard/file.txt.',
  z.object({
    file_path: z.string().describe('Đường dẫn đến tệp.'),
  }).shape,
  ({ file_path }) => registerPythonTool(`adb shell head ${file_path}`)
);

// Register home tool
server.tool(
  'home',
  'Nhấn nút Home.\nVí dụ thực thi: adb shell input keyevent KEYCODE_HOME.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell input keyevent KEYCODE_HOME`)
);

// Register id tool
server.tool(
  'id',
  'Hiển thị thông tin người dùng và nhóm.\nVí dụ thực thi: adb shell id.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell id`)
);

// Register ifconfig tool
server.tool(
  'ifconfig',
  'Hiển thị cấu hình giao diện mạng.\nVí dụ thực thi: adb shell ifconfig.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell ifconfig`)
);

// Register immersive_mode tool (with parameter)
server.tool(
  'immersive_mode',
  'Đặt ứng dụng vào chế độ nhập vai toàn màn hình.\nNhập các tham số sau: <package_name>.\nVí dụ thực thi: adb shell settings put global policy_control immersive.full=<package_name>.',
  z.object({
    package_name: z.string().describe('Tên gói ứng dụng.'),
  }).shape,
  ({ package_name }) => registerPythonTool(`adb shell settings put global policy_control immersive.full=${package_name}`)
);

// Register input_keyevent tool (with parameter)
server.tool(
  'input_keyevent',
  'Gửi một sự kiện phím.\nNhập các tham số sau: <mã phím (KEY_CODE)>.\nVí dụ thực thi: adb shell input keyevent KEYCODE_BACK.',
  z.object({
    key_code: z.string().describe('Mã phím (KEY_CODE).'),
  }).shape,
  ({ key_code }) => registerPythonTool(`adb shell input keyevent ${key_code}`)
);

// Register input_longpress tool (with parameters)
server.tool(
  'input_longpress',
  'Nhấn giữ một vị trí trên màn hình.\nNhập các tham số sau: <x>, <y>, <thời gian (ms)>.\nVí dụ thực thi: adb shell input swipe 500 1000 500 1000 1500.',
  z.object({
    x: z.number().describe('Tọa độ X.'),
    y: z.number().describe('Tọa độ Y.'),
    duration_ms: z.number().describe('Thời gian nhấn giữ (ms).'),
  }).shape,
  ({ x, y, duration_ms }) => registerPythonTool(`adb shell input swipe ${x} ${y} ${x} ${y} ${duration_ms}`)
);

// Register input_swipe tool (with parameters)
server.tool(
  'input_swipe',
  'Vuốt trên màn hình.\nNhập các tham số sau: <x1>, <y1>, <x2>, <y2>, <thời gian (ms) (tùy chọn)>.\nVí dụ thực thi: adb shell input swipe 100 500 900 500 200.',
  z.object({
    x1: z.number().describe('Tọa độ X bắt đầu.'),
    y1: z.number().describe('Tọa độ Y bắt đầu.'),
    x2: z.number().describe('Tọa độ X kết thúc.'),
    y2: z.number().describe('Tọa độ Y kết thúc.'),
    duration_ms: z.number().optional().describe('Thời gian vuốt (ms) (tùy chọn).'),
  }).shape,
  ({ x1, y1, x2, y2, duration_ms }) => {
    const duration_arg = duration_ms ? ` ${duration_ms}` : '';
    return registerPythonTool(`adb shell input swipe ${x1} ${y1} ${x2} ${y2}${duration_arg}`);
  }
);

// Register input_tap tool (with parameters)
server.tool(
  'input_tap',
  'Chạm vào một vị trí trên màn hình.\nNhập các tham số sau: <x>, <y>.\nVí dụ thực thi: adb shell input tap 500 1000.',
  z.object({
    x: z.number().describe('Tọa độ X.'),
    y: z.number().describe('Tọa độ Y.'),
  }).shape,
  ({ x, y }) => registerPythonTool(`adb shell input tap ${x} ${y}`)
);

// Register input_text tool (with parameter)
server.tool(
  'input_text',
  'Nhập văn bản vào thiết bị.\nNhập các tham số sau: <văn bản>.\nVí dụ thực thi: adb shell input text \'hello world\'.',
  z.object({
    text: z.string().describe('Văn bản cần nhập.'),
  }).shape,
  ({ text }) => registerPythonTool(`adb shell input text '${text}'`)
);

// Register install tool (with parameter)
server.tool(
  'install',
  'Cài đặt ứng dụng từ tệp APK.\nNhập các tham số sau: <đường dẫn APK trên máy tính>.\nVí dụ thực thi: adb install <đường dẫn APK>.',
  z.object({
    apk_path: z.string().describe('Đường dẫn APK trên máy tính.'),
  }).shape,
  ({ apk_path }) => registerPythonTool(`adb install ${apk_path}`)
);

// Register install_multiple tool (with parameter)
server.tool(
  'install_multiple',
  'Cài đặt nhiều APK cho một ứng dụng.\nNhập các tham số sau: <đường dẫn đến các APK trên máy tính>.\nVí dụ thực thi: adb install-multiple <path1.apk> <path2.apk>.',
  z.object({
    apk_paths: z.string().describe('Đường dẫn đến các APK trên máy tính (cách nhau bởi dấu cách).'),
  }).shape,
  ({ apk_paths }) => registerPythonTool(`adb install-multiple ${apk_paths}`)
);

// Register install_replace tool (with parameter)
server.tool(
  'install_replace',
  'Cài đặt lại ứng dụng, giữ nguyên dữ liệu.\nNhập các tham số sau: <đường dẫn APK trên máy tính>.\nVí dụ thực thi: adb install -r <đường dẫn APK>.',
  z.object({
    apk_path: z.string().describe('Đường dẫn APK trên máy tính.'),
  }).shape,
  ({ apk_path }) => registerPythonTool(`adb install -r ${apk_path}`)
);

// Register ip_addr tool
server.tool(
  'ip_addr',
  'Hiển thị địa chỉ IP của thiết bị.\nVí dụ thực thi: adb shell ip addr show wlan0.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell ip addr show wlan0`)
);

// Register jobs tool
server.tool(
  'jobs',
  'Liệt kê các công việc trong shell.\nVí dụ thực thi: adb shell jobs.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell jobs`)
);

// Register kill tool (with parameter)
server.tool(
  'kill',
  'Kết thúc một tiến trình bằng PID.\nNhập các tham số sau: <PID>.\nVí dụ thực thi: adb shell kill <PID>.',
  z.object({
    pid: z.number().describe('PID của tiến trình.'),
  }).shape,
  ({ pid }) => registerPythonTool(`adb shell kill ${pid}`)
);

// Register kill_server tool
server.tool(
  'kill_server',
  'Dừng hoàn toàn máy chủ ADB đang chạy trên máy tính. Thường dùng để khởi động lại máy chủ khi gặp sự cố kết nối. Ví dụ: `adb kill-server`.',
  z.object({}).shape,
  () => registerPythonTool(`adb kill-server`)
);

// Register killall tool (with parameter)
server.tool(
  'killall',
  'Kết thúc tất cả các tiến trình có tên cụ thể.\nNhập các tham số sau: <tên tiến trình>.\nVí dụ thực thi: adb shell killall <tên tiến trình>.',
  z.object({
    process_name: z.string().describe('Tên tiến trình.'),
  }).shape,
  ({ process_name }) => registerPythonTool(`adb shell killall ${process_name}`)
);

// Register layout_bounds tool (with parameter)
server.tool(
  'layout_bounds',
  'Hiển thị ranh giới bố cục của các thành phần UI.\nNhập các tham số sau: <0 (tắt) hoặc 1 (bật)>.\nVí dụ thực thi: adb shell setprop debug.layout true.',
  z.object({
    state: z.number().int().min(0).max(1).describe('Trạng thái (0: tắt, 1: bật).'),
  }).shape,
  ({ state }) => registerPythonTool(`adb shell setprop debug.layout ${state === 1 ? 'true' : 'false'}`)
);

// Register less tool (with parameter)
server.tool(
  'less',
  'Xem nội dung của tệp theo từng trang (nếu có sẵn).\nNhập các tham số sau: <file_path>.\nVí dụ thực thi: adb shell less /sdcard/log.txt.',
  z.object({
    file_path: z.string().describe('Đường dẫn đến tệp.'),
  }).shape,
  ({ file_path }) => registerPythonTool(`adb shell less ${file_path}`)
);

// Register list_packages tool
server.tool(
  'list_packages',
  'Liệt kê tất cả các gói ứng dụng đã cài đặt.\nVí dụ thực thi: adb shell pm list packages.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell pm list packages`)
);

// Register list_packages_system tool
server.tool(
  'list_packages_system',
  'Liệt kê các gói ứng dụng hệ thống đã cài đặt.\nVí dụ thực thi: adb shell pm list packages -s.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell pm list packages -s`)
);

// Register list_packages_user tool
server.tool(
  'list_packages_user',
  'Liệt kê các gói ứng dụng đã cài đặt cho người dùng.\nVí dụ thực thi: adb shell pm list packages -3.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell pm list packages -3`)
);

// Register locale tool
server.tool(
  'locale',
  'Lấy ngôn ngữ và khu vực hiện tại của thiết bị.\nVí dụ thực thi: adb shell getprop persist.sys.locale.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell getprop persist.sys.locale`)
);

// Register logcat tool
server.tool(
  'logcat',
  'Hiển thị nhật ký logcat của thiết bị.\nVí dụ thực thi: adb logcat.',
  z.object({}).shape,
  () => registerPythonTool(`adb logcat`)
);

// Register logcat_clear tool
server.tool(
  'logcat_clear',
  'Xóa nhật ký logcat hiện có.\nVí dụ thực thi: adb logcat -c.',
  z.object({}).shape,
  () => registerPythonTool(`adb logcat -c`)
);

// Register logcat_file tool (with parameter)
server.tool(
  'logcat_file',
  'Ghi nhật ký logcat ra tệp trên máy tính.\nNhập các tham số sau: <local_file_path>.\nVí dụ thực thi: adb logcat -d > <local_file_path>.',
  z.object({
    local_file_path: z.string().describe('Đường dẫn tệp cục bộ để lưu nhật ký.'),
  }).shape,
  ({ local_file_path }) => registerPythonTool(`adb logcat -d > ${local_file_path}`)
);

// Register logcat_tag tool (with parameter)
server.tool(
  'logcat_tag',
  'Lọc nhật ký logcat theo tag.\nNhập các tham số sau: <tag>.\nVí dụ thực thi: adb logcat -s <tag>.',
  z.object({
    tag: z.string().describe('Tag để lọc nhật ký.'),
  }).shape,
  ({ tag }) => registerPythonTool(`adb logcat -s ${tag}`)
);

// Register ls tool (with optional parameter)
server.tool(
  'ls',
  'Liệt kê nội dung của một thư mục.\nNhập các tham số sau: <path (tùy chọn)>.\nVí dụ thực thi: adb shell ls /sdcard.',
  z.object({
    path: z.string().optional().describe('Đường dẫn đến thư mục (tùy chọn).'),
  }).shape,
  ({ path }) => {
    const command = `adb shell ls ${path || ''}`;
    return registerPythonTool(command.trim());
  }
);

// Register manufacturer tool
server.tool(
  'manufacturer',
  'Lấy tên nhà sản xuất của thiết bị.\nVí dụ thực thi: adb shell getprop ro.product.manufacturer.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell getprop ro.product.manufacturer`)
);

// Register media_scan tool (with parameter)
server.tool(
  'media_scan',
  'Yêu cầu MediaScanner quét lại thư mục.\nNhập các tham số sau: <path>.\nVí dụ thực thi: adb shell am broadcast -a android.intent.action.MEDIA_MOUNTED -d file://<path>.',
  z.object({
    path: z.string().describe('Đường dẫn cần quét.'),
  }).shape,
  ({ path }) => registerPythonTool(`adb shell am broadcast -a android.intent.action.MEDIA_MOUNTED -d file://${path}`)
);

// Register meminfo tool
server.tool(
  'meminfo',
  'Hiển thị thông tin bộ nhớ của thiết bị.\nVí dụ thực thi: adb shell cat /proc/meminfo.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell cat /proc/meminfo`)
);

// Register mkdir tool (with parameter)
server.tool(
  'mkdir',
  'Tạo thư mục trên thiết bị.\nNhập các tham số sau: <directory_path>.\nVí dụ thực thi: adb shell mkdir /sdcard/new_dir.',
  z.object({
    directory_path: z.string().describe('Đường dẫn thư mục.'),
  }).shape,
  ({ directory_path }) => registerPythonTool(`adb shell mkdir ${directory_path}`)
);

// Register model tool
server.tool(
  'model',
  'Lấy tên model của thiết bị.\nVí dụ thực thi: adb shell getprop ro.product.model.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell getprop ro.product.model`)
);

// Register mount_ro tool (with parameter)
server.tool(
  'mount_ro',
  'Mount lại phân vùng hệ thống ở chế độ chỉ đọc.\nNhập các tham số sau: <partition_path>.\nVí dụ thực thi: adb shell mount -o ro,remount /system.',
  z.object({
    partition_path: z.string().describe('Đường dẫn phân vùng.'),
  }).shape,
  ({ partition_path }) => registerPythonTool(`adb shell mount -o ro,remount ${partition_path}`)
);

// Register mount_rw tool (with parameter)
server.tool(
  'mount_rw',
  'Mount lại phân vùng hệ thống ở chế độ đọc-ghi (yêu cầu quyền root).\nNhập các tham số sau: <partition_path>.\nVí dụ thực thi: adb shell mount -o rw,remount /system.',
  z.object({
    partition_path: z.string().describe('Đường dẫn phân vùng.'),
  }).shape,
  ({ partition_path }) => registerPythonTool(`adb shell mount -o rw,remount ${partition_path}`)
);

// Register mv tool (with parameters)
server.tool(
  'mv',
  'Di chuyển hoặc đổi tên tệp/thư mục trên thiết bị.\nNhập các tham số sau: <source_path>, <destination_path>.\nVí dụ thực thi: adb shell mv /sdcard/old.txt /sdcard/new.txt.',
  z.object({
    source_path: z.string().describe('Đường dẫn nguồn.'),
    destination_path: z.string().describe('Đường dẫn đích.'),
  }).shape,
  ({ source_path, destination_path }) => registerPythonTool(`adb shell mv ${source_path} ${destination_path}`)
);

// Register netstat tool
server.tool(
  'netstat',
  'Hiển thị các kết nối mạng và thống kê.\nVí dụ thực thi: adb shell netstat.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell netstat`)
);

// Register pair tool (with parameters)
server.tool(
  'pair',
  'Ghép nối với thiết bị Android qua Wi-Fi.\nNhập các tham số sau: <IP:PORT>, <mã ghép nối>.\nVí dụ thực thi: adb pair <IP:PORT> <mã ghép nối>.',
  z.object({
    ip_port: z.string().describe('Địa chỉ IP và cổng.'),
    pairing_code: z.string().describe('Mã ghép nối.'),
  }).shape,
  ({ ip_port, pairing_code }) => registerPythonTool(`adb pair ${ip_port} ${pairing_code}`)
);

// Register ping tool (with parameter)
server.tool(
  'ping',
  'Kiểm tra kết nối mạng đến một host.\nNhập các tham số sau: <host>.\nVí dụ thực thi: adb shell ping <host>.',
  z.object({
    host: z.string().describe('Host để kiểm tra.'),
  }).shape,
  ({ host }) => registerPythonTool(`adb shell ping ${host}`)
);

// Register pointer_location tool (with parameter)
server.tool(
  'pointer_location',
  'Hiển thị thông tin vị trí con trỏ trên màn hình.\nNhập các tham số sau: <0 (tắt) hoặc 1 (bật)>.\nVí dụ thực thi: adb shell settings put system pointer_location 1.',
  z.object({
    state: z.number().int().min(0).max(1).describe('Trạng thái (0: tắt, 1: bật).'),
  }).shape,
  ({ state }) => registerPythonTool(`adb shell settings put system pointer_location ${state}`)
);

// Register power tool
server.tool(
  'power',
  'Nhấn nút nguồn (tắt/mở màn hình).\nVí dụ thực thi: adb shell input keyevent KEYCODE_POWER.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell input keyevent KEYCODE_POWER`)
);

// Register proxy_clear tool
server.tool(
  'proxy_clear',
  'Xóa proxy HTTP toàn cầu.\nVí dụ thực thi: adb shell settings put global http_proxy :0.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell settings put global http_proxy :0`)
);

// Register proxy_set tool (with parameters)
server.tool(
  'proxy_set',
  'Đặt proxy HTTP toàn cầu.\nNhập các tham số sau: <host>, <port>.\nVí dụ thực thi: adb shell settings put global http_proxy <host>:<port>.',
  z.object({
    host: z.string().describe('Địa chỉ host của proxy.'),
    port: z.number().describe('Cổng của proxy.'),
  }).shape,
  ({ host, port }) => registerPythonTool(`adb shell settings put global http_proxy ${host}:${port}`)
);

// Register ps tool
server.tool(
  'ps',
  'Liệt kê các tiến trình đang chạy trên thiết bị.\nVí dụ thực thi: adb shell ps.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell ps`)
);

// Register pull tool (with parameters)
server.tool(
  'pull',
  'Sao chép tệp hoặc thư mục từ thiết bị về máy tính.\nNhập các tham số sau: <remote_path>, <local_path>.\nVí dụ thực thi: adb pull <remote_path> <local_path>.',
  z.object({
    remote_path: z.string().describe('Đường dẫn tệp/thư mục trên thiết bị.'),
    local_path: z.string().describe('Đường dẫn lưu trên máy tính.'),
  }).shape,
  ({ remote_path, local_path }) => registerPythonTool(`adb pull ${remote_path} ${local_path}`)
);

// Register pull_record tool (with parameters)
server.tool(
  'pull_record',
  'Kéo tệp ghi màn hình từ thiết bị về máy tính.\nNhập các tham số sau: <remote_path>, <local_file_path>.\nVí dụ thực thi: adb pull /sdcard/demo.mp4 <local_file_path>.',
  z.object({
    remote_path: z.string().describe('Đường dẫn tệp ghi màn hình trên thiết bị.'),
    local_file_path: z.string().describe('Đường dẫn lưu trên máy tính.'),
  }).shape,
  ({ remote_path, local_file_path }) => registerPythonTool(`adb pull ${remote_path} ${local_file_path}`)
);

// Register push tool (with parameters)
server.tool(
  'push',
  'Sao chép tệp hoặc thư mục từ máy tính lên thiết bị.\nNhập các tham số sau: <local_path>, <remote_path>.\nVí dụ thực thi: adb push <local_path> <remote_path>.',
  z.object({
    local_path: z.string().describe('Đường dẫn tệp/thư mục trên máy tính.'),
    remote_path: z.string().describe('Đường dẫn đích trên thiết bị.'),
  }).shape,
  ({ local_path, remote_path }) => registerPythonTool(`adb push ${local_path} ${remote_path}`)
);

// Register reboot tool
server.tool(
  'reboot',
  'Khởi động lại thiết bị.\nVí dụ thực thi: adb reboot.',
  z.object({}).shape,
  () => registerPythonTool(`adb reboot`)
);

// Register reboot_bootloader tool
server.tool(
  'reboot_bootloader',
  'Khởi động lại thiết bị vào chế độ Bootloader.\nVí dụ thực thi: adb reboot bootloader.',
  z.object({}).shape,
  () => registerPythonTool(`adb reboot bootloader`)
);

// Register reboot_recovery tool
server.tool(
  'reboot_recovery',
  'Khởi động lại thiết bị vào chế độ Recovery.\nVí dụ thực thi: adb reboot recovery.',
  z.object({}).shape,
  () => registerPythonTool(`adb reboot recovery`)
);

// Register recents tool
server.tool(
  'recents',
  'Mở màn hình ứng dụng gần đây.\nVí dụ thực thi: adb shell input keyevent KEYCODE_APP_SWITCH.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell input keyevent KEYCODE_APP_SWITCH`)
);

// Register remount tool
server.tool(
  'remount',
  'Remount phân vùng hệ thống để có thể ghi (yêu cầu quyền root).\nVí dụ thực thi: adb remount.',
  z.object({}).shape,
  () => registerPythonTool(`adb remount`)
);

// Register revoke_permission tool (with parameters)
server.tool(
  'revoke_permission',
  'Thu hồi quyền của ứng dụng.\nNhập các tham số sau: <package_name>, <permission>.\nVí dụ thực thi: adb shell pm revoke <package_name> android.permission.READ_CONTACTS.',
  z.object({
    package_name: z.string().describe('Tên gói ứng dụng.'),
    permission: z.string().describe('Quyền cần thu hồi.'),
  }).shape,
  ({ package_name, permission }) => registerPythonTool(`adb shell pm revoke ${package_name} ${permission}`)
);

// Register rm tool (with parameter)
server.tool(
  'rm',
  'Xóa tệp trên thiết bị.\nNhập các tham số sau: <file_path>.\nVí dụ thực thi: adb shell rm /sdcard/file.txt.',
  z.object({
    file_path: z.string().describe('Đường dẫn đến tệp.'),
  }).shape,
  ({ file_path }) => registerPythonTool(`adb shell rm ${file_path}`)
);

// Register rmdir tool (with parameter)
server.tool(
  'rmdir',
  'Xóa thư mục rỗng trên thiết bị.\nNhập các tham số sau: <directory_path>.\nVí dụ thực thi: adb shell rmdir /sdcard/empty_dir.',
  z.object({
    directory_path: z.string().describe('Đường dẫn thư mục.'),
  }).shape,
  ({ directory_path }) => registerPythonTool(`adb shell rmdir ${directory_path}`)
);

// Register root tool
server.tool(
  'root',
  'Khởi động lại ADB với quyền root.\nVí dụ thực thi: adb root.',
  z.object({}).shape,
  () => registerPythonTool(`adb root`)
);

// Register rotation_lock tool
server.tool(
  'rotation_lock',
  'Khóa xoay màn hình ở chế độ hiện tại.\nVí dụ thực thi: adb shell settings put system accelerometer_rotation 0.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell settings put system accelerometer_rotation 0`)
);

// Register rotation_unlock tool
server.tool(
  'rotation_unlock',
  'Mở khóa xoay màn hình (cho phép tự động xoay).\nVí dụ thực thi: adb shell settings put system accelerometer_rotation 1.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell settings put system accelerometer_rotation 1`)
);

// Register route tool
server.tool(
  'route',
  'Hiển thị bảng định tuyến.\nVí dụ thực thi: adb shell route.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell route`)
);

// Register screenrecord tool (with parameter)
server.tool(
  'screenrecord',
  'Quay video màn hình của thiết bị.\nNhập các tham số sau: <thời gian (giây)>.\nVí dụ thực thi: adb shell screenrecord --time-limit <thời gian> /sdcard/demo.mp4.',
  z.object({
    time_limit_seconds: z.number().describe('Thời gian quay (giây).'),
  }).shape,
  ({ time_limit_seconds }) => registerPythonTool(`adb shell screenrecord --time-limit ${time_limit_seconds} /sdcard/demo.mp4`)
);

// Register screenrecord_bitrate tool (with parameter)
server.tool(
  'screenrecord_bitrate',
  'Quay video màn hình với tốc độ bit cụ thể.\nNhập các tham số sau: <bitrate (Mbps)>.\nVí dụ thực thi: adb shell screenrecord --bit-rate <bitrate> /sdcard/demo.mp4.',
  z.object({
    bitrate_mbps: z.number().describe('Tốc độ bit (Mbps).'),
  }).shape,
  ({ bitrate_mbps }) => registerPythonTool(`adb shell screenrecord --bit-rate ${bitrate_mbps} /sdcard/demo.mp4`)
);

// Register screenrecord_size tool (with parameter)
server.tool(
  'screenrecord_size',
  'Quay video màn hình với kích thước cụ thể.\nNhập các tham số sau: <width x height>.\nVí dụ thực thi: adb shell screenrecord --size <width>x<height> /sdcard/demo.mp4.',
  z.object({
    width: z.number().describe('Chiều rộng.'),
    height: z.number().describe('Chiều cao.'),
  }).shape,
  ({ width, height }) => registerPythonTool(`adb shell screenrecord --size ${width}x${height} /sdcard/demo.mp4`)
);

// Register screenshot tool (with optional parameter)
server.tool(
  'screenshot',
  'Chụp ảnh màn hình của thiết bị và lưu cục bộ.\nNhập các tham số sau: <local_file_path (tùy chọn)>.\nVí dụ thực thi: adb exec-out screencap -p > <local_file_path>.',
  z.object({
    local_file_path: z.string().optional().describe('Đường dẫn tệp cục bộ để lưu ảnh (tùy chọn).'),
  }).shape,
  ({ local_file_path }) => {
    const output_redirect = local_file_path ? ` > ${local_file_path}` : '';
    return registerPythonTool(`adb exec-out screencap -p${output_redirect}`);
  }
);

// Register sdk_version tool
server.tool(
  'sdk_version',
  'Lấy phiên bản SDK của thiết bị.\nVí dụ thực thi: adb shell getprop ro.build.version.sdk.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell getprop ro.build.version.sdk`)
);

// Register selinux_enforcing tool
server.tool(
  'selinux_enforcing',
  'Đặt SELinux ở chế độ Enforcing (chặn và ghi log).\nVí dụ thực thi: adb shell setenforce 1.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell setenforce 1`)
);

// Register selinux_permissive tool
server.tool(
  'selinux_permissive',
  'Đặt SELinux ở chế độ Permissive (cảnh báo nhưng không chặn).\nVí dụ thực thi: adb shell setenforce 0.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell setenforce 0`)
);

// Register selinux_status tool
server.tool(
  'selinux_status',
  'Hiển thị trạng thái SELinux.\nVí dụ thực thi: adb shell getenforce.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell getenforce`)
);

// Register set_app_debuggable tool (with parameter)
server.tool(
  'set_app_debuggable',
  'Đặt ứng dụng là debuggable.\nNhập các tham số sau: <package_name>.\nVí dụ thực thi: adb shell am set-debug-app -w <package_name>.',
  z.object({
    package_name: z.string().describe('Tên gói ứng dụng.'),
  }).shape,
  ({ package_name }) => registerPythonTool(`adb shell am set-debug-app -w ${package_name}`)
);

// Register shell tool
server.tool(
  'shell',
  'Mở một shell tương tác trên thiết bị.\nVí dụ thực thi: adb shell.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell`)
);

// Register show_touches tool (with parameter)
server.tool(
  'show_touches',
  'Hiển thị các tương tác chạm trên màn hình (để gỡ lỗi UI).\nNhập các tham số sau: <0 (tắt) hoặc 1 (bật)>.\nVí dụ thực thi: adb shell settings put system show_touches 1.',
  z.object({
    state: z.number().int().min(0).max(1).describe('Trạng thái (0: tắt, 1: bật).'),
  }).shape,
  ({ state }) => registerPythonTool(`adb shell settings put system show_touches ${state}`)
);

// Register shutdown tool
server.tool(
  'shutdown',
  'Tắt thiết bị.\nVí dụ thực thi: adb shell reboot -p.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell reboot -p`)
);

// Register start_server tool
server.tool(
  'start_server',
  'Khởi động máy chủ ADB trên máy tính. Máy chủ này là thành phần nền cần thiết để giao tiếp với các thiết bị Android. Ví dụ: `adb start-server`.',
  z.object({}).shape,
  () => registerPythonTool(`adb start-server`)
);

// Register stat tool (with parameter)
server.tool(
  'stat',
  'Hiển thị thông tin trạng thái tệp hoặc thư mục.\nNhập các tham số sau: <path>.\nVí dụ thực thi: adb shell stat /sdcard/file.txt.',
  z.object({
    path: z.string().describe('Đường dẫn đến tệp hoặc thư mục.'),
  }).shape,
  ({ path }) => registerPythonTool(`adb shell stat ${path}`)
);

// Register stay_awake_off tool
server.tool(
  'stay_awake_off',
  'Tắt chế độ màn hình luôn sáng.\nVí dụ thực thi: adb shell settings put global stay_on_while_plugged_in 0.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell settings put global stay_on_while_plugged_in 0`)
);

// Register stay_awake_on tool
server.tool(
  'stay_awake_on',
  'Giữ màn hình luôn sáng khi sạc.\nVí dụ thực thi: adb shell settings put global stay_on_while_plugged_in 7.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell settings put global stay_on_while_plugged_in 7`)
);

// Register su tool (with parameter)
server.tool(
  'su',
  'Chạy lệnh với quyền superuser (chỉ trên thiết bị đã root).\nNhập các tham số sau: <lệnh>.\nVí dụ thực thi: adb shell su -c \'<lệnh>\'.',
  z.object({
    command_to_execute: z.string().describe('Lệnh cần chạy với quyền superuser.'),
  }).shape,
  ({ command_to_execute }) => registerPythonTool(`adb shell su -c '${command_to_execute}'`)
);

// Register tail tool (with parameter)
server.tool(
  'tail',
  'Hiển thị những dòng cuối của tệp.\nNhập các tham số sau: <file_path>.\nVí dụ thực thi: adb shell tail -n 10 /sdcard/log.txt.',
  z.object({
    file_path: z.string().describe('Đường dẫn đến tệp.'),
  }).shape,
  ({ file_path }) => registerPythonTool(`adb shell tail ${file_path}`)
);

// Register tcpip tool (with parameter)
server.tool(
  'tcpip',
  'Khởi động lại ADB ở chế độ TCP/IP trên một cổng cụ thể.\nNhập các tham số sau: <port>.\nVí dụ thực thi: adb tcpip <port>.',
  z.object({
    port: z.number().describe('Cổng để khởi động lại ADB.'),
  }).shape,
  ({ port }) => registerPythonTool(`adb tcpip ${port}`)
);

// Register thermal tool
server.tool(
  'thermal',
  'Hiển thị thông tin nhiệt độ của thiết bị.\nVí dụ thực thi: adb shell dumpsys thermalservice.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell dumpsys thermalservice`)
);

// Register timezone tool
server.tool(
  'timezone',
  'Lấy múi giờ hiện tại của thiết bị.\nVí dụ thực thi: adb shell getprop persist.sys.timezone.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell getprop persist.sys.timezone`)
);

// Register tombstones tool
server.tool(
  'tombstones',
  'Liệt kê các tệp tombstones (thông tin lỗi ứng dụng).\nVí dụ thực thi: adb shell ls /data/tombstones.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell ls /data/tombstones`)
);

// Register top tool
server.tool(
  'top',
  'Hiển thị các tiến trình đang sử dụng nhiều tài nguyên nhất.\nVí dụ thực thi: adb shell top -n 1.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell top -n 1`)
);

// Register tree tool (with optional parameter)
server.tool(
  'tree',
  'Hiển thị cấu trúc cây thư mục (nếu có sẵn).\nNhập các tham số sau: <path (tùy chọn)>.\nVí dụ thực thi: adb shell tree /sdcard.',
  z.object({
    path: z.string().optional().describe('Đường dẫn đến thư mục (tùy chọn).'),
  }).shape,
  ({ path }) => {
    const command = `adb shell tree ${path || ''}`;
    return registerPythonTool(command.trim());
  }
);

// Register uninstall tool (with parameter)
server.tool(
  'uninstall',
  'Gỡ cài đặt một ứng dụng.\nNhập các tham số sau: <package_name>.\nVí dụ thực thi: adb uninstall <package_name>.',
  z.object({
    package_name: z.string().describe('Tên gói ứng dụng.'),
  }).shape,
  ({ package_name }) => registerPythonTool(`adb uninstall ${package_name}`)
);

// Register unroot tool
server.tool(
  'unroot',
  'Khởi động lại ADB không có quyền root.\nVí dụ thực thi: adb unroot.',
  z.object({}).shape,
  () => registerPythonTool(`adb unroot`)
);

// Register uptime tool
server.tool(
  'uptime',
  'Hiển thị thời gian hoạt động của thiết bị.\nVí dụ thực thi: adb shell uptime.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell uptime`)
);

// Register usb tool
server.tool(
  'usb',
  'Chuyển ADB sang chế độ USB.\nVí dụ thực thi: adb usb.',
  z.object({}).shape,
  () => registerPythonTool(`adb usb`)
);

// Register verify_apps_off tool
server.tool(
  'verify_apps_off',
  'Tắt xác minh ứng dụng qua ADB.\nVí dụ thực thi: adb shell settings put global verify_apps_over_adb 0.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell settings put global verify_apps_over_adb 0`)
);

// Register verify_apps_on tool
server.tool(
  'verify_apps_on',
  'Bật xác minh ứng dụng qua ADB.\nVí dụ thực thi: adb shell settings put global verify_apps_over_adb 1.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell settings put global verify_apps_over_adb 1`)
);

// Register volume_down tool
server.tool(
  'volume_down',
  'Giảm âm lượng.\nVí dụ thực thi: adb shell input keyevent KEYCODE_VOLUME_DOWN.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell input keyevent KEYCODE_VOLUME_DOWN`)
);

// Register volume_mute tool
server.tool(
  'volume_mute',
  'Tắt/bật tiếng.\nVí dụ thực thi: adb shell input keyevent KEYCODE_VOLUME_MUTE.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell input keyevent KEYCODE_VOLUME_MUTE`)
);

// Register volume_up tool
server.tool(
  'volume_up',
  'Tăng âm lượng.\nVí dụ thực thi: adb shell input keyevent KEYCODE_VOLUME_UP.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell input keyevent KEYCODE_VOLUME_UP`)
);

// Register wait_device tool
server.tool(
  'wait_device',
  'Chờ đợi thiết bị được kết nối.\nVí dụ thực thi: adb wait-for-device.',
  z.object({}).shape,
  () => registerPythonTool(`adb wait-for-device`)
);

// Register whoami tool
server.tool(
  'whoami',
  'Hiển thị tên người dùng hiện tại.\nVí dụ thực thi: adb shell whoami.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell whoami`)
);

// Register wifi_off tool
server.tool(
  'wifi_off',
  'Tắt Wi-Fi trên thiết bị.\nVí dụ thực thi: adb shell svc wifi disable.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell svc wifi disable`)
);

// Register wifi_on tool
server.tool(
  'wifi_on',
  'Bật Wi-Fi trên thiết bị.\nVí dụ thực thi: adb shell svc wifi enable.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell svc wifi enable`)
);

// Register wm_density tool (with optional parameter)
server.tool(
  'wm_density',
  'Hiển thị hoặc đặt mật độ DPI màn hình.\nNhập các tham số sau: <density (dpi) (tùy chọn)>.\nVí dụ thực thi: adb shell wm density 480.',
  z.object({
    density_dpi: z.number().optional().describe('Mật độ DPI (tùy chọn).'),
  }).shape,
  ({ density_dpi }) => {
    const density_arg = density_dpi !== undefined ? ` ${density_dpi}` : '';
    return registerPythonTool(`adb shell wm density${density_arg}`);
  }
);

// Register wm_reset tool
server.tool(
  'wm_reset',
  'Đặt lại kích thước và mật độ màn hình về mặc định.\nVí dụ thực thi: adb shell wm size reset; adb shell wm density reset.',
  z.object({}).shape,
  () => registerPythonTool(`adb shell wm size reset; adb shell wm density reset`)
);

// Register wm_size tool (with optional parameter)
server.tool(
  'wm_size',
  'Hiển thị hoặc đặt kích thước màn hình.\nNhập các tham số sau: <width x height (tùy chọn)>.\nVí dụ thực thi: adb shell wm size 1080x1920.',
  z.object({
    width: z.number().optional().describe('Chiều rộng.'),
    height: z.number().optional().describe('Chiều cao.'),
  }).shape,
  ({ width, height }) => {
    const size_arg = width !== undefined && height !== undefined ? ` ${width}x${height}` : '';
    return registerPythonTool(`adb shell wm size${size_arg}`);
  }
);


async function startServer() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

startServer();
