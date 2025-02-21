"use client"

import { useEffect, useRef } from "react"

export function AnimatedGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const animate = () => {
      time += 0.002
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create multiple gradient orbs that move
      const orbs = [
        {
          x: Math.sin(time) * 100 + canvas.width / 2,
          y: Math.cos(time) * 100 + canvas.height / 2,
          r: 300,
          colors: ["rgba(56, 189, 248, 0.2)", "rgba(56, 189, 248, 0)"],
        },
        {
          x: Math.cos(time * 0.8) * 150 + canvas.width / 2,
          y: Math.sin(time * 0.8) * 150 + canvas.height / 2,
          r: 250,
          colors: ["rgba(99, 102, 241, 0.15)", "rgba(99, 102, 241, 0)"],
        },
        {
          x: Math.sin(time * 1.2) * 80 + canvas.width / 2,
          y: Math.cos(time * 1.2) * 80 + canvas.height / 2,
          r: 200,
          colors: ["rgba(168, 85, 247, 0.1)", "rgba(168, 85, 247, 0)"],
        },
      ]

      orbs.forEach((orb) => {
        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r)
        gradient.addColorStop(0, orb.colors[0])
        gradient.addColorStop(1, orb.colors[1])
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    resize()
    animate()

    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 h-screen w-screen opacity-60" />
}

