# Verification Document

## How to Test the Cat Desktop Pet

### 1. Installation

cd path/to/catpet

pm install

### 2. Start the Application


pm start

### 3. Feature Verification Checklist

| # | Feature | Expected Behavior |
|---|---|---|
| 1 | Transparent window | Window has no chrome/background, only the cat is visible |
| 2 | Always on top | Cat stays above all other windows |
| 3 | Right-click tray icon | Shows Lock/Unlock, Exit menu |
| 4 | Mouse following | Cat head rotates toward your cursor smoothly |
| 5 | 360 rotation | Moving mouse around the cat shows all head angles |
| 6 | Smooth interpolation | No frame jumps or direction snapping |
| 7 | Idle state | When mouse is near cat center, smoothly returns to center |
| 8 | Drag (unlocked) | Click and drag to move the cat |
| 9 | Lock (click-through) | Clicks pass through the cat to windows behind |
| 10 | Bottom-right default | Appears at desktop bottom-right corner on start |

### 4. Known Limitations

* Background removal may have some edge artifacts on white/gray fur
* Tray menu labels are in English for compatibility
* Requires Windows (uses Win32-specific features)
