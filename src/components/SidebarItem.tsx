import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import { SpotifyHome } from "./icons";

interface SidebarItemProps {
  icon: typeof SpotifyHome;
  label: string;
  active?: boolean;
  href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  href,
  active,
}) => {
  return (
    <Link
      className={twMerge(
        "flex items-center flex-row h-auto w-full gap-x-4 text-md font-semibold cursor-pointer hover:text-white transition text-neutral-300 group",
        active && "text-white",
      )}
      href={href}
    >
      <Icon
        size={28}
        className={twMerge(
          "fill-neutral-300 group-hover:fill-white",
          active && "fill-white",
        )}
      />
      <p className="truncate w-full">{label}</p>
    </Link>
  );
};

export default SidebarItem;
