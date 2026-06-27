const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onMouseUpdate: (cb) => ipcRenderer.on('mouse-update', (_, d) => cb(d)),
  onLockState: (cb) => ipcRenderer.on('lock-state', (_, d) => cb(d)),
  onToast: (cb) => ipcRenderer.on('toast', (_, m) => cb(m)),
  sendDragStart: (p) => ipcRenderer.send('drag-start', p),
  sendDragEnd: () => ipcRenderer.send('drag-end'),
  showContextMenu: () => ipcRenderer.send('show-context-menu'),
  toggleLock: () => ipcRenderer.send('toggle-lock'),
  toggleAutoStart: () => ipcRenderer.send('toggle-autostart')
});
