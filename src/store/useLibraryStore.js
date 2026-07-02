import { create } from 'zustand';

// Holds the local track list + permission state so any screen can read it
// without re-scanning the device every time.
export const useLibraryStore = create((set) => ({
  localTracks: [],
  hasPermission: false,
  setLocalTracks: (tracks) => set({ localTracks: tracks }),
  setHasPermission: (value) => set({ hasPermission: value }),
}));
