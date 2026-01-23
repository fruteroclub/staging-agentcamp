import { Twitter, Linkedin, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";

const socialLinks = [
  { icon: Twitter, href: "https://x.com/fruteroclub", label: "Twitter" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/frutero-club/", label: "LinkedIn" },
  { icon: Youtube, href: "https://www.youtube.com/@fruterotv", label: "YouTube" },
];

export function Footer() {
  const { t } = useTranslation();

  const footerLinks = [
    { href: "#programa", label: t('footer.links.program') },
    { href: "#faq", label: t('footer.links.faq') },
    { href: "https://frutero.club/", label: t('footer.links.contact') },
    { href: "#", label: t('footer.links.terms') },
    { href: "#", label: t('footer.links.privacy') },
  ];
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="/kukulcan-logo-color.svg"
                alt="Powered by Frutero"
                className="h-12 w-auto"
                width="128"
                height="128"
              />
              <div>
                <span className="font-semibold text-foreground">{t('footer.logo.text')}</span>
                <span className="text-muted-foreground text-sm ml-2">{t('footer.logo.byline')}</span>
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
                  aria-label={`Síguenos en ${social.label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              {t('footer.copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
