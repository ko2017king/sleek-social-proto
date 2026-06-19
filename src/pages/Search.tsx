import React, { useState } from 'react';
import { useSocial } from '@/context/SocialContext';
import { Search as SearchIcon, TrendingUp, Users, Grid3X3, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function Search() {
  const { users, posts } = useSocial();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const trendingTags = ['travel2026', 'techVibes', 'natureLover', 'foodie', 'minimalism', 'creative'];

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-6">
      {/* Search Bar */}
      <div className="sticky top-16 z-20 bg-black py-2">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input 
            placeholder="Search users, hashtags, or topics..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-white/10 bg-white/5 text-white h-12 rounded-xl focus:border-primary transition-all"
          />
        </div>
      </div>

      {searchQuery ? (
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <Users size={16} /> Results
          </h2>
          <div className="grid gap-4">
            {filteredUsers.map(user => (
              <motion.div 
                key={user.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <img src={user.avatar} className="h-12 w-12 rounded-full object-cover border border-white/10" alt={user.username} />
                  <div>
                    <p className="font-bold text-white text-sm">@{user.username}</p>
                    <p className="text-xs text-muted-foreground">{user.fullName}</p>
                  </div>
                </div>
                <button className="px-4 py-1.5 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary/80 transition-all">
                  Follow
                </button>
              </motion.div>
            ))}
            {filteredUsers.length === 0 && (
              <p className="text-center py-10 text-muted-foreground">No users found matching "{searchQuery}"</p>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Trending Tags */}
          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <TrendingUp size={16} /> Trending Today
            </h2>
            <div className="flex flex-wrap gap-2">
              {trendingTags.map(tag => (
                <button 
                  key={tag} 
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm hover:bg-primary/20 hover:border-primary/40 transition-all"
                  onClick={() => setSearchQuery(tag)}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </section>

          {/* Explore Grid */}
          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Grid3X3 size={16} /> Explore
            </h2>
            <div className="grid grid-cols-3 gap-1 md:gap-4 md:grid-cols-3">
              {posts.map((post, i) => (
                <motion.div 
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="aspect-square relative group overflow-hidden cursor-pointer md:rounded-xl"
                >
                  <img src={post.contentUrl} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" alt="" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white">
                    <div className="flex items-center gap-1 font-bold">
                      <Heart size={18} fill="currentColor" /> {post.likes.length}
                    </div>
                    <div className="flex items-center gap-1 font-bold">
                      <SearchIcon size={18} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
