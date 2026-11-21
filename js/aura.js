/*
  AURA: colored smoke rising around Will's outline in the hero (home page only).

  How it works
  - scripts/make-aura-points.mjs found points along Will's outline in the hero photo and
    saved them in js/data/aura-points.js, each with an "outward" direction.
  - A <canvas> sits right behind the photo. Soft puffs of smoke ("particles") are born at
    random outline points, drift up and away from his body, grow and fade out.
  - The photo covers every puff that is behind his body, so you only see smoke around his
    edges: an aura, like an anime power-up.
  - The colors are the theme's gradient colors (--g1, --g2, --g3). At Night the puffs are
    added together so they glow; in Day they are drawn as a soft lavender haze.
  - It pauses while the hero is off-screen or the tab is hidden, and never starts for
    visitors who asked for less motion.
*/
;(function () {
  const { $, reducedMotion } = WB
  const canvas = $('#aura')
  const photo = $('.hero-photo img')
  const points = WB.auraPoints
  if (!canvas || !photo || !points || reducedMotion || !canvas.getContext) return

  const ctx = canvas.getContext('2d')
  const root = document.documentElement
  const random = (min, max) => min + Math.random() * (max - min)

  /* ---------- 1. The puff picture ----------
     One soft cloud per color, drawn once on a small hidden canvas and then stamped many
     times. A cloud is a few overlapping round gradients, so it isn't a perfect circle. */
  const PUFF = 96
  const BLOBS = [
    [0.5, 0.5, 0.5],
    [0.36, 0.42, 0.3],
    [0.64, 0.4, 0.28],
    [0.55, 0.64, 0.3],
    [0.4, 0.62, 0.26],
  ]
  let puffs = []
  let isDark = true

  // "#9b6bff", 0.4 -> "rgba(155, 107, 255, 0.4)". The edge of a puff fades to the same
  // color at 0, not to "transparent", which would pass through grey (it is see-through black).
  function rgba(hex, alpha) {
    const n = parseInt(hex.replace('#', ''), 16)
    return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`
  }

  function makePuff(color) {
    const sprite = document.createElement('canvas')
    sprite.width = sprite.height = PUFF
    const g = sprite.getContext('2d')
    for (const [x, y, r] of BLOBS) {
      const gradient = g.createRadialGradient(x * PUFF, y * PUFF, 0, x * PUFF, y * PUFF, r * PUFF)
      // A gentle fall-off (no bright core), so many puffs blend into one cloud.
      gradient.addColorStop(0, rgba(color, 0.9))
      gradient.addColorStop(0.45, rgba(color, 0.42))
      gradient.addColorStop(1, rgba(color, 0))
      g.globalAlpha = 0.5
      g.fillStyle = gradient
      g.fillRect(0, 0, PUFF, PUFF)
    }
    return sprite
  }

  // Read the theme's colors and rebuild the puffs (again whenever Day/Night switches).
  function paintPuffs() {
    const style = getComputedStyle(root)
    isDark = root.dataset.theme === 'dark'
    puffs = ['--g1', '--g2', '--g3'].map((name) => makePuff(style.getPropertyValue(name).trim()))
  }

  /* ---------- 2. Sizes ----------
     The canvas is a bit bigger than the photo (so smoke can rise above his hand).
     We remember where the photo sits inside it, in CSS pixels. */
  let width = 0
  let height = 0
  let photoBox = { x: 0, y: 0, w: 1, h: 1 }

  function measure() {
    const c = canvas.getBoundingClientRect()
    const p = photo.getBoundingClientRect()
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5) // smoke is soft: no need for more
    width = c.width
    height = c.height
    canvas.width = Math.round(width * ratio)
    canvas.height = Math.round(height * ratio)
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0) // from now on we draw in CSS pixels
    photoBox = { x: p.left - c.left, y: p.top - c.top, w: p.width, h: p.height }
  }

  /* ---------- 3. Particles ---------- */
  const particles = []
  let spawnDebt = 0 // how many puffs we "owe" since the last frame

  function spawn() {
    // Pick an outline point; prefer the upper ones (head, shoulders, hand) a little.
    let i = Math.floor(Math.random() * (points.length / 4)) * 4
    const j = Math.floor(Math.random() * (points.length / 4)) * 4
    if (points[j + 1] < points[i + 1] && Math.random() < 0.6) i = j
    const [px, py, nx, ny] = points.slice(i, i + 4)
    const scale = photoBox.w / 420 // the photo is about 420px wide on a laptop
    const push = random(16, 36) * scale
    particles.push({
      x: photoBox.x + px * photoBox.w + random(-4, 4),
      y: photoBox.y + py * photoBox.h + random(-4, 4),
      vx: nx * push, // outward...
      vy: ny * push - random(14, 30) * scale, // ...and upward
      age: 0,
      life: random(2.2, 4), // seconds
      size0: random(18, 30) * scale,
      size1: random(80, 150) * scale,
      alpha: isDark ? random(0.3, 0.5) : random(0.2, 0.32),
      color: Math.floor(Math.random() * 3),
      turn: random(0, Math.PI * 2),
      spin: random(-0.6, 0.6),
      wobble: random(6, 16) * scale, // side-to-side sway, so the smoke curls
      seed: random(0, 100),
    })
  }

  /* ---------- 4. The animation loop (about 60 times a second) ---------- */
  let running = false
  let frameId = 0
  let last = 0

  function frame(now) {
    const dt = Math.min((now - last) / 1000, 0.05) // seconds since the last frame
    last = now

    // New puffs per second. Kept the same on phones: the puffs are smaller there, so the
    // same number gives the same thickness of smoke.
    const rate = 38
    spawnDebt += dt * rate
    while (spawnDebt >= 1) {
      if (particles.length < 140) spawn()
      spawnDebt -= 1
    }

    ctx.clearRect(0, 0, width, height)
    // Night: overlapping puffs add up and glow. Day: they simply sit on top of each other.
    ctx.globalCompositeOperation = isDark ? 'lighter' : 'source-over'

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]
      p.age += dt
      if (p.age >= p.life) {
        particles.splice(i, 1)
        continue
      }
      const t = p.age / p.life // 0 at birth, 1 at the end
      p.vy -= 10 * dt // smoke speeds up a little as it rises
      p.x += (p.vx + Math.sin(now / 900 + p.seed) * p.wobble) * dt
      p.y += p.vy * dt
      // Grows fast at first, then slower; fades in quickly and out slowly.
      const size = p.size0 + (p.size1 - p.size0) * (1 - (1 - t) * (1 - t))
      ctx.globalAlpha = p.alpha * (t < 0.15 ? t / 0.15 : (1 - t) / 0.85)
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.turn + p.spin * p.age)
      ctx.drawImage(puffs[p.color], -size / 2, -size / 2, size, size)
      ctx.restore()
    }
    frameId = requestAnimationFrame(frame)
  }

  function start() {
    if (running) return
    running = true
    last = performance.now()
    frameId = requestAnimationFrame(frame)
  }
  function stop() {
    running = false
    cancelAnimationFrame(frameId)
  }

  /* ---------- 5. Start, pause and resize ---------- */
  paintPuffs()
  measure()
  new ResizeObserver(measure).observe(canvas)
  // Day/Night switch: js/core.js changes data-theme on <html>; rebuild the colors then.
  new MutationObserver(paintPuffs).observe(root, {
    attributes: true,
    attributeFilter: ['data-theme'],
  })

  let heroVisible = true
  new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting
    heroVisible && !document.hidden ? start() : stop()
  }).observe(canvas)
  document.addEventListener('visibilitychange', () => {
    heroVisible && !document.hidden ? start() : stop()
  })
})()
