import type { Catalog, DomainId, Lang } from '../lib/types'
import { t, domainLabel } from '../lib/i18n'

interface Props {
  meta: Catalog['meta']
  lang: Lang
  itemCount: number
  authorCount: number
  articleCount: number
  threadCount: number
  domains: DomainId[]
}

function Crosshair({ className }: { className: string }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute z-10 size-[13px] text-foreground ${className}`}>
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
    </span>
  )
}

export function Hero({
  meta,
  lang,
  itemCount,
  authorCount,
  articleCount,
  threadCount,
  domains,
}: Props) {
  const title =
    lang === 'zh'
      ? `一年的信息流，压缩成 ${itemCount} 篇长文。`
      : `A year of feed, compressed into ${itemCount} long reads.`
  const subtitle = lang === 'zh' ? meta.subtitle_zh : meta.subtitle_en
  const method = lang === 'zh' ? meta.method_zh : meta.method_en

  return (
    <section aria-labelledby="hero-title" className="relative border-b border-border">
      <div className="relative mx-auto max-w-frame border-x border-border">
        <Crosshair className="-left-[7px] -bottom-[7px]" />
        <Crosshair className="-right-[7px] -bottom-[7px]" />

        <div className="grid lg:grid-cols-12">
          <div className="relative flex flex-col justify-between gap-12 overflow-hidden px-5 pb-12 pt-12 md:px-10 md:pb-14 md:pt-14 lg:col-span-7 lg:border-r lg:border-border">
            <div className="pointer-events-none absolute inset-0 grid-lines opacity-60 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />

            <div className="relative flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <span className="inline-flex items-center gap-2 text-foreground">
                <span className="relative flex size-1.5">
                  <span className="absolute inset-0 rounded-full bg-foreground animate-pulse-ring" />
                  <span className="relative size-1.5 rounded-full bg-foreground" />
                </span>
                {t('heroLive', lang)}
              </span>
              <span className="hidden sm:inline" aria-hidden>
                /
              </span>
              <span className="hidden sm:inline">
                {meta.window_start.slice(0, 7).replace('-', '.')} —{' '}
                {meta.window_end.slice(0, 7).replace('-', '.')}
              </span>
            </div>

            <div className="relative">
              <h1
                id="hero-title"
                className="text-[11.5vw] font-semibold leading-[1.04] tracking-[-0.045em] sm:text-[clamp(2.5rem,6vw,5.75rem)]"
              >
                {title}
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                {subtitle}
              </p>
              <p className="mt-4 max-w-xl text-pretty font-mono text-[11px] leading-relaxed text-faint">
                {method}
              </p>
            </div>

            <div className="relative flex flex-wrap gap-2">
              {domains.map((d) => (
                <span
                  key={d}
                  className="inline-flex h-7 items-center rounded-full border border-border px-2.5 font-mono text-[10px] text-muted-foreground"
                >
                  {domainLabel(d, lang)}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between border-t border-border px-5 py-10 md:px-10 md:py-12 lg:col-span-5 lg:border-t-0">
            <div className="mb-8 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              <span>{t('figLabel', lang)}</span>
              <span className="tabular-nums">
                {itemCount} / {itemCount}
              </span>
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {t('items', lang)}
                </dt>
                <dd className="mt-2 font-mono text-4xl font-medium tabular-nums tracking-tight md:text-5xl">
                  {itemCount}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {t('authors', lang)}
                </dt>
                <dd className="mt-2 font-mono text-4xl font-medium tabular-nums tracking-tight md:text-5xl">
                  {authorCount}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {t('articles', lang)}
                </dt>
                <dd className="mt-2 font-mono text-4xl font-medium tabular-nums tracking-tight md:text-5xl">
                  {articleCount}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {t('threads', lang)}
                </dt>
                <dd className="mt-2 font-mono text-4xl font-medium tabular-nums tracking-tight md:text-5xl">
                  {threadCount}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
