"use client";
import { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavControls from "./NavControls";
import UserAccountDropdownMenu from "./UserAccountDropdownMenu";
import UserHeaderPlaylistCard from "./UserHeaderPlaylistCard";

interface UserPageHeaderProps {
  user: Omit<User, "id">;
  lastPlayedPlaylists: SpotifyApi.SinglePlaylistResponse[] | null;
}

const UserPageHeader: React.FC<UserPageHeaderProps> = ({
  user,
  lastPlayedPlaylists,
}) => {
  return (
    <div className="h-fit bg-gradient-to-b from-indigo-800 p-6">
      <div className="bg-transparent w-full flex justify-between items-center">
        <NavControls />

        {user ? (
          <UserAccountDropdownMenu>
            <div
              aria-labelledby={user.name as string}
              className="relative aspect-square w-8 h-8 rounded-full overflow-hidden cursor-pointer"
            >
              <Image
                className="object-cover"
                src={user.image as string}
                fill
                alt={user.name as string}
                loading="lazy"
              />
            </div>
          </UserAccountDropdownMenu>
        ) : null}
      </div>

      <div className="py-4">
        <h1 className="text-3xl font-semibold">Good evening</h1>
        <div className="grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 w-full my-4">
          <UserHeaderPlaylistCard
            playlist={
              { name: "Liked Songs" } as SpotifyApi.SinglePlaylistResponse
            }
          />
          {lastPlayedPlaylists &&
            lastPlayedPlaylists.map((playlist, id) => (
              <Link href={`/playlist/${playlist.id}`} key={id}>
                <UserHeaderPlaylistCard playlist={playlist} />
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserPageHeader;
