import React, { useState } from 'react';
import { useSocial } from '@/context/SocialContext';
import { Settings, Grid, Bookmark, List, Edit, LogOut, ChevronRight, UserCircle, Shield, Bell, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { currentUser, posts, logout } = useSocial();
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'settings'>('posts');
  const navigate = useNavigate();

  const userPosts = posts.filter(p => p.userId === currentUser?.id);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  if (!currentUser) return null;

  return (
    <div className="max-w-4xl mx-auto pb-10">
      {/* Profile Header */}
      <div className="px-4 py-8 flex flex-col items-center md:flex-row md:items-start md:gap-10 border-b border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent">
        <div className="relative mb-6 md:mb-0">
          <div className="h-24 w-24 md:h-32 md:w-32 rounded-full p-1 bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500">
            <div className="h-full w-full rounded-full bg-black p-1">
              <img src={currentUser.avatar} className="h-full w-full rounded-full object-cover" alt="" />
            </div>
          </div>
          <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-white border-4 border-black md:p-2.5">
            <Edit size={14} />
          </button>
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <h1 className="text-2xl font-bold text-white">@{currentUser.username}</h1>
            <div className="flex gap-2 justify-center md:justify-start">
              <Button size="sm" variant="secondary" className="bg-white/10 hover:bg-white/20 text-white rounded-xl">
                Edit Profile
              </Button>
              <Button size="sm" variant="secondary" className="bg-white/10 hover:bg-white/20 text-white rounded-xl" onClick={() => setActiveTab('settings')}>
                <Settings size={18} />
              </Button>
            </div>
          </div>

          <div className="flex justify-center md:justify-start gap-8 mb-6">
            <div className="text-center md:text-left">
              <span className="block font-bold text-white text-lg">{currentUser.postsCount}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Posts</span>
            </div>
            <div className="text-center md:text-left">
              <span className="block font-bold text-white text-lg">{currentUser.followers.length}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Followers</span>
            </div>
            <div className="text-center md:text-left">
              <span className="block font-bold text-white text-lg">{currentUser.following.length}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Following</span>
            </div>
          </div>

          <div className="max-w-xs mx-auto md:mx-0">
            <p className="text-sm font-bold text-white mb-1">{currentUser.fullName}</p>
            <p className="text-sm text-gray-400 leading-relaxed">{currentUser.bio}</p>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="flex border-b border-white/5 sticky top-16 z-10 bg-black/80 backdrop-blur-md">
        <button 
          onClick={() => setActiveTab('posts')}
          className={cn(
            "flex-1 py-4 flex flex-col items-center gap-1 transition-all",
            activeTab === 'posts' ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
          )}
        >
          <Grid size={20} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Posts</span>
        </button>
        <button 
          onClick={() => setActiveTab('saved')}
          className={cn(
            "flex-1 py-4 flex flex-col items-center gap-1 transition-all",
            activeTab === 'saved' ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
          )}
        >
          <Bookmark size={20} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Saved</span>
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={cn(
            "flex-1 py-4 flex flex-col items-center gap-1 transition-all",
            activeTab === 'settings' ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
          )}
        >
          <Settings size={20} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Settings</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-1 md:p-4">
        <AnimatePresence mode="wait">
          {activeTab === 'posts' && (
            <motion.div 
              key="posts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-3 gap-1 md:gap-4"
            >
              {userPosts.map(post => (
                <div key={post.id} className="aspect-square relative group overflow-hidden md:rounded-xl bg-white/5">
                  <img src={post.contentUrl} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" alt="" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white">
                    <div className="flex items-center gap-1 font-bold">
                      <List size={18} /> {post.likes.length}
                    </div>
                  </div>
                </div>
              ))}
              {userPosts.length === 0 && (
                <div className="col-span-3 py-20 text-center text-muted-foreground">
                  <p>No posts yet. Start sharing!</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'saved' && (
            <motion.div 
              key="saved"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center py-20 text-muted-foreground"
            >
              <div className="p-6 rounded-full bg-white/5 mb-4">
                <Bookmark size={48} className="opacity-20" />
              </div>
              <h3 className="text-white font-bold mb-1">Save Photos and Videos</h3>
              <p className="text-sm text-center max-w-xs">When you save photos and videos, they'll appear here. Only you can see what you've saved.</p>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div 
              key="settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-2"
            >
              {[
                { icon: UserCircle, label: 'Account Center', desc: 'Password, security, personal details' },
                { icon: Bell, label: 'Notifications', desc: 'Push, email, and SMS notifications' },
                { icon: Shield, label: 'Privacy and Safety', desc: 'Who can see your content and contact you' },
                { icon: Moon, label: 'Dark Mode', desc: 'Automatic based on system settings', toggle: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-white/5 text-primary">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                  {item.toggle ? (
                    <div className="h-6 w-11 rounded-full bg-primary relative">
                      <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm" />
                    </div>
                  ) : (
                    <ChevronRight size={20} className="text-muted-foreground" />
                  )}
                </div>
              ))}
              <div className="pt-6">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-destructive/10 text-destructive border border-destructive/20 font-bold hover:bg-destructive/20 transition-all"
                >
                  <LogOut size={20} /> Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
