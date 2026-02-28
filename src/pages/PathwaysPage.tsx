import React from 'react';
import { motion } from 'framer-motion';
import { 
  Microscope, 
  Network, 
  Activity, 
  Dna, 
  ArrowRight,
  Database,
  ExternalLink
} from 'lucide-react';

export const PathwaysPage = () => {
  const pathways = [
    { name: 'Cell Cycle Regulation', score: 0.92, genes: 45, status: 'Enriched' },
    { name: 'Apoptosis Signaling', score: 0.85, genes: 32, status: 'Enriched' },
    { name: 'PI3K/Akt Pathway', score: 0.78, genes: 28, status: 'Moderately Enriched' },
    { name: 'DNA Repair Mechanisms', score: 0.65, genes: 54, status: 'Baseline' },
    { name: 'Metabolic Reprogramming', score: 0.42, genes: 12, status: 'Baseline' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Pathway Analysis</h1>
        <p className="text-slate-400 mt-1">Map MOA predictions to canonical biological pathways (KEGG, Reactome)</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Pathway List */}
          <div className="bg-white/5 rounded-[32px] border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl">
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <h3 className="text-xl font-bold text-white">Enriched Pathways</h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-slate-500 uppercase border border-white/5">KEGG</span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-slate-500 uppercase border border-white/5">Reactome</span>
              </div>
            </div>
            <div className="divide-y divide-white/5">
              {pathways.map((p, i) => (
                <div key={i} className="p-6 hover:bg-white/5 transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${p.score > 0.8 ? 'bg-emerald-500/20 text-emerald-500' : 'bg-white/5 text-slate-500'}`}>
                      <Network className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white group-hover:text-primary transition-colors">{p.name}</h4>
                      <p className="text-xs text-slate-500">{p.genes} genes involved in this pathway</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <div className="text-sm font-bold text-white">{(p.score * 100).toFixed(0)}%</div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Enrichment</div>
                    </div>
                    <button className="p-2 text-slate-500 group-hover:text-primary transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-black text-white p-8 rounded-[32px] shadow-2xl border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-all duration-1000" />
            <h3 className="text-xl font-bold mb-6 relative z-10">Pathway Connectivity</h3>
            <div className="aspect-square bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:border-primary/30 transition-colors">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full blur-sm" />
                <div className="absolute top-3/4 left-2/3 w-3 h-3 bg-violet-400 rounded-full blur-sm" />
                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full blur-sm" />
              </div>
              <div className="text-center p-6 relative z-10">
                <Activity className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
                <p className="text-xs text-slate-400 font-mono">Real-time pathway mapping active...</p>
              </div>
            </div>
            <div className="mt-8 space-y-4 relative z-10">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Total Pathways</span>
                <span className="font-bold">1,245</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Active Connections</span>
                <span className="font-bold">8,920</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-2xl backdrop-blur-xl">
            <h3 className="text-lg font-bold mb-4 text-white">External Databases</h3>
            <div className="space-y-3">
              {[
                { name: 'KEGG Pathway', url: '#' },
                { name: 'Reactome', url: '#' },
                { name: 'Gene Ontology', url: '#' },
                { name: 'WikiPathways', url: '#' }
              ].map((db, i) => (
                <a key={i} href={db.url} className="flex items-center justify-between p-3 bg-white/5 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/10 hover:text-white transition-all border border-white/5">
                  {db.name} <ExternalLink className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
