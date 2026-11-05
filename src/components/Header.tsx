import { useEffect, useRef } from 'react'
import { Search } from 'lucide-react'
import type { Lang, Theme } from '../lib/types'
import { t } from '../lib/i18n'

interface Props {
  lang: Lang
  theme: Theme
  query: string
  searchOpen: boolean
  onLang: (l: Lang) => void
  onTheme: (t: Theme) => void
  onQuery: (q: string) => void
  onSearchOpen: (open: boolean) => void
}

const LOGO_OPACITY = [1, 0.3, 1, 0.3, 1, 0.3, 1, 0.3, 1]

export function Header({
  lang,
  theme,
  query,
  searchOpen,
  onLang,
  onTheme,
  onQuery,
  onSearchOpen,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onSearchOpen(true)
        requestAnimationFrame(() => inputRef.current?.focus())
      }
      if (e.key === 'Escape') onSearchOpen(false)
      if (e.key.toLowerCase() === 'i' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const tag = (e.target as HTMLElement)?.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA') return
        onTheme(theme === 'dark' ? 'light' : 'dark')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onSearchOpen, onTheme, theme])

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus()
  }, [searchOpen])

  return (
    <header className="sticky top-0 z-40 h-14 border-b border-border bg-background/75 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto grid h-full max-w-frame grid-cols-[1fr_auto_1fr] items-center px-4 md:px-6">
        <a
          href="#top"
          className="group flex items-center gap-2.5 justify-self-start rounded-md"
          aria-label={t('brand', lang)}
        >
          <span className="grid size-5 grid-cols-3 gap-[2px]" aria-hidden="true">
            {LOGO_OPACITY.map((op, i) => (
              <span
                key={i}
                className="rounded-[1px] bg-foreground transition-opacity duration-300 group-hover:opacity-100"
                style={{ opacity: op, transitionDelay: `${i * 30}ms` }}
              />
            ))}
          </span>
          <span className="text-sm font-semibold tracking-tight">{t('brand', lang)}</span>
          <span className="hidden font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground sm:inline">
            {t('brandMono', lang)}
          </span>
        </a>

        <nav
          aria-label="Language"
          className="relative flex items-center rounded-full border border-border bg-background p-0.5"
        >
          <button
            type="button"
            aria-pressed={lang === 'zh'}
            onClick={() => onLang('zh')}
            className={`relative z-10 flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors md:px-4 ${
              lang === 'zh' ? 'text-background' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {lang === 'zh' && (
              <span className="absolute inset-0 -z-10 rounded-full bg-foreground" />
            )}
            <span className="font-mono">ZH</span>
            <span className="hidden sm:inline">{t('langZh', lang)}</span>
          </button>
          <button
            type="button"
            aria-pressed={lang === 'en'}
            onClick={() => onLang('en')}
            className={`relative z-10 flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors md:px-4 ${
              lang === 'en' ? 'text-background' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {lang === 'en' && (
              <span className="absolute inset-0 -z-10 rounded-full bg-foreground" />
            )}
            <span className="font-mono">EN</span>
          </button>
        </nav>

        <div className="flex items-center gap-1.5 justify-self-end">
          {searchOpen ? (
            <label className="relative flex h-8 w-[min(52vw,16rem)] items-center">
              <Search
                className="pointer-events-none absolute left-2.5 size-3.5 text-faint"
                aria-hidden
              />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => onQuery(e.target.value)}
                onBlur={() => {
                  if (!query) onSearchOpen(false)
                }}
                placeholder={t('searchPlaceholder', lang)}
                className="h-full w-full rounded-full border border-border bg-transparent pl-8 pr-3 text-xs outline-none transition-colors placeholder:text-faint hover:border-border-strong focus:border-foreground"
              />
            </label>
          ) : (
            <button
              type="button"
              className="flex h-8 items-center gap-2 rounded-full border border-border px-2.5 text-xs text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground md:pr-1.5"
              aria-label={t('search', lang)}
              onClick={() => onSearchOpen(true)}
            >
              <Search className="size-3.5" aria-hidden />
              <span className="hidden md:inline">{t('search', lang)}</span>
              <kbd className="hidden h-5 items-center rounded-full border border-border bg-muted px-1.5 font-mono text-[10px] md:inline-flex">
                ⌘K
              </kbd>
            </button>
          )}

          <button
            type="button"
            className="group relative flex size-8 items-center justify-center rounded-full border border-border transition-colors hover:border-border-strong"
            aria-label={t('themeInvert', lang)}
            title={`${t('themeInvert', lang)} (I)`}
            onClick={() => onTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <span className="relative size-3.5 overflow-hidden rounded-full border border-foreground">
              <span
                className="absolute inset-y-0 left-0 w-1/2 bg-foreground transition-transform duration-300"
                style={{
                  transform: theme === 'light' ? 'translateX(100%)' : 'translateX(0)',
                }}
              />
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
