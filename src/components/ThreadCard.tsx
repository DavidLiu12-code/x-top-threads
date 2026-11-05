import { useCallback, type MouseEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Bookmark,
  ExternalLink,
  Eye,
  Heart,
  Sparkles,
} from 'lucide-react'
import type { Lang, ThreadItem } from '../lib/types'
import { domainLabel, t, typeLabel } from '../lib/i18n'
import { abbreviate, avatarUrl, formatDate } from '../lib/format'

interface Props {
  item: ThreadItem
  lang: Lang
  index: number
}

export function ThreadCard({ item, lang, index }: Props) {
  const reduce = !!useReducedMotion()

  const onMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }, [])

  const note = lang === 'zh' ? item.note_zh : item.note_en

  return (
    <motion.article
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: reduce ? 0 : Math.min(index * 0.035, 0.35),
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={onMove}
      className="spotlight-card group hairline flex h-full flex-col rounded-2xl bg-[var(--bg-card)] p-4 shadow-card transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-card-hover sm:p-5"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-md bg-accent/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent">
            {typeLabel(item.type, lang)}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md border border-[var(--border)] px-2 py-0.5 text-[11px] font-medium text-[var(--muted)]">
            <Sparkles size={11} className="text-accent" />
            {abbreviate(Math.round(item.score))}
          </span>
        </div>
        <time className="shrink-0 text-[11px] tabular-nums text-[var(--muted)]">
          {formatDate(item.created_at, lang)}
        </time>
      </div>

      <h3 className="text-base font-semibold leading-snug tracking-tight text-[var(--text)] sm:text-[17px]">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-150 hover:text-accent"
        >
          {item.title || item.text_preview.slice(0, 120)}
        </a>
      </h3>

      <a
        href={item.author_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 flex items-center gap-2.5"
      >
        <img
          src={avatarUrl(item.handle, item.author)}
          alt=""
          width={32}
          height={32}
          className="h-8 w-8 rounded-full ring-1 ring-[var(--border)]"
          loading="lazy"
        />
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-[var(--text)]">{item.author}</div>
          <div className="truncate text-xs text-[var(--muted)]">@{item.handle}</div>
        </div>
      </a>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {item.domains.map((d) => (
          <span
            key={d}
            className="rounded-full border border-[var(--border)] bg-[var(--bg)]/40 px-2 py-0.5 text-[11px] text-[var(--muted)]"
          >
            {domainLabel(d, lang)}
          </span>
        ))}
      </div>

      <p className="mt-3 line-clamp-2 flex-1 text-xs leading-relaxed text-[var(--muted)]">
        {note}
      </p>

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-[var(--border)] pt-3">
        <div className="flex flex-wrap items-center gap-3 text-[11px] tabular-nums text-[var(--muted)]">
          <span className="inline-flex items-center gap-1" title={t('likes', lang)}>
            <Heart size={12} />
            {abbreviate(item.likes)}
          </span>
          <span className="inline-flex items-center gap-1" title={t('bookmarks', lang)}>
            <Bookmark size={12} />
            {abbreviate(item.bookmarks)}
          </span>
          <span className="inline-flex items-center gap-1" title={t('impressions', lang)}>
            <Eye size={12} />
            {abbreviate(item.impressions)}
          </span>
        </div>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="pressable inline-flex items-center gap-1 rounded-lg bg-accent/15 px-2.5 py-1.5 text-xs font-medium text-accent transition-colors duration-150 hover:bg-accent hover:text-white"
        >
          {t('openOnX', lang)}
          <ExternalLink size={12} />
        </a>
      </div>
    </motion.article>
  )
}
