import { Injectable, signal } from '@angular/core';

export type Lang = 'de' | 'en';

const LANGS: Lang[] = ['de', 'en'];
const STORAGE_KEY = 'lang';

/** Holds both translation files (public/assets/i18n/<lang>.json) and the active language. */
@Injectable({ providedIn: 'root' })
export class I18nService {
  readonly lang = signal<Lang>(this.initialLang());

  private dicts: Record<Lang, unknown> = { de: {}, en: {} };

  /** Loads all language files once at startup (see provideAppInitializer), so switching is instant. */
  async load(): Promise<void> {
    await Promise.all(LANGS.map(async lang => {
      this.dicts[lang] = await (await fetch(`/assets/i18n/${lang}.json`)).json();
    }));
    document.documentElement.lang = this.lang();
  }

  setLang(lang: Lang): void {
    this.lang.set(lang);
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch { /* storage blocked: the choice just is not remembered */ }
  }

  /** Value at a dotted path ("contact.errName", "portfolio.reviews.0"), falling back to English. */
  tr<T = unknown>(key: string): T | undefined {
    const find = (dict: unknown) =>
      key.split('.').reduce<any>((node, part) => node?.[part], dict);
    return (find(this.dicts[this.lang()]) ?? find(this.dicts.en)) as T | undefined;
  }

  t(key: string): string {
    const value = this.tr(key);
    return typeof value === 'string' ? value : key;
  }

  private initialLang(): Lang {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'de' || saved === 'en') return saved;
    } catch { /* ignore */ }
    return navigator.language?.toLowerCase().startsWith('de') ? 'de' : 'en';
  }
}
