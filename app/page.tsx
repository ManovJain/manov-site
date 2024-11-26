import React from "react";
import styles from "./page.module.css";
import { ProjectShowcase } from "./components/ProjectShowcase/ProjectShowcase";
import { Nav } from "./components/Nav/Nav";
import { Footer } from "./components/Footer/Footer";

export default function Page() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Nav />

        {/* MAIN CONTENT */}
        <div className={styles.bio}>
          <p className={styles.description}>
            Hi, welcome to my website. I like to build cool shit.
          </p>
        </div>

        {/* PROJECTS */}
        <div className={styles.projects}>
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <ProjectShowcase />
        </div>

        <Footer />
      </main>
    </div>
  );
}
