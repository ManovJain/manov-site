"use client";

import { Mail, Twitter, Github, MapPin } from "lucide-react";
import { SpringyIcon } from "../SpringyIcon/SpringyIcon";
import styles from "./Footer.module.css";

export function Footer() {
  return (
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
          target="_blank"
          rel="noopener noreferrer"
        />
        <SpringyIcon
          href="https://github.com/ManovJain"
          icon={<Github className={styles.icon} />}
          label="GitHub"
          tooltip="Check out my GitHub projects"
          hoverColor="#6e5494"
          target="_blank"
          rel="noopener noreferrer"
        />
      </div>
    </footer>
  );
}
