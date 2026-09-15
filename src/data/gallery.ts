export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  date: string;
  location?: string;
  caption: string;
  width: number;
  height: number;
  tags: string[];
}

export const galleryConfig = {
  // Feature-gated: Set to false until real photography exists per prompt section 20
  enabled: false,
  title: "Visual Log & Photography",
  subtitle: "Moments, architectures, and light from New Delhi and beyond.",
};

export const galleryPhotos: GalleryPhoto[] = [];
