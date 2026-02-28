import React from 'react';
import { Briefcase, TrendingUp, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export const CaseStudiesPage = () => {
  const studies = [
    {
      title: 'Accelerating Oncology Discovery at BioPharma Inc.',
      client: 'BioPharma Global',
      impact: '40% Reduction in Screening Time',
      desc: 'How a top-10 pharmaceutical company used GeneMOA to prioritize 5,000 compounds for their lung cancer pipeline.',
      tags: ['Oncology', 'High-Throughput']
    },
    {
      title: 'Repurposing FDA Drugs for Rare Neurological Disorders',
      client: 'NeuroFound Lab',
      impact: '2 Novel Leads Identified',
      desc: 'Academic researchers identified two existing compounds with previously unknown neuroprotective mechanisms.',
      tags: ['Rare Disease', 'Repurposing']
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Case Studies</h1>
        <p className="text-slate-400 mt-1">Real-world success stories from the GeneMOA community</p>
      </div>

      <div className="grid gap-12">
        {studies.map((study, i) => (
          <div key={i} className="bg-white/5 rounded-[48px] border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row backdrop-blur-xl">
            <div className="md:w-1/3 bg-primary/10 p-12 text-white flex flex-col justify-between border-r border-white/5">
              <div>
                <div className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Impact Metric</div>
                <div className="text-3xl font-display font-bold mb-2 text-white">{study.impact}</div>
                <div className="text-slate-400 text-sm">{study.client}</div>
              </div>
              <div className="flex gap-2">
                {study.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-300">{tag}</span>
                ))}
              </div>
            </div>
            <div className="md:w-2/3 p-12 space-y-6">
              <h3 className="text-3xl font-display font-bold text-white">{study.title}</h3>
              <p className="text-slate-400 text-lg leading-relaxed">{study.desc}</p>
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                    <Clock className="w-4 h-4" /> 6 Month Project
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-500">
                    <CheckCircle2 className="w-4 h-4" /> Fully Implemented
                  </div>
                </div>
                <button className="flex items-center gap-2 font-bold text-primary hover:gap-3 transition-all">
                  Read Full Story <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
