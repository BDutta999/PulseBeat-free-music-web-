<div align="center">

# 🎵 PulseBeat

**A premium, AI-powered music streaming platform.**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[Features](#-features) • [Architecture](#-architecture) • [Getting Started](#-getting-started) • [Tech Stack](#-tech-stack)

</div>

---

## 🌟 Overview

PulseBeat is a high-fidelity, modern music streaming application designed to offer a seamless and premium listening experience. Built with a React (Vite) frontend and an Express (Node.js) backend, it features real-time search for mainstream music and a custom streaming proxy to ensure reliable, high-quality playback of full-length tracks. 

---

## ✨ Features

- 🎧 **Real Famous Songs:** Powered by a robust YouTube-backed search engine.
- 🚀 **Stable Playback:** Custom backend proxy bypassing DRM/playback restrictions.
- 📱 **Full-Screen Player:** Immersive "Now Playing" overlay featuring blurred album art and rich, expanded controls.
- ❤️ **Liked Songs System:** Add favorites, view a Spotify-style table of liked tracks, and track your likes with sidebar badges.
- 🔒 **Per-User Data Isolation:** Playlists and liked songs are scoped exclusively to the logged-in user.
- 🚪 **Login Enforcement:** Secure your experience—playing or liking music requires an active session.
- 🔍 **Search Suggestions:** Debounced dropdown in the navbar for live results as you type.
- 📝 **Functional Playlists:** Dynamic modal system to create and manage custom playlists.
- 🔑 **Social Sign-up Only:** Premium authentication UI restricted to Google and Apple accounts.

---

## 🏗 Architecture

### Frontend
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS, custom glassmorphism, vanilla CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

**State Management (Context API):**
- `PlayerContext`: Manages audio playback state.
- `PlaylistContext`: Handles user-specific playlists and liked tracks (persisted via localStorage).
- `AuthContext`: Controls user sessions and data persistence.
- `UIContext`: Centralizes modal and UI state management.

### Backend
- **Server:** Express (Node.js)
- **Search & Streaming:** `youtube-search-api`, `youtube-dl-exec` (yt-dlp)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/PulseBeat.git
   cd PulseBeat
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   # Start the backend server
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   # Start the frontend development server
   npm run dev
   ```

4. **Enjoy the Music!**
   Open `http://localhost:5173` (or the port specified by Vite) in your browser.

---

## 🛠 Tech Stack Details

- **Frontend:** React, Vite, Framer Motion, Tailwind CSS, Lucide React
- **Backend:** Node.js, Express, yt-dlp, youtube-search-api
- **Database:** Local Storage (Supabase integration planned for the future)

---

<div align="center">
  <i>Built with ❤️ for music lovers.</i>
</div>
