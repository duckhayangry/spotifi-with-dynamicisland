# Spotify Modal Clone with iOS Dynamic Island

A modern, polished Spotify-inspired music player featuring an iOS-style Dynamic Island experience. Built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

* **Spotify-styled Glass Modal** — Clean, frosted-glass UI with smooth transitions.
* **iOS Dynamic Island Simulation** — Adaptive pill-shaped component that reacts to music and notifications.
* **Messenger-style Notifications** — Random messages from “Vương Việt Anh” appear when the player is idle.
* **Interactive Music Playback** — Select, play, pause, skip, and seek songs in real time.
* **Framer Motion Animations** — Optimized, minimal-overhead animations for a fluid experience.

---

## Installation

### Prerequisites

* Node.js 18+
* npm or yarn

### Clone & Setup

```bash
git clone [<repository-url>](https://github.com/duckhayangry/spotifi-with-dynamicisland.git)
cd v0-spotify-modal-clone
npm install
npm run dev
```

Visit the app at: **[http://localhost:3000](http://localhost:3000)**

The steps above work on **Windows, macOS, and Linux**.

---

## Usage

### Music Player

* Click a song to select and play.
* Use play/pause and skip buttons for navigation.
* Drag or click the progress bar to seek.
* Hover interactions provide visual feedback.

### Dynamic Island

* **Music Mode:** Displays artwork, title, artist, and playback progress.
* **Messenger Mode:** Idle state triggers randomized notifications.
* **Expandable:** Click to open detailed views.
* **Message Viewer:** Open to read full messages from “Vương Việt Anh”.

---

## Project Structure

```
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── dynamic-island.tsx
│   ├── music-player-ui.tsx
│   └── theme-provider.tsx
├── public/
│   ├── album artwork
│   └── backgrounds
└── package.json
```

---

## Technologies

* **Next.js 15+**
* **React 19**
* **TypeScript**
* **Tailwind CSS**
* **Framer Motion**
* **Lucide React**

---

## Production Build

```bash
npm run build
npm run start
```

---

## Deployment (Vercel)

1. Push the project to GitHub.
2. Connect the repository to Vercel.
3. Vercel automatically builds and deploys on every push.

---

## Feature Breakdown

### Dynamic Island

* FaceID-style red blinking indicator.
* Automatic mode switching based on playback status.
* Randomized Messenger notifications in idle.
* Smooth expand/collapse transitions.
* Efficient intervals and hardware-accelerated animations.

### Spotify-style Player

* Frosted-glass visual style.
* Interactive playlist with hover effects.
* Real-time progress syncing.
* Animated album artwork.
* Full control set: play, pause, skip, repeat.

---

## Browser Support

* Chrome / Edge (latest)
* Firefox (latest)
* Safari (latest)

---

## License

Released under the **MIT License**.

## Support

For issues or feature requests, open an issue on GitHub or contact via the Vercel dashboard.
