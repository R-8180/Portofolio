import { useEffect, useRef } from 'react'

const particleColors = ['rgba(128, 255, 209, .75)', 'rgba(164, 109, 255, .7)', 'rgba(237, 236, 231, .42)']

export function InteractiveBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: -1000, y: -1000, active: false }
    const particles = []
    let width = 0
    let height = 0
    let animationFrame
    let time = 0

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = width * pixelRatio
      canvas.height = height * pixelRatio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      const count = width < 700 ? 42 : 88
      particles.length = 0
      for (let index = 0; index < count; index += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          radius: Math.random() * 1.45 + 0.45,
          color: particleColors[index % particleColors.length],
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    function handlePointerMove(event) {
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.active = true
    }

    function handlePointerLeave() {
      pointer.active = false
    }

    function drawGlow() {
      const glowX = pointer.active ? pointer.x : width * 0.72
      const glowY = pointer.active ? pointer.y : height * 0.28
      const glowStrength = pointer.active ? 0.28 : 0.12
      const purple = context.createRadialGradient(glowX, glowY, 0, glowX, glowY, 320)
      purple.addColorStop(0, `rgba(164, 109, 255, ${glowStrength})`)
      purple.addColorStop(0.45, 'rgba(75, 115, 255, .055)')
      purple.addColorStop(1, 'rgba(0, 0, 0, 0)')
      context.fillStyle = purple
      context.fillRect(0, 0, width, height)

      const mint = context.createRadialGradient(width * 0.16, height * 0.78, 0, width * 0.16, height * 0.78, 420)
      mint.addColorStop(0, 'rgba(128, 255, 209, .07)')
      mint.addColorStop(1, 'rgba(0, 0, 0, 0)')
      context.fillStyle = mint
      context.fillRect(0, 0, width, height)
    }

    function drawGrid() {
      const spacing = width < 700 ? 54 : 72
      const offset = (time * 0.12) % spacing
      context.lineWidth = 1
      context.strokeStyle = 'rgba(128, 255, 209, .055)'
      for (let x = -spacing + offset; x < width + spacing; x += spacing) {
        context.beginPath()
        context.moveTo(x, 0)
        context.lineTo(x, height)
        context.stroke()
      }
      for (let y = -spacing + offset; y < height + spacing; y += spacing) {
        context.beginPath()
        context.moveTo(0, y)
        context.lineTo(width, y)
        context.stroke()
      }
    }

    function drawParticles() {
      particles.forEach((particle) => {
        const distanceX = particle.x - pointer.x
        const distanceY = particle.y - pointer.y
        const distance = Math.hypot(distanceX, distanceY)
        if (pointer.active && distance < 150 && distance > 0) {
          const force = (150 - distance) / 150
          particle.vx += (distanceX / distance) * force * 0.012
          particle.vy += (distanceY / distance) * force * 0.012
        }

        particle.vx *= 0.993
        particle.vy *= 0.993
        particle.x += particle.vx + Math.sin(time * 0.01 + particle.phase) * 0.025
        particle.y += particle.vy + Math.cos(time * 0.008 + particle.phase) * 0.025
        if (particle.x < -10) particle.x = width + 10
        if (particle.x > width + 10) particle.x = -10
        if (particle.y < -10) particle.y = height + 10
        if (particle.y > height + 10) particle.y = -10

        const glowRadius = pointer.active && distance < 180 ? 12 : 0
        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius + glowRadius * 0.1, 0, Math.PI * 2)
        context.fillStyle = particle.color
        context.shadowBlur = glowRadius
        context.shadowColor = particle.color
        context.fill()
        context.shadowBlur = 0
      })
    }

    function draw() {
      time += 1
      context.clearRect(0, 0, width, height)
      drawGlow()
      drawGrid()
      drawParticles()
      if (!reducedMotion) animationFrame = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true })

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="interactive-background" aria-hidden="true" />
}
