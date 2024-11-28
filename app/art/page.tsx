import React from "react";

import { Nav } from "../components/Nav/Nav";
import { Footer } from "../components/Footer/Footer";

import styles from "./page.module.css";

import AnimatedGrid from "../components/AnimatedGrid/AnimatedGrid";
import ParticleWave from "../components/ParticleWave/ParticleWave";
import ParticleFlow from "../components/ParticleFlow/ParticleFlow";

export default function Page() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* HEADER NAV */}
        <Nav />

        {/* MAIN CONTENT */}
        <div>
          <div className={styles.bio}>
            <h1 className={styles.greeting}>Welcome to the art gallery.</h1>
            <AnimatedGrid />
            <ParticleWave />
            <ParticleFlow />
          </div>
        </div>

        {/* FOOTER */}
        <Footer />
      </main>
    </div>
  );
}
