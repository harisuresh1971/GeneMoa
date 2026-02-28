import React from 'react';
import { Save, Search, Filter, ArrowUpRight, Clock, Trash2 } from 'lucide-react';

export const SavedAnalysesPage = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Saved Analyses</h1>
          <p className="text-slate-400 mt-1">Quick access to your pinned and bookmarked predictions</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'BRCA1 Inhibitor Screen', date: '2 days ago', moa: 'DNA Repair', confidence: 98 },
          { title: 'Novel Kinase Candidate', date: '1 week ago', moa: 'Kinase Inhibitor', confidence: 92 },
          { title: 'Toxicity Check - Batch 4', date: '2 weeks ago', moa: 'Multiple', confidence: 85 },
        ].map((item, i) => (
          <div key={i} className="bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-2xl hover:border-primary/30 transition-all group backdrop-blur-xl">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                <Save className="w-6 h-6 text-primary" />
              </div>
              <button className="p-2 text-slate-500 hover:text-error transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
              <Clock className="w-3 h-3" /> {item.date}
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between mb-6">
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Top MOA</div>
                <div className="text-sm font-bold text-white">{item.moa}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Conf.</div>
                <div className="text-sm font-bold text-primary">{item.confidence}%</div>
              </div>
            </div>
            <button className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
              Open Analysis <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
