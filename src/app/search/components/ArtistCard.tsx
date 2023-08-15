"use client";
import React, { useState } from "react";

import PlayButton from "@/components/PlayButton";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

interface ArtistCardProps {
  artist: SpotifyApi.ArtistObjectFull;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist }) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  if (!imageLoaded) {
    return (
      <div className="relative rounded-fu group flex flex-col gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3">
        <Image
          className="object-cover h-0 opacity-0"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          src={
            artist.images.filter((image) => image !== undefined).length
              ? artist.images[0].url
              : ""
          }
          fill
          alt="Image"
        />
        <Skeleton height={100} className="rounded-full" />
        <div className="pt-3">
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3">
      <div className="relative aspect-square w-full h-full rounded-full overflow-hidden">
        <Image
          className="object-cover"
          src={
            artist.images.filter((image) => image !== undefined).length
              ? artist.images[0].url
              : ""
          }
          fill
          alt={artist.name}
          loading="lazy"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{artist.name}</p>
        <p className="text-neutral-400 text-xs pb-2 w-full truncate">Artist</p>
      </div>
      <div className="absolute bottom-20 right-3">
        <PlayButton />
      </div>
    </div>
  );
};

export default ArtistCard;
