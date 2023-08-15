"use client";
import usePlayTrack from "@/hooks/usePlayTrack";
import usePlayerStore from "@/store/usePlayerStore";
import { convertMsTrackDuration } from "@/utils/time";
import Image from "next/image";
import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";

interface TrackTableProps {
  tracks: SpotifyApi.PlaylistTrackObject[] | undefined;
}

const TracksTable: React.FC<TrackTableProps> = ({ tracks }) => {
  const { setTracks } = usePlayerStore();
  const { handlePlay } = usePlayTrack();

  return (
    <table className="min-w-full">
      <thead className="border-b-[1px] border-neutral-300">
        <tr className="text-neutral-300">
          <th className="text-left font-light py-4">#</th>
          <th className="text-left font-light py-4">Title</th>
          <th className="text-left font-light py-4">Album</th>
          <th className="text-left font-light py-4">Date Added</th>
          <th className="font-light py-4">
            <AiOutlineClockCircle />
          </th>
        </tr>
      </thead>

      <tbody>
        {tracks &&
          tracks.map((track, id) => (
            <tr
              key={id}
              onClick={async () => {
                await handlePlay(track?.track);
                setTracks(tracks);
              }}
              className="cursor-pointer hover:bg-neutral-400/10 rounded-md"
            >
              <td className="py-2">{id + 1}</td>
              <td className="py-2">
                <div className="flex gap-x-3">
                  <div className="relative overflow-hidden w-[36px] h-[36px]">
                    <Image
                      className="object-cover"
                      src={
                        track.track?.album.images
                          ? track.track.album.images[0].url
                          : "/images/liked.png"
                      }
                      fill
                      alt={track.track?.name as string}
                    />
                  </div>
                  <div>
                    <h4>{track.track?.name}</h4>
                    <p className="text-xs text-neutral-300">
                      {track.track?.artists
                        .map((artist) => artist.name)
                        .join(", ")}
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-2 text-neutral-300 hover:underline hover:underline-offset-2 text-sm">
                {track.track?.album.name}
              </td>
              <td className="py-2 text-neutral-300 text-sm">1 hour ago</td>
              <td className="py-2 text-neutral-300 text-sm">
                {convertMsTrackDuration(Number(track.track?.duration_ms))}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TracksTable;
