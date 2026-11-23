// Design System & Common Utilities for Faat Choi Mahjong POS
(function () {
  const css = document.createElement('style');
  css.id = 'pos-core-style';
  css.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700;800&display=swap');

    :root {
      --font-main: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      
      --bg: #0b1310;
      --bg-elevated: #13221c;
      --card: #152620;
      --card-border: #213c32;
      --card-hover: #1c332b;
      
      --tx: #f8fafc;
      --tx-muted: #8ba298;
      --tx-sub: #cbd5e1;
      
      --primary: #10b981;
      --primary-hover: #059669;
      --primary-glow: rgba(16, 185, 129, 0.3);
      
      --amber: #f59e0b;
      --amber-glow: rgba(245, 158, 11, 0.25);
      
      --red: #ef4444;
      --red-glow: rgba(239, 68, 68, 0.3);
      
      --blue: #3b82f6;
      --blue-glow: rgba(59, 130, 246, 0.25);

      --cyan: #06b6d4;
      --cyan-glow: rgba(6, 182, 212, 0.3);
      
      --radius: 12px;
      --radius-sm: 8px;
      --shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.4);
      --shadow-lg: 0 10px 30px -4px rgba(0, 0, 0, 0.55);
    }

    [data-theme="light"] {
      --bg: #f2f7f4;
      --bg-elevated: #ffffff;
      --card: #ffffff;
      --card-border: #d2e4db;
      --card-hover: #eaf3ee;
      --tx: #0b1b14;
      --tx-muted: #567265;
      --tx-sub: #273b31;
      --primary: #0f766e;
      --primary-hover: #0d5f58;
      --primary-glow: rgba(15, 118, 110, 0.2);
      --amber: #d97706;
      --amber-glow: rgba(217, 119, 6, 0.15);
      --red: #dc2626;
      --red-glow: rgba(220, 38, 38, 0.15);
      --blue: #2563eb;
      --blue-glow: rgba(37, 99, 235, 0.15);
      --cyan: #0891b2;
      --cyan-glow: rgba(8, 145, 178, 0.15);
      --shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.08);
      --shadow-lg: 0 10px 25px -4px rgba(0, 0, 0, 0.12);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: var(--font-main);
      background-color: var(--bg);
      color: var(--tx);
      line-height: 1.5;
      min-height: 100vh;
      transition: background-color 0.2s, color 0.2s;
      -webkit-font-smoothing: antialiased;
    }

    .pos-app {
      max-width: 1400px;
      margin: 0 auto;
      padding: 16px 20px 40px;
    }

    header.pos-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 20px;
      background: var(--card);
      border: 1px solid var(--card-border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      margin-bottom: 20px;
      flex-wrap: wrap;
      gap: 12px;
    }

    .pos-brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .brand-logo-img {
      width: 44px;
      height: 44px;
      border-radius: 10px;
      object-fit: contain;
      background: white;
      padding: 2px;
      box-shadow: 0 0 14px rgba(16, 185, 129, 0.35);
      border: 1px solid var(--primary);
    }

    .brand-title {
      font-size: 19px;
      font-weight: 800;
      letter-spacing: -0.3px;
    }

    .brand-subtitle {
      font-size: 12px;
      color: var(--tx-muted);
      font-weight: 600;
    }

    .pos-actions {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .rate-badge {
      font-size: 12px;
      font-weight: 700;
      background: rgba(16, 185, 129, 0.15);
      color: var(--primary);
      padding: 6px 12px;
      border-radius: 8px;
      border: 1px solid var(--primary);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .live-clock {
      font-family: var(--font-mono);
      font-size: 14px;
      background: var(--bg);
      padding: 6px 12px;
      border-radius: 8px;
      border: 1px solid var(--card-border);
      color: var(--tx-sub);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    nav.pos-nav {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
      overflow-x: auto;
      padding-bottom: 4px;
    }

    nav.pos-nav button {
      background: var(--card);
      border: 1px solid var(--card-border);
      color: var(--tx-muted);
      padding: 10px 18px;
      border-radius: var(--radius-sm);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.15s ease;
      white-space: nowrap;
    }

    nav.pos-nav button:hover {
      background: var(--card-hover);
      color: var(--tx);
      border-color: var(--tx-muted);
    }

    nav.pos-nav button.active {
      background: var(--primary);
      color: white;
      border-color: var(--primary);
      box-shadow: var(--primary-glow);
    }

    .c-card {
      background: var(--card);
      border: 1px solid var(--card-border);
      border-radius: var(--radius);
      padding: 18px;
      box-shadow: var(--shadow);
      margin-bottom: 18px;
    }

    .c-title {
      font-size: 15px;
      font-weight: 700;
      color: var(--tx);
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    button.btn {
      font-family: var(--font-main);
      font-size: 14px;
      font-weight: 600;
      padding: 9px 16px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--card-border);
      background: var(--card);
      color: var(--tx);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.15s ease;
      text-decoration: none;
    }

    button.btn:hover {
      background: var(--card-hover);
      transform: translateY(-1px);
    }

    button.btn:active {
      transform: translateY(1px);
    }

    button.btn-primary {
      background: var(--primary);
      color: white;
      border-color: var(--primary);
      box-shadow: var(--primary-glow);
    }
    button.btn-primary:hover { background: var(--primary-hover); }

    button.btn-danger {
      background: var(--red);
      color: white;
      border-color: var(--red);
    }

    button.btn-amber {
      background: var(--amber);
      color: white;
      border-color: var(--amber);
    }

    button.btn-blue {
      background: var(--blue);
      color: white;
      border-color: var(--blue);
    }

    button.btn-cyan {
      background: var(--cyan);
      color: white;
      border-color: var(--cyan);
    }

    button.btn-sm {
      padding: 5px 10px;
      font-size: 12px;
      border-radius: 6px;
    }

    button.btn-block {
      width: 100%;
    }

    input, select, textarea {
      width: 100%;
      background: var(--bg);
      border: 1px solid var(--card-border);
      color: var(--tx);
      font-family: var(--font-main);
      font-size: 14px;
      padding: 10px 14px;
      border-radius: var(--radius-sm);
      margin-top: 4px;
      margin-bottom: 12px;
      outline: none;
      transition: border-color 0.15s, box-shadow 0.15s;
    }

    input:focus, select:focus, textarea:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px var(--primary-glow);
    }

    label {
      font-size: 13px;
      font-weight: 600;
      color: var(--tx-muted);
      display: block;
    }

    .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; }
    .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
    .grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
    .table-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 14px;
      margin-bottom: 20px;
    }

    .tbl-card {
      background: var(--card);
      border: 2px solid var(--card-border);
      border-radius: var(--radius);
      padding: 14px;
      text-align: center;
      position: relative;
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .tbl-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow);
    }

    .tbl-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }

    .tbl-badge {
      font-size: 11px;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 99px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .tbl-num {
      font-size: 17px;
      font-weight: 800;
    }

    .tbl-timer {
      font-family: var(--font-mono);
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.5px;
      margin: 8px 0;
    }

    .tbl-cust {
      font-size: 13px;
      color: var(--tx-sub);
      font-weight: 600;
      min-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .tbl-bar {
      height: 5px;
      background: var(--card-border);
      border-radius: 99px;
      margin: 10px 0;
      overflow: hidden;
    }

    .tbl-bar-fill {
      height: 100%;
      background: var(--primary);
      width: 100%;
      transition: width 1s linear;
    }

    .tbl-actions {
      display: flex;
      gap: 4px;
      justify-content: center;
      margin-top: 8px;
      flex-wrap: wrap;
    }

    .tbl-card.free {
      border-color: var(--card-border);
      opacity: 0.85;
    }
    .tbl-card.free .tbl-badge {
      background: rgba(148, 163, 184, 0.15);
      color: var(--tx-muted);
    }
    .tbl-card.free .tbl-timer {
      color: var(--tx-muted);
      font-size: 18px;
    }

    .tbl-card.busy {
      border-color: var(--blue);
      box-shadow: var(--blue-glow);
    }
    .tbl-card.busy .tbl-badge {
      background: var(--blue);
      color: white;
    }
    .tbl-card.busy .tbl-timer {
      color: var(--blue);
    }

    .tbl-card.open-play {
      border-color: var(--cyan);
      box-shadow: 0 0 18px var(--cyan-glow);
    }
    .tbl-card.open-play .tbl-badge {
      background: var(--cyan);
      color: #032b30;
      font-weight: 900;
    }
    .tbl-card.open-play .tbl-timer {
      color: #38bdf8;
    }
    .tbl-card.open-play .tbl-bar-fill {
      background: linear-gradient(90deg, var(--cyan), var(--emerald));
      animation: bar-pulse 2s infinite ease-in-out;
    }

    @keyframes bar-pulse {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1; }
    }

    .tbl-card.warn {
      border-color: var(--amber);
      box-shadow: 0 0 15px var(--amber-glow);
      animation: pulse-warn 1.5s infinite;
    }
    .tbl-card.warn .tbl-badge {
      background: var(--amber);
      color: white;
    }
    .tbl-card.warn .tbl-timer {
      color: var(--amber);
    }

    .tbl-card.over {
      border-color: var(--red);
      background: linear-gradient(to bottom, var(--card), rgba(239, 68, 68, 0.15));
      box-shadow: 0 0 20px var(--red-glow);
      animation: pulse-over 1s infinite;
    }
    .tbl-card.over .tbl-badge {
      background: var(--red);
      color: white;
    }
    .tbl-card.over .tbl-timer {
      color: var(--red);
      font-size: 22px;
    }

    @keyframes pulse-warn {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }

    @keyframes pulse-over {
      0%, 100% { box-shadow: 0 0 10px var(--red-glow); }
      50% { box-shadow: 0 0 25px var(--red-glow); }
    }

    #pos-toasts {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    }

    .pos-toast {
      pointer-events: auto;
      background: var(--card);
      border: 1px solid var(--card-border);
      color: var(--tx);
      padding: 12px 18px;
      border-radius: var(--radius-sm);
      box-shadow: var(--shadow-lg);
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 280px;
      animation: slide-in 0.25s ease-out;
    }

    .pos-toast.success { border-left: 4px solid var(--primary); }
    .pos-toast.error { border-left: 4px solid var(--red); }
    .pos-toast.warn { border-left: 4px solid var(--amber); }
    .pos-toast.info { border-left: 4px solid var(--blue); }

    @keyframes slide-in {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    #pos-modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(4px);
      z-index: 10000;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }

    .pos-modal {
      background: var(--bg-elevated);
      border: 1px solid var(--card-border);
      border-radius: var(--radius);
      box-shadow: var(--shadow-lg);
      width: 100%;
      max-width: 540px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      animation: modal-pop 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes modal-pop {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }

    .modal-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid var(--card-border);
    }

    .modal-head h3 { font-size: 16px; font-weight: 700; }
    .modal-close {
      background: transparent;
      border: none;
      font-size: 20px;
      color: var(--tx-muted);
      cursor: pointer;
    }

    .modal-body {
      padding: 20px;
      overflow-y: auto;
    }

    .modal-foot {
      padding: 14px 20px;
      border-top: 1px solid var(--card-border);
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }

    .table-responsive {
      overflow-x: auto;
      width: 100%;
    }

    table.pos-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }

    table.pos-table th {
      text-align: left;
      padding: 10px 14px;
      color: var(--tx-muted);
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 2px solid var(--card-border);
    }

    table.pos-table td {
      padding: 12px 14px;
      border-bottom: 1px solid var(--card-border);
      color: var(--tx);
    }

    table.pos-table tr:hover td {
      background: var(--card-hover);
    }

    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 99px;
      font-size: 12px;
      font-weight: 700;
    }
    .badge-lunas { background: rgba(16, 185, 129, 0.15); color: var(--primary); }
    .badge-pending { background: rgba(245, 158, 11, 0.15); color: var(--amber); }
    .badge-batal { background: rgba(239, 68, 68, 0.15); color: var(--red); }

    .pos-banner {
      background: linear-gradient(90deg, #b91c1c, #dc2626);
      color: white;
      padding: 12px 16px;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 16px;
      box-shadow: var(--red-glow);
    }

    .receipt-paper {
      background: white;
      color: black;
      font-family: 'JetBrains Mono', monospace;
      padding: 20px;
      max-width: 380px;
      margin: 0 auto;
      border-radius: 6px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      font-size: 12px;
      line-height: 1.4;
    }

    .receipt-divider { border-top: 1px dashed #777; margin: 8px 0; }
    .receipt-row { display: flex; justify-content: space-between; margin-bottom: 4px; }

    @media print {
      body * { visibility: hidden; }
      #pos-printable-receipt, #pos-printable-receipt * { visibility: visible; }
      #pos-printable-receipt {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        max-width: 80mm;
        margin: 0;
        padding: 5mm;
        box-shadow: none;
      }
    }
  `;
  document.head.appendChild(css);
})();

const $ = id => document.getElementById(id);
const rp = n => 'Rp ' + Math.round(+n || 0).toLocaleString('id-ID');
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const tgl = t => new Date(t).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' });
const jam = t => new Date(t).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

let TOKEN = '';
let ROLE = '';
let serverOffset = 0;
const now = () => Date.now() + serverOffset;

function fmt(ms) {
  if (ms <= 0) return '00:00:00';
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return (h ? String(h).padStart(2, '0') + ':' : '') +
    String(m).padStart(2, '0') + ':' +
    String(s).padStart(2, '0');
}

// Audio
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSound(type) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const t = ctx.currentTime;
    if (type === 'beep') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, t);
      osc.frequency.setValueAtTime(440, t + 0.15);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);
      osc.start(t);
      osc.stop(t + 0.4);
    } else if (type === 'alarm') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(950, t);
      osc.frequency.setValueAtTime(700, t + 0.2);
      osc.frequency.setValueAtTime(950, t + 0.4);
      gain.gain.setValueAtTime(0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.6);
      osc.start(t);
      osc.stop(t + 0.6);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, t);
      osc.frequency.setValueAtTime(659.25, t + 0.1);
      osc.frequency.setValueAtTime(783.99, t + 0.2);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.5);
      osc.start(t);
      osc.stop(t + 0.5);
    }
  } catch (e) { }
}

function toast(msg, type = 'info', duration = 3200) {
  let container = $('pos-toasts');
  if (!container) {
    container = document.createElement('div');
    container.id = 'pos-toasts';
    document.body.appendChild(container);
  }

  const icons = { success: '✓', error: '✕', warn: '⚠', info: 'ℹ' };
  const item = document.createElement('div');
  item.className = `pos-toast ${type}`;
  item.innerHTML = `<span>${icons[type] || '•'}</span><span>${esc(msg)}</span>`;
  container.appendChild(item);

  if (type === 'success') playSound('success');
  if (type === 'error' || type === 'warn') playSound('beep');

  setTimeout(() => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(-10px)';
    item.style.transition = 'all 0.25s ease';
    setTimeout(() => item.remove(), 250);
  }, duration);
}

function openModal(title, bodyHtml, footHtml = '') {
  let overlay = $('pos-modal-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'pos-modal-overlay';
    overlay.innerHTML = `
      <div class="pos-modal">
        <div class="modal-head">
          <h3 id="modal-title"></h3>
          <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <div class="modal-body" id="modal-body"></div>
        <div class="modal-foot" id="modal-foot"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal();
    });
  }

  $('modal-title').textContent = title;
  $('modal-body').innerHTML = bodyHtml;
  $('modal-foot').innerHTML = footHtml || `<button class="btn" onclick="closeModal()">Tutup</button>`;
  overlay.style.display = 'flex';
}

