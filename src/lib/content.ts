export interface ServiceItem {
  name: string;
  price: string;
}

export interface ServiceCategory {
  title: string;
  image: string;
  services: ServiceItem[];
}

export interface GalleryImage {
  url: string;
  caption: string;
}

export interface SiteConfig {
  whatsapp: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
  tiktok: string;
}
