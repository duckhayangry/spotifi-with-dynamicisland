"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DynamicIslandProps {
  currentSong: {
    id: number
    title: string
    artist: string
    artwork: string
    duration: number
    progress: number
    isPlaying: boolean
  } | null
  isPlaying: boolean
  onPlayStateChange: (state: boolean) => void
}

interface MessengerNotification {
  id: string
  sender: {
    name: string
    avatar: string
  }
  message: string
  timestamp: number
}

const MESSENGER_MESSAGES = [
  "Chị đang làm gì đó ạ? 😳",
  "Em nhớ nụ cười của chị quá 🥰",
  "Hôm nay chị ăn gì chưa ạ? 😅",
  "Chị rảnh không? Em muốn gặp chị chút thôi 💖",
  "Nghe nói hôm nay trời đẹp… mình đi chơi đi ạ 🌸",
  "Em vừa nghĩ đến chị thôi 😘",
  "Em có thể nhắn tin với chị cả ngày không? 😳",
  "Chị ngủ ngon nha, mơ thấy em đó 💤",
  "Em đang chờ chị đấy… nôn nóng quá 😏",
  "Chị có biết em thích chị nhiều thế nào không? 💗",
  "Chị cười xinh quá… làm tim em đập nhanh luôn 😳",
  "Hôm nay chị mặc gì mà đẹp thế nè? 🥰",
  "Em muốn ôm chị ngay bây giờ 😏",
  "Chị có nhớ em không? 💌",
  "Em vừa nghe bài hát và nghĩ đến chị luôn 🎵",
  "Chị có muốn em đi đón không? 😘",
  "Em nhớ giọng nói của chị quá… 😳",
  "Mình đi ăn kem đi, em mời chị nhé 🍦",
  "Chị ngủ dậy rồi à? Em nhớ quá 🥰",
  "Hôm nay chị gặp chuyện gì vui không? 😏",
  "Em muốn nghe chị kể chuyện cả ngày 💖",
  "Chị thích màu gì nhất? Em muốn tặng chị 🌸",
  "Em đang lén nhìn ảnh chị nè 😳",
  "Đêm nay mơ thấy em không? 💤",
  "Em muốn nắm tay chị thôi 😏",
  "Chị cười nữa đi… làm em ngất mất 🥰",
  "Em sẽ bảo vệ chị mỗi khi chị buồn 💌",
  "Chị thích đi đâu nhất? Mình đi cùng nhau nhé 😘",
  "Em vừa nghĩ đến chị và đỏ mặt rồi 😳",
  "Em yêu cách chị làm em cười mỗi ngày 💖",
]

const MESSENGER_CONTACTS = [
  {
    name: "Vuong Viet Anh",
    avatar:
      "https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-1/545977378_1780614972550517_9183803102386982739_n.jpg?stp=dst-jpg_p160x160_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeEr8zt_ngC4RQ2YJrxjHK9_HexG_fSxq3Ad7Eb99LGrcM6ontLHyXgoI-cQ7-Kw-0X42Yw0NKpi_BtRWKV21zZ2&_nc_ohc=jFEk-OkJW0oQ7kNvwF23Wg9&_nc_oc=AdmSC7mzjcfPXCHi6lcaz0JSbbL1zhRZqR0LANIxjvfuFtYxCCxD4yCLZQ-QkAVC0Xk&_nc_zt=24&_nc_ht=scontent.fdad3-4.fna&_nc_gid=FWoaKost4bvK_4k5w2fOVg&oh=00_Afg1S9xT1DM7Xx33p2CqMNtf8jkwwRnC4cXd2gw7NsUEqA&oe=692BA988",
  },
]

const formatTime = (value?: number) =>
  value
    ? new Date(value).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : ""

const MessengerGlyph = () => (
  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 shadow-lg shadow-blue-400/40">
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-current">
      <path d="M12 3C7.03 3 3 7.03 3 12S7.03 22.5 12 22.5 22.5 17.8 22.5 12 17.8 3 12 3zm-1 13h-2v-4h2v4zm4 0h-2v-2h2v2z" />
    </svg>
  </span>
)

