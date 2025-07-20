# How to Run Flutter WebRTC Demo

## Quick Start

1. **Start WebSocket Server**
   ```bash
   npm start
   ```
   Server runs on port 3000

2. **Run Flutter App**
   ```bash
   flutter run
   ```

3. **Connect Devices**
   - Open app on phone/device
   - Tap "P2P Call Sample"
   - Enter your computer's IP: `192.168.1.156` is my laptop & hardcoded in code as the signal server
   - Tap "CONNECT"

4. **Test Video Call**
   - Connect multiple devices using same IP
   - Tap on a peer to start video call
   - Grant camera/microphone permissions when prompted

use 2 phones
or flutter run -d chrome
to run in the browser

## Troubleshooting
- If connection fails, check Windows Firewall allows port 3000
- Ensure phone and computer are on same WiFi network
- Server terminal should show "New client connected" when app connects 