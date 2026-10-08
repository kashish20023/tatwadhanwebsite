import type { FAQItem, JournalStory, OccasionLook, StorySlide } from "@/types/occasion";

export const occasionLooks: OccasionLook[] = [
  {
    file: "/images/image_20.webp",
    alt: "A model in a blush embroidered sherwani",
    title: "The Sangeet Evening",
    caption: "Intricate tonal threadwork crafted for festive movement",
  },
  {
    file: "/images/image_05.webp",
    alt: "A relaxed couture portrait in blush",
    title: "Mehendi & High Tea",
    caption: "Airy silhouettes adorned with delicate gota patti",
  },
  {
    file: "/images/image_03.webp",
    alt: "A seated portrait in Indian couture",
    title: "The Royal Pheras",
    caption: "Heirloom zardozi raw silk for the sacred hour",
  },
];

export const journalStories: JournalStory[] = [
  {
    title: "Araico Collection launch",
    file: "/images/image_04.webp",
    alt: "A line of embroidered couture garments",
    date: "Tatvdhan Journal · Jaipur",
    description: "An homage to regal court dress featuring micro-zardozi wire and heritage velvet accents.",
    href: "/collection",
  },
  {
    title: "The Wedding Chapter Campaign",
    file: "/images/image_18.webp",
    alt: "The wedding chapter collection",
    date: "Tatvdhan Journal · Jaipur",
    description: "Photographed on location within Amber Palace, capturing dialogue between carved sandstone and silk.",
    href: "/collection",
  },
  {
    title: "Artisanal Karigar Study 2026",
    file: "/images/image_02.webp",
    alt: "A couture look framed by Jaipur architecture",
    date: "Tatvdhan Journal · Jaipur",
    description: "Documenting generational handloom techniques preserved across master artisan families in Rajasthan.",
    href: "/our-story",
  },
  {
    title: "Autumn / Winter Sneak Peek",
    file: "/images/image_05.webp",
    alt: "A detail from the couture collection",
    date: "Tatvdhan Journal · Jaipur",
    description: "Warm blush, champagne gold, and muted ivory palettes designed for timeless winter unions.",
    href: "/our-story",
  },
];

export const storySlides: StorySlide[] = [
  {
    title: "Our Story",
    narrative:
      "Tatvdhan began with a simple idea — to bring the beauty of Indian fashion into everyday life. Inspired by our roots and shaped by modern tastes, we create thoughtfully designed outfits that feel effortless, elegant, and personal. For us, every piece is more than clothing. It’s made for the moments you remember.",
    signoff: "Tatvdhan — Rooted in tradition. Made for today.",
    backdropImage: "/images/image_31.webp",
    sideImage: "/images/story_celebration.png",
    sideAlt: "Celebration and festive luxury sherwanis in Jaipur",
  },
  {
    title: "The Jaipur Atelier",
    narrative:
      "Within our sunlit Jaipur workrooms, master karigars spend hundreds of meticulous hours threading metallic zardozi and real silk threads. Each silhouette is constructed with architectonic precision yet designed to feel light as air.",
    signoff: "Tatvdhan — Rooted in tradition. Made for today.",
    backdropImage: "/images/image_31.webp",
    sideImage: "/images/image_20.webp",
    sideAlt: "Couture craftsmanship and intricate bridal embroidery",
  },
  {
    title: "Heirloom Silhouettes",
    narrative:
      "True luxury does not shout; it endures. Every garment from Tatvdhan is conceived as a future heirloom to be cherished across generations, balancing royal heritage with the ease of the modern gentleman.",
    signoff: "Tatvdhan — Rooted in tradition. Made for today.",
    backdropImage: "/images/image_31.webp",
    sideImage: "/images/image_03.webp",
    sideAlt: "A quiet moment in the Tatvdhan wedding collection",
  },
];

export const faqItems: FAQItem[] = [
  {
    question: "What do your bespoke plans actually include?",
    answer:
      "Every couture journey includes one-on-one design consultations, artisanal fabric selection, bespoke measurements, personalized hand-embroidery fittings, and final hand-finishing at our Jaipur atelier.",
  },
  {
    question: "Can I customize the embroidery and silhouette?",
    answer:
      "Yes, bespoke tailoring and personalized custom motifs are central to Tatvdhan. You can choose specific textiles, color palettes, embroidery densities, and silhouette adaptations.",
  },
  {
    question: "What is the timeline for custom bridal couture?",
    answer:
      "Typically, custom bridal ensembles require 6 to 10 weeks depending on the intricacy of hand-embroidery. Rush atelier services are available upon request for destination weddings.",
  },
  {
    question: "Do you offer virtual consultations for international clients?",
    answer:
      "Yes. We regularly host high-definition virtual consultations and send fabric swatches globally to clients across the US, UK, Middle East, and beyond.",
  },
  {
    question: "Where are the garments crafted?",
    answer:
      "Every piece is handcrafted by master karigars in our historic Jaipur ateliers, preserving authentic Rajasthani zardozi, gota, and ari techniques.",
  },
  {
    question: "How do I schedule an appointment?",
    answer:
      "You can arrange an appointment via our contact page or email our concierge directly at contact@tatvdhan.com for private showroom viewings.",
  },
];
