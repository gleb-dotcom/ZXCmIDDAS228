/**
 * ═══════════════════════════════════════════════════════════════
 * zxcMIDDAS — APPLICATION CONTROLLER v2.0
 * ═══════════════════════════════════════════════════════════════
 *
 *  Architecture:
 *   1. Data layer (defaults, state, LocalStorage persistence)
 *   2. Web Audio atmosphere engine (rain noise + sub-drone)
 *   3. UI renderer (product grid, cart, modals, admin panels)
 *   4. RBAC controller (customer vs admin)
 */

// ============================================================
//  §1  DEFAULT CATALOG — MONOCHROME ALT/GRUNGE/OPIUM DARKWEAR
// ============================================================

const DEFAULT_CATEGORIES = [
  'ВСЕ ВЕЩИ',
  'ХУДИ & СВИТЕРА',
  'ШТАНЫ & КАРГО',
  'ВЕРХНЯЯ ОДЕЖДА',
  'ФУТБОЛКИ & ЛОНГИ',
  'ЦЕПИ & АКСЕССУАРЫ',
  'ОБУВЬ',
];

const DEFAULT_PRODUCTS = [
  {
    id: 'p1',
    title: 'OVERSIZED HOODIE «VOID WHISPER»',
    category: 'ХУДИ & СВИТЕРА',
    price: 6400,
    badge: 'NEW DROP',
    sizes: ['OVERSZ', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    desc: 'Тяжелый 480 GSM футер с эффектом acid-wash. Необработанные рваные края, оверсайз капюшон, скрытые карманы кенгуру, монохромная графика на спине — абстрактная паутина. Двойная строчка усиленными нитками.'
  },
  {
    id: 'p2',
    title: 'DISTRESSED CARGO «GRAVE»',
    category: 'ШТАНЫ & КАРГО',
    price: 7200,
    badge: 'EXCLUSIVE',
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
    desc: 'Широкие карго с 8 карманами, D-кольцами для карабинов и стропами. 100% плотный хлопок 380 GSM с глубоким состариванием и потертостями на коленях.'
  },
  {
    id: 'p3',
    title: 'COBWEB MOHAIR KNIT «TOMB»',
    category: 'ХУДИ & СВИТЕРА',
    price: 5800,
    badge: 'LIMITED',
    sizes: ['OVERSZ', 'S', 'L'],
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80',
    desc: 'Рваный паутинный свитер из мохера ручной вязки. Прозрачная фактура, спущенные петли, готический гранж-силуэт. Чёрно-серый меланж.'
  },
  {
    id: 'p4',
    title: 'ASYMMETRIC TRENCH «ECLIPSE»',
    category: 'ВЕРХНЯЯ ОДЕЖДА',
    price: 11900,
    badge: 'ARCHIVE',
    sizes: ['M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
    desc: 'Удлинённый мантиеподобный плащ из влагостойкой мембраны с диагональной молнией YKK, высоким глухим воротом и фурнитурой из чернёной стали.'
  },
  {
    id: 'p5',
    title: 'COMBAT BOOTS «TITAN 01»',
    category: 'ОБУВЬ',
    price: 13500,
    badge: 'RESTOCK',
    sizes: ['39', '40', '41', '42', '43', '44'],
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
    desc: 'Массивные берцы на тракторной 8-см платформе. Натуральная матовая кожа, двойная шнуровка, стальной носок. Боковая молния для быстрого снятия.'
  },
  {
    id: 'p6',
    title: 'WASHED TEE «CULTPRINT»',
    category: 'ФУТБОЛКИ & ЛОНГИ',
    price: 3600,
    badge: 'BESTSELLER',
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
    desc: 'Плотная хлопковая футболка 280 GSM свободного кроя. Stone-wash ручной обработки, монохромный вытравной принт, швы наружу.'
  },
  {
    id: 'p7',
    title: 'SPIKED CHOKER «FANGS»',
    category: 'ЦЕПИ & АКСЕССУАРЫ',
    price: 2100,
    badge: 'HOT',
    sizes: ['ONE SIZE'],
    image: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=800&q=80',
    desc: 'Натуральная кожа 3 мм, шипы из хромированной стали 3.5 см, надёжная пряжка с регулировкой обхвата 30-42 см.'
  },
  {
    id: 'p8',
    title: 'CHAIN BELT «RITUAL»',
    category: 'ЦЕПИ & АКСЕССУАРЫ',
    price: 2800,
    badge: 'STAPLE',
    sizes: ['ONE SIZE'],
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
    desc: 'Многослойный ремень из стали с карабинами морского типа, подвесными кольцами и массивными замками. На талии или бёдрах.'
  },
  {
    id: 'p9',
    title: 'BALACLAVA «PHANTOM»',
    category: 'ЦЕПИ & АКСЕССУАРЫ',
    price: 1900,
    badge: 'LIMITED',
    sizes: ['ONE SIZE'],
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    desc: 'Вязаная маска-балаклава с искусственными прорезями и необработанными нитями. Трансформируется в шапку-бини.'
  },
  {
    id: 'p10',
    title: 'LONGSLEEVE «CONCRETE PSALM»',
    category: 'ФУТБОЛКИ & ЛОНГИ',
    price: 4100,
    badge: 'NEW DROP',
    sizes: ['S', 'M', 'L', 'XL', 'OVERSZ'],
    image: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=800&q=80',
    desc: 'Лонгслив из плотного хлопка 320 GSM с удлинёнными рукавами и thumbhole. Графика «крест и бетон» по рукавам и спине. Обработка pigment-dye.'
  },
  {
    id: 'p11',
    title: 'BOMBER JACKET «WRAITH»',
    category: 'ВЕРХНЯЯ ОДЕЖДА',
    price: 9800,
    badge: 'EXCLUSIVE',
    sizes: ['M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    desc: 'Бомбер-оверкоут из вощёного хлопка с утеплителем Thinsulate. Глухие чернёные молнии, вышивка-крест на спине, рукава на кнопках. Подкладка — чёрный сатин.'
  },
  {
    id: 'p12',
    title: 'TACTICAL VEST «HOLLOW»',
    category: 'ВЕРХНЯЯ ОДЕЖДА',
    price: 5200,
    badge: 'HOT',
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80',
    desc: 'Тактический жилет с 6 карманами утилитарного кроя, регулируемыми стропами по бокам, MOLLE-совместимость. Ткань — плотный нейлон 600D, фурнитура Duraflex.'
  },
];

const PRESET_IMAGES = [
  { label: 'Hoodie / Верх',      url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80' },
  { label: 'Cargo / Штаны',      url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80' },
  { label: 'Knit / Свитер',      url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80' },
  { label: 'Trench / Плащ',      url: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80' },
  { label: 'Boots / Обувь',      url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80' },
  { label: 'Chains / Аксессуары', url: 'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?auto=format&fit=crop&w=800&q=80' },
  { label: 'Tee / Футболка',     url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Bomber / Куртка',    url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80' },
];

// ============================================================
//  §2  DEFAULT USERS & AUTH DATABASE
// ============================================================

const DEFAULT_USERS = [
  {
    id: 'u_admin',
    username: 'avice',
    email: 'avice@zxcmiddas.store',
    password: '666',
    role: 'admin',
    registeredAt: '01.01.2026',
    avatar: '⛧',
    orders: [],
    cart: []
  },
  {
    id: 'u_customer',
    username: 'GOTH_ANGEL',
    email: 'angel@void.cult',
    password: '123',
    role: 'customer',
    registeredAt: '14.02.2026',
    avatar: '💀',
    orders: [
      {
        id: 'VOID-782910',
        date: '12.03.2026 18:40',
        items: [{ title: 'OVERSIZED HOODIE «VOID WHISPER»', size: 'OVERSZ', price: 6400, qty: 1 }],
        total: 6400,
        status: 'ДОСТАВЛЕНО // ARCHIVE'
      }
    ],
    cart: []
  }
];

// ============================================================
//  §3  STATE MANAGER — PERSISTENT VIA LOCALSTORAGE
// ============================================================

class Store {
  constructor() {
    this.users          = JSON.parse(localStorage.getItem('v_users')) || [...DEFAULT_USERS];

    // Ensure 'avice' is always present and updated as admin with password '666'
    let adminUser = this.users.find(u => u.username.toLowerCase() === 'avice' || u.id === 'u_admin' || u.username.toLowerCase() === 'admin');
    if (adminUser) {
      adminUser.username = 'avice';
      adminUser.email = adminUser.email || 'avice@zxcmiddas.store';
      adminUser.password = '666';
      adminUser.role = 'admin';
    } else {
      this.users.unshift({
        id: 'u_admin',
        username: 'avice',
        email: 'avice@zxcmiddas.store',
        password: '666',
        role: 'admin',
        registeredAt: '01.01.2026',
        avatar: '⛧',
        orders: [],
        cart: []
      });
    }

    this.currentUser    = JSON.parse(localStorage.getItem('v_current_user')) || null;
    if (this.currentUser && (this.currentUser.id === 'u_admin' || this.currentUser.username.toLowerCase() === 'admin' || this.currentUser.username.toLowerCase() === 'avice')) {
      this.currentUser.username = 'avice';
      this.currentUser.password = '666';
      this.currentUser.role = 'admin';
    }

    this.role           = this.currentUser ? this.currentUser.role : (localStorage.getItem('v_role') || 'customer');
    this.categories     = JSON.parse(localStorage.getItem('v_cats'))  || [...DEFAULT_CATEGORIES];
    this.products       = JSON.parse(localStorage.getItem('v_prods')) || [...DEFAULT_PRODUCTS];
    this.cart           = this._loadCurrentCart();
    this.activeCategory = 'ВСЕ ВЕЩИ';
    this.searchQuery    = '';
    this.sortBy         = 'default';
    this.discount       = 0;
    this.promoCode      = '';
  }

  _loadCurrentCart() {
    if (this.currentUser) {
      const u = this.users.find(x => x.id === this.currentUser.id);
      if (u && Array.isArray(u.cart)) {
        return u.cart;
      }
      const savedUserCart = JSON.parse(localStorage.getItem('v_cart_user_' + this.currentUser.id));
      if (Array.isArray(savedUserCart)) return savedUserCart;
      return [];
    }
    return JSON.parse(localStorage.getItem('v_cart_guest')) || [];
  }

  _save() {
    localStorage.setItem('v_role',  this.role);
    localStorage.setItem('v_current_user', JSON.stringify(this.currentUser));
    localStorage.setItem('v_cats',  JSON.stringify(this.categories));
    localStorage.setItem('v_prods', JSON.stringify(this.products));

    // Save cart strictly to current user or guest
    if (this.currentUser) {
      this.currentUser.cart = this.cart;
      const idx = this.users.findIndex(u => u.id === this.currentUser.id);
      if (idx !== -1) {
        this.users[idx].cart = this.cart;
      }
      localStorage.setItem('v_users', JSON.stringify(this.users));
      localStorage.setItem('v_cart_user_' + this.currentUser.id, JSON.stringify(this.cart));
    } else {
      localStorage.setItem('v_users', JSON.stringify(this.users));
      localStorage.setItem('v_cart_guest', JSON.stringify(this.cart));
    }
    localStorage.removeItem('v_cart');
  }
  _emit(name) { window.dispatchEvent(new CustomEvent(name)); }

  // ── Authentication & Users ──
  register(username, email, password, adminKey = '') {
    const uTrim = username.trim();
    const eTrim = email.trim().toLowerCase();
    if (!uTrim || !eTrim || !password) return { ok: false, msg: 'Заполните все обязательные поля!' };

    const exist = this.users.find(u => u.username.toLowerCase() === uTrim.toLowerCase() || u.email.toLowerCase() === eTrim);
    if (exist) return { ok: false, msg: 'Пользователь с таким ником или email уже существует!' };

    const isAdmin = ['nefor', '666', 'void666'].includes(adminKey.trim().toLowerCase());
    const newUser = {
      id: 'u_' + Date.now(),
      username: uTrim,
      email: eTrim,
      password: password,
      role: isAdmin ? 'admin' : 'customer',
      registeredAt: new Date().toLocaleDateString('ru-RU'),
      avatar: isAdmin ? '⛧' : '💀',
      orders: [],
      cart: []
    };

    this.users.push(newUser);
    this.currentUser = newUser;
    this.role = newUser.role;
    this.cart = [];
    this.discount = 0;
    this.promoCode = '';
    this._save();
    this._emit('v:auth');
    this._emit('v:role');
    this._emit('v:cart');
    return { ok: true, user: newUser };
  }

  login(identifier, password) {
    const idClean = identifier.trim().toLowerCase();
    const passClean = password.trim();

    const user = this.users.find(u =>
      (u.username.toLowerCase() === idClean || u.email.toLowerCase() === idClean) &&
      (u.password === passClean || (idClean === 'avice' && passClean === '666') || (u.role === 'admin' && (passClean === '666' || passClean === 'nefor')))
    );

    if (user) {
      this.currentUser = user;
      this.role = user.role;
      // Load ONLY this user's cart
      this.cart = this._loadCurrentCart();
      this.discount = 0;
      this.promoCode = '';
      this._save();
      this._emit('v:auth');
      this._emit('v:role');
      this._emit('v:cart');
      return { ok: true, user };
    }
    return { ok: false, msg: 'Неверный логин или пароль! (Подсказка: "avice" / "666")' };
  }

  logout() {
    // Save current user's cart before logging out
    if (this.currentUser) {
      this.currentUser.cart = this.cart;
      const idx = this.users.findIndex(u => u.id === this.currentUser.id);
      if (idx !== -1) this.users[idx].cart = this.cart;
      localStorage.setItem('v_cart_user_' + this.currentUser.id, JSON.stringify(this.cart));
    }
    this.currentUser = null;
    this.role = 'customer';
    // Switch to isolated guest cart
    this.cart = JSON.parse(localStorage.getItem('v_cart_guest')) || [];
    this.discount = 0;
    this.promoCode = '';
    this._save();
    this._emit('v:auth');
    this._emit('v:role');
    this._emit('v:cart');
  }

  addOrder(order) {
    if (this.currentUser) {
      if (!this.currentUser.orders) this.currentUser.orders = [];
      this.currentUser.orders.unshift(order);
      const idx = this.users.findIndex(u => u.id === this.currentUser.id);
      if (idx !== -1) {
        this.users[idx].orders = this.currentUser.orders;
      }
      this._save();
      this._emit('v:auth');
    }
  }

  // ── Role ──
  setRole(r) { this.role = r; this._save(); this._emit('v:role'); }

  // ── Catalog ──
  resetDefaults() {
    this.categories = [...DEFAULT_CATEGORIES];
    this.products   = [...DEFAULT_PRODUCTS];
    this._save(); this._emit('v:data');
  }
  addProduct(p)     { this.products.unshift(p); this._save(); this._emit('v:data'); }
  updateProduct(id, fields) {
    const i = this.products.findIndex(p => p.id === id);
    if (i >= 0) { this.products[i] = { ...this.products[i], ...fields }; this._save(); this._emit('v:data'); }
  }
  deleteProduct(id) {
    this.products = this.products.filter(p => p.id !== id);
    this.cart = this.cart.filter(c => c.pid !== id);
    this.users.forEach(u => {
      if (Array.isArray(u.cart)) {
        u.cart = u.cart.filter(c => c.pid !== id);
        localStorage.setItem('v_cart_user_' + u.id, JSON.stringify(u.cart));
      }
    });
    const guestCart = JSON.parse(localStorage.getItem('v_cart_guest')) || [];
    localStorage.setItem('v_cart_guest', JSON.stringify(guestCart.filter(c => c.pid !== id)));
    this._save();
    this._emit('v:data');
    this._emit('v:cart');
  }
  addCategory(name) {
    const n = name.trim().toUpperCase();
    if (!n || this.categories.includes(n)) return false;
    this.categories.push(n); this._save(); this._emit('v:data'); return true;
  }
  deleteCategory(name) {
    if (name === 'ВСЕ ВЕЩИ') return false;
    this.categories = this.categories.filter(c => c !== name);
    if (this.activeCategory === name) this.activeCategory = 'ВСЕ ВЕЩИ';
    this._save(); this._emit('v:data'); return true;
  }

  // ── Cart ──
  addToCart(pid, size, qty = 1) {
    const idx = this.cart.findIndex(c => c.pid === pid && c.size === size);
    if (idx >= 0) this.cart[idx].qty += qty;
    else this.cart.push({ pid, size, qty });
    this._save(); this._emit('v:cart');
  }
  updateQty(pid, size, delta) {
    const item = this.cart.find(c => c.pid === pid && c.size === size);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) this.removeFromCart(pid, size);
    else { this._save(); this._emit('v:cart'); }
  }
  removeFromCart(pid, size) {
    this.cart = this.cart.filter(c => !(c.pid === pid && c.size === size));
    this._save(); this._emit('v:cart');
  }
  clearCart() {
    this.cart = []; this.discount = 0; this.promoCode = '';
    this._save(); this._emit('v:cart');
  }
  applyPromo(code) {
    const c = code.trim().toUpperCase();
    if (c === 'OPIUM' || c === 'NEFOR')       { this.discount = 15; this.promoCode = c; this._emit('v:cart'); return { ok: true, msg: 'ПРОМОКОД АКТИВИРОВАН: −15%' }; }
    if (c === 'VOID' || c === '666')           { this.discount = 25; this.promoCode = c; this._emit('v:cart'); return { ok: true, msg: 'РИТУАЛЬНАЯ СКИДКА: −25%' }; }
    if (c === 'GRUNGE' || c === 'DARKWEAR')    { this.discount = 10; this.promoCode = c; this._emit('v:cart'); return { ok: true, msg: 'АНДЕГРАУНД-СКИДКА: −10%' }; }
    return { ok: false, msg: '// НЕВЕРНЫЙ КОД ИЛИ ЗАКЛЯТИЕ' };
  }

  // ── Queries ──
  filtered() {
    return this.products.filter(p => {
      const catOk = this.activeCategory === 'ВСЕ ВЕЩИ' || p.category === this.activeCategory;
      const q = this.searchQuery.toLowerCase().trim();
      const searchOk = !q || p.title.toLowerCase().includes(q)
        || (p.desc && p.desc.toLowerCase().includes(q))
        || (p.badge && p.badge.toLowerCase().includes(q));
      return catOk && searchOk;
    }).sort((a, b) => {
      if (this.sortBy === 'price-asc')  return a.price - b.price;
      if (this.sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }
  cartTotals() {
    let sub = 0;
    this.cart.forEach(c => { const p = this.products.find(x => x.id === c.pid); if (p) sub += p.price * c.qty; });
    const disc = Math.round(sub * this.discount / 100);
    return { sub, disc, total: Math.max(0, sub - disc), count: this.cart.reduce((s, c) => s + c.qty, 0) };
  }
}

const S = new Store();

// ============================================================
//  §3  WEB AUDIO ATMOSPHERE ENGINE
// ============================================================

class Atmosphere {
  constructor() { this.ctx = null; this.playing = false; this._nodes = []; }

  _ensure() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
  }

  toggle() {
    this._ensure();
    if (this.ctx.state === 'suspended') this.ctx.resume();
    if (this.playing) { this.stop(); return false; }
    this.start(); return true;
  }

  start() {
    if (!this.ctx) return;

    // ── Pink noise (rain) ──
    const sr = this.ctx.sampleRate;
    const buf = this.ctx.createBuffer(1, sr * 2, sr);
    const d = buf.getChannelData(0);
    let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0;
    for (let i = 0; i < d.length; i++) {
      const w = Math.random()*2-1;
      b0=0.99886*b0+w*0.0555179; b1=0.99332*b1+w*0.0750759;
      b2=0.96900*b2+w*0.1538520; b3=0.86650*b3+w*0.3104856;
      b4=0.55000*b4+w*0.5329522; b5=-0.7616*b5-w*0.0168980;
      d[i]=(b0+b1+b2+b3+b4+b5+b6+w*0.5362)*0.038;
      b6=w*0.115926;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buf; noise.loop = true;

    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 750;

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.value = 0.16;

    noise.connect(lp); lp.connect(noiseGain);

    // ── Sub-bass drone (A1 = 55 Hz) ──
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth'; osc.frequency.value = 55;

    const droneLp = this.ctx.createBiquadFilter();
    droneLp.type = 'lowpass'; droneLp.frequency.value = 100;

    const droneGain = this.ctx.createGain();
    droneGain.gain.value = 0.016;

    osc.connect(droneLp); droneLp.connect(droneGain);

    // ── Master ──
    const master = this.ctx.createGain();
    master.gain.value = 1;
    noiseGain.connect(master);
    droneGain.connect(master);
    master.connect(this.ctx.destination);

    noise.start(); osc.start();
    this._nodes = [noise, osc, master];
    this.playing = true;
  }

  stop() {
    this._nodes.forEach(n => { try { n.stop?.(); n.disconnect?.(); } catch(e){} });
    this._nodes = [];
    this.playing = false;
  }

  click() {
    try {
      this._ensure();
      if (this.ctx.state === 'suspended') return;
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.frequency.setValueAtTime(180, this.ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.035);
      g.gain.setValueAtTime(0.04, this.ctx.currentTime);
      g.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.035);
      o.connect(g); g.connect(this.ctx.destination);
      o.start(); o.stop(this.ctx.currentTime + 0.04);
    } catch(e) {}
  }
}

const atmo = new Atmosphere();

// ============================================================
//  §4  UTILITY HELPERS
// ============================================================

const fmt = n => n.toLocaleString('ru-RU') + ' ₽';

function toast(msg, accent = false) {
  const box = document.getElementById('toast-container');
  if (!box) return;
  const el = document.createElement('div');
  el.className = `px-4 py-2.5 border font-mono text-[11px] tracking-wider uppercase flex items-center gap-2.5 shadow-2xl transition-all duration-300 transform translate-y-3 opacity-0 ${
    accent ? 'bg-white text-black border-white' : 'bg-black text-white border-zinc-700'
  }`;
  el.innerHTML = `<span class="inline-block w-1.5 h-1.5 ${accent ? 'bg-black' : 'bg-white'}"></span>${msg}`;
  box.appendChild(el);
  requestAnimationFrame(() => el.classList.remove('translate-y-3', 'opacity-0'));
  setTimeout(() => { el.classList.add('opacity-0', 'translate-y-3'); setTimeout(() => el.remove(), 300); }, 2800);
}

// ============================================================
//  §5  UI RENDERING
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // Rain
  const rain = new MonochromeRain('rain-canvas');

  // Periodic lightning in storm mode
  setInterval(() => {
    if (S.products.length > 0 && Math.random() < 0.08) rain.triggerFlash();
  }, 4000);

  // ── Atmosphere controls ──
  const rainSel = document.getElementById('rain-level');
  if (rainSel) rainSel.addEventListener('change', e => rain.setIntensity(e.target.value));

  const btnFlash = document.getElementById('btn-lightning');
  if (btnFlash) btnFlash.addEventListener('click', () => { rain.triggerFlash(); atmo.click(); });

  const btnSound = document.getElementById('btn-sound');
  if (btnSound) btnSound.addEventListener('click', () => {
    const on = atmo.toggle();
    btnSound.querySelector('.sound-label').textContent = on ? '[ ON ]' : '[ OFF ]';
  });

  // ── Search, sort ──
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.addEventListener('input', e => { S.searchQuery = e.target.value; renderGrid(); });

  const sortSel = document.getElementById('sort-select');
  if (sortSel) sortSel.addEventListener('change', e => { S.sortBy = e.target.value; renderGrid(); });

  // ── Cart drawer ──
  const cartDrawer   = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const openCart = open => {
    if (open) { cartDrawer.classList.add('open'); cartBackdrop.classList.remove('hidden'); }
    else      { cartDrawer.classList.remove('open'); cartBackdrop.classList.add('hidden'); }
  };
  document.getElementById('btn-open-cart')?.addEventListener('click', () => openCart(true));
  document.getElementById('btn-close-cart')?.addEventListener('click', () => openCart(false));
  cartBackdrop?.addEventListener('click', () => openCart(false));

  // ── State event listeners ──
  window.addEventListener('v:role', renderAll);
  window.addEventListener('v:auth', renderAll);
  window.addEventListener('v:data', () => { renderTabs(); renderGrid(); renderCartDrawer(); });
  window.addEventListener('v:cart', () => { updateCartBadge(); renderCartDrawer(); });

  // ── Bootstrap modals ──
  setupAuthModals();
  setupProductEditor();
  setupCategoryManager();
  setupCheckout();

  // ── Initial render ──
  renderAll();
  lucide.createIcons();
});

function renderAll() {
  renderRoleBanner();
  renderTabs();
  renderGrid();
  updateCartBadge();
  renderCartDrawer();
  lucide.createIcons();
}

// ── Role banner & admin toolbar visibility ──
function renderRoleBanner() {
  const banner  = document.getElementById('admin-banner');
  const toolbar = document.getElementById('admin-toolbar');
  const authBtn = document.getElementById('btn-auth');

  const isAdmin = S.role === 'admin';
  banner?.classList.toggle('hidden', !isAdmin);
  toolbar?.classList.toggle('hidden', !isAdmin);

  if (authBtn) {
    if (!S.currentUser) {
      authBtn.innerHTML = `<i data-lucide="user" class="w-3.5 h-3.5"></i> <span class="hidden sm:inline">ВОЙТИ</span>`;
      authBtn.className = 'btn-v btn-v-ghost text-[10px] py-1.5 px-2.5 sm:px-3 flex items-center gap-1.5';
    } else {
      if (isAdmin) {
        authBtn.innerHTML = `<span class="w-2 h-2 rounded-full bg-red-500 pulse-admin"></span> <span class="font-bold text-red-200">${S.currentUser.username}</span> <span class="tag-v text-[8px] ml-1 bg-red-950/80 text-red-300 border-red-800">ADMIN</span>`;
        authBtn.className = 'btn-v text-[10px] py-1.5 px-2.5 sm:px-3 flex items-center gap-1.5 border-red-900/60 bg-red-950/20';
      } else {
        authBtn.innerHTML = `<span class="w-2 h-2 rounded-full bg-zinc-300"></span> <span class="font-bold text-white">${S.currentUser.username}</span>`;
        authBtn.className = 'btn-v btn-v-ghost text-[10px] py-1.5 px-2.5 sm:px-3 flex items-center gap-1.5 border-zinc-700';
      }
    }
  }
}

// ── Category Tabs ──
function renderTabs() {
  const box = document.getElementById('category-tabs');
  if (!box) return;
  box.innerHTML = S.categories.map(cat => {
    const active = S.activeCategory === cat;
    return `<button onclick="pickCat('${cat}')" class="whitespace-nowrap text-[11px] font-mono uppercase px-3 py-1.5 border transition-all ${
      active ? 'bg-white text-black border-white font-bold' : 'bg-black/50 text-zinc-400 border-zinc-800 hover:border-zinc-500 hover:text-white'
    }">${cat}</button>`;
  }).join('');
}
window.pickCat = function(c) { S.activeCategory = c; renderTabs(); renderGrid(); atmo.click(); };

// ── Product Grid ──
function renderGrid() {
  const grid  = document.getElementById('product-grid');
  const count = document.getElementById('count-badge');
  if (!grid) return;

  const items = S.filtered();
  if (count) count.textContent = `[ ${items.length} ]`;

  if (!items.length) {
    grid.innerHTML = `<div class="col-span-full py-24 text-center border border-zinc-800 bg-zinc-950/40">
      <p class="font-mono text-zinc-500 tracking-wider text-xs">// ПУСТОТА. НИЧЕГО НЕ НАЙДЕНО.</p>
      <button onclick="resetFilters()" class="btn-v mt-4 text-[11px]">СБРОСИТЬ ФИЛЬТРЫ</button>
    </div>`;
    return;
  }

  const admin = S.role === 'admin';
  grid.innerHTML = items.map(p => `
    <div class="card-v brackets flex flex-col group" data-id="${p.id}">
      <div class="relative overflow-hidden aspect-[4/5] bg-zinc-900 cursor-pointer" onclick="viewProduct('${p.id}')">
        <img src="${p.image}" alt="${p.title}" loading="lazy"
             class="img-v w-full h-full object-cover"
             onerror="this.src='${PRESET_IMAGES[0].url}'" />
        <div class="absolute top-2 left-2 flex gap-1">
          ${p.badge ? `<span class="tag-v ${p.badge==='NEW DROP'?'accent':''}">${p.badge}</span>` : ''}
        </div>
        <span class="tag-v absolute bottom-2 right-2 text-[9px] bg-black/85">${p.category}</span>
      </div>
      <div class="p-4 flex-1 flex flex-col justify-between border-t border-zinc-800/70">
        <div>
          <h3 class="font-mono text-[13px] tracking-wide text-zinc-100 uppercase group-hover:text-white transition-colors cursor-pointer leading-tight"
              onclick="viewProduct('${p.id}')">${p.title}</h3>
          <p class="text-[11px] text-zinc-500 line-clamp-2 mt-1.5 font-light leading-relaxed">${p.desc || ''}</p>
        </div>
        <div class="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between">
          <span class="font-mono text-[15px] font-bold text-white">${fmt(p.price)}</span>
          <div class="flex items-center gap-1">
            ${admin ? `
              <button onclick="editProduct('${p.id}')" class="p-1.5 border border-zinc-700 bg-zinc-900 hover:bg-white hover:text-black text-zinc-400 text-[10px] font-mono transition-colors">РЕД.</button>
              <button onclick="delProduct('${p.id}')" class="p-1.5 border border-red-900/50 bg-red-950/30 hover:bg-red-700 text-red-400 hover:text-white text-[10px] font-mono transition-colors">✕</button>
            ` : `
              <button onclick="quickAdd('${p.id}')" class="btn-v text-[10px] py-1.5 px-2.5">В КОРЗИНУ +</button>
            `}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

window.resetFilters = () => {
  S.activeCategory = 'ВСЕ ВЕЩИ'; S.searchQuery = '';
  const inp = document.getElementById('search-input'); if (inp) inp.value = '';
  renderTabs(); renderGrid();
};

window.quickAdd = pid => {
  const p = S.products.find(x => x.id === pid);
  if (!p) return;
  S.addToCart(pid, p.sizes?.[0] || 'OVERSZ');
  atmo.click();
  toast(`ДОБАВЛЕНО: ${p.title}`, true);
};

// ── Cart Badge ──
function updateCartBadge() {
  const { count } = S.cartTotals();
  document.querySelectorAll('.cart-badge').forEach(b => b.textContent = count);
}

// ── Cart Drawer ──
function renderCartDrawer() {
  const list      = document.getElementById('cart-list');
  const subEl     = document.getElementById('cart-sub');
  const discRow   = document.getElementById('cart-disc-row');
  const discEl    = document.getElementById('cart-disc');
  const totalEl   = document.getElementById('cart-total');
  const chkBtn    = document.getElementById('btn-checkout');
  const userLabel = document.getElementById('cart-user-label');
  if (!list) return;

  if (userLabel) {
    userLabel.textContent = S.currentUser ? `[ ${S.currentUser.username} ]` : `[ ГОСТЬ ]`;
  }

  const { sub, disc, total, count } = S.cartTotals();

  if (!count) {
    list.innerHTML = `<div class="py-20 text-center"><p class="font-mono text-zinc-600 text-[11px] tracking-widest uppercase">// КОРЗИНА ПУСТА</p></div>`;
    if (chkBtn) chkBtn.disabled = true;
  } else {
    list.innerHTML = S.cart.map(c => {
      const p = S.products.find(x => x.id === c.pid);
      if (!p) return '';
      return `
        <div class="flex gap-3 p-3 border border-zinc-800 bg-zinc-950/60 relative group/item">
          <img src="${p.image}" class="w-14 h-[72px] object-cover border border-zinc-800 img-v" />
          <div class="flex-1 flex flex-col justify-between pr-5">
            <div>
              <h4 class="font-mono text-[11px] uppercase text-zinc-200 line-clamp-1">${p.title}</h4>
              <p class="text-[10px] font-mono text-zinc-500 mt-0.5">РАЗМЕР: <span class="text-white">${c.size}</span></p>
            </div>
            <div class="flex items-center justify-between mt-1.5 pt-1.5 border-t border-zinc-900">
              <div class="flex items-center border border-zinc-800">
                <button onclick="S.updateQty('${c.pid}','${c.size}',-1);atmo.click()" class="w-5 h-5 flex items-center justify-center text-[10px] font-mono text-zinc-400 hover:text-white hover:bg-zinc-800">−</button>
                <span class="w-6 text-center text-[10px] font-mono text-white">${c.qty}</span>
                <button onclick="S.updateQty('${c.pid}','${c.size}',1);atmo.click()" class="w-5 h-5 flex items-center justify-center text-[10px] font-mono text-zinc-400 hover:text-white hover:bg-zinc-800">+</button>
              </div>
              <span class="text-[11px] font-mono font-bold text-white">${fmt(p.price * c.qty)}</span>
            </div>
          </div>
          <button onclick="S.removeFromCart('${c.pid}','${c.size}');atmo.click();toast('УДАЛЕНО')" class="absolute top-2 right-2 text-zinc-600 hover:text-white text-[10px] font-mono">✕</button>
        </div>`;
    }).join('');
    if (chkBtn) chkBtn.disabled = false;
  }

  if (subEl) subEl.textContent = fmt(sub);
  if (totalEl) totalEl.textContent = fmt(total);
  if (discRow && discEl) {
    if (disc > 0) { discRow.classList.remove('hidden'); discEl.textContent = `−${fmt(disc)} (${S.discount}%)`; }
    else discRow.classList.add('hidden');
  }
}

window.applyPromo = () => {
  const inp = document.getElementById('promo-input');
  if (!inp) return;
  const res = S.applyPromo(inp.value);
  toast(res.msg, res.ok);
  if (res.ok) inp.value = '';
};

// ============================================================
//  §6  PRODUCT QUICK-VIEW MODAL
// ============================================================

window.viewProduct = pid => {
  const p = S.products.find(x => x.id === pid);
  if (!p) return;
  const modal = document.getElementById('modal-product');
  const body  = document.getElementById('modal-product-body');
  if (!modal || !body) return;

  let sel = p.sizes?.[0] || 'OVERSZ';
  window._modalSize = sel;

  body.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="relative bg-zinc-950 aspect-[4/5] overflow-hidden border border-zinc-800">
        <img src="${p.image}" class="img-v w-full h-full object-cover" />
        ${p.badge ? `<span class="tag-v accent absolute top-3 left-3">${p.badge}</span>` : ''}
      </div>
      <div class="flex flex-col justify-between py-1">
        <div>
          <span class="tag-v text-[9px]">${p.category}</span>
          <h2 class="font-mono text-lg tracking-wider text-white uppercase mt-2 leading-snug">${p.title}</h2>
          <div class="font-mono text-2xl font-bold text-white mt-3">${fmt(p.price)}</div>
          <div class="my-5 border-t border-b border-zinc-900 py-4">
            <h4 class="font-mono text-[10px] uppercase text-zinc-400 mb-1.5">ОПИСАНИЕ И КРОЙ:</h4>
            <p class="text-[12px] text-zinc-300 leading-relaxed font-light">${p.desc || '—'}</p>
          </div>
          <div class="mb-5">
            <h4 class="font-mono text-[10px] uppercase text-zinc-400 mb-2">ВЫБЕРИТЕ РАЗМЕР:</h4>
            <div class="flex flex-wrap gap-1.5" id="modal-sizes">
              ${(p.sizes||['OVERSZ']).map(s => `
                <button onclick="pickSize('${s}',this)" class="sz-pill border px-2.5 py-1 font-mono text-[11px] uppercase transition-colors ${
                  s===sel ? 'bg-white text-black border-white font-bold' : 'bg-black text-zinc-300 border-zinc-700 hover:border-zinc-400'
                }">${s}</button>`).join('')}
            </div>
          </div>
        </div>
        <div>
          <button onclick="addFromModal('${p.id}')" class="btn-v btn-v-solid w-full py-3 text-[11px]">
            ДОБАВИТЬ В КОРЗИНУ [ ${fmt(p.price)} ]
          </button>
          <p class="text-[9px] font-mono text-zinc-600 text-center uppercase tracking-widest mt-2.5">
            // БЕСПЛАТНАЯ ДОСТАВКА ОТ 15 000 ₽
          </p>
        </div>
      </div>
    </div>`;

  modal.classList.remove('hidden');
};

window.pickSize = (s, btn) => {
  window._modalSize = s;
  document.querySelectorAll('#modal-sizes .sz-pill').forEach(el =>
    el.className = 'sz-pill border px-2.5 py-1 font-mono text-[11px] uppercase transition-colors bg-black text-zinc-300 border-zinc-700 hover:border-zinc-400');
  btn.className = 'sz-pill border px-2.5 py-1 font-mono text-[11px] uppercase transition-colors bg-white text-black border-white font-bold';
  atmo.click();
};

window.addFromModal = pid => {
  S.addToCart(pid, window._modalSize || 'OVERSZ');
  document.getElementById('modal-product')?.classList.add('hidden');
  toast(`ДОБАВЛЕНО (${window._modalSize})`, true);
  atmo.click();
};

window.closeModal = id => document.getElementById(id)?.classList.add('hidden');

// ============================================================
//  §7  AUTH MODALS & USER PROFILE (LOGIN / REGISTER)
// ============================================================

function setupAuthModals() {
  const modalAuth = document.getElementById('modal-auth');
  const modalProfile = document.getElementById('modal-profile');
  const btnAuth = document.getElementById('btn-auth');
  const closeAuth = document.getElementById('close-auth');
  const closeProfile = document.getElementById('close-profile');

  const tabLogin = document.getElementById('tab-login');
  const tabReg = document.getElementById('tab-register');
  const viewLogin = document.getElementById('auth-login-view');
  const viewReg = document.getElementById('auth-register-view');

  // Tab switching
  tabLogin?.addEventListener('click', () => {
    viewLogin?.classList.remove('hidden');
    viewReg?.classList.add('hidden');
    tabLogin.className = 'flex-1 py-2 text-xs uppercase font-bold tracking-wider border-b-2 border-white text-white transition-colors';
    tabReg.className = 'flex-1 py-2 text-xs uppercase tracking-wider border-b-2 border-transparent text-zinc-500 hover:text-zinc-300 transition-colors';
  });

  tabReg?.addEventListener('click', () => {
    viewReg?.classList.remove('hidden');
    viewLogin?.classList.add('hidden');
    tabReg.className = 'flex-1 py-2 text-xs uppercase font-bold tracking-wider border-b-2 border-white text-white transition-colors';
    tabLogin.className = 'flex-1 py-2 text-xs uppercase tracking-wider border-b-2 border-transparent text-zinc-500 hover:text-zinc-300 transition-colors';
  });

  // Open appropriate modal on btnAuth click
  btnAuth?.addEventListener('click', () => {
    if (!S.currentUser) {
      modalAuth?.classList.remove('hidden');
    } else {
      renderProfileModal();
      modalProfile?.classList.remove('hidden');
    }
  });

  closeAuth?.addEventListener('click', () => modalAuth?.classList.add('hidden'));
  closeProfile?.addEventListener('click', () => modalProfile?.classList.add('hidden'));

  // Login form submit
  document.getElementById('form-login')?.addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('login-identifier')?.value || '';
    const pass = document.getElementById('login-pass')?.value || '';
    const res = S.login(id, pass);
    if (res.ok) {
      modalAuth?.classList.add('hidden');
      toast(`ДОБРО ПОЖАЛОВАТЬ, ${res.user.username}`, true);
      atmo.click();
      document.getElementById('login-identifier').value = '';
      document.getElementById('login-pass').value = '';
    } else {
      toast(res.msg);
    }
  });

  // Quick Demo logins
  document.getElementById('btn-quick-admin')?.addEventListener('click', () => {
    const res = S.login('avice', '666');
    if (res.ok) {
      modalAuth?.classList.add('hidden');
      toast(`ВОШЛИ КАК АДМИНИСТРАТОР: ${res.user.username}`, true);
      atmo.click();
    }
  });

  document.getElementById('btn-quick-customer')?.addEventListener('click', () => {
    const res = S.login('GOTH_ANGEL', '123');
    if (res.ok) {
      modalAuth?.classList.add('hidden');
      toast(`ВОШЛИ КАК ПОКУПАТЕЛЬ: ${res.user.username}`, true);
      atmo.click();
    }
  });

  // Register form submit
  document.getElementById('form-register')?.addEventListener('submit', e => {
    e.preventDefault();
    const u = document.getElementById('reg-username')?.value || '';
    const em = document.getElementById('reg-email')?.value || '';
    const p = document.getElementById('reg-pass')?.value || '';
    const code = document.getElementById('reg-admin-code')?.value || '';
    const res = S.register(u, em, p, code);
    if (res.ok) {
      modalAuth?.classList.add('hidden');
      toast(`АККАУНТ СОЗДАН! ВЫ ВОШЛИ КАК ${res.user.username}`, true);
      atmo.click();
      document.getElementById('reg-username').value = '';
      document.getElementById('reg-email').value = '';
      document.getElementById('reg-pass').value = '';
      document.getElementById('reg-admin-code').value = '';
    } else {
      toast(res.msg);
    }
  });

  // Logout buttons
  document.getElementById('btn-logout')?.addEventListener('click', () => {
    S.logout();
    modalProfile?.classList.add('hidden');
    toast('ВЫ ВЫШЛИ ИЗ АККАУНТА');
  });

  document.getElementById('btn-admin-logout')?.addEventListener('click', () => {
    S.logout();
    toast('ВЫХОД ИЗ РЕЖИМА АДМИНИСТРАТОРА');
  });

  // Reset demo data
  document.getElementById('btn-reset-data')?.addEventListener('click', () => {
    if (confirm('Сбросить каталог к заводским настройкам?')) {
      S.resetDefaults();
      toast('КАТАЛОГ СБРОШЕН', true);
    }
  });

  // Admin shortcut in profile
  document.getElementById('btn-profile-admin-add')?.addEventListener('click', () => {
    modalProfile?.classList.add('hidden');
    openEditor();
  });
}

function renderProfileModal() {
  const u = S.currentUser;
  if (!u) return;

  const avatarEl = document.getElementById('profile-avatar');
  const userEl = document.getElementById('profile-username');
  const roleBadge = document.getElementById('profile-role-badge');
  const emailEl = document.getElementById('profile-email');
  const regEl = document.getElementById('profile-reg-date');
  const countEl = document.getElementById('profile-orders-count');
  const listEl = document.getElementById('profile-orders-list');
  const adminShortcuts = document.getElementById('profile-admin-shortcuts');

  if (avatarEl) avatarEl.textContent = u.avatar || '💀';
  if (userEl) userEl.textContent = u.username;
  if (emailEl) emailEl.textContent = u.email;
  if (regEl) regEl.textContent = `В культе с: ${u.registeredAt || '2026'}`;

  const isAdmin = u.role === 'admin';
  if (roleBadge) {
    if (isAdmin) {
      roleBadge.textContent = 'АДМИНИСТРАТОР';
      roleBadge.className = 'tag-v text-[9px] bg-red-950/90 text-red-300 border-red-800 font-bold';
    } else {
      roleBadge.textContent = 'ПОКУПАТЕЛЬ';
      roleBadge.className = 'tag-v text-[9px] text-zinc-300 border-zinc-700';
    }
  }

  if (adminShortcuts) {
    adminShortcuts.classList.toggle('hidden', !isAdmin);
  }

  const orders = u.orders || [];
  if (countEl) countEl.textContent = `[ ${orders.length} ${orders.length === 1 ? 'заказ' : 'заказов'} ]`;

  if (!listEl) return;
  if (!orders.length) {
    listEl.innerHTML = `<div class="p-6 text-center border border-zinc-900 bg-zinc-950/40">
      <p class="text-[11px] text-zinc-600 uppercase tracking-widest">// ИСТОРИЯ ПУСТА</p>
      <p class="text-[10px] text-zinc-500 mt-1">Оформите свой первый ритуальный заказ</p>
    </div>`;
  } else {
    listEl.innerHTML = orders.map(o => `
      <div class="border border-zinc-800 bg-zinc-950/80 p-3 text-[11px] space-y-1.5">
        <div class="flex items-center justify-between border-b border-zinc-900 pb-1.5">
          <span class="font-bold text-white tracking-wider">${o.id}</span>
          <span class="text-[10px] text-zinc-500">${o.date}</span>
        </div>
        <div class="text-[10px] text-zinc-400 space-y-0.5">
          ${(o.items || []).map(i => `<div class="flex justify-between"><span>${i.title} (${i.size}) × ${i.qty}</span><span class="text-white">${fmt(i.price * i.qty)}</span></div>`).join('')}
        </div>
        <div class="flex items-center justify-between pt-1.5 border-t border-zinc-900/60 font-bold">
          <span class="text-[9px] text-zinc-400 uppercase tracking-wider">${o.status || 'В ОБРАБОТКЕ'}</span>
          <span class="text-white">${fmt(o.total)}</span>
        </div>
      </div>
    `).join('');
  }
}

// ============================================================
//  §8  ADMIN: PRODUCT EDITOR
// ============================================================

function setupProductEditor() {
  const modal = document.getElementById('modal-editor');
  document.getElementById('btn-add-product')?.addEventListener('click', () => openEditor());
  document.getElementById('close-editor')?.addEventListener('click', () => modal?.classList.add('hidden'));

  // Preset image dropdown
  const presetSel = document.getElementById('preset-img');
  if (presetSel) {
    presetSel.innerHTML = `<option value="">— Готовый пресет —</option>` +
      PRESET_IMAGES.map(p => `<option value="${p.url}">${p.label}</option>`).join('');
    presetSel.addEventListener('change', e => {
      if (e.target.value) {
        document.getElementById('ed-image').value = e.target.value;
        document.getElementById('ed-preview').src = e.target.value;
      }
    });
  }

  // Live URL preview
  document.getElementById('ed-image')?.addEventListener('input', e => {
    document.getElementById('ed-preview').src = e.target.value || PRESET_IMAGES[0].url;
  });

  // Local file upload → Base64
  document.getElementById('ed-file')?.addEventListener('change', e => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      document.getElementById('ed-image').value = ev.target.result;
      document.getElementById('ed-preview').src = ev.target.result;
      toast('ФОТО ЗАГРУЖЕНО ЛОКАЛЬНО');
    };
    reader.readAsDataURL(file);
  });

  // Submit
  document.getElementById('editor-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const id    = document.getElementById('ed-id').value;
    const title = document.getElementById('ed-title').value.trim();
    const cat   = document.getElementById('ed-category').value;
    const price = parseInt(document.getElementById('ed-price').value, 10) || 0;
    const image = document.getElementById('ed-image').value.trim() || PRESET_IMAGES[0].url;
    const badge = document.getElementById('ed-badge').value.trim();
    const desc  = document.getElementById('ed-desc').value.trim();
    const sizes = [...document.querySelectorAll('input[name="ed-size"]:checked')].map(cb => cb.value);

    if (!title || !cat || price <= 0) { alert('Заполните название, категорию и цену!'); return; }

    const data = { title, category: cat, price, image, badge, desc, sizes: sizes.length ? sizes : ['OVERSZ'] };

    if (id) { S.updateProduct(id, data); toast('ТОВАР ОБНОВЛЁН', true); }
    else    { S.addProduct({ id: 'p_' + Date.now(), ...data }); toast('НОВЫЙ ТОВАР ДОБАВЛЕН', true); }

    modal.classList.add('hidden');
  });
}

function openEditor(product = null) {
  const modal = document.getElementById('modal-editor');
  const title = document.getElementById('editor-heading');
  const catSel = document.getElementById('ed-category');

  // Populate categories (exclude "ВСЕ ВЕЩИ")
  if (catSel) catSel.innerHTML = S.categories.filter(c => c !== 'ВСЕ ВЕЩИ').map(c => `<option value="${c}">${c}</option>`).join('');

  if (product) {
    title.textContent = '// РЕДАКТИРОВАНИЕ ТОВАРА';
    document.getElementById('ed-id').value       = product.id;
    document.getElementById('ed-title').value    = product.title;
    document.getElementById('ed-category').value = product.category;
    document.getElementById('ed-price').value    = product.price;
    document.getElementById('ed-image').value    = product.image;
    document.getElementById('ed-badge').value    = product.badge || '';
    document.getElementById('ed-desc').value     = product.desc || '';
    document.getElementById('ed-preview').src    = product.image;
    document.querySelectorAll('input[name="ed-size"]').forEach(cb => cb.checked = product.sizes?.includes(cb.value));
  } else {
    title.textContent = '// НОВЫЙ ТОВАР';
    document.getElementById('ed-id').value    = '';
    document.getElementById('ed-title').value = '';
    document.getElementById('ed-price').value = '';
    document.getElementById('ed-image').value = PRESET_IMAGES[0].url;
    document.getElementById('ed-badge').value = 'NEW DROP';
    document.getElementById('ed-desc').value  = '';
    document.getElementById('ed-preview').src = PRESET_IMAGES[0].url;
    document.querySelectorAll('input[name="ed-size"]').forEach(cb => cb.checked = (cb.value === 'OVERSZ' || cb.value === 'L'));
  }

  modal.classList.remove('hidden');
}

window.editProduct = id => { const p = S.products.find(x => x.id === id); if (p) openEditor(p); };
window.delProduct = id => {
  const p = S.products.find(x => x.id === id);
  if (p && confirm(`Удалить «${p.title}»?`)) { S.deleteProduct(id); toast('ТОВАР УДАЛЁН'); }
};

// ============================================================
//  §9  ADMIN: CATEGORY MANAGER
// ============================================================

function setupCategoryManager() {
  const modal = document.getElementById('modal-cats');
  document.getElementById('btn-categories')?.addEventListener('click', () => { renderCatList(); modal?.classList.remove('hidden'); });
  document.getElementById('close-cats')?.addEventListener('click', () => modal?.classList.add('hidden'));

  document.getElementById('cat-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const inp = document.getElementById('cat-input');
    const val = inp?.value.trim();
    if (!val) return;
    if (S.addCategory(val)) { inp.value = ''; renderCatList(); toast(`КАТЕГОРИЯ «${val.toUpperCase()}» СОЗДАНА`, true); }
    else alert('Такая категория уже существует!');
  });
}

function renderCatList() {
  const el = document.getElementById('cat-list');
  if (!el) return;
  el.innerHTML = S.categories.map(cat => {
    const n = S.products.filter(p => p.category === cat).length;
    return `<div class="flex items-center justify-between p-2 border border-zinc-800 bg-zinc-950/70 font-mono text-[11px]">
      <div><span class="text-white uppercase font-bold">${cat}</span> <span class="text-zinc-500 ml-1.5">[ ${n} ]</span></div>
      ${cat === 'ВСЕ ВЕЩИ' ? `<span class="text-[9px] text-zinc-600">БАЗОВАЯ</span>` :
        `<button onclick="delCat('${cat}')" class="text-red-400 hover:text-white px-1.5 py-0.5 border border-red-900/40 hover:bg-red-900/60 transition-colors">УДАЛИТЬ</button>`}
    </div>`;
  }).join('');
}

window.delCat = cat => {
  if (confirm(`Удалить категорию «${cat}»?`)) { S.deleteCategory(cat); renderCatList(); toast(`«${cat}» УДАЛЕНА`); }
};

// ============================================================
//  §10  CHECKOUT SIMULATION
// ============================================================

function setupCheckout() {
  const modal   = document.getElementById('modal-checkout');
  const content = document.getElementById('checkout-content');
  const summary = document.getElementById('checkout-summary');

  document.getElementById('btn-checkout')?.addEventListener('click', () => {
    const { total, count } = S.cartTotals();
    if (!count) return;
    // Reset to form view
    content.innerHTML = checkoutFormHTML();
    if (summary) summary.textContent = `ИТОГО: ${fmt(total)} — ${count} поз.`;
    
    // Auto-fill logged in user info
    if (S.currentUser) {
      const nameInp = document.getElementById('o-name');
      const contactInp = document.getElementById('o-contact');
      if (nameInp) nameInp.value = S.currentUser.username;
      if (contactInp) contactInp.value = S.currentUser.email;
    }

    modal?.classList.remove('hidden');
    setupCheckoutForm(modal);
  });

  document.getElementById('close-checkout')?.addEventListener('click', () => modal?.classList.add('hidden'));
}

function checkoutFormHTML() {
  return `
    <form id="checkout-form" class="space-y-3">
      <div>
        <label class="block text-[10px] uppercase text-zinc-400 mb-1 font-mono">Имя / Псевдоним:</label>
        <input type="text" id="o-name" required placeholder="Goth Angel" class="input-v text-xs py-2" />
      </div>
      <div>
        <label class="block text-[10px] uppercase text-zinc-400 mb-1 font-mono">Telegram / Телефон / Email:</label>
        <input type="text" id="o-contact" required placeholder="@username или +7..." class="input-v text-xs py-2" />
      </div>
      <div>
        <label class="block text-[10px] uppercase text-zinc-400 mb-1 font-mono">Адрес доставки:</label>
        <input type="text" id="o-addr" required placeholder="Москва / CDEK..." class="input-v text-xs py-2" />
      </div>
      <div>
        <label class="block text-[10px] uppercase text-zinc-400 mb-1 font-mono">Способ оплаты:</label>
        <select class="input-v text-xs py-2">
          <option>При получении (нал / карта)</option>
          <option>Криптовалюта (USDT / TON)</option>
          <option>СБП / Карта РФ</option>
        </select>
      </div>
      <button type="submit" class="btn-v btn-v-solid w-full py-3 text-[11px] tracking-widest mt-3">
        ПОДТВЕРДИТЬ ЗАКАЗ
      </button>
    </form>`;
}

function setupCheckoutForm(modal) {
  const form = document.getElementById('checkout-form');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const contact = document.getElementById('o-contact')?.value || '';
    const orderId = 'ZXC-' + Math.floor(100000 + Math.random() * 900000);

    // Save order to user account
    const orderItems = S.cart.map(c => {
      const p = S.products.find(x => x.id === c.pid);
      return { title: p ? p.title : 'Вещь', size: c.size, qty: c.qty, price: p ? p.price : 0 };
    });
    const { total } = S.cartTotals();
    const order = {
      id: orderId,
      date: new Date().toLocaleDateString('ru-RU') + ' ' + new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      items: orderItems,
      total: total,
      contact: contact,
      status: 'В ОБРАБОТКЕ // В ПУТИ'
    };
    S.addOrder(order);

    const content = document.getElementById('checkout-content');
    content.innerHTML = `
      <div class="text-center py-6 font-mono">
        <div class="inline-flex items-center justify-center w-14 h-14 border border-white text-white mb-4 animate-pulse">
          <i data-lucide="check" class="w-7 h-7"></i>
        </div>
        <h3 class="text-base uppercase text-white font-bold tracking-widest">// ЗАКАЗ ПРИНЯТ В zxcMIDDAS</h3>
        <p class="text-[11px] text-zinc-400 mt-2">НОМЕР: <span class="text-white font-bold">${orderId}</span></p>
        <p class="text-[11px] text-zinc-500 mt-3 max-w-xs mx-auto leading-relaxed">
          Мы свяжемся по <span class="text-zinc-300">${contact}</span> для подтверждения. Заказ сохранен в истории вашего профиля.
        </p>
        <div class="flex gap-2 justify-center mt-6">
          <button onclick="closeModal('modal-checkout'); renderAll();" class="btn-v btn-v-solid text-[11px] py-2 px-5">
            ПРОДОЛЖИТЬ
          </button>
          <button onclick="closeModal('modal-checkout'); renderProfileModal(); document.getElementById('modal-profile')?.classList.remove('hidden');" class="btn-v text-[11px] py-2 px-5">
            МОИ ЗАКАЗЫ
          </button>
        </div>
      </div>`;
    lucide.createIcons();
    S.clearCart();
    atmo.click();
  });
}
