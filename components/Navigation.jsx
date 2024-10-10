import { useTranslations } from 'next-intl';
import NavigationLink from './NavigationLink';

export default function Navigation({ containerStyles }) {
  const t = useTranslations('Nav');

  return (
      <nav className={`${containerStyles} font-bebas text-2xl text-slate-100`}>
          <NavigationLink href="/">{t("features")}</NavigationLink>
          <NavigationLink href="/about">{t("about")}</NavigationLink>
          <NavigationLink href="https://www.ucodebyus.com/contact">
              {t("contact")}
          </NavigationLink>
      </nav>
  );
}
