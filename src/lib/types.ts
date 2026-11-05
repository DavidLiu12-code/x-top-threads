export type DomainId =
  | 'agent'
  | 'ai'
  | 'opc'
  | 'writing'
  | 'taste'
  | 'marketing'
  | 'digital-marketing'
  | 'monetization'

export type ItemType = 'article' | 'thread' | 'post'

export type SortKey =
  | 'score'
  | 'newest'
  | 'impressions'
  | 'likes'
  | 'bookmarks'

export type Lang = 'zh' | 'en'
export type Theme = 'dark' | 'light'

export interface Meta {
  title_zh: string
  title_en: string
  subtitle_zh: string
  subtitle_en: string
  collected_at: string
  method_zh: string
  method_en: string
  domains: DomainId[]
  window_start: string
  window_end: string
  item_count: number
}

export interface ThreadItem {
  id: string
  url: string
  title: string
  text_preview: string
  author: string
  handle: string
  author_url: string
  created_at: string
  domains: DomainId[]
  type: ItemType
  likes: number
  bookmarks: number
  reposts: number
  replies: number
  impressions: number
  quotes: number
  score: number
  note_zh: string
  note_en: string
}

export interface Catalog {
  meta: Meta
  items: ThreadItem[]
}
