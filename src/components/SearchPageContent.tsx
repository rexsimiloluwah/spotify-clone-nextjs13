"use client";
import ArtistCard from "@/app/search/components/ArtistCard";
import SongListItem from "@/app/search/components/SongListItem";
import TopSongCard from "@/app/search/components/TopSongCard";
import usePlayerStore from "@/store/usePlayerStore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";
import NavControls from "./NavControls";
import PlaylistCard from "./PlaylistCard";
import SearchInput from "./SearchInput";
import UserAccountDropdownMenu from "./UserAccountDropdownMenu";

interface SearchPageContentProps {
  result?: SpotifyApi.SearchResponse;
}

const SearchPageContent: React.FC<SearchPageContentProps> = ({ result }) => {
  const { activeTrackId, showTrackInfo } = usePlayerStore();
  const { data: session } = useSession();

  return (
    <div
      className={twMerge(
        "overflow-y-auto relative py-4 px-6",
        activeTrackId
          ? "md:max-h-[calc(100vh-120px)]"
          : "md:max-h-[calc(100vh-60px)]",
      )}
    >
      <div className="flex items-center justify-between sticky top-0 z-[1000]">
        <div className="flex gap-x-4 items-center">
          <NavControls />
          <SearchInput />
        </div>
        {session?.user ? (
          <UserAccountDropdownMenu>
            <div
              aria-labelledby={session.user.name as string}
              className="relative aspect-square w-8 h-8 rounded-full overflow-hidden cursor-pointer"
            >
              <Image
                className="object-cover"
                src={session.user.image as string}
                fill
                alt={session.user.name as string}
                loading="lazy"
              />
            </div>
          </UserAccountDropdownMenu>
        ) : null}
      </div>

      {result ? (
        <div className="my-4 flex flex-col gap-y-4">
          {result.tracks?.items.length ? (
            <div className="flex justify-between items-start gap-x-4">
              <div
                className={twMerge(
                  "flex-col gap-y-6 w-[24rem]",
                  showTrackInfo ? "hidden" : "flex",
                )}
              >
                <h3 className="text-2xl font-bold">Top result</h3>
                <TopSongCard track={result?.tracks?.items[0]} />
              </div>
              <div className="flex flex-col gap-y-6 flex-1">
                <h3 className="text-2xl font-bold">Top Songs</h3>
                <div className="flex flex-col">
                  {result.tracks?.items
                    .slice(0, 4)
                    .map((track, id) => (
                      <SongListItem track={track} key={id} />
                    ))}
                </div>
              </div>
            </div>
          ) : null}

          {result.artists?.items.length ? (
            <div className="flex flex-col gap-y-4">
              <h4 className="text-2xl font-bold">Artists</h4>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {result.artists?.items
                  .slice(0, 6)
                  .map((artist, id) => <ArtistCard artist={artist} key={id} />)}
              </div>
            </div>
          ) : null}

          {result.albums?.items.length ? (
            <div className="flex flex-col gap-y-4">
              <h4 className="text-2xl font-bold">Albums</h4>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {result.albums?.items
                  .slice(0, 6)
                  .map((album, id) => (
                    <PlaylistCard
                      title={album.name}
                      imageUrl={album.images ? album.images[0].url : ""}
                      description="Album"
                      key={id}
                    />
                  ))}
              </div>
            </div>
          ) : null}

          {result.playlists?.items.length ? (
            <div className="flex flex-col gap-y-4">
              <h4 className="text-2xl font-bold">Playlists</h4>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {result.playlists?.items
                  .slice(0, 6)
                  .map((playlist, id) => (
                    <PlaylistCard
                      title={playlist.name}
                      imageUrl={playlist.images ? playlist.images[0].url : ""}
                      description={playlist.description as string}
                      key={id}
                    />
                  ))}
              </div>
            </div>
          ) : null}

          {result.shows?.items.length ? (
            <div className="flex flex-col gap-y-4">
              <h4 className="text-2xl font-bold">Podcasts</h4>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {result.shows?.items
                  .slice(0, 6)
                  .map((show, id) => (
                    <PlaylistCard
                      title={show.name}
                      imageUrl={show.images ? show.images[0].url : ""}
                      description={show.description as string}
                      key={id}
                    />
                  ))}
              </div>
            </div>
          ) : null}

          {result.episodes?.items.length ? (
            <div className="flex flex-col gap-y-4">
              <h4 className="text-2xl font-bold">Episodes</h4>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {result.episodes?.items
                  .slice(0, 6)
                  .map((episode, id) => (
                    <PlaylistCard
                      title={episode.name}
                      imageUrl={episode.images ? episode.images[0].url : ""}
                      description={episode.description as string}
                      key={id}
                    />
                  ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default SearchPageContent;
