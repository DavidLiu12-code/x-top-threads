import type { ReactNode } from 'react'
import { Filter, X } from 'lucide-react'
import type { DomainId, ItemType, Lang } from '../lib/types'
import { domainLabel, t, typeLabel } from '../lib/i18n'

interface Props {
  lang: Lang
  domains: DomainId[]
  domain: DomainId | 'all'
  type: ItemType | 'all'
  counts: {
    domain: Record<string, number>
    type: Record<string, number>
  }
  onDomain: (d: DomainId | 'all') => void
  onType: (t: ItemType | 'all') => void
  onClear: () => void
  mobileOpen?: boolean
  onCloseMobile?: () => void
}

const TYPES: ItemType[] = ['article', 'thread', 'post']

function Chip({
  active,
  onClick,
  children,
  count,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
  count?: number
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`pressable flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors duration-150 ${
        active
          ? 'bg-accent text-white shadow-sm'
          : 'text-[var(--muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--text)]'
      }`}
    >
      <span>{children}</span>
      {typeof count === 'number' && (
        <span
          className={`ml-2 rounded-md px-1.5 py-0.5 text-[10px] font-medium tabular-nums ${
            active ? 'bg-white/20' : 'bg-[var(--bg)] text-[var(--muted)]'
          }`}
        >
          {count}
        </span>
      )}
    </button>
  )
}

export function Sidebar({
  lang,
  domains,
  domain,
  type,
  counts,
  onDomain,
  onType,
  onClear,
  mobileOpen,
  onCloseMobile,
}: Props) {
  const body = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Filter size={16} className="text-accent" />
          {t('filters', lang)}
        </div>
        <button
          type="button"
          onClick={onClear}
          className="pressable text-xs text-[var(--muted)] transition-colors duration-150 hover:text-[var(--text)]"
        >
          {t('clearFilters', lang)}
        </button>
      </div>

      <div>
        <div className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
          {t('domains', lang)}
        </div>
        <div className="space-y-1">
          <Chip
            active={domain === 'all'}
            onClick={() => onDomain('all')}
            count={counts.domain.__all}
          >
            {t('allDomains', lang)}
          </Chip>
          {domains.map((d) => (
            <Chip
              key={d}
              active={domain === d}
              onClick={() => onDomain(d)}
              count={counts.domain[d] || 0}
            >
              {domainLabel(d, lang)}
            </Chip>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
          {t('types', lang)}
        </div>
        <div className="space-y-1">
          <Chip active={type === 'all'} onClick={() => onType('all')}>
            {t('allTypes', lang)}
          </Chip>
          {TYPES.map((ty) => (
            <Chip
              key={ty}
              active={type === ty}
              onClick={() => onType(ty)}
              count={counts.type[ty] || 0}
            >
              {typeLabel(ty, lang)}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-56 shrink-0 lg:block xl:w-60">
        <div className="sticky top-20 hairline rounded-2xl bg-[var(--bg-card)] p-4 shadow-card">
          {body}
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close"
            onClick={onCloseMobile}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-3xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 shadow-2xl">
            <div className="mb-3 flex justify-end">
              <button
                type="button"
                onClick={onCloseMobile}
                className="pressable rounded-full p-2 text-[var(--muted)]"
              >
                <X size={18} />
              </button>
            </div>
            {body}
          </div>
        </div>
      )}
    </>
  )
}

/** Horizontal chips for mobile/tablet */
export function FilterChips({
  lang,
  domains,
  domain,
  type,
  onDomain,
  onType,
  onOpenMore,
}: {
  lang: Lang
  domains: DomainId[]
  domain: DomainId | 'all'
  type: ItemType | 'all'
  onDomain: (d: DomainId | 'all') => void
  onType: (t: ItemType | 'all') => void
  onOpenMore: () => void
}) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 lg:hidden">
      <button
        type="button"
        onClick={onOpenMore}
        className="pressable shrink-0 inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1.5 text-xs font-medium"
      >
        <Filter size={14} />
        {t('filters', lang)}
      </button>
      <button
        type="button"
        onClick={() => onDomain('all')}
        className={`pressable shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-150 ${
          domain === 'all'
            ? 'bg-accent text-white'
            : 'border border-[var(--border)] bg-[var(--bg-card)] text-[var(--muted)]'
        }`}
      >
        {t('allDomains', lang)}
      </button>
      {domains.map((d) => (
        <button
          key={d}
          type="button"
          onClick={() => onDomain(d)}
          className={`pressable shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-150 ${
            domain === d
              ? 'bg-accent text-white'
              : 'border border-[var(--border)] bg-[var(--bg-card)] text-[var(--muted)]'
          }`}
        >
          {domainLabel(d, lang)}
        </button>
      ))}
      {TYPES.map((ty) => (
        <button
          key={ty}
          type="button"
          onClick={() => onType(type === ty ? 'all' : ty)}
          className={`pressable shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-150 ${
            type === ty
              ? 'bg-accent/90 text-white'
              : 'border border-[var(--border)] bg-[var(--bg-card)] text-[var(--muted)]'
          }`}
        >
          {typeLabel(ty, lang)}
        </button>
      ))}
    </div>
  )
}
