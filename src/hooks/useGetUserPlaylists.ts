import { useEffect, useMemo, useState } from "react";
import useSpotify from "./useSpotify";
import { useSession } from "next-auth/react";

const useGetUserPlaylists = () => {
  const { spotifyApi } = useSpotify();
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[] | null
  >(null);

  useEffect(() => {
    setIsLoading(true);

    const fetchUserPlaylists = async () => {
      if (status !== "authenticated") {
        setIsLoading(false);
        return;
      }
      const playlists = await spotifyApi.getUserPlaylists();

      setUserPlaylists(playlists.body.items);
      setIsLoading(false);
    };

    fetchUserPlaylists();
  }, [spotifyApi, status]);

  return useMemo(
    () => ({
      isLoading,
      userPlaylists,
    }),
    [isLoading, userPlaylists],
  );
};

export default useGetUserPlaylists;
