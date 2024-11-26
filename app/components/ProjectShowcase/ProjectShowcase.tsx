"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
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
      <AnimatedTabs
        activeTab={activeProject.id}
        onTabChange={handleTabChange}
      />
      <div className={styles.showcaseWrapper}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={styles.showcase}
          >
            <div className={styles.iconWrapper}>
              <img
                src={activeProject.svgPath}
                alt={`${activeProject.title} Icon`}
                className={styles.icon}
              />
            </div>
            <div className={styles.content}>
              <motion.h3
                className={styles.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {activeProject.title}
              </motion.h3>
              <motion.p
                className={styles.description}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {activeProject.description}
              </motion.p>
              <motion.div
                className={styles.buttonGroup}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Link
                  href={`/projects/${activeProject.id}`}
                  className={styles.primaryButton}
                  style={
                    {
                      backgroundColor: activeProject.colors.primary,
                      "--hover-color": activeProject.colors.secondary,
                    } as any
                  }
                >
                  View Details
                </Link>
                <Link
                  href={activeProject.demoUrl}
                  className={styles.secondaryButton}
                  style={
                    {
                      borderColor: activeProject.colors.secondary,
                      color: activeProject.colors.secondary,
                      "--hover-color": activeProject.colors.secondary,
                    } as any
                  }
                >
                  Live Demo
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
