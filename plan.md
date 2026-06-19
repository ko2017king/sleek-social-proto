# Implementation Plan - SocialHub Platform

Create a modern, mobile-first social media platform "SocialHub" using React, Tailwind CSS, and Framer Motion. The app will feature a TikTok-style video feed, Instagram-style stories and posts, and Facebook-style messaging, all persisted via `localStorage`.

## Scope Summary
- **Mobile-first SPA**: Responsive design optimized for mobile but functional on desktop.
- **Core Features**: Auth (mock), Home Feed (Images/Videos), Reels (Vertical Video), Stories, Search, Notifications, Messaging, and User Profiles.
- **Persistence**: All data (posts, likes, messages) will be stored in `localStorage`.
- **UI/UX**: Glassmorphism, dark mode, smooth transitions (Framer Motion), and 2026-style gradients.

## Non-Goals
- Real backend/database integration (using `localStorage` as requested).
- Real video uploading to a server (mocking file handling).
- Real-time WebSockets (simulated messaging).

## Assumptions
- The user wants a React-based implementation given the existing project structure (`App.tsx`, `main.tsx`).
- "Modern 2026 UI" implies heavy use of Lucide icons, rounded corners, and subtle blur effects.

## Affected Areas
- `src/App.tsx`: Main routing and layout wrapper.
- `src/components/*`: Reusable UI components (Feed, Reel, Story, Navbar, etc.).
- `src/hooks/*`: Custom hooks for `localStorage` state management.
- `src/context/*`: Context providers for Auth and Theme.
- `src/lib/mockData.ts`: Initial seed data for the platform.

## Ordered Phases

### Phase 1: Foundation & Data Layer
- Define mock data structures for users, posts, stories, and messages.
- Create a `useLocalStorage` hook to manage persistent state.
- Set up a `GlobalContext` to manage the shared state across the app.
- **Owner**: `frontend_engineer`

### Phase 2: Authentication & Layout
- Implement Mock Login/Signup/Forgot Password pages.
- Create the main layout with a bottom navigation bar (mobile) or sidebar (desktop).
- Implement Dark/Light mode toggle.
- **Owner**: `frontend_engineer`

### Phase 3: Stories & Home Feed
- Build the Story carousel with fullscreen viewing and progress bars.
- Build the Home feed with support for image and auto-playing video posts.
- Implement Like, Comment, and Share functionality.
- **Owner**: `frontend_engineer`

### Phase 4: Reels & Search
- Create the "Reels" section with vertical swipe navigation (TikTok-style).
- Implement the Search page with trending tags and user discovery.
- **Owner**: `frontend_engineer`

### Phase 5: Messaging & Notifications
- Build the Chat list and Direct Message interface.
- Implement the Notifications tab for likes, follows, and mentions.
- **Owner**: `frontend_engineer`

### Phase 6: Profile & Settings
- Create the Profile page with grid/list views and edit functionality.
- Implement the Settings page for privacy and account adjustments.
- Final UI polish with animations and glassmorphism.
- **Owner**: `frontend_engineer`

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Build the entire SPA foundation, data persistence, and UI modules.

**Per-agent instructions:**
### 1. frontend_engineer
- **Phases:** 1-6
- **Scope:** Create a complete SocialHub application within the existing React structure.
- **Files:**
  - Create `src/lib/mock-data.ts` for initial content.
  - Create `src/hooks/use-social-storage.ts` for localStorage logic.
  - Create `src/components/layout/` for Nav and Shell.
  - Create `src/pages/` for Home, Reels, Search, Inbox, Profile, Auth.
  - Update `src/App.tsx` for routing logic (use a simple state-based router or `react-router-dom` if preferred).
- **Depends on:** none
- **Acceptance criteria:**
  - App starts without errors.
  - All core features (Feed, Reels, Stories, Messaging) are functional using mock data.
  - Data persists on page refresh via `localStorage`.
  - UI matches "2026" glassmorphism aesthetic and is mobile-responsive.
