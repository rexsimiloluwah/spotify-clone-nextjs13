"use client";
import React, { useState } from "react";

import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import PlayButton from "./PlayButton";

interface PlaylistCardProps {
  onClick?: () => void;
  imageUrl: string;
  title: string;
  description: string;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  onClick,
  imageUrl,
  title,
  description,
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  if (!imageLoaded) {
    return (
      <div className="relative group flex flex-col gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3">
        <Image
          className="object-cover h-0 opacity-0"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          src={imageUrl}
          fill
          alt="Image"
        />
        <Skeleton height={100} />
        <div className="pt-3">
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
    >
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          src={imageUrl}
          fill
          alt="Image"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{title}</p>
        <p className="text-neutral-400 text-xs pb-4 w-full truncate">
          {description}
        </p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
};

export default PlaylistCard;
