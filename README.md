<div align="center">

<a href="https://civicmind-ai.com">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=6366f1&height=300&section=header&text=CivicMind%20AI&fontSize=90&fontAlignY=35&desc=AI-Powered%20Civic%20Intelligence&descAlignY=55&descSize=25" />
</a>

<br />

[![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Inter&weight=600&size=24&pause=1000&color=818CF8&center=true&vCenter=true&width=800&lines=Empowering+Citizens.+Transforming+Cities.;Report+hyperlocal+issues+with+AI.;Crowdsource+civic+action+instantly.)](https://git.io/typing-svg)

---

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-DB-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Gemini](https://img.shields.io/badge/Google_Gemini-2.5_Flash-F4B400?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Hackathon](https://img.shields.io/badge/Hackathon-VibeToShip_2026-6366f1?style=for-the-badge)](#)

[**Live Demo**](#) • [**Report a Bug**](#) • [**Request Feature**](#)

</div>

---

<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" />
</div>

## 🚨 The Problem
Local communities consistently face infrastructural and environmental issues—like open potholes, uncollected garbage, and water leaks. Traditional reporting mechanisms are tedious, lack transparency, and often go unnoticed by authorities. Citizens lack a unified, frictionless platform to report issues, verify them through community consensus, and track their resolution status in real-time.

## 💡 The Solution
**CivicMind AI** transforms civic engagement by making problem reporting as simple as taking a photo. Leveraging **Google Gemini 2.5 Flash**, the platform automatically analyzes images, categorizes the issue, determines its severity, and plots it on a live community map. By introducing crowdsourced verification and gamification, CivicMind AI bridges the gap between citizens and municipal action.

<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" />
</div>

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| 📸 **AI Issue Reporting** | Upload a photo, and Gemini AI automatically extracts the title, category, and severity. |
| 🌐 **Community Feed** | A real-time, scrollable timeline of recently reported hyperlocal issues. |
| 🗺️ **Interactive Map** | Geospatial visualization of civic problems powered by React Leaflet and OpenStreetMap. |
| ✅ **Verification System** | Crowdsourced upvoting mechanism to validate genuine issues and flag spam. |
| 📊 **Analytics Dashboard** | City-wide health metrics, most common issues, and resolution tracking for Admins. |
| 🏆 **Gamification** | Earn reputation points and unique badges for reporting and verifying community issues. |

<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" />
</div>

## 🧠 AI Workflow Architecture

```mermaid
graph LR
    A[📸 Image Upload] --> B[Supabase Storage]
    B -->|Public URL| C[Next.js API]
    C -->|Vision Prompt| D((🤖 Google Gemini 2.5))
    D -->|JSON Extraction| E{Confidence Check}
    E -->|High 🟢| F[Auto-fill UI Form]
    E -->|Low 🔴| G[Manual Fallback]
    F --> H[PostgreSQL Database]
    H --> I[Live Community Map 🗺️]
```

<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" />
</div>

## 🗄️ Database Design
A robust, relational schema built on **Supabase PostgreSQL** with strict Row Level Security (RLS).
- **`Users`**: Profiles, avatars, role-based access, and reputation points.
- **`Issues`**: The core entity storing category, severity, and geospatial coordinates.
- **`Verifications`**: Tracks user upvotes to calculate an issue's trust score dynamically.
- **`Badges`**: Gamification milestones tied to users.

<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" />
</div>

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hetpatel1b/CivicMind-AI.git
   cd CivicMind-AI/web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the `web/` directory and populate the keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   *The app will be running at `http://localhost:3000`.*

<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" />
</div>

## 🔭 Future Scope
- **Predictive Civic Intelligence:** AI-driven heatmaps predicting future infrastructure failures based on historic data.
- **Direct Municipal Integration:** Automated email dispatch to local authorities via webhook when an issue reaches critical mass.
- **Multilingual Support:** Auto-translating reports using AI to support diverse communities.

<div align="center">
  <img src="https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png" width="100%" />
</div>

## 👨‍💻 Team
- **HET PRASHANT PATEL** - *Solo Developer / Full Stack Engineer* - [GitHub](https://github.com/hetpatel1b)

## 🙏 Acknowledgements
- **VibeToShip 2026** - For the "Community Hero" problem statement.
- **Google AI Studio** - For powering the core intelligence.
- **Supabase** - For the rapid backend infrastructure.
- **Shadcn** - For the accessible UI components.

---
<div align="center">
  <sub>Built with ❤️ for a better tomorrow.</sub>
</div>
