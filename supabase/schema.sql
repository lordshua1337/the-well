-- The Well V3 Database Schema

-- ============================================
-- USERS
-- ============================================
create table if not exists user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  is_admin boolean default false,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table user_profiles enable row level security;
create policy "Users can read own profile" on user_profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on user_profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on user_profiles for insert with check (auth.uid() = id);

create or replace function handle_new_user()
returns trigger as $$
begin
  insert into user_profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email));
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ============================================
-- READING PROGRESS
-- ============================================
create table if not exists reading_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  content_type text not null check (content_type in ('concept', 'word', 'passage', 'dossier', 'practice', 'path_stage', 'jesus_chapter')),
  content_id text not null,
  completed boolean default false,
  last_read_at timestamptz default now(),
  created_at timestamptz default now() not null,
  unique(user_id, content_type, content_id)
);

alter table reading_progress enable row level security;
create policy "Users can manage own progress" on reading_progress for all using (auth.uid() = user_id);
create index idx_progress_user on reading_progress(user_id);
create index idx_progress_type on reading_progress(content_type, content_id);

-- ============================================
-- DAILY STREAK
-- ============================================
create table if not exists daily_streaks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  streak_date date not null default current_date,
  created_at timestamptz default now() not null,
  unique(user_id, streak_date)
);

alter table daily_streaks enable row level security;
create policy "Users can manage own streaks" on daily_streaks for all using (auth.uid() = user_id);
create index idx_streaks_user_date on daily_streaks(user_id, streak_date desc);

-- ============================================
-- BOOKMARKS
-- ============================================
create table if not exists bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  content_type text not null check (content_type in ('concept', 'word', 'passage', 'dossier', 'practice')),
  content_id text not null,
  created_at timestamptz default now() not null,
  unique(user_id, content_type, content_id)
);

alter table bookmarks enable row level security;
create policy "Users can manage own bookmarks" on bookmarks for all using (auth.uid() = user_id);
create index idx_bookmarks_user on bookmarks(user_id);

-- ============================================
-- PATH PROGRESS
-- ============================================
create table if not exists path_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  stage_id text not null,
  step_id text not null,
  completed boolean default false,
  completed_at timestamptz,
  created_at timestamptz default now() not null,
  unique(user_id, stage_id, step_id)
);

alter table path_progress enable row level security;
create policy "Users can manage own path progress" on path_progress for all using (auth.uid() = user_id);
create index idx_path_user on path_progress(user_id);

-- ============================================
-- PRACTICE LOG
-- ============================================
create table if not exists practice_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  practice_id text not null,
  journal_entry text,
  duration_minutes integer,
  completed_at timestamptz default now() not null,
  created_at timestamptz default now() not null
);

alter table practice_log enable row level security;
create policy "Users can manage own practice log" on practice_log for all using (auth.uid() = user_id);
create index idx_practice_user on practice_log(user_id);

-- ============================================
-- LIVING WORDS HISTORY
-- ============================================
create table if not exists living_words_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  day_number integer not null,
  morning_response text,
  evening_response text,
  completed_at timestamptz default now() not null,
  unique(user_id, day_number)
);

alter table living_words_history enable row level security;
create policy "Users can manage own living words" on living_words_history for all using (auth.uid() = user_id);

-- ============================================
-- COMMUNITY REFLECTIONS
-- ============================================
create table if not exists community_reflections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  content_type text not null check (content_type in ('concept', 'passage', 'dossier', 'word')),
  content_id text not null,
  reflection_text text not null check (char_length(reflection_text) <= 280),
  display_name text default 'Anonymous',
  status text default 'pending' check (status in ('pending', 'approved', 'rejected', 'flagged')),
  flag_count integer default 0,
  moderation_note text,
  created_at timestamptz default now() not null
);

alter table community_reflections enable row level security;
create policy "Users can insert own reflections" on community_reflections for insert with check (auth.uid() = user_id);
create policy "Users can read approved reflections" on community_reflections for select using (status = 'approved' or auth.uid() = user_id);
create index idx_reflections_content on community_reflections(content_type, content_id);
create index idx_reflections_status on community_reflections(status);

-- ============================================
-- ANALYTICS EVENTS
-- ============================================
create table if not exists analytics_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  event_type text not null,
  content_type text,
  content_id text,
  metadata jsonb default '{}',
  created_at timestamptz default now() not null
);

alter table analytics_events enable row level security;
create policy "Insert analytics events" on analytics_events for insert with check (true);
create index idx_analytics_type on analytics_events(event_type);
create index idx_analytics_date on analytics_events(created_at);
create index idx_analytics_content on analytics_events(content_type, content_id);
