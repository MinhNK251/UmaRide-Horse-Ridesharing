import { create } from "zustand";

import { JockeyStore, LocationStore, MarkerData } from "@/types/type";

export const useLocationStore = create<LocationStore>((set) => ({
  userLatitude: null,
  userLongitude: null,
  userAddress: null,
  destinationLatitude: null,
  destinationLongitude: null,
  destinationAddress: null,
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }));

    // if Jockey is selected and now new location is set, clear the selected Jockey
    const { selectedJockey, clearSelectedJockey } = useJockeyStore.getState();
    if (selectedJockey) clearSelectedJockey();
  },

  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
    }));

    // if Jockey is selected and now new location is set, clear the selected Jockey
    const { selectedJockey, clearSelectedJockey } = useJockeyStore.getState();
    if (selectedJockey) clearSelectedJockey();
  },
}));

export const useJockeyStore = create<JockeyStore>((set) => ({
  jockeys: [] as MarkerData[],
  selectedJockey: null,
  setSelectedJockey: (jockeyId: number) =>
    set(() => ({ selectedJockey: jockeyId })),
  setJockeys: (jockeys: MarkerData[]) => set(() => ({ jockeys })),
  clearSelectedJockey: () => set(() => ({ selectedJockey: null })),
}));
