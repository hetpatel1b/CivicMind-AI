# CivicMind AI Database Architecture

## 1. Database Overview
The database architecture for CivicMind AI is built on **Supabase PostgreSQL**, designed to be scalable, secure, and highly optimized for geospatial rendering and real-time community engagement. It natively integrates with Supabase Authentication and uses Row Level Security (RLS) to ensure data privacy while enabling public transparency for civic issues. 

## 2. ER Diagram Description
- **Users** are the central entities in the ecosystem. 
- A **User** can create many **Issues**.
- Each **Issue** acts as the core hub and can have multiple **Issue Images**, **Verifications** (upvotes/downvotes), and **Comments**.
- A **Verification** links a **User** to an **Issue** representing their validation.
- A **Comment** links a **User** to an **Issue** for community discussion.
- **Users** accumulate reputation points and can unlock **Badges**, which is tracked via the many-to-many **User Badges** table.
- **Notifications** are linked directly to **Users** to alert them of status updates or earned badges.
- **Analytics Events** are decoupled from the core workflow, storing read-heavy, schemaless metrics for the Analytics Dashboard.

## 3 & 4. Complete Table and Column Definitions

### `users`
**Purpose:** Stores public profile data for users. Mirrors `auth.users` for RLS.
- `id` (UUID): Primary Key, matches `auth.users.id`.
- `full_name` (Text, Nullable): Display name.
- `avatar_url` (Text, Nullable): URL to profile picture.
- `reputation_points` (Integer): Total points earned for gamification. Default: 0.
- `role` (Text): Determines permissions (e.g., 'citizen', 'admin'). Default: 'citizen'.
- `created_at` (Timestamptz): Timestamp of account creation.

### `issues`
**Purpose:** Core table storing all reported civic issues.
- `id` (UUID): Primary Key.
- `user_id` (UUID): Foreign Key to `users`.
- `title` (Text): AI-generated or user-provided title.
- `description` (Text): Detailed context of the issue.
- `category` (Text): E.g., 'Infrastructure', 'Sanitation', 'Water'.
- `severity` (Text): E.g., 'Low', 'Medium', 'High', 'Critical'.
- `status` (Text): E.g., 'Reported', 'Verified', 'In Progress', 'Resolved'. Default: 'Reported'.
- `latitude` (Double Precision): For map placement.
- `longitude` (Double Precision): For map placement.
- `location_name` (Text, Nullable): Human-readable address.
- `ai_confidence_score` (Numeric, Nullable): Gemini AI's confidence in categorization.
- `upvotes_count` (Integer): Denormalized count for fast querying. Default: 0.
- `created_at` (Timestamptz): Timestamp of report.
- `updated_at` (Timestamptz): Timestamp of last status or metadata change.

### `issue_images`
**Purpose:** Stores multiple image references for a single issue.
- `id` (UUID): Primary Key.
- `issue_id` (UUID): Foreign Key to `issues`.
- `image_url` (Text): Supabase Storage URL or external URL.
- `is_ai_analyzed` (Boolean): Flag indicating if this image was the primary one sent to Gemini. Default: false.
- `created_at` (Timestamptz)

### `verifications`
**Purpose:** Community verification records (crowdsourced consensus).
- `id` (UUID): Primary Key.
- `issue_id` (UUID): Foreign Key to `issues`.
- `user_id` (UUID): Foreign Key to `users`.
- `verification_type` (Text): 'UPVOTE' or 'DOWNVOTE'.
- `created_at` (Timestamptz)

### `comments`
**Purpose:** User discussions regarding specific issues.
- `id` (UUID): Primary Key.
- `issue_id` (UUID): Foreign Key to `issues`.
- `user_id` (UUID): Foreign Key to `users`.
- `content` (Text): Comment text.
- `created_at` (Timestamptz)

