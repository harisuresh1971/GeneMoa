import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowUpRight,
  Zap,
  Microscope,
  Database,
  Search,
  ChevronRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import api from '../lib/api';
import { Link } from 'react-router-dom';

const data = [
  { name: 'Feb 1', val: 12 },
  { name: 'Feb 5', val: 45 },
  { name: 'Feb 10', val: 32 },
  { name: 'Feb 15', val: 67 },
  { name: 'Feb 20', val: 89 },
  { name: 'Feb 25', val: 120 },
  { name: 'Feb 28', val: 145 },
];

const moaData = [
  { name: 'Kinase Inhibitor', count: 45, color: '#8b5cf6' },
  { name: 'HDAC Inhibitor', count: 32, color: '#a78bfa' },
  { name: 'GPCR Agonist', count: 28, color: '#c084fc' },
  { name: 'Ion Channel', count: 18, color: '#d8b4fe' },
  { name: 'Protease Inhibitor', count: 12, color: '#e9d5ff' },
];

export const DashboardPage = () => {
  const [stats, setStats] = useState<any>(null);
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/predictions');
        setRecent(res.data.slice(0, 5));
        setStats({
          total: res.data.length,
          thisMonth: res.data.filter((p: any) => new Date(p.created_at) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length,
          avgConfidence: (res.data.reduce((acc: number, p: any) => acc + (p.top_predictions?.[0]?.confidence || 0), 0) / (res.data.length || 1)).toFixed(1),
          models: 8
        });
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-8 space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-white">Research Dashboard</h1>
          <p className="text-slate-400 text-lg mt-1">Real-time overview of your drug discovery pipeline</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-sm font-bold text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95">
            Export Analytics
          </button>
          <Link to="/predict" className="bg-primary text-white px-8 py-3 rounded-2xl text-sm font-bold shadow-2xl shadow-primary/40 hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
            <Zap className="w-4 h-4" /> New Analysis
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Total Predictions', value: stats?.total || 0, icon: Microscope, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Analyses This Month', value: stats?.thisMonth || 0, icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Avg Confidence', value: (stats?.avgConfidence || 0) + '%', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Active Models', value: stats?.models || 0, icon: Activity, color: 'text-violet-400', bg: 'bg-violet-400/10' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-2xl backdrop-blur-xl group hover:border-primary/30 transition-all"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-full border border-white/10">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live</span>
              </div>
            </div>
            <div className="text-4xl font-display font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-white/5 p-10 rounded-[48px] border border-white/10 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/20 rounded-2xl">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-white">Prediction Activity</h3>
            </div>
            <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-bold text-slate-400 outline-none hover:bg-white/10 transition-colors cursor-pointer">
              <option className="bg-black">Last 30 Days</option>
              <option className="bg-black">Last 90 Days</option>
              <option className="bg-black">Year to Date</option>
            </select>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)', padding: '16px' }}
                  itemStyle={{ fontWeight: 'bold', color: '#8b5cf6' }}
                />
                <Area type="monotone" dataKey="val" stroke="#8b5cf6" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 p-10 rounded-[48px] border border-white/10 shadow-2xl backdrop-blur-xl"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-violet-400/20 rounded-2xl">
              <Search className="w-6 h-6 text-violet-400" />
            </div>
            <h3 className="text-2xl font-bold text-white">Top MOA Classes</h3>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moaData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 600 }} width={120} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#000', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}
                  itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }} 
                />
                <Bar dataKey="count" radius={[0, 10, 10, 0]} barSize={24}>
                  {moaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Predictions Table */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 rounded-[48px] border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl"
      >
        <div className="p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/20 rounded-2xl">
              <Database className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold text-white">Recent Predictions</h3>
          </div>
          <Link to="/history" className="text-primary font-bold hover:text-primary/80 transition-colors flex items-center gap-2 group">
            View Full Repository <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <th className="px-10 py-6">Sample ID</th>
                <th className="px-10 py-6">Primary Mechanism</th>
                <th className="px-10 py-6">Confidence</th>
                <th className="px-10 py-6">Model Engine</th>
                <th className="px-10 py-6">Status</th>
                <th className="px-10 py-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recent.map((p, i) => (
                <tr key={i} className="hover:bg-white/5 transition-all group cursor-pointer">
                  <td className="px-10 py-6 font-mono text-sm text-primary font-bold">{p.sample_id}</td>
                  <td className="px-10 py-6">
                    <span className="font-bold text-white group-hover:text-primary transition-colors">{p.top_predictions?.[0]?.moa || 'N/A'}</span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-2 w-24 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${p.top_predictions?.[0]?.confidence || 0}%` }}
                          className="h-full bg-primary rounded-full" 
                        />
                      </div>
                      <span className="text-sm font-mono font-bold text-slate-400">{p.top_predictions?.[0]?.confidence || 0}%</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-sm text-slate-500 font-medium">{p.model_id}</td>
                  <td className="px-10 py-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {p.status}
                    </div>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <Link to={`/results/${p.id}`} className="p-3 bg-white/5 rounded-xl text-slate-500 hover:text-primary hover:bg-primary/10 transition-all inline-block">
                      <ArrowUpRight className="w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              ))}
              {recent.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-10 py-20 text-center">
                    <div className="flex flex-col items-center gap-4 text-slate-500">
                      <Database className="w-12 h-12 opacity-20" />
                      <p className="text-lg font-medium">No recent predictions found.</p>
                      <Link to="/predict" className="text-primary font-bold hover:underline">Start your first analysis</Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};
