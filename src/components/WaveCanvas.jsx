import { useEffect, useRef } from 'react'

export const WaveCanvas = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const onResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    let mouse = { x: width * 0.5, y: height * 0.5, targetX: width * 0.5, targetY: height * 0.5 }

    const onMouseMove = (e) => {
      mouse.targetX = e.clientX
      mouse.targetY = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove)

    // Floating particles / beacon nodes
    const particleCount = 45
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.2,
      pulse: Math.random() * Math.PI * 2,
    }))

    let step = 0

    const render = () => {
      step += 0.015
      mouse.x += (mouse.targetX - mouse.x) * 0.05
      mouse.y += (mouse.targetY - mouse.y) * 0.05

      const isLight = document.documentElement.getAttribute('data-theme') === 'light'

      ctx.clearRect(0, 0, width, height)

      // Draw subtle grid
      ctx.strokeStyle = isLight ? 'rgba(2, 132, 199, 0.05)' : 'rgba(0, 229, 255, 0.03)'
      ctx.lineWidth = 1
      const gridSize = 60
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Draw multi-layered oceanic waves
      const waves = isLight
        ? [
            { color: 'rgba(2, 132, 199, 0.12)', length: 0.003, amplitude: 50, speed: 0.02, yOffset: height * 0.7 },
            { color: 'rgba(3, 105, 161, 0.08)', length: 0.005, amplitude: 40, speed: 0.015, yOffset: height * 0.75 },
            { color: 'rgba(5, 150, 105, 0.06)', length: 0.004, amplitude: 35, speed: 0.025, yOffset: height * 0.8 },
          ]
        : [
            { color: 'rgba(0, 229, 255, 0.08)', length: 0.003, amplitude: 50, speed: 0.02, yOffset: height * 0.7 },
            { color: 'rgba(0, 180, 216, 0.06)', length: 0.005, amplitude: 40, speed: 0.015, yOffset: height * 0.75 },
            { color: 'rgba(16, 185, 129, 0.05)', length: 0.004, amplitude: 35, speed: 0.025, yOffset: height * 0.8 },
          ]

      waves.forEach((wave, index) => {
        ctx.beginPath()
        ctx.moveTo(0, height)
        for (let x = 0; x <= width; x += 10) {
          const mouseDist = (mouse.x - x) * 0.001
          const y =
            wave.yOffset +
            Math.sin(x * wave.length + step * wave.speed * 100 + index) * wave.amplitude +
            Math.cos(x * 0.002 + step) * 20 +
            Math.sin(mouseDist) * 15
          ctx.lineTo(x, y)
        }
        ctx.lineTo(width, height)
        ctx.closePath()
        ctx.fillStyle = wave.color
        ctx.fill()
      })

      // Draw floating navigational beacons / particles
      const particleBaseColor = isLight ? '2, 132, 199' : '0, 229, 255'
      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY
        p.pulse += 0.03

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        const dynamicOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${particleBaseColor}, ${dynamicOpacity})`
        ctx.shadowColor = `rgba(${particleBaseColor}, 0.8)`
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-canvas" />
}
