import React from 'react';
import { X } from 'lucide-react';
import { usePlaylists } from '../../contexts/PlaylistContext';

interface AddToPlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  track: any;
}

const AddToPlaylistModal: React.FC<AddToPlaylistModalProps> = ({ isOpen, onClose, track }) => {
  const { playlists, addTrackToPlaylist } = usePlaylists();

  if (!isOpen) return null;

  const handleAdd = (playlistId: string) => {
    addTrackToPlaylist(playlistId, track);
    onClose();
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
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Add to Playlist</h2>
        {playlists.length === 0 ? (
          <p className="text-gray-400 text-center">No playlists yet. Create one first.</p>
        ) : (
          <ul className="space-y-2">
            {playlists.map(pl => (
              <li key={pl.id} className="flex items-center justify-between bg-dark-800 rounded p-2">
                <span className="text-white">{pl.name}</span>
                <button
                  onClick={() => handleAdd(pl.id)}
                  className="bg-primary-500 hover:bg-primary-400 text-white text-sm px-3 py-1 rounded"
                >
                  Add
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddToPlaylistModal;
