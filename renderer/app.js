var cat = document.getElementById('cat');
var COLS = 10;
var FRAME_W = 160;
var FRAME_H = 160;
var TOTAL = 150;

var currentFrame = 0;
var targetFrame = 0;
var isIdle = false;

function frameToPos(idx) {
  var col = idx % COLS;
  var row = Math.floor(idx / COLS);
  return { x: -col * FRAME_W, y: -row * FRAME_H };
}

function updateDisplay(frame) {
  var f = Math.round(frame) % TOTAL;
  var pos = frameToPos(f);
  cat.style.backgroundPosition = pos.x + 'px ' + pos.y + 'px';
}

window.electronAPI.onLockState(function(locked) {
  cat.style.pointerEvents = locked ? 'none' : 'auto';
});

window.electronAPI.onMouseUpdate(function(data) {
  if (data.frame < 0) { isIdle = true; targetFrame = 0; }
  else { isIdle = false; targetFrame = data.frame; }
});

var toastEl = document.getElementById('toast');
var toastTimer = null;
window.electronAPI.onToast(function(msg) {
  toastEl.textContent = msg;
  toastEl.style.opacity = '1';
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(function() { toastEl.style.opacity = '0'; }, 2000);
});

cat.addEventListener('mousedown', function(e) {
  if (e.button !== 0) return;
  window.electronAPI.sendDragStart({ clientX: e.clientX, clientY: e.clientY });
});

cat.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  window.electronAPI.showContextMenu();
});

document.addEventListener('mouseup', function() { window.electronAPI.sendDragEnd(); });

var LERP_SPEED = 0.15;
var IDLE_LERP_SPEED = 0.05;

function animate() {
  var speed = isIdle ? IDLE_LERP_SPEED : LERP_SPEED;
  var diff = targetFrame - currentFrame;
  if (diff > TOTAL / 2) diff -= TOTAL;
  if (diff < -TOTAL / 2) diff += TOTAL;
  currentFrame += diff * speed;
  if (currentFrame < 0) currentFrame += TOTAL;
  if (currentFrame >= TOTAL) currentFrame -= TOTAL;
  updateDisplay(currentFrame);
  requestAnimationFrame(animate);
}

cat.style.pointerEvents = 'none';
animate();
updateDisplay(0);
