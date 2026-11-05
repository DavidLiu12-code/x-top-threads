import { ArrowUpRight } from 'lucide-react'
import type { Lang, ThreadItem } from '../lib/types'
import { domainLabel } from '../lib/i18n'
import { formatDate, padRank } from '../lib/format'

interface Props {
  item: ThreadItem
  lang: Lang
  rank: number
  index: number
}

export function ThreadRow({ item, lang, rank, index }: Props) {
  const note = lang === 'zh' ? item.note_zh : item.note_en
  const primaryDomain = item.domains[0]
  const date = formatDate(item.created_at, lang)

  return (
    <div
      role="listitem"
      className="border-b border-border last:border-b-0"
      style={{
        animation: 'fade-up 0.45s ease-out both',
        animationDelay: `${Math.min(index, 24) * 18}ms`,
      }}
    >
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative grid w-full grid-cols-[3.25rem_1fr_auto] items-start gap-x-3 px-5 py-5 text-left transition-colors duration-200 hover:bg-card md:grid-cols-[5.5rem_1fr_11rem_5.5rem_7rem_2rem] md:items-center md:gap-x-6 md:px-10 md:py-6"
      >
        <span
          className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-foreground transition-transform duration-500 ease-out-expo group-hover:scale-y-100"
          aria-hidden
        />

        <span className="pt-0.5 font-mono text-sm tabular-nums text-faint transition-colors group-hover:text-foreground md:pt-0 md:text-base">
          {padRank(rank)}
        </span>

        <span className="min-w-0">
          <span className="flex items-start gap-2">
            <span className="text-pretty text-[15px] font-medium leading-snug tracking-tight md:text-lg">
              {item.title}
            </span>
          </span>
          <span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-muted-foreground md:hidden">
            <span>{item.author}</span>
            <span aria-hidden>·</span>
            <span>{date}</span>
            {primaryDomain && (
              <>
                <span aria-hidden>·</span>
                <span>{domainLabel(primaryDomain, lang)}</span>
              </>
            )}
          </span>
          <span className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out-expo group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
            <span className="overflow-hidden">
              <span className="flex items-start gap-2 pt-2.5 text-sm text-muted-foreground">
                <span className="mt-[0.45em] h-px w-3 shrink-0 bg-foreground" aria-hidden />
                {note}
              </span>
            </span>
          </span>
        </span>

        <span className="hidden min-w-0 md:block">
          <span className="block truncate text-sm">{item.author}</span>
          <span className="block truncate font-mono text-[11px] text-faint">@{item.handle}</span>
        </span>

        <span className="hidden font-mono text-xs tabular-nums text-muted-foreground md:block">
          {date}
        </span>

        <span className="hidden md:block">
          {primaryDomain && (
            <span className="inline-flex h-6 items-center gap-1.5 rounded-full border border-border px-2 font-mono text-[10px] text-foreground">
              <span className="size-1.5 rounded-[1px] bg-foreground" aria-hidden />
              {domainLabel(primaryDomain, lang)}
            </span>
          )}
        </span>

        <span className="flex justify-end pt-0.5 md:pt-0">
          <span className="flex size-8 items-center justify-center rounded-full border border-transparent text-faint transition-all duration-300 group-hover:border-border-strong group-hover:text-foreground">
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </span>
      </a>
    </div>
  )
}