function closeModal() {
  const overlay = $('pos-modal-overlay');
  if (overlay) overlay.style.display = 'none';
}

async function api(url, body) {
  const headers = { 'Content-Type': 'application/json' };
  if (TOKEN) headers['x-token'] = TOKEN;

  const res = await fetch(url, {
    method: body ? 'POST' : 'GET',
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401 && TOKEN) {
      toast('Sesi berakhir, silakan login kembali', 'error');
      logout();
    }
    throw new Error(data.err || `Error ${res.status}`);
  }
  return data;
}

async function act(url, body) {
  try {
    const res = await api(url, body);
    if (window.pull) await window.pull();
    return res;
  } catch (err) {
    toast(err.message, 'error');
    return null;
  }
}

function boot(role, mainCallback) {
  ROLE = role;
  try { TOKEN = sessionStorage.getItem('tk_' + role) || ''; } catch (e) { }

  window._main = mainCallback;
  if (TOKEN) return mainCallback();

  $('app').innerHTML = `
    <div style="min-height: 80vh; display: flex; align-items: center; justify-content: center;">
      <div class="c-card" style="width: 100%; max-width: 380px; text-align: center; padding: 32px 28px;">
        <img src="/logo_clean.png" alt="Faat Choi Logo" style="width:72px; height:72px; border-radius:50%; margin: 0 auto 14px; object-fit:contain; border:2px solid var(--primary); padding:2px; background:white;">
        <h1 style="font-size: 22px; font-weight: 800; margin-bottom: 2px;">Faat Choi</h1>
        <div style="font-size: 13px; color: var(--primary); font-weight: 700; margin-bottom: 6px;">MAHJONG FOR FUN</div>
        <p style="color: var(--tx-muted); font-size: 13px; margin-bottom: 24px;">Masuk sebagai <b>${role.toUpperCase()}</b></p>
        
        <div style="text-align: left;">
          <label>PIN Masuk</label>
          <input id="lp" type="password" inputmode="numeric" placeholder="Masukkan 4 angka PIN..." 
            style="text-align: center; letter-spacing: 6px; font-size: 20px; font-weight: 700;"
            onkeydown="if(event.key==='Enter')doLogin()">
          <button class="btn btn-primary btn-block" style="padding: 12px; margin-top: 8px;" onclick="doLogin()">Masuk ke Sistem</button>
        </div>

        <div style="margin-top: 24px; font-size: 12px; color: var(--tx-muted);">
          Beralih ke: <a href="/kasir" style="color: var(--blue);">Kasir</a> • <a href="/pemilik" style="color: var(--blue);">Pemilik</a> • <a href="/display" style="color: var(--blue);">Layar TV</a>
        </div>
      </div>
    </div>
  `;
  setTimeout(() => { if ($('lp')) $('lp').focus(); }, 150);
}

