import type { APIRoute } from "astro";

export const prerender = false;

const CLIENT_ID = import.meta.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = import.meta.env.SPOTIFY_REFRESH_TOKEN;

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface SpotifyArtist {
  id: string;
  name: string;
  external_urls: {
    spotify: string;
  };
}

interface SpotifyAlbum {
  id: string;
  name: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
}

interface SpotifyTrack {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  duration_ms: number;
  external_urls: {
    spotify: string;
  };
  preview_url: string | null;
  popularity: number;
}

interface SpotifyRecentlyPlayedItem {
  track: SpotifyTrack;
  played_at: string;
}

interface SpotifyRecentlyPlayedResponse {
  items: SpotifyRecentlyPlayedItem[];
  next: string | null;
  cursors: {
    after: string;
    before: string;
  };
  limit: number;
  href: string;
}

interface FormattedTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  playedAt: string;
  duration: number;
  externalUrl: string;
  previewUrl: string | null;
  image: string | null;
  popularity: number;
}

// Function to get access token using refresh token
async function getAccessToken(): Promise<string> {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh access token");
  }

  const data: SpotifyTokenResponse = await response.json();
  return data.access_token;
}

// Function to fetch recently played tracks
async function getRecentTracks(
  accessToken: string,
): Promise<SpotifyRecentlyPlayedResponse> {
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/recently-played?limit=5",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recent tracks");
  }

  return await response.json();
}

// Format track data for cleaner response
function formatTrackData(
  spotifyData: SpotifyRecentlyPlayedResponse,
): FormattedTrack[] {
  return spotifyData.items.map((item) => ({
    id: item.track.id,
    name: item.track.name,
    artist: item.track.artists.map((artist) => artist.name).join(", "),
    album: item.track.album.name,
    playedAt: item.played_at,
    duration: item.track.duration_ms,
    externalUrl: item.track.external_urls.spotify,
    previewUrl: item.track.preview_url,
    image: item.track.album.images[0]?.url || null,
    popularity: item.track.popularity,
  }));
}

export const GET: APIRoute = async ({ request }) => {
  try {
    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
      return new Response(
        JSON.stringify({
          error: "Missing required environment variables",
          message:
            "Please set SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and SPOTIFY_REFRESH_TOKEN",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    // Get access token
    const accessToken = await getAccessToken();

    // Fetch recent tracks
    const recentTracks = await getRecentTracks(accessToken);

    // Format the data
    const formattedTracks = formatTrackData(recentTracks);

    return new Response(
      JSON.stringify({
        success: true,
        data: formattedTracks,
        total: formattedTracks.length,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
        },
      },
    );
  } catch (error) {
    console.error("Spotify API Error:", error);

    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};
