import { Heart, Play, Plus } from 'lucide-react';
import { usePlaylists } from '../contexts/PlaylistContext';
import { usePlayer } from '../contexts/PlayerContext';

const LikedSongs = ({ openAddToPlaylist }: { openAddToPlaylist: (track: any) => void }) => {
  const { likedTracks, toggleLike } = usePlaylists();
  const { playTrack, currentTrack, isPlaying } = usePlayer();

  return (
    <div className="flex-1 overflow-y-auto pb-28">
      {/* Header */}
      <div className="relative w-full px-8 pt-10 pb-8 mb-2"
        style={{ background: 'linear-gradient(160deg, #3b0764 0%, #1a0633 60%, transparent 100%)' }}
      >
        <div className="flex items-end gap-6">
          <div className="w-44 h-44 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-2xl shadow-purple-900/50 flex-shrink-0">
            <Heart size={72} className="text-white" fill="white" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-2">Playlist</p>
            <h1 className="text-5xl font-black text-white mb-3 drop-shadow">Liked Songs</h1>
            <p className="text-gray-300 text-sm">{likedTracks.length} song{likedTracks.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      <div className="px-8">
        {likedTracks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Heart size={64} className="text-gray-600 mb-6" />
            <h2 className="text-2xl font-bold text-white mb-2">Songs you like will appear here</h2>
            <p className="text-gray-400 text-sm">Save songs by tapping the heart icon while a track is playing.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-white/5 text-left">
                <th className="pb-3 font-medium w-8">#</th>
                <th className="pb-3 font-medium">Title</th>
                <th className="pb-3 font-medium hidden md:table-cell">Artist</th>
                <th className="pb-3 font-medium w-10"></th>
                <th className="pb-3 font-medium w-10"></th>
              </tr>
            </thead>
            <tbody>
              {likedTracks.map((track, idx) => {
                const active = currentTrack?.id === track.id;
                return (
                  <tr
                    key={track.id}
                    className={`group hover:bg-white/5 transition-colors rounded-lg cursor-pointer ${active ? 'text-primary-400' : 'text-white'}`}
                    onClick={() => playTrack(track)}
                  >
                    <td className="py-3 pl-2 w-8 text-gray-400 group-hover:text-white">
                      {active && isPlaying ? (
                        <div className="flex items-center gap-0.5">
                          <div className="w-1 h-3 bg-primary-400 animate-pulse" />
                          <div className="w-1 h-4 bg-primary-400 animate-pulse" style={{ animationDelay: '0.1s' }} />
                          <div className="w-1 h-2 bg-primary-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                        </div>
                      ) : (
                        <span className="group-hover:hidden">{idx + 1}</span>
                      )}
                      {!active && (
                        <Play size={14} className="hidden group-hover:block text-white ml-0.5" fill="currentColor" />
                      )}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <img src={track.img} alt={track.title} className="w-10 h-10 rounded object-cover" />
                        <span className="font-semibold line-clamp-1">{track.title}</span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-400 hidden md:table-cell">{track.artist}</td>
                    <td className="py-3 w-10">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleLike(track); }}
                        className="text-red-500 hover:scale-110 transition-transform"
                        title="Unlike"
                      >
                        <Heart size={16} fill="currentColor" />
                      </button>
                    </td>
                    <td className="py-3 w-10">
                      <button
                        onClick={(e) => { e.stopPropagation(); openAddToPlaylist(track); }}
                        className="text-gray-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                        title="Add to playlist"
                      >
                        <Plus size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LikedSongs;
