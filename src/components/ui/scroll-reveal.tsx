import { motion, useInView, Variants, Easing } from "framer-motion";
import { useRef, ReactNode } from "react";
import { useMotionPreference } from "@/hooks/useMotionPreference";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
  animationKey?: string;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  y = 30,
  once = true,
  animationKey,
}: ScrollRevealProps) {
  const ref = useRef(null);
  // When animationKey is provided (language switching), disable 'once' to allow re-animation
  const isInView = useInView(ref, { once: animationKey ? false : once, margin: "-100px" });
  const prefersReducedMotion = useMotionPreference();

  return (
    <motion.div
      ref={ref}
      key={animationKey}
      initial={{
        opacity: prefersReducedMotion ? 1 : 0,
        y: prefersReducedMotion ? 0 : y
      }}
      animate={isInView
        ? { opacity: 1, y: 0 }
        : {
            opacity: prefersReducedMotion ? 1 : 0,
            y: prefersReducedMotion ? 0 : y
          }
      }
      transition={{
        duration: prefersReducedMotion ? 0 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  animationKey?: string;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  animationKey,
}: StaggerContainerProps) {
  const ref = useRef(null);
  // When animationKey is provided (language switching), disable 'once' to allow re-animation
  const isInView = useInView(ref, { once: animationKey ? false : true, margin: "-100px" });
  const prefersReducedMotion = useMotionPreference();

  return (
    <motion.div
      ref={ref}
      key={animationKey}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as Easing },
  },
};
