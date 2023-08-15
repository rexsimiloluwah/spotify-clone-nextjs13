"use client";
import useGetTrackById from "@/hooks/useGetTrackById";
import usePlayTrack from "@/hooks/usePlayTrack";
import useSpotify from "@/hooks/useSpotify";
import useTrackVolume from "@/hooks/useTrackVolume";
import usePlayerStore from "@/store/usePlayerStore";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  SpotifyConnectDevice,
  SpotifyLyrics,
  SpotifyPause,
  SpotifyPlay,
  SpotifyPlayerNext,
  SpotifyPlayerPrev,
  SpotifyPlayerQueue,
  SpotifyPlayerRepeat,
  SpotifyVolume,
} from "./icons";
import SpotifyNowPlaying from "./icons/SpotifyNowPlaying";
import SpotifyPlayerShuffle from "./icons/SpotifyPlayerShuffle";
import Slider from "./ui/Slider";
import Tooltip from "./ui/Tooltip";

interface Props {}

const Player = () => {
  const { spotifyApi } = useSpotify();
  const {
    activeTrackId,
    activeDevices,
    setIsPlaying,
    isPlaying,
    tracks,
    showTrackInfo,
    setShowTrackInfo,
  } = usePlayerStore();
  const [volume, setVolume] = useState<number>(50);
  const { handlePlay } = usePlayTrack();
  const { track } = useGetTrackById(activeTrackId);
  const { debouncedVolume: _ } = useTrackVolume(volume);

  if (!activeTrackId) {
    return null;
  }

  /**
   * Play or pause the track
   */
  const handlePlayPause = async () => {
    try {
      const playbackState = await spotifyApi.getMyCurrentPlaybackState();

      if (playbackState.body.is_playing) {
        await spotifyApi.pause();
        setIsPlaying(false);
      } else {
        await spotifyApi.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Play the next track in the tracks queue
   * @returns
   */
  const handleNextTrack = async () => {
    try {
      if (!tracks || !tracks.length) {
        return;
      }

      const currentIndex = tracks.findIndex(
        (track) => track.track?.id === activeTrackId,
      );

      const nextTrack = tracks[currentIndex + 1];

      if (!nextTrack) {
        await handlePlay(tracks[0].track);
      }

      await handlePlay(nextTrack.track);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Play the previous track in the tracks queue
   * @returns
   */
  const handlePrevTrack = async () => {
    try {
      if (!tracks || !tracks.length) {
        return;
      }

      const currentIndex = tracks.findIndex(
        (track) => track.track?.id === activeTrackId,
      );

      const prevTrack = tracks[currentIndex - 1];

      if (!prevTrack) {
        await handlePlay(tracks[tracks.length - 1].track);
      }

      await handlePlay(prevTrack.track);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="bg-black w-full py-3 px-4 flex justify-between items-center md:grid md:grid-cols-3">
        <div className="flex gap-x-4 items-center">
          <div className="relative rounded-md overflow-hidden w-[48px] h-[48px]">
            <Image
              fill
              src={track?.album.images ? track.album.images[0].url : ""}
              alt={track?.name as string}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <h4 className="text-sm">{track?.name}</h4>
            <p className="text-xs text-neutral-300">
              {track?.artists.map((artist) => artist.name).join(", ")}
            </p>
          </div>
        </div>
        <div className="hidden gap-y-3 md:flex flex-col justify-center items-center">
          <div className="flex gap-x-4">
            <Tooltip content="Enable Shuffle">
              <button>
                <SpotifyPlayerShuffle
                  size={18}
                  className="fill-neutral-300/50"
                />
              </button>
            </Tooltip>
            <Tooltip content="Previous">
              <button>
                <SpotifyPlayerPrev
                  size={18}
                  className="fill-neutral-300 hover:fill-white"
                  onClick={handlePrevTrack}
                />
              </button>
            </Tooltip>
            <button
              className="bg-white rounded-full p-1 hover:scale-105 transition"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <SpotifyPause className="fill-black" size={20} />
              ) : (
                <SpotifyPlay className="fill-black" size={20} />
              )}
            </button>
            <Tooltip content="Next">
              <button>
                <SpotifyPlayerNext
                  size={18}
                  className="fill-neutral-300 hover:fill-white"
                  onClick={handleNextTrack}
                />
              </button>
            </Tooltip>
            <Tooltip content="Enable Repeat">
              <button>
                <SpotifyPlayerRepeat
                  size={18}
                  className="fill-neutral-300/50"
                />
              </button>
            </Tooltip>
          </div>
          <div className="min-w-[30rem]">
            <Slider value={50} handleChange={() => {}} />
          </div>
        </div>
        <div className="hidden md:flex gap-x-3 items-center justify-end">
          <Tooltip content="Now Playing View">
            <button onClick={() => setShowTrackInfo(!showTrackInfo)}>
              <SpotifyNowPlaying
                size={24}
                className={twMerge(
                  "fill-neutral-300/50",
                  showTrackInfo
                    ? "fill-green-500"
                    : "fill-neutral-300/50 hover:fill-white",
                )}
              />
            </button>
          </Tooltip>

          <Tooltip content="Lyrics">
            <button>
              <SpotifyLyrics
                size={24}
                className="fill-neutral-300/50 hover:fill-white"
              />
            </button>
          </Tooltip>

          <Tooltip content="Queue">
            <button>
              <SpotifyPlayerQueue
                size={24}
                className="fill-neutral-300/50 hover:fill-white"
              />
            </button>
          </Tooltip>

          <Tooltip content="Connect To a Device">
            <button>
              <SpotifyConnectDevice
                size={24}
                className="fill-neutral-300/50 hover:fill-white"
              />
            </button>
          </Tooltip>

          <div className="flex gap-x-2 items-center">
            <Tooltip content="Mute">
              <button>
                <SpotifyVolume
                  size={24}
                  className="fill-neutral-300/50 hover:fill-white"
                />
              </button>
            </Tooltip>
            <div className="min-w-[6rem] mt-[-8px]">
              <Slider
                value={volume}
                handleChange={(e) => {
                  setVolume(Number(e.target.value));
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={twMerge(
          "w-full text-xs font-semibold text-right px-3 py-1",
          activeDevices ? "bg-green-500 text-black" : "bg-red-500 text-white",
        )}
      >
        {activeDevices ? (
          <p>Listening on {activeDevices[0].name}</p>
        ) : (
          <p>No Devices Found!</p>
        )}
      </div>
    </>
  );
};

export default Player;
