import { create } from "zustand";

const useStore = create((set) => ({
  // state
  rfps: [],
  selectedRfp: null,
  tab: "rfps",

  // actions
  setRfps: (rfps) => set({ rfps }),
  setSelectedRfp: (rfp) => set({ selectedRfp: rfp }),
  setTab: (tab) => set({ tab }),
}));

export default useStore;