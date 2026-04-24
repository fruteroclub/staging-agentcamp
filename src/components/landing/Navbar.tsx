import { useState, useEffect } from "react";
import { Menu, X, Home, BookOpen, BarChart3, HelpCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from './LanguageSwitcher';
import { useCheckout } from "@/hooks/useCheckout";

export function Navbar() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { handleCheckout, isLoading, loadingLabel } = useCheckout();

  const navItems = [
    { name: t('navbar.links.home'), url: "#", icon: Home },
    { name: t('navbar.links.program'), url: "#programa", icon: BookOpen },
    { name: t('navbar.links.results'), url: "#resultados", icon: BarChart3 },
    { name: t('navbar.links.faq'), url: "#faq", icon: HelpCircle },
  ];

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
            ? "bg-background/80 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 group">
              <img
                src="/godinez-logo.svg"
                alt="Godínez.AI"
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
                width="104"
                height="44"
              />
            </a>

            {/* Desktop Nav - Tubelight (centered) */}
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
              <NavBar items={navItems} />
            </div>

            {/* Language Switcher + CTA (right side) */}
            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher />

              <Button
                className="bg-primary hover:bg-primary-hover transition-all duration-300 hover:-translate-y-0.5 rounded-[10px] font-semibold"
                disabled={isLoading}
                onClick={() => handleCheckout("landing.nav.desktop")}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {isLoading ? loadingLabel : t('navbar.cta')}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={t('navbar.menuLabel')}
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
            {/* Language Switcher at top of mobile menu (SWITCH-02) */}
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
            <Button
              className="bg-primary hover:bg-primary-hover w-full mt-4 rounded-[10px] py-6 text-[17px] font-semibold"
              disabled={isLoading}
              onClick={async () => {
                setIsMobileMenuOpen(false);
                await handleCheckout("landing.nav.mobile_menu");
              }}
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
              {isLoading ? loadingLabel : t('navbar.cta')}
            </Button>
          </nav>
        </div>
      )}
    </>
  );
}
