import { Search } from 'lucide-react'
import type { Lang, SortKey } from '../lib/types'
import { sortLabel, t } from '../lib/i18n'

const SORTS: SortKey[] = ['score', 'newest', 'impressions', 'likes', 'bookmarks']

interface Props {
  lang: Lang
  sort: SortKey
  query: string
  resultCount: number
  onSort: (s: SortKey) => void
  onQuery: (q: string) => void
}

export function SortBar({ lang, sort, query, resultCount, onSort, onQuery }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative min-w-0 flex-1 sm:max-w-sm">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted)]"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder={t('searchPlaceholder', lang)}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-card)] py-2.5 pl-9 pr-3 text-sm outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[var(--muted)] focus:border-accent/50 focus:shadow-[0_0_0_3px_var(--accent-soft)]"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-[var(--muted)]">{t('sort', lang)}</span>
        <div className="flex flex-wrap gap-1.5">
          {SORTS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onSort(s)}
              className={`pressable rounded-full px-2.5 py-1 text-xs font-medium transition-colors duration-150 ${
                sort === s
                  ? 'bg-accent text-white'
                  : 'border border-[var(--border)] bg-[var(--bg-card)] text-[var(--muted)] hover:text-[var(--text)]'
              }`}
            >
              {sortLabel(s, lang)}
            </button>
          ))}
        </div>
        <span className="ml-auto text-xs tabular-nums text-[var(--muted)] sm:ml-2">
          {resultCount} {t('results', lang)}
        </span>
      </div>
    </div>
  )
}
