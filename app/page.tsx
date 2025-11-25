// app/page.tsx
import MusicPlayerUIClient from "@/components/MusicPlayerUIClient"
import SakuraClient from "@/components/SakuraClient"

export const dynamic = "force-static" // <- bắt buộc để Next.js xuất HTML tĩnh

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-2 sm:p-4 bg-[radial-gradient(circle_at_top,_#ff5f9e_0%,_#2a0c3c_55%,_#080515_100%)]">
      <SakuraClient />
      <MusicPlayerUIClient />
    </main>
  )
}
