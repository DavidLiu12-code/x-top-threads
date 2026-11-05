import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import type { Lang, Meta } from '../lib/types'
import { t } from '../lib/i18n'
import { abbreviate } from '../lib/format'

interface Props {
  meta: Meta
  lang: Lang
  itemCount: number
  authorCount: number
  domainCount: number
}

function CountUp({ value, reduce }: { value: number; reduce: boolean }) {
  const [n, setN] = useState(reduce ? value : 0)
  useEffect(() => {
    if (reduce) {
      setN(value)
      return
    }
    const start = performance.now()
    const dur = 900
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(value * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, reduce])
  return <span>{abbreviate(n)}</span>
}

export function Hero({ meta, lang, itemCount, authorCount, domainCount }: Props) {
  const reduce = !!useReducedMotion()
  const title = lang === 'zh' ? meta.title_zh : meta.title_en
  const subtitle = lang === 'zh' ? meta.subtitle_zh : meta.subtitle_en
  const method = lang === 'zh' ? meta.method_zh : meta.method_en

  const stats = [
    { label: t('items', lang), value: itemCount },
    { label: t('authors', lang), value: authorCount },
    { label: t('domainsStat', lang), value: domainCount },
  ]

  return (
    <section className="mesh-hero relative overflow-hidden border-b border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 sm:pb-14 sm:pt-14 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1 text-xs font-medium text-accent shimmer-badge">
            <Sparkles size={14} />
            {t('curated', lang)} · {meta.window_start.slice(0, 10)} →{' '}
            {meta.window_end.slice(0, 10)}
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            {subtitle}
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]/90">
            <span className="font-medium text-[var(--text)]/80">{t('method', lang)}：</span>
            {method}
          </p>
        </motion.div>

        <div className="mt-8 grid grid-cols-3 gap-3 sm:max-w-lg">
          {stats.map((s) => (
            <div
              key={s.label}
              className="hairline rounded-2xl bg-[var(--bg-card)]/70 px-3 py-3 shadow-card sm:px-4"
            >
              <div className="text-xl font-semibold tracking-tight text-[var(--text)] sm:text-2xl">
                <CountUp value={s.value} reduce={reduce} />
              </div>
              <div className="mt-0.5 text-xs text-[var(--muted)]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
