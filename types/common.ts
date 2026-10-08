export interface NavLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface SiteMetadata {
  name: string;
  tagline: string;
  description: string;
  city: string;
  year: number;
}
