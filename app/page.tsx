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
            I&apos;m a software engineer based in Seattle. Currently building
            anim, feast, and making products at AT&T.
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
