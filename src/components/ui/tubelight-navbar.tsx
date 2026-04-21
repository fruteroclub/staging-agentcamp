import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const currentIndex = hoverIndex !== null ? hoverIndex : activeIndex;

  useEffect(() => {
    const updateIndicator = () => {
      if (navRef.current) {
        const buttons = navRef.current.querySelectorAll("a");
        const activeButton = buttons[currentIndex];
        if (activeButton) {
          const navRect = navRef.current.getBoundingClientRect();
          const buttonRect = activeButton.getBoundingClientRect();
          setIndicatorStyle({
            left: buttonRect.left - navRect.left,
            width: buttonRect.width,
          });
        }
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [currentIndex]);

  const handleClick = (index: number, url: string) => {
    setActiveIndex(index);
    // Smooth scroll to section if it's an anchor link
    if (url.startsWith("#")) {
      const element = document.querySelector(url);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div
      className={cn(
        "relative flex items-center gap-1 rounded-[10px] bg-card/80 backdrop-blur-md border border-border/30 p-1.5 shadow-lg",
        className
      )}
      ref={navRef}
    >
      {/* Tubelight indicator */}
      <motion.div
        className="absolute h-[calc(100%-12px)] rounded-[8px] bg-primary/15 border border-primary/25"
        initial={false}
        animate={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{ top: 6 }}
      />
      
      {/* Glow effect */}
      <motion.div
        className="absolute h-[calc(100%-12px)] rounded-[8px] bg-primary/20 blur-md"
        initial={false}
        animate={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{ top: 6 }}
      />

      {items.map((item, index) => (
        <a
          key={item.name}
          href={item.url}
          onClick={(e) => {
            e.preventDefault();
            handleClick(index, item.url);
          }}
          onMouseEnter={() => setHoverIndex(index)}
          onMouseLeave={() => setHoverIndex(null)}
          className={cn(
            "relative z-10 flex items-center gap-2 px-4 py-2.5 rounded-[8px] text-sm font-medium transition-colors duration-200",
            currentIndex === index
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground-body"
          )}
        >
          <item.icon className="w-4 h-4" />
          <span className="hidden sm:inline">{item.name}</span>
        </a>
      ))}
    </div>
  );
}
