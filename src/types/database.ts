export interface Project {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  tech_stack: string[];
  is_featured: boolean;
  role?: string;
  timeline?: string;
  tags?: string;
  tools?: string;
  long_description?: string;
  problem?: string;
  solution?: string;
  link?: string;
  image_url?: string;
  image_overlap?: "top" | "bottom" | "none";
  icon_name?: string;
  created_at?: string;
  order_index?: number;
}

export interface Skill {
  id: number;
  name: string;
  icon_name: string;
  color_class: string;
  created_at?: string;
  order_index?: number;
}

export interface UIGallery {
  id: string | number;
  title: string;
  slug: string;
  category: string;
  description?: string;
  image_url: string;
  thumbnail_url?: string;
  tools?: string[] | string;
  aspect_ratio?: string;
  figma_url?: string | null;
  preview_url?: string | null;
  is_featured?: boolean;
  order_index?: number;
  created_at?: string;
  updated_at?: string;
}