async function doLogin() {
  const pinInput = $('lp');
  if (!pinInput || !pinInput.value) return toast('Masukkan PIN terlebih dahulu', 'warn');

  try {
    const res = await api('/api/login', { role: ROLE, pin: pinInput.value });
    TOKEN = res.token;
    try { sessionStorage.setItem('tk_' + ROLE, TOKEN); } catch (e) { }
    toast(`Selamat datang di Faat Choi`, 'success');
    _main();
  } catch (err) {
    toast(err.message || 'PIN tidak cocok', 'error');
  }
}

function logout() {
  try { sessionStorage.removeItem('tk_' + ROLE); } catch (e) { }
  location.reload();
}

function renderHeader(roleTitle) {
  return `
    <header class="pos-header">
      <div class="pos-brand">
        <img src="/logo_clean.png" alt="Faat Choi Logo" class="brand-logo-img">
        <div>
          <div class="brand-title" id="hdr-nama">Faat Choi</div>
          <div class="brand-subtitle" id="hdr-sub">${roleTitle}</div>
        </div>
      </div>
      <div class="pos-actions">
        <div class="rate-badge" id="hdr-rate-badge">
          📅 <span id="rate-text">Memuat tarif hari ini...</span>
        </div>
        <div class="live-clock">
          <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:var(--primary);"></span>
          <span id="hdr-clock">--:--:--</span>
        </div>
        <button class="btn btn-sm" onclick="toggleTheme()" title="Ganti Tema">🌓</button>
        <button class="btn btn-sm btn-danger" onclick="logout()">Keluar</button>
      </div>
    </header>
  `;
}

