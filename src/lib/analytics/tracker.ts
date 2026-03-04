'use client'

const EVENT_BUFFER_KEY = 'the-well-analytics-buffer'
const FLUSH_INTERVAL = 30000 // 30 seconds
const MAX_BUFFER_SIZE = 50

interface AnalyticsEvent {
  event_type: string
  content_type?: string
  content_id?: string
  metadata?: Record<string, unknown>
  timestamp: number
}

function getBuffer(): AnalyticsEvent[] {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem(EVENT_BUFFER_KEY)
  return raw ? JSON.parse(raw) : []
}

function setBuffer(buffer: AnalyticsEvent[]): void {
  localStorage.setItem(EVENT_BUFFER_KEY, JSON.stringify(buffer))
}

export function trackEvent(
  eventType: string,
  contentType?: string,
  contentId?: string,
  metadata?: Record<string, unknown>
): void {
  const buffer = getBuffer()
  buffer.push({
    event_type: eventType,
    content_type: contentType,
    content_id: contentId,
    metadata,
    timestamp: Date.now(),
  })

  setBuffer(buffer)

  if (buffer.length >= MAX_BUFFER_SIZE) {
    flushEvents()
  }
}

export async function flushEvents(): Promise<void> {
  const buffer = getBuffer()
  if (buffer.length === 0) return

  const events = buffer.map(({ timestamp, ...rest }) => rest)

  try {
    const res = await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ events }),
    })

    if (res.ok) {
      setBuffer([])
    }
  } catch {
    // Offline — buffer stays for next flush
  }
}

// Convenience helpers
export function trackPageView(path: string): void {
  trackEvent('page_view', undefined, undefined, { path })
}

export function trackConceptRead(conceptId: string): void {
  trackEvent('content_read', 'concept', conceptId)
}

export function trackWordRead(wordId: string): void {
  trackEvent('content_read', 'word', wordId)
}

export function trackPassageRead(passageId: string): void {
  trackEvent('content_read', 'passage', passageId)
}

export function trackPracticeComplete(practiceId: string): void {
  trackEvent('practice_complete', 'practice', practiceId)
}

export function trackSearch(query: string, resultCount: number): void {
  trackEvent('search', undefined, undefined, { query, result_count: resultCount })
}

// Auto-flush on interval
let flushTimer: ReturnType<typeof setInterval> | null = null

export function startAutoFlush(): void {
  if (flushTimer) return
  flushTimer = setInterval(flushEvents, FLUSH_INTERVAL)

  // Flush on page unload
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', flushEvents)
  }
}

export function stopAutoFlush(): void {
  if (flushTimer) {
    clearInterval(flushTimer)
    flushTimer = null
  }
}
