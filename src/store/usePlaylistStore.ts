import { create } from "zustand";

interface PlaylistStore {
  activePlaylistId?: string;
  setActivePlaylistId: (id: string) => void;
  playlist:
    | SpotifyApi.PlaylistObjectSimplified[]
    | SpotifyApi.SinglePlaylistResponse[]
    | null;
  setPlaylist: (
    playlist:
      | SpotifyApi.PlaylistObjectSimplified[]
      | SpotifyApi.SinglePlaylistResponse[]
      | null,
  ) => void;
  reset: () => void;
}

const usePlaylistStore = create<PlaylistStore>((set) => ({
  activePlaylistId: undefined,
  setActivePlaylistId: (id: string) => set({ activePlaylistId: id }),
  playlist: null,
  setPlaylist: (
    playlist:
      | SpotifyApi.PlaylistObjectSimplified[]
      | SpotifyApi.SinglePlaylistResponse[]
      | null,
  ) => set({ playlist }),
  reset: () => set({ activePlaylistId: undefined, playlist: null }),
}));

export default usePlaylistStore;
