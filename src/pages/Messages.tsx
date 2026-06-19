import React, { useState } from 'react';
import { useSocial } from '@/context/SocialContext';
import { Search, Send, ArrowLeft, Phone, Video, Info, MoreVertical, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { formatDistanceToNow } from 'date-fns';

export default function Messages() {
  const { users, currentUser, messages, sendMessage } = useSocial();
  const navigate = useNavigate();
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [msgText, setMsgText] = useState('');

  const chatUsers = users.filter(u => u.id !== currentUser?.id);
  const selectedUser = users.find(u => u.id === selectedChatId);

  const filteredMessages = messages.filter(m => 
    (m.senderId === currentUser?.id && m.receiverId === selectedChatId) ||
    (m.senderId === selectedChatId && m.receiverId === currentUser?.id)
  ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgText.trim() || !selectedChatId) return;
    sendMessage(selectedChatId, msgText);
    setMsgText('');
  };

  return (
    <div className="h-[calc(100vh-120px)] max-w-5xl mx-auto flex flex-col md:flex-row md:border md:border-white/10 md:rounded-3xl md:my-4 bg-black/40 backdrop-blur-xl overflow-hidden">
      {/* Chat List */}
      <div className={`w-full md:w-80 border-r border-white/10 flex flex-col ${selectedChatId ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-white/10">
          <h1 className="text-2xl font-bold mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input placeholder="Search chats..." className="pl-9 h-10 bg-white/5 border-none rounded-xl" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {chatUsers.map(user => (
            <button 
              key={user.id}
              onClick={() => setSelectedChatId(user.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${selectedChatId === user.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-white/5'}`}
            >
              <div className="relative">
                <img src={user.avatar} className="h-12 w-12 rounded-full object-cover border border-white/10" alt="" />
                {user.isOnline && <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-black" />}
              </div>
              <div className="flex-1 text-left overflow-hidden">
                <p className="font-bold text-sm truncate">{user.fullName}</p>
                <p className={`text-xs truncate ${selectedChatId === user.id ? 'text-white/80' : 'text-muted-foreground'}`}>
                  @{user.username}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat View */}
      <div className={`flex-1 flex flex-col ${!selectedChatId ? 'hidden md:flex' : 'flex'}`}>
        {selectedChatId ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <button onClick={() => setSelectedChatId(null)} className="md:hidden p-1 hover:bg-white/5 rounded-full transition-colors mr-1">
                  <ArrowLeft size={20} />
                </button>
                <div className="relative">
                  <img src={selectedUser?.avatar} className="h-10 w-10 rounded-full object-cover border border-white/10" alt="" />
                  {selectedUser?.isOnline && <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-black" />}
                </div>
                <div>
                  <p className="font-bold text-sm leading-none">{selectedUser?.fullName}</p>
                  <p className="text-[10px] text-green-500 mt-1">{selectedUser?.isOnline ? 'Active now' : 'Active 5m ago'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <button className="hover:text-white transition-colors"><Phone size={20} /></button>
                <button className="hover:text-white transition-colors"><Video size={20} /></button>
                <button className="hover:text-white transition-colors"><Info size={20} /></button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
              <div className="flex-1" />
              <div className="text-center py-4">
                <img src={selectedUser?.avatar} className="h-20 w-20 rounded-full mx-auto mb-2 border-2 border-primary/20 p-1" alt="" />
                <h3 className="font-bold text-lg">{selectedUser?.fullName}</h3>
                <p className="text-xs text-muted-foreground mb-4">@{selectedUser?.username} • SocialHub</p>
                <button className="text-xs font-bold text-primary hover:underline">View Profile</button>
              </div>
              
              {filteredMessages.map((m, i) => {
                const isMine = m.senderId === currentUser?.id;
                return (
                  <motion.div 
                    key={m.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${isMine ? 'bg-primary text-white rounded-tr-none' : 'bg-white/10 text-white rounded-tl-none'}`}>
                      <p>{m.text}</p>
                      <p className={`text-[9px] mt-1 ${isMine ? 'text-white/60' : 'text-white/40'}`}>
                        {formatDistanceToNow(new Date(m.createdAt))} ago
                      </p>
                    </div>
                  </motion.div>
                );
              })}
              {filteredMessages.length === 0 && (
                <div className="text-center text-xs text-muted-foreground py-10 italic">
                  No messages yet. Say hi to {selectedUser?.fullName}!
                </div>
              )}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-black/40">
              <div className="flex items-center gap-2 bg-white/5 rounded-2xl p-2 px-4 focus-within:ring-1 ring-primary/40 transition-all">
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  value={msgText}
                  onChange={(e) => setMsgText(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-white focus:outline-none py-2"
                />
                <button 
                  type="submit"
                  disabled={!msgText.trim()}
                  className="p-2 rounded-xl bg-primary text-white disabled:opacity-50 disabled:grayscale transition-all hover:scale-105 active:scale-95"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground space-y-4">
            <div className="p-8 rounded-full bg-white/5 border border-white/5">
              <MessageCircle size={64} className="opacity-20" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-white">Your Messages</h3>
              <p className="text-sm">Send private photos and messages to a friend.</p>
            </div>
            <button className="px-6 py-2.5 bg-primary rounded-xl text-white font-bold text-sm hover:bg-primary/80 transition-all">
              Start a conversation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
