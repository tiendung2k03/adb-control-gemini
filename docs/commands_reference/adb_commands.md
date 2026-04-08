# ADB Command Reference

AureDroid provides direct access to over 100 common ADB commands through dedicated tools. Each command is dynamically registered and available for use by your AI agent.

## 🔌 Connection & Server
- `connect <IP:PORT>`: Connect to an Android device via TCP/IP.
- `disconnect`: Disconnect from the device.
- `devices`: List all connected devices.
- `devices_long`: List connected devices with detailed info.
- `start_server`: Start the ADB server.
- `kill_server`: Stop the ADB server.
- `pair <IP:PORT> <pairing_code>`: Pair via Wi-Fi.
- `tcpip <port>`: Restart ADB in TCP/IP mode.
- `usb`: Switch ADB to USB mode.
- `wait_device`: Wait for a device to be connected.
- `get_state`: Get the connection state of the device.
- `get_serial`: Get the serial number of the device.

## 📱 Device System Information
- `abi`: Get the device's CPU architecture (ABI).
- `android_version`: Get the Android release version.
- `brand`: Get the device brand name.
- `cpuinfo`: Display CPU details.
- `disk_usage`: Display internal storage usage.
- `getprop`: Get system properties.
- `hardware`: Get hardware information.
- `locale`: Get current language and region.
- `manufacturer`: Get the device manufacturer.
- `meminfo`: Display memory usage details.
- `model`: Get the device model name.
- `sdk_version`: Get the SDK version (API level).
- `thermal`: Display thermal information.
- `timezone`: Get current time zone.
- `uptime`: Display device uptime.

## 🐚 Shell & Process Management
- `shell`: Open an interactive shell.
- `ps`: List running processes.
- `top`: Display resource-intensive processes.
- `kill <PID>`: Terminate a process by PID.
- `killall <process_name>`: Terminate all processes by name.
- `root`: Restart ADB with root privileges.
- `su <command>`: Run a command with superuser privileges.
- `env`: Display shell environment variables.
- `jobs`: List jobs in the shell.

## 📁 File & Directory Management
- `ls <path>`: List directory contents.
- `tree <path>`: Display directory tree.
- `pull <remote_path> <local_path>`: Copy from device to computer.
- `push <local_path> <remote_path>`: Copy from computer to device.
- `cp <source> <dest>`: Copy files on device.
- `mv <source> <dest>`: Move or rename files.
- `rm <path>`: Delete a file.
- `rmdir <path>`: Delete an empty directory.
- `mkdir <path>`: Create a directory.
- `stat <path>`: Display file status.
- `du <path>`: Display disk usage for a file or directory.
- `chmod <perms> <path>`: Change file permissions.
- `chown <owner:group> <path>`: Change file owner.
- `find <dir> <pattern>`: Search for files.
- `cat <file>`: Display file content.

## 📦 Application & Package Management
- `list_packages`: List all installed packages.
- `list_packages_user`: List user-installed packages.
- `list_packages_system`: List system packages.
- `install <APK_path>`: Install an application.
- `uninstall <package_name>`: Uninstall an application.
- `clear_data <package_name>`: Clear application data.
- `force_stop <package_name>`: Stop an application.
- `enable_app <package_name>`: Enable a disabled app.
- `disable_app <package_name>`: Disable an application.
- `app_info <package_name>`: Display detailed app info.
- `app_path <package_name>`: Get installation path.
- `app_permissions <package_name>`: List app permissions.
- `grant_permission <package_name> <permission>`: Grant a permission.
- `revoke_permission <package_name> <permission>`: Revoke a permission.

## 🐞 Logging & Debugging
- `logcat`: Display real-time device logs.
- `logcat_clear`: Clear logcat logs.
- `logcat_file <local_path>`: Save logcat to a local file.
- `logcat_tag <tag>`: Filter logs by tag.
- `dumpsys <service>`: Display system diagnostic info.
- `bugreport <path>`: Create a full bug report.
- `anr_traces`: Display ANR traces.
- `tombstones`: List application error files.

## 🎬 Screen & Media
- `screenshot <path>`: Take a screenshot.
- `screenrecord <time>`: Record the screen.
- `screenrecord_size <WxH>`: Record with specific size.
- `screenrecord_bitrate <Mbps>`: Record with specific bitrate.
- `media_scan <path>`: Rescan a directory for media.

## ⌨️ Input & Control
- `input_text <text>`: Type text.
- `input_keyevent <code/name>`: Send a key event.
- `input_tap <x> <y>`: Tap coordinates.
- `input_swipe <x1> <y1> <x2> <y2> <time>`: Swipe.
- `home`: Press Home button.
- `back`: Press Back button.
- `recents`: Open Recent Apps.
- `power`: Press Power button.
- `volume_up/down/mute`: Control volume.
- `brightness_set <0-255>`: Set screen brightness.
- `brightness_auto`: Enable auto-brightness.

## 🌐 Network (Wi-Fi, Data, Proxy)
- `wifi_on/off`: Toggle Wi-Fi.
- `data_on/off`: Toggle Mobile Data.
- `airplane_on/off`: Toggle Airplane Mode.
- `ip_addr`: Display IP addresses.
- `ping <host>`: Check network connection.
- `netstat`: Display network statistics.
- `dns`: Display DNS configuration.
- `proxy_set <host> <port>`: Set HTTP proxy.
- `proxy_clear`: Clear HTTP proxy.

## 🖥️ Screen UI Settings
- `wm_size <WxH>`: Display or set screen size.
- `wm_density <DPI>`: Display or set DPI.
- `wm_reset`: Reset size and density.
- `rotation_lock/unlock`: Control screen rotation.
- `immersive_mode <package>`: Set app to full-screen.
- `layout_bounds <0/1>`: Toggle layout boundaries.
- `pointer_location <0/1>`: Toggle pointer location.
- `show_touches <0/1>`: Toggle visual touches.

## 🔋 Battery & Power
- `battery_status`: Display battery status.
- `battery_level`: Get current battery level.
- `battery_set_level <0-100>`: Simulate battery level (Root).
- `battery_reset`: Reset battery status (Root).
- `charging_on/off`: Simulate charging state (Root).
- `reboot`: Reboot device.
- `shutdown`: Shut down device.
- `stay_awake_on/off`: Keep screen on while charging.

## 🛡️ Security & Developer Options
- `developer_options_on/off`: Toggle Developer Options.
- `selinux_status`: Get SELinux status.
- `selinux_enforcing/permissive`: Set SELinux mode.
- `verify_apps_on/off`: Toggle ADB app verification.

## ⚠️ Dangerous Actions
- `remount`: Remount system partition as writable (Root).
- `mount_rw/ro <partition>`: Mount partition as read-write or read-only.
- `flash_image <partition> <image>`: Flash image (Fastboot).
- `erase_partition <partition>`: Erase partition (Fastboot).
