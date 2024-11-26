import React from "react";
import Image from "next/image";
import { GraduationCap, Globe } from "lucide-react";

import { Nav } from "../components/Nav/Nav";
import { Footer } from "../components/Footer/Footer";

import styles from "./page.module.css";
import { SpringyIcon } from "../components/SpringyIcon/SpringyIcon";

export default function Page() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* HEADER NAV */}
        <Nav />

        {/* MAIN CONTENT */}
        <div>
          <Image
            src="/manov.png"
            alt="Profile Picture"
            width={100}
            height={100}
            className={styles.avatar}
          />
          <div className={styles.bio}>
            {/* <h1 className={styles.greeting}>Hi, I'm Manov</h1> */}
            <p className={styles.description}>
              I&apos;m a software engineer based in Seattle. Currently building
              anim, feast, and making products at AT&T.
            </p>
          </div>
        </div>

        {/* WORK */}
        <div className={styles.work}>
          {/* <h2 className={styles.sectionTitle}>Work</h2> */}
          <div className={styles.workHistory}>
            {[
              {
                company: "AT&T",
                position: "Senior Software Engineer",
                period: "2022—Present",
                icon: Globe,
                url: "https://www.att.com/",
              },
              {
                company: "Southern Methodist University",
                position: "Computer Science & Film",
                period: "2018—2022",
                icon: GraduationCap,
                url: "https://www.smu.edu/",
              },
            ].map((job, index) => (
              <div key={index} className={styles.workItem}>
                <div className={styles.workInfo}>
                  <div className={styles.company}>{job.company}</div>
                  <div className={styles.position}>{job.position}</div>
                </div>
                <div className={styles.workMeta}>
                  <div className={styles.period}>{job.period}</div>
                  <SpringyIcon
                    href={job.url}
                    icon={<job.icon className={styles.icon} />}
                    label={`Visit ${job.company}`}
                    tooltip={`Visit ${job.company}`}
                    hoverColor="var(--color-primary)"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <Footer />
      </main>
    </div>
  );
}
