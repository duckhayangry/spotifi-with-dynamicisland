"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Repeat, Star, Music2 } from "lucide-react"
import { motion } from "framer-motion"
import DynamicIsland from "./dynamic-island"

const playlist = [
  {
    id: 1,
    title: "Nam Ben Anh",
    artist: "ZLAB - Chau Bui & buitruonglinh",
    cover: "https://duckhayangry.github.io/cdn/pictures/nambenanh.jpeg",
    audioFile: "https://duckhayangry.github.io/cdn/music/Nằm_Bên_Anh_-_Minh_Đinh_ft_Hà_An_Huy_KLICKAUD.mp3",
  },
  {
    id: 2,
    title: "Pin Du Phong",
    artist: "Duong Domic & Lou Hoang",
    cover: "https://duckhayangry.github.io/cdn/pictures/pinduphong.jpg",
    audioFile: "https://duckhayangry.github.io/cdn/music/Pin_Dự_Phòng_-_Dương_Domic_Ft_Lou_Hoàng_REMIX_KLICKAUD.mp3",
  },
  {
    id: 3,
    title: "Lung Lo Remix",
    artist: "Y Tien - REDT - B Ray & Masew",
    cover: "https://duckhayangry.github.io/cdn/pictures/lunglo.jpg",
    audioFile:
      "https://duckhayangry.github.io/cdn/music/Lửng_Lơ_Remix_-_Nhạc_HOT_TikTok_Cháy_Nhạc_Quẩy_Hay_Nhất_KLICKAUD.mp3",
  },
  {
    id: 4,
    title: "Vung Ki Uc",
    artist: "Chillies",
    cover: "https://duckhayangry.github.io/cdn/pictures/vungkiuc.jpg",
    audioFile: "https://duckhayangry.github.io/cdn/music/Vùng_Kí_Ức_Remixx_KLICKAUD.mp3",
  },
  {
    id: 5,
    title: "Hongkong1",
    artist: "Sanji - Nguyen Trong Tai & Double X",
    cover: "https://duckhayangry.github.io/cdn/pictures/hongkong1.jpg",
    audioFile:
      "https://duckhayangry.github.io/cdn/music/Hongkong1_New_Version_-_Nguyễn_Trọng_Tài_San_Ji_Double_X_KLICKAUD.mp3",
  },
  {
    id: 6,
    title: "Ai Khoc Noi Dau Nay Remix",
    artist: "Bao Anh",
    cover: "https://duckhayangry.github.io/cdn/pictures/aikhocnoidaunay.jpg",
    audioFile: "https://duckhayangry.github.io/cdn/music/Ai_Khoc_Noi_Dau_Nay_KLICKAUD.mp3",
  },
  {
    id: 7,
    title: "The Other Side Of Paradise",
    artist: "Glass Animals",
    cover: "https://duckhayangry.github.io/cdn/pictures/theothersideofparadise.jpg",
    audioFile:
      "https://duckhayangry.github.io/cdn/music/The_other_side_of_paradise_-_glass_animals_sped_up_KLICKAUD.mp3",
  },
]

