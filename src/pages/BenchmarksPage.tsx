import React from 'react';
import { TrendingUp, CheckCircle2, BarChart, Activity, ShieldCheck } from 'lucide-react';

export const BenchmarksPage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Results & Benchmarks</h1>
        <p className="text-slate-400 mt-1">Performance validation against industry standards</p>
      </div>

      <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-2xl backdrop-blur-xl">
        <h3 className="text-xl font-bold mb-8 text-white">Performance Summary</h3>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { label: 'mAP (Mean Average Precision)', val: '0.942', icon: TrendingUp },
            { label: 'Top-1 Accuracy', val: '86.5%', icon: CheckCircle2 },
            { label: 'Top-5 Accuracy', val: '97.2%', icon: BarChart },
            { label: 'F1 Score', val: '0.891', icon: Activity },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="p-3 bg-white/5 rounded-2xl w-fit mx-auto mb-4 border border-white/5">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-display font-bold text-white">{stat.val}</div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-2xl backdrop-blur-xl">
          <h3 className="text-xl font-bold mb-6 text-white">Validation Strategy</h3>
          <p className="text-slate-400 leading-relaxed mb-6">
            We employ a rigorous 5-fold cross-validation strategy, ensuring that compounds in the test set are never seen during training. We also perform "leave-one-cell-line-out" validation to ensure model generalizability across different biological contexts.
          </p>
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-500">
            <ShieldCheck className="w-5 h-5" /> Verified by Independent Audit
          </div>
        </div>
        <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-2xl backdrop-blur-xl">
          <h3 className="text-xl font-bold mb-6 text-white">Comparison to Baseline</h3>
          <div className="space-y-4">
            {[
              { name: 'Random Forest', score: '0.72' },
              { name: 'Deep Neural Network (MLP)', score: '0.81' },
              { name: 'XGBoost', score: '0.84' },
              { name: 'GeneFormer-MOA', score: '0.94', highlight: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-32 text-sm font-bold text-slate-400">{item.name}</div>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className={`h-full rounded-full ${item.highlight ? 'bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]' : 'bg-slate-700'}`} 
                    style={{ width: `${parseFloat(item.score) * 100}%` }} 
                  />
                </div>
                <div className={`text-sm font-mono font-bold ${item.highlight ? 'text-primary' : 'text-slate-500'}`}>{item.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