function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) { }
}

(function initTheme() {
  try {
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
  } catch (e) { }
})();

setInterval(() => {
  const c = $('hdr-clock');
  if (c) c.textContent = new Date().toLocaleTimeString('id-ID');
}, 1000);

// Kartu Meja Universal (Dinamis Tarif Berdasarkan Hari)
function tablesHTML(T, maxTable, nw, role = 'kasir') {
  let html = '';
  const currentTarif = (window.TARIF_INFO ? window.TARIF_INFO.tarif : window.TARIF) || 50000;

  for (let i = 1; i <= maxTable; i++) {
    const t = T[i];
    let cls = 'free';
    let statusText = 'KOSONG';
    let timerText = '--:--';
    let custName = 'Tersedia';
    let pct = 0;

    if (t) {
      custName = esc(t.cust);

      if (t.isOpen) {
        cls = 'open-play';
        statusText = 'MAIN BEBAS';
        const elapsed = Math.max(0, nw - t.start);
        timerText = fmt(elapsed);
        const estSewa = Math.round((elapsed / 3600000) * currentTarif);
        custName = `${esc(t.cust)} <span style="color:var(--cyan); font-weight:700;">(Est. ${rp(estSewa)})</span>`;
        pct = 100;
      } else {
        const left = t.end - nw;
        const totalDur = Math.max(1, t.end - t.start);
        pct = Math.max(0, Math.min(100, Math.round((left / totalDur) * 100)));

        if (left <= 0) {
          cls = 'over';
          statusText = 'WAKTU SELESAI';
          timerText = 'HABIS';
        } else if (left <= 300000) {
          cls = 'warn';
          statusText = 'HAMPIR HABIS';
          timerText = fmt(left);
        } else {
          cls = 'busy';
          statusText = 'BERMAIN';
          timerText = fmt(left);
        }
      }
    }

    html += `
      <div class="tbl-card ${cls}">
        <div>
          <div class="tbl-head">
            <span class="tbl-num">Meja ${i}</span>
            <span class="tbl-badge">${statusText}</span>
          </div>
          <div class="tbl-timer">${timerText}</div>
          <div class="tbl-cust">${custName}</div>
          <div class="tbl-bar">
            <div class="tbl-bar-fill" style="width: ${t ? pct : 0}%;"></div>
          </div>
        </div>

        ${role === 'kasir' && t ? `
          <div class="tbl-actions">
            ${t.isOpen ? `
              <button class="btn btn-sm btn-amber" onclick="dialogStopTable(${i})" title="Selesai & Tagih">🛑 Selesai / Tagih</button>
              <button class="btn btn-sm" onclick="dialogAddMenuToTable(${i})" title="Tambah Pesanan">+ Pesanan</button>
            ` : `
              <button class="btn btn-sm btn-primary" onclick="dialogExtend(${i})" title="Tambah Jam Durasi">+ Jam</button>
              <button class="btn btn-sm" onclick="dialogAddMenuToTable(${i})" title="Tambah Pesanan">+ Pesanan</button>
            `}
            <button class="btn btn-sm" onclick="dialogMove(${i})" title="Pindah Meja">⇄ Pindah</button>
            <button class="btn btn-sm btn-danger" onclick="dialogFree(${i})" title="Kosongkan Meja">Kosongkan</button>
          </div>
        ` : ''}
      </div>
    `;
  }
  return html;
}

