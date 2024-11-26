"use client";

import { useState } from "react";
import { projects } from "../../data/projects";
import styles from "./AnimatedTabs.module.css";

interface AnimatedTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function AnimatedTabs({ activeTab, onTabChange }: AnimatedTabsProps) {
  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
  };

  return (
    <div className={styles.tabsContainer}>
      {projects.map((project) => {
        const Icon = project.icon;
        return (
          <button
            key={project.id}
            className={`${styles.tabItem} ${
              activeTab === project.id ? styles.active : ""
            }`}
            onClick={() => handleTabClick(project.id)}
            aria-selected={activeTab === project.id}
            role="tab"
          >
            <Icon className={styles.icon} aria-hidden="true" />
            <span className={styles.text}>{project.title}</span>
          </button>
        );
      })}
    </div>
  );
}
