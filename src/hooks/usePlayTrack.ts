import usePlayerStore from "@/store/usePlayerStore";
import useSpotify from "./useSpotify";
import { useSession } from "next-auth/react";

const usePlayTrack = () => {
  const { setActiveTrackId, setIsPlaying, activeDevices, setActiveDevices } =
    usePlayerStore();
  const { status } = useSession();
  const { spotifyApi } = useSpotify();

  const handlePlay = async (track: SpotifyApi.TrackObjectFull | null) => {
    if (status !== "authenticated" || !track) {
      return;
    }

    setActiveTrackId(track.id);

    let devices = activeDevices;

    if (!devices) {
      const devicesResponse = await spotifyApi.getMyDevices();
      devices = devicesResponse.body.devices;
    }

    if (devices.length > 0) {
      setActiveDevices(devices);
      spotifyApi
        .play({
          uris: [track.uri as string],
          device_id: devices[0].id as string,
        })
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error(error);
          setIsPlaying(false);
          setActiveDevices(null);
        });
    }
  };

  return {
    handlePlay,
  };
};

export default usePlayTrack;
