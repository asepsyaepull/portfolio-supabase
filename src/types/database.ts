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
