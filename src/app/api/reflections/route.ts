import { NextResponse } from 'next/server'
import { getUser, requireUser } from '@/lib/auth/server'
import { adminClient } from '@/lib/supabase/client'
import { z } from 'zod'

const createReflectionSchema = z.object({
  content_type: z.enum(['concept', 'word', 'passage', 'dossier', 'practice', 'path_stage', 'jesus_chapter']),
  content_id: z.string().min(1),
  body: z.string().min(1).max(280),
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const contentType = searchParams.get('content_type')
  const contentId = searchParams.get('content_id')
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '20'), 50)

  let query = adminClient
    .from('community_reflections')
    .select('id, user_id, content_type, content_id, body, created_at')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (contentType) {
    query = query.eq('content_type', contentType)
  }
  if (contentId) {
    query = query.eq('content_id', contentId)
  }

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch reflections' }, { status: 500 })
  }

  return NextResponse.json({ reflections: data })
}

export async function POST(request: Request) {
  const user = await requireUser()

  const body = await request.json()
  const parsed = createReflectionSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  // Rate limit: 5 reflections per day
  const today = new Date().toISOString().split('T')[0]
  const { count } = await adminClient
    .from('community_reflections')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .gte('created_at', `${today}T00:00:00Z`)

  if ((count ?? 0) >= 5) {
    return NextResponse.json(
      { error: 'Daily reflection limit reached (5 per day)' },
      { status: 429 }
    )
  }

  const { data, error } = await adminClient
    .from('community_reflections')
    .insert({
      user_id: user.id,
      content_type: parsed.data.content_type,
      content_id: parsed.data.content_id,
      body: parsed.data.body,
      status: 'pending',
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: 'Failed to create reflection' }, { status: 500 })
  }

  return NextResponse.json({ reflection: data }, { status: 201 })
}
