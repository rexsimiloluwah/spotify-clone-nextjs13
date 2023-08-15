"use client";
import { SpotifyThreeDots } from "@/components/icons";
import usePlayTrack from "@/hooks/usePlayTrack";
import { convertMsTrackDuration } from "@/utils/time";
import Image from "next/image";
import React from "react";

interface SongListItemProps {
  track?: SpotifyApi.TrackObjectFull;
}

const SongListItem: React.FC<SongListItemProps> = ({ track }) => {
  const { handlePlay } = usePlayTrack();

  if (!track) return;
  return (
    <div
      className="flex p-2 justify-between items-center hover:bg-neutral-400/10 cursor-pointer"
      onClick={() => handlePlay(track)}
    >
      <div className="flex gap-x-4 items-center">
        <div className="relative overflow-hidden w-[36px] h-[36px]">
          <Image
            src={track.album.images ? track.album.images[0].url : ""}
            alt={track.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <h3 className="font-semibold text-sm">{track.name}</h3>
          <p className="text-neutral-300 text-xs">
            {track.artists.map((artist) => artist.name).join(", ")}
          </p>
        </div>
      </div>
      <div className="flex gap-x-4 items-center">
        <p className="text-sm text-neutral-300">
          {convertMsTrackDuration(track.duration_ms)}
        </p>
        <SpotifyThreeDots
          size={20}
          className="fill-neutral-300 hover:fill-white"
        />
      </div>
    </div>
  );
};

export default SongListItem;
