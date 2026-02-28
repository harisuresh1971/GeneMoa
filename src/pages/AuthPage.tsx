import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dna, Mail, Lock, User, Building, ArrowRight, Loader2, ShieldCheck, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { useAuthStore } from '../store/authStore';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  full_name: z.string().min(2, 'Full name is required'),
  organization: z.string().optional(),
});

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const loginForm = useForm({ resolver: zodResolver(loginSchema) });
  const signupForm = useForm({ resolver: zodResolver(signupSchema) });

  const onLogin = async (data: any) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', data);
      setAuth(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (e: any) {
      setError(e.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const onSignup = async (data: any) => {
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/register', data);
      setIsLogin(true);
      loginForm.reset({ email: data.email });
    } catch (e: any) {
      setError(e.response?.data?.error || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />

      <div className="max-w-md w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center p-4 bg-primary rounded-[24px] mb-6 shadow-2xl shadow-primary/40 group hover:rotate-12 transition-transform duration-500">
            <Dna className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-display font-bold text-white tracking-tight">GeneMOA Intelligence</h1>
          <p className="text-slate-500 mt-3 text-lg">Secure access to the discovery platform</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 rounded-[48px] shadow-2xl border border-white/10 overflow-hidden backdrop-blur-2xl"
        >
          <div className="flex border-b border-white/5 bg-white/[0.02]">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-6 text-sm font-bold transition-all relative group ${isLogin ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Login
              {isLogin && <motion.div layoutId="authTab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />}
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-6 text-sm font-bold transition-all relative group ${!isLogin ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Create Account
              {!isLogin && <motion.div layoutId="authTab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />}
            </button>
          </div>

          <div className="p-10">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-8 p-5 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-2xl flex items-center gap-4"
                >
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-medium">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={isLogin ? loginForm.handleSubmit(onLogin) : signupForm.handleSubmit(onSignup)} className="space-y-6">
              {!isLogin && (
                <>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                      <input 
                        {...signupForm.register('full_name')}
                        placeholder="Dr. Jane Smith"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium placeholder:text-slate-600"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Organization</label>
                    <div className="relative group">
                      <Building className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                      <input 
                        {...signupForm.register('organization')}
                        placeholder="BioTech Labs Inc."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium placeholder:text-slate-600"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                  <input 
                    {...(isLogin ? loginForm.register('email') : signupForm.register('email'))}
                    placeholder="name@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="password"
                    {...(isLogin ? loginForm.register('password') : signupForm.register('password'))}
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium placeholder:text-slate-600"
                  />
                </div>
              </div>

              <button 
                disabled={loading}
                className="w-full bg-primary text-white py-5 rounded-[24px] font-bold text-xl hover:bg-primary/90 transition-all shadow-2xl shadow-primary/40 flex items-center justify-center gap-3 disabled:opacity-50 mt-10 group"
              >
                {loading ? <Loader2 className="w-7 h-7 animate-spin" /> : (
                  <>
                    {isLogin ? 'Login' : 'Create Account'}
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex items-center justify-center gap-8 text-slate-600"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">HIPAA Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Real-time Inference</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
