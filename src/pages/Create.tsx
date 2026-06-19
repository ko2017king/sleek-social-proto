import React, { useState, useRef } from 'react';
import { useSocial } from '@/context/SocialContext';
import { Image, Video, X, MapPin, Hash, Sparkles, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function Create() {
  const { addPost, currentUser } = useSocial();
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = async () => {
    if (!selectedImage) {
      toast.error('Please select an image first');
      return;
    }
    
    setIsUploading(true);
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addPost({
      userId: currentUser?.id || '',
      type: 'image',
      contentUrl: selectedImage,
      caption,
      hashtags: hashtags.split(' ').filter(h => h.startsWith('#')).map(h => h.slice(1)) || [],
    });

    setIsUploading(false);
    toast.success('Post shared successfully!');
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Create New Post</h1>
          <Button 
            onClick={handlePost} 
            disabled={!selectedImage || isUploading}
            className="bg-primary hover:bg-primary/80 text-white font-bold rounded-xl px-6"
          >
            {isUploading ? 'Posting...' : 'Share'}
          </Button>
        </div>

        {/* Media Upload Area */}
        <div 
          onClick={() => !selectedImage && fileInputRef.current?.click()}
          className={cn(
            "aspect-square w-full rounded-3xl border-2 border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center cursor-pointer overflow-hidden group transition-all relative",
            selectedImage && "border-none"
          )}
        >
          {selectedImage ? (
            <>
              <img src={selectedImage} className="h-full w-full object-cover" alt="Selected" />
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/80 transition-all"
              >
                <X size={20} />
              </button>
            </>
          ) : (
            <div className="text-center p-10 space-y-4">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Image size={40} className="text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">Select photos or videos</p>
                <p className="text-sm text-muted-foreground">Drag and drop files here</p>
              </div>
              <Button variant="outline" className="border-white/20 hover:bg-white/10 text-white rounded-xl">
                Choose from device
              </Button>
            </div>
          )}
          <input 
            type="file" 
            accept="image/*,video/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>

        {/* Post Details */}
        <div className="space-y-4 bg-white/5 p-6 rounded-3xl border border-white/5">
          <div className="flex items-start gap-4">
            <img src={currentUser?.avatar} className="h-10 w-10 rounded-full object-cover border border-white/10" alt="" />
            <div className="flex-1 space-y-4">
              <Textarea 
                placeholder="Write a caption..." 
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="bg-transparent border-none p-0 focus-visible:ring-0 text-white resize-none min-h-[100px]"
              />
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors cursor-pointer group">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/20 group-hover:text-primary transition-all">
                    <MapPin size={18} />
                  </div>
                  <span className="text-sm font-medium">Add location</span>
                </div>
                
                <div className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors cursor-pointer group">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/20 group-hover:text-primary transition-all">
                    <Hash size={18} />
                  </div>
                  <Input 
                    placeholder="Add hashtags (e.g. #socialhub #2026)" 
                    value={hashtags}
                    onChange={(e) => setHashtags(e.target.value)}
                    className="bg-transparent border-none p-0 h-auto focus-visible:ring-0 text-primary text-sm font-medium placeholder:text-muted-foreground"
                  />
                </div>

                <div className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors cursor-pointer group">
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/20 group-hover:text-primary transition-all">
                    <Sparkles size={18} />
                  </div>
                  <span className="text-sm font-medium">AI Enhance Post</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
          <Sparkles size={16} />
          <p className="text-[10px] font-medium">Using SocialHub AI to optimize your post for 2026 trending algorithms.</p>
        </div>
      </motion.div>
    </div>
  );
}
