import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Post, Story, Notification, Message, DEMO_USERS, DEMO_POSTS, DEMO_STORIES, DEMO_REELS } from '../lib/mock-data';
import { useSocialStorage } from '../hooks/use-social-storage';

interface SocialContextType {
  currentUser: User | null;
  users: User[];
  posts: Post[];
  reels: Post[];
  stories: Story[];
  notifications: Notification[];
  messages: Message[];
  login: (username: string) => void;
  logout: () => void;
  toggleLike: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
  addPost: (post: Omit<Post, 'id' | 'likes' | 'comments' | 'createdAt'>) => void;
  sendMessage: (receiverId: string, text: string) => void;
  markNotificationsAsRead: () => void;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export function SocialProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useSocialStorage<User | null>('currentUser', null);
  const [users, setUsers] = useSocialStorage<User[]>('users', DEMO_USERS);
  const [posts, setPosts] = useSocialStorage<Post[]>('posts', DEMO_POSTS);
  const [reels, setReels] = useSocialStorage<Post[]>('reels', DEMO_REELS);
  const [stories, setStories] = useSocialStorage<Story[]>('stories', DEMO_STORIES);
  const [notifications, setNotifications] = useSocialStorage<Notification[]>('notifications', []);
  const [messages, setMessages] = useSocialStorage<Message[]>('messages', []);

  const login = (username: string) => {
    const user = users.find(u => u.username === username) || users[0];
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const toggleLike = (postId: string) => {
    if (!currentUser) return;
    
    const updatePosts = (prev: Post[]) => prev.map(post => {
      if (post.id === postId) {
        const isLiked = post.likes.includes(currentUser.id);
        const newLikes = isLiked 
          ? post.likes.filter(id => id !== currentUser.id)
          : [...post.likes, currentUser.id];
        return { ...post, likes: newLikes };
      }
      return post;
    });

    setPosts(updatePosts);
    setReels(updatePosts);
  };

  const addComment = (postId: string, text: string) => {
    if (!currentUser) return;
    const newComment = {
      id: Math.random().toString(36).substr(2, 9),
      userId: currentUser.id,
      text,
      createdAt: new Date().toISOString(),
    };

    const updatePosts = (prev: Post[]) => prev.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    });

    setPosts(updatePosts);
    setReels(updatePosts);
  };

  const followUser = (userId: string) => {
    if (!currentUser) return;
    setUsers(prev => prev.map(user => {
      if (user.id === userId) return { ...user, followers: [...user.followers, currentUser.id] };
      if (user.id === currentUser.id) return { ...user, following: [...user.following, userId] };
      return user;
    }));
    if (currentUser) {
      setCurrentUser(prev => prev ? { ...prev, following: [...prev.following, userId] } : null);
    }
  };

  const unfollowUser = (userId: string) => {
    if (!currentUser) return;
    setUsers(prev => prev.map(user => {
      if (user.id === userId) return { ...user, followers: user.followers.filter(id => id !== currentUser.id) };
      if (user.id === currentUser.id) return { ...user, following: user.following.filter(id => id !== userId) };
      return user;
    }));
    if (currentUser) {
      setCurrentUser(prev => prev ? { ...prev, following: prev.following.filter(id => id !== userId) } : null);
    }
  };

  const addPost = (newPostData: Omit<Post, 'id' | 'likes' | 'comments' | 'createdAt'>) => {
    if (!currentUser) return;
    const newPost: Post = {
      ...newPostData,
      id: `post-${Date.now()}`,
      likes: [],
      comments: [],
      createdAt: new Date().toISOString(),
    };
    setPosts(prev => [newPost, ...prev]);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, postsCount: u.postsCount + 1 } : u));
  };

  const sendMessage = (receiverId: string, text: string) => {
    if (!currentUser) return;
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      receiverId,
      text,
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <SocialContext.Provider value={{
      currentUser, users, posts, reels, stories, notifications, messages,
      login, logout, toggleLike, addComment, followUser, unfollowUser, addPost, sendMessage, markNotificationsAsRead
    }}>
      {children}
    </SocialContext.Provider>
  );
}

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (context === undefined) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
}
