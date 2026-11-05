import { useEffect, useMemo, useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Sidebar, FilterChips } from './components/Sidebar'
import { SortBar } from './components/SortBar'
import { ThreadCard } from './components/ThreadCard'
import { t } from './lib/i18n'
import type {
  Catalog,
  DomainId,
  ItemType,
  Lang,
  SortKey,
  Theme,
  ThreadItem,
} from './lib/types'

const DOMAINS: DomainId[] = [
  'agent',
  'ai',
  'opc',
  'writing',
  'taste',
  'marketing',
  'digital-marketing',
  'monetization',
]

function loadPrefs(): { lang: Lang; theme: Theme } {
  try {
    const lang = (localStorage.getItem('xtt-lang') as Lang) || 'zh'
    const theme = (localStorage.getItem('xtt-theme') as Theme) || 'dark'
    return {
      lang: lang === 'en' ? 'en' : 'zh',
      theme: theme === 'light' ? 'light' : 'dark',
    }
  } catch {
    return { lang: 'zh', theme: 'dark' }
  }
}

function sortItems(items: ThreadItem[], sort: SortKey): ThreadItem[] {
  const arr = [...items]
  switch (sort) {
    case 'newest':
      return arr.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
    case 'impressions':
      return arr.sort((a, b) => b.impressions - a.impressions)
    case 'likes':
      return arr.sort((a, b) => b.likes - a.likes)
    case 'bookmarks':
      return arr.sort((a, b) => b.bookmarks - a.bookmarks)
    case 'score':
    default:
      return arr.sort((a, b) => b.score - a.score)
  }
}

export default function App() {
  const prefs = loadPrefs()
  const [lang, setLang] = useState<Lang>(prefs.lang)
  const [theme, setTheme] = useState<Theme>(prefs.theme)
  const [data, setData] = useState<Catalog | null>(null)
  const [error, setError] = useState(false)
  const [domain, setDomain] = useState<DomainId | 'all'>('all')
  const [type, setType] = useState<ItemType | 'all'>('all')
  const [sort, setSort] = useState<SortKey>('score')
  const [query, setQuery] = useState('')
  const [mobileFilters, setMobileFilters] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.classList.toggle('light', theme === 'light')
    try {
      localStorage.setItem('xtt-theme', theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
    try {
      localStorage.setItem('xtt-lang', lang)
    } catch {
      /* ignore */
    }
    if (data) {
      document.title = lang === 'zh' ? data.meta.title_zh : data.meta.title_en
    }
  }, [lang, data])

  useEffect(() => {
    let cancelled = false
    fetch(`${import.meta.env.BASE_URL}data/items.json`)
      .then((r) => {
        if (!r.ok) throw new Error('fetch failed')
        return r.json()
      })
      .then((json: Catalog) => {
        if (!cancelled) setData(json)
      })
      .catch(() => {
        if (!cancelled) setError(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const authors = useMemo(() => {
    if (!data) return []
    const set = new Set(data.items.map((i) => i.handle))
    return [...set].sort()
  }, [data])

  const domainCounts = useMemo(() => {
    const c: Record<string, number> = {}
    if (!data) return c
    for (const item of data.items) {
      for (const d of item.domains) c[d] = (c[d] || 0) + 1
    }
    return c
  }, [data])

  const typeCounts = useMemo(() => {
    const c: Record<string, number> = {}
    if (!data) return c
    for (const item of data.items) c[item.type] = (c[item.type] || 0) + 1
    return c
  }, [data])

  const filtered = useMemo(() => {
    if (!data) return []
    const q = query.trim().toLowerCase()
    const list = data.items.filter((item) => {
      if (domain !== 'all' && !item.domains.includes(domain)) return false
      if (type !== 'all' && item.type !== type) return false
      if (!q) return true
      const hay = [
        item.title,
        item.author,
        item.handle,
        item.text_preview,
        item.note_zh,
        item.note_en,
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
    return sortItems(list, sort)
  }, [data, domain, type, query, sort])

  const clearFilters = () => {
    setDomain('all')
    setType('all')
    setQuery('')
  }

  return (
    <div id="top" className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Header
        lang={lang}
        theme={theme}
        onLang={setLang}
        onTheme={setTheme}
      />

      {data && (
        <>
          <Hero
            meta={data.meta}
            lang={lang}
            itemCount={data.meta.item_count || data.items.length}
            authorCount={authors.length}
            domainCount={(data.meta.domains || DOMAINS).length}
          />
          <Marquee
            domains={(data.meta.domains as DomainId[]) || DOMAINS}
            authors={authors}
            lang={lang}
          />
        </>
      )}

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-6 text-sm text-red-300">
            {t('error', lang)}
          </div>
        )}

        {!data && !error && (
          <div className="py-20 text-center text-sm text-[var(--muted)]">
            {t('loading', lang)}
          </div>
        )}

        {data && (
          <div className="flex gap-8">
            <Sidebar
              lang={lang}
              domains={(data.meta.domains as DomainId[]) || DOMAINS}
              domain={domain}
              type={type}
              counts={{ domain: { ...domainCounts, __all: data.items.length }, type: typeCounts }}
              onDomain={setDomain}
              onType={setType}
              onClear={clearFilters}
              mobileOpen={mobileFilters}
              onCloseMobile={() => setMobileFilters(false)}
            />

            <div className="min-w-0 flex-1 space-y-5">
              <FilterChips
                lang={lang}
                domains={(data.meta.domains as DomainId[]) || DOMAINS}
                domain={domain}
                type={type}
                onDomain={setDomain}
                onType={setType}
                onOpenMore={() => setMobileFilters(true)}
              />

              <SortBar
                lang={lang}
                sort={sort}
                query={query}
                resultCount={filtered.length}
                onSort={setSort}
                onQuery={setQuery}
              />

              {filtered.length === 0 ? (
                <div className="hairline rounded-2xl bg-[var(--bg-card)] px-6 py-16 text-center text-sm text-[var(--muted)]">
                  {t('empty', lang)}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((item, i) => (
                    <ThreadCard key={item.id} item={item} lang={lang} index={i} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-[var(--border)] py-8 text-center text-xs text-[var(--muted)]">
        {t('footer', lang)}
      </footer>
    </div>
  )
}
