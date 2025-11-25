"use client"

import { useEffect } from "react"
import MusicPlayerUI from "@/components/music-player-ui"
import AntiDevTool from "@/components/anti-devtool"

export default function MusicPlayerUIClient() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const Config = new AntiDevTool({
      interval: 200,
      redirectURL: "//www.facebook.com/vanhzxje.2018",
      debug: false,
    })
    Config.init()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "a") e.preventDefault()
    }
    const handleMouseDown = (e: MouseEvent) => e.preventDefault()

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mousedown", handleMouseDown)

    return () => {
      Config.stop()
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleMouseDown)
    }
  }, [])

  return <MusicPlayerUI />
}
