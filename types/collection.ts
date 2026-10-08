export type CollectionCategory = "all" | "sherwanis" | "details" | "atmosphere";

export interface LookItem {
  tag: string;
  title: string;
  caption: string;
  image: string;
  alt: string;
  focalPosition?: string;
}

export interface LookPair {
  id: string;
  category: CollectionCategory;
  pairNumber: string;
  left: LookItem;
  right: LookItem;
}

export interface CollectionFilterOption {
  id: CollectionCategory;
  label: string;
}
