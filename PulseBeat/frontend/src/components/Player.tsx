import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat, Shuffle, Maximize2, ChevronDown, Heart } from 'lucide-react';
import { usePlayer } from '../contexts/PlayerContext';
import { usePlaylists } from '../contexts/PlaylistContext';

const Player = ({ requireAuth }: { requireAuth: (action: () => void) => void }) => {
  const { currentTrack, isPlaying, progress, duration, volume, togglePlay, seek, setVolumeLevel } = usePlayer();
  const { toggleLike, isLiked } = usePlaylists();
  const [fullscreen, setFullscreen] = useState(false);

  const handleTogglePlay = () => requireAuth(togglePlay);
  const handleLike = () => { if (currentTrack) requireAuth(() => toggleLike(currentTrack)); };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolumeLevel(Number(e.target.value));
  };

  const progressPct = `${(progress / (duration || 1)) * 100}%`;

  if (!currentTrack) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-24 glass-panel border-t border-white/10 z-50 px-4 md:px-6 flex items-center justify-center text-gray-500 text-sm">
        Select a track to start listening
      </div>
    );
  }

  return (
    <>
      {/* ── Full-screen Now Playing overlay ── */}
      <div
        className={`fixed inset-0 z-[200] flex flex-col items-center justify-center transition-all duration-500 ease-in-out
          ${fullscreen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-4'}`}
        style={{
          background: 'linear-gradient(160deg, #0f0c29 0%, #1a0633 50%, #24243e 100%)',
        }}
      >
        {/* Background album art blur */}
        <div
          className="absolute inset-0 opacity-20 blur-3xl scale-110"
          style={{ backgroundImage: `url(${currentTrack.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />

        {/* Close button */}
        <button
          onClick={() => setFullscreen(false)}
          className="absolute top-6 left-6 text-white/60 hover:text-white transition-colors flex items-center gap-2"
        >
          <ChevronDown size={28} />
          <span className="text-sm font-medium">Now Playing</span>
        </button>

        {/* Album art */}
        <div className="relative z-10 w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-2xl shadow-black/60 mb-10 ring-1 ring-white/10">
          <img src={currentTrack.img} alt={currentTrack.title} className="w-full h-full object-cover" />
          {/* vinyl-like animated ring when playing */}
          {isPlaying && (
            <div className="absolute inset-0 rounded-2xl border-4 border-primary-500/30 animate-spin" style={{ animationDuration: '8s' }} />
          )}
        </div>

        {/* Track info */}
        <div className="relative z-10 text-center mb-8 px-4">
          <h2 className="text-3xl font-black text-white mb-2 drop-shadow">{currentTrack.title}</h2>
          <p className="text-lg text-gray-300 font-medium">{currentTrack.artist}</p>
          {/* Like button in fullscreen */}
          <button
            onClick={handleLike}
            className={`mt-4 transition-all duration-300 hover:scale-110 ${
              isLiked(currentTrack.id) ? 'text-red-500' : 'text-white/40 hover:text-white'
            }`}
          >
            <Heart size={28} fill={isLiked(currentTrack.id) ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="relative z-10 w-full max-w-lg px-8 flex items-center gap-3 text-xs text-gray-400 mb-6 group">
          <span className="w-10 text-right">{formatTime(progress)}</span>
          <div className="flex-1 relative flex items-center h-5">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={progress}
              onChange={handleProgressChange}
              className="w-full absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-primary-400 rounded-full" style={{ width: progressPct }} />
            </div>
            <div
              className="w-4 h-4 bg-white rounded-full absolute top-1/2 -translate-y-1/2 -ml-2 shadow-lg pointer-events-none transition-opacity"
              style={{ left: progressPct }}
            />
          </div>
          <span className="w-10">{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="relative z-10 flex items-center gap-8 mb-10">
          <button className="text-white/50 hover:text-white transition-colors"><Shuffle size={22} /></button>
          <button className="text-white/70 hover:text-white transition-colors"><SkipBack size={30} /></button>
          <button
            onClick={handleTogglePlay}
            className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-xl shadow-primary-500/30"
          >
            {isPlaying ? <Pause size={26} /> : <Play size={26} className="ml-1" />}
          </button>
          <button className="text-white/70 hover:text-white transition-colors"><SkipForward size={30} /></button>
          <button className="text-white/50 hover:text-white transition-colors"><Repeat size={22} /></button>
        </div>

        {/* Volume */}
        <div className="relative z-10 flex items-center gap-3 text-gray-400 group">
          <button onClick={() => setVolumeLevel(volume === 0 ? 0.5 : 0)} className="hover:text-white transition-colors">
            {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <div className="w-32 relative flex items-center h-4">
            <input
              type="range" min={0} max={1} step={0.01} value={volume}
              onChange={handleVolumeChange}
              className="w-full absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full group-hover:bg-primary-400" style={{ width: `${volume * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Mini Player bar (bottom) ── */}
      <div className="fixed bottom-0 left-0 right-0 h-24 glass-panel border-t border-white/10 z-50 px-4 md:px-6 flex items-center justify-between">
        {/* Current Track Info */}
        <div className="flex items-center gap-4 w-1/4 min-w-[180px]">
          <div
            className="w-14 h-14 rounded-md overflow-hidden relative group cursor-pointer"
            onClick={() => setFullscreen(true)}
          >
            <img
              src={currentTrack.img}
              alt={currentTrack.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Maximize2 size={16} className="text-white" />
            </div>
          </div>
          <div className="hidden sm:block">
            <h4 className="text-sm font-semibold text-white hover:underline cursor-pointer line-clamp-1">{currentTrack.title}</h4>
            <p className="text-xs text-gray-400 hover:underline cursor-pointer line-clamp-1">{currentTrack.artist}</p>
          </div>
          {/* Heart button in mini bar */}
          <button
            onClick={handleLike}
            className={`ml-1 transition-all duration-300 hover:scale-125 ${
              isLiked(currentTrack.id) ? 'text-red-500' : 'text-gray-500 hover:text-white'
            }`}
          >
            <Heart size={18} fill={isLiked(currentTrack.id) ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex-1 max-w-2xl flex flex-col items-center gap-2">
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-white transition-colors"><Shuffle size={18} /></button>
            <button className="text-gray-400 hover:text-white transition-colors"><SkipBack size={24} /></button>
            <button
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
              onClick={handleTogglePlay}
            >
              {isPlaying ? <Pause size={20} className="ml-0" /> : <Play size={20} className="ml-1" />}
            </button>
            <button className="text-gray-400 hover:text-white transition-colors"><SkipForward size={24} /></button>
            <button className="text-gray-400 hover:text-white transition-colors"><Repeat size={18} /></button>
          </div>

          {/* Progress Bar */}
          <div className="w-full flex items-center gap-3 text-xs text-gray-400 group">
            <span className="w-8 text-right">{formatTime(progress)}</span>
            <div className="flex-1 relative flex items-center h-4">
              <input
                type="range" min={0} max={duration || 100} value={progress}
                onChange={handleProgressChange}
                className="w-full absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div className="w-full h-1.5 bg-dark-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-500 rounded-full group-hover:bg-primary-400 relative"
                  style={{ width: progressPct }}
                />
              </div>
              <div
                className="w-3 h-3 bg-white rounded-full absolute top-1/2 -translate-y-1/2 -ml-1.5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-md"
                style={{ left: progressPct }}
              />
            </div>
            <span className="w-8">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Extra Controls */}
        <div className="w-1/4 flex items-center justify-end gap-4 text-gray-400 hidden md:flex group">
          <button onClick={() => setVolumeLevel(volume === 0 ? 0.5 : 0)} className="hover:text-white transition-colors">
            {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <div className="w-24 relative flex items-center h-4">
            <input
              type="range" min={0} max={1} step={0.01} value={volume}
              onChange={handleVolumeChange}
              className="w-full absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            <div className="w-full h-1.5 bg-dark-700 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full group-hover:bg-primary-400" style={{ width: `${volume * 100}%` }} />
            </div>
          </div>
          <button onClick={() => setFullscreen(true)} className="hover:text-white transition-colors ml-2">
            <Maximize2 size={18} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Player;
