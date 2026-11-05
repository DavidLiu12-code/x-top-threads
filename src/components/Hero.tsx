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
    <span
      aria-hidden
      className={`pointer-events-none absolute z-10 size-3 text-foreground/40 ${className}`}
    >
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
      ? `一年的信息流，压缩成 ${itemCount} 篇长文`
      : `A year of feed, compressed into ${itemCount} long reads`
  const subtitle = lang === 'zh' ? meta.subtitle_zh : meta.subtitle_en
  const window =
    `${meta.window_start.slice(0, 7).replace('-', '.')} — ${meta.window_end
      .slice(0, 7)
      .replace('-', '.')}`

  return (
    <section aria-labelledby="hero-title" className="relative border-b border-border">
      <div className="relative mx-auto max-w-frame border-x border-border">
        <Crosshair className="-bottom-1.5 -left-1.5" />
        <Crosshair className="-bottom-1.5 -right-1.5" />

        <div className="grid lg:grid-cols-12">
          <div className="relative flex flex-col justify-between gap-12 px-5 pb-12 pt-12 md:px-10 md:pb-16 md:pt-16 lg:col-span-7 lg:border-r lg:border-border">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2 text-foreground">
                <span className="size-1.5 rounded-full bg-ember" aria-hidden />
                {t('heroLive', lang)}
              </span>
              <span className="hidden text-faint sm:inline" aria-hidden>
                /
              </span>
              <span className="hidden tabular-nums sm:inline">{window}</span>
            </div>

            <div>
              <h1
                id="hero-title"
                className="max-w-[18ch] text-[clamp(2.25rem,5.5vw,4.5rem)] font-normal leading-[1.06] tracking-[-0.03em]"
              >
                {title}
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
                {subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {domains.map((d) => (
                <span
                  key={d}
                  className="inline-flex h-7 items-center rounded-md border border-border px-2.5 font-mono text-[11px] text-muted-foreground"
                >
                  {domainLabel(d, lang)}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between border-t border-border px-5 py-10 md:px-10 md:py-12 lg:col-span-5 lg:border-t-0">
            <div className="mb-10 flex items-center justify-between font-mono text-xs text-muted-foreground">
              <span>{t('figLabel', lang)}</span>
              <span className="tabular-nums text-faint">{itemCount}</span>
            </div>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
              {(
                [
                  ['items', itemCount],
                  ['authors', authorCount],
                  ['articles', articleCount],
                  ['threads', threadCount],
                ] as const
              ).map(([key, value]) => (
                <div key={key}>
                  <dt className="font-mono text-xs text-muted-foreground">{t(key, lang)}</dt>
                  <dd className="mt-2 font-mono text-4xl font-medium tabular-nums tracking-tight md:text-5xl">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
