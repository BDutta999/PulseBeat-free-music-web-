import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Play, Plus } from 'lucide-react';
import { usePlayer } from '../contexts/PlayerContext';

const Search = ({ openAddToPlaylist, requireAuth }: { openAddToPlaylist: (track: any) => void; requireAuth: (action: () => void) => void }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { playTrack, currentTrack, isPlaying } = usePlayer();

  const guardedPlay = (track: any) => requireAuth(() => playTrack(track));

  useEffect(() => {
    const fetchMusic = async () => {
      if (!query) {
        setResults([]);
        return;
      }
      
      setIsLoading(true);
      try {
        // Fetch full songs using our backend YouTube proxy
        const response = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (data.results) {
          setResults(data.results);
        }
      } catch (error) {
        console.error("Error fetching music:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchMusic();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="flex-1 overflow-y-auto px-8 py-6 pb-28">
      <h2 className="text-3xl font-bold text-white mb-2">Search Results</h2>
      <p className="text-gray-400 text-sm mb-8">
        {query ? `Showing results for "${query}"` : 'Type something in the search bar above to explore millions of full songs.'}
      </p>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="glass-card p-4 animate-pulse">
              <div className="w-full aspect-square bg-dark-700 rounded-xl mb-4"></div>
              <div className="h-4 bg-dark-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-dark-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : query && results.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl font-medium mb-2">No results found for "{query}"</p>
          <p className="text-sm">Please make sure your words are spelled correctly or use less or different keywords.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {results.map((track) => {
            const isActive = currentTrack?.id === track.id;
            return (
              <div 
                key={track.id}
                className={`glass-card p-4 group cursor-pointer ${isActive ? 'ring-1 ring-primary-500/50 bg-dark-700/60' : ''}`}
                onClick={() => guardedPlay(track)}
              >
                <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 shadow-lg bg-dark-800">
                  <img src={track.img} alt={track.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  
                  <div className={`absolute bottom-2 right-2 w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 z-10
                    ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'}
                    hover:bg-primary-400 hover:scale-105`}
                  >
                    {isActive && isPlaying ? (
                      <div className="flex items-center justify-center gap-1">
                         <div className="w-1 h-4 bg-white animate-pulse"></div>
                         <div className="w-1 h-6 bg-white animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                         <div className="w-1 h-3 bg-white animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    ) : (
                      <Play fill="currentColor" className="text-white ml-1" size={24} />
                    )}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); openAddToPlaylist(track); }}
                    className="absolute top-2 left-2 w-8 h-8 bg-dark-800/70 rounded-full flex items-center justify-center text-white hover:bg-dark-700 transition-colors z-20"
                    title="Add to Playlist"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <h4 className={`font-semibold truncate text-sm mb-1 transition-colors ${isActive ? 'text-primary-400' : 'text-white group-hover:text-primary-400'}`} title={track.title}>
                  {track.title}
                </h4>
                <p className="text-xs text-gray-400 truncate" title={track.artist}>{track.artist}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
