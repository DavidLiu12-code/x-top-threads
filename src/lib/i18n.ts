import type { DomainId, ItemType, Lang, SortKey } from './types'

export const domainLabels: Record<DomainId, { zh: string; en: string }> = {
  agent: { zh: 'Agent', en: 'Agent' },
  ai: { zh: 'AI', en: 'AI' },
  opc: { zh: 'OPC', en: 'OPC' },
  writing: { zh: '写作', en: 'Writing' },
  taste: { zh: '品味', en: 'Taste' },
  marketing: { zh: '营销', en: 'Marketing' },
  'digital-marketing': { zh: '数字营销', en: 'Digital Marketing' },
  monetization: { zh: '变现', en: 'Monetization' },
}

export const typeLabels: Record<ItemType, { zh: string; en: string }> = {
  article: { zh: '长文', en: 'Article' },
  thread: { zh: 'Thread', en: 'Thread' },
  post: { zh: '帖子', en: 'Post' },
}

export const sortLabels: Record<SortKey, { zh: string; en: string }> = {
  score: { zh: '推荐度', en: 'Recommended' },
  newest: { zh: '时间最新', en: 'Newest' },
  impressions: { zh: '观看量', en: 'Impressions' },
  likes: { zh: '点赞', en: 'Likes' },
  bookmarks: { zh: '收藏', en: 'Bookmarks' },
}

const dict = {
  brand: { zh: 'X Top Threads', en: 'X Top Threads' },
  navHome: { zh: '目录', en: 'Directory' },
  searchPlaceholder: {
    zh: '搜索标题、作者、句柄…',
    en: 'Search title, author, handle…',
  },
  allDomains: { zh: '全部领域', en: 'All domains' },
  allTypes: { zh: '全部类型', en: 'All types' },
  domains: { zh: '领域', en: 'Domains' },
  types: { zh: '类型', en: 'Type' },
  sort: { zh: '排序', en: 'Sort' },
  results: { zh: '条结果', en: 'results' },
  openOnX: { zh: '在 X 打开', en: 'Open on X' },
  likes: { zh: '赞', en: 'Likes' },
  bookmarks: { zh: '收藏', en: 'Bookmarks' },
  impressions: { zh: '曝光', en: 'Views' },
  score: { zh: '推荐分', en: 'Score' },
  method: { zh: '筛选方法', en: 'Method' },
  items: { zh: '条目', en: 'Items' },
  authors: { zh: '作者', en: 'Authors' },
  domainsStat: { zh: '领域', en: 'Domains' },
  themeLight: { zh: '浅色', en: 'Light' },
  themeDark: { zh: '深色', en: 'Dark' },
  langZh: { zh: '中文', en: '中文' },
  langEn: { zh: 'EN', en: 'EN' },
  empty: {
    zh: '没有匹配的内容，试试换个筛选条件。',
    en: 'No matches. Try a different filter.',
  },
  loading: { zh: '加载中…', en: 'Loading…' },
  error: {
    zh: '数据加载失败，请刷新重试。',
    en: 'Failed to load data. Please refresh.',
  },
  filters: { zh: '筛选', en: 'Filters' },
  clearFilters: { zh: '清除筛选', en: 'Clear filters' },
  curated: { zh: '精选', en: 'Curated' },
  footer: {
    zh: '数据来自公开 X 帖文互动 · 非官方榜单',
    en: 'Public X engagement · unofficial directory',
  },
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