// Dialog Selesai Main & Hitung Tagihan
function dialogStopTable(no) {
  const tbl = (window.ACTIVE_TABLES || {})[no];
  if (!tbl) return toast(`Meja ${no} tidak aktif`, 'warn');

  const tarif = (window.TARIF_INFO ? window.TARIF_INFO.tarif : window.TARIF) || 50000;
  const elapsedMs = Math.max(0, now() - tbl.start);
  const totalMenit = Math.ceil(elapsedMs / 60000);
  const jamExact = Math.floor(totalMenit / 60);
  const sisaMenit = totalMenit % 60;

  const sewaProporsional = Math.round((totalMenit / 60) * tarif);
  const menitBulat30 = Math.ceil(totalMenit / 30) * 30;
  const sewaBulat30 = Math.round((menitBulat30 / 60) * tarif);
  const menitBulat60 = Math.ceil(totalMenit / 60) * 60;
  const sewaBulat60 = Math.round((menitBulat60 / 60) * tarif);

  const allTrx = (window.ALL_TRX || []);
  const linkedTrx = allTrx.find(z => z.id == tbl.trx) || { items: [], diskon: 0 };
  const fnbTotal = (linkedTrx.items || []).reduce((a, z) => a + (z.p * z.q), 0);

  const content = `
    <div style="background:var(--bg); padding:14px; border-radius:var(--radius-sm); margin-bottom:14px; border:1px solid var(--card-border);">
      <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
        <span style="color:var(--tx-muted);">Pelanggan:</span>
        <b>${esc(tbl.cust)} (Meja ${no})</b>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
        <span style="color:var(--tx-muted);">Tarif Berlaku:</span>
        <b style="color:var(--primary);">${rp(tarif)}/jam (${window.TARIF_INFO ? window.TARIF_INFO.label : 'Hari ini'})</b>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
        <span style="color:var(--tx-muted);">Mulai / Berhenti:</span>
        <span>${jam(tbl.start)} - ${jam(now())}</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:15px; font-weight:700; border-top:1px dashed var(--card-border); padding-top:6px; margin-top:6px;">
        <span>Durasi Bermain:</span>
        <span style="color:var(--cyan); font-family:var(--font-mono);">${jamExact} Jam ${sisaMenit} Menit</span>
      </div>
    </div>

    <label>Pilihan Perhitungan Sewa Meja</label>
    <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px; margin-bottom:12px;">
      <button class="btn btn-sm" id="btn-round-exact" onclick="pickRounding('exact', ${totalMenit / 60}, ${sewaProporsional})">
        Per Menit<br><b>${rp(sewaProporsional)}</b>
      </button>
      <button class="btn btn-sm btn-primary" id="btn-round-30" onclick="pickRounding('30', ${menitBulat30 / 60}, ${sewaBulat30})">
        Bulat 30m<br><b>${rp(sewaBulat30)}</b>
      </button>
      <button class="btn btn-sm" id="btn-round-60" onclick="pickRounding('60', ${menitBulat60 / 60}, ${sewaBulat60})">
        Bulat 1 Jam<br><b>${rp(sewaBulat60)}</b>
      </button>
    </div>

    <div class="grid-2">
      <div>
        <label>Biaya Sewa Final (Rp)</label>
        <input id="stop-sewa" type="number" step="1000" value="${sewaBulat30}" oninput="calcStopGrandTotal()">
      </div>
      <div>
        <label>Durasi Tercatat (Jam)</label>
        <input id="stop-jam" type="number" step="0.1" value="${(menitBulat30 / 60).toFixed(1)}">
      </div>
    </div>

    ${(linkedTrx.items && linkedTrx.items.length) ? `
      <div style="margin:10px 0; border-top:1px solid var(--card-border); padding-top:8px;">
        <label>Pesanan Menu yang Digabung (${linkedTrx.items.length}):</label>
        ${linkedTrx.items.map(it => `
          <div style="display:flex; justify-content:space-between; font-size:12px; color:var(--tx-sub);">
            <span>${esc(it.n)} x${it.q}</span>
            <span>${rp(it.p * it.q)}</span>
          </div>
        `).join('')}
      </div>
    ` : ''}

    <div class="c-card" style="background:var(--bg); padding:12px; margin-top:8px; margin-bottom:12px;">
      <div style="display:flex; justify-content:space-between; font-size:18px; font-weight:800;">
        <span>TOTAL DIBAYAR</span>
        <span id="stop-grand-total" style="color:var(--primary); font-family:var(--font-mono);">${rp(sewaBulat30 + fnbTotal - (linkedTrx.diskon || 0))}</span>
      </div>
    </div>

    <label>Metode Pembayaran</label>
    <select id="stop-metode" onchange="toggleStopCashBox()">
      <option>Tunai</option>
      <option>QRIS</option>
      <option>Transfer</option>
    </select>

    <div id="stop-cash-box">
      <label>Uang Diterima (Rp)</label>
      <input id="stop-bayar" type="number" step="5000" placeholder="0" oninput="calcStopChange()">
      <div style="display:flex; justify-content:space-between; margin-top:6px; font-weight:700;">
        <span style="color:var(--tx-muted);">Kembalian:</span>
        <span id="stop-change" style="color:var(--amber); font-family:var(--font-mono); font-size:16px;">Rp 0</span>
      </div>
    </div>
  `;

  const footer = `
    <button class="btn" onclick="closeModal()">Kembali</button>
    <button class="btn btn-primary" onclick="submitStopTable(${no})">Bayar Lunas & Selesai Main</button>
  `;

  openModal(`Checkout & Tagihan Meja ${no}`, content, footer);

  window.fnbTotalAttached = fnbTotal;
  window.diskonAttached = linkedTrx.diskon || 0;

  window.pickRounding = (mode, j, s) => {
    ['exact', '30', '60'].forEach(m => {
      const b = $('btn-round-' + m);
      if (b) b.className = (m === mode) ? 'btn btn-sm btn-primary' : 'btn btn-sm';
    });
    $('stop-jam').value = j.toFixed(1);
    $('stop-sewa').value = s;
    calcStopGrandTotal();
  };

  window.calcStopGrandTotal = () => {
    const sewa = +$('stop-sewa').value || 0;
    const grand = Math.max(0, sewa + window.fnbTotalAttached - window.diskonAttached);
    $('stop-grand-total').textContent = rp(grand);
    calcStopChange();
  };

  window.calcStopChange = () => {
    const sewa = +$('stop-sewa').value || 0;
    const grand = Math.max(0, sewa + window.fnbTotalAttached - window.diskonAttached);
    const bayar = +$('stop-bayar').value || 0;
    $('stop-change').textContent = rp(Math.max(0, bayar - grand));
  };

  window.toggleStopCashBox = () => {
    const m = $('stop-metode').value;
    $('stop-cash-box').style.display = m === 'Tunai' ? 'block' : 'none';
  };
}

