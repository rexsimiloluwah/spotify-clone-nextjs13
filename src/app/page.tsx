import HomePageContent from "@/components/HomePageContent";
import UserPageContent from "@/components/UserPageContent";
import Container from "@/components/ui/Container";
import { authOptions } from "@/lib/auth";
import spotifyApi from "@/lib/spotify";
import { Metadata } from "next";
import { Session, getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Spotify Player (Clone) - Home",
  description: "Music for everyone",
  icons: {
    icon: "/images/spotify-logo.png",
  },
};

const getLastPlayedPlaylists = async (session: Session | null) => {
  if (!session?.accessToken) {
    return null;
  }

  spotifyApi.setAccessToken(session.accessToken);

  try {
    const recentlyPlayed = await spotifyApi.getMyRecentlyPlayedTracks({
      limit: 20,
    });

    const lastPlayedTracks = recentlyPlayed.body.items;
    let playlistIds = lastPlayedTracks
      .filter((track) => track.context && track.context.type === "playlist")
      .map((track) => track.context.uri.split(":")[2]);

    // Remove multiples
    playlistIds = playlistIds.filter(
      (value, index, self) => self.indexOf(value) === index,
    );

    const playlists = await Promise.all(
      playlistIds.map((playlistId) => spotifyApi.getPlaylist(playlistId)),
    );

    return playlists.map((playlist) => playlist.body);
  } catch (error) {
    throw error;
  }
};

const getFeaturedPlaylists = async (session: Session | null) => {
  if (!session?.accessToken) {
    return null;
  }

  spotifyApi.setAccessToken(session.accessToken);

  try {
    const { body } = await spotifyApi.getFeaturedPlaylists({ limit: 50 });

    return body.playlists.items;
  } catch (error) {
    throw error;
  }
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  //const userPlaylists = await getUserPlaylists(session);
  const lastPlayedPlaylists = await getLastPlayedPlaylists(session);
  const featuredPlaylists = await getFeaturedPlaylists(session);

  return (
    <Container className="h-full overflow-hidden">
      {session?.user ? (
        <UserPageContent
          lastPlayedPlaylists={lastPlayedPlaylists}
          featuredPlaylists={featuredPlaylists}
        />
      ) : (
        <HomePageContent />
      )}
    </Container>
  );
}
