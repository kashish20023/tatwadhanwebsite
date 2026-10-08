import type { FooterColumn, NavLink } from "@/types/common";

export const mainNavLinks: NavLink[] = [
  { label: "Collection", href: "/collection" },
  { label: "Occasions", href: "/occasions" },
  { label: "Discover", href: "/discover" },
  { label: "Media", href: "/media" },
  { label: "Our Story", href: "/our-story" },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "The Company",
    links: [
      { label: "About Us", href: "/our-story" },
      { label: "Runways", href: "/media" },
      { label: "Contact Us", href: "/contact" },
      { label: "Sustainability", href: "/our-story" },
      { label: "Career", href: "/contact" },
    ],
  },
  {
    title: "Need Help",
    links: [
      { label: "FAQ's", href: "/#faq" },
      { label: "Fees And Payment", href: "/contact" },
      { label: "Couture Process", href: "/collection" },
      { label: "Find a Store", href: "/contact" },
      { label: "Shipping", href: "/contact" },
      { label: "Visit Store", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy & Cookies", href: "/privacy" },
      { label: "Term And Condition", href: "/terms" },
      { label: "Profile", href: "/contact" },
      { label: "Association", href: "/#the-man-himself" },
    ],
  },
];
