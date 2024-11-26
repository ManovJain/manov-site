"use client";

import { useState } from "react";
import { Building, GraduationCap, Sun, Cloud } from "lucide-react";
import styles from "./AnimatedTabs.module.css";

interface Tab {
  id: string;
  icon: React.ElementType;
  text: string;
}

const tabs: Tab[] = [
  { id: "office", icon: Building, text: "Office" },
  { id: "education", icon: GraduationCap, text: "Education" },
  { id: "garden", icon: Sun, text: "Garden" },
  { id: "cloud", icon: Cloud, text: "Cloud" },
];

interface AnimatedTabsProps {
  onTabChange: (tabId: string) => void;
}

export function AnimatedTabs({ onTabChange }: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState<string>("office");

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange(tabId);
  };

  return (
    <div className={styles.tabsContainer}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            className={`${styles.tabItem} ${
              activeTab === tab.id ? styles.active : ""
            }`}
            onClick={() => handleTabClick(tab.id)}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            <Icon className={styles.icon} aria-hidden="true" />
            <span className={styles.text}>{tab.text}</span>
          </button>
        );
      })}
    </div>
  );
}
