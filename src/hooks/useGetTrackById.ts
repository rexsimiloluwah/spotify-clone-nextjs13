import { useEffect, useMemo, useState } from "react";
import useSpotify from "./useSpotify";
import { useSession } from "next-auth/react";

const useGetTrackById = (trackId?: string) => {
  const [track, setTrack] = useState<SpotifyApi.SingleTrackResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const { spotifyApi } = useSpotify();
  const { status } = useSession();

  useEffect(() => {
    if (status !== "authenticated" || !trackId) {
      return;
    }

    const fetchTrack = async (trackId: string) => {
      setIsLoading(true);
      const trackResponse = await spotifyApi.getTrack(trackId);

      const track = trackResponse.body;
      setTrack(track);
      setIsLoading(false);
    };

    fetchTrack(trackId);
  }, [spotifyApi, status, trackId]);

  return useMemo(
    () => ({
      isLoading,
      track,
    }),
    [isLoading, track],
  );
};

export default useGetTrackById;
