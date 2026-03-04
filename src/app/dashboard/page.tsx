'use client'

import { useEffect, useState } from 'react'
import { createSupabaseBrowser } from '@/lib/auth/client'
import { flushSyncQueue, pullServerState, recordStreak } from '@/lib/sync/manager'
import Link from 'next/link'

interface UserState {
  reading_progress: Array<{ content_type: string; content_id: string; completed: boolean }>
  bookmarks: Array<{ content_type: string; content_id: string }>
  streak: { current_streak: number; longest_streak: number; last_active_date: string } | null
  path_progress: Array<{ path_id: string; current_stage: number }>
}

export default function DashboardPage() {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [state, setState] = useState<UserState | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      const supabase = createSupabaseBrowser()
      const { data: { user: authUser } } = await supabase.auth.getUser()
      setUser(authUser)

      recordStreak()
      await flushSyncQueue()
      const serverState = await pullServerState()
      if (serverState) {
        setState(serverState as unknown as UserState)
      }
      setLoading(false)
    }
    init()
  }, [])

  const completedCount = state?.reading_progress?.filter((p) => p.completed).length ?? 0
  const bookmarkCount = state?.bookmarks?.length ?? 0
  const currentStreak = state?.streak?.current_streak ?? 0
  const longestStreak = state?.streak?.longest_streak ?? 0

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#2D6A4F]">Your Journey</h1>
            <p className="text-sm text-[#5C6B5E]">{user?.email ?? 'Loading...'}</p>
          </div>
          <Link href="/" className="text-sm text-[#8B7D6B] hover:text-[#2D6A4F] transition-colors">
            Back to The Well
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-[#8B7D6B]">Loading your progress...</div>
        ) : (
          <>
            {/* Streak */}
            <div className="bg-white border border-[#D4C5A9] rounded-xl p-6 mb-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[#F4A261] rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D3B2E]">{currentStreak} day streak</p>
                  <p className="text-xs text-[#8B7D6B]">Longest: {longestStreak} days</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white border border-[#D4C5A9] rounded-xl p-5 shadow-sm">
                <p className="text-3xl font-bold text-[#2D6A4F]">{completedCount}</p>
                <p className="text-sm text-[#5C6B5E]">Items completed</p>
              </div>
              <div className="bg-white border border-[#D4C5A9] rounded-xl p-5 shadow-sm">
                <p className="text-3xl font-bold text-[#2D6A4F]">{bookmarkCount}</p>
                <p className="text-sm text-[#5C6B5E]">Bookmarked</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white border border-[#D4C5A9] rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-lg font-semibold text-[#2D3B2E] mb-4">Continue Reading</h2>
              <div className="space-y-3">
                <Link href="/concepts" className="block px-4 py-3 bg-[#FAFAF5] border border-[#D4C5A9] rounded-lg hover:bg-[#F0EBE0] transition-colors">
                  <p className="font-medium text-[#2D3B2E]">Concepts</p>
                  <p className="text-xs text-[#8B7D6B]">Explore theological concepts</p>
                </Link>
                <Link href="/words" className="block px-4 py-3 bg-[#FAFAF5] border border-[#D4C5A9] rounded-lg hover:bg-[#F0EBE0] transition-colors">
                  <p className="font-medium text-[#2D3B2E]">Living Words</p>
                  <p className="text-xs text-[#8B7D6B]">Key biblical terms unpacked</p>
                </Link>
                <Link href="/passages" className="block px-4 py-3 bg-[#FAFAF5] border border-[#D4C5A9] rounded-lg hover:bg-[#F0EBE0] transition-colors">
                  <p className="font-medium text-[#2D3B2E]">Passages</p>
                  <p className="text-xs text-[#8B7D6B]">Deep dives into scripture</p>
                </Link>
              </div>
            </div>

            {/* Bookmarks */}
            {bookmarkCount > 0 && (
              <div className="bg-white border border-[#D4C5A9] rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-[#2D3B2E] mb-4">Your Bookmarks</h2>
                <div className="space-y-2">
                  {state?.bookmarks?.slice(0, 10).map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-[#5C6B5E]">
                      <svg className="w-4 h-4 text-[#F4A261]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                      </svg>
                      <span className="capitalize">{b.content_type}</span>: {b.content_id}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
