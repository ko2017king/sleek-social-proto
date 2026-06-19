import React from 'react';
import { useSocial } from '@/context/SocialContext';
import { PostCard } from '@/components/home/PostCard';
import { StoryBar } from '@/components/home/StoryBar';
import { motion } from 'framer-motion';

export default function Home() {
  const { posts } = useSocial();

  return (
    <div className="max-w-2xl mx-auto px-0 md:px-4">
      <StoryBar />
      
      <div className="flex flex-col gap-4 mt-2">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <p>No posts yet. Be the first to share!</p>
        </div>
      )}
    </div>
  );
}
