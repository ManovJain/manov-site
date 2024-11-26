"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import styles from "./SpringyIcon.module.css";

interface SpringyIconProps {
  href: string;
  icon: ReactNode;
  label: string;
  tooltip: string;
  hoverColor: string;
  target?: string;
  rel?: string;
}

export function SpringyIcon({
  href,
  icon,
  label,
  tooltip,
  hoverColor,
  target,
  rel,
}: SpringyIconProps) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Link href={href} className={styles.link} target={target} rel={rel}>
            <motion.div
              whileHover={{ scale: 1.2, color: hoverColor }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className={styles.icon}
            >
              {icon}
              <span className={styles.srOnly}>{label}</span>
            </motion.div>
          </Link>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={styles.tooltipContent} sideOffset={5}>
            {tooltip}
            <Tooltip.Arrow className={styles.tooltipArrow} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
