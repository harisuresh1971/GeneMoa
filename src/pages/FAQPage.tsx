import React from 'react';
import { HelpCircle, ChevronDown, Search, MessageCircle } from 'lucide-react';

export const FAQPage = () => {
  const faqs = [
    {
      q: 'What is the L1000 dataset?',
      a: 'The L1000 dataset is a high-throughput transcriptomics dataset that measures the expression of 978 landmark genes, which are used to infer the expression of the remaining ~20,000 genes in the human genome.'
    },
    {
      q: 'How accurate are the MOA predictions?',
      a: 'Our GeneFormer-MOA v2 model achieves a mean Average Precision (mAP) of 0.942 on independent validation sets, significantly outperforming traditional machine learning baselines.'
    },
    {
      q: 'Can I use my own custom model?',
      a: 'Yes, enterprise users can upload their own model weights or fine-tune our base models on their proprietary datasets through the Admin Panel.'
    },
    {
      q: 'Is my data secure?',
      a: 'Absolutely. We use end-to-end encryption and isolated cloud instances for every research organization. Your data is never shared or used to train public models.'
    },
    {
      q: 'What file formats are supported?',
      a: 'We support CSV, XLSX, and H5AD (AnnData) formats. Our platform automatically handles normalization and landmark gene mapping.'
    }
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-display font-bold text-white">Frequently Asked Questions</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Everything you need to know about the platform and our methodology.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
        <input 
          type="text" 
          placeholder="Search for answers..." 
          className="w-full bg-white/5 border border-white/10 rounded-[24px] py-5 pl-16 pr-8 text-lg text-white outline-none focus:ring-4 focus:ring-primary/10 transition-all shadow-2xl backdrop-blur-xl"
        />
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white/5 rounded-[32px] border border-white/10 shadow-2xl overflow-hidden group backdrop-blur-xl">
            <button className="w-full p-8 text-left flex items-center justify-between hover:bg-white/5 transition-all">
              <span className="text-xl font-bold text-white">{faq.q}</span>
              <ChevronDown className="w-6 h-6 text-slate-500 group-hover:text-primary transition-all" />
            </button>
            <div className="px-8 pb-8 text-slate-400 leading-relaxed text-lg">
              {faq.a}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-primary/10 p-12 rounded-[48px] border border-primary/20 text-center space-y-6">
        <MessageCircle className="w-12 h-12 text-primary mx-auto" />
        <h2 className="text-3xl font-display font-bold text-white">Still have questions?</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Our technical support team is available 24/7 to assist with complex biological or technical inquiries.
        </p>
        <button className="bg-primary text-white px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-primary/40 hover:bg-primary/90 transition-all">
          Contact Support Team
        </button>
      </div>
    </div>
  );
};
