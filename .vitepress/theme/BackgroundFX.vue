<template>
  <div class="mc-bg-wrapper" aria-hidden="true">
    <div class="mc-bg-grid"></div>
    <div class="mc-bg-glow mc-bg-glow-1"></div>
    <div class="mc-bg-glow mc-bg-glow-2"></div>
    <div class="mc-bg-glow mc-bg-glow-3"></div>
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
let clickHandler = null

onMounted(() => {
  if (typeof window === 'undefined') return
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let width = (canvas.width = window.innerWidth)
  let height = (canvas.height = window.innerHeight)

  const mouse = { x: null, y: null, radius: 190 }
  let particles = []

  const DARK_PALETTE = [
    { r: 27, g: 217, b: 106 },
    { r: 56, g: 189, b: 248 },
    { r: 168, g: 85, b: 247 },
    { r: 245, g: 158, b: 11 }
  ]

  const LIGHT_PALETTE = [
    { r: 5, g: 150, b: 105 },
    { r: 2, g: 132, b: 199 },
    { r: 124, g: 58, b: 237 },
    { r: 217, g: 119, b: 6 }
  ]

  const isDarkMode = () => document.documentElement.classList.contains('dark')

  const createParticles = () => {
    const count = Math.min(95, Math.max(38, Math.floor((width * height) / 14500)))
    particles = []
    for (let i = 0; i < count; i++) {
      const colorIdx = i % 10 === 0 ? 3 : (i % 4 === 3 ? 2 : i % 2)
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.65,
        vy: (Math.random() - 0.5) * 0.65,
        baseRadius: Math.random() * 2.4 + 1.5,
        pulseSpeed: Math.random() * 0.035 + 0.015,
        pulsePhase: Math.random() * Math.PI * 2,
        isVoxel: i % 3 === 0,
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
    const maxDist = width < 768 ? 125 : 165

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
          p.x += (dxMouse / distMouse) * force * 0.85
          p.y += (dyMouse / distMouse) * force * 0.85
        }
      }

      const pulse = 0.6 + 0.4 * Math.sin(p.pulsePhase)
      const radius = p.baseRadius * (0.85 + 0.3 * pulse)
      const col = palette[p.colorIdx]
      const alpha = dark ? 0.38 + pulse * 0.32 : 0.28 + pulse * 0.28

      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 5.2)
      grad.addColorStop(0, `rgba(${col.r}, ${col.g}, ${col.b}, ${alpha})`)
      grad.addColorStop(0.4, `rgba(${col.r}, ${col.g}, ${col.b}, ${alpha * 0.42})`)
      grad.addColorStop(1, `rgba(${col.r}, ${col.g}, ${col.b}, 0)`)

      ctx.beginPath()
      ctx.fillStyle = grad
      ctx.arc(p.x, p.y, radius * 5.2, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = dark
        ? `rgba(${col.r}, ${col.g}, ${col.b}, ${Math.min(0.9, alpha + 0.2)})`
        : `rgba(${col.r}, ${col.g}, ${col.b}, ${Math.min(0.95, alpha + 0.3)})`

      if (p.isVoxel) {
        const s = radius * 1.45
        ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s)
      } else {
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius * 0.85, 0, Math.PI * 2)
        ctx.fill()
      }

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j]
        const dx = p.x - p2.x
        const dy = p.y - p2.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < maxDist) {
          const lineAlpha = (1 - dist / maxDist) * (dark ? 0.36 : 0.22)
          ctx.beginPath()
          ctx.strokeStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${lineAlpha})`
          ctx.lineWidth = 1.15
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
          const mAlpha = (1 - distM / mouse.radius) * (dark ? 0.62 : 0.38)
          ctx.beginPath()
          ctx.strokeStyle = dark
            ? `rgba(27, 217, 106, ${mAlpha})`
            : `rgba(5, 150, 105, ${mAlpha})`
          ctx.lineWidth = 1.4
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

  clickHandler = (e) => {
    for (let k = 0; k < 4; k++) {
      if (particles.length > 120) particles.shift()
      particles.push({
        x: e.clientX + (Math.random() - 0.5) * 20,
        y: e.clientY + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 1.4,
        vy: (Math.random() - 0.5) * 1.4,
        baseRadius: Math.random() * 2.5 + 1.6,
        pulseSpeed: 0.03,
        pulsePhase: Math.random() * Math.PI * 2,
        isVoxel: k % 2 === 0,
        colorIdx: k % 4
      })
    }
  }

  window.addEventListener('resize', resizeHandler, { passive: true })
  window.addEventListener('mousemove', mouseMoveHandler, { passive: true })
  window.addEventListener('mouseleave', mouseLeaveHandler, { passive: true })
  window.addEventListener('click', clickHandler, { passive: true })

  animId = requestAnimationFrame(render)
})

onUnmounted(() => {
  if (animId) cancelAnimationFrame(animId)
  if (typeof window !== 'undefined') {
    if (resizeHandler) window.removeEventListener('resize', resizeHandler)
    if (mouseMoveHandler) window.removeEventListener('mousemove', mouseMoveHandler)
    if (mouseLeaveHandler) window.removeEventListener('mouseleave', mouseLeaveHandler)
    if (clickHandler) window.removeEventListener('click', clickHandler)
  }
})
</script>
