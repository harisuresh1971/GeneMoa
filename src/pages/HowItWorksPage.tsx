import React from 'react';
import { HelpCircle, Upload, Cpu, Zap, FileText, ArrowRight } from 'lucide-react';

export const HowItWorksPage = () => {
  const steps = [
    {
      title: 'Data Upload',
      desc: 'Upload your gene expression data (L1000 landmark genes or full transcriptome) in CSV or XLSX format.',
      icon: Upload,
      color: 'bg-primary/20 text-primary'
    },
    {
      title: 'Transformer Inference',
      desc: 'Our GeneFormer-MOA model processes the expression profile through 12 layers of self-attention.',
      icon: Cpu,
      color: 'bg-violet-400/20 text-violet-400'
    },
    {
      title: 'XAI Generation',
      desc: 'The platform calculates SHAP values and attention maps to identify the biological drivers of the prediction.',
      icon: Zap,
      color: 'bg-amber-500/20 text-amber-500'
    },
    {
      title: 'Insight Synthesis',
      desc: 'A comprehensive report is generated, including ranked MOAs, pathway enrichment, and AI narratives.',
      icon: FileText,
      color: 'bg-emerald-500/20 text-emerald-500'
    }
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-display font-bold text-white">How It Works</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          A seamless pipeline from raw transcriptomics to biological discovery.
        </p>
      </div>

      <div className="space-y-8">
        {steps.map((step, i) => (
          <div key={i} className="flex gap-8 items-start group">
            <div className="flex flex-col items-center">
              <div className={`p-4 rounded-3xl shadow-2xl group-hover:scale-110 transition-transform border border-white/10 backdrop-blur-xl ${step.color}`}>
                <step.icon className="w-8 h-8" />
              </div>
              {i < steps.length - 1 && <div className="w-1 h-20 bg-white/5 rounded-full my-2" />}
            </div>
            <div className="flex-1 pt-2">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
              <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white/5 rounded-[48px] p-12 text-white text-center space-y-8 border border-white/10 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <h2 className="text-3xl font-display font-bold relative z-10">Ready to start your analysis?</h2>
        <button className="bg-primary text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-3 mx-auto relative z-10">
          Launch Prediction Engine <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};
