import { useI18n } from "@/lib/i18n";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang } = useI18n();

  return (
    <div className={`flex items-center gap-2 text-sm ${className ?? ""}`}>
      <button
        onClick={() => setLang("en")}
        className={
          lang === "en"
            ? "font-semibold underline underline-offset-4"
            : "opacity-60 hover:opacity-100 transition"
        }
        aria-label="English"
      >
        EN
      </button>
      <span className="opacity-40" aria-hidden="true">
        |
      </span>
      <button
        onClick={() => setLang("lv")}
        className={
          lang === "lv"
            ? "font-semibold underline underline-offset-4"
            : "opacity-60 hover:opacity-100 transition"
        }
        aria-label="Latviešu"
      >
        LV
      </button>
    </div>
  );
}
