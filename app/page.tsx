"use client"

import { useEffect } from "react"
import MusicPlayerUI from "@/components/music-player-ui"
import AntiDevTool from "@/components/anti-devtool"
import Sakura from "@/components/Sakura"

export default function Home() {
  useEffect(() => {
    if (typeof window === "undefined") return

    window.scrollTo(0, 0)
    document.documentElement.style.overflow = "hidden"
    document.body.style.overflow = "hidden"

    const Config = new AntiDevTool({
      interval: 200,
      redirectURL: "//www.facebook.com/vanhzxje.2018",
      debug: false,
    })
    Config.init()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "a") {
        e.preventDefault()
      }
    }
    document.addEventListener("keydown", handleKeyDown)

    const handleMouseDown = (e: MouseEvent) => e.preventDefault()
    document.addEventListener("mousedown", handleMouseDown)

    // Cleanup when component unmount
    return () => {
      Config.stop()
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleMouseDown)
      document.documentElement.style.overflow = ""
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center p-2 sm:p-4 bg-[radial-gradient(circle_at_top,_#ff5f9e_0%,_#2a0c3c_55%,_#080515_100%)]">
      {/* Sakura animation nền */}
      <Sakura />

      {/* Nội dung chính */}
      <MusicPlayerUI />
    </main>
  )
}
