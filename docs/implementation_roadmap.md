# CivicMind AI - Hackathon Implementation Roadmap

## 1. Development Strategy
To build a hackathon-winning MVP within 4-5 days as a solo developer, the strategy focuses on **Vibe Coding & Velocity**.
- **Leverage pre-built UI components:** Use Shadcn UI extensively so minimal time is spent on CSS.
- **Focus on the "Wow Factor":** Prioritize the Gemini AI integration and the interactive Leaflet Map.
- **Mock when necessary:** If external data sources are too complex to integrate in 4 days, use robust seed data to simulate scale.
- **Deploy Early:** Get the Vercel deployment running on Day 1 to avoid last-minute CI/CD panics.

## 2. Architecture Implementation Order
1. **Scaffold:** Next.js + Tailwind + Shadcn UI.
2. **Backend/Auth:** Supabase Auth and Table Schemas.
3. **Core API:** Next.js Route Handlers for Supabase and Gemini AI.
4. **Core UI Flow:** Report Issue → AI Analysis → Dashboard Feed.
5. **Interactive Layer:** Leaflet Map and Voting System.
6. **Polish:** Framer Motion animations and Gamification UI.

## 3. Folder Structure Plan
```
web/
├── app/                  # Next.js App Router (Pages & API)
│   ├── api/              # AI and Supabase API Routes
│   ├── report/           # AI Reporting Flow
│   ├── map/              # Leaflet Map Page
│   ├── dashboard/        # Analytics and Gamification
│   ├── profile/          # User Profiles
│   ├── feed/             # Community Feed
│   └── page.tsx          # Landing Page
├── components/           # Reusable UI (Shadcn + Custom)
├── features/             # Feature-specific logic & components
├── services/             # API clients (Gemini, Supabase)
├── hooks/                # Custom React Hooks
├── types/                # TypeScript Interfaces
└── utils/                # Helpers (Formatting, Geolocation)
```

## 4. Day-by-Day Execution Plan
- **Day 1: The Foundation.** Setup Next.js, Supabase, Auth, and Database Schema. Deploy to Vercel.
- **Day 2: The Core Intelligence.** Build the AI Image Upload & Report Generation flow using Gemini.
- **Day 3: Community & Map.** Build the Community Feed and integrate React Leaflet.
- **Day 4: Verification & Dashboard.** Implement the Upvote/Verification system and the Analytics Dashboard.
- **Day 5: Polish & Demo.** UI/UX polish, bug fixes, demo video recording, and submission prep.

---

## 5. Phase Breakdown

### Phase 1: Foundation Setup
- **Objective:** Establish the repository, stack, and deployment pipeline.
- **Deliverables:** Next.js app running locally and on Vercel. Installed dependencies (Tailwind, Shadcn).
- **Files Created:** `app/layout.tsx`, `components/ui/*`, `tailwind.config.js`.
- **Dependencies:** None.
- **Estimated Time:** 3 hours.
- **Success Criteria:** A "Hello World" site is live on a Vercel URL.

### Phase 2: Database and Authentication
- **Objective:** Configure Supabase and secure user sign-ups.
- **Deliverables:** Executed SQL Schema, RLS policies, Auth screens.
- **Files Created:** `supabase/schema.sql`, `app/login/page.tsx`, `services/supabase.ts`.
- **Dependencies:** Phase 1.
- **Estimated Time:** 4 hours.
- **Success Criteria:** A user can create an account, log in, and a row appears in `auth.users` and `public.users`.

### Phase 3: AI Issue Reporting (The Core Feature)
- **Objective:** Allow users to upload photos and get AI-generated issue data.
- **Deliverables:** Camera/Upload UI, Gemini API route, Form auto-fill, Database insertion.
- **Files Created:** `app/report/page.tsx`, `app/api/analyze/route.ts`, `services/gemini.ts`.
- **Dependencies:** Phase 2.
- **Estimated Time:** 6 hours.
- **Success Criteria:** User uploads an image of a pothole, form populates with category and severity, and saves to the database.

### Phase 4: Community Feed
- **Objective:** Display all reported issues in a timeline.
- **Deliverables:** Scrollable feed fetching live data from Supabase.
- **Files Created:** `app/feed/page.tsx`, `components/IssueCard.tsx`.
- **Dependencies:** Phase 3 (needs issue data to display).
- **Estimated Time:** 3 hours.
- **Success Criteria:** Feed correctly displays user-submitted reports chronologically.

### Phase 5: Map Integration
- **Objective:** Visualize issues geospatially.
- **Deliverables:** React Leaflet map with dynamic markers based on severity/category.
- **Files Created:** `app/map/page.tsx`, `components/DynamicMap.tsx`.
- **Dependencies:** Phase 3 (needs coordinate data).
- **Estimated Time:** 5 hours.
- **Success Criteria:** Map renders without SSR errors and shows pins for all reported issues.

