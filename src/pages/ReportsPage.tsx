import React from 'react';
import { FileDown, FileText, Download, Filter, Search, Calendar } from 'lucide-react';

export const ReportsPage = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Research Reports</h1>
          <p className="text-slate-400 mt-1">Generate and download comprehensive analysis summaries</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 rounded-[32px] border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Recent Reports</h3>
              <div className="flex gap-2">
                <button className="p-2 bg-white/5 rounded-lg text-slate-400 hover:text-primary transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="divide-y divide-white/5">
              {[
                { name: 'Monthly Summary - Feb 2024', date: 'Feb 28, 2024', size: '2.4 MB', type: 'PDF' },
                { name: 'Batch_Inference_Results_Q1', date: 'Feb 15, 2024', size: '12.8 MB', type: 'CSV' },
                { name: 'Oncology_Screen_Full_Report', date: 'Jan 30, 2024', size: '4.1 MB', type: 'PDF' },
              ].map((report, i) => (
                <div key={i} className="p-6 hover:bg-white/5 transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-2xl text-slate-500 group-hover:text-primary transition-colors">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{report.name}</h4>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {report.date}</span>
                        <span>•</span>
                        <span>{report.size}</span>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                    <Download className="w-4 h-4" /> {report.type}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-2xl backdrop-blur-xl">
            <h3 className="text-xl font-bold mb-6 text-white">Custom Report</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Date Range</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white outline-none focus:ring-2 focus:ring-primary/20">
                  <option className="bg-slate-900">Last 7 Days</option>
                  <option className="bg-slate-900">Last 30 Days</option>
                  <option className="bg-slate-900">Custom Range</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Format</label>
                <div className="grid grid-cols-2 gap-2">
                  <button className="py-3 bg-primary text-white rounded-xl text-xs font-bold shadow-lg shadow-primary/20">PDF Report</button>
                  <button className="py-3 bg-white/5 text-slate-400 border border-white/5 rounded-xl text-xs font-bold hover:bg-white/10 transition-all">CSV Data</button>
                </div>
              </div>
              <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                <FileDown className="w-5 h-5" /> Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
