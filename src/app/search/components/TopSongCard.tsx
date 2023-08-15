import PlayButton from "@/components/PlayButton";
import Image from "next/image";
import React from "react";

interface TopSongCardProps {
  track?: SpotifyApi.TrackObjectFull;
}

const TopSongCard: React.FC<TopSongCardProps> = ({ track }) => {
  if (!track) return;
  return (
    <div className="group w-full p-4 rounded-md bg-neutral-600/10 cursor-pointer relative hover:bg-neutral-600/50">
      <div className="flex flex-col gap-y-4">
        <div className="relative rounded-md overflow-hidden w-24 h-24 shadow-lg drop-shadow-lg">
          <Image
            src={track.album.images ? track.album.images[0].url : ""}
            alt={track.name}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="font-bold text-2xl">{track.name}</h3>
        <div className="flex gap-x-4 items-center">
          <p className="text-neutral-300 text-xs">
            {track.artists.map((artist) => artist.name).join(", ")}
          </p>
          <div className="py-2 px-4 rounded-2xl bg-neutral-900 font-bold text-xs">
            Song
          </div>
        </div>
      </div>
      <PlayButton className="absolute bottom-4 right-4 group-hover:opacity-100 opacity-0" />
    </div>
  );
};

export default TopSongCard;
