import PlaylistPageContent from "@/components/PlaylistPageContent";
import { authOptions } from "@/lib/auth";
import spotifyApi from "@/lib/spotify";
import { Metadata, ResolvingMetadata } from "next";
import { Session, getServerSession } from "next-auth";

interface Props {}

const getPlaylistById = async (session: Session | null, id: string) => {
  if (!session?.accessToken) {
    return null;
  }

  spotifyApi.setAccessToken(session.accessToken);

  const playlist = await spotifyApi.getPlaylist(id);

  return playlist.body;
};

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const session = await getServerSession(authOptions);
  const playlist = await getPlaylistById(session, id);

  return {
    title: `${playlist?.name}`,
    description: "Spotify Playlist",
    icons: {
      icon: "/images/spotify-logo.png",
    },
  };
}

export default async function PlaylistPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  const playlist = await getPlaylistById(session, id);

  return <PlaylistPageContent playlist={playlist} />;
}
