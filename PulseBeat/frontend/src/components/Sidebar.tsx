import React from 'react';
import { Home, Search, Library, PlusCircle, Heart, Radio } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { usePlaylists } from '../contexts/PlaylistContext';
import { useUI } from '../contexts/UIContext';

const Sidebar = () => {
  const { likedTracks } = usePlaylists();
  const { openCreatePlaylist } = useUI();
  return (
    <div className="w-64 h-screen bg-dark-900 flex flex-col pt-6 pb-24 px-4 border-r border-white/5 hidden md:flex">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 mb-10 px-2 cursor-pointer transition-transform hover:scale-105">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center">
          <Radio size={18} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">PulseBeat</h1>
      </Link>

      {/* Navigation */}
      <div className="space-y-6">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">Menu</p>
          <nav className="space-y-2">
            <NavItem icon={<Home size={20} />} label="Home" to="/" />
            <NavItem icon={<Search size={20} />} label="Search" to="/search" />
            <NavItem icon={<Library size={20} />} label="Your Library" to="/library" />
          </nav>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">Playlists</p>
          <nav className="space-y-2">
            <button 
              onClick={openCreatePlaylist}
              className="w-full flex items-center gap-4 px-2 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-dark-800/50 transition-colors"
            >
              <PlusCircle size={20} />
              <span className="font-medium text-sm">Create Playlist</span>
            </button>
            <NavItem 
              icon={<Heart size={20} className="text-red-400" fill={likedTracks.length > 0 ? 'currentColor' : 'none'} />} 
              label="Liked Songs" 
              to="/liked-songs" 
              badge={likedTracks.length > 0 ? likedTracks.length : undefined}
            />
          </nav>
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="glass-card p-4 rounded-xl flex flex-col items-center justify-center text-center">
          <p className="text-sm font-medium text-white mb-2">Upgrade to Premium</p>
          <p className="text-xs text-gray-400 mb-4">Ad-free music listening</p>
          <button className="bg-white text-black text-xs font-bold py-2 px-6 rounded-full hover:scale-105 transition-transform w-full">
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, to, badge }: { icon: React.ReactNode, label: string, to: string, badge?: number }) => {
  return (
    <NavLink 
      to={to}
      className={({ isActive }) => `flex items-center gap-4 px-2 py-2.5 rounded-lg transition-colors ${
        isActive ? 'bg-dark-800 text-white' : 'text-gray-400 hover:text-white hover:bg-dark-800/50'
      }`}
    >
      {icon}
      <span className="font-medium text-sm flex-1">{label}</span>
      {badge !== undefined && (
        <span className="bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
          {badge}
        </span>
      )}
    </NavLink>
  );
};

export default Sidebar;
