import React from 'react';
import { FileText, Book, Search, Code, ExternalLink, ArrowRight } from 'lucide-react';

export const DocsPage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Documentation</h1>
          <p className="text-slate-400 mt-1">Everything you need to master the GeneMOA platform</p>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search docs..." 
            className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-12">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Book className="w-6 h-6 text-primary" /> Getting Started
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: 'Introduction', desc: 'Core concepts and platform overview' },
                { title: 'Quick Start Guide', desc: 'Run your first prediction in 2 minutes' },
                { title: 'Data Preparation', desc: 'How to format your gene expression files' },
                { title: 'Interpreting Results', desc: 'Understanding confidence and XAI' },
              ].map((doc, i) => (
                <button key={i} className="p-6 bg-white/5 border border-white/10 rounded-[24px] text-left hover:border-primary hover:shadow-2xl hover:shadow-primary/10 transition-all group backdrop-blur-xl">
                  <h4 className="font-bold text-white mb-2 group-hover:text-primary transition-colors">{doc.title}</h4>
                  <p className="text-sm text-slate-500">{doc.desc}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Code className="w-6 h-6 text-primary" /> Advanced Guides
            </h2>
            <div className="space-y-4">
              {[
                'Custom Model Training & Fine-tuning',
                'Batch Processing via CLI',
                'Integrating with R/Bioconductor',
                'Enterprise SSO Configuration',
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                  <span className="font-medium text-slate-300">{item}</span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-primary transition-all group-hover:translate-x-1" />
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 text-white p-8 rounded-[32px] shadow-2xl border border-white/10 backdrop-blur-xl">
            <h3 className="text-lg font-bold mb-6">Need Help?</h3>
            <p className="text-sm text-slate-400 mb-8 leading-relaxed">
              Can't find what you're looking for? Our support team and community are here to help.
            </p>
            <div className="space-y-3">
              <button className="w-full py-3 bg-primary rounded-xl font-bold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                Contact Support
              </button>
              <button className="w-full py-3 bg-white/10 rounded-xl font-bold text-sm hover:bg-white/20 transition-all">
                Join Community
              </button>
            </div>
          </div>

          <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-2xl backdrop-blur-xl">
            <h3 className="text-lg font-bold mb-4 text-white">Resources</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors">
                <ExternalLink className="w-4 h-4" /> API Reference
              </a>
              <a href="#" className="flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors">
                <ExternalLink className="w-4 h-4" /> GitHub Repository
              </a>
              <a href="#" className="flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors">
                <ExternalLink className="w-4 h-4" /> Video Tutorials
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
