import { NextResponse } from 'next/server';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN!,
    }),
  });

  return response.json();
}

async function getNowPlaying() {
  const { access_token } = await getAccessToken();

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (response.status === 204 || response.status > 400) {
    // If no track is playing, get recently played
    return await getRecentlyPlayed(access_token);
  }

  return response.json();
}

async function getRecentlyPlayed(access_token: string) {
  const response = await fetch(RECENTLY_PLAYED_ENDPOINT + '?limit=1', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (response.status === 204 || response.status > 400) {
    return null;
  }

  const data = await response.json();
  return {
    is_playing: false,
    recently_played: true,
    item: data.items[0].track,
  };
}

export async function GET() {
  try {
    const response = await getNowPlaying();

    if (!response) {
      return NextResponse.json({
        isPlaying: false,
        title: null,
        artist: null,
        album: null,
        albumImageUrl: null,
        songUrl: null,
      });
    }

    const song = response.item;
    
    // Get the most appropriate image size
    const albumImage = song.album.images.length > 0 
      ? song.album.images.reduce((prev: SpotifyImage, current: SpotifyImage) => {
          // Prefer images closest to 64x64
          const prevDiff = Math.abs(prev.width - 64);
          const currentDiff = Math.abs(current.width - 64);
          return currentDiff < prevDiff ? current : prev;
        })
      : null;

    return NextResponse.json({
      isPlaying: response.is_playing || false,
      recentlyPlayed: response.recently_played || false,
      title: song.name,
      artist: song.artists.map((_artist: any) => _artist.name).join(', '),
      album: song.album.name,
      albumImageUrl: albumImage?.url || null,
      songUrl: song.external_urls.spotify,
    });
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return NextResponse.json({ error: 'Error fetching Spotify data' }, { status: 500 });
  }
} 