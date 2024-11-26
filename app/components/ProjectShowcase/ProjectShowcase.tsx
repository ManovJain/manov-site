"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { projects } from "../../data/projects";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { AnimatedTabs } from "../AnimatedTabs/AnimatedTabs";
import styles from "./ProjectShowcase.module.css";

export function ProjectShowcase() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTabChange = (tabId: string) => {
    setActiveProjectId(tabId);
  };

  const activeProject = projects.find(
    (project) => project.id === activeProjectId
  );

  // Use default colors for initial render
  const colors = mounted
    ? activeProject?.colors[resolvedTheme === "dark" ? "dark" : "light"]
    : activeProject?.colors.light; // Default to light theme colors

  return (
    <div className={styles.container}>
      <AnimatedTabs
        activeTab={activeProjectId}
        onTabChange={handleTabChange}
        tabs={projects.map((project) => ({
          id: project.id,
          label: project.title,
        }))}
      />
      <div className={styles.showcaseWrapper}>
        <AnimatePresence mode="wait">
          {activeProject && (
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
                      mounted
                        ? ({
                            backgroundColor: colors?.primary,
                            "--hover-color": colors?.secondary,
                          } as any)
                        : undefined
                    }
                  >
                    Try it
                  </Link>
                  <Link
                    href={activeProject.demoUrl}
                    className={styles.secondaryButton}
                    style={
                      mounted
                        ? ({
                            borderColor: colors?.secondary,
                            color: colors?.secondary,
                            "--hover-color": colors?.secondary,
                          } as any)
                        : undefined
                    }
                  >
                    Read More
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
