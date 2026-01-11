# ADB Command Reference

Below is a detailed list of ADB commands available through the `adb-control-gemini` extension, categorized for easy searching and use. Each command comes with a description and an execution example.

## CONNECTION – SERVER
- `abi`: Get the ABI information of the device.
- `connect <IP:PORT>`: Connect the Android device to the computer via TCP/IP, allowing wireless device control.
- `devices`: List all Android devices currently connected to the computer via USB or TCP/IP.
- `devices_long`: List all connected Android devices, including detailed information.
- `disconnect`: Disconnect from the Android device via TCP/IP.
- `get_serial`: Get the serial number of the device.
- `get_state`: Get the connection state of the device.
- `kill_server`: Completely stop the ADB server running on the computer.
- `pair <IP:PORT>, <pairing_code>`: Pair with an Android device via Wi-Fi.
- `start_server`: Start the ADB server on the computer.
- `tcpip <port>`: Restart ADB in TCP/IP mode on a specific port.
- `usb`: Switch ADB to USB mode.
- `wait_device`: Wait for a device to be connected.

## DEVICE – SYSTEM
- `android_version`: Get the Android version of the device.
- `brand`: Get the brand name of the device.
- `cpuinfo`: Display CPU information of the device.
- `disk_usage`: Display internal memory usage information of the device.
- `getprop`: Get system property information of the device.
- `hardware`: Get hardware information of the device.
- `locale`: Get the current language and region of the device.
- `manufacturer`: Get the manufacturer name of the device.
- `meminfo`: Display memory information of the device.
- `model`: Get the model name of the device.
- `sdk_version`: Get the SDK version of the device.
- `thermal`: Display temperature information of the device.
- `timezone`: Get the current time zone of the device.
- `uptime`: Display the uptime of the device.

## SHELL – PROCESS
- `env`: Display the shell's environment variables.
- `id`: Display user and group information.
- `jobs`: List jobs in the shell.
- `kill <PID>`: Terminate a process by PID.
- `killall <process_name>`: Terminate all processes with a specific name.
- `ps`: List running processes on the device.
- `root`: Restart ADB with root privileges.
- `shell`: Open an interactive shell on the device.
- `su <command>`: Run a command with superuser privileges (only on rooted devices).
- `top`: Display the most resource-intensive processes.
- `unroot`: Restart ADB without root privileges.
- `whoami`: Display the current username.

## FILE – DIRECTORY
- `cat <file_path>`: Display the content of a file.
- `chmod <permissions>, <path>`: Change the permissions of a file or directory.
- `chown <owner:group>, <path>`: Change the owner of a file or directory.
- `cp <source_path>, <destination_path>`: Copy a file or directory on the device.
- `du <path>`: Display the disk usage of a file or directory.
- `find <directory>, <file_name/pattern>`: Search for a file on the device.
- `head <file_path>`: Display the first few lines of a file.
- `less <file_path>`: View the content of a file page by page (if available).
- `ls <path (optional)>`: List the content of a directory.
- `mkdir <directory_path>`: Create a directory on the device.
- `mount_ro <partition_path>`: Remount the system partition in read-only mode.
- `mount_rw <partition_path>`: Remount the system partition in read-write mode (requires root).
- `mv <source_path>, <destination_path>`: Move or rename a file/directory on the device.
- `pull <remote_path>, <local_path>`: Copy a file or directory from the device to the computer.
- `push <local_path>, <remote_path>`: Copy a file or directory from the computer to the device.
- `rm <file_path>`: Delete a file on the device.
- `rmdir <directory_path>`: Delete an empty directory on the device.
- `stat <path>`: Display file or directory status information.
- `tail <file_path>`: Display the last few lines of a file.
- `tree <path (optional)>`: Display the directory tree structure (if available).

## APPLICATION – PACKAGE
- `app_info <package_name>`: Display detailed information about the application (dumpsys).
- `app_permissions <package_name>`: List the permissions of the application.
- `app_path <package_name>`: Get the installation path of the application.
- `clear_data <package_name>`: Clear the data of an application.
- `disable_app <package_name>`: Disable an application.
- `enable_app <package_name>`: Enable a disabled application.
- `force_stop <package_name>`: Force stop an application.
- `grant_permission <package_name>, <permission>`: Grant a permission to the application.
- `install <APK path on computer>`: Install an application from an APK file.
- `install_multiple <path to APKs on computer>`: Install multiple APKs for an application.
- `install_replace <APK path on computer>`: Reinstall an application, keeping the data.
- `list_packages`: List all installed application packages.
- `list_packages_system`: List installed system application packages.
- `list_packages_user`: List application packages installed for the user.
- `revoke_permission <package_name>, <permission>`: Revoke a permission from the application.
- `set_app_debuggable <package_name>`: Set the application as debuggable.
- `uninstall <package_name>`: Uninstall an application.

