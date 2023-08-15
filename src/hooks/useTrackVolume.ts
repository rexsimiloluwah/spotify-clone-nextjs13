import { useSession } from "next-auth/react";
import useSpotify from "./useSpotify";
import useDebounce from "./useDebounce";
import { useEffect } from "react";

const useTrackVolume = (value: number) => {
  const { spotifyApi } = useSpotify();
  const { status } = useSession();
  const debouncedVolume = useDebounce(value);

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    const setVolume = async (value: number) => {
      if (!value) return;
      const devicesResponse = await spotifyApi.getMyDevices();
      const devices = devicesResponse.body.devices;

      if (!devices.length || !devices.find((device) => device.is_active)) {
        return;
      }
      await spotifyApi.setVolume(value);
    };

    setVolume(debouncedVolume);
  }, [debouncedVolume, spotifyApi, status]);

  return {
    debouncedVolume,
  };
};

export default useTrackVolume;
