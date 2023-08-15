import { useSession } from "next-auth/react";
import useSpotify from "./useSpotify";
import { useEffect, useMemo, useState } from "react";

const useGetArtistInfo = (artistId: string) => {
  const { spotifyApi } = useSpotify();
  const { status } = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [artistInfo, setArtistInfo] =
    useState<SpotifyApi.SingleArtistResponse | null>(null);

  useEffect(() => {
    if (status !== "authenticated" || !artistId) {
      return;
    }

    const fetchArtistInfo = async (id: string) => {
      setIsLoading(true);
      const artistInfo = await spotifyApi.getArtist(id);

      setIsLoading(false);
      setArtistInfo(artistInfo.body);
    };

    fetchArtistInfo(artistId);
  }, [spotifyApi, status, artistId]);

  return useMemo(
    () => ({
      isLoading,
      artistInfo,
    }),
    [isLoading, artistInfo],
  );
};

export default useGetArtistInfo;
