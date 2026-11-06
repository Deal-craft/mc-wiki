<template>
  <div class="mc-bg-wrapper" aria-hidden="true">
    <div class="mc-bg-glow mc-bg-glow-1"></div>
    <div class="mc-bg-glow mc-bg-glow-2"></div>
    <canvas ref="canvasRef" class="mc-bg-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let animId = null
let resizeHandler = null
let mouseMoveHandler = null
let mouseLeaveHandler = null

onMounted(() => {
  if (typeof window === 'undefined') return
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let width = (canvas.width = window.innerWidth)
  let height = (canvas.height = window.innerHeight)

  const mouse = { x: null, y: null, radius: 150 }
  let particles = []

  const DARK_PALETTE = [
    { r: 52, g: 211, b: 153 },  // Emerald (#34d399)
    { r: 16, g: 185, b: 129 },  // Green (#10b981)
    { r: 56, g: 189, b: 248 },  // Diamond Cyan (#38bdf8)
    { r: 168, g: 85, b: 247 }   // Ender Purple (#a855f7)
  ]

  const LIGHT_PALETTE = [
    { r: 5, g: 150, b: 105 },   // Deep Emerald (#059669)
    { r: 16, g: 185, b: 129 },  // Emerald (#10b981)
    { r: 2, g: 132, b: 199 },   // Sky Blue (#0284c7)
    { r: 124, g: 58, b: 237 }   // Violet (#7c3aed)
  ]

  const isDarkMode = () => document.documentElement.classList.contains('dark')

  const createParticles = () => {
    const count = Math.min(85, Math.max(28, Math.floor((width * height) / 18000)))
    particles = []
    for (let i = 0; i < count; i++) {
      const colorIdx = i % 4 === 3 ? 3 : i % 3
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        baseRadius: Math.random() * 1.9 + 1.1,
        pulseSpeed: Math.random() * 0.03 + 0.012,
        pulsePhase: Math.random() * Math.PI * 2,
        colorIdx
      })
    }
  }

  createParticles()

  const render = () => {
    if (document.hidden) {
      animId = requestAnimationFrame(render)
      return
    }

    ctx.clearRect(0, 0, width, height)
    const dark = isDarkMode()
    const palette = dark ? DARK_PALETTE : LIGHT_PALETTE
    const maxDist = width < 768 ? 110 : 145

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]
      p.x += p.vx
      p.y += p.vy
      p.pulsePhase += p.pulseSpeed

      if (p.x < 0) p.x = width
      else if (p.x > width) p.x = 0
      if (p.y < 0) p.y = height
      else if (p.y > height) p.y = 0

      if (mouse.x !== null && mouse.y !== null) {
        const dxMouse = p.x - mouse.x
        const dyMouse = p.y - mouse.y
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)
        if (distMouse < mouse.radius && distMouse > 0) {
          const force = (mouse.radius - distMouse) / mouse.radius
          p.x += (dxMouse / distMouse) * force * 0.7
          p.y += (dyMouse / distMouse) * force * 0.7
        }
      }

      const pulse = 0.65 + 0.35 * Math.sin(p.pulsePhase)
      const radius = p.baseRadius * (0.85 + 0.25 * pulse)
      const col = palette[p.colorIdx]
      const alpha = dark ? 0.45 + pulse * 0.45 : 0.3 + pulse * 0.35

      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 4.2)
      grad.addColorStop(0, `rgba(${col.r}, ${col.g}, ${col.b}, ${alpha})`)
      grad.addColorStop(0.45, `rgba(${col.r}, ${col.g}, ${col.b}, ${alpha * 0.35})`)
      grad.addColorStop(1, `rgba(${col.r}, ${col.g}, ${col.b}, 0)`)

      ctx.beginPath()
      ctx.fillStyle = grad
      ctx.arc(p.x, p.y, radius * 4.2, 0, Math.PI * 2)
      ctx.fill()

      ctx.beginPath()
      ctx.fillStyle = dark
        ? `rgba(240, 253, 250, ${Math.min(1, alpha + 0.2)})`
        : `rgba(${col.r}, ${col.g}, ${col.b}, ${Math.min(0.9, alpha + 0.25)})`
      ctx.arc(p.x, p.y, radius * 0.75, 0, Math.PI * 2)
      ctx.fill()

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j]
        const dx = p.x - p2.x
        const dy = p.y - p2.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < maxDist) {
          const lineAlpha = (1 - dist / maxDist) * (dark ? 0.22 : 0.14)
          ctx.beginPath()
          ctx.strokeStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${lineAlpha})`
          ctx.lineWidth = 1
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
        }
      }

      if (mouse.x !== null && mouse.y !== null) {
        const dxm = p.x - mouse.x
        const dym = p.y - mouse.y
        const distM = Math.sqrt(dxm * dxm + dym * dym)
        if (distM < mouse.radius) {
          const mAlpha = (1 - distM / mouse.radius) * (dark ? 0.42 : 0.26)
          ctx.beginPath()
          ctx.strokeStyle = dark
            ? `rgba(52, 211, 153, ${mAlpha})`
            : `rgba(5, 150, 105, ${mAlpha})`
          ctx.lineWidth = 1.2
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }
    }

    animId = requestAnimationFrame(render)
  }

  resizeHandler = () => {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
    createParticles()
  }

  mouseMoveHandler = (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  }

  mouseLeaveHandler = () => {
    mouse.x = null
    mouse.y = null
  }

  window.addEventListener('resize', resizeHandler, { passive: true })
  window.addEventListener('mousemove', mouseMoveHandler, { passive: true })
  window.addEventListener('mouseleave', mouseLeaveHandler, { passive: true })

  animId = requestAnimationFrame(render)
})

onUnmounted(() => {
  if (animId) cancelAnimationFrame(animId)
  if (typeof window !== 'undefined') {
    if (resizeHandler) window.removeEventListener('resize', resizeHandler)
    if (mouseMoveHandler) window.removeEventListener('mousemove', mouseMoveHandler)
    if (mouseLeaveHandler) window.removeEventListener('mouseleave', mouseLeaveHandler)
  }
})
</script>
