import React, { useEffect } from 'react';
import { useSocial } from '@/context/SocialContext';
import { Heart, MessageCircle, UserPlus, AtSign, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

export default function Notifications() {
  const { notifications, users, markNotificationsAsRead } = useSocial();
  const navigate = useNavigate();

  useEffect(() => {
    markNotificationsAsRead();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart size={16} fill="currentColor" className="text-pink-500" />;
      case 'comment': return <MessageCircle size={16} fill="currentColor" className="text-blue-500" />;
      case 'follow': return <UserPlus size={16} fill="currentColor" className="text-green-500" />;
      case 'mention': return <AtSign size={16} className="text-purple-500" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 space-y-6">
      <div className="flex items-center gap-4 mb-2">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold">Notifications</h1>
      </div>

      <div className="space-y-2">
        {notifications.length > 0 ? (
          notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((n, i) => {
            const fromUser = users.find(u => u.id === n.fromUserId);
            return (
              <motion.div 
                key={n.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer ${!n.isRead ? 'border-l-4 border-l-primary' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={fromUser?.avatar} className="h-12 w-12 rounded-full object-cover border border-white/10" alt="" />
                    <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-black border border-white/10">
                      {getIcon(n.type)}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-white">
                      <span className="font-bold">@{fromUser?.username}</span> {n.text}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(n.createdAt))} ago
                    </p>
                  </div>
                </div>
                {n.postId && (
                  <div className="h-10 w-10 rounded-lg overflow-hidden border border-white/10">
                    {/* Simplified: just showing user avatar as post thumbnail for now */}
                    <img src={fromUser?.avatar} className="h-full w-full object-cover opacity-50" alt="" />
                  </div>
                )}
              </motion.div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground space-y-4">
            <div className="p-6 rounded-full bg-white/5">
              <Heart size={48} className="opacity-20" />
            </div>
            <p className="text-lg">No notifications yet</p>
            <p className="text-sm">Activities related to you will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
