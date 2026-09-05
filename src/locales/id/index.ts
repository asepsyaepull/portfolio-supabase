import { Dictionary } from "../types";
import { commonId } from "./common";
import { heroId } from "./hero";
import { whatsupId } from "./whatsup";
import { workflowId } from "./workflow";
import { experienceId } from "./experience";
import { whyId } from "./why";
import { faqId } from "./faq";
import { pricingId } from "./pricing";
import { ctaId } from "./cta";
import { footerId } from "./footer";
import { contactPageId } from "./contact-page";
import { aboutPageId } from "./about-page";
import { projectsPageId } from "./projects-page";
import { workId } from "./work";

export const idDictionary: Dictionary = {
  common: commonId,
  hero: heroId,
  whatsup: whatsupId,
  workflow: workflowId,
  experience: experienceId,
  why: whyId,
  faq: faqId,
  pricing: pricingId,
  cta: ctaId,
  footer: footerId,
  contactPage: contactPageId,
  aboutPage: aboutPageId,
  projectsPage: projectsPageId,
  work: workId,
};

export default idDictionary;
