import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import useSpotify from "./useSpotify";

const useSpotifySearch = (query: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] =
    useState<SpotifyApi.SearchResponse | null>(null);

  const { status } = useSession();
  const { spotifyApi } = useSpotify();

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    const fetchSearchResult = async (query: string) => {
      setIsLoading(true);
      const result = await spotifyApi.search(
        query,
        ["track", "playlist", "album", "episode", "show", "artist"],
        { limit: 10 },
      );

      setSearchResult(result.body);
      setIsLoading(false);
    };

    fetchSearchResult(query);
  }, [status, query, spotifyApi]);

  return useMemo(
    () => ({
      isLoading,
      searchResult,
    }),
    [isLoading, searchResult],
  );
};

export default useSpotifySearch;
