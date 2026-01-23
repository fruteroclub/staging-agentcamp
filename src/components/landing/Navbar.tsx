import { useState, useEffect } from "react";
import { Menu, X, Home, BookOpen, BarChart3, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/ui/tubelight-navbar";

const navItems = [
  { name: "Inicio", url: "#", icon: Home },
  { name: "Programa", url: "#programa", icon: BookOpen },
  { name: "Resultados", url: "#resultados", icon: BarChart3 },
  { name: "FAQ", url: "#faq", icon: HelpCircle },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
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
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <img
                src="/frutero-logo.svg"
                alt="Agentcamp by Frutero"
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
                width="104"
                height="44"
              />
              <span className="font-semibold text-foreground hidden sm:inline">Agentcamp</span>
            </a>

            {/* Desktop Nav - Tubelight */}
            <div className="hidden md:block">
              <NavBar items={navItems} />
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Button className="gradient-primary hover:shadow-primary transition-all duration-300 hover:-translate-y-0.5 rounded-full">
                Reserva Tu Lugar
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/98 backdrop-blur-lg md:hidden pt-20"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          onKeyDown={handleKeyDown}
        >
          <nav className="container mx-auto px-4 py-8 flex flex-col gap-4">
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
            <Button
              className="gradient-primary w-full mt-4 rounded-xl py-6"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Reserva Tu Lugar
            </Button>
          </nav>
        </div>
      )}

      {/* Floating Mobile CTA */}
      <div className="fixed bottom-6 left-4 right-4 z-40 md:hidden">
        <Button className="w-full gradient-primary shadow-primary py-6 text-base font-semibold rounded-2xl">
          Reserva Tu Lugar →
        </Button>
      </div>
    </>
  );
}
