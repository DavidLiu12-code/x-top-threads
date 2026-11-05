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
    <header className="sticky top-0 z-40 h-14 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto grid h-full max-w-frame grid-cols-[1fr_auto_1fr] items-center px-4 md:px-6">
        <a
          href="#top"
          className="flex items-center gap-2.5 justify-self-start rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/40"
          aria-label={t('brand', lang)}
        >
          <span className="grid size-4 grid-cols-3 gap-px" aria-hidden="true">
            {LOGO_OPACITY.map((op, i) => (
              <span
                key={i}
                className="rounded-[1px] bg-foreground"
                style={{ opacity: op }}
              />
            ))}
          </span>
          <span className="text-sm font-medium tracking-tight">{t('brand', lang)}</span>
          <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
            {t('brandMono', lang)}
          </span>
        </a>

        <nav
          aria-label="Language"
          className="relative flex items-center rounded-lg border border-border bg-background p-0.5"
        >
          <button
            type="button"
            aria-pressed={lang === 'zh'}
            onClick={() => onLang('zh')}
            className={`relative z-10 flex h-8 items-center gap-1.5 rounded-md px-3 text-xs font-medium transition-colors duration-150 ease-craft md:px-4 ${
              lang === 'zh' ? 'text-background' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {lang === 'zh' && (
              <span className="absolute inset-0 -z-10 rounded-md bg-foreground" />
            )}
            <span className="font-mono">ZH</span>
            <span className="hidden sm:inline">{t('langZh', lang)}</span>
          </button>
          <button
            type="button"
            aria-pressed={lang === 'en'}
            onClick={() => onLang('en')}
            className={`relative z-10 flex h-8 items-center gap-1.5 rounded-md px-3 text-xs font-medium transition-colors duration-150 ease-craft md:px-4 ${
              lang === 'en' ? 'text-background' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {lang === 'en' && (
              <span className="absolute inset-0 -z-10 rounded-md bg-foreground" />
            )}
            <span className="font-mono">EN</span>
          </button>
        </nav>

        <div className="flex items-center gap-2 justify-self-end">
          {searchOpen ? (
            <label className="relative flex h-8 w-[min(52vw,16rem)] items-center">
              <Search
                className="pointer-events-none absolute left-2.5 size-4 text-faint"
                strokeWidth={1.5}
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
                className="h-full w-full rounded-lg border border-border bg-transparent pl-9 pr-3 text-xs outline-none transition-colors duration-150 ease-craft placeholder:text-faint hover:border-border-strong focus:border-foreground"
              />
            </label>
          ) : (
            <button
              type="button"
              className="flex h-8 items-center gap-2 rounded-lg border border-border px-2.5 text-xs text-muted-foreground transition-colors duration-150 ease-craft hover:border-border-strong hover:text-foreground active:scale-[0.97] md:pr-1.5"
              aria-label={t('search', lang)}
              onClick={() => onSearchOpen(true)}
            >
              <Search className="size-4" strokeWidth={1.5} aria-hidden />
              <span className="hidden md:inline">{t('search', lang)}</span>
              <kbd className="hidden h-5 items-center rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-faint md:inline-flex">
                ⌘K
              </kbd>
            </button>
          )}

          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-lg border border-border transition-colors duration-150 ease-craft hover:border-border-strong active:scale-[0.97]"
            aria-label={t('themeInvert', lang)}
            title={`${t('themeInvert', lang)} (I)`}
            onClick={() => onTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <span className="relative size-3.5 overflow-hidden rounded-full border border-foreground">
              <span
                className="absolute inset-y-0 left-0 w-1/2 bg-foreground transition-transform duration-[180ms] ease-craft"
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
