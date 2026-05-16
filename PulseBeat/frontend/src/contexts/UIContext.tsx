import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface UIContextType {
  openCreatePlaylist: () => void;
  openAddToPlaylist: (track: any) => void;
  openAuth: (type: 'login' | 'signup') => void;
  requireAuth: (action: () => void) => void;
  // internal — consumed by App modals
  _showCreatePlaylist: boolean;
  _closeCreatePlaylist: () => void;
  _showAddToPlaylist: boolean;
  _closeAddToPlaylist: () => void;
  _trackToAdd: any;
  _showLoginGate: boolean;
  _closeLoginGate: () => void;
  _authType: 'login' | 'signup';
  _showAuth: boolean;
  _closeAuth: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
  const [trackToAdd, setTrackToAdd] = useState<any>(null);
  const [showLoginGate, setShowLoginGate] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');
  const [showAuth, setShowAuth] = useState(false);

  // user ref — updated by AuthContext; we read from localStorage directly
  const isLoggedIn = () => !!localStorage.getItem('pulsebeat_user');

  const openCreatePlaylist = () => {
    if (!isLoggedIn()) { setShowLoginGate(true); return; }
    setShowCreatePlaylist(true);
  };

  const openAddToPlaylist = (track: any) => {
    if (!isLoggedIn()) { setShowLoginGate(true); return; }
    setTrackToAdd(track);
    setShowAddToPlaylist(true);
  };

  const openAuth = (type: 'login' | 'signup') => {
    setAuthType(type);
    setShowAuth(true);
    setShowLoginGate(false);
  };

  const requireAuth = (action: () => void) => {
    if (!isLoggedIn()) { setShowLoginGate(true); return; }
    action();
  };

  return (
    <UIContext.Provider value={{
      openCreatePlaylist,
      openAddToPlaylist,
      openAuth,
      requireAuth,
      _showCreatePlaylist: showCreatePlaylist,
      _closeCreatePlaylist: () => setShowCreatePlaylist(false),
      _showAddToPlaylist: showAddToPlaylist,
      _closeAddToPlaylist: () => setShowAddToPlaylist(false),
      _trackToAdd: trackToAdd,
      _showLoginGate: showLoginGate,
      _closeLoginGate: () => setShowLoginGate(false),
      _authType: authType,
      _showAuth: showAuth,
      _closeAuth: () => setShowAuth(false),
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used inside UIProvider');
  return ctx;
};
