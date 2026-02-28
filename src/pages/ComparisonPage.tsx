import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Cpu,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const ComparisonPage = () => {
  const models = [
    { name: 'GeneFormer v1', type: 'Transformer', acc: '94.2%', latency: '1.2s', params: '124M', status: 'Production' },
    { name: 'GeneFormer v2', type: 'Transformer', acc: '96.8%', latency: '2.4s', params: '340M', status: 'Beta' },
    { name: 'XGBoost-MOA', type: 'Gradient Boosting', acc: '89.5%', latency: '0.1s', params: 'N/A', status: 'Legacy' },
    { name: 'Ensemble-X', type: 'Hybrid', acc: '97.1%', latency: '3.8s', params: '460M', status: 'Experimental' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Model Comparison</h1>
        <p className="text-slate-400 mt-1">Benchmark different architectures and versions on standard datasets</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {[
          { label: 'Best Accuracy', val: '97.1%', icon: TrendingUp, color: 'text-emerald-500 bg-emerald-500/10' },
          { label: 'Avg Latency', val: '1.8s', icon: Zap, color: 'text-amber-500 bg-amber-500/10' },
          { label: 'Total Models', val: '12', icon: Cpu, color: 'text-primary bg-primary/10' },
          { label: 'Verified', val: '8', icon: ShieldCheck, color: 'text-violet-400 bg-violet-400/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 p-6 rounded-[24px] border border-white/10 shadow-2xl backdrop-blur-xl group hover:border-primary/30 transition-all">
            <div className={`p-3 rounded-xl w-fit mb-4 ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-display font-bold text-white">{stat.val}</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white/5 rounded-[32px] border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <th className="px-8 py-4">Model Name</th>
                <th className="px-8 py-4">Architecture</th>
                <th className="px-8 py-4">Accuracy (mAP)</th>
                <th className="px-8 py-4">Latency</th>
                <th className="px-8 py-4">Parameters</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {models.map((m, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="font-bold text-white group-hover:text-primary transition-colors">{m.name}</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">v{i + 1}.0.2</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-slate-400 border border-white/5">{m.type}</span>
                  </td>
                  <td className="px-8 py-6 font-mono font-bold text-primary">{m.acc}</td>
                  <td className="px-8 py-6 text-sm text-slate-500">{m.latency}</td>
                  <td className="px-8 py-6 text-sm text-slate-500">{m.params}</td>
                  <td className="px-8 py-6">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      m.status === 'Production' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 
                      m.status === 'Beta' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-white/5 text-slate-500 border border-white/5'
                    }`}>
                      {m.status === 'Production' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {m.status}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-primary text-sm font-bold hover:underline">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
