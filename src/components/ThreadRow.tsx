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
  const enter = index < 6

  return (
    <div
      role="listitem"
      className="border-b border-border last:border-b-0"
      style={
        enter
          ? {
              animation: 'fade-up 0.4s cubic-bezier(0.22, 1, 0.36, 1) both',
              animationDelay: `${index * 50}ms`,
            }
          : undefined
      }
    >
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative grid w-full grid-cols-[3.5rem_1fr_auto] items-start gap-x-4 px-5 py-5 text-left transition-colors duration-150 ease-craft hover:bg-card md:grid-cols-[5.5rem_1fr_11rem_5.5rem_7rem_2rem] md:items-center md:gap-x-6 md:px-10"
      >
        <span
          className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-ember transition-transform duration-300 ease-craft group-hover:scale-y-100"
          aria-hidden
        />

        <span className="pt-0.5 font-mono text-sm tabular-nums text-faint transition-colors duration-150 ease-craft group-hover:text-ember md:pt-0 md:text-base">
          {padRank(rank)}
        </span>

        <span className="min-w-0">
          <span className="text-pretty text-[15px] font-medium leading-snug tracking-tight md:text-lg">
            {item.title}
          </span>
          <span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-muted-foreground md:hidden">
            <span>{item.author}</span>
            <span aria-hidden>·</span>
            <span className="tabular-nums">{date}</span>
            {primaryDomain && (
              <>
                <span aria-hidden>·</span>
                <span>{domainLabel(primaryDomain, lang)}</span>
              </>
            )}
          </span>
          {note && (
            <span className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-[0.55em] h-px w-3 shrink-0 bg-foreground/40" aria-hidden />
              {note}
            </span>
          )}
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
            <span className="inline-flex h-6 items-center gap-1.5 rounded-md border border-border px-2 font-mono text-[11px] text-muted-foreground">
              <span className="size-1 rounded-[1px] bg-foreground/50" aria-hidden />
              {domainLabel(primaryDomain, lang)}
            </span>
          )}
        </span>

        <span className="flex justify-end pt-0.5 md:pt-0">
          <span className="flex size-8 items-center justify-center rounded-lg border border-transparent text-faint transition-colors duration-150 ease-craft group-hover:border-border-strong group-hover:text-foreground">
            <ArrowUpRight className="size-4" strokeWidth={1.5} />
          </span>
        </span>
      </a>
    </div>
  )
}
