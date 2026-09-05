import { CtaDictionary } from "../types";

export const ctaId: CtaDictionary = {
  frameTag: "CONTACT.FRAME",
  figmaTag: "contact.fig",
  badge: "golden hour in jakarta",
  headline: "Still building.",
  subheadlineTemplate: (time: string) =>
    `Jam ${time} di studio. Punya project atau posisi yang cocok? Yuk, ceritakan sekarang.`,
  talkButton: "Talk with me",
  pricingEstimateButton: "Estimasi Biaya Proyek",
};
