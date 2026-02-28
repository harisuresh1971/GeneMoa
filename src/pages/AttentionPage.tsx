import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  BrainCircuit, 
  Filter, 
  Maximize2, 
  Download,
  Info,
  Zap
} from 'lucide-react';

export const AttentionPage = () => {
  const [selectedLayer, setSelectedLayer] = useState(1);
  const [selectedHead, setSelectedHead] = useState(1);

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Gene Attention Viewer</h1>
          <p className="text-slate-400 mt-1">Visualize internal Transformer weights and gene interactions</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm font-bold text-white hover:bg-white/10 transition-all">
            <Download className="w-4 h-4" /> Export Map
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <div className="bg-white/5 p-6 rounded-[24px] border border-white/10 shadow-2xl backdrop-blur-xl">
            <h3 className="font-bold text-white mb-6 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-primary" /> Model Controls
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Transformer Layer</label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(l => (
                    <button 
                      key={l}
                      onClick={() => setSelectedLayer(l)}
                      className={`py-2 rounded-lg text-xs font-bold transition-all ${selectedLayer === l ? 'bg-primary text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                    >
                      L{l}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Attention Head</label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(h => (
                    <button 
                      key={h}
                      onClick={() => setSelectedHead(h)}
                      className={`py-2 rounded-lg text-xs font-bold transition-all ${selectedHead === h ? 'bg-violet-400 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                    >
                      H{h}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary/10 p-6 rounded-[24px] border border-primary/20">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-primary shrink-0" />
              <p className="text-xs text-primary/80 leading-relaxed font-medium">
                Attention weights indicate how much the model "focuses" on a gene relative to others. Darker connections represent stronger biological associations learned by the model.
              </p>
            </div>
          </div>
        </div>

        {/* Visualization Area */}
        <div className="lg:col-span-3 bg-black rounded-[32px] p-12 relative overflow-hidden min-h-[600px] flex items-center justify-center border border-white/10">
          <div className="absolute top-8 right-8 flex gap-2">
            <button className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-all">
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
          
          {/* Simulated Attention Matrix */}
          <div className="relative w-full max-w-2xl aspect-square grid grid-cols-10 gap-1">
            {Array.from({ length: 100 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: Math.random() * 0.8 + 0.2, scale: 1 }}
                transition={{ delay: i * 0.005 }}
                className="bg-primary rounded-sm"
                style={{ opacity: Math.random() }}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <Zap className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/40 font-mono text-sm uppercase tracking-widest">Rendering Attention Map...</p>
                <p className="text-white/20 font-mono text-[10px] mt-2">Layer {selectedLayer} | Head {selectedHead}</p>
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            {['BRCA1', 'TP53', 'EGFR', 'MYC', 'PTEN'].map(g => (
              <span key={g} className="text-[10px] font-mono text-white/40">{g}</span>
            ))}
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
            {['BRCA1', 'TP53', 'EGFR', 'MYC', 'PTEN'].map(g => (
              <span key={g} className="text-[10px] font-mono text-white/40">{g}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
