import React from 'react';
import { Info, Users, Globe, Award, Heart } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-display font-bold text-white">About GeneMOA</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          We are on a mission to accelerate drug discovery through the power of foundation models and explainable AI.
        </p>
      </div>

      <div className="bg-white/5 p-12 rounded-[48px] border border-white/10 shadow-2xl space-y-8 backdrop-blur-xl">
        <div className="prose prose-invert max-w-none">
          <h2 className="text-3xl font-display font-bold text-white">Our Vision</h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            Founded by a team of computational biologists and AI engineers, GeneMOA was born out of a simple observation: the bottleneck in drug discovery isn't just data generation—it's data interpretation. We built GeneMOA to bridge the gap between raw transcriptomic data and biological insight.
          </p>
          <p className="text-lg text-slate-400 leading-relaxed">
            By leveraging Transformer architectures trained on millions of gene expression profiles, we provide researchers with a powerful lens to see the hidden mechanisms of action behind every compound.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 pt-8 border-t border-white/5">
          <div className="text-center group">
            <div className="p-4 bg-primary/20 rounded-3xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Globe className="w-8 h-8 text-primary" />
            </div>
            <h4 className="font-bold text-white">Global Impact</h4>
            <p className="text-sm text-slate-500 mt-2">Used by 200+ labs worldwide</p>
          </div>
          <div className="text-center group">
            <div className="p-4 bg-emerald-500/20 rounded-3xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Award className="w-8 h-8 text-emerald-500" />
            </div>
            <h4 className="font-bold text-white">Scientific Rigor</h4>
            <p className="text-sm text-slate-500 mt-2">Peer-reviewed methodology</p>
          </div>
          <div className="text-center group">
            <div className="p-4 bg-violet-400/20 rounded-3xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Heart className="w-8 h-8 text-violet-400" />
            </div>
            <h4 className="font-bold text-white">Open Science</h4>
            <p className="text-sm text-slate-500 mt-2">Committed to transparency</p>
          </div>
        </div>
      </div>
    </div>
  );
};
