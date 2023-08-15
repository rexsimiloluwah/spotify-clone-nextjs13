"use client";
import useGetArtistInfo from "@/hooks/useGetArtistInfo";
import useGetTrackById from "@/hooks/useGetTrackById";
import usePlayerStore from "@/store/usePlayerStore";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { SpotifyHeart, SpotifyThreeDots, SpotifyVerifiedCheck } from "./icons";
import Container from "./ui/Container";

const NowPlayingView = () => {
  const { showTrackInfo, activeTrackId, setShowTrackInfo } = usePlayerStore();
  const { track } = useGetTrackById(activeTrackId);
  const { artistInfo } = useGetArtistInfo(track?.artists[0].id as string);

  if (!showTrackInfo || !track) {
    return <div></div>;
  }

  return (
    <Container className="max-h-[calc(100vh-115px)] overflow-y-auto max-w-[22rem] py-4 px-4">
      <div className="gap-y-8 flex flex-col">
        <div className="flex items-end justify-end">
          <button className="rounded-full hover:bg-neutral-400/40 p-1">
            <AiOutlineClose
              onClick={() => setShowTrackInfo(false)}
              size={20}
              className="text-neutral-300 hover:text-white"
            />
          </button>
        </div>

        <div className="flex flex-col gap-y-2">
          <div className="w-full h-80 overflow-hidden relative rounded-md">
            <Image
              src={track.album.images ? track.album.images[0].url : ""}
              alt={track.name as string}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-y-2">
              <h3 className="text-lg font-semibold">{track.name}</h3>
              <p className="text-neutral-300">
                {track.artists.map((artist) => artist.name).join(",")}
              </p>
            </div>
            <div className="flex gap-x-2 items-center">
              <SpotifyHeart className="fill-green-500" size={24} />
              <SpotifyThreeDots className="fill-neutral-300" size={24} />
            </div>
          </div>
        </div>

        <div className="relative rounded-md w-full h-64 overflow-hidden p-4">
          <Image
            src={artistInfo?.images ? artistInfo.images[0].url : ""}
            alt={artistInfo?.name as string}
            fill
            className="object-cover"
          />

          <div className="absolute top-5">
            <div className="flex items-center gap-x-2">
              <SpotifyVerifiedCheck size={24} className="fill-blue-600" />
              <p>Verified Artist</p>
            </div>
          </div>

          <div className="absolute bottom-5">
            <h4 className="font-semibold text-neutral-300">
              {artistInfo?.followers.total.toLocaleString()} followers
            </h4>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default NowPlayingView;
