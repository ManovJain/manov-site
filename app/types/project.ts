import { type LucideIcon } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  svgPath: string;
  demoUrl: string;
  colors: {
    primary: string;
    secondary: string;
  };
}
