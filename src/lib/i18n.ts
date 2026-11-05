import type { DomainId, ItemType, Lang, SortKey } from './types'

export const domainLabels: Record<DomainId, { zh: string; en: string }> = {
  agent: { zh: 'Agent', en: 'Agent' },
  ai: { zh: 'AI', en: 'AI' },
  opc: { zh: '一人公司', en: 'OPC' },
  writing: { zh: '写作', en: 'Writing' },
  taste: { zh: '品味', en: 'Taste' },
  marketing: { zh: '营销', en: 'Marketing' },
  'digital-marketing': { zh: '数字营销', en: 'Digital Mktg' },
  monetization: { zh: '变现', en: 'Monetization' },
}

export const typeLabels: Record<ItemType, { zh: string; en: string }> = {
  article: { zh: 'Article', en: 'Article' },
  thread: { zh: '长帖', en: 'Thread' },
  post: { zh: '帖子', en: 'Post' },
}

export const sortLabels: Record<SortKey, { zh: string; en: string }> = {
  score: { zh: '排名', en: 'Rank' },
  newest: { zh: '最新', en: 'Newest' },
  impressions: { zh: '曝光', en: 'Views' },
  likes: { zh: '点赞', en: 'Likes' },
  bookmarks: { zh: '收藏', en: 'Saves' },
}

const dict = {
  brand: { zh: '阅览室', en: 'Reading Room' },
  brandMono: { zh: '/ X Top Threads', en: '/ X Top Threads' },
  search: { zh: '搜索', en: 'Search' },
  searchPlaceholder: {
    zh: '筛选关键词',
    en: 'Filter keywords',
  },
  all: { zh: '全部', en: 'All' },
  allDomains: { zh: '全部', en: 'All' },
  allTypes: { zh: '全部', en: 'All' },
  sort: { zh: '排序', en: 'Sort' },
  results: { zh: '篇', en: 'articles' },
  openOnX: { zh: '在 X 打开', en: 'Open on X' },
  items: { zh: '篇目', en: 'Articles' },
  authors: { zh: '作者', en: 'Authors' },
  articles: { zh: 'Articles', en: 'Articles' },
  threads: { zh: 'Threads', en: 'Threads' },
  themeInvert: { zh: '反色', en: 'Invert' },
  langZh: { zh: '中', en: '中' },
  langEn: { zh: 'EN', en: 'EN' },
  empty: {
    zh: '没有匹配的篇目，试试换个筛选。',
    en: 'No matches. Try another filter.',
  },
  loading: { zh: '正在整理一年的信息流…', en: 'Sorting a year of feed…' },
  error: {
    zh: '数据加载失败，请刷新重试。',
    en: 'Failed to load. Please refresh.',
  },
  listTitle: { zh: '全部篇目', en: 'All entries' },
  listTitleSuffix: { zh: '，按综合排名。', en: ', ranked by score.' },
  heroLive: { zh: 'Live Catalog', en: 'Live Catalog' },
  splashBrand: { zh: 'Reading Room', en: 'Reading Room' },
  splashHint: {
    zh: '正在整理一年的信息流',
    en: 'Sorting a year of information',
  },
  splashCount: { zh: '已上架', en: 'Shelved' },
  method: { zh: '方法', en: 'Method' },
  footer: {
    zh: '数据来自公开 X 帖文互动 · 非官方榜单 · 阅览室',
    en: 'Public X engagement · unofficial · Reading Room',
  },
  figLabel: { zh: 'Fig. 01 — 篇目全景', en: 'Fig. 01 — Catalog map' },
} as const

export type DictKey = keyof typeof dict

export function t(key: DictKey, lang: Lang): string {
  return dict[key][lang]
}

export function domainLabel(id: DomainId, lang: Lang): string {
  return domainLabels[id][lang]
}

export function typeLabel(id: ItemType, lang: Lang): string {
  return typeLabels[id][lang]
}

export function sortLabel(id: SortKey, lang: Lang): string {
  return sortLabels[id][lang]
}
