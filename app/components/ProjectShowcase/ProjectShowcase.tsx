"use client";

import React, { useState, CSSProperties } from "react";
import { useTheme } from "next-themes";
import { projects } from "../../data/projects";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { AnimatedTabs } from "../AnimatedTabs/AnimatedTabs";
import styles from "./ProjectShowcase.module.css";

interface CustomCSSProperties extends CSSProperties {
  "--hover-color"?: string;
}

export function ProjectShowcase() {
  const { resolvedTheme } = useTheme();
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id);

  const handleTabChange = (tabId: string) => {
    setActiveProjectId(tabId);
  };

  const activeProject = projects.find(
    (project) => project.id === activeProjectId
  );
  const colors =
    activeProject?.colors[resolvedTheme === "dark" ? "dark" : "light"];

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
                <Image
                  src={activeProject.svgPath}
                  alt={`${activeProject.title} Icon`}
                  className={styles.icon}
                  width={100}
                  height={100}
                  priority // Add priority since this is above the fold
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
                  {/* TODO: Add read more pages for each project */}
                  {/* <Link
                    href={`/projects/${activeProject.id}`}
                    className={styles.primaryButton}
                    style={
                      {
                        backgroundColor: colors?.primary,
                        "--hover-color": colors?.secondary,
                      } as CustomCSSProperties
                    }
                  >
                    Read More
                  </Link> */}
                  <Link
                    href={activeProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.secondaryButton}
                    style={
                      {
                        borderColor: colors?.secondary,
                        color: colors?.secondary,
                        "--hover-color": colors?.secondary,
                      } as CustomCSSProperties
                    }
                  >
                    Try it
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
