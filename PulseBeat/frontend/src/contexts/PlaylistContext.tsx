import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface Track {
  id: string;
  title: string;
  artist: string;
  img: string;
  audioUrl: string;
}

export interface Playlist {
  id: string;
  name: string;
  tracks: Track[];
}

interface PlaylistContextType {
  playlists: Playlist[];
  likedTracks: Track[];
  createPlaylist: (name: string) => void;
  addTrackToPlaylist: (playlistId: string, track: Track) => void;
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => void;
  toggleLike: (track: Track) => void;
  isLiked: (trackId: string) => boolean;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const PlaylistProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  // Playlists key per user
  const playlistKey = user ? `pulsebeat_playlists_${user}` : 'pulsebeat_playlists_guest';
  // Liked tracks key per user
  const likedKey = user ? `pulsebeat_liked_${user}` : 'pulsebeat_liked_guest';

  const [playlists, setPlaylists] = useState<Playlist[]>(() => {
    const saved = localStorage.getItem(playlistKey);
    if (saved) { try { return JSON.parse(saved); } catch (e) {} }
    return [{ id: '1', name: 'My Favorites', tracks: [] }];
  });

  const [likedTracks, setLikedTracks] = useState<Track[]>(() => {
    const saved = localStorage.getItem(likedKey);
    if (saved) { try { return JSON.parse(saved); } catch (e) {} }
    return [];
  });

  // Reload data when user changes (login/logout)
  useEffect(() => {
    const savedPlaylists = localStorage.getItem(playlistKey);
    setPlaylists(savedPlaylists ? JSON.parse(savedPlaylists) : [{ id: '1', name: 'My Favorites', tracks: [] }]);

    const savedLiked = localStorage.getItem(likedKey);
    setLikedTracks(savedLiked ? JSON.parse(savedLiked) : []);
  }, [user]);

  // Persist playlists
  useEffect(() => {
    localStorage.setItem(playlistKey, JSON.stringify(playlists));
  }, [playlists, playlistKey]);

  // Persist liked tracks
  useEffect(() => {
    localStorage.setItem(likedKey, JSON.stringify(likedTracks));
  }, [likedTracks, likedKey]);

  const createPlaylist = (name: string) => {
    const newPlaylist: Playlist = { id: Date.now().toString(), name, tracks: [] };
    setPlaylists(prev => [...prev, newPlaylist]);
  };

  const addTrackToPlaylist = (playlistId: string, track: Track) => {
    setPlaylists(prev => prev.map(p => {
      if (p.id === playlistId) {
        if (p.tracks.some(t => t.id === track.id)) return p;
        return { ...p, tracks: [...p.tracks, track] };
      }
      return p;
    }));
  };

  const removeTrackFromPlaylist = (playlistId: string, trackId: string) => {
    setPlaylists(prev => prev.map(p => {
      if (p.id === playlistId) return { ...p, tracks: p.tracks.filter(t => t.id !== trackId) };
      return p;
    }));
  };

  const toggleLike = (track: Track) => {
    setLikedTracks(prev =>
      prev.some(t => t.id === track.id)
        ? prev.filter(t => t.id !== track.id)
        : [...prev, track]
    );
  };

  const isLiked = (trackId: string) => likedTracks.some(t => t.id === trackId);

  return (
    <PlaylistContext.Provider value={{ playlists, likedTracks, createPlaylist, addTrackToPlaylist, removeTrackFromPlaylist, toggleLike, isLiked }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylists = () => {
  const context = useContext(PlaylistContext);
  if (!context) throw new Error('usePlaylists must be used within PlaylistProvider');
  return context;
};
