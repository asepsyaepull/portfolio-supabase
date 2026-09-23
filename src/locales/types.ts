export type Locale = "id" | "en";

export interface CommonDictionary {
  nav: {
    home: string;
    about: string;
    work: string;
    experience: string;
    contact: string;
  };
  buttons: {
    downloadCv: string;
    emailMe: string;
    talkWithMe: string;
    startProject: string;
    viewArchive: string;
    send: string;
    sending: string;
  };
  status: {
    availableNow: string;
    remoteReady: string;
  };
}

export interface HeroDictionary {
  titleTop: string;
  titleGlitch: string;
  subtitle: string;
  ctaText: string;
  secondaryCtaText: string;
}

export interface MetricItem {
  to: number;
  prefix: string;
  suffix: string;
  label: string;
}

export interface WhatsupDictionary {
  tag: string;
  headline: string;
  viewAbout?: string;
  readStory?: string;
  statementTag: string;
  statementQuote: string;
  statementHighlight: string;
  statementSince: string;
  metricsTag: string;
  metrics: MetricItem[];
  philosophyTag: string;
  philosophyQuote: string;
  philosophyAuthor: string;
  currentlyBuildingTag: string;
  capabilitiesTag: string;
  capabilities: { label: string }[];
  capabilitiesSummary?: string;
  bridgeTag: string;
  bridgeBadge: string;
  bridgeTitle: string;
  bridgeSubtitle: string;
  bridgeDesignTitle: string;
  bridgeDesignTokens: string[];
  bridgeCodeTitle: string;
  bridgeCodeTokens: string[];
  bridgePipelineLabel: string;
  bridgeMetrics: Array<{ label: string; value: string }>;
  locationTag?: string;
  cityBadge?: string;
  baseStationTag?: string;
  locationTitle?: string;
  coordinates?: string;
  locationDesc?: string;
  localClockTag?: string;
}

export interface WorkflowMsg {
  from: "you" | "asep";
  text: string;
  time: string;
  attach?: string;
  reaction?: string;
}

export interface WorkflowStep {
  label: string;
  msgs: WorkflowMsg[];
}

export interface WorkflowDictionary {
  tag: string;
  title: string;
  subtitle: string;
  channelName: string;
  onlineStatus: string;
  inputPlaceholder: string;
  steps: WorkflowStep[];
}

export interface ExperienceItemLocale {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  type: string;
  location: string;
  project: string;
  description: string;
  contributions: string[];
  tech: string[];
}

export interface ExperienceDictionary {
  tag: string;
  titlePrefix: string;
  titleHighlight: string;
  subtitle: string;
  items: ExperienceItemLocale[];
}


export interface FaqItem {
  label: string;
  q: string;
  a: string;
  emailText?: string;
}

export interface FaqDictionary {
  tag: string;
  title: string;
  subtitle: string;
  items: FaqItem[];
}

export interface PricingDictionary {
  figmaTag: string;
  perProject: string;
  fixedScope: string;
  specialRate: string;
  prioritySlot: string;
  checkDirect: string;
  checkDeliverablesWithDev: string;
  checkDeliverablesDesignOnly: string;
  checkTimelinePrefix: string;
  socialProofPrefix: string;
  socialProofHighlight: string;
  parametersTag: string;
  showAdvanced: string;
  hideAdvanced: string;
  projectTypeLabel: string;
  pageScopeLabel: string;
  addons: {
    cmsTitle: string;
    cmsDesc: string;
    motionTitle: string;
    motionDesc: string;
    urgentTitle: string;
    urgentDesc: string;
    revisionsTitle: string;
    revisionsDesc: string;
  };
  slider: {
    justDesign: string;
    designAndDev: string;
    mostPicked: string;
    slideHint: string;
  };
  divider: {
    unlocked: string;
    locked: string;
  };
  deliverables: {
    base: string[];
    dev: string[];
  };
  cta: {
    startPrefix: string;
    copyDetails: string;
    copied: string;
    copyToast: string;
    footnote: string;
  };
  summary: {
    greeting: string;
    projectType: string;
    pageScope: string;
    package: string;
    packageDev: string;
    packageDesign: string;
    cmsSeo: string;
    motion: string;
    extraRevs: string;
    rounds: string;
    urgent: string;
    urgentYes: string;
    urgentRegular: string;
    timeline: string;
    total: string;
    closing: string;
    emailSubject: string;
  };
}

