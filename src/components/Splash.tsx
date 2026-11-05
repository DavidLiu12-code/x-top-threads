import { useEffect, useState } from 'react'
import type { Lang } from '../lib/types'
import { t } from '../lib/i18n'

interface Props {
  lang: Lang
  total: number
  windowLabel: string
  ready: boolean
}

export function Splash({ lang, total, windowLabel, ready }: Props) {
  const [count, setCount] = useState(0)
  const [progress, setProgress] = useState(0)
  const [hide, setHide] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const duration = 560
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * total))
      setProgress(Math.round(eased * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [total])

  useEffect(() => {
    if (!ready) return
    const t1 = window.setTimeout(() => setHide(true), 120)
    const t2 = window.setTimeout(() => setGone(true), 480)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [ready])

  if (gone) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-background p-5 md:p-8"
      aria-hidden="true"
      style={{
        clipPath: hide ? 'inset(0 0 100% 0)' : 'inset(0 0 0% 0)',
        transition: 'clip-path 360ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
        <span>{t('splashBrand', lang)}</span>
        <span className="tabular-nums">{windowLabel}</span>
      </div>
      <div className="flex items-end justify-between gap-6">
        <div className="font-mono text-[clamp(4.5rem,20vw,14rem)] font-medium leading-[0.85] tracking-[-0.04em] tabular-nums">
          {String(count).padStart(3, '0')}
        </div>
        <div className="mb-2 hidden max-w-[14rem] text-right text-sm leading-relaxed text-muted-foreground md:block">
          {t('splashHint', lang)}
          <br />
          <span className="font-mono text-xs tabular-nums text-faint">
            {t('splashCount', lang)} {count}
          </span>
        </div>
      </div>
      <div className="relative h-px w-full overflow-hidden bg-border">
        <div
          className="absolute inset-y-0 left-0 bg-foreground"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
