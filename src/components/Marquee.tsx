import type { DomainId, Lang } from '../lib/types'
import { domainLabel } from '../lib/i18n'

interface Props {
  domains: DomainId[]
  authors: string[]
  lang: Lang
}

export function Marquee({ domains, authors, lang }: Props) {
  const tags = [
    ...domains.map((d) => domainLabel(d, lang)),
    ...authors.slice(0, 12).map((a) => `@${a}`),
  ]
  const loop = [...tags, ...tags]

  return (
    <div className="relative overflow-hidden border-y border-[var(--border)] bg-[var(--bg-elevated)]/60 py-3">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--bg)] to-transparent" />
      <div className="animate-marquee flex w-max gap-3 whitespace-nowrap">
        {loop.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1 text-xs text-[var(--muted)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
