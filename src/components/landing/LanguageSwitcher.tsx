import { useTranslation } from 'react-i18next';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.resolvedLanguage || i18n.language || 'es';

  const handleLanguageChange = (value: string) => {
    if (value) {
      i18n.changeLanguage(value);
    }
  };

  return (
    <ToggleGroup
      type="single"
      value={currentLang}
      onValueChange={handleLanguageChange}
      className="bg-card/80 backdrop-blur-md border border-border/30 rounded-[10px] p-1"
      aria-label={t('navbar.languageSwitcher.label')}
    >
      <ToggleGroupItem
        value="en"
        aria-label={t('navbar.languageSwitcher.switchToEnglish')}
        className="rounded-[8px] px-3 py-1.5 text-sm font-medium transition-colors
                   data-[state=on]:bg-primary/15 data-[state=on]:text-foreground
                   data-[state=off]:text-muted-foreground data-[state=off]:hover:text-foreground-body
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span lang="en">EN</span>
      </ToggleGroupItem>
      <ToggleGroupItem
        value="es"
        aria-label={t('navbar.languageSwitcher.switchToSpanish')}
        className="rounded-[8px] px-3 py-1.5 text-sm font-medium transition-colors
                   data-[state=on]:bg-primary/15 data-[state=on]:text-foreground
                   data-[state=off]:text-muted-foreground data-[state=off]:hover:text-foreground-body
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <span lang="es">ES</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
