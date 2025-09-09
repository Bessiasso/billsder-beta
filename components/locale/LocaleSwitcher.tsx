import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import LocaleSwitcherSelect from "@/components/locale/LocaleSwitcherSelect";

type LocaleSwitcherProps = {
    className?: string;
};

export default function LocaleSwitcher({ className }: LocaleSwitcherProps) {
    const t = useTranslations("LocaleSwitcher");
    const locale = useLocale();

    return (
        <div className={`${className}`}>
            <LocaleSwitcherSelect defaultValue={locale} label={t("label")}>
                {routing.locales.map((cur) => (
                    <option key={cur} value={cur}>
                        {t("locale", { locale: cur })}
                    </option>
                ))}
            </LocaleSwitcherSelect>
        </div>
    );
}
