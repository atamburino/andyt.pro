import { NextResponse } from 'next/server';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/api/spotify/callback';

if (!CLIENT_ID || !CLIENT_SECRET) {
  throw new Error('Missing required environment variables SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET');
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    return new NextResponse(`
      <html>
        <body>
          <h1>Authentication Error</h1>
          <p>Error: ${error}</p>
          <p>Please try again or check your Spotify Developer Dashboard settings.</p>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' },
      status: 400,
    });
  }

  if (!code) {
    return new NextResponse(`
      <html>
        <body>
          <h1>Error</h1>
          <p>No authorization code provided</p>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' },
      status: 400,
    });
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error_description || data.error);
    }

    if (!data.refresh_token) {
      throw new Error('No refresh token received');
    }

    return new NextResponse(`
      <html>
        <body style="font-family: system-ui; max-width: 600px; margin: 40px auto; padding: 20px;">
          <h1 style="color: #1DB954;">Your Spotify Refresh Token</h1>
          <p>Add this to your <code>.env.local</code> file:</p>
          <pre style="background: #f1f1f1; padding: 15px; border-radius: 4px; overflow-x: auto;">
SPOTIFY_REFRESH_TOKEN=${data.refresh_token}</pre>
          <p style="margin-top: 20px; color: #666;">
            After adding this to your .env.local file, restart your development server.
          </p>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error('Error getting refresh token:', error);
    return new NextResponse(`
      <html>
        <body>
          <h1>Error</h1>
          <p>Failed to get refresh token: ${error instanceof Error ? error.message : 'Unknown error'}</p>
          <p>Please try again or check your configuration.</p>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' },
      status: 500,
    });
  }
} 