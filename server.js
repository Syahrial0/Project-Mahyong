// Jalankan: node server.js (Node 18+, tanpa npm install)
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const FILE = path.join(__dirname, 'data.json');

const def = {
  cfg: {
    nama: 'Faat Choi',
    tarifWeekday: 50000,
    tarifWeekend: 60000,
    tarif: 50000,
    meja: 6,
    pinO: '1111',
    pinK: '2222',
    alamat: 'Jalan Sukamekar III No. 15, Bandung',
    instagram: '@faatchoimahjong',
    runningText: 'Selamat Datang di Faat Choi Mahjong! Mahjong for Fun, Strictly No Gambling. Buka 09:00 - 22:00. Jl. Sukamekar III No. 15, Bandung. IG: @faatchoimahjong',
    nowPlaying: {
      title: 'Lofi Mahjong Chill Beats',
      artist: 'Spotify / YouTube Music',
      source: 'Spotify'
    }
  },
  seq: 0,
  menu: [
    { id: 1, n: 'Teh Manis', p: 5000, s: 50, cat: 'Minuman' },
    { id: 2, n: 'Kopi Hitam', p: 7000, s: 50, cat: 'Minuman' },
    { id: 3, n: 'Air Mineral', p: 4000, s: 60, cat: 'Minuman' },
    { id: 4, n: 'Mie Instan', p: 12000, s: 20, cat: 'Makanan' }
  ],
  trx: [],
  tables: {}
};

let db;
try {
  db = JSON.parse(fs.readFileSync(FILE, 'utf8'));
  if (!db.cfg) db.cfg = def.cfg;
  if (!db.cfg.nama) db.cfg.nama = 'Faat Choi';
  if (!db.cfg.tarifWeekday) db.cfg.tarifWeekday = 50000;
  if (!db.cfg.tarifWeekend) db.cfg.tarifWeekend = 60000;
  if (!db.cfg.alamat) db.cfg.alamat = def.cfg.alamat;
  if (!db.cfg.instagram) db.cfg.instagram = def.cfg.instagram;
  if (!db.cfg.runningText) db.cfg.runningText = def.cfg.runningText;
  if (!db.cfg.nowPlaying) db.cfg.nowPlaying = def.cfg.nowPlaying;
  if (!db.menu) db.menu = def.menu;
  if (!db.trx) db.trx = [];
  if (!db.tables) db.tables = {};
  if (typeof db.seq !== 'number') db.seq = db.trx.length;
} catch (e) {
  db = def;
}

function getTarif(ts = Date.now()) {
  const d = new Date(ts).getDay();
  const isWeekend = (d === 0 || d === 5 || d === 6);
  return isWeekend ? (db.cfg.tarifWeekend || 60000) : (db.cfg.tarifWeekday || 50000);
}

function getTarifInfo(ts = Date.now()) {
  const d = new Date(ts).getDay();
  const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const isWeekend = (d === 0 || d === 5 || d === 6);
  const currentTarif = isWeekend ? (db.cfg.tarifWeekend || 60000) : (db.cfg.tarifWeekday || 50000);
  return {
    dayIndex: d,
    dayName: dayNames[d],
    isWeekend,
    label: isWeekend ? 'Weekend (Jumat - Minggu)' : 'Weekday (Senin - Kamis)',
    tarif: currentTarif,
    tarifWeekday: db.cfg.tarifWeekday || 50000,
    tarifWeekend: db.cfg.tarifWeekend || 60000
  };
}

const save = () => {
  try {
    fs.writeFileSync(FILE, JSON.stringify(db, null, 2));
  } catch (err) {
    console.error('Gagal menyimpan database:', err.message);
  }
};

const tok = new Map();

// In-memory WebRTC stream signaling state for Kasir -> TV Display live screen share
let streamSignal = {
  active: false,
  streamId: 0,
  offer: null,
  answer: null,
  cashierCandidates: [],
  displayCandidates: [],
  updatedAt: 0
};

const send = (r, code, obj) => {
  r.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    'Access-Control-Allow-Origin': '*'
  });
  r.end(JSON.stringify(obj));
};

const pages = {
  '/': 'kasir.html',
  '/kasir': 'kasir.html',
  '/pemilik': 'pemilik.html',
  '/display': 'display.html',
  '/common.js': 'common.js',
  '/logo_clean.png': 'logo_clean.png',
  '/logo.png': 'logo_clean.png',
  '/logo.jpg': 'logo.jpg'
};

