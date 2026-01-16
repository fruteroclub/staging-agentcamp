import { Twitter, Linkedin, Youtube } from "lucide-react";

const footerLinks = [
  { href: "#programa", label: "Programa" },
  { href: "#faq", label: "FAQ" },
  { href: "#", label: "Contacto" },
  { href: "#", label: "Términos" },
  { href: "#", label: "Privacidad" },
];

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AO</span>
              </div>
              <div>
                <span className="font-semibold text-foreground">Agent Operators</span>
                <span className="text-muted-foreground text-sm ml-2">by Frutero</span>
              </div>
            </div>

            {/* Links */}
            <nav className="flex flex-wrap items-center justify-center gap-6">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Social */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center hover:border-primary/50 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              © 2026 Frutero. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
