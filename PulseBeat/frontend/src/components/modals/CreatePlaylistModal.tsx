import React, { useState } from 'react';
import { X } from 'lucide-react';
import { usePlaylists } from '../../contexts/PlaylistContext';

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePlaylistModal = ({ isOpen, onClose }: CreatePlaylistModalProps) => {
  const [name, setName] = useState('');
  const { createPlaylist } = usePlaylists();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      createPlaylist(name.trim());
      setName('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md glass-card p-8 m-4 shadow-2xl shadow-primary-500/10 animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Create New Playlist</h2>
          <p className="text-gray-400 text-sm">Give your new playlist a catchy name.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              type="text" 
              required
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-dark-800/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary-500 transition-colors"
              placeholder="e.g. Late Night Vibes"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-primary-500 hover:bg-primary-400 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-primary-500/20 mt-4"
          >
            Create Playlist
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
