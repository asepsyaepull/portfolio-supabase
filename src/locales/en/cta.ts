import { CtaDictionary } from "../types";

export const ctaEn: CtaDictionary = {
  frameTag: "CONTACT.FRAME",
  figmaTag: "contact.fig",
  badge: "golden hour in jakarta",
  headline: "Still building.",
  subheadlineTemplate: (time: string) =>
    `Currently ${time} in the studio. Have a project or an open role? Let's discuss it today.`,
  talkButton: "Talk with me",
  pricingEstimateButton: "Estimate Project Cost",
};