const SpotifyGlyph = () => (
  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#1db954] shadow-lg shadow-emerald-400/40">
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-black fill-current">
      <path d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12S6.2 22.5 12 22.5 22.5 17.8 22.5 12 17.8 1.5 12 1.5zm4.4 15.2a.9.9 0 0 1-1.2.3c-3.2-2-7.3-1.2-7.3-1.2a.9.9 0 0 1-.4-1.8c.2 0 4.6-.9 8.4 1.5a.9.9 0 0 1 .5 1.2zm1.7-3a1 1 0 0 1-1.3.4c-4.2-2.3-9.6-1.6-9.7-1.6a1 1 0 1 1-.4-2c.2 0 5.3-1.1 9.5 1.7a1 1 0 0 1 .6 1.3zm.1-3.2a1.1 1.1 0 0 1-1.5.4c-4.2-2.6-9.6-1.6-9.7-1.6a1.1 1.1 0 1 1-.4-2.2c.2 0 6.1-1.3 10.9 1.8a1.1 1.1 0 0 1 .7 1.6z" />
    </svg>
  </span>
)

const CameraLens = () => (
  <div className="w-6 h-6 rounded-full bg-black/70 border border-white/5 flex items-center justify-center shadow-inner shadow-black/80">
    <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-indigo-200 via-indigo-500 to-indigo-900 shadow-inner shadow-black/40" />
  </div>
)

const FaceIDIndicator = () => (
  <motion.div
    className="absolute -top-1 -left-1 w-2.5 h-2.5 rounded-full bg-red-500 shadow-lg shadow-red-500/70"
    animate={{
      opacity: [1, 1, 1, 1, 1, 1, 0.3, 0.3, 1],
    }}
    transition={{
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    }}
  />
)

