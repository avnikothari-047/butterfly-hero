"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function Home() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let down = false, start = 0, x = 0
    const max = window.innerWidth * 0.6
    const move = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" })

    const md = (e: MouseEvent) => { down = true; start = e.clientX - x }
    const mm = (e: MouseEvent) => {
      if (!down) return
      x = e.clientX - start
      if (x < 0) x = 0
      if (x > max) x = max
      move(x)
      const p = x / max
      gsap.to(".headline", { opacity: p })
      gsap.to(".stat", { opacity: p })
    }
    const mu = () => { down = false }

    el.addEventListener("mousedown", md)
    window.addEventListener("mousemove", mm)
    window.addEventListener("mouseup", mu)
    return () => {
      el.removeEventListener("mousedown", md)
      window.removeEventListener("mousemove", mm)
      window.removeEventListener("mouseup", mu)
    }
  }, [])

  return (
    <main className="h-screen flex items-center justify-center bg-pink-100 relative overflow-hidden">
      <div ref={ref} className="absolute left-10 top-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-pink-400 shadow-xl cursor-grab" />
      <div className="text-center">
        <h1 className="headline text-5xl tracking-[0.3em] opacity-0 mb-6">WELCOME ITZ FIZZ</h1>
        <div className="flex gap-10 justify-center">
          <div className="stat opacity-0"><h2 className="text-2xl font-bold">95%</h2><p>Client Satisfaction</p></div>
          <div className="stat opacity-0"><h2 className="text-2xl font-bold">120+</h2><p>Projects Delivered</p></div>
          <div className="stat opacity-0"><h2 className="text-2xl font-bold">5+</h2><p>Years Experience</p></div>
        </div>
      </div>
    </main>
  )
}