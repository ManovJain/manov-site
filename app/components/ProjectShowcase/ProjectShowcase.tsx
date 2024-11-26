"use client";

import { useState } from "react";
import Image from "next/image";
import { Project } from "../../types/project";
import { projects } from "../../data/projects";
import { AnimatedTabs } from "../AnimatedTabs/AnimatedTabs";
import styles from "./ProjectShowcase.module.css";

export function ProjectShowcase() {
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);

  const handleTabChange = (tabId: string) => {
    const selectedProject = projects.find((project) => project.id === tabId);
    if (selectedProject) {
      setActiveProject(selectedProject);
    }
  };

  return (
    <div className={styles.container}>
      <AnimatedTabs onTabChange={handleTabChange} />
      <div className={styles.showcase}>
        <Image
          src={activeProject.image}
          alt={activeProject.title}
          fill
          className={styles.image}
        />
        <div className={styles.overlay}>
          <div className={styles.projectInfo}>
            <h3 className={styles.title}>{activeProject.title}</h3>
            <p className={styles.description}>{activeProject.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
