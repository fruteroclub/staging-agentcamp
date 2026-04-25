import { motion, useInView } from "framer-motion";
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

  // When animationKey is provided (language switching), use more sensitive detection
  const isInView = useInView(ref, {
    once: animationKey ? false : once,
    margin: animationKey ? "0px" : "-100px",
    amount: animationKey ? 0 : 0.2
  });
  const prefersReducedMotion = useMotionPreference();

  // When animationKey exists, always animate (language switching scenario)
  const shouldAnimate = animationKey ? true : isInView;

  return (
    <motion.div
      ref={ref}
      key={animationKey}
      initial={{
        opacity: prefersReducedMotion ? 1 : 0,
        y: prefersReducedMotion ? 0 : y
      }}
      animate={shouldAnimate
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

  // When animationKey is provided (language switching), use more sensitive detection
  const isInView = useInView(ref, {
    once: animationKey ? false : true,
    margin: animationKey ? "0px" : "-100px",
    amount: animationKey ? 0 : 0.2
  });
  const prefersReducedMotion = useMotionPreference();

  // When animationKey exists, always animate (language switching scenario)
  const shouldAnimate = animationKey ? true : isInView;

  return (
    <motion.div
      ref={ref}
      key={animationKey}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
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