async function submitStopTable(no) {
  const jam = +$('stop-jam').value || 1;
  const sewa = +$('stop-sewa').value || 0;
  const metode = $('stop-metode').value;
  const bayar = +$('stop-bayar').value || 0;

  const res = await act('/api/table-stop', {
    no,
    jam,
    sewa,
    bayarNow: true,
    metode,
    bayar
  });

  if (res && res.ok) {
    toast(`Meja ${no} selesai bermain & tagihan lunas!`, 'success');
    closeModal();
    if (res.t) printThermal(res.t);
  }
}

// Dialog Tambah Menu
function dialogAddMenuToTable(no) {
  const tbl = (window.ACTIVE_TABLES || {})[no];
  if (!tbl) return toast(`Meja ${no} tidak aktif`, 'warn');

  const menuList = window.MENU_LIST || [];
  if (!menuList.length) return toast('Menu belum dimuat', 'warn');

  const content = `
    <p style="color:var(--tx-sub); margin-bottom:12px;">
      Tambah minuman/makanan ke tagihan <b>Meja ${no} (${esc(tbl.cust)})</b>
    </p>

    <div style="max-height:280px; overflow-y:auto; padding-right:4px;">
      ${menuList.map(m => `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid var(--card-border);">
          <div>
            <b>${esc(m.n)}</b>
            <div style="font-size:12px; color:var(--tx-muted);">${rp(m.p)} · Stok: ${m.s}</div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <button class="btn btn-sm" onclick="adjItem(${m.id}, -1)">−</button>
            <span id="qty-${m.id}" style="font-weight:700; min-width:20px; text-align:center;">0</span>
            <button class="btn btn-sm btn-primary" onclick="adjItem(${m.id}, 1)">+</button>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="c-card" style="background:var(--bg); margin-top:14px; margin-bottom:4px; padding:12px;">
      <div style="display:flex; justify-content:space-between; font-weight:700;">
        <span>Tambahan Biaya:</span>
        <span id="add-order-total" style="color:var(--primary); font-size:16px;">Rp 0</span>
      </div>
    </div>
  `;

  const footer = `
    <button class="btn" onclick="closeModal()">Batal</button>
    <button class="btn btn-primary" onclick="submitAddOrderToTable(${no})">Tambahkan ke Tagihan</button>
  `;

  openModal(`+ Pesanan Meja ${no}`, content, footer);

  window.orderTemp = {};
  window.adjItem = (id, delta) => {
    const m = menuList.find(x => x.id === id);
    if (!m) return;
    const cur = window.orderTemp[id] || 0;
    const next = Math.max(0, cur + delta);
    if (next > m.s) return toast(`Stok ${m.n} hanya tersisa ${m.s}`, 'warn');
    window.orderTemp[id] = next;
    $('qty-' + id).textContent = next;

    let tot = 0;
    Object.keys(window.orderTemp).forEach(k => {
      const item = menuList.find(x => x.id == k);
      if (item) tot += item.p * window.orderTemp[k];
    });
    $('add-order-total').textContent = rp(tot);
  };
}

async function submitAddOrderToTable(no) {
  const items = [];
  Object.keys(window.orderTemp || {}).forEach(k => {
    const q = window.orderTemp[k];
    if (q > 0) items.push({ id: +k, q });
  });

  if (!items.length) return toast('Pilih minimal 1 item pesanan', 'warn');

  const res = await act('/api/table-add-order', { no, items });
  if (res && res.ok) {
    toast(`Pesanan berhasil ditambahkan ke Meja ${no}`, 'success');
    closeModal();
  }
}

// Dialog Extend Meja
function dialogExtend(no) {
  const tarif = (window.TARIF_INFO ? window.TARIF_INFO.tarif : window.TARIF) || 50000;
  const content = `
    <p style="margin-bottom: 12px; color: var(--tx-sub);">Tambah durasi sewa untuk <b>Meja ${no}</b></p>
    <label>Durasi Tambahan (Jam)</label>
    <div style="display:flex; gap:8px; margin-bottom:12px;">
      <button class="btn btn-sm" onclick="$('ext-jam').value=0.5;calcExt()">+30 Menit</button>
      <button class="btn btn-sm btn-primary" onclick="$('ext-jam').value=1;calcExt()">+1 Jam</button>
      <button class="btn btn-sm" onclick="$('ext-jam').value=2;calcExt()">+2 Jam</button>
      <button class="btn btn-sm" onclick="$('ext-jam').value=3;calcExt()">+3 Jam</button>
    </div>
    <input id="ext-jam" type="number" step="0.5" min="0.5" value="1" oninput="calcExt()">
    <label>Status Pembayaran</label>
    <select id="ext-status" onchange="calcExt()">
      <option value="lunas">Bayar Lunas Sekarang</option>
      <option value="pending">Pending (Gabung / Bayar Nanti)</option>
    </select>
    <div id="ext-metode-box">
      <label>Metode Pembayaran</label>
      <select id="ext-metode">
        <option>Tunai</option>
        <option>QRIS</option>
        <option>Transfer</option>
      </select>
    </div>
    <div class="c-card" style="margin-top:14px; background:var(--bg);">
      <div style="display:flex; justify-content:space-between; font-weight:700;">
        <span>Biaya Tambahan (${rp(tarif)}/jam)</span>
        <span id="ext-total" style="color:var(--primary); font-size:16px;">Rp 0</span>
      </div>
    </div>
  `;

  const footer = `
    <button class="btn" onclick="closeModal()">Batal</button>
    <button class="btn btn-primary" onclick="submitExtend(${no})">Konfirmasi Tambah</button>
  `;

  openModal(`Perpanjang Meja ${no}`, content, footer);
  window.calcExt = () => {
    const jam = +$('ext-jam').value || 0;
    const curTarif = (window.TARIF_INFO ? window.TARIF_INFO.tarif : window.TARIF) || 50000;
    $('ext-total').textContent = rp(jam * curTarif);
    const st = $('ext-status').value;
    $('ext-metode-box').style.display = st === 'lunas' ? 'block' : 'none';
  };
  calcExt();
}

async function submitExtend(no) {
  const jam = +$('ext-jam').value || 1;
  const status = $('ext-status').value;
  const metode = $('ext-metode').value;
  const res = await act('/api/table-extend', { no, jam, status, metode });
  if (res && res.ok) {
    toast(`Durasi Meja ${no} diperpanjang (+${jam} jam)`, 'success');
    closeModal();
    if (res.t) printThermal(res.t);
  }
}

function dialogMove(no) {
  const max = window.MEJA_COUNT || 6;
  const activeTables = window.ACTIVE_TABLES || {};
  let options = '';
  for (let i = 1; i <= max; i++) {
    if (i !== no && !activeTables[i]) {
      options += `<option value="${i}">Meja ${i} (Kosong)</option>`;
    }
  }

  if (!options) return toast('Tidak ada meja kosong untuk pindah', 'warn');

  const content = `
    <p style="margin-bottom: 12px; color: var(--tx-sub);">Pindahkan pelanggan dari <b>Meja ${no}</b> ke:</p>
    <label>Pilih Meja Tujuan</label>
    <select id="mv-target">${options}</select>
  `;

  const footer = `
    <button class="btn" onclick="closeModal()">Batal</button>
    <button class="btn btn-primary" onclick="submitMove(${no})">Pindahkan</button>
  `;

  openModal(`Pindah Meja ${no}`, content, footer);
}

async function submitMove(from) {
  const to = +$('mv-target').value;
  const res = await act('/api/table-move', { from, to });
  if (res && res.ok) {
    toast(`Pelanggan berhasil dipindahkan ke Meja ${to}`, 'success');
    closeModal();
  }
}

function dialogFree(no) {
  if (confirm(`Yakin ingin mengosongkan Meja ${no}?`)) {
    act('/api/table', { no }).then(res => {
      if (res && res.ok) toast(`Meja ${no} sekarang kosong`, 'info');
    });
  }
}

function printThermal(t) {
  const shopName = 'FAAT CHOI';
  const html = `
    <div id="pos-printable-receipt" class="receipt-paper">
      <div style="text-align:center; margin-bottom:8px;">
        <img src="/logo_clean.png" style="width:48px; height:48px; border-radius:50%; margin:0 auto 4px; object-fit:contain;">
        <h4 style="font-size:17px; margin:0; font-weight:800; letter-spacing:0.5px;">FAAT CHOI</h4>
        <div style="font-size:11px; font-weight:700; color:#0f5132;">MAHJONG FOR FUN</div>
        <div style="font-size:10px; color:#555; margin-top:2px;">Jl. Sukamekar III No. 15, Bandung<br>IG: @faatchoimahjong</div>
      </div>
      <div class="receipt-divider"></div>
      
      <div class="receipt-row"><span>No:</span><span>${t.no}</span></div>
      <div class="receipt-row"><span>Waktu:</span><span>${tgl(t.ts)}</span></div>
      <div class="receipt-row"><span>Pelanggan:</span><span>${esc(t.cust)}</span></div>
      <div class="receipt-row"><span>Meja:</span><span>${t.meja}</span></div>
      <div class="receipt-row"><span>Kasir:</span><span>${t.by}</span></div>
      
      <div class="receipt-divider"></div>
      ${(t.jam || t.sewa) ? `
        <div class="receipt-row">
          <span>Sewa Meja (${t.jam || 0} Jam @${rp(t.rate || 50000)})</span>
          <span>${rp(t.sewa || 0)}</span>
        </div>
      ` : ''}
      
      ${(t.items || []).map(i => `
        <div class="receipt-row">
          <span>${esc(i.n)} x${i.q}</span>
          <span>${rp(i.p * i.q)}</span>
        </div>
      `).join('')}
      
      ${t.diskon ? `
        <div class="receipt-row" style="color:#b91c1c;">
          <span>Diskon</span>
          <span>-${rp(t.diskon)}</span>
        </div>
      ` : ''}

      <div class="receipt-divider"></div>
      <div class="receipt-row" style="font-weight:700; font-size:14px;">
        <span>TOTAL</span>
        <span>${rp(t.total)}</span>
      </div>
      
      <div class="receipt-row">
        <span>Status:</span>
        <span style="font-weight:700;">${t.status === 'lunas' ? 'LUNAS (' + t.metode + ')' : 'PENDING'}</span>
      </div>
      
      ${t.status === 'lunas' ? `
        <div class="receipt-row"><span>Bayar:</span><span>${rp(t.bayar || t.total)}</span></div>
        <div class="receipt-row"><span>Kembali:</span><span>${rp(t.kembali || 0)}</span></div>
      ` : ''}

      ${t.catatan ? `
        <div class="receipt-divider"></div>
        <div style="font-size:11px;">Catatan: ${esc(t.catatan)}</div>
      ` : ''}

      <div class="receipt-divider"></div>
      <div style="text-align:center; font-size:11px; margin-top:8px;">
        Strictly No Gambling • Happy Playing!<br>Terima kasih atas kunjungan Anda!
      </div>
    </div>
  `;

  const footer = `
    <button class="btn" onclick="closeModal()">Tutup</button>
    <button class="btn btn-blue" onclick="downloadStrukPDF(${t.id})">Unduh PDF</button>
    <button class="btn btn-primary" onclick="window.print()">🖨 Cetak Struk</button>
  `;

  window._lastTrx = t;
  openModal('Struk Pembayaran', html, footer);
}

function downloadStrukPDF(trxId) {
  const t = window._lastTrx;
  if (!t || !window.jspdf) return alert('Pustaka PDF sedang dimuat atau transaksi tidak ditemukan.');
  const doc = new window.jspdf.jsPDF({ unit: 'mm', format: [80, 115 + (t.items ? t.items.length * 6 : 0)] });
  let y = 8;
  const ln = (a, b, bold = false) => {
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.text(String(a), 4, y);
    if (b != null) doc.text(String(b), 76, y, { align: 'right' });
    y += 5;
  };

  doc.setFontSize(13); doc.setFont('helvetica', 'bold');
  doc.text('FAAT CHOI', 40, y, { align: 'center' });
  y += 5; doc.setFontSize(8); doc.setFont('helvetica', 'normal');
  doc.text('MAHJONG FOR FUN', 40, y, { align: 'center' });
  y += 4;
  doc.text('Jl. Sukamekar III No. 15, Bandung', 40, y, { align: 'center' });
  y += 6;
  ln(t.no, tgl(t.ts));
  ln('Pelanggan', t.cust);
  ln('Meja', t.meja);
  ln('Kasir', t.by);
  doc.line(4, y - 3, 76, y - 3);

  if (t.jam || t.sewa) ln('Sewa Meja ' + (t.jam || 0) + ' Jam', rp(t.sewa || 0));
  (t.items || []).forEach(i => ln(i.n + ' x' + i.q, rp(i.p * i.q)));
  if (t.diskon) ln('Diskon', '-' + rp(t.diskon));
  doc.line(4, y - 3, 76, y - 3);

  doc.setFontSize(10); ln('TOTAL', rp(t.total), true); doc.setFontSize(8);
  ln('Status', t.status === 'lunas' ? 'LUNAS (' + t.metode + ')' : 'PENDING', true);
  if (t.bayar) ln('Bayar', rp(t.bayar));
  if (t.kembali) ln('Kembali', rp(t.kembali));
  y += 4;
  doc.text('Strictly No Gambling • Happy Playing!', 40, y, { align: 'center' });
  doc.save(`struk-faatchoi-${t.no}.pdf`);
}
