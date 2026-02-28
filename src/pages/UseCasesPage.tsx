import React from 'react';
import { Globe, Microscope, Zap, Activity, ArrowRight } from 'lucide-react';

export const UseCasesPage = () => {
  const cases = [
    {
      title: 'De novo Drug Discovery',
      desc: 'Screen thousands of novel compounds to identify potential MOAs before moving to expensive in vitro assays.',
      icon: Microscope,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Drug Repurposing',
      desc: 'Analyze existing drugs against new cell lines to discover secondary mechanisms and potential new indications.',
      icon: Globe,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: 'Toxicity Prediction',
      desc: 'Identify off-target effects early by detecting MOAs associated with known toxic pathways.',
      icon: Zap,
      color: 'bg-amber-50 text-amber-600'
    },
    {
      title: 'Precision Medicine',
      desc: 'Tailor treatments by analyzing patient-specific gene expression responses to various therapeutic options.',
      icon: Activity,
      color: 'bg-violet-50 text-violet-600'
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-display font-bold text-white">Industry Use Cases</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          From academic research to global pharmaceutical pipelines, GeneMOA accelerates discovery across the board.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {cases.map((c, i) => (
          <div key={i} className="bg-white/5 p-10 rounded-[40px] border border-white/10 shadow-2xl hover:border-primary/30 transition-all group backdrop-blur-xl">
            <div className={`p-4 rounded-2xl w-fit mb-6 bg-primary/10 text-primary`}>
              <c.icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{c.title}</h3>
            <p className="text-slate-400 leading-relaxed mb-8">{c.desc}</p>
            <button className="flex items-center gap-2 font-bold text-primary group-hover:gap-3 transition-all">
              Read Case Study <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
