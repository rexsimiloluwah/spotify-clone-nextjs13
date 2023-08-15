"use client";
import usePlayerStore from "@/store/usePlayerStore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiGlobe } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import LibraryPlaylistCard from "./LibraryPlaylistCard";
import { SpotifyLibrary } from "./icons";
import Button from "./ui/Button";
import Tooltip from "./ui/Tooltip";

interface LibraryProps {
  playlists: SpotifyApi.PlaylistObjectSimplified[] | null;
}

const Library: React.FC<LibraryProps> = ({ playlists }) => {
  const legalLinks = [
    {
      title: "Legal",
      href: "https://spotify.com/ng/legal",
    },
    {
      title: "Privacy Center",
      href: "https://spotify.com/ng/privacy",
    },
    {
      title: "Privacy Policy",
      href: "https://spotify.com/ng/legal/privacy-policy",
    },
    {
      title: "Cookies",
      href: "https://spotify.com/ng/legal/cookies-policy",
    },
    {
      title: "About Ads",
      href: "https://spotify.com/ng/legal/privacy-policy",
    },
    {
      title: "Accessibility",
      href: "https://spotify.com/ng/accessibility",
    },
  ];

  const { activeTrackId } = usePlayerStore();
  const { status } = useSession();

  return (
    <div className="flex flex-col py-4">
      {/* Header */}
      <div className="flex px-4 justify-between items-center">
        <Tooltip content="Collapse Your Library">
          <div className="inline-flex gap-x-3 items-center group font-semibold text-neutral-300 cursor-pointer">
            <SpotifyLibrary className="fill-neutral-300 group-hover:fill-white" />
            <p className="group-hover:text-white">Your Library</p>
          </div>
        </Tooltip>

        <Tooltip content="Create playlist or folder">
          <button className="text-neutral-300 hover:text-white transition w-[32px] h-[32px] flex justify-center items-center rounded-full hover:bg-neutral-600/10 hover:scale-105">
            <AiOutlinePlus size={20} />
          </button>
        </Tooltip>
      </div>

      {/* Body */}
      {status === "authenticated" ? (
        <div className="overflow-y-auto">
          {playlists && playlists.length > 0 ? (
            <div
              className={twMerge(
                "flex flex-col overflow-y-auto gap-y-3 px-4 py-3",
                activeTrackId
                  ? "max-h-[calc(100vh-300px)]"
                  : "max-h-[calc(100vh-200px)]",
              )}
            >
              {playlists.map((item, id) => (
                <Link key={id} href={`/playlist/${item.id}`}>
                  <LibraryPlaylistCard playlist={item} />
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <>
          <div className="overflow-y-auto max-h-[150px] flex flex-col my-4 gap-y-4 px-1">
            <div className="bg-neutral-800 p-4 flex-col flex gap-y-4 rounded-lg">
              <h3 className="font-semibold">Create your first playlist</h3>
              <p className="text-sm">It&apos;s easy, we&apos;ll help you</p>
              <Button className="w-fit text-sm">Create playlist</Button>
            </div>

            <div className="bg-neutral-800 p-4 flex-col flex gap-y-4 rounded-lg">
              <h3 className="font-semibold">
                Let&apos;s find some podcasts to follow
              </h3>
              <p className="text-sm">
                We&apos;ll keep you updated on new episodes
              </p>
              <Button className="w-fit text-sm">Browse podcasts</Button>
            </div>
          </div>

          <div className="flex flex-col p-4 gap-y-4">
            <div className="flex flex-wrap gap-6">
              {legalLinks.map(({ title, href }, id) => (
                <Link
                  key={id}
                  href={href}
                  target="_blank"
                  className="text-xs text-neutral-400 font-medium hover:underline hover:underline-offset-8"
                >
                  {title}
                </Link>
              ))}
            </div>

            <Button className="flex items-center w-fit gap-x-2 text-white border-[1px] text-sm border-neutral-400 bg-transparent p-2 px-4 font-normal">
              <BiGlobe size={20} /> English
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Library;