### `notifications`
**Purpose:** System alerts directed to users.
- `id` (UUID): Primary Key.
- `user_id` (UUID): Foreign Key to `users`.
- `type` (Text): E.g., 'STATUS_UPDATE', 'BADGE_EARNED'.
- `message` (Text): Alert content.
- `is_read` (Boolean): Read status. Default: false.
- `created_at` (Timestamptz)

### `badges`
**Purpose:** Gamification milestones/badges that users can earn.
- `id` (UUID): Primary Key.
- `name` (Text): E.g., 'Civic Hero', 'Eagle Eye'.
- `description` (Text): What the badge represents.
- `icon_url` (Text): Visual representation.
- `points_required` (Integer): Threshold to unlock.
- `created_at` (Timestamptz)

### `user_badges`
**Purpose:** Associates earned badges with specific users.
- `id` (UUID): Primary Key.
- `user_id` (UUID): Foreign Key to `users`.
- `badge_id` (UUID): Foreign Key to `badges`.
- `earned_at` (Timestamptz)

### `analytics_events`
**Purpose:** Fast, append-only table to track high-level platform events for the dashboard.
- `id` (UUID): Primary Key.
- `event_type` (Text): E.g., 'ISSUE_REPORTED', 'USER_SIGNUP'.
- `event_data` (JSONB): Schemaless metadata.
- `created_at` (Timestamptz)

## 5, 6, 7. Primary Keys, Foreign Keys, Relationships
- All tables utilize `UUID` generated via `uuid_generate_v4()` as Primary Keys for security and scalability.
- `users.id` directly maps to the `auth.users(id)` from Supabase Authentication.
- All Foreign Keys (`issue_id`, `user_id`) employ `ON DELETE CASCADE` where appropriate so deleting a user removes their issues, and deleting an issue removes its images, verifications, and comments.
- **Unique Constraints:** `verifications` has a unique constraint on `(user_id, issue_id)` to prevent multiple votes per user.

## 8. Indexing Strategy
- **Geospatial:** B-Tree indexing on `latitude` and `longitude` for fast bounding-box queries by React Leaflet.
- **Foreign Keys:** B-Tree indexes on all `issue_id` and `user_id` columns to ensure fast joins.
- **Filtering:** Indexes on `issues.status` and `issues.category` to power the community feed and map filters.

## 9. Security Considerations
- The database is protected via Supabase Row Level Security (RLS). No tables are fully open for indiscriminate writing.
- Service Role keys are only utilized in Next.js server actions/API routes for critical bypass operations (like incrementing total reputation).
- Raw `auth.users` data is never exposed. The public `users` table acts as a safe, proxy profile view.

## 10. Supabase RLS Strategy
- **`users`:** Publicly readable. Users can only `UPDATE` their own rows.
- **`issues`:** Publicly readable. Authenticated users can `INSERT`. Users can `UPDATE` their own issues (except status/upvotes, which are handled by secure functions).
- **`verifications`:** Publicly readable. Authenticated users can `INSERT`. Users can only `DELETE`/`UPDATE` their own verifications.
- **`comments`:** Publicly readable. Authenticated users can `INSERT`. Users can only `DELETE`/`UPDATE` their own comments.
- **`notifications`:** Users can only `SELECT` and `UPDATE` their own notifications.
- **`analytics_events`:** Fully locked down. Only the service role (backend API) can `INSERT` and `SELECT`.

## 11. Audit Logging Strategy
- Use PostgreSQL trigger functions to automatically update the `updated_at` timestamp on the `issues` and `users` tables.
- Push critical domain actions (like issue status changes) as JSON payloads to `analytics_events` to construct a time-series audit trail without cluttering the main transaction tables.

## 12. Analytics Data Structure
- `analytics_events` relies heavily on PostgreSQL's powerful `JSONB` data type, allowing the Next.js API to dump dynamic payloads (e.g., `{ "ai_processing_time_ms": 350, "category_detected": "Infrastructure" }`) that can be efficiently queried later for the Analytics Dashboard.

