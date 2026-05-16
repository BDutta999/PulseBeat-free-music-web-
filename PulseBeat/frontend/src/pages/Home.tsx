import { Play, Plus } from 'lucide-react';
import { usePlayer } from '../contexts/PlayerContext';

export const SAMPLE_TRACKS = [
  {
    id: 't1',
    title: 'Midnight City',
    artist: 'M83',
    img: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3', // Lofi placeholder
  },
  {
    id: 't2',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=synthwave-80s-122903.mp3', // Synthwave placeholder
  },
  {
    id: 't3',
    title: 'Starboy',
    artist: 'The Weeknd',
    img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_2491a6d71b.mp3?filename=hip-hop-rock-beats-118000.mp3',
  },
  {
    id: 't4',
    title: 'Resonance',
    artist: 'HOME',
    img: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=400&auto=format&fit=crop',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2021/11/25/audio_91b3cb8078.mp3?filename=chill-abstract-intention-116346.mp3',
  },
  {
    id: 't5',
    title: 'Nightcall',
    artist: 'Kavinsky',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=night-city-110013.mp3',
  }
];



const Home = ({ openAddToPlaylist, requireAuth }: { openAddToPlaylist: (track: any) => void; requireAuth: (action: () => void) => void }) => {
  const { playTrack, currentTrack, isPlaying } = usePlayer();

  const guardedPlay = (track: any) => requireAuth(() => playTrack(track));

  const handlePlayHero = () => {
    guardedPlay(SAMPLE_TRACKS[1]);
  };

  return (
    <div className="flex-1 overflow-y-auto pb-28">
      {/* Hero Section */}
      <div className="relative w-full h-80 rounded-b-3xl overflow-hidden mb-8 group">
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2000&auto=format&fit=crop" 
          alt="Hero" 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
          <span className="text-xs font-bold uppercase tracking-widest text-accent-500 mb-2 block">Featured Playlist</span>
          <h2 className="text-5xl font-black text-white mb-4 tracking-tight drop-shadow-lg">Night Drive<br/>Vibes</h2>
          <p className="text-gray-300 max-w-md mb-6 text-sm">Experience the ultimate synthesis of neon lights and smooth beats for your midnight cruises.</p>
          <div className="flex items-center gap-4">
            <button 
              onClick={handlePlayHero}
              className="bg-primary-500 hover:bg-primary-400 text-white rounded-full py-3 px-8 font-bold flex items-center gap-2 transition-all hover:scale-105 shadow-lg shadow-primary-500/30"
            >
              <Play fill="currentColor" size={20} /> 
              {currentTrack?.id === SAMPLE_TRACKS[1].id && isPlaying ? 'Pause' : 'Play Now'}
            </button>
            <button className="glass-panel text-white rounded-full py-3 px-8 font-bold hover:bg-white/10 transition-colors">
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-8">
        {/* Section: Trending */}
        <section className="mb-10">
          <h3 className="text-2xl font-bold text-white mb-6">Trending Now</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {SAMPLE_TRACKS.map((track) => (
              <MusicCard 
                key={track.id}
                track={track} 
                openAddToPlaylist={openAddToPlaylist}
                guardedPlay={guardedPlay}
              />
            ))}
          </div>
        </section>

        {/* Section: AI Recommendations */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-500">AI Recommendations</h3>
            <span className="text-xs font-medium text-gray-400 cursor-pointer hover:text-white">See All</span>
          </div>
          <div className="glass-card p-6 flex flex-col md:flex-row gap-6 items-center">
             <div className="w-full md:w-1/3">
               <div className="aspect-square rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-white/10 flex items-center justify-center p-8 relative overflow-hidden">
                 {/* Blob animation bg */}
                 <div className="absolute top-0 left-0 w-full h-full bg-primary-500/30 blur-3xl rounded-full animate-blob"></div>
                 <div className="absolute bottom-0 right-0 w-full h-full bg-accent-500/30 blur-3xl rounded-full animate-blob" style={{ animationDelay: '2s' }}></div>
                 
                 <div className="relative z-10 text-center">
                    <p className="text-lg font-bold text-white mb-2">Focus Mode</p>
                    <p className="text-xs text-gray-300">Generated based on your recent activity</p>
                 </div>
               </div>
             </div>
             <div className="w-full md:w-2/3 flex flex-col gap-4">
                {SAMPLE_TRACKS.slice(0, 3).map((track, i) => (
                  <div 
                    key={i} 
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer"
                    onClick={() => guardedPlay(track)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded bg-dark-700 relative overflow-hidden">
                         <img src={track.img} alt="Track" className="w-full h-full object-cover" />
                         <div className={`absolute inset-0 flex items-center justify-center transition-opacity ${currentTrack?.id === track.id && isPlaying ? 'bg-black/60 opacity-100' : 'bg-black/40 opacity-0 group-hover:opacity-100'}`}>
                           {currentTrack?.id === track.id && isPlaying ? (
                             <div className="flex items-center justify-center gap-0.5">
                                <div className="w-1 h-3 bg-primary-400 animate-pulse"></div>
                                <div className="w-1 h-4 bg-primary-400 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-1 h-2 bg-primary-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                             </div>
                           ) : (
                             <Play size={20} className="text-white ml-0.5" fill="currentColor" />
                           )}
                         </div>
                      </div>
                      <div>
                        <h4 className={`text-sm font-semibold transition-colors ${currentTrack?.id === track.id ? 'text-primary-400' : 'text-white'}`}>{track.title}</h4>
                        <p className="text-xs text-gray-400">AI Gen • {track.artist}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">2:45</span>
                  </div>
                ))}
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const MusicCard = ({ track, openAddToPlaylist, guardedPlay }: { track: any; openAddToPlaylist: (track: any) => void; guardedPlay: (track: any) => void }) => {
  const { currentTrack, isPlaying } = usePlayer();
  const isActive = currentTrack?.id === track.id;

  return (
    <div 
      className={`glass-card p-4 group cursor-pointer ${isActive ? 'ring-1 ring-primary-500/50 bg-dark-700/60' : ''}`}
      onClick={() => guardedPlay(track)}
    >
      <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 shadow-lg">
        <img src={track.img} alt={track.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        
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
      <h4 className={`font-semibold truncate text-sm mb-1 transition-colors ${isActive ? 'text-primary-400' : 'text-white group-hover:text-primary-400'}`}>
        {track.title}
      </h4>
      <p className="text-xs text-gray-400 truncate">{track.artist}</p>
    </div>
  );
};

export default Home;
