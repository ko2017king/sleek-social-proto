import React from 'react';
import { Bell, MessageCircle, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSocial } from '@/context/SocialContext';

export function TopHeader() {
  const navigate = useNavigate();
  const { notifications } = useSocial();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/80 px-4 py-3 backdrop-blur-xl">
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500">
          <span className="text-lg font-bold text-white">S</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">SocialHub</h1>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/notifications')}
          className="relative text-white hover:text-primary transition-colors"
        >
          <Bell size={24} />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>
        <button 
          onClick={() => navigate('/messages')}
          className="text-white hover:text-primary transition-colors"
        >
          <MessageCircle size={24} />
        </button>
      </div>
    </header>
  );
}
