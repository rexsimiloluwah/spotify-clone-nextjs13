"use client";
import React, { PropsWithChildren } from "react";

import useGetUserPlaylists from "@/hooks/useGetUserPlaylists";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Split from "react-split";
import { twMerge } from "tailwind-merge";
import CallToSignUp from "./CallToSignUp";
import Library from "./Library";
import NowPlayingView from "./NowPlayingView";
import Player from "./Player";
import SidebarItem from "./SidebarItem";
import { SpotifyHome, SpotifySearch } from "./icons";
import Container from "./ui/Container";

interface SidebarLayoutProps {}

const SidebarLayout: React.FC<PropsWithChildren<SidebarLayoutProps>> = ({
  children,
}) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { userPlaylists } = useGetUserPlaylists();

  const routes = [
    {
      label: "Home",
      active: pathname !== "/search",
      href: "/",
      icon: SpotifyHome,
    },
    {
      label: "Search",
      active: pathname === "/search",
      href: "/search",
      icon: SpotifySearch,
    },
  ];

  return (
    <div className={twMerge("h-screen flex flex-col no-scrollbar")}>
      <div className="flex flex-1">
        <Split direction="horizontal" className="flex flex-1" gutterSize={5}>
          <div className="hidden md:flex flex-col gap-y-2 bg-black w-[350px] max-w-[350px] p-2">
            <Container>
              <div className="flex flex-col gap-y-6 px-5 py-4">
                {routes.map((item, id) => (
                  <SidebarItem key={id} {...item} />
                ))}
              </div>
            </Container>

            <Container className="overflow-y-auto flex-1 flex-grow">
              <Library playlists={userPlaylists} />
            </Container>
          </div>

          <main className="flex-1 overflow-y-auto py-2 pr-2 flex gap-x-2">
            <div className="w-full">{children}</div>
            <NowPlayingView />
          </main>
        </Split>
      </div>
      {status !== "loading" && !session?.user ? <CallToSignUp /> : null}
      <Player />
    </div>
  );
};

export default SidebarLayout;