export default function DynamicIsland({ currentSong, isPlaying, onPlayStateChange }: DynamicIslandProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [notifications, setNotifications] = useState<MessengerNotification[]>([])
  const [activeNotificationId, setActiveNotificationId] = useState<string | null>(null)
  const notificationIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isPlaying || currentSong) {
      if (notificationIntervalRef.current) clearTimeout(notificationIntervalRef.current)
      return
    }

    const scheduleNextNotification = () => {
      const delay = Math.random() * 9000 + 1000
      notificationIntervalRef.current = setTimeout(() => {
        const contact = MESSENGER_CONTACTS[Math.floor(Math.random() * MESSENGER_CONTACTS.length)]
        const newNotification: MessengerNotification = {
          id: Date.now().toString(),
          sender: contact,
          message: MESSENGER_MESSAGES[Math.floor(Math.random() * MESSENGER_MESSAGES.length)],
          timestamp: Date.now(),
        }
        setNotifications((prev) => [newNotification, ...prev].slice(0, 5))
        scheduleNextNotification()
      }, delay)
    }

    scheduleNextNotification()

    return () => {
      if (notificationIntervalRef.current) clearTimeout(notificationIntervalRef.current)
    }
  }, [isPlaying, currentSong])

  useEffect(() => {
    if (notifications.length === 0) setActiveNotificationId(null)
    if (isPlaying || currentSong) setActiveNotificationId(null)
  }, [notifications.length, isPlaying, currentSong])

  const shouldAutoCollapse = useMemo(
    () => !isPlaying && !currentSong && notifications.length === 0,
    [currentSong, isPlaying, notifications.length],
  )

  useEffect(() => {
    if (shouldAutoCollapse) setIsExpanded(false)
  }, [shouldAutoCollapse])

  const islandVariants = useMemo(
    () => ({
      collapsed: {
        scale: 0.98,
        boxShadow: "0 20px 50px rgba(10, 14, 39, 0.45)",
      },
      expanded: {
        scale: 1.02,
        boxShadow: "0 30px 80px rgba(10, 14, 39, 0.65)",
      },
    }),
    [],
  )

  const islandTransition = useMemo(
    () => ({
      layout: { type: "spring" as const, stiffness: 260, damping: 32, mass: 1 },
      type: "spring" as const,
      stiffness: 210,
      damping: 24,
      mass: 0.9,
    }),
    [],
  )

  const collapsedState = useMemo(() => {
    if (isPlaying || currentSong) return "music"
    if (notifications.length > 0) return "messenger"
    return "idle"
  }, [isPlaying, notifications.length, currentSong])

  const containerWidth = useMemo(() => {
    if (isExpanded) return "w-[420px]"
    if (collapsedState === "music") return "w-96"
    if (collapsedState === "messenger") return "w-80"
    return "w-32"
  }, [collapsedState, isExpanded])

  const handleIslandClick = () => {
    setIsExpanded((prev) => !prev)
  }

  const handleMarkAsRead = (id?: string) => {
    const targetId = id ?? activeNotificationId
    if (!targetId) return
    setNotifications((prev) => {
      const filtered = prev.filter((msg) => msg.id !== targetId)
      if (filtered.length === 0) setIsExpanded(false)
      return filtered
    })
    setActiveNotificationId(null)
  }

  const handleReactMessage = (id: string) => {
    setNotifications((prev) => prev.filter((msg) => msg.id !== id))
    window.open("https://facebook.com/vanhzxje.2018", "_blank")
    setActiveNotificationId(null)
  }

  const handleReplyMessage = (id: string) => {
    setNotifications((prev) => prev.filter((msg) => msg.id !== id))
    window.open("https://facebook.com/vanhzxje.2018", "_blank")
    setActiveNotificationId(null)
  }

  const primaryNotification = notifications[0]
  const activeNotification = notifications.find((msg) => msg.id === activeNotificationId) ?? null

  const renderCollapsedContent = () => {
    if ((isPlaying || currentSong) && currentSong) {
      return (
        <div className="flex items-center gap-3 w-full">
          <SpotifyGlyph />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">Spotify</p>
            <p className="text-white text-xs font-semibold truncate">{currentSong.title}</p>
          </div>
          <img
            src={currentSong.artwork || "/placeholder.svg"}
            alt={currentSong.title}
            className="w-9 h-9 rounded-xl object-cover ring-2 ring-white/20"
          />
          <div className="hidden sm:flex ml-1 items-end gap-0.5">
            <div className="w-0.5 h-3 bg-white/70 rounded-full animate-pulse" />
            <div className="w-0.5 h-4 bg-white/50 rounded-full" />
            <div className="w-0.5 h-2.5 bg-white/70 rounded-full animate-pulse" />
          </div>
        </div>
      )
    }

    if (collapsedState === "messenger" && primaryNotification) {
      return (
        <div className="flex items-center w-full gap-3">
          <div className="flex items-center gap-2">
            <MessengerGlyph />
            <div className="flex flex-col leading-tight">
              <span className="text-white text-sm font-semibold">Messenger</span>
              <span className="text-white/60 text-[11px]">{primaryNotification.sender.name}</span>
            </div>
          </div>
          <span className="ml-auto text-blue-500 text-xs font-semibold">
            {notifications.length} New Message{notifications.length > 1 ? "s" : ""}
          </span>
          <div className="ml-2 relative">
            <FaceIDIndicator />
            <CameraLens />
          </div>
        </div>
      )
    }

    return (
      <div className="flex items-center gap-3 w-full">
        <span className="text-transparent text-xs select-none">.</span>
        <div className="ml-auto relative">
          <FaceIDIndicator />
          <CameraLens />
        </div>
      </div>
    )
  }

  const renderNowPlaying = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SpotifyGlyph />
          <div>
            <p className="text-white font-semibold text-base">Spotify</p>
            <p className="text-white/60 text-xs uppercase tracking-[0.4em]">Now Playing</p>
          </div>
        </div>
        <span className="text-white/60 text-xs">LIVE</span>
      </div>

      <div className="flex items-start gap-4">
        <img
          src={currentSong?.artwork || "/placeholder.svg"}
          alt={currentSong?.title}
          className="w-24 h-24 rounded-2xl object-cover shadow-lg ring-2 ring-white/10"
        />
        <div className="flex-1 min-w-0 space-y-2">
          <h3 className="text-white font-semibold text-lg truncate">{currentSong?.title}</h3>
          <p className="text-white/60 text-sm">{currentSong?.artist}</p>
          <div className="space-y-2">
            <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1db954] transition-all duration-300"
                style={{ width: `${currentSong?.progress || 0}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-white/50">
              <span>{Math.floor(currentSong?.progress || 0)}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderNotificationList = () => {
    if (notifications.length === 0) return <div className="text-center text-white/60 text-sm py-6">No new messages</div>

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessengerGlyph />
            <div>
              <p className="text-white font-semibold text-base">Messenger</p>
              <p className="text-white/60 text-xs tracking-[0.4em] uppercase">Meta</p>
            </div>
          </div>
          <span className="text-white/60 text-xs">{notifications.length} new</span>
        </div>

        <div className="space-y-2">
          {notifications.map((notification) => (
            <button
              key={notification.id}
              onClick={(e) => {
                e.stopPropagation()
                setActiveNotificationId(notification.id)
              }}
              className="w-full flex items-center gap-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors px-4 py-3 text-left"
            >
              <Avatar className="w-9 h-9 flex-shrink-0">
                <AvatarImage src={notification.sender.avatar || "/placeholder.svg"} />
                <AvatarFallback>{notification.sender.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-white text-sm font-semibold truncate">{notification.sender.name}</p>
                  <span className="text-white/40 text-[11px]">{formatTime(notification.timestamp)}</span>
                </div>
                <p className="text-white/70 text-xs truncate">{notification.message}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const renderNotificationDetail = () => {
    if (!activeNotification) return renderNotificationList()

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setActiveNotificationId(null)
            }}
            className="text-white/60 text-xs font-semibold tracking-[0.2em] uppercase hover:text-white transition-colors"
          >
            Back
          </button>
          <span className="text-white/60 text-xs">{formatTime(activeNotification.timestamp)}</span>
        </div>

        <div className="flex items-center gap-3">
          <Avatar className="w-11 h-11 flex-shrink-0">
            <AvatarImage src={activeNotification.sender.avatar || "/placeholder.svg"} />
            <AvatarFallback>{activeNotification.sender.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-white font-semibold">{activeNotification.sender.name}</p>
            <p className="text-white/60 text-sm">Messenger</p>
          </div>
        </div>

        <div className="bg-white/10 rounded-2xl p-4 text-white text-sm leading-relaxed shadow-inner shadow-black/30">
          {activeNotification.message}
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleReplyMessage(activeNotification.id)
            }}
            className="rounded-2xl border border-blue-500 text-blue-500 py-2 text-sm font-semibold hover:bg-blue-500/10 transition-colors"
          >
            Reply
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleReactMessage(activeNotification.id)
            }}
            className="rounded-2xl border border-white/20 text-white py-2 text-sm font-semibold hover:bg-white/10 transition-colors"
          >
            React
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleMarkAsRead(activeNotification.id)
            }}
            className="rounded-2xl border border-white/10 text-white/70 py-2 text-sm font-semibold hover:bg-white/5 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <motion.div
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-2 w-full max-w-[90vw] sm:max-w-none"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, type: "spring", stiffness: 120, damping: 15 }}
      >
        <motion.div
          layout
          initial={false}
          onClick={handleIslandClick}
          variants={islandVariants}
          animate={isExpanded ? "expanded" : "collapsed"}
          className={`relative cursor-pointer glass-anime ${containerWidth} ${isExpanded ? "min-h-[150px] rounded-[36px] p-4 sm:p-5" : "h-12 rounded-full px-4 sm:px-5"} flex items-center mx-auto w-full max-w-[400px] sm:max-w-fit`}
          transition={islandTransition}
          whileTap={{ scale: isExpanded ? 0.99 : 0.95 }}
        >
          {!isExpanded ? (
            renderCollapsedContent()
          ) : (
            <div className="w-full space-y-4">
              <div className="flex justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsExpanded(false)
                  }}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {isPlaying || currentSong
                ? renderNowPlaying()
                : activeNotification
                  ? renderNotificationDetail()
                  : renderNotificationList()}
            </div>
          )}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
