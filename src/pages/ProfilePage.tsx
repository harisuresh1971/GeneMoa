import React from 'react';
import { User, Mail, Building, Shield, Settings, LogOut, Camera, Lock } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const ProfilePage = () => {
  const { user } = useAuthStore();

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-white">User Profile</h1>
        <p className="text-slate-400 mt-1">Manage your account settings and research identity</p>
      </div>

      <div className="bg-white/5 rounded-[32px] border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl">
        <div className="h-32 bg-primary/20 relative">
          <div className="absolute -bottom-12 left-12">
            <div className="relative group">
              <div className="w-24 h-24 bg-primary rounded-[32px] border-4 border-black flex items-center justify-center text-white text-3xl font-bold shadow-2xl shadow-primary/20">
                {user?.full_name?.[0] || 'U'}
              </div>
              <button className="absolute inset-0 bg-black/40 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Camera className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
        <div className="pt-16 pb-12 px-12">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white">{user?.full_name}</h2>
              <p className="text-slate-400 font-medium">{user?.organization || 'Independent Researcher'}</p>
            </div>
            <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white hover:bg-white/10 transition-all">
              Edit Profile
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <Mail className="w-5 h-5 text-slate-400" />
                  <span className="text-sm font-medium text-slate-300">{user?.email}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Account Type</label>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm font-bold text-white">Enterprise Researcher</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Security</label>
                <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-slate-400" />
                    <span className="text-sm font-medium text-slate-300">Change Password</span>
                  </div>
                  <Settings className="w-4 h-4 text-slate-600" />
                </button>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Session</label>
                <button className="w-full flex items-center gap-3 p-4 bg-red-500/10 rounded-2xl border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all">
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-bold">Logout from all devices</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
