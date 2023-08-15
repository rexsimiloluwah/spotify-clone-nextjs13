"use client";
import usePlaylistStore from "@/store/usePlaylistStore";
import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";

interface LibraryPlaylistCardProps {
  playlist: SpotifyApi.PlaylistObjectSimplified;
  onClick?: () => void;
}

const LibraryPlaylistCard: React.FC<LibraryPlaylistCardProps> = ({
  playlist,
}) => {
  const { activePlaylistId, setActivePlaylistId } = usePlaylistStore();

  return (
    <div
      onClick={() => setActivePlaylistId(playlist.id)}
      className={twMerge(
        "flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md",
        activePlaylistId === playlist.id && "bg-neutral-800/50",
      )}
    >
      <div
        className="
          relative 
          rounded-md 
          min-h-[48px] 
          min-w-[48px] 
          overflow-hidden
        "
      >
        <Image
          fill
          src={playlist.images ? playlist.images[0].url : "/images/liked.png"}
          alt={playlist.name as string}
          className="object-cover"
        />
      </div>
      <div className="hidden md:flex flex-col gap-y-1 overflow-hidden ">
        <p className="text-white truncate font-semibold">{playlist.name}</p>
        <p className="text-neutral-400 text-xs truncate">
          {playlist.owner.display_name}
        </p>
      </div>
    </div>
  );
};

export default LibraryPlaylistCard;