const formatTime = (seconds: number) => {
  if (!seconds || !isFinite(seconds)) return "0:00"
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export default function MusicPlayerUI() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedSongId, setSelectedSongId] = useState(1)
  const [currentTime, setCurrentTime] = useState("0:00")
  const [duration, setDuration] = useState("0:00")
  const [durations, setDurations] = useState<{ [key: number]: number }>({})
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const currentSong = playlist.find((song) => song.id === selectedSongId) || playlist[0]

  const playlistContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.45,
      },
    },
  }

  const playlistItemVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 220, damping: 18 },
    },
  }

  useEffect(() => {
    let isMounted = true
    const controllers = playlist.map((song) => {
      const audio = new Audio()
      audio.preload = "metadata"

      const handleLoadedMetadata = () => {
        if (!isMounted) return
        const songDuration = isFinite(audio.duration) ? audio.duration : 0
        setDurations((prev) => {
          if (prev[song.id] === songDuration) return prev
          return {
            ...prev,
            [song.id]: songDuration,
          }
        })
      }

      const handleError = () => {
        if (!isMounted) return
        setDurations((prev) => {
          if (prev[song.id] === 0) return prev
          return {
            ...prev,
            [song.id]: 0,
          }
        })
      }

      audio.addEventListener("loadedmetadata", handleLoadedMetadata)
      audio.addEventListener("error", handleError)
      audio.src = song.audioFile

      return {
        audio,
        handleLoadedMetadata,
        handleError,
      }
    })

    return () => {
      isMounted = false
      controllers.forEach(({ audio, handleLoadedMetadata, handleError }) => {
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
        audio.removeEventListener("error", handleError)
      })
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      if (isDragging || !audio.duration) return
      const percent = (audio.currentTime / audio.duration) * 100
      setProgress(percent)
      setCurrentTime(formatTime(audio.currentTime))
    }

    const handleLoadedMetadata = () => {
      if (!audioRef.current || !isFinite(audioRef.current.duration)) return
      const audioDuration = audioRef.current.duration
      setDurations((prev) => ({
        ...prev,
        [selectedSongId]: audioDuration,
      }))
      setDuration(formatTime(audioDuration))
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
    }
  }, [isDragging, selectedSongId])

  useEffect(() => {
    if (!audioRef.current) return
    const audio = audioRef.current
    audio.src = currentSong.audioFile

    if (isPlaying) {
      audio.play()
    } else {
      audio.pause()
    }
  }, [isPlaying, currentSong])

  useEffect(() => {
    if (durations[selectedSongId]) {
      setDuration(formatTime(durations[selectedSongId]))
    } else {
      setDuration("0:00")
    }
  }, [durations, selectedSongId])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleSongEnd = () => {
      const currentIndex = playlist.findIndex((song) => song.id === selectedSongId)
      const nextIndex = (currentIndex + 1) % playlist.length
      const nextSongId = playlist[nextIndex].id
      setSelectedSongId(nextSongId)
      setProgress(0)
      setCurrentTime("0:00")
    }

    audio.addEventListener("ended", handleSongEnd)

    return () => {
      audio.removeEventListener("ended", handleSongEnd)
    }
  }, [selectedSongId])

  const remainingTime = (() => {
    if (!audioRef.current || !audioRef.current.duration) return "0:00"
    const remaining = audioRef.current.duration - audioRef.current.currentTime
    return `-${formatTime(remaining)}`
  })()

  const updateProgressFromRef = (ref: React.RefObject<HTMLDivElement | null>, clientX: number) => {
    if (!ref.current || !audioRef.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = (x / rect.width) * 100
    const newProgress = Math.max(0, Math.min(100, percentage))

    setProgress(newProgress)
    audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    updateProgressFromRef(progressRef, e.clientX)
  }

  const handleProgressDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    updateProgressFromRef(progressRef, e.clientX)
  }

  const handleSkipBack = () => {
    const currentIndex = playlist.findIndex((song) => song.id === selectedSongId)
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length
    setSelectedSongId(playlist[prevIndex].id)
    setProgress(0)
    setCurrentTime("0:00")
  }

  const handleSkipForward = () => {
    const currentIndex = playlist.findIndex((song) => song.id === selectedSongId)
    const nextIndex = (currentIndex + 1) % playlist.length
    setSelectedSongId(playlist[nextIndex].id)
    setProgress(0)
    setCurrentTime("0:00")
  }

  return (
    <>
      <audio ref={audioRef} />

      <DynamicIsland
        currentSong={
          isPlaying && selectedSongId
            ? {
                id: currentSong.id,
                title: currentSong.title,
                artist: currentSong.artist,
                artwork: currentSong.cover,
                duration: audioRef.current?.duration || 0,
                progress: progress,
                isPlaying: isPlaying,
              }
            : null
        }
        isPlaying={isPlaying}
        onPlayStateChange={(state) => setIsPlaying(state)}
      />

      <motion.div
        className="glass-anime relative w-full max-w-2xl md:max-w-4xl lg:max-w-5xl rounded-3xl overflow-hidden shadow-2xl mt-20 sm:mt-28 md:mt-32 mx-auto"
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 0.6,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff2d8f]/15 via-transparent to-[#ff9ad5]/10 pointer-events-none" />

        <div className="relative z-10 p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Music2 className="w-8 h-8 text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d8f] to-[#ff9ad5] flex-shrink-0" />
            <span className="text-2xl font-bold bg-gradient-to-r from-[#ff2d8f] via-[#ff8ec7] to-[#ffd5ec] bg-clip-text text-transparent font-sans">
              {/* music box */}
            </span>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Section */}
            <div className="flex flex-col items-center w-full lg:w-[360px] lg:flex-shrink-0">
              {/* Album Art */}
              <motion.div
                className="relative w-full max-w-xs lg:w-[320px] lg:h-[320px]"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 140,
                  damping: 14,
                  delay: 0.15,
                }}
              >
                <div className="relative w-full h-full rounded-[28px] overflow-hidden border border-white/80 shadow-[0_25px_70px_rgba(255,0,150,0.35)]">
                  <motion.img
                    src={currentSong.cover || "/placeholder.svg"}
                    alt="Album Art"
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-80 mix-blend-screen" />
                </div>
                <div className="pointer-events-none absolute -inset-5 bg-[conic-gradient(from_180deg_at_50%_50%,#ff8dc4,#ff3fa3,#ffb1d7,#ff8dc4)] opacity-30 blur-[60px]" />
              </motion.div>

              {/* Song Info */}
              <motion.div
                className="glass-anime-light rounded-2xl p-6 mt-6 w-full max-w-xs"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: 0.3,
                }}
              >
                <div className="mb-4">
                  <h3 className="font-semibold text-base text-white line-clamp-2">{currentSong.title}</h3>
                  <p className="text-[#ffb2da] text-sm mt-1">{currentSong.artist}</p>
                </div>

                {/* Progress */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-white text-xs font-mono">{currentTime}</span>
                  <div
                    ref={progressRef}
                    className="flex-1 h-1.5 bg-white/10 rounded-full cursor-pointer relative group"
                    onClick={handleProgressClick}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onMouseMove={handleProgressDrag}
                    onMouseLeave={() => setIsDragging(false)}
                  >
                    <motion.div
                    className="h-full bg-gradient-to-r from-[#ff2d8f] to-[#ff9ad5] rounded-full"
                      style={{ width: `${progress}%` }}
                      transition={{ type: "tween", duration: 0.1 }}
                    />
                    <motion.div
                      // className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#ffd4ec] rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-[#ff7fc1]/40"
                      style={{ left: `${progress}%`, transform: "translate(-50%, -50%)" }}
                    />
                  </div>
                  <span className="text-white text-xs font-mono">{remainingTime}</span>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between gap-2">
                  <motion.button
                  className="text-[#ff9ad5] hover:text-[#ff9ad5]/80 transition-colors p-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Star className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    onClick={handleSkipBack}
                    className="text-[#ff9ad5] hover:text-[#ff9ad5]/80 transition-colors p-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <SkipBack className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-gradient-to-r from-[#ff2d8f] to-[#ff9ad5] text-white rounded-full p-3 flex-shrink-0 shadow-lg shadow-[#ff3fa3]/40"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                  </motion.button>
                  <motion.button
                    onClick={handleSkipForward}
                    className="text-[#ff9ad5] hover:text-[#ff9ad5]/80 transition-colors p-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <SkipForward className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    className="text-[#ff9ad5] hover:text-[#ff9ad5]/80 transition-colors p-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Repeat className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Right Section - Queue */}
            <motion.div
              className="flex-1 flex flex-col w-full"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.4,
              }}
            >
              <div className="h-64 sm:h-72 md:h-80 lg:h-[320px] overflow-y-auto scrollbar-hidden glass-anime-light rounded-2xl p-4">
                <motion.div
                  className="space-y-2 pr-2"
                  initial="hidden"
                  animate="visible"
                  variants={playlistContainerVariants}
                >
                  {playlist.map((song) => (
                    <motion.div
                      key={song.id}
                      layout
                      variants={playlistItemVariants}
                      onClick={() => {
                        setSelectedSongId(song.id)
                        setIsPlaying(true)
                      }}
                      className={`flex items-center gap-3 p-3 rounded-2xl transition-all cursor-pointer group ${
                        selectedSongId === song.id
                          // ? "bg-white/10 ring-1 ring-[#ff58ad] shadow-[0_10px_30px_rgba(255,0,150,0.25)]"
                          // : "bg-white/5 hover:bg-white/10"
                      }`}
                      whileHover={{
                        scale: 1.03,
                        x: 10,
                        boxShadow: "0 18px 40px rgba(255,0,150,0.35)",
                      }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <motion.img
                        src={song.cover || "/placeholder.svg"}
                        alt={song.title}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        whileHover={{ scale: 1.15, rotate: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium text-sm truncate">{song.title}</h4>
                        <p className="text-[#ffb6dd]/80 text-xs truncate">{song.artist}</p>
                      </div>
                      <span className="text-[#ff9fd6] text-xs font-mono flex-shrink-0">
                        {formatTime(durations[song.id] || 0)}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              <div className="mt-8 text-center text-[11px] space-y-1 lg:mt-auto animate-gradient bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
  <p className="tracking-[0.4em] uppercase text-xs">Aurora Soundspace</p>

  <p>© 2025 — Crafted for a refined and immersive audio journey.</p>

  <p>Powered by Next.js, Framer Motion, and an enduring passion for music.</p>

  <p className="pt-2">
    <a 
      href="https://www.facebook.com/100018060940124" 
      target="_blank" 
      rel="noopener noreferrer"
      className="hover:text-white/90 transition"
    >
      Made by Viet Anh • Facebook
    </a>
  </p>
</div>

            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
