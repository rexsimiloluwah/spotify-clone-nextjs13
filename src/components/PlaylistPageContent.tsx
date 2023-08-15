"use client";
import usePlayerStore from "@/store/usePlayerStore";
import { convertMsPlaylistDuration } from "@/utils/time";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { RxHeartFilled } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import NavControls from "./NavControls";
import TracksTable from "./TracksTable";
import UserAccountDropdownMenu from "./UserAccountDropdownMenu";
import { SpotifyPause, SpotifyPlay } from "./icons";
import Container from "./ui/Container";

interface PlaylistPageContentProps {
  playlist: SpotifyApi.SinglePlaylistResponse | null;
}

const getPlaylistDuration = (
  playlist: SpotifyApi.SinglePlaylistResponse | null,
) => {
  if (!playlist) {
    return 0;
  }
  const totalDuration = playlist.tracks.items.reduce((acc, track) => {
    return acc + Number(track.track?.duration_ms);
  }, 0);

  return totalDuration;
};

const PlaylistPageContent: React.FC<PlaylistPageContentProps> = ({
  playlist,
}) => {
  const { data: session } = useSession();
  const { activeTrackId, isPlaying } = usePlayerStore();

  return (
    <Container className="h-full overflow-hidden">
      <div
        className={twMerge(
          "overflow-y-auto relative",
          activeTrackId
            ? "md:max-h-[calc(100vh-120px)]"
            : "md:max-h-[calc(100vh-60px)]",
        )}
      >
        <div className="bg-gradient-to-b from-indigo-800 p-6">
          <div className="bg-transparent w-full flex justify-between items-center sticky top-0 z-[1000]">
            <NavControls />

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
          <div className="h-fit py-4 px-2 flex flex-row gap-x-6 items-end">
            <div className="w-[12rem] h-[12rem] relative aspect-square overflow-hidden">
              <Image
                className="object-cover"
                src={
                  playlist?.images
                    ? playlist.images[0].url
                    : "/images/liked.png"
                }
                fill
                alt={playlist?.name as string}
                loading="lazy"
              />
            </div>
            <div className="flex flex-col gap-y-4">
              <p className="text-sm">Playlist</p>
              <h1 className="font-bold md:text-6xl text-2xl max-w-[40rem]">
                {playlist?.name}
              </h1>
              <div className="flex items-center gap-x-3 text-neutral-300 text-xs">
                <p>{playlist?.owner.display_name}</p>
                <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
                <p>{playlist?.tracks.items.length} songs</p>
                <span className="w-1 h-1 rounded-full bg-neutral-300"></span>
                <p>
                  {convertMsPlaylistDuration(getPlaylistDuration(playlist))}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-6 px-8">
          <div className="flex gap-x-6 items-center">
            <div className="bg-green-500 p-2 rounded-full">
              {isPlaying ? (
                <SpotifyPause className="fill-black" />
              ) : (
                <SpotifyPlay className="fill-black" />
              )}
            </div>
            <RxHeartFilled size={32} className="text-green-500" />
            <BiDotsHorizontalRounded className="text-neutral-300" size={28} />
          </div>

          <TracksTable tracks={playlist?.tracks.items} />
        </div>
      </div>
    </Container>
  );
};

export default PlaylistPageContent;
