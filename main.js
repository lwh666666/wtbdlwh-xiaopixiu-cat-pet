const { app, BrowserWindow, Tray, Menu, screen, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let win = null;
let tray = null;
let isQuitting = false;
let isLocked = true;
let autoStart = false;
let savedPos = null;
let isDragging = false;
let dragOffset = { x: 0, y: 0 };
let mousePollTimer = null;

const WINDOW_W = 160;
const WINDOW_H = 160;
const TOTAL_FRAMES = 150;
const IDLE_THRESHOLD = 30;
const CONFIG_FILE = path.join(app.getPath('userData'), 'catpet-config.json');

function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const cfg = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
      autoStart = cfg.autoStart || false;
      isLocked = (cfg.locked !== undefined) ? cfg.locked : true;
      if (cfg.windowX != null) savedPos = { x: cfg.windowX, y: cfg.windowY };
    }
  } catch (e) { }
}

function saveConfig() {
  try {
    var sd = { autoStart: autoStart };
    if (savedPos) { sd.windowX = savedPos.x; sd.windowY = savedPos.y; }
    sd.locked = isLocked;
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(sd, null, 2), 'utf8');
  } catch (e) { }
}

function createWindow() {
  const { width: sw, height: sh } = screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    width: WINDOW_W,
    height: WINDOW_H,
    x: savedPos ? savedPos.x : (sw - WINDOW_W - 20),
    y: savedPos ? savedPos.y : (sh - WINDOW_H - 20),
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    type: 'floating',
    skipTaskbar: true,
    resizable: false,
    hasShadow: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, 'renderer', 'index.html'));
  win.setIgnoreMouseEvents(false);
  applyLockState();
  startMousePolling();

  win.on('close', function(e) {
    if (!isQuitting) { e.preventDefault(); }
  });

  win.on('move', function() {
    var p = win.getPosition();
    savedPos = { x: p[0], y: p[1] };
  });

  ipcMain.on('drag-start', (_, pos) => {
    if (isLocked) return;
    isDragging = true;
    dragOffset = { x: pos.clientX, y: pos.clientY };
  });
  ipcMain.on('drag-end', () => { isDragging = false; });
  ipcMain.on('toggle-lock', () => { toggleLock(); });
  ipcMain.on('toggle-autostart', () => { toggleAutoStart(); });
  ipcMain.on('show-context-menu', () => {
    buildMenu().popup({ window: win });
  });
}

function buildMenu() {
  var lk = isLocked ? '\u{1F512} \u9501\u5B9A' : '\u{1F513} \u89E3\u9664\u9501\u5B9A';
  var at = autoStart ? '\u2705 \u81EA\u542F' : '\u274C \u81EA\u542F';
  return Menu.buildFromTemplate([
    { label: lk, click: toggleLock },
    { type: 'separator' },
    { label: at, click: toggleAutoStart },
    { type: 'separator' },
    { label: '\u{1F6AA} \u9000\u51FA', click: function() { isQuitting = true; app.quit(); } }
  ]);
}

function startMousePolling() {
  mousePollTimer = setInterval(function() {
    if (!win || win.isDestroyed()) return;
    var cursor = screen.getCursorScreenPoint();
    var b = win.getBounds();
    var cx = b.x + b.width / 2;
    var cy = b.y + b.height / 2;

    if (isDragging && !isLocked) {
      win.setPosition(
        Math.round(cursor.x - dragOffset.x),
        Math.round(cursor.y - dragOffset.y)
      );
    }

    var dx = cursor.x - cx;
    var dy = cursor.y - cy;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var angle = Math.atan2(dy, dx) * (180 / Math.PI);
    if (angle < 0) angle += 360;

    var frame = -1;
    if (dist >= IDLE_THRESHOLD) {
      frame = Math.round((angle / 360) * TOTAL_FRAMES) % TOTAL_FRAMES;
    }
    win.webContents.send('mouse-update', { frame: frame, angle: angle, dist: dist });
  }, 33);
}

function stopMousePolling() {
  if (mousePollTimer) { clearInterval(mousePollTimer); mousePollTimer = null; }
}

function applyLockState() {
  if (win && !win.isDestroyed()) {
    win.webContents.send('lock-state', isLocked);
  }
}

function toggleLock() {
  isLocked = !isLocked;
  applyLockState();
  if (tray) tray.setContextMenu(buildMenu());
}

function toggleAutoStart() {
  autoStart = !autoStart;
  try {
    app.setLoginItemSettings({ openAtLogin: autoStart, path: process.execPath, args: [app.getAppPath()] });
  } catch (e) { }
  saveConfig();
  if (tray) tray.setContextMenu(buildMenu());
}

function createTray() {
  tray = new Tray(path.join(__dirname, 'resources', 'icon.png'));
  tray.setToolTip('\u5C0F\u76AE\u4F11');
  tray.setContextMenu(buildMenu());
  tray.on('double-click', function() { if (win) win.show(); });
}

app.whenReady().then(function() { loadConfig(); createWindow(); createTray(); });
app.on('window-all-closed', function() { stopMousePolling(); if (process.platform !== 'darwin') app.quit(); });
app.on('before-quit', function() { stopMousePolling(); });


