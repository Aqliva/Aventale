export const LANGUAGES = {
  fr: "Français",
  en: "English",
  zh: "中文"
} as const;
  
export type LanguageCode = keyof typeof LANGUAGES;
  