/**
 * ═══════════════════════════════════════════════════════════════
 * MONOCHROME RAIN ENGINE v2.0 — «zxcMIDDAS»
 * ═══════════════════════════════════════════════════════════════
 * High-fidelity HTML5 Canvas atmospheric rain simulation.
 *
 *  Features:
 *   ▸ Parallax depth layers (near / mid / far) with independent speed & opacity
 *   ▸ Realistic splash particles with gravity and spread
 *   ▸ Mouse-reactive wind deflection (cursor position → global wind vector)
 *   ▸ Interactive lightning flash with double-strike afterimage
 *   ▸ Ambient mist / fog layer at bottom of viewport
 *   ▸ Streak length scales with speed for natural motion blur
 *   ▸ Configurable intensity presets: calm / heavy / storm
 */

class MonochromeRain {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    // --- Configuration ---
    this.config = {
      dropCount: 260,
      windBase: -0.4,
      windMouseInfluence: 2.2,
      splashChance: 0.45,
      splashParticles: [2, 5],
      mistHeight: 120,
      mistOpacity: 0.06,
      trailAlpha: 0.38,
    };

    this.drops = [];
    this.splashes = [];
    this.mist = [];
    this.wind = this.config.windBase;
    this.lightningAlpha = 0;
    this.lightningDecay = 0;
    this.mouseX = -9999;
    this.mouseY = -9999;
    this.width = 0;
    this.height = 0;

    this._init();
  }

  /* ─── Bootstrap ─── */
  _init() {
    this._resize();
    window.addEventListener('resize', () => this._resize());

    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      // Wind shifts with horizontal mouse position
      const normX = (e.clientX / this.width) - 0.5; // -0.5 … +0.5
      this.wind = this.config.windBase + normX * this.config.windMouseInfluence;
    });

    // Seed initial drops across the full viewport
    for (let i = 0; i < this.config.dropCount; i++) {
      this.drops.push(this._createDrop(true));
    }

    // Seed mist particles
    for (let i = 0; i < 40; i++) {
      this.mist.push(this._createMistParticle());
    }

    this._loop();
  }

  _resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  /* ─── Drop Factory ─── */
  _createDrop(randomY = false) {
    const depth = Math.random(); // 0 = far, 1 = near
    const speed = 10 + depth * 20;
    return {
      x: Math.random() * (this.width + 200) - 100,
      y: randomY ? Math.random() * this.height : -(20 + Math.random() * 60),
      speed,
      length: 8 + depth * 22,
      width: 0.6 + depth * 1.6,
      opacity: 0.12 + depth * 0.52,
      depth,
    };
  }

  /* ─── Splash Factory ─── */
  _createSplash(x, y, count) {
    for (let i = 0; i < count; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.7;
      const v = 1.5 + Math.random() * 3.5;
      this.splashes.push({
        x, y,
        vx: Math.cos(angle) * v + this.wind * 0.4,
        vy: Math.sin(angle) * v,
        gravity: 0.18 + Math.random() * 0.08,
        life: 1,
        decay: 0.035 + Math.random() * 0.04,
        radius: 0.6 + Math.random() * 1.4,
        opacity: 0.5 + Math.random() * 0.3,
      });
    }
  }

  /* ─── Mist Particle ─── */
  _createMistParticle() {
    return {
      x: Math.random() * this.width,
      y: this.height - Math.random() * this.config.mistHeight,
      radius: 30 + Math.random() * 90,
      opacity: 0.015 + Math.random() * this.config.mistOpacity,
      vx: -0.15 + Math.random() * 0.3,
    };
  }

  /* ─── Public API ─── */
  setIntensity(level) {
    const map = { calm: 90, heavy: 260, storm: 500 };
    const target = map[level] || 260;
    this.config.dropCount = target;
    // Adjust pool
    while (this.drops.length < target) this.drops.push(this._createDrop(true));
    if (this.drops.length > target) this.drops.length = target;
  }

  triggerFlash() {
    this.lightningAlpha = 0.45 + Math.random() * 0.25;
    this.lightningDecay = 0.88;
    // Double-strike afterimage
    setTimeout(() => {
      this.lightningAlpha = Math.max(this.lightningAlpha, 0.18 + Math.random() * 0.12);
      this.lightningDecay = 0.82;
    }, 60 + Math.random() * 40);
  }

  /* ─── Render Loop ─── */
  _loop() {
    requestAnimationFrame(() => this._loop());
    const ctx = this.ctx;
    const W = this.width;
    const H = this.height;

    // Motion trail fade
    ctx.fillStyle = `rgba(5, 5, 7, ${this.config.trailAlpha})`;
    ctx.fillRect(0, 0, W, H);

    // ── Lightning ──
    if (this.lightningAlpha > 0.005) {
      ctx.fillStyle = `rgba(235, 235, 245, ${this.lightningAlpha})`;
      ctx.fillRect(0, 0, W, H);
      this.lightningAlpha *= this.lightningDecay;
      if (this.lightningAlpha < 0.005) this.lightningAlpha = 0;
    }

    // ── Mist Layer ──
    for (let i = 0; i < this.mist.length; i++) {
      const m = this.mist[i];
      m.x += m.vx + this.wind * 0.08;
      if (m.x > W + m.radius) m.x = -m.radius;
      if (m.x < -m.radius) m.x = W + m.radius;

      const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.radius);
      g.addColorStop(0, `rgba(180, 180, 195, ${m.opacity})`);
      g.addColorStop(1, `rgba(180, 180, 195, 0)`);
      ctx.fillStyle = g;
      ctx.fillRect(m.x - m.radius, m.y - m.radius, m.radius * 2, m.radius * 2);
    }

    // ── Rain Drops ──
    ctx.lineCap = 'round';
    for (let i = 0; i < this.drops.length; i++) {
      const d = this.drops[i];
      const windFactor = 0.6 + d.depth * 0.6;
      d.x += this.wind * windFactor;
      d.y += d.speed;

      // Mouse repulsion (radial push)
      const dx = d.x - this.mouseX;
      const dy = d.y - this.mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const force = (1 - dist / 100) * 4;
        d.x += (dx / dist) * force;
      }

      // Draw streak
      ctx.strokeStyle = `rgba(225, 225, 235, ${d.opacity})`;
      ctx.lineWidth = d.width;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x + this.wind * 3.5, d.y + d.length);
      ctx.stroke();

      // Bottom reset & splash
      if (d.y > H) {
        if (Math.random() < this.config.splashChance) {
          const count = this.config.splashParticles[0] +
            Math.floor(Math.random() * (this.config.splashParticles[1] - this.config.splashParticles[0] + 1));
          this._createSplash(d.x, H - 1, count);
        }
        Object.assign(d, this._createDrop());
      }
      // Side reset
      if (d.x < -140 || d.x > W + 140) d.x = Math.random() * W;
    }

    // ── Splash Particles ──
    for (let i = this.splashes.length - 1; i >= 0; i--) {
      const s = this.splashes[i];
      s.x += s.vx;
      s.y += s.vy;
      s.vy += s.gravity;
      s.life -= s.decay;
      if (s.life <= 0) { this.splashes.splice(i, 1); continue; }

      ctx.fillStyle = `rgba(210, 210, 225, ${s.opacity * s.life})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius * s.life, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

window.MonochromeRain = MonochromeRain;
