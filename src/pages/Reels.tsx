import React, { useRef, useEffect, useState } from 'react';
import { useSocial } from '@/context/SocialContext';
import { Heart, MessageCircle, Share2, Music, UserPlus } from 'lucide-react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Reels() {
  const { reels, currentUser, toggleLike, followUser } = useSocial();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="h-[calc(100vh-64px)] w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black md:max-w-md md:mx-auto md:rounded-3xl md:my-4 md:border md:border-white/10"
    >
      {reels.map((reel) => (
        <ReelItem 
          key={reel.id} 
          reel={reel} 
          onLike={() => toggleLike(reel.id)}
          onFollow={() => followUser(reel.userId)}
        />
      ))}
    </div>
  );
}

function ReelItem({ reel, onLike, onFollow }: { reel: any, onLike: () => void, onFollow: () => void }) {
  const { users, currentUser } = useSocial();
  const author = users.find(u => u.id === reel.userId);
  const isLiked = currentUser ? reel.likes.includes(currentUser.id) : false;
  const isFollowing = currentUser ? author?.followers.includes(currentUser.id) : false;

  return (
    <div className="relative h-full w-full snap-start snap-always flex items-center justify-center bg-zinc-900">
      {/* Video Content Placeholder */}
      <img 
        src={reel.contentUrl} 
        alt="Reel content" 
        className="h-full w-full object-cover"
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

      {/* Right Side Actions */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-10">
        <div className="relative mb-2">
          <div className="h-12 w-12 rounded-full border-2 border-white p-[2px]">
            <img src={author?.avatar} alt={author?.username} className="h-full w-full rounded-full object-cover" />
          </div>
          {!isFollowing && reel.userId !== currentUser?.id && (
            <button 
              onClick={onFollow}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white"
            >
              <UserPlus size={12} strokeWidth={3} />
            </button>
          )}
        </div>

        <div className="flex flex-col items-center gap-1">
          <button 
            onClick={onLike}
            className={cn("p-2 rounded-full bg-white/10 backdrop-blur-md transition-all active:scale-125", isLiked ? "text-red-500" : "text-white")}
          >
            <Heart size={28} fill={isLiked ? "currentColor" : "none"} />
          </button>
          <span className="text-xs font-bold text-white shadow-sm">{reel.likes.length}</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <button className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white transition-all hover:bg-white/20">
            <MessageCircle size={28} />
          </button>
          <span className="text-xs font-bold text-white shadow-sm">{reel.comments.length}</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <button className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white transition-all hover:bg-white/20">
            <Share2 size={28} />
          </button>
          <span className="text-xs font-bold text-white shadow-sm">Share</span>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute left-4 right-16 bottom-6 z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-base font-bold text-white">@{author?.username}</span>
          <span className="h-1 w-1 rounded-full bg-white/60" />
          <button className="text-sm font-semibold text-white/90 hover:text-white transition-colors">Follow</button>
        </div>
        <p className="text-sm text-white/90 mb-4 line-clamp-2">
          {reel.caption}
        </p>
        <div className="flex items-center gap-2 overflow-hidden">
          <Music size={14} className="text-white animate-spin-slow" />
          <div className="flex-1 whitespace-nowrap overflow-hidden">
            <p className="text-sm text-white/90 animate-marquee inline-block">
              {author?.username} • Original Audio — {reel.hashtags.map(h => `#${h}`).join(' ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
