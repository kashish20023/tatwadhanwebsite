export interface OccasionLook {
  file: string;
  alt: string;
  title?: string;
  caption?: string;
}

export interface JournalStory {
  title: string;
  file: string;
  alt: string;
  date?: string;
  description?: string;
  href?: string;
}

export interface StorySlide {
  title: string;
  narrative: string;
  signoff: string;
  backdropImage: string;
  sideImage: string;
  sideAlt: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