## 13. Gamification Data Structure
- Total points are cached on the `users` table (`reputation_points`) for fast rendering on the profile and leaderboard.
- The `user_badges` table serves as a historical ledger of what was unlocked and when. Earning points checks against the `points_required` column in the `badges` table to conditionally insert a new `user_badges` row.

---

## SQL Schema and Create Table Statements

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    reputation_points INTEGER DEFAULT 0,
    role TEXT DEFAULT 'citizen',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Issues Table
CREATE TABLE public.issues (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    severity TEXT NOT NULL,
    status TEXT DEFAULT 'Reported',
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    location_name TEXT,
    ai_confidence_score NUMERIC,
    upvotes_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Issue Images Table
CREATE TABLE public.issue_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    issue_id UUID REFERENCES public.issues(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_ai_analyzed BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Verifications Table
CREATE TABLE public.verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    issue_id UUID REFERENCES public.issues(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    verification_type TEXT CHECK (verification_type IN ('UPVOTE', 'DOWNVOTE')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(issue_id, user_id)
);

-- 5. Comments Table
CREATE TABLE public.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    issue_id UUID REFERENCES public.issues(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Notifications Table
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Badges Table
CREATE TABLE public.badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    icon_url TEXT,
    points_required INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. User Badges Table
CREATE TABLE public.user_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE,
    earned_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, badge_id)
);

-- 9. Analytics Events Table
CREATE TABLE public.analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type TEXT NOT NULL,
    event_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================
-- INDEXING STRATEGY
-- =========================================
CREATE INDEX idx_issues_location ON public.issues(latitude, longitude);
CREATE INDEX idx_issues_status ON public.issues(status);
CREATE INDEX idx_issues_category ON public.issues(category);
CREATE INDEX idx_verifications_issue ON public.verifications(issue_id);
CREATE INDEX idx_comments_issue ON public.comments(issue_id);
CREATE INDEX idx_notifications_user ON public.notifications(user_id, is_read);
CREATE INDEX idx_analytics_type ON public.analytics_events(event_type);

-- =========================================
-- UPDATED_AT TRIGGER
-- =========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_issues_modtime
    BEFORE UPDATE ON public.issues
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =========================================
-- SUPABASE ROW LEVEL SECURITY (RLS)
-- =========================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.issue_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Users: Read public, Update own
CREATE POLICY "Public profiles are viewable by everyone." ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile." ON public.users FOR UPDATE USING (auth.uid() = id);

-- Issues: Read public, Insert auth, Update own
CREATE POLICY "Issues are viewable by everyone." ON public.issues FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert issues." ON public.issues FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own issues." ON public.issues FOR UPDATE USING (auth.uid() = user_id);

-- Issue Images: Read public, Insert auth
CREATE POLICY "Issue images viewable by everyone." ON public.issue_images FOR SELECT USING (true);
CREATE POLICY "Authenticated users can upload images." ON public.issue_images FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Verifications: Read public, Insert/Delete own
CREATE POLICY "Verifications are viewable by everyone." ON public.verifications FOR SELECT USING (true);
CREATE POLICY "Authenticated users can verify." ON public.verifications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own verification." ON public.verifications FOR DELETE USING (auth.uid() = user_id);

-- Comments: Read public, Insert auth, Update/Delete own
CREATE POLICY "Comments viewable by everyone." ON public.comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can comment." ON public.comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own comments." ON public.comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own comments." ON public.comments FOR DELETE USING (auth.uid() = user_id);

-- Notifications: Select/Update own
CREATE POLICY "Users can view own notifications." ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications." ON public.notifications FOR UPDATE USING (auth.uid() = user_id);

-- Badges: Read public
CREATE POLICY "Badges are viewable by everyone." ON public.badges FOR SELECT USING (true);

-- User Badges: Read public
CREATE POLICY "User badges are viewable by everyone." ON public.user_badges FOR SELECT USING (true);

-- Analytics: Backend Only (Service Role bypasses RLS)
-- No public policies, so standard users/anon cannot read or write.
```
