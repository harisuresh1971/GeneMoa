import React from 'react';
import { Database, Download, FileSpreadsheet, Table, Info } from 'lucide-react';

export const DatasetPage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Training Dataset</h1>
        <p className="text-slate-400 mt-1">Explore the L1000 Connectivity Map data used to train GeneMOA</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { label: 'Total Samples', val: '1.2M+', icon: Table },
          { label: 'Landmark Genes', val: '978', icon: Database },
          { label: 'MOA Classes', val: '206', icon: Info },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 p-6 rounded-[24px] border border-white/10 shadow-2xl backdrop-blur-xl">
            <div className="p-3 bg-primary/10 rounded-xl w-fit mb-4">
              <stat.icon className="w-6 h-6 text-primary" />
            </div>
            <div className="text-3xl font-display font-bold text-white">{stat.val}</div>
            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white/5 rounded-[32px] border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Data Distribution</h3>
          <button className="flex items-center gap-2 text-sm font-bold text-primary hover:underline">
            <Download className="w-4 h-4" /> Download Metadata
          </button>
        </div>
        <div className="p-8 space-y-6">
          <p className="text-slate-400 leading-relaxed">
            The GeneMOA platform is trained on the LINCS L1000 dataset, which measures the transcriptional response of human cells to chemical and genetic perturbations. Our curated subset focuses on high-quality compound treatments across multiple cell lines (A549, MCF7, PC3, etc.).
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <h4 className="font-bold text-white mb-2">Cell Lines</h4>
              <ul className="text-sm text-slate-500 space-y-1">
                <li>• A549 (Lung Cancer)</li>
                <li>• MCF7 (Breast Cancer)</li>
                <li>• PC3 (Prostate Cancer)</li>
                <li>• VCAP (Prostate Cancer)</li>
              </ul>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <h4 className="font-bold text-white mb-2">Perturbagens</h4>
              <ul className="text-sm text-slate-500 space-y-1">
                <li>• Small Molecule Inhibitors</li>
                <li>• FDA Approved Drugs</li>
                <li>• Clinical Candidates</li>
                <li>• Tool Compounds</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
