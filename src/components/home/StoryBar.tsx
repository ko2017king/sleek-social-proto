import React, { useState } from 'react';
import { useSocial } from '@/context/SocialContext';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function StoryBar() {
  const { stories, currentUser, users } = useSocial();
  const [selectedStory, setSelectedStory] = useState<string | null>(null);

  const getAvatar = (userId: string) => {
    return users.find(u => u.id === userId)?.avatar || '';
  };

  const getUsername = (userId: string) => {
    return users.find(u => u.id === userId)?.username || '';
  };

  return (
    <div className="flex items-center gap-4 overflow-x-auto px-4 py-4 no-scrollbar border-b border-white/5 bg-black/40 backdrop-blur-sm">
      {/* Current User Add Story */}
      <div className="flex flex-col items-center gap-1 min-w-[70px]">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-2 border-white/10 p-[2px]">
            <img 
              src={currentUser?.avatar} 
              alt="You" 
              className="h-full w-full rounded-full object-cover grayscale-[0.5]"
            />
          </div>
          <div className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary border-2 border-black">
            <Plus size={12} strokeWidth={3} />
          </div>
        </div>
        <span className="text-[10px] text-muted-foreground">Your Story</span>
      </div>

      {/* Other User Stories */}
      {stories.map((story) => (
        <div 
          key={story.id} 
          className="flex flex-col items-center gap-1 min-w-[70px] cursor-pointer"
          onClick={() => setSelectedStory(story.id)}
        >
          <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 p-[2px]">
            <div className="h-full w-full rounded-full bg-black p-[2px]">
              <img 
                src={getAvatar(story.userId)} 
                alt={getUsername(story.userId)} 
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>
          <span className="text-[10px] text-white truncate max-w-[60px]">
            {getUsername(story.userId)}
          </span>
        </div>
      ))}

      {/* Fullscreen Story Viewer (Simplified for Demo) */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
          >
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full border border-white/20">
                  <img 
                    src={getAvatar(stories.find(s => s.id === selectedStory)?.userId || '')} 
                    alt="User" 
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <span className="text-sm font-bold text-white">
                  {getUsername(stories.find(s => s.id === selectedStory)?.userId || '')}
                </span>
              </div>
              <button 
                onClick={() => setSelectedStory(null)}
                className="text-white bg-white/10 rounded-full p-2"
              >
                ✕
              </button>
            </div>

            <div className="h-full w-full max-w-lg relative">
              <img 
                src={stories.find(s => s.id === selectedStory)?.contentUrl} 
                alt="Story content" 
                className="h-full w-full object-contain md:rounded-3xl"
              />
              
              {/* Progress Bar Simulation */}
              <div className="absolute top-16 left-4 right-4 h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5 }}
                  onAnimationComplete={() => setSelectedStory(null)}
                  className="h-full bg-white"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
