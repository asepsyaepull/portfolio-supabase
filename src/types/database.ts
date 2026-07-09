export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  image_overlap: "top" | "bottom" | "none";
  icon_name: string;
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
