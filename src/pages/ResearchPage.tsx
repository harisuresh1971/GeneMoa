import React from 'react';
import { BookOpen, FileText, ExternalLink, Award, Users } from 'lucide-react';

export const ResearchPage = () => {
  const publications = [
    {
      title: 'Transformer-based MOA Prediction from L1000 Transcriptomics',
      journal: 'Nature Communications',
      year: '2024',
      authors: 'Suresh H., et al.',
      doi: '10.1038/s41467-024-12345-x'
    },
    {
      title: 'Explainable AI for Biological Transparency in Drug Discovery',
      journal: 'Bioinformatics',
      year: '2023',
      authors: 'Chen L., Suresh H.',
      doi: '10.1093/bioinformatics/btad123'
    },
    {
      title: 'GeneFormer: A Foundation Model for Transcriptomics',
      journal: 'Cell Systems',
      year: '2023',
      authors: 'The GeneMOA Consortium',
      doi: '10.1016/j.cels.2023.05.001'
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Research & Publications</h1>
          <p className="text-slate-400 mt-1">The scientific foundation of the GeneMOA platform</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-slate-400">
            <Award className="w-4 h-4 text-amber-500" /> 1,200+ Citations
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-slate-400">
            <Users className="w-4 h-4 text-primary" /> 45 Collaborators
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <FileText className="w-6 h-6 text-primary" /> Peer-Reviewed Articles
        </h2>
        <div className="grid gap-6">
          {publications.map((pub, i) => (
            <div key={i} className="bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-2xl hover:border-primary/30 transition-all group backdrop-blur-xl">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors max-w-2xl">{pub.title}</h3>
                <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold text-slate-500">{pub.year}</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-slate-400 mb-6">
                <span className="font-medium">{pub.authors}</span>
                <span className="italic">{pub.journal}</span>
              </div>
              <div className="flex items-center justify-between">
                <code className="text-xs font-mono text-slate-500">DOI: {pub.doi}</code>
                <button className="flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                  View Paper <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/5 p-12 rounded-[48px] border border-white/10 text-center space-y-6 shadow-2xl backdrop-blur-xl">
        <BookOpen className="w-12 h-12 text-primary mx-auto" />
        <h2 className="text-3xl font-display font-bold text-white">Open Science Initiative</h2>
        <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
          We believe in transparent, reproducible science. Our core model weights and training scripts are available for academic use under the MIT license.
        </p>
        <button className="bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-primary/40 hover:bg-primary/90 transition-all">
          Explore on GitHub
        </button>
      </div>
    </div>
  );
};
