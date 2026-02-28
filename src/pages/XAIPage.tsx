import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Info, 
  Activity, 
  BarChart3, 
  Microscope,
  ArrowRight,
  ShieldCheck,
  BrainCircuit
} from 'lucide-react';

export const XAIPage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-full text-xs font-bold uppercase tracking-widest border border-primary/20">
          <Zap className="w-4 h-4" /> Explainable AI (XAI)
        </div>
        <h1 className="text-5xl font-display font-bold text-white">Decoding the Black Box</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          GeneMOA doesn't just predict; it explains. Our XAI suite provides biological transparency for every discovery.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: 'SHAP Values',
            desc: 'Quantify the contribution of each gene to the final prediction using game-theoretic Shapley values.',
            icon: BarChart3,
            color: 'bg-primary/20 text-primary'
          },
          {
            title: 'Attention Maps',
            desc: 'Visualize which gene-gene interactions the Transformer model focused on during inference.',
            icon: BrainCircuit,
            color: 'bg-violet-400/20 text-violet-400'
          },
          {
            title: 'Biological Narratives',
            desc: 'LLM-powered synthesis of predictions into human-readable biological rationales.',
            icon: Activity,
            color: 'bg-emerald-500/20 text-emerald-500'
          }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-2xl backdrop-blur-xl hover:border-primary/30 transition-all group"
          >
            <div className={`p-4 rounded-2xl w-fit mb-6 ${feature.color}`}>
              <feature.icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed mb-6">{feature.desc}</p>
            <button className="flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all">
              Learn More <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="bg-white/5 rounded-[48px] p-12 text-white border border-white/10 relative overflow-hidden backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-display font-bold">Why XAI Matters in Drug Discovery</h2>
            <div className="space-y-4">
              {[
                { title: 'Regulatory Compliance', desc: 'Meet FDA/EMA requirements for model interpretability in clinical submissions.', icon: ShieldCheck },
                { title: 'Target Validation', desc: 'Identify specific genes that drive MOA for secondary target validation.', icon: Microscope },
                { title: 'Trust & Adoption', desc: 'Bridge the gap between computational models and bench scientists.', icon: BrainCircuit }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-black rounded-[32px] aspect-video border border-white/10 flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-center p-8 relative z-10">
              <Zap className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
              <p className="text-slate-400 font-mono text-sm">XAI Visualization Engine v4.0.2 Initializing...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
