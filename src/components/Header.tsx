import { Moon, Sun, Languages } from 'lucide-react'
import type { Lang, Theme } from '../lib/types'
import { t } from '../lib/i18n'

interface Props {
  lang: Lang
  theme: Theme
  onLang: (l: Lang) => void
  onTheme: (t: Theme) => void
}

export function Header({ lang, theme, onLang, onTheme }: Props) {
  return (
    <header className="glass sticky top-0 z-50">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5 pressable">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent/15 text-sm font-bold text-accent">
            X
          </span>
          <span className="text-sm font-semibold tracking-tight sm:text-base">
            {t('brand', lang)}
          </span>
        </a>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full border border-[var(--border)] bg-[var(--bg-card)] p-0.5">
            <button
              type="button"
              onClick={() => onLang('zh')}
              className={`pressable rounded-full px-2.5 py-1 text-xs font-medium transition-colors duration-150 ${
                lang === 'zh'
                  ? 'bg-accent text-white'
                  : 'text-[var(--muted)] hover:text-[var(--text)]'
              }`}
              aria-pressed={lang === 'zh'}
            >
              {t('langZh', lang)}
            </button>
            <button
              type="button"
              onClick={() => onLang('en')}
              className={`pressable rounded-full px-2.5 py-1 text-xs font-medium transition-colors duration-150 ${
                lang === 'en'
                  ? 'bg-accent text-white'
                  : 'text-[var(--muted)] hover:text-[var(--text)]'
              }`}
              aria-pressed={lang === 'en'}
            >
              {t('langEn', lang)}
            </button>
          </div>

          <button
            type="button"
            onClick={() => onTheme(theme === 'dark' ? 'light' : 'dark')}
            className="pressable inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-card)] text-[var(--muted)] transition-colors duration-150 hover:text-[var(--text)]"
            aria-label={theme === 'dark' ? t('themeLight', lang) : t('themeDark', lang)}
            title={theme === 'dark' ? t('themeLight', lang) : t('themeDark', lang)}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <span className="hidden items-center gap-1 text-xs text-[var(--muted)] sm:inline-flex">
            <Languages size={14} />
            {lang === 'zh' ? 'ZH / EN' : 'EN / ZH'}
          </span>
        </div>
      </div>
    </header>
  )
}
