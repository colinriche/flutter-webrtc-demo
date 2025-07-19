# Local WebSocket Server Setup

## Prerequisites
- Node.js installed on your computer
- Your phone and computer on the same WiFi network

## Setup Steps

### 1. Install WebSocket Server Dependencies
```bash
npm install
```

### 2. Find Your Computer's IP Address
- **Windows**: Run `ipconfig` in Command Prompt
- **Mac/Linux**: Run `ifconfig` or `ip addr` in Terminal
- Look for your WiFi adapter IP (usually starts with 192.168.x.x)

### 3. Start the WebSocket Server
```bash
npm start
```
You should see: "WebSocket server is running on ws://localhost:3000"

### 4. Update Flutter App
In the Flutter app, when prompted for server address, enter your computer's IP address (e.g., `192.168.1.156`)

### 5. Test the Connection
- Run the Flutter app on your phone
- Tap "P2P Call Sample"
- Enter your computer's IP address
- Tap "CONNECT"
- You should see connection status in the app bar

## Troubleshooting

### White Screen Issue
If you see a white screen:
1. Make sure the WebSocket server is running
2. Check that your phone and computer are on the same network
3. Verify the IP address is correct
4. Check the connection status in the app bar

### Connection Errors
- Ensure port 3000 is not blocked by firewall
- Try using `localhost` or `127.0.0.1` if testing on the same device
- Check that the WebSocket server is running without errors

### Testing with Multiple Devices
1. Start the WebSocket server
2. Connect multiple devices using the same IP address
3. You should see other devices in the peer list
4. Tap on a peer to start a video call 