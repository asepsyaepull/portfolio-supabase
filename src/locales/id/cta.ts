import { CtaDictionary } from "../types";

export const ctaId: CtaDictionary = {
  frameTag: "CONTACT.FRAME",
  figmaTag: "contact.fig",
  badge: "TERSEDIA UNTUK KOLABORASI",
  headline: "Siap berkolaborasi.",
  subheadlineTemplate: (time: string) =>
    `Saat ini pukul ${time} di Jakarta. Punya ide proyek atau peluang peran strategis? Mari diskusikan sekarang.`,
  talkButton: "Hubungi Saya",
  pricingEstimateButton: "Kalkulator Estimasi Proyek",
};
