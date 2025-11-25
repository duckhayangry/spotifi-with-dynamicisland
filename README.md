# Spotify Modal Clone with iOS Dynamic Island

A modern Spotify-inspired music player with an iOS-style Dynamic Island component. Built with Next.js, React, and Framer Motion.

## Features

- **Spotify-style Glass Modal**: Beautiful music player interface with glass morphism effects
- **iOS Dynamic Island**: Notifications and music display in a dynamic pill-shaped component
- **Messenger-style Notifications**: Random notifications from "Vương Việt Anh" when idle
- **Real-time Music Playback**: Select songs from the playlist and see them displayed in the Dynamic Island
- **Smooth Animations**: All transitions and interactions use minimal, optimized animations

## Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Setup Instructions

#### Windows

1. **Clone the repository:**
   \`\`\`bash
   git clone <repository-url>
   cd v0-spotify-modal-clone
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open in browser:**
   - Open [http://localhost:3000](http://localhost:3000) in your web browser

#### macOS

1. **Clone the repository:**
   \`\`\`bash
   git clone <repository-url>
   cd v0-spotify-modal-clone
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open in browser:**
   - Open [http://localhost:3000](http://localhost:3000) in your web browser

#### Linux

1. **Clone the repository:**
   \`\`\`bash
   git clone <repository-url>
   cd v0-spotify-modal-clone
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open in browser:**
   - Open [http://localhost:3000](http://localhost:3000) in your web browser

## Usage

### Music Player

- **Select a Song**: Click on any song in the playlist to select it
- **Play/Pause**: Click the play button to start/pause playback
- **Progress Bar**: Click or drag on the progress bar to seek
- **Skip**: Use skip buttons to navigate through the playlist

### Dynamic Island

- **Music Mode**: When music is playing, the Dynamic Island displays the currently playing song with artwork, title, artist, and progress bar
- **Messenger Mode**: When no music is playing, random Messenger-style notifications appear every 1-10 seconds
- **Click to Expand**: Click the Dynamic Island to expand and see more details
- **View Messages**: Click a notification to view the full message from "Vương Việt Anh"

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx              # Main page component
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── dynamic-island.tsx    # iOS Dynamic Island component
│   ├── music-player-ui.tsx   # Spotify modal player
│   └── theme-provider.tsx    # Theme configuration
├── public/
│   ├── album artwork files
│   └── background images
└── package.json              # Dependencies

\`\`\`

## Technologies Used

- **Next.js 15+**: React framework for production
- **React 19**: JavaScript library for building UI
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for smooth transitions
- **Lucide React**: Icon library

## Building for Production

\`\`\`bash
npm run build
npm run start
\`\`\`

## Deployment

This project is configured for deployment on **Vercel**:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically deploy on every push

## Features in Detail

### Dynamic Island Component

- **Real FaceID Indicator**: Red blinking indicator light that mimics iOS devices
- **State Management**: Automatically switches between music and messaging modes
- **Messenger Notifications**: Random messages from "Vương Việt Anh" appear when idle
- **Click-to-Open Messages**: Expand notification details with smooth animations
- **Music Display**: Shows currently playing song with artwork, title, artist, and progress bar
- **Optimized Performance**: Uses efficient interval management and hardware-accelerated animations

### Spotify Music Player

- **Glass Morphism Design**: Beautiful frosted glass effect
- **Interactive Playlist**: Clickable songs with hover effects
- **Real-time Progress**: Draggable progress bar with smooth updates
- **Album Artwork**: Large album art display with animations
- **Player Controls**: Play, pause, skip, and repeat functionality

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

This project is open source and available under the MIT License.

## Support

For issues or feature requests, please open an issue on GitHub or contact through the Vercel dashboard.
