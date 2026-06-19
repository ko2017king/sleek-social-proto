import React, { useState } from 'react';
import { useSocial } from '../context/SocialContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useSocial();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      toast.error('Please enter a username');
      return;
    }
    login(username);
    toast.success(`Welcome back, ${username}!`);
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute -right-[10%] -bottom-[10%] h-[40%] w-[40%] rounded-full bg-indigo-600/20 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-md"
      >
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 shadow-lg shadow-purple-500/20">
            <span className="text-3xl font-bold text-white">S</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">SocialHub</h1>
            <p className="text-muted-foreground">Connect with the world in 2026</p>
          </div>
        </div>

        <Card className="border-white/10 bg-white/5 backdrop-blur-2xl">
          <CardHeader>
            <CardTitle className="text-white">{isLogin ? 'Welcome back' : 'Create an account'}</CardTitle>
            <CardDescription className="text-muted-foreground">
              {isLogin ? 'Enter your details to sign in' : 'Fill in the details to get started'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-white/10 bg-white/5 text-white placeholder:text-muted-foreground focus:border-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-white/10 bg-white/5 text-white placeholder:text-muted-foreground focus:border-purple-500"
                />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 font-bold text-white hover:from-pink-600 hover:to-purple-700">
                {isLogin ? 'Sign In' : 'Sign Up'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
          </CardContent>
        </Card>

        {isLogin && (
          <div className="mt-8 grid grid-cols-1 gap-2 text-center text-xs text-muted-foreground">
            <p>Demo accounts:</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setUsername('alex_explorer')} className="underline">alex_explorer</button>
              <button onClick={() => setUsername('sarah_styles')} className="underline">sarah_styles</button>
              <button onClick={() => setUsername('marco_vibe')} className="underline">marco_vibe</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
