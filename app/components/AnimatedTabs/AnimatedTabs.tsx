"use client";

import { projects } from "../../data/projects";
import styles from "./AnimatedTabs.module.css";

interface AnimatedTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  tabs: { id: string; label: string }[];
}

export function AnimatedTabs({
  activeTab,
  onTabChange,
  tabs,
}: AnimatedTabsProps) {
  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
  };

  return (
    <div className={styles.tabsContainer}>
      {tabs.map((tab) => {
        const Icon = projects.find((project) => project.id === tab.id)?.icon;
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
            {Icon && (
              <Icon
                className={styles.icon}
                aria-hidden="true"
                style={{ color: "var(--color-foreground)" }}
              />
            )}
            <span className={styles.text}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
