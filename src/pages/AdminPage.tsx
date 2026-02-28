import React from 'react';
import { Settings, Users, Shield, Database, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';

export const AdminPage = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Admin Panel</h1>
          <p className="text-slate-400 mt-1">System-wide configuration and user management</p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Total Users', val: '1,245', icon: Users, color: 'text-blue-400 bg-blue-500/10' },
          { label: 'Active Jobs', val: '12', icon: Activity, color: 'text-emerald-400 bg-emerald-500/10' },
          { label: 'System Health', val: '99.9%', icon: CheckCircle2, color: 'text-primary bg-primary/10' },
          { label: 'Alerts', val: '0', icon: AlertCircle, color: 'text-slate-500 bg-white/5' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 p-6 rounded-[24px] border border-white/10 shadow-2xl backdrop-blur-xl">
            <div className={`p-3 rounded-xl w-fit mb-4 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-display font-bold text-white">{stat.val}</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white/5 rounded-[32px] border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl">
            <div className="p-8 border-b border-white/5">
              <h3 className="text-xl font-bold text-white">User Management</h3>
            </div>
            <div className="p-8 text-center text-slate-500 py-20">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p className="font-medium">User management module is currently restricted to Super Admins.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-2xl backdrop-blur-xl">
            <h3 className="text-xl font-bold mb-6 text-white">System Settings</h3>
            <div className="space-y-4">
              {[
                { label: 'Maintenance Mode', icon: Settings, active: false },
                { label: 'Public API Access', icon: Shield, active: true },
                { label: 'Auto-Backup', icon: Database, active: true },
              ].map((setting, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <setting.icon className="w-5 h-5 text-slate-500" />
                    <span className="text-sm font-bold text-slate-300">{setting.label}</span>
                  </div>
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${setting.active ? 'bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]' : 'bg-slate-700'}`}>
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${setting.active ? 'right-1' : 'left-1'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
