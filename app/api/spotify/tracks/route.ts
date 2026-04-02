import { NextResponse } from "next/server";

type RequestedSong = {
  title: string;
  artist: string;
  query: string;
};

type SpotifyTokenResponse = {
  access_token: string;
  expires_in: number;
};

type SpotifySearchResponse = {
  tracks?: {
    items?: Array<{
      id: string;
      duration_ms: number;
      external_urls?: {
        spotify?: string;
      };
      name: string;
      artists: Array<{ name: string }>;
    }>;
  };
};

type ResolvedTrack = {
  title: string;
  artist: string;
  query: string;
  trackId: string | null;
  durationMs: number | null;
};

const REQUESTED_SONGS: RequestedSong[] = [
  { title: "FlatBed Freestyle", artist: "Playboi Carti", query: "FlatBed Freestyle Playboi Carti" },
  { title: "Kiss Land", artist: "The Weeknd", query: "Kiss Land The Weeknd" },
  { title: "God is a woman", artist: "Ariana Grande", query: "God is a woman Ariana Grande" },
  { title: "Love Potions", artist: "BJ Lips", query: "Love Potions BJ Lips" },
];

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getSpotifyAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Spotify credentials are missing. Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET.");
  }

  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.value;
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
    cache: "no-store",
  });

  if (!tokenResponse.ok) {
    throw new Error("Failed to get Spotify access token.");
  }

  const tokenPayload = (await tokenResponse.json()) as SpotifyTokenResponse;

  cachedToken = {
    value: tokenPayload.access_token,
    expiresAt: Date.now() + Math.max(0, tokenPayload.expires_in - 30) * 1000,
  };

  return cachedToken.value;
}

async function resolveTrack(song: RequestedSong, accessToken: string): Promise<ResolvedTrack> {
  const searchQuery = encodeURIComponent(`track:${song.title} artist:${song.artist}`);
  const searchResponse = await fetch(
    `https://api.spotify.com/v1/search?q=${searchQuery}&type=track&limit=1&market=US`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!searchResponse.ok) {
    return {
      title: song.title,
      artist: song.artist,
      query: song.query,
      trackId: null,
      durationMs: null,
    };
  }

  const payload = (await searchResponse.json()) as SpotifySearchResponse;
  const bestMatch = payload.tracks?.items?.[0];

  if (!bestMatch) {
    return {
      title: song.title,
      artist: song.artist,
      query: song.query,
      trackId: null,
      durationMs: null,
    };
  }

  return {
    title: bestMatch.name,
    artist: bestMatch.artists?.map((artist) => artist.name).join(", ") || song.artist,
    query: song.query,
    trackId: bestMatch.id,
    durationMs: bestMatch.duration_ms,
  };
}

export async function GET() {
  try {
    const accessToken = await getSpotifyAccessToken();
    const tracks = await Promise.all(REQUESTED_SONGS.map((song) => resolveTrack(song, accessToken)));

    return NextResponse.json({ ok: true, tracks }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load Spotify tracks.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
