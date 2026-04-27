import { useEffect, useState } from "react";
import { Menu, X, Home, Layers3, Calendar, Mail } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function SponsorshipDeckNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Overview", url: "#top", icon: Home },
    { name: "Tiers", url: "#tiers", icon: Layers3 },
    { name: "Timeline", url: "#timeline", icon: Calendar },
    { name: "Contact", url: "#contact", icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
      >
        Saltar al contenido principal
      </a>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16 md:h-20">
            <a href="/" className="flex items-center gap-2 group">
              <img
                src="/godinez-logo.svg"
                alt="Godínez.AI"
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
                width="104"
                height="44"
              />
            </a>

            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
              <NavBar items={navItems} />
            </div>

            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher />
            </div>

            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/98 backdrop-blur-lg md:hidden pt-20"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          onKeyDown={handleKeyDown}
        >
          <nav className="container mx-auto px-4 py-8 flex flex-col gap-4">
            <div className="flex justify-center mb-6">
              <LanguageSwitcher />
            </div>

            {navItems.map((item) => (
              <a
                key={item.url}
                href={item.url}
                className="flex items-center gap-3 text-lg font-medium text-foreground py-3 px-4 rounded-xl hover:bg-card transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5 text-primary" />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