export interface CtaDictionary {
  frameTag: string;
  figmaTag: string;
  badge: string;
  headline: string;
  subheadlineTemplate: (time: string) => string;
  talkButton: string;
  pricingEstimateButton: string;
}

export interface FooterDictionary {
  heading: string;
  giantText: string;
  marqueeItems: string[];
}

export interface ContactFaqItem {
  question: string;
  answer: string;
}

export interface ContactPageDictionary {
  portalTag: string;
  badge: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  emailLabel: string;
  locationLabel: string;
  locationValue: string;
  availabilityLabel: string;
  availabilityValue: string;
  timezoneLabel: string;
  timezoneValue: string;
  copyEmailBtn: string;
  copiedEmailText: string;
  directChatBtn: string;
  socialHeading: string;

  // Studio Specs
  specs: {
    spec1: { num: string; label: string; desc: string };
    spec2: { num: string; label: string; desc: string };
    spec3: { num: string; label: string; desc: string };
    spec4: { num: string; label: string; desc: string };
  };

  // Form Composer
  formCardTag: string;
  fullNameLabel: string;
  emailAddressLabel: string;
  subjectLabel: string;
  messageLabel: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  subjectPlaceholder: string;
  messagePlaceholder: string;
  submitButton: string;
  submittingButton: string;
  successMessage: string;
  scopeTitle: string;
  scopeChips: string[];

  // Collab FAQ
  faqHeading: string;
  faqSubheading: string;
  faqs: ContactFaqItem[];
}

export interface EducationItem {
  school: string;
  degree: string;
  year: string;
  gpa: string;
}

export interface SkillItemData {
  label: string;
  percent: number;
}

export interface AboutPageDictionary {
  badge: string;
  headlineMain: string;
  headlineSub: string;
  bio1Prefix: string;
  bio1Name: string;
  bio1Suffix: string;
  bio2: string;
  skillsTitle: string;
  designTitle: string;
  designSkills: SkillItemData[];
  devTitle: string;
  devSkills: SkillItemData[];
  foundationsTitle: string;
  education: EducationItem[];
  journeyTitle: string;
  statusBadge?: string;
  experienceYears?: string;
  location?: string;
  rolesHeadline?: string;
  viewProjectsBtn?: string;
  contactBtn?: string;
}

export interface ProjectsPageDictionary {
  badge: string;
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  allFilter: string;
  filterLabel?: string;
  readCaseStudy: string;
  seeProcess: string;
  hideProcess: string;
  architectureScope: string;
  deliverablesTechStack: string;
  outcomeLabel?: string;
  backToProjects: string;
  launchProject: string;
  unavailable: string;
  emptyProjects?: string;
  quickSpecs?: {
    production: string;
    disciplines: string;
    impact: string;
    systems: string;
  };
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButton?: string;
  viewDetails?: string;
  tabCaseStudies?: string;
  tabGallery?: string;
  galleryBadge?: string;
  galleryTitlePrefix?: string;
  galleryTitleHighlight?: string;
  galleryDescription?: string;
  allGalleryFilter?: string;
  emptyGallery?: string;
  inspectShot?: string;
  openFigma?: string;
  livePreview?: string;
  lightboxClose?: string;
  lightboxNext?: string;
  lightboxPrev?: string;
  lightboxToolsLabel?: string;
}

export interface WorkSectionDictionary {
  workspaceTag: string;
  workspaceTitle: string;
  workspaceSubtitle: string;
  cinematicTitle: string;
  cinematicSubtitle: string;
  cinematicDescription: string;
  cinematicButton: string;
  archiveCalloutTag: string;
  archiveCalloutTitle: string;
  archiveCalloutDescription: string;
}

export interface Dictionary {
  common: CommonDictionary;
  hero: HeroDictionary;
  whatsup: WhatsupDictionary;
  workflow: WorkflowDictionary;
  experience: ExperienceDictionary;
  faq: FaqDictionary;
  pricing: PricingDictionary;
  cta: CtaDictionary;
  footer: FooterDictionary;
  contactPage: ContactPageDictionary;
  aboutPage: AboutPageDictionary;
  projectsPage: ProjectsPageDictionary;
  work: WorkSectionDictionary;
}

