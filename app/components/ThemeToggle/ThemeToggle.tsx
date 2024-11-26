"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import styles from "./ThemeToggle.module.css";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [isSpinning, setIsSpinning] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ width: "24px", height: "24px" }} />;
  }

  return (
    <motion.button
      onClick={() => {
        setIsSpinning(true);
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
        setTimeout(() => setIsSpinning(false), 600);
      }}
      className={styles.toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      aria-label="Toggle theme"
    >
      <motion.div
        animate={{ rotate: isSpinning ? 360 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {resolvedTheme === "dark" ? (
          <Moon className={styles.icon} />
        ) : (
          <Sun className={styles.icon} />
        )}
      </motion.div>
    </motion.button>
  );
}
