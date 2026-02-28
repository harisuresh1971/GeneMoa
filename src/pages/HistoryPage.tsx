import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock,
  FileText,
  MoreVertical,
  Trash2,
  ChevronRight,
  Database
} from 'lucide-react';
import api from '../lib/api';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export const HistoryPage = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/predictions');
        setHistory(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const filteredHistory = history.filter(p => 
    p.sample_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.top_predictions?.[0]?.moa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-white">Analysis History</h1>
          <p className="text-slate-400 text-lg mt-1">Review and manage your past MOA predictions</p>
        </div>
        <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-sm font-bold text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95">
          <Download className="w-4 h-4" /> Export All Data
        </button>
      </div>

      <div className="bg-white/5 p-6 rounded-[32px] border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center gap-6">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text"
            placeholder="Search by Sample ID, Mechanism, or Model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-white outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium placeholder:text-slate-600"
          />
        </div>
        <button className="p-4 bg-white/5 border border-white/5 rounded-2xl text-slate-400 hover:text-primary hover:bg-primary/10 transition-all group">
          <Filter className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 rounded-[48px] border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <th className="px-10 py-6">Timestamp</th>
                <th className="px-10 py-6">Sample Identifier</th>
                <th className="px-10 py-6">Primary Mechanism</th>
                <th className="px-10 py-6">Confidence</th>
                <th className="px-10 py-6">Model Engine</th>
                <th className="px-10 py-6">Status</th>
                <th className="px-10 py-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={7} className="px-10 py-8 bg-white/[0.02]" />
                  </tr>
                ))
              ) : filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-10 py-32 text-center">
                    <div className="flex flex-col items-center gap-6">
                      <div className="p-6 bg-white/5 rounded-[32px] border border-white/5">
                        <Database className="w-12 h-12 text-slate-700" />
                      </div>
                      <p className="text-slate-500 text-xl font-medium">No analyses found matching your search.</p>
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="text-primary font-bold hover:underline"
                      >
                        Clear search filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredHistory.map((p, i) => (
                  <tr key={p.id} className="hover:bg-white/5 transition-all group cursor-pointer">
                    <td className="px-10 py-6">
                      <div className="text-sm font-bold text-white">{format(new Date(p.created_at), 'MMM d, yyyy')}</div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">{format(new Date(p.created_at), 'HH:mm:ss')}</div>
                    </td>
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
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                        <Link 
                          to={`/results/${p.id}`}
                          className="p-3 bg-white/5 rounded-xl text-slate-500 hover:text-primary hover:bg-primary/10 transition-all"
                        >
                          <ArrowUpRight className="w-5 h-5" />
                        </Link>
                        <button className="p-3 bg-white/5 rounded-xl text-slate-500 hover:text-error hover:bg-error/10 transition-all">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};