### Phase 6: Verification System
- **Objective:** Implement the crowdsourced truth layer.
- **Deliverables:** Upvote/downvote buttons on issue cards and detail pages.
- **Files Created:** `app/issue/[id]/page.tsx`, `app/api/verify/route.ts`.
- **Dependencies:** Phase 4.
- **Estimated Time:** 3 hours.
- **Success Criteria:** User can upvote an issue, count increases in real-time, user cannot double-vote.

### Phase 7: Analytics Dashboard
- **Objective:** Provide a bird's-eye view of civic health.
- **Deliverables:** Charts and summary stats for categories, total reports, and verifications.
- **Files Created:** `app/dashboard/page.tsx`, `components/StatCard.tsx`.
- **Dependencies:** Phase 3, 6.
- **Estimated Time:** 3 hours.
- **Success Criteria:** Dashboard accurately aggregates and displays database metrics.

### Phase 8: UI Polish
- **Objective:** Ensure the app looks premium and startup-ready.
- **Deliverables:** Framer motion transitions, consistent theming, loading skeletons, error toasts.
- **Files Created:** `components/ui/skeleton.tsx`, `components/ui/toast.tsx`.
- **Dependencies:** Phases 1-7.
- **Estimated Time:** 4 hours.
- **Success Criteria:** App feels seamless, snappy, and aesthetically "wows" users.

### Phase 9: Deployment
- **Objective:** Finalize production environment.
- **Deliverables:** Configured environment variables on Vercel, optimized builds.
- **Files Created:** Vercel Dashboard Configurations.
- **Dependencies:** Phases 1-8.
- **Estimated Time:** 2 hours.
- **Success Criteria:** Production URL operates identically to the local environment with no console errors.

### Phase 10: Submission
- **Objective:** Prepare hackathon deliverables.
- **Deliverables:** Pitch deck, demo video, README.md update.
- **Files Created:** `README.md`, Demo Video (`.mp4`), Presentation (`.pdf`).
- **Dependencies:** Phase 9.
- **Estimated Time:** 4 hours.
- **Success Criteria:** Project is submitted to the hackathon platform before the deadline.

---

## 6. Task Dependencies
- **Supabase schema** blocks all frontend data fetching.
- **Gemini integration** blocks the Issue Reporting flow.
- **Issue Reporting flow** blocks the Map and Feed (need data to display).
- **UI Polish** should only happen after core functionality works to avoid scope creep.

## 7. AI Integration Plan
- Use `@google/genai` SDK.
- Configure a specific system prompt requiring structured JSON output.
- Pass the base64 encoded image directly from the client to the Next.js server route to keep the API key secure.
- Use a `try/catch` block to handle AI hallucinations or failed JSON parsing.

## 8. Supabase Integration Plan
- Use `@supabase/supabase-js`.
- Use the provided SQL script to instantiate the schema immediately.
- Enable RLS and verify policies by testing with a dummy user account.

## 9. UI/UX Implementation Plan
- **Theme:** Clean, modern, light/dark mode support.
- **Typography:** Inter or Outfit for a civic-tech modern feel.
- **Components:** Shadcn for Forms, Buttons, Dialogs, Cards.
- **Animations:** Framer motion for page transitions and upvote micro-interactions.

## 10. Deployment Plan
- Continuous deployment via GitHub to Vercel.
- Environment Variables required on Vercel: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `GEMINI_API_KEY`.

## 11. Testing Plan
- Create 3 dummy user accounts.
- Generate 10 test issues with varying severities and locations.
- Verify RLS: Ensure User A cannot delete User B's issues.
- Map Testing: Ensure panning and zooming performance holds up with 50+ markers.

## 12. Demo Preparation Plan
- Write a 2-minute script highlighting the core problem and the AI solution.
- Record a screen-capture walkthrough showing: Login → Snap Photo → AI Auto-fill → Map Visualization.
- Ensure the live app is populated with compelling seed data (don't demo an empty map).

## 13. Submission Preparation Plan
- Update `README.md` with: Tagline, Architecture Diagram, Tech Stack, and instructions to run locally.
- Write the Devpost/Hackathon platform description answering: "What it does", "How we built it", "Challenges we ran into".

## 14. GitHub Milestones
1. Scaffold & Auth (Day 1)
2. AI Engine & Data Model (Day 2)
3. Geospatial & Community Views (Day 3)
4. Gamification & Analytics (Day 4)
5. Production Readiness (Day 5)

## 15. Risk Mitigation Plan
- **Risk:** Leaflet SSR issues in Next.js.
  - **Mitigation:** Dynamically import the map component with `ssr: false`.
- **Risk:** AI takes too long to respond.
  - **Mitigation:** Show a captivating loading animation (e.g., "Gemini is analyzing the image...").
- **Risk:** Time constraints on Gamification.
  - **Mitigation:** Drop complex badges if needed; stick to a simple `reputation_points` counter.