const server = http.createServer((q, r) => {
  const u = q.url.split('?')[0];

  // Static files & images
  if (q.method === 'GET' && pages[u]) {
    const f = pages[u];
    let mime = 'text/html; charset=utf-8';
    if (f.endsWith('.js')) mime = 'text/javascript; charset=utf-8';
    else if (f.endsWith('.png')) mime = 'image/png';
    else if (f.endsWith('.jpg') || f.endsWith('.jpeg')) mime = 'image/jpeg';

    try {
      const content = fs.readFileSync(path.join(__dirname, f));
      r.writeHead(200, { 'Content-Type': mime });
      return r.end(content);
    } catch (err) {
      r.writeHead(404, { 'Content-Type': 'text/plain' });
      return r.end('File tidak ditemukan');
    }
  }

  // Backup download endpoint
  if (q.method === 'GET' && u === '/api/backup') {
    const role = tok.get(q.headers['x-token']);
    if (role !== 'pemilik') return send(r, 403, { err: 'Hanya pemilik yang dapat mengunduh backup' });
    r.writeHead(200, {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="backup-faat-choi-${Date.now()}.json"`
    });
    return r.end(JSON.stringify(db, null, 2));
  }

  let b = '';
  q.on('data', d => { b += d; });
  q.on('end', () => {
    let x = {};
    if (b) {
      try { x = JSON.parse(b); } catch (e) {
        return send(r, 400, { err: 'Format JSON tidak valid' });
      }
    }
    try {
      route(u, x, tok.get(q.headers['x-token']), r);
    } catch (e) {
      send(r, 400, { err: e.message || 'Terjadi kesalahan sistem' });
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Faat Choi POS berjalan di http://localhost:${PORT}  (/kasir  /pemilik  /display)`);
});

function route(u, x, role, r) {
  const now = Date.now();
  const currentTarif = getTarif(now);
  const tarifInfo = getTarifInfo(now);

  // 1. PUBLIC API (Layar TV Display)
  if (u === '/api/public') {
    const T = {};
    const maxTable = db.cfg.meja || 6;
    for (let i = 1; i <= maxTable; i++) {
      const t = db.tables[i];
      T[i] = t ? { cust: t.cust, start: t.start, end: t.end, isOpen: Boolean(t.isOpen), trx: t.trx } : null;
    }

    const s = {};
    db.trx.forEach(t => {
      if (t.status === 'batal') return;
      const k = (t.cust || '').trim().toLowerCase();
      if (!k || k === 'umum') return;
      s[k] = s[k] || { n: t.cust, v: 0, count: 0 };
      s[k].v += (t.total || 0);
      s[k].count++;
    });

    const top = Object.values(s)
      .sort((a, b) => b.v - a.v)
      .slice(0, 10);

    return send(r, 200, {
      now,
      nama: db.cfg.nama || 'Faat Choi',
      meja: db.cfg.meja,
      tarif: currentTarif,
      tarifInfo,
      tables: T,
      top,
      alamat: db.cfg.alamat,
      instagram: db.cfg.instagram,
      runningText: db.cfg.runningText || '',
      nowPlaying: db.cfg.nowPlaying || { title: 'Faat Choi Lounge Music', artist: 'Spotify' },
      streamActive: streamSignal.active,
      streamId: streamSignal.streamId
    });
  }

  // 2. AUTHENTICATION
  if (u === '/api/login') {
    if (!['pemilik', 'kasir'].includes(x.role)) {
      return send(r, 400, { err: 'Role tidak valid' });
    }
    const expectedPin = x.role === 'pemilik' ? db.cfg.pinO : db.cfg.pinK;
    if (String(x.pin) !== String(expectedPin)) {
      return send(r, 401, { err: 'PIN salah' });
    }
    const token = crypto.randomBytes(16).toString('hex');
    tok.set(token, x.role);
    return send(r, 200, { token, role: x.role, nama: db.cfg.nama || 'Faat Choi', tarifInfo });
  }

  // Validasi login
  if (!role) {
    return send(r, 401, { err: 'Sesi habis atau belum login' });
  }

  // 3. DATABASE SYNC
  if (u === '/api/db') {
    if (role === 'pemilik') {
      return send(r, 200, {
        now,
        cfg: { ...db.cfg, tarif: currentTarif },
        tarifInfo,
        menu: db.menu,
        tables: db.tables,
        trx: db.trx,
        streamActive: streamSignal.active,
        streamId: streamSignal.streamId
      });
    }

    const cutoff = now - (48 * 3600 * 1000);
    const filteredTrx = db.trx.filter(t => t.status === 'pending' || (t.ts >= cutoff));

    return send(r, 200, {
      now,
      cfg: {
        nama: db.cfg.nama || 'Faat Choi',
        tarif: currentTarif,
        tarifWeekday: db.cfg.tarifWeekday,
        tarifWeekend: db.cfg.tarifWeekend,
        meja: db.cfg.meja,
        runningText: db.cfg.runningText,
        alamat: db.cfg.alamat,
        instagram: db.cfg.instagram,
        nowPlaying: db.cfg.nowPlaying
      },
      tarifInfo,
      menu: db.menu,
      tables: db.tables,
      trx: filteredTrx,
      streamActive: streamSignal.active,
      streamId: streamSignal.streamId
    });
  }

  // 4. BUKA TRANSAKSI / MEJA
  if (u === '/api/trx') {
    const rawItems = x.items || [];
    const items = rawItems.map(a => {
      const m = db.menu.find(z => z.id == a.id);
      if (!m) throw new Error('Menu tidak ditemukan');
      if (m.s < a.q) throw new Error(`Stok ${m.n} tersisa ${m.s}, tidak mencukupi`);
      return { id: m.id, n: m.n, p: m.p, q: a.q, sub: m.p * a.q };
    });

    const isOpen = Boolean(x.isOpen);
    const jam = isOpen ? 0 : Math.max(0, +x.jam || 0);
    const meja = +x.meja || 0;

    if (meja) {
      if (meja < 1 || meja > db.cfg.meja) throw new Error('Nomor meja tidak valid');
      if (db.tables[meja]) throw new Error(`Meja ${meja} sedang digunakan oleh ${db.tables[meja].cust}`);
    }

    const rate = currentTarif;
    const sewa = isOpen ? 0 : (jam * rate);
    const fnbTotal = items.reduce((a, z) => a + z.sub, 0);
    const diskon = Math.max(0, +x.diskon || 0);
    const total = Math.max(0, sewa + fnbTotal - diskon);

    const cust = String(x.cust || '').trim();
    const st = isOpen ? 'pending' : (x.status === 'pending' ? 'pending' : 'lunas');

    if ((isOpen || st === 'pending') && !cust) {
      throw new Error('Nama pelanggan wajib diisi untuk transaksi pending / main bebas');
    }

    items.forEach(a => {
      const m = db.menu.find(z => z.id == a.id);
      if (m) m.s -= a.q;
    });

    db.seq = (db.seq || 0) + 1;
    const t = {
      id: now,
      no: 'TRX-' + String(db.seq).padStart(4, '0'),
      ts: now,
      cust: cust || 'Umum',
      meja: meja || '-',
      jam,
      rate,
      sewa,
      items,
      diskon,
      catatan: String(x.catatan || (isOpen ? 'Main Bebas' : '')).trim(),
      total,
      status: st,
      isOpen,
      metode: st === 'lunas' ? (x.metode || 'Tunai') : '-',
      bayar: st === 'lunas' ? (+x.bayar || total) : 0,
      kembali: st === 'lunas' ? Math.max(0, (+x.bayar || total) - total) : 0,
      paidAt: st === 'lunas' ? now : null,
      by: role
    };

    db.trx.push(t);

    if (meja) {
      db.tables[meja] = {
        cust: t.cust,
        start: now,
        end: isOpen ? null : (now + (jam * 3600 * 1000)),
        isOpen,
        trx: t.id
      };
    }

    save();
    return send(r, 200, { ok: 1, t });
  }

  // 5. SELESAI MAIN / STOP BILLING
  if (u === '/api/table-stop') {
    const no = +x.no;
    const tbl = db.tables[no];
    if (!tbl) throw new Error(`Meja ${no} tidak sedang aktif`);

    let t = db.trx.find(z => z.id == tbl.trx);
    const durasiMs = Math.max(0, now - tbl.start);
    const durasiMenit = Math.ceil(durasiMs / 60000);
    const jamCalc = Math.round((durasiMenit / 60) * 10) / 10;
    const jam = x.jam != null ? +x.jam : jamCalc;
    const rate = currentTarif;
    const sewa = x.sewa != null ? +x.sewa : Math.round(jam * rate);

    if (t) {
      t.jam = jam;
      t.rate = rate;
      t.sewa = sewa;
      t.isOpen = false;
      const fnb = (t.items || []).reduce((a, z) => a + (z.p * z.q), 0);
      t.total = Math.max(0, sewa + fnb - (t.diskon || 0));

      if (x.bayarNow) {
        const bayar = +x.bayar || t.total;
        t.status = 'lunas';
        t.metode = x.metode || 'Tunai';
        t.bayar = bayar;
        t.kembali = Math.max(0, bayar - t.total);
        t.paidAt = now;
        t.paidBy = role;
      }
    }

    delete db.tables[no];
    save();
    return send(r, 200, { ok: 1, t });
  }

  // 6. TAMBAH PESANAN KE MEJA AKTIF
  if (u === '/api/table-add-order') {
    const no = +x.no;
    const tbl = db.tables[no];
    if (!tbl) throw new Error(`Meja ${no} tidak sedang aktif`);

    let t = db.trx.find(z => z.id == tbl.trx);
    if (!t) throw new Error('Transaksi meja tidak ditemukan');

    const rawItems = x.items || [];
    if (!rawItems.length) throw new Error('Pilih minimal 1 menu');

    const added = rawItems.map(a => {
      const m = db.menu.find(z => z.id == a.id);
      if (!m) throw new Error('Menu tidak ditemukan');
      if (m.s < a.q) throw new Error(`Stok ${m.n} tersisa ${m.s}, tidak cukup`);
      m.s -= a.q;
      return { id: m.id, n: m.n, p: m.p, q: a.q, sub: m.p * a.q };
    });

    t.items = t.items || [];
    added.forEach(ni => {
      const exist = t.items.find(it => it.id === ni.id);
      if (exist) {
        exist.q += ni.q;
        exist.sub = (exist.sub || (exist.p * exist.q)) + ni.sub;
      } else {
        t.items.push(ni);
      }
    });

    const fnb = t.items.reduce((a, z) => a + (z.p * z.q), 0);
    t.total = Math.max(0, (t.sewa || 0) + fnb - (t.diskon || 0));

    save();
    return send(r, 200, { ok: 1, t, added });
  }

  // 7. PELUNASAN TRANSAKSI PENDING
  if (u === '/api/pay') {
    const t = db.trx.find(z => z.id == x.id);
    if (!t) throw new Error('Transaksi tidak ditemukan');
    if (t.status !== 'pending') throw new Error('Transaksi sudah lunas atau dibatalkan');

    const bayar = +x.bayar || t.total;
    const kembali = Math.max(0, bayar - t.total);

    t.status = 'lunas';
    t.metode = x.metode || 'Tunai';
    t.bayar = bayar;
    t.kembali = kembali;
    t.paidAt = now;
    t.paidBy = role;

    if (t.meja && db.tables[t.meja] && db.tables[t.meja].trx == t.id) {
      delete db.tables[t.meja];
    }

    save();
    return send(r, 200, { ok: 1, t });
  }

  // 8. PERPANJANG DURASI MEJA
  if (u === '/api/table-extend') {
    const no = +x.no;
    const cur = db.tables[no];
    if (!cur) throw new Error(`Meja ${no} tidak sedang aktif`);

    const jam = Math.max(0.5, +x.jam || 1);
    const rate = currentTarif;
    const sewa = jam * rate;
    const st = x.status === 'pending' ? 'pending' : 'lunas';

    const baseEnd = (cur.end && cur.end > now) ? cur.end : now;
    cur.end = baseEnd + (jam * 3600 * 1000);
    cur.isOpen = false;

    db.seq = (db.seq || 0) + 1;
    const t = {
      id: now,
      no: 'TRX-' + String(db.seq).padStart(4, '0'),
      ts: now,
      cust: cur.cust,
      meja: no,
      jam,
      rate,
      sewa,
      items: [],
      diskon: 0,
      catatan: `Perpanjangan meja ${no} (+${jam} jam)`,
      total: sewa,
      status: st,
      metode: st === 'lunas' ? (x.metode || 'Tunai') : '-',
      bayar: st === 'lunas' ? (+x.bayar || sewa) : 0,
      kembali: st === 'lunas' ? Math.max(0, (+x.bayar || sewa) - sewa) : 0,
      paidAt: st === 'lunas' ? now : null,
      by: role
    };

    db.trx.push(t);
    save();
    return send(r, 200, { ok: 1, table: cur, t });
  }

  // 9. PINDAH MEJA
  if (u === '/api/table-move') {
    const from = +x.from;
    const to = +x.to;
    if (!db.tables[from]) throw new Error(`Meja asal (${from}) tidak aktif`);
    if (to < 1 || to > db.cfg.meja) throw new Error('Meja tujuan tidak valid');
    if (db.tables[to]) throw new Error(`Meja ${to} sedang dipakai`);

    const tbl = db.tables[from];
    db.tables[to] = tbl;
    delete db.tables[from];

    if (tbl.trx) {
      const t = db.trx.find(z => z.id == tbl.trx);
      if (t) t.meja = to;
    }

    save();
    return send(r, 200, { ok: 1, from, to });
  }

  // 10. KOSONGKAN MEJA
  if (u === '/api/table') {
    const no = +x.no;
    if (!db.tables[no]) throw new Error(`Meja ${no} sudah kosong`);
    delete db.tables[no];
    save();
    return send(r, 200, { ok: 1, no });
  }

  // 11. VOID / BATALKAN TRANSAKSI (HANYA PEMILIK)
  if (u === '/api/trx-void') {
    if (role !== 'pemilik') throw new Error('Hanya pemilik yang dapat membatalkan transaksi');
    const t = db.trx.find(z => z.id == x.id);
    if (!t) throw new Error('Transaksi tidak ditemukan');
    if (t.status === 'batal') throw new Error('Transaksi sudah dibatalkan sebelumnya');

    (t.items || []).forEach(it => {
      const m = db.menu.find(z => z.id == it.id);
      if (m) m.s += it.q;
    });

    t.status = 'batal';
    t.batalAt = now;
    t.batalAlasan = String(x.alasan || 'Dibatalkan oleh pemilik').trim();

    if (t.meja && db.tables[t.meja] && db.tables[t.meja].trx == t.id) {
      delete db.tables[t.meja];
    }

    save();
    return send(r, 200, { ok: 1, t });
  }

  // 12. MANAJEMEN MENU & STOK (HANYA PEMILIK - KASIR TIDAK BISA MENAMBAH/MENGUBAH STOK)
  if (u === '/api/menu') {
    if (role !== 'pemilik') {
      return send(r, 403, { err: 'Penambahan stok dan menu baru hanya dapat dilakukan oleh akun Pemilik' });
    }

    if (x.op === 'add') {
      const n = String(x.n || '').trim();
      const p = +x.p || 0;
      const s = Math.max(0, +x.s || 0);
      const cat = String(x.cat || 'Minuman').trim();
      if (!n || p <= 0) throw new Error('Nama menu dan harga harus valid');
      const newMenu = { id: now, n, p, s, cat };
      db.menu.push(newMenu);
      save();
      return send(r, 200, { ok: 1, item: newMenu });
    }

    const k = db.menu.findIndex(z => z.id == x.id);
    if (k < 0) throw new Error('Menu tidak ditemukan');

    if (x.op === 'stok') {
      db.menu[k].s = Math.max(0, db.menu[k].s + (+x.d || 0));
    } else if (x.op === 'harga') {
      const p = +x.p;
      if (p <= 0) throw new Error('Harga harus lebih dari 0');
      db.menu[k].p = p;
    } else if (x.op === 'edit') {
      const n = String(x.n || '').trim();
      const p = +x.p || 0;
      if (!n || p <= 0) throw new Error('Nama menu dan harga harus valid');
      db.menu[k].n = n;
      db.menu[k].p = p;
      if (x.s != null) db.menu[k].s = Math.max(0, +x.s || 0);
      if (x.cat) db.menu[k].cat = String(x.cat).trim();
    } else if (x.op === 'hapus') {
      db.menu.splice(k, 1);
    } else {
      throw new Error('Operasi menu tidak dikenal');
    }

    save();
    return send(r, 200, { ok: 1 });
  }

  // 13. UPDATE NOW PLAYING (YOUTUBE / SPOTIFY TRACK INFO)
  if (u === '/api/now-playing') {
    if (x.title) {
      db.cfg.nowPlaying = {
        title: String(x.title || '').trim(),
        artist: String(x.artist || 'Spotify / YouTube').trim(),
        source: String(x.source || 'Spotify').trim(),
        updatedAt: now
      };
      save();
    }
    return send(r, 200, { ok: 1, nowPlaying: db.cfg.nowPlaying });
  }

  // 14. PENGATURAN TOKO (PEMILIK)
  if (u === '/api/cfg') {
    if (role !== 'pemilik') return send(r, 403, { err: 'Hanya pemilik yang dapat mengubah pengaturan' });
    const c = x.cfg || {};
    if (String(c.pinO).length < 4 || String(c.pinK).length < 4) {
      throw new Error('PIN minimal 4 angka/karakter');
    }
    db.cfg = {
      nama: 'Faat Choi',
      tarifWeekday: Math.max(0, +c.tarifWeekday || 50000),
      tarifWeekend: Math.max(0, +c.tarifWeekend || 60000),
      tarif: getTarif(now),
      meja: Math.min(30, Math.max(1, +c.meja || 6)),
      pinO: String(c.pinO).trim(),
      pinK: String(c.pinK).trim(),
      alamat: String(c.alamat || 'Jalan Sukamekar III No. 15, Bandung').trim(),
      instagram: String(c.instagram || '@faatchoimahjong').trim(),
      runningText: String(c.runningText || '').trim(),
      nowPlaying: c.nowPlaying || db.cfg.nowPlaying || { title: 'Faat Choi Lounge', artist: 'Spotify' }
    };
    save();
    return send(r, 200, { ok: 1, cfg: db.cfg, tarifInfo: getTarifInfo(now) });
  }

  // 15. RESTORE DATABASE
  if (u === '/api/restore') {
    if (role !== 'pemilik') return send(r, 403, { err: 'Hanya pemilik yang dapat memulihkan database' });
    const imported = x.data;
    if (!imported || !imported.cfg || !Array.isArray(imported.menu) || !Array.isArray(imported.trx)) {
      throw new Error('Struktur file backup tidak valid');
    }
    db = imported;
    if (!db.cfg.nama) db.cfg.nama = 'Faat Choi';
    save();
    return send(r, 200, { ok: 1, message: 'Database berhasil dipulihkan' });
  }

  // 16. WEBRTC STREAM SIGNALING (SHARE SCREEN DARI KASIR KE TV DISPLAY)
  if (u === '/api/stream/start') {
    if (!role) return send(r, 401, { err: 'Hanya kasir atau pemilik yang dapat memulai siaran layar' });
    const streamId = x.streamId || Date.now();
    streamSignal = {
      active: true,
      streamId,
      offer: x.offer || null,
      answer: null,
      cashierCandidates: x.candidates || [],
      displayCandidates: [],
      updatedAt: streamId
    };
    return send(r, 200, { ok: 1, streamSignal });
  }

  if (u === '/api/stream/answer') {
    if (streamSignal.active && x.answer) {
      streamSignal.answer = x.answer;
      if (Array.isArray(x.candidates)) {
        streamSignal.displayCandidates.push(...x.candidates);
      }
      streamSignal.updatedAt = Date.now();
    }
    return send(r, 200, { ok: 1 });
  }

  if (u === '/api/stream/candidate') {
    if (streamSignal.active && x.candidate) {
      if (x.from === 'kasir') {
        streamSignal.cashierCandidates.push(x.candidate);
      } else {
        streamSignal.displayCandidates.push(x.candidate);
      }
      streamSignal.updatedAt = Date.now();
    }
    return send(r, 200, { ok: 1 });
  }

  if (u === '/api/stream/stop') {
    streamSignal = {
      active: false,
      streamId: 0,
      offer: null,
      answer: null,
      cashierCandidates: [],
      displayCandidates: [],
      updatedAt: Date.now()
    };
    return send(r, 200, { ok: 1 });
  }

  if (u === '/api/stream/status') {
    return send(r, 200, {
      active: streamSignal.active,
      streamId: streamSignal.streamId,
      offer: streamSignal.offer,
      answer: streamSignal.answer,
      cashierCandidates: streamSignal.cashierCandidates,
      displayCandidates: streamSignal.displayCandidates,
      updatedAt: streamSignal.updatedAt
    });
  }

  send(r, 404, { err: 'Endpoint tidak ditemukan' });
}
