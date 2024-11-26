import { Project } from "../types/project";
import { Cherry, ChefHat, CalendarCheck } from "lucide-react";

export const projects: Project[] = [
  {
    id: "anim",
    title: "anim",
    description: "AI-crafted recipes for your health and happiness.",
    icon: ChefHat,
    svgPath: "/assets/anim_logo.svg",
    demoUrl: "https://example.com/office-demo",
    colors: {
      primary: "#A6D388",
      secondary: "#333333",
    },
  },
  {
    id: "inSZN",
    title: "inSZN",
    description: "Discover what’s in season, wherever you are.",
    icon: Cherry,
    svgPath: "/assets/inSZN_logo.svg",
    demoUrl: "https://example.com/edutech-demo",
    colors: {
      primary: "#FC321A",
      secondary: "#3E721D",
    },
  },
  {
    id: "nios",
    title: "NiOS",
    description: "Seamless habit tracking, synced with Notion and iOS.",
    icon: CalendarCheck,
    svgPath: "/assets/NiOS_logo.svg",
    demoUrl: "https://example.com/garden-demo",
    colors: {
      primary: "#FFFFFF",
      secondary: "#FFFFFF",
    },
  },
];
