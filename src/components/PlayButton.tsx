import React from "react";
import { BiPlay } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

interface PlayButtonProps {
  className?: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ className }) => {
  return (
    <button
      className={twMerge(
        "transition opacity-0 rounded-full flex items-center bg-green-500 p-2 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-105",
        className,
      )}
    >
      <BiPlay className="text-black" size={36} />
    </button>
  );
};

export default PlayButton;
