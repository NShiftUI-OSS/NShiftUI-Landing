import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

import { en } from "@/i18n/locales/en"
import { es } from "@/i18n/locales/es"
import { pt } from "@/i18n/locales/pt"

export const languages = [
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
  { code: "es", label: "Español" },
] as const

export type LanguageCode = (typeof languages)[number]["code"]

function htmlLang(code: string) {
  if (code.startsWith("pt")) return "pt-BR"
  if (code.startsWith("es")) return "es-ES"
  return "en"
}

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
      es: { translation: es },
    },
    fallbackLng: "pt",
    supportedLngs: ["en", "pt", "es"],
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "nshift-lang",
      caches: ["localStorage"],
    },
  })

function applyHtmlLang(code: string) {
  document.documentElement.lang = htmlLang(code)
}

applyHtmlLang(i18n.resolvedLanguage ?? i18n.language)
i18n.on("languageChanged", applyHtmlLang)

export { i18n }
