import { NextResponse } from 'next/server';

// Make sure these match EXACTLY with your Spotify Dashboard settings
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const REDIRECT_URI = 'http://localhost:3000/api/spotify/callback'; // No trailing slash!

if (!CLIENT_ID) {
  throw new Error('SPOTIFY_CLIENT_ID is not defined in environment variables');
}

const scopes = [
  'user-read-currently-playing',
  'user-read-recently-played',
].join(' ');

export async function GET() {
  try {
    const queryParams = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      scope: scopes,
    });

    const authUrl = `https://accounts.spotify.com/authorize?${queryParams.toString()}`;
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Error creating auth URL:', error);
    return NextResponse.json({ error: 'Failed to create authorization URL' }, { status: 500 });
  }
} 