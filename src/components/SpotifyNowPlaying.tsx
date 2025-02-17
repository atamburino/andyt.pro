'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface SpotifyData {
  isPlaying: boolean;
  recentlyPlayed: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

export default function SpotifyNowPlaying() {
  const [data, setData] = useState<SpotifyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/spotify');
        const data = await response.json();
        setData(data);
        setImageError(false);
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse rounded-xl bg-white/5 backdrop-blur-sm p-4 w-72">
        <div className="h-12 bg-white/10 rounded-lg" />
      </div>
    );
  }

  if (!data?.title) {
    return null;
  }

  return (
    <motion.a
      href={data.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 pr-6 hover:bg-white/10 transition-all duration-300 w-72 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white/10 ring-1 ring-white/20">
        {!imageError ? (
          <Image
            src={data.albumImageUrl}
            alt={data.album}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg 
              className="w-6 h-6 text-gray-400"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" 
              />
            </svg>
          </div>
        )}
      </div>
      
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center gap-2 mb-1">
          <div className={`w-1.5 h-1.5 rounded-full ${data.isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`} />
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
            {data.isPlaying ? 'Now Playing' : 'Recently Played'}
          </p>
        </div>
        
        <p className="font-medium text-sm text-white truncate group-hover:text-purple-400 transition-colors">
          {data.title}
        </p>
        <p className="text-xs text-gray-400 truncate">
          {data.artist}
        </p>
      </div>
    </motion.a>
  );
} 