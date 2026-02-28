import React from 'react';
import { GitBranch, Zap, Shield, Bug, Star } from 'lucide-react';

export const ChangelogPage = () => {
  const updates = [
    {
      version: 'v4.2.0',
      date: 'Feb 28, 2024',
      type: 'Major Update',
      changes: [
        { icon: Zap, text: 'Introduced GeneFormer-MOA v2 with 94.2% mAP' },
        { icon: Star, text: 'New Gene Attention Viewer for Transformer transparency' },
        { icon: Shield, text: 'Enterprise SSO (SAML/OAuth2) support' }
      ]
    },
    {
      version: 'v4.1.5',
      date: 'Jan 15, 2024',
      type: 'Maintenance',
      changes: [
        { icon: Bug, text: 'Fixed memory leak in batch processing workers' },
        { icon: Zap, text: 'Optimized SHAP calculation latency by 30%' }
      ]
    },
    {
      version: 'v4.0.0',
      date: 'Dec 1, 2023',
      type: 'Major Release',
      changes: [
        { icon: Star, text: 'Initial release of the GeneMOA Intelligence Platform' },
        { icon: GitBranch, text: 'L1000 dataset integration' }
      ]
    }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12 pb-20">
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Version & Changelog</h1>
        <p className="text-slate-400 mt-1">Track the evolution of the GeneMOA platform</p>
      </div>

      <div className="space-y-12">
        {updates.map((update, i) => (
          <div key={i} className="relative pl-12">
            {i < updates.length - 1 && <div className="absolute left-[23px] top-8 bottom-[-48px] w-0.5 bg-white/5" />}
            <div className="absolute left-0 top-0 w-12 h-12 bg-slate-900 border-2 border-white/10 rounded-full flex items-center justify-center z-10">
              <GitBranch className="w-6 h-6 text-primary" />
            </div>
            <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-2xl space-y-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">{update.version}</h3>
                  <p className="text-sm text-slate-500 font-medium">{update.date}</p>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                  update.type === 'Major Update' ? 'bg-primary/20 text-primary' : 'bg-white/5 text-slate-500'
                }`}>
                  {update.type}
                </span>
              </div>
              <div className="space-y-4">
                {update.changes.map((change, j) => (
                  <div key={j} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <change.icon className="w-5 h-5 text-slate-500" />
                    <span className="text-sm font-medium text-slate-300">{change.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
