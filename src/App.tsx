import { useEffect, useMemo, useState } from 'react'
import { CategoryBar } from './components/CategoryBar'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Splash } from './components/Splash'
import { ThreadRow } from './components/ThreadRow'
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
  const [searchOpen, setSearchOpen] = useState(false)

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
      document.title =
        lang === 'zh'
          ? `阅览室 · ${data.meta.title_zh}`
          : `Reading Room · ${data.meta.title_en}`
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
    return [...new Set(data.items.map((i) => i.handle))]
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
    const c = { article: 0, thread: 0, post: 0 }
    if (!data) return c
    for (const item of data.items) {
      if (item.type in c) c[item.type as keyof typeof c] += 1
    }
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
        ...item.domains,
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
    return sortItems(list, sort)
  }, [data, domain, type, query, sort])

  const domains = (data?.meta.domains as DomainId[]) || DOMAINS
  const itemCount = data?.meta.item_count || data?.items.length || 0
  const windowLabel = data
    ? `${data.meta.window_start.slice(0, 7).replace('-', '.')} — ${data.meta.window_end
        .slice(0, 7)
        .replace('-', '.')}`
    : ''

  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <Splash
        lang={lang}
        total={itemCount || 105}
        windowLabel={windowLabel || '2025.11 — 2026.11'}
        ready={!!data || error}
      />

      <Header
        lang={lang}
        theme={theme}
        query={query}
        searchOpen={searchOpen}
        onLang={setLang}
        onTheme={setTheme}
        onQuery={setQuery}
        onSearchOpen={setSearchOpen}
      />

      {data && (
        <Hero
          meta={data.meta}
          lang={lang}
          itemCount={itemCount}
          authorCount={authors.length}
          articleCount={typeCounts.article}
          threadCount={typeCounts.thread + typeCounts.post}
          domains={domains}
        />
      )}

      <main>
        {error && (
          <div className="mx-auto max-w-frame border-x border-border px-5 py-16 text-center text-sm text-muted-foreground md:px-10">
            {t('error', lang)}
          </div>
        )}

        {!data && !error && (
          <div className="mx-auto max-w-frame border-x border-border px-5 py-24 text-center font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground md:px-10">
            {t('loading', lang)}
          </div>
        )}

        {data && (
          <section className="relative border-b border-border" aria-labelledby="list-title">
            <div className="relative mx-auto max-w-frame border-x border-border">
              <div className="flex items-end justify-between gap-4 px-5 pb-6 pt-12 md:px-10 md:pt-14">
                <h2 id="list-title" className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {t('listTitle', lang)}
                  <span className="text-faint">{t('listTitleSuffix', lang)}</span>
                </h2>
                <div className="font-mono text-xs tabular-nums text-muted-foreground">
                  {filtered.length}
                  <span className="text-faint"> / {itemCount}</span>
                </div>
              </div>

              <CategoryBar
                lang={lang}
                domains={domains}
                domain={domain}
                type={type}
                sort={sort}
                query={query}
                totalCount={data.items.length}
                domainCounts={domainCounts}
                onDomain={setDomain}
                onType={setType}
                onSort={setSort}
                onQuery={setQuery}
              />

              {filtered.length === 0 ? (
                <div className="px-5 py-20 text-center text-sm text-muted-foreground md:px-10">
                  {t('empty', lang)}
                </div>
              ) : (
                <div role="list" aria-label={lang === 'zh' ? '文章列表' : 'Article list'}>
                  {filtered.map((item, i) => (
                    <ThreadRow
                      key={item.id}
                      item={item}
                      lang={lang}
                      rank={i + 1}
                      index={i}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {data && (
          <section className="border-b border-border">
            <div className="mx-auto max-w-frame border-x border-border px-5 py-12 md:px-10 md:py-14">
              <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                <span className="text-foreground">03</span>
                <span className="h-px w-6 bg-border-strong" aria-hidden />
                {t('method', lang)}
              </div>
              <p className="max-w-3xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                {lang === 'zh' ? data.meta.method_zh : data.meta.method_en}
              </p>
            </div>
          </section>
        )}
      </main>

      <footer className="border-b border-border">
        <div className="mx-auto flex max-w-frame items-center justify-between gap-4 border-x border-border px-5 py-8 font-mono text-[11px] text-muted-foreground md:px-10">
          <span>{t('footer', lang)}</span>
          <span className="tabular-nums">{windowLabel}</span>
        </div>
      </footer>
    </div>
  )
}
