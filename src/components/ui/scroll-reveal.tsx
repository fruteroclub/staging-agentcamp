import { motion, useInView, Variants, Easing } from "framer-motion";
import { useRef, ReactNode, useState, useEffect } from "react";
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
  const [forceVisible, setForceVisible] = useState(false);

  // When animationKey is provided (language switching), use more sensitive detection
  const isInView = useInView(ref, {
    once: animationKey ? false : once,
    margin: animationKey ? "0px" : "-100px",
    amount: animationKey ? 0 : 0.2
  });
  const prefersReducedMotion = useMotionPreference();

  // Force animation when animationKey changes (language switch)
  useEffect(() => {
    if (animationKey) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        setForceVisible(true);
        // Reset after animation completes
        setTimeout(() => setForceVisible(false), duration * 1000 + delay * 1000);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [animationKey, duration, delay]);

  const shouldAnimate = animationKey ? (isInView || forceVisible) : isInView;

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
  const [forceVisible, setForceVisible] = useState(false);

  // When animationKey is provided (language switching), use more sensitive detection
  const isInView = useInView(ref, {
    once: animationKey ? false : true,
    margin: animationKey ? "0px" : "-100px",
    amount: animationKey ? 0 : 0.2
  });
  const prefersReducedMotion = useMotionPreference();

  // Force animation when animationKey changes (language switch)
  useEffect(() => {
    if (animationKey) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        setForceVisible(true);
        // Reset after stagger animation completes
        setTimeout(() => setForceVisible(false), 1000);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [animationKey]);

  const shouldAnimate = animationKey ? (isInView || forceVisible) : isInView;

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

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as Easing },
  },
};
