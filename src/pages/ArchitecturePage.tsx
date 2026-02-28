import React from 'react';
import { Cpu, Layers, BrainCircuit, Zap, ShieldCheck } from 'lucide-react';

export const ArchitecturePage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Model Architecture</h1>
        <p className="text-slate-400 mt-1">Technical specifications of the GeneFormer-MOA Transformer</p>
      </div>

      <div className="bg-white/5 rounded-[40px] p-12 text-white overflow-hidden relative border border-white/10 shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Cpu className="w-64 h-64" />
        </div>
        <div className="relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full text-xs font-bold uppercase tracking-widest border border-primary/20 text-primary">
            <Layers className="w-4 h-4" /> Transformer-Based Encoder
          </div>
          <h2 className="text-4xl font-display font-bold max-w-2xl text-white">GeneFormer-MOA: A Specialized Architecture for Transcriptomics</h2>
          <p className="text-slate-400 text-lg max-w-xl">
            Unlike standard NLP Transformers, GeneFormer is optimized for high-dimensional, non-sequential gene expression vectors using multi-head self-attention to capture complex regulatory networks.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
            {[
              { label: 'Layers', val: '12' },
              { label: 'Heads', val: '8' },
              { label: 'Embedding', val: '512' },
              { label: 'Params', val: '124M' },
            ].map((spec, i) => (
              <div key={i}>
                <div className="text-3xl font-display font-bold text-primary">{spec.val}</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{spec.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-2xl backdrop-blur-xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
            <BrainCircuit className="w-6 h-6 text-primary" /> Attention Mechanism
          </h3>
          <p className="text-slate-400 leading-relaxed">
            Our model uses a modified self-attention mechanism that treats each gene as a token. This allows the model to learn which genes are co-regulated or functionally linked during drug response, providing a superior representation compared to traditional ML models.
          </p>
        </div>
        <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-2xl backdrop-blur-xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
            <Zap className="w-6 h-6 text-amber-500" /> Optimization
          </h3>
          <p className="text-slate-400 leading-relaxed">
            The model is trained using a combination of Cross-Entropy loss for classification and a custom Contrastive loss to ensure that compounds with similar MOAs are mapped closely in the latent space.
          </p>
        </div>
      </div>
    </div>
  );
};
