"use client";
import usePlayerStore from "@/store/usePlayerStore";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import React from "react";
import { twMerge } from "tailwind-merge";
import PlaylistCard from "./PlaylistCard";
import UserPageHeader from "./UserPageHeader";

interface UserPageContentProps {
  lastPlayedPlaylists: SpotifyApi.SinglePlaylistResponse[] | null;
  featuredPlaylists: SpotifyApi.PlaylistObjectSimplified[] | null;
}

const UserPageContent: React.FC<UserPageContentProps> = ({
  lastPlayedPlaylists,
  featuredPlaylists,
}) => {
  const { data: session } = useSession();
  const { activeTrackId } = usePlayerStore();

  return (
    <div
      className={twMerge(
        "overflow-y-auto relative",
        activeTrackId
          ? "md:max-h-[calc(100vh-120px)]"
          : "md:max-h-[calc(100vh-60px)]",
      )}
    >
      <UserPageHeader
        user={session?.user as User}
        lastPlayedPlaylists={lastPlayedPlaylists}
      />

      <div className="h-fit py-4 px-6">
        <h1 className="text-3xl font-semibold">Featured Playlists</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 my-4">
          {featuredPlaylists?.map(({ name, description, images }, id) => (
            <PlaylistCard
              key={id}
              title={name}
              description={description || ""}
              imageUrl={images[0].url || "/images/liked.png"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPageContent;
