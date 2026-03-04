'use client'

import { createSupabaseBrowser } from '@/lib/auth/client'

const SYNC_QUEUE_KEY = 'the-well-sync-queue'
const LAST_SYNC_KEY = 'the-well-last-sync'

interface SyncItem {
  type: 'reading_progress' | 'bookmark' | 'streak'
  data: Record<string, unknown>
  timestamp: number
}

function getQueue(): SyncItem[] {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem(SYNC_QUEUE_KEY)
  return raw ? JSON.parse(raw) : []
}

function setQueue(queue: SyncItem[]): void {
  localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue))
}

export function queueSync(item: SyncItem): void {
  const queue = getQueue()
  setQueue([...queue, item])
}

export function markProgress(contentType: string, contentId: string, completed: boolean): void {
  // Save locally
  const key = `the-well-progress-${contentType}-${contentId}`
  localStorage.setItem(key, JSON.stringify({ completed, timestamp: Date.now() }))

  // Queue for server sync
  queueSync({
    type: 'reading_progress',
    data: { content_type: contentType, content_id: contentId, completed },
    timestamp: Date.now(),
  })
}

export function toggleBookmark(contentType: string, contentId: string): boolean {
  const key = `the-well-bookmark-${contentType}-${contentId}`
  const existing = localStorage.getItem(key)
  const isBookmarked = !existing

  if (isBookmarked) {
    localStorage.setItem(key, 'true')
    queueSync({
      type: 'bookmark',
      data: { content_type: contentType, content_id: contentId },
      timestamp: Date.now(),
    })
  } else {
    localStorage.removeItem(key)
  }

  return isBookmarked
}

export function recordStreak(): void {
  const today = new Date().toISOString().split('T')[0]
  const lastVisit = localStorage.getItem('the-well-last-visit')

  if (lastVisit !== today) {
    localStorage.setItem('the-well-last-visit', today)
    queueSync({
      type: 'streak',
      data: { streak_date: today },
      timestamp: Date.now(),
    })
  }
}

export async function flushSyncQueue(): Promise<void> {
  const queue = getQueue()
  if (queue.length === 0) return

  const supabase = createSupabaseBrowser()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  // Group queue items by type
  const readingProgress = queue
    .filter((i) => i.type === 'reading_progress')
    .map((i) => i.data)
  const bookmarks = queue
    .filter((i) => i.type === 'bookmark')
    .map((i) => i.data)
  const streakItem = queue.find((i) => i.type === 'streak')

  const payload: Record<string, unknown> = {}
  if (readingProgress.length) payload.reading_progress = readingProgress
  if (bookmarks.length) payload.bookmarks = bookmarks
  if (streakItem) payload.streak_date = streakItem.data.streak_date

  try {
    const res = await fetch('/api/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      setQueue([])
      localStorage.setItem(LAST_SYNC_KEY, new Date().toISOString())
    }
  } catch {
    // Offline — queue stays for next attempt
  }
}

export async function pullServerState(): Promise<Record<string, unknown> | null> {
  try {
    const res = await fetch('/api/sync')
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}
