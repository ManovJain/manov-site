import React from "react";
import Image from "next/image";
// import Link from "next/link";
import {
  Mail,
  Twitter,
  Github,
  MapPin,
  GraduationCap,
  Globe,
} from "lucide-react";

import styles from "./page.module.css";
import { SpringyIcon } from "./components/SpringyIcon/SpringyIcon";
import { ThemeToggle } from "./components/ThemeToggle/ThemeToggle";
import { ProjectShowcase } from "./components/ProjectShowcase/ProjectShowcase";

export default function Page() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* HEADER NAV */}
        <nav className={styles.nav}>
          <div className={styles.name}>Manov Jain</div>
          <div className={styles.links}>
            {/* <Link href="/" className={styles.link}>
              photos
            </Link>
            <Link href="/" className={styles.link}>
              blog
            </Link> */}
            <ThemeToggle />
          </div>
        </nav>

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

        {/* PROJECTS */}
        <div className={styles.projects}>
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <ProjectShowcase />
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
        <footer className={styles.footer}>
          <div className={styles.location}>
            <MapPin className={styles.icon} />
            Seattle, WA
          </div>
          <div className={styles.socialLinks}>
            <SpringyIcon
              href="mailto:manovjain@gmail.com"
              icon={<Mail className={styles.icon} />}
              label="Email"
              tooltip="Send me an email"
              hoverColor="#EA4335"
            />
            <SpringyIcon
              href="https://x.com/ManovJain"
              icon={<Twitter className={styles.icon} />}
              label="Twitter"
              tooltip="Follow me on Twitter"
              hoverColor="#1DA1F2"
            />
            <SpringyIcon
              href="https://github.com/ManovJain"
              icon={<Github className={styles.icon} />}
              label="GitHub"
              tooltip="Check out my GitHub projects"
              hoverColor="#6e5494"
            />
          </div>
        </footer>
      </main>
    </div>
  );
}
