"use client";

import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import styles from "./Nav.module.css";

export function Nav() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.name}>
        Manov Jain
      </Link>
      <div className={styles.links}>
        <Link href="/art" className={styles.link}>
          art
        </Link>
        <Link href="/about" className={styles.link}>
          about
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
