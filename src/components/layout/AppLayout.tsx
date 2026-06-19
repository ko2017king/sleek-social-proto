import React from 'react';
import { BottomNav } from './BottomNav';
import { TopHeader } from './TopHeader';
import { useLocation } from 'react-router-dom';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';
  const isReelsPage = location.pathname === '/reels';

  if (isAuthPage) return <>{children}</>;

  return (
    <div className="min-h-screen bg-black text-white">
      {!isReelsPage && <TopHeader />}
      <main className={`pb-20 ${!isReelsPage ? 'pt-16' : ''}`}>
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
