import { Search } from 'lucide-react'
import type { DomainId, ItemType, Lang, SortKey } from '../lib/types'
import { domainLabel, sortLabel, t, typeLabel } from '../lib/i18n'

interface Props {
  lang: Lang
  domains: DomainId[]
  domain: DomainId | 'all'
  type: ItemType | 'all'
  sort: SortKey
  query: string
  totalCount: number
  domainCounts: Record<string, number>
  onDomain: (d: DomainId | 'all') => void
  onType: (t: ItemType | 'all') => void
  onSort: (s: SortKey) => void
  onQuery: (q: string) => void
}

const SORTS: SortKey[] = ['score', 'newest', 'impressions', 'likes', 'bookmarks']
const TYPES: Array<ItemType | 'all'> = ['all', 'article', 'thread']

export function CategoryBar({
  lang,
  domains,
  domain,
  type,
  sort,
  query,
  totalCount,
  domainCounts,
  onDomain,
  onType,
  onSort,
  onQuery,
}: Props) {
  return (
    <div className="sticky top-14 z-30 border-y border-border bg-background/90 backdrop-blur-md">
      <div className="flex flex-col gap-3 px-5 py-3 md:px-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-5 flex items-center gap-2 overflow-x-auto px-5 scrollbar-none md:mx-0 md:px-0">
          <Chip
            active={domain === 'all'}
            count={totalCount}
            onClick={() => onDomain('all')}
            label={t('allDomains', lang)}
          />
          {domains.map((d) => (
            <Chip
              key={d}
              active={domain === d}
              count={domainCounts[d] || 0}
              onClick={() => onDomain(d)}
              label={domainLabel(d, lang)}
            />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div
            role="radiogroup"
            aria-label={t('allTypes', lang)}
            className="flex h-8 shrink-0 items-center rounded-lg border border-border p-0.5"
          >
            {TYPES.map((tp) => (
              <button
                key={tp}
                type="button"
                role="radio"
                aria-checked={type === tp}
                onClick={() => onType(tp)}
                className={`relative h-full rounded-md px-2.5 text-xs font-medium transition-colors duration-150 ease-craft ${
                  type === tp
                    ? 'text-foreground'
                    : 'text-faint hover:text-muted-foreground'
                }`}
              >
                {type === tp && (
                  <span className="absolute inset-0 rounded-md bg-accent" />
                )}
                <span className="relative">
                  {tp === 'all' ? t('allTypes', lang) : typeLabel(tp, lang)}
                </span>
              </button>
            ))}
          </div>

          <div
            role="radiogroup"
            aria-label={t('sort', lang)}
            className="flex h-8 max-w-full shrink-0 items-center overflow-x-auto rounded-lg border border-border p-0.5 scrollbar-none"
          >
            {SORTS.map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={sort === s}
                onClick={() => onSort(s)}
                className={`relative h-full shrink-0 rounded-md px-2.5 text-xs font-medium transition-colors duration-150 ease-craft ${
                  sort === s
                    ? 'text-foreground'
                    : 'text-faint hover:text-muted-foreground'
                }`}
              >
                {sort === s && (
                  <span className="absolute inset-0 rounded-md bg-accent" />
                )}
                <span className="relative">{sortLabel(s, lang)}</span>
              </button>
            ))}
          </div>

          <label className="group relative flex h-8 min-w-0 flex-1 items-center lg:w-52 lg:flex-none">
            <span className="sr-only">{t('searchPlaceholder', lang)}</span>
            <Search
              className="pointer-events-none absolute left-2.5 size-4 text-faint transition-colors duration-150 ease-craft group-focus-within:text-foreground"
              strokeWidth={1.5}
              aria-hidden
            />
            <input
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder={t('searchPlaceholder', lang)}
              className="h-full w-full rounded-lg border border-border bg-transparent pl-9 pr-3 text-xs outline-none transition-colors duration-150 ease-craft placeholder:text-faint hover:border-border-strong focus:border-foreground"
            />
          </label>
        </div>
      </div>
    </div>
  )
}

function Chip({
  active,
  count,
  label,
  onClick,
}: {
  active: boolean
  count: number
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex h-8 shrink-0 items-center gap-2 rounded-lg border px-3 text-xs font-medium transition-colors duration-150 ease-craft active:scale-[0.97] ${
        active
          ? 'border-foreground bg-foreground text-background'
          : 'border-border text-muted-foreground hover:border-border-strong hover:text-foreground'
      }`}
    >
      {label}
      <span
        className={`font-mono text-[11px] tabular-nums ${
          active ? 'text-background/55' : 'text-faint'
        }`}
      >
        {count}
      </span>
    </button>
  )
}
