import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Home from './pages/Home';
import Search from './pages/Search';
import LikedSongs from './pages/LikedSongs';
import { PlayerProvider } from './contexts/PlayerContext';
import { PlaylistProvider } from './contexts/PlaylistContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthModal from './components/modals/AuthModal';
import CreatePlaylistModal from './components/modals/CreatePlaylistModal';
import AddToPlaylistModal from './components/modals/AddToPlaylistModal';
import { LogOut, User, Search as SearchIcon, Music, Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { UIProvider, useUI } from './contexts/UIContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { openAuth } = useUI();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showDrop, setShowDrop] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch suggestions when query changes (debounced 350ms)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      setShowDrop(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setSuggestions((data.results || []).slice(0, 6));
        setShowDrop(true);
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 350);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDrop(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      setShowDrop(false);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
    if (e.key === 'Escape') setShowDrop(false);
  };

  const handleSelect = (s: any) => {
    setQuery(s.title);
    setShowDrop(false);
    navigate(`/search?q=${encodeURIComponent(s.title)}`);
  };

  return (
    <header className="h-16 flex items-center justify-between px-8 bg-dark-900/80 backdrop-blur-md sticky top-0 z-40 border-b border-white/5">
      <div className="flex items-center gap-4">
        <div className="relative w-80" ref={containerRef}>
          {/* Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
            onFocus={() => suggestions.length > 0 && setShowDrop(true)}
            placeholder="Search for songs, artists, AI moods..."
            className="w-full bg-dark-800 border border-white/10 rounded-full py-2 px-4 pl-10 pr-10 text-sm focus:outline-none focus:border-primary-500 transition-colors placeholder:text-gray-500"
          />
          {/* Left search icon */}
          <SearchIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
          {/* Loading spinner */}
          {loading && <Loader2 className="absolute right-3 top-2.5 w-4 h-4 text-primary-400 animate-spin" />}

          {/* Suggestions Dropdown */}
          {showDrop && suggestions.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-dark-800 border border-white/10 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {suggestions.map((s, i) => (
                <button
                  key={s.id || i}
                  onMouseDown={() => handleSelect(s)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors text-left group"
                >
                  {/* Thumbnail */}
                  <div className="w-9 h-9 rounded-md overflow-hidden flex-shrink-0 bg-dark-700">
                    {s.img ? (
                      <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Music size={16} className="text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate group-hover:text-primary-400 transition-colors">{s.title}</p>
                    <p className="text-xs text-gray-400 truncate">{s.artist}</p>
                  </div>
                  <SearchIcon size={12} className="text-gray-600 flex-shrink-0" />
                </button>
              ))}
              {/* View all results */}
              <button
                onMouseDown={() => { setShowDrop(false); navigate(`/search?q=${encodeURIComponent(query)}`); }}
                className="w-full px-4 py-3 text-xs font-semibold text-primary-400 hover:text-white hover:bg-primary-500/10 transition-colors text-center border-t border-white/5"
              >
                See all results for "{query}"
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-dark-800 rounded-full py-1.5 px-3 border border-white/10">
              <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
                <User size={14} className="text-white" />
              </div>
              <span className="text-sm font-semibold text-white mr-2">{user}</span>
            </div>
            <button onClick={logout} className="text-gray-400 hover:text-white transition-colors" title="Log out">
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <>
            <button onClick={() => openAuth('signup')} className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">
              Sign Up
            </button>
            <button onClick={() => openAuth('login')} className="bg-white text-black text-sm font-bold py-2 px-6 rounded-full hover:scale-105 transition-transform">
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
};

// ── Login Gate Overlay ─────────────────────────────────────────────────────
const LoginGate = ({ onOpen }: { onOpen: () => void }) => (
  <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 backdrop-blur-sm">
    <div className="glass-card p-10 m-4 max-w-sm w-full text-center shadow-2xl shadow-primary-500/10">
      <div className="w-16 h-16 rounded-full bg-primary-500/20 flex items-center justify-center mx-auto mb-6">
        <User size={32} className="text-primary-400" />
      </div>
      <h2 className="text-2xl font-black text-white mb-2">Sign in to PulseBeat</h2>
      <p className="text-gray-400 text-sm mb-8">You need to be logged in to play songs, like tracks, and create playlists.</p>
      <button
        onClick={onOpen}
        className="w-full bg-primary-500 hover:bg-primary-400 text-white font-bold py-3 rounded-full transition-colors shadow-lg shadow-primary-500/30"
      >
        Log In or Sign Up
      </button>
    </div>
  </div>
);

// ── Inner App (needs Router context for useNavigate) ─────────────────────
function AppInner() {
  const { login } = useAuth();
  const { 
    openAuth, 
    openAddToPlaylist, 
    requireAuth,
    _showAuth, _closeAuth, _authType,
    _showLoginGate,
    _showCreatePlaylist, _closeCreatePlaylist,
    _showAddToPlaylist, _closeAddToPlaylist, _trackToAdd
  } = useUI();

  return (
    <>
      <div className="flex h-screen bg-dark-900 overflow-hidden text-white font-sans relative">
        {/* Animated Background blobs */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-500/10 blur-[120px] animate-blob pointer-events-none" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent-500/10 blur-[120px] animate-blob pointer-events-none" style={{ animationDelay: '2s' }} />

        <Sidebar />

        <main className="flex-1 flex flex-col h-full relative z-10">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home openAddToPlaylist={openAddToPlaylist} requireAuth={requireAuth} />} />
            <Route path="/search" element={<Search openAddToPlaylist={openAddToPlaylist} requireAuth={requireAuth} />} />
            <Route path="/liked-songs" element={<LikedSongs openAddToPlaylist={openAddToPlaylist} />} />
          </Routes>
        </main>

        <Player requireAuth={requireAuth} />
      </div>

      {/* Login Gate */}
      {_showLoginGate && <LoginGate onOpen={() => openAuth('login')} />}

      <AuthModal
        isOpen={_showAuth}
        onClose={_closeAuth}
        type={_authType}
        onLogin={login}
      />
      <CreatePlaylistModal isOpen={_showCreatePlaylist} onClose={_closeCreatePlaylist} />
      <AddToPlaylistModal
        isOpen={_showAddToPlaylist}
        onClose={_closeAddToPlaylist}
        track={_trackToAdd}
      />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <UIProvider>
        <PlaylistProvider>
          <PlayerProvider>
            <Router>
              <AppInner />
            </Router>
          </PlayerProvider>
        </PlaylistProvider>
      </UIProvider>
    </AuthProvider>
  );
}

export default App;
