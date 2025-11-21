import { create } from "zustand";
import { ResumeData, DesignSettings, ALL_MOCK_DESIGNS,MOCK_DATA } from "@/_mock/resume";

interface ResumeState {
  resume: ResumeData;
  design: DesignSettings;
  setResume: (data: ResumeData) => void;
  setDesign: (designKey: keyof typeof ALL_MOCK_DESIGNS) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  resume: { ...MOCK_DATA },
  design: ALL_MOCK_DESIGNS.A,
  setResume: (data) => set({ resume: data }),
  setDesign: (key) => set({ design: ALL_MOCK_DESIGNS[key] }),
}));