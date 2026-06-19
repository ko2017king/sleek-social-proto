import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SocialProvider, useSocial } from './context/SocialContext';
import { AppLayout } from './components/layout/AppLayout';
import { AuthPage } from './pages/AuthPage';
import { Toaster } from './components/ui/sonner';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Reels = lazy(() => import('./pages/Reels'));
const Search = lazy(() => import('./pages/Search'));
const Notifications = lazy(() => import('./pages/Notifications'));
const Messages = lazy(() => import('./pages/Messages'));
const Profile = lazy(() => import('./pages/Profile'));
const Create = lazy(() => import('./pages/Create'));

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useSocial();
  if (!currentUser) return <Navigate to="/auth" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center bg-black text-white">Loading...</div>}>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <AppLayout><Home /></AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/reels" element={
          <ProtectedRoute>
            <AppLayout><Reels /></AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/search" element={
          <ProtectedRoute>
            <AppLayout><Search /></AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/notifications" element={
          <ProtectedRoute>
            <AppLayout><Notifications /></AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/messages" element={
          <ProtectedRoute>
            <AppLayout><Messages /></AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <AppLayout><Profile /></AppLayout>
          </ProtectedRoute>
        } />

        <Route path="/create" element={
          <ProtectedRoute>
            <AppLayout><Create /></AppLayout>
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <SocialProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster position="top-center" theme="dark" />
      </BrowserRouter>
    </SocialProvider>
  );
}

export default App;
