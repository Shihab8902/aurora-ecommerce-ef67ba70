export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  images?: string[];
  featured: boolean;
  rating: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  comment: string;
  rating: number;
}

export interface SiteConfig {
  template_id: string;
  brand: {
    name: string;
    logo: string;
    logoWhite: string;
  };
  theme: {
    colors: Record<string, string>;
    borderRadius: string;
    shadows: Record<string, string>;
  };
  layout: Record<string, string>;
  features: Record<string, number>;
}