## LOG – DEBUG
- `anr_traces`: Display ANR (Application Not Responding) traces.
- `bugreport <path>`: Create a full bug report.
- `dumpsys <service_name (optional)>`: Display system diagnostic information.
- `dumpsys_activity`: Display information about the Activity Manager.
- `dumpsys_package`: Display information about the Package Manager.
- `dumpsys_window`: Display information about the Window Manager.
- `logcat`: Display the logcat logs of the device.
- `logcat_clear`: Clear the existing logcat logs.
- `logcat_file <local_file_path>`: Write the logcat logs to a file on the computer.
- `logcat_tag <tag>`: Filter logcat logs by tag.
- `tombstones`: List tombstones files (application error information).

## SCREEN – MEDIA
- `media_scan <path>`: Request MediaScanner to rescan a directory.
- `pull_record <remote_path>, <local_file_path>`: Pull the screen recording file from the device to the computer.
- `screenrecord <time (seconds)>`: Record the device's screen.
- `screenrecord_bitrate <bitrate (Mbps)>`: Record the screen with a specific bit rate.
- `screenrecord_size <width x height>`: Record the screen with a specific size.
- `screenshot <local_file_path (optional)>`: Take a screenshot of the device and save it locally.

## INPUT – CONTROL
- `back`: Press the Back button.
- `brightness_auto`: Switch to automatic brightness mode.
- `brightness_set <brightness_level>`: Set the screen brightness (0-255).
- `home`: Press the Home button.
- `input_keyevent <key_code (KEY_CODE)>`: Send a key event.
- `input_longpress <x>, <y>, <time (ms)>`: Long press a position on the screen.
- `input_swipe <x1>, <y1>, <x2>, <y2>, <time (ms) (optional)>`: Swipe on the screen.
- `input_tap <x>, <y>`: Tap a position on the screen.
- `input_text <text>`: Enter text on the device.
- `power`: Press the power button (turn screen on/off).
- `recents`: Open the recent apps screen.
- `volume_down`: Decrease the volume.
- `volume_mute`: Mute/unmute the volume.
- `volume_up`: Increase the volume.

## NETWORK – WIFI – DATA
- `airplane_off`: Turn off airplane mode on the device.
- `airplane_on`: Turn on airplane mode on the device.
- `data_off`: Turn off mobile data on the device.
- `data_on`: Turn on mobile data on the device.
- `dns`: Display the DNS configuration of the device.
- `ifconfig`: Display the network interface configuration.
- `ip_addr`: Display the IP address of the device.
- `netstat`: Display network connections and statistics.
- `ping <host>`: Check the network connection to a host.
- `proxy_clear`: Clear the global HTTP proxy.
- `proxy_set <host>, <port>`: Set the global HTTP proxy.
- `route`: Display the routing table.
- `wifi_off`: Turn off Wi-Fi on the device.
- `wifi_on`: Turn on Wi-Fi on the device.

## SCREEN – UI
- `immersive_mode <package_name>`: Set the application to full-screen immersive mode.
- `layout_bounds <0 (off) or 1 (on)>`: Display the layout boundaries of UI components.
- `pointer_location <0 (off) or 1 (on)>`: Display pointer location information on the screen.
- `rotation_lock`: Lock screen rotation in the current mode.
- `rotation_unlock`: Unlock screen rotation (allow auto-rotate).
- `show_touches <0 (off) or 1 (on)>`: Display touch interactions on the screen (for UI debugging).
- `wm_density <density (dpi) (optional)>`: Display or set the screen DPI density.
- `wm_reset`: Reset the screen size and density to default.
- `wm_size <width x height (optional)>`: Display or set the screen size.

## BATTERY – POWER
- `battery_level`: Display the current battery level of the device.
- `battery_reset`: Reset the battery status to default (requires root).
- `battery_set_level <level>`: Set the simulated battery level (0-100, requires root).
- `battery_status`: Display the battery status of the device.
- `charging_off`: Turn off simulated battery charging (requires root).
- `charging_on`: Turn on simulated battery charging (requires root).
- `reboot`: Reboot the device.
- `reboot_bootloader`: Reboot the device into Bootloader mode.
- `reboot_recovery`: Reboot the device into Recovery mode.
- `shutdown`: Shut down the device.
- `stay_awake_off`: Turn off the always-on screen mode.
- `stay_awake_on`: Keep the screen on while charging.

## SECURITY – DEV
- `developer_options_off`: Turn off developer options.
- `developer_options_on`: Turn on developer options (if not already on).
- `selinux_enforcing`: Set SELinux to Enforcing mode (block and log).
- `selinux_permissive`: Set SELinux to Permissive mode (warn but do not block).
- `selinux_status`: Display the SELinux status.
- `verify_apps_off`: Turn off app verification over ADB.
- `verify_apps_on`: Turn on app verification over ADB.

## DANGEROUS – HIGH-RISK ACTIONS
- `erase_partition <partition>`: Erase a partition on the device (requires fastboot).
- `flash_image <partition>, <image_file>`: Flash an image to the device (requires fastboot).
- `remount`: Remount the system partition to be writable (requires root).