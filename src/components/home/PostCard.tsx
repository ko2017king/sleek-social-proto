import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Share2 } from 'lucide-react';
import { useSocial } from '@/context/SocialContext';
import { Post, User } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { currentUser, users, toggleLike, addComment } = useSocial();
  const [showHeart, setShowHeart] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const author = users.find(u => u.id === post.userId) as User;
  const isLiked = currentUser ? post.likes.includes(currentUser.id) : false;

  const handleLike = () => {
    toggleLike(post.id);
    if (!isLiked) {
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 1000);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, commentText);
    setCommentText('');
  };

  return (
    <div className="border-b border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden md:rounded-2xl md:border md:mb-4">
      {/* Post Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full border border-white/10 p-[2px]">
            <img src={author.avatar} alt={author.username} className="h-full w-full rounded-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-none">{author.username}</p>
            <p className="text-[10px] text-muted-foreground mt-1">
              {formatDistanceToNow(new Date(post.createdAt))} ago
            </p>
          </div>
        </div>
        <button className="text-muted-foreground">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Media */}
      <div className="relative aspect-square w-full bg-white/5 flex items-center justify-center overflow-hidden" onDoubleClick={handleLike}>
        <img src={post.contentUrl} alt="Post content" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
        
        <AnimatePresence>
          {showHeart && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute pointer-events-none"
            >
              <Heart size={80} fill="white" className="text-white drop-shadow-lg" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Post Actions */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLike}
              className={cn("transition-transform active:scale-125", isLiked ? "text-pink-500" : "text-white")}
            >
              <Heart size={26} fill={isLiked ? "currentColor" : "none"} />
            </button>
            <button className="text-white hover:text-primary transition-colors">
              <MessageCircle size={26} />
            </button>
            <button className="text-white hover:text-primary transition-colors">
              <Send size={24} />
            </button>
          </div>
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className={cn("transition-colors", isSaved ? "text-primary" : "text-white")}
          >
            <Bookmark size={26} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Likes Count */}
        <p className="text-sm font-bold text-white mb-2">
          {post.likes.length.toLocaleString()} likes
        </p>

        {/* Caption */}
        <div className="text-sm leading-relaxed mb-3">
          <span className="font-bold text-white mr-2">{author.username}</span>
          <span className="text-gray-300">{post.caption}</span>
          <div className="mt-1 space-x-1">
            {post.hashtags.map(tag => (
              <span key={tag} className="text-primary hover:underline cursor-pointer">#{tag}</span>
            ))}
          </div>
        </div>

        {/* Comments */}
        {post.comments.length > 0 && (
          <div className="mb-3">
            <button className="text-xs text-muted-foreground mb-1 hover:text-white transition-colors">
              View all {post.comments.length} comments
            </button>
            <div className="space-y-1">
              {post.comments.slice(-2).map(comment => (
                <div key={comment.id} className="text-xs">
                  <span className="font-bold text-white mr-2">
                    {users.find(u => u.id === comment.userId)?.username}
                  </span>
                  <span className="text-gray-400">{comment.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comment Input */}
        <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 border-t border-white/5 pt-3 mt-1">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="flex-1 bg-transparent text-xs text-white placeholder:text-muted-foreground focus:outline-none"
          />
          <button 
            type="submit"
            disabled={!commentText.trim()}
            className="text-xs font-bold text-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
