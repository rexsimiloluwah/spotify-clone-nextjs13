import spotifyApi from "@/lib/spotify";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const useSpotify = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      spotifyApi.setAccessToken(session.accessToken as string);
    }
  }, [session]);

  return {
    spotifyApi,
  };
};

export default useSpotify;
