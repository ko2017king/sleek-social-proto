export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio: string;
  followers: string[];
  following: string[];
  postsCount: number;
  isOnline: boolean;
}

export interface Post {
  id: string;
  userId: string;
  type: 'image' | 'video';
  contentUrl: string;
  thumbnailUrl?: string;
  caption: string;
  hashtags: string[];
  likes: string[];
  comments: Comment[];
  createdAt: string;
  isSaved?: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
}

export interface Story {
  id: string;
  userId: string;
  contentUrl: string;
  type: 'image' | 'video';
  createdAt: string;
  viewedBy: string[];
}

export interface Notification {
  id: string;
  userId: string;
  fromUserId: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  postId?: string;
  text: string;
  createdAt: string;
  isRead: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: string;
}

export const DEMO_USERS: User[] = [
  {
    id: 'user-1',
    username: 'alex_explorer',
    fullName: 'Alex River',
    avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/2cf1a189-66ab-43a1-a2e7-e1b8a2ff63f1/user1-profile-da15dd8b-1781884437442.webp',
    bio: 'Adventure seeker & mountain lover 🏔️ Always looking for the next peak.',
    followers: ['user-2', 'user-3'],
    following: ['user-2'],
    postsCount: 12,
    isOnline: true,
  },
  {
    id: 'user-2',
    username: 'sarah_styles',
    fullName: 'Sarah Jenkins',
    avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/2cf1a189-66ab-43a1-a2e7-e1b8a2ff63f1/user2-profile-187d6f94-1781884437222.webp',
    bio: 'Fashion enthusiast | Coffee addict ☕ | NYC Based',
    followers: ['user-1'],
    following: ['user-1', 'user-3'],
    postsCount: 45,
    isOnline: false,
  },
  {
    id: 'user-3',
    username: 'marco_vibe',
    fullName: 'Marco Chen',
    avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/2cf1a189-66ab-43a1-a2e7-e1b8a2ff63f1/user3-profile-c56eb952-1781884437517.webp',
    bio: 'Capturing moments that matter. Travel | Photography | Life.',
    followers: ['user-2'],
    following: ['user-1', 'user-2'],
    postsCount: 28,
    isOnline: true,
  }
];

export const DEMO_POSTS: Post[] = [
  {
    id: 'post-1',
    userId: 'user-1',
    type: 'image',
    contentUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/2cf1a189-66ab-43a1-a2e7-e1b8a2ff63f1/post-image-1-f3cc0d62-1781884437139.webp',
    caption: 'Found this hidden gem during my last hike! The water was so clear.',
    hashtags: ['hiking', 'nature', 'adventure'],
    likes: ['user-2', 'user-3'],
    comments: [
      { id: 'c1', userId: 'user-2', text: 'Wow, this looks incredible! 😍', createdAt: new Date().toISOString() }
    ],
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'post-2',
    userId: 'user-2',
    type: 'image',
    contentUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/2cf1a189-66ab-43a1-a2e7-e1b8a2ff63f1/post-image-2-4631f140-1781884437521.webp',
    caption: 'The best breakfast in the city. Change my mind. 🥑☕',
    hashtags: ['brunch', 'foodie', 'nyc'],
    likes: ['user-1'],
    comments: [],
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 'post-3',
    userId: 'user-3',
    type: 'image',
    contentUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/2cf1a189-66ab-43a1-a2e7-e1b8a2ff63f1/post-image-3-a0b7990b-1781884437559.webp',
    caption: 'Late night sessions at the studio. Productive vibes only.',
    hashtags: ['work', 'design', 'productivity'],
    likes: ['user-1', 'user-2'],
    comments: [
      { id: 'c2', userId: 'user-1', text: 'Clean setup!', createdAt: new Date().toISOString() }
    ],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  }
];

export const DEMO_REELS: Post[] = [
  {
    id: 'reel-1',
    userId: 'user-3',
    type: 'video',
    contentUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/2cf1a189-66ab-43a1-a2e7-e1b8a2ff63f1/reel-cover-1-0d7993d5-1781884437332.webp',
    thumbnailUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/2cf1a189-66ab-43a1-a2e7-e1b8a2ff63f1/reel-cover-1-0d7993d5-1781884437332.webp',
    caption: 'Neon nights in the city 🌃 #cyberpunk #citylife',
    hashtags: ['cyberpunk', 'citylife', 'vibes'],
    likes: ['user-1', 'user-2'],
    comments: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'reel-2',
    userId: 'user-1',
    type: 'video',
    contentUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/2cf1a189-66ab-43a1-a2e7-e1b8a2ff63f1/reel-cover-2-54a50798-1781884438878.webp',
    thumbnailUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/2cf1a189-66ab-43a1-a2e7-e1b8a2ff63f1/reel-cover-2-54a50798-1781884438878.webp',
    caption: 'Take me back to paradise 🏝️ #beach #summer #travel',
    hashtags: ['beach', 'summer', 'travel'],
    likes: ['user-2', 'user-3'],
    comments: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'reel-3',
    userId: 'user-2',
    type: 'video',
    contentUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/2cf1a189-66ab-43a1-a2e7-e1b8a2ff63f1/reel-cover-3-01f5fe8f-1781884439752.webp',
    thumbnailUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/2cf1a189-66ab-43a1-a2e7-e1b8a2ff63f1/reel-cover-3-01f5fe8f-1781884439752.webp',
    caption: 'OOTD for a sunny day in Brooklyn 👗 #fashion #brooklyn',
    hashtags: ['fashion', 'brooklyn', 'ootd'],
    likes: ['user-1', 'user-3'],
    comments: [],
    createdAt: new Date().toISOString(),
  }
];

export const DEMO_STORIES: Story[] = [
  {
    id: 'story-1',
    userId: 'user-1',
    contentUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/2cf1a189-66ab-43a1-a2e7-e1b8a2ff63f1/user1-profile-da15dd8b-1781884437442.webp',
    type: 'image',
    createdAt: new Date().toISOString(),
    viewedBy: [],
  },
  {
    id: 'story-2',
    userId: 'user-2',
    contentUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/2cf1a189-66ab-43a1-a2e7-e1b8a2ff63f1/user2-profile-187d6f94-1781884437222.webp',
    type: 'image',
    createdAt: new Date().toISOString(),
    viewedBy: [],
  },
  {
    id: 'story-3',
    userId: 'user-3',
    contentUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/2cf1a189-66ab-43a1-a2e7-e1b8a2ff63f1/user3-profile-c56eb952-1781884437517.webp',
    type: 'image',
    createdAt: new Date().toISOString(),
    viewedBy: [],
  }
];
