import Image from "next/image";
import React from "react";
import PlayButton from "./PlayButton";

interface UserHeaderPlaylistCardProps {
  playlist: SpotifyApi.SinglePlaylistResponse;
}

const UserHeaderPlaylistCard: React.FC<UserHeaderPlaylistCardProps> = ({
  playlist,
}) => {
  return (
    <div className="flex items-center gap-x-3 cursor-pointer bg-neutral-600/50 w-full rounded-md relative group">
      <div className="relative rounded-tl-md rounded-bl-md min-h-[72px] min-w-[72px] overflow-hidden">
        <Image
          fill
          src={playlist.images ? playlist.images[0].url : "/images/liked.png"}
          alt="Media Item"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate font-bold">{playlist.name}</p>
      </div>
      <div className="absolute right-4 opacity-0 group-hover:opacity-100">
        <PlayButton />
      </div>
    </div>
  );
};

export default UserHeaderPlaylistCard;
