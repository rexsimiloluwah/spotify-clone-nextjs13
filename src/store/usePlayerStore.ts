import { create } from "zustand";

interface PlayerStore {
  isPlaying: boolean;
  showTrackInfo: boolean;
  tracks: SpotifyApi.PlaylistTrackObject[] | null;
  activeTrackId?: string;
  activeDevices: SpotifyApi.UserDevice[] | null;
  setIsPlaying: (isPlaying: boolean) => void;
  setShowTrackInfo: (showTrackInfo: boolean) => void;
  setActiveDevices: (devices: SpotifyApi.UserDevice[] | null) => void;
  setActiveTrackId: (id: string) => void;
  setTracks: (tracks: SpotifyApi.PlaylistTrackObject[]) => void;

  reset: () => void;
}

const usePlayerStore = create<PlayerStore>((set) => ({
  isPlaying: false,
  showTrackInfo: false,
  tracks: null,
  activeDevices: null,
  activeTrackId: undefined,
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying: isPlaying }),
  setShowTrackInfo: (showTrackInfo: boolean) => set({ showTrackInfo }),
  setActiveDevices: (devices: SpotifyApi.UserDevice[] | null) =>
    set({ activeDevices: devices }),
  setActiveTrackId: (id: string) => set({ activeTrackId: id }),
  setTracks: (tracks: SpotifyApi.PlaylistTrackObject[]) => set({ tracks }),
  reset: () =>
    set({ isPlaying: false, tracks: null, activeTrackId: undefined }),
}));

export default usePlayerStore;
