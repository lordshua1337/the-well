import { NextResponse } from 'next/server'
import { requireUser } from '@/lib/auth/server'
import { adminClient } from '@/lib/supabase/client'
import { z } from 'zod'

const syncPushSchema = z.object({
  reading_progress: z.array(z.object({
    content_type: z.enum(['concept', 'word', 'passage', 'dossier', 'practice', 'path_stage', 'jesus_chapter']),
    content_id: z.string(),
    completed: z.boolean(),
    progress_pct: z.number().min(0).max(100).optional(),
  })).optional(),
  bookmarks: z.array(z.object({
    content_type: z.enum(['concept', 'word', 'passage', 'dossier', 'practice', 'path_stage', 'jesus_chapter']),
    content_id: z.string(),
  })).optional(),
  streak_date: z.string().optional(),
})

// GET: Pull all user state from server
export async function GET() {
  const user = await requireUser()

  const [progressRes, bookmarksRes, streakRes, pathRes] = await Promise.all([
    adminClient.from('reading_progress').select('*').eq('user_id', user.id),
    adminClient.from('bookmarks').select('*').eq('user_id', user.id),
    adminClient.from('daily_streaks').select('*').eq('user_id', user.id).single(),
    adminClient.from('path_progress').select('*').eq('user_id', user.id),
  ])

  return NextResponse.json({
    reading_progress: progressRes.data ?? [],
    bookmarks: bookmarksRes.data ?? [],
    streak: streakRes.data ?? null,
    path_progress: pathRes.data ?? [],
  })
}

// POST: Push local state to server (upsert)
export async function POST(request: Request) {
  const user = await requireUser()
  const body = await request.json()
  const parsed = syncPushSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid sync data', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const results: Record<string, number> = {}

  if (parsed.data.reading_progress?.length) {
    const rows = parsed.data.reading_progress.map((p) => ({
      user_id: user.id,
      content_type: p.content_type,
      content_id: p.content_id,
      completed: p.completed,
      progress_pct: p.progress_pct ?? (p.completed ? 100 : 0),
    }))

    const { error } = await adminClient
      .from('reading_progress')
      .upsert(rows, { onConflict: 'user_id,content_type,content_id' })

    if (error) {
      return NextResponse.json({ error: 'Failed to sync reading progress' }, { status: 500 })
    }
    results.reading_progress = rows.length
  }

  if (parsed.data.bookmarks?.length) {
    const rows = parsed.data.bookmarks.map((b) => ({
      user_id: user.id,
      content_type: b.content_type,
      content_id: b.content_id,
    }))

    const { error } = await adminClient
      .from('bookmarks')
      .upsert(rows, { onConflict: 'user_id,content_type,content_id' })

    if (error) {
      return NextResponse.json({ error: 'Failed to sync bookmarks' }, { status: 500 })
    }
    results.bookmarks = rows.length
  }

  if (parsed.data.streak_date) {
    const { data: existing } = await adminClient
      .from('daily_streaks')
      .select('*')
      .eq('user_id', user.id)
      .single()

    const today = parsed.data.streak_date
    const yesterday = new Date(new Date(today).getTime() - 86400000).toISOString().split('T')[0]

    if (existing) {
      const isConsecutive = existing.last_active_date === yesterday
      const newStreak = isConsecutive ? existing.current_streak + 1 : 1
      const newLongest = Math.max(existing.longest_streak, newStreak)

      await adminClient
        .from('daily_streaks')
        .update({
          current_streak: newStreak,
          longest_streak: newLongest,
          last_active_date: today,
        })
        .eq('user_id', user.id)
    } else {
      await adminClient
        .from('daily_streaks')
        .insert({
          user_id: user.id,
          current_streak: 1,
          longest_streak: 1,
          last_active_date: today,
        })
    }
    results.streak = 1
  }

  return NextResponse.json({ synced: results })
}
