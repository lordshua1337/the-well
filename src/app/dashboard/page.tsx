'use client'

import { useEffect, useState } from 'react'
import { createSupabaseBrowser } from '@/lib/auth/client'
import { flushSyncQueue, pullServerState, recordStreak } from '@/lib/sync/manager'
import { loadStudyPlanProgress, getPlanProgress, type StudyPlanProgressState } from '@/lib/study-plan-progress'
import { studyPlans } from '@/lib/study-plans-data'
import Link from 'next/link'
import {
  BookOpen,
  Flame,
  Bookmark,
  CheckCircle,
  ArrowRight,
  Clock,
  Languages,
  User,
  Puzzle,
  Heart,
  Network,
} from 'lucide-react'

const PLAN_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Languages,
  BookOpen,
  User,
  Flame,
  Puzzle,
  Heart,
  Clock,
}

interface UserState {
  reading_progress: Array<{ content_type: string; content_id: string; completed: boolean }>
  bookmarks: Array<{ content_type: string; content_id: string }>
  streak: { current_streak: number; longest_streak: number; last_active_date: string } | null
  path_progress: Array<{ path_id: string; current_stage: number }>
}

export default function DashboardPage() {
  const [user, setUser] = useState<{ email?: string } | null>(null)
  const [state, setState] = useState<UserState | null>(null)
  const [planProgress, setPlanProgress] = useState<StudyPlanProgressState>({ plans: [] })
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

      setPlanProgress(loadStudyPlanProgress())
      setLoading(false)
    }
    init()
  }, [])

  const completedCount = state?.reading_progress?.filter((p) => p.completed).length ?? 0
  const bookmarkCount = state?.bookmarks?.length ?? 0
  const currentStreak = state?.streak?.current_streak ?? 0
  const longestStreak = state?.streak?.longest_streak ?? 0

  // Study plan stats
  const activePlans = studyPlans.filter((sp) => {
    const prog = getPlanProgress(planProgress, sp.id)
    return prog !== null && prog.completedDays.length < sp.totalDays
  })
  const completedPlans = studyPlans.filter((sp) => {
    const prog = getPlanProgress(planProgress, sp.id)
    return prog !== null && prog.completedDays.length >= sp.totalDays
  })
  const totalDaysCompleted = planProgress.plans.reduce((sum, p) => sum + p.completedDays.length, 0)

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <div className="max-w-3xl mx-auto px-4 py-8">
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
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2D3B2E]">{currentStreak} day streak</p>
                  <p className="text-xs text-[#8B7D6B]">Longest: {longestStreak} days</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white border border-[#D4C5A9] rounded-xl p-5 shadow-sm">
                <p className="text-3xl font-bold text-[#2D6A4F]">{completedCount}</p>
                <p className="text-sm text-[#5C6B5E]">Items completed</p>
              </div>
              <div className="bg-white border border-[#D4C5A9] rounded-xl p-5 shadow-sm">
                <p className="text-3xl font-bold text-[#2D6A4F]">{bookmarkCount}</p>
                <p className="text-sm text-[#5C6B5E]">Bookmarked</p>
              </div>
              <div className="bg-white border border-[#D4C5A9] rounded-xl p-5 shadow-sm">
                <p className="text-3xl font-bold text-[#2D6A4F]">{totalDaysCompleted}</p>
                <p className="text-sm text-[#5C6B5E]">Study days</p>
              </div>
            </div>

            {/* Study Plan Progress */}
            <div className="bg-white border border-[#D4C5A9] rounded-xl p-6 shadow-sm mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#2D3B2E] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#2D6A4F]" />
                  Study Plans
                </h2>
                <Link
                  href="/plans"
                  className="text-xs text-[#2D6A4F] hover:underline flex items-center gap-1"
                >
                  View All <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {activePlans.length === 0 && completedPlans.length === 0 ? (
                <div className="text-center py-6">
                  <BookOpen className="w-8 h-8 text-[#D4C5A9] mx-auto mb-2" />
                  <p className="text-sm text-[#8B7D6B] mb-3">
                    No study plans started yet.
                  </p>
                  <Link
                    href="/plans"
                    className="inline-flex items-center gap-1 text-sm font-medium text-[#2D6A4F] hover:underline"
                  >
                    Browse Study Plans <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Active Plans First */}
                  {activePlans.map((plan) => {
                    const prog = getPlanProgress(planProgress, plan.id)!
                    const pct = Math.round((prog.completedDays.length / plan.totalDays) * 100)
                    const Icon = PLAN_ICON_MAP[plan.icon] ?? BookOpen
                    return (
                      <Link
                        key={plan.id}
                        href={`/plans/${plan.slug}`}
                        className="flex items-center gap-3 p-3 rounded-lg bg-[#FAFAF5] border border-[#D4C5A9] hover:bg-[#F0EBE0] transition-colors"
                      >
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${plan.color}15`, color: plan.color }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-[#2D3B2E] truncate">{plan.title}</p>
                            <span className="text-[10px] font-mono text-[#2D6A4F] shrink-0 ml-2">
                              Day {prog.completedDays.length + 1}/{plan.totalDays}
                            </span>
                          </div>
                          <div className="h-1.5 bg-[#F5F0E8] rounded-full">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{ width: `${pct}%`, backgroundColor: plan.color }}
                            />
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                  {/* Completed Plans */}
                  {completedPlans.map((plan) => {
                    const Icon = PLAN_ICON_MAP[plan.icon] ?? BookOpen
                    return (
                      <Link
                        key={plan.id}
                        href={`/plans/${plan.slug}`}
                        className="flex items-center gap-3 p-3 rounded-lg bg-[#f0f9f4] border border-[#c6e7d6] hover:bg-[#e5f5ec] transition-colors"
                      >
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: `${plan.color}15`, color: plan.color }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#2D3B2E]">{plan.title}</p>
                          <p className="text-[10px] text-[#2D6A4F]">Completed</p>
                        </div>
                        <CheckCircle className="w-5 h-5 text-[#2D6A4F] shrink-0" />
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="bg-white border border-[#D4C5A9] rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-lg font-semibold text-[#2D3B2E] mb-4">Continue Exploring</h2>
              <div className="grid grid-cols-2 gap-3">
                <Link href="/concepts" className="block px-4 py-3 bg-[#FAFAF5] border border-[#D4C5A9] rounded-lg hover:bg-[#F0EBE0] transition-colors">
                  <p className="font-medium text-[#2D3B2E] text-sm">Concepts</p>
                  <p className="text-xs text-[#8B7D6B]">Theological deep dives</p>
                </Link>
                <Link href="/words" className="block px-4 py-3 bg-[#FAFAF5] border border-[#D4C5A9] rounded-lg hover:bg-[#F0EBE0] transition-colors">
                  <p className="font-medium text-[#2D3B2E] text-sm">Living Words</p>
                  <p className="text-xs text-[#8B7D6B]">Key biblical terms</p>
                </Link>
                <Link href="/passages" className="block px-4 py-3 bg-[#FAFAF5] border border-[#D4C5A9] rounded-lg hover:bg-[#F0EBE0] transition-colors">
                  <p className="font-medium text-[#2D3B2E] text-sm">Passages</p>
                  <p className="text-xs text-[#8B7D6B]">Scripture analysis</p>
                </Link>
                <Link href="/graph" className="block px-4 py-3 bg-[#FAFAF5] border border-[#D4C5A9] rounded-lg hover:bg-[#F0EBE0] transition-colors">
                  <div className="flex items-center gap-1.5">
                    <Network className="w-3.5 h-3.5 text-[#2D6A4F]" />
                    <p className="font-medium text-[#2D3B2E] text-sm">Knowledge Graph</p>
                  </div>
                  <p className="text-xs text-[#8B7D6B]">Visual connections</p>
                </Link>
              </div>
            </div>

            {/* Bookmarks */}
            {bookmarkCount > 0 && (
              <div className="bg-white border border-[#D4C5A9] rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-[#2D3B2E] mb-4 flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-[#F4A261]" />
                  Your Bookmarks
                </h2>
                <div className="space-y-2">
                  {state?.bookmarks?.slice(0, 10).map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-[#5C6B5E]">
                      <Bookmark className="w-4 h-4 text-[#F4A261]" />
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
