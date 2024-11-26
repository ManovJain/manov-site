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
      light: {
        primary: "#3E721D",
        secondary: "#3E721D",
      },
      dark: {
        primary: "#A6D388",
        secondary: "#A6D388",
      },
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
      light: {
        // primary: "#FC321A",
        // secondary: "#FFAF00",
        primary: "#FFAF00",
        secondary: "#FC321A",
      },
      dark: {
        primary: "#FC321A",
        secondary: "#FFAF00",
      },
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
      light: {
        primary: "#000000",
        secondary: "#000000",
      },
      dark: {
        primary: "#FFFFFF",
        secondary: "#FFFFFF",
      },
    },
  },
];
