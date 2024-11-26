import { type LucideIcon } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  svgPath: string;
  demoUrl: string;
  colors: {
    light: {
      primary: string;
      secondary: string;
    };
    dark: {
      primary: string;
      secondary: string;
    };
  };
}
