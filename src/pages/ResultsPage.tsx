import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { 
  CheckCircle2, 
  Clock, 
  Zap, 
  ArrowLeft, 
  Download, 
  Share2, 
  Info,
  ChevronRight,
  Microscope,
  Activity,
  BarChart3,
  FileText,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import api from '../lib/api';
import ReactMarkdown from 'react-markdown';

export const ResultsPage = () => {
  const { id } = useParams();
  const [result, setResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('summary');
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await api.get(`/predictions/${id}`);
        setResult(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchResult();
  }, [id]);

  const handleExportPDF = () => {
    if (!result) {
      alert('No result data available to export.');
      return;
    }
    setExporting(true);
    
    try {
      const doc = new jsPDF();
      
      // Header
      doc.setFillColor(139, 92, 246); // Violet
      doc.rect(0, 0, 210, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.text('GeneMOA Analysis Report', 15, 25);
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text(`Report ID: ${result.id || 'N/A'}`, 15, 50);
      doc.text(`Sample ID: ${result.sample_id || 'N/A'}`, 15, 55);
      doc.text(`Date: ${result.created_at ? new Date(result.created_at).toLocaleString() : new Date().toLocaleString()}`, 15, 60);
      
      // Top Prediction
      doc.setFontSize(16);
      doc.text('Top Predicted Mechanism of Action', 15, 75);
      doc.setFontSize(12);
      doc.text(`MOA: ${result.top_predictions?.[0]?.moa || 'Unknown'}`, 15, 85);
      doc.text(`Confidence: ${result.top_predictions?.[0]?.confidence || 0}%`, 15, 92);
      
      // Predictions Table
      const tableData = (result.top_predictions || []).map((p: any, i: number) => [
        i + 1,
        p.moa || 'Unknown',
        `${p.confidence || 0}%`
      ]);
      
      if (tableData.length > 0) {
        autoTable(doc, {
          startY: 105,
          head: [['Rank', 'Mechanism of Action', 'Confidence']],
          body: tableData,
          theme: 'striped',
          headStyles: { fillColor: [139, 92, 246] }
        });
      }
      
      // Narrative
      const finalY = (doc as any).lastAutoTable?.finalY || 105;
      doc.setFontSize(16);
      doc.text('Biological Rationale', 15, finalY + 15);
      doc.setFontSize(10);
      const narrative = result.shap_values?.narrative || 'No narrative available.';
      const splitText = doc.splitTextToSize(narrative, 180);
      
      // Check if we need a new page for narrative
      if (finalY + 25 + (splitText.length * 5) > 280) {
        doc.addPage();
        doc.text(splitText, 15, 20);
      } else {
        doc.text(splitText, 15, finalY + 25);
      }
      
      doc.save(`GeneMOA_Report_${result.sample_id || 'Analysis'}.pdf`);
      alert('Report exported successfully!');
    } catch (error: any) {
      console.error('Export failed:', error);
      alert(`Export failed: ${error.message || 'Unknown error'}`);
    } finally {
      setExporting(false);
    }
  };

  if (!result) return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-slate-500 font-medium animate-pulse">Loading Analysis Data...</p>
      </div>
    </div>
  );

  const topMoa = result.top_predictions?.[0];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-10 pb-20">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="flex items-center gap-6">
          <Link to="/history" className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all group">
            <ArrowLeft className="w-6 h-6 text-slate-400 group-hover:text-white group-hover:-translate-x-1 transition-all" />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-4xl font-display font-bold text-white">Analysis Results</h1>
              <div className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full border border-primary/20">
                Verified
              </div>
            </div>
            <p className="text-slate-400 text-lg">Sample ID: <span className="font-mono font-bold text-primary">{result.sample_id}</span></p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl text-sm font-bold text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button 
            onClick={handleExportPDF}
            disabled={exporting}
            className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-2xl text-sm font-bold shadow-2xl shadow-primary/40 hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            Export Report
          </button>
        </div>
      </motion.div>

      {/* Top Prediction Card */}
      <div className="grid lg:grid-cols-3 gap-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-white/5 p-12 rounded-[48px] border border-white/10 shadow-2xl relative overflow-hidden group backdrop-blur-xl"
        >
          <div className="absolute top-0 right-0 p-10">
            <div className="bg-emerald-500/10 text-emerald-500 px-5 py-2 rounded-2xl flex items-center gap-2 font-bold text-sm border border-emerald-500/20 animate-glow">
              <ShieldCheck className="w-4 h-4" /> High Confidence
            </div>
          </div>
          
          <div className="flex items-center gap-6 mb-12">
            <div className="p-5 bg-primary/20 rounded-[32px] group-hover:rotate-12 transition-transform duration-500">
              <Zap className="w-12 h-12 text-primary" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Top Predicted MOA</div>
              <h2 className="text-5xl font-display font-bold text-white leading-tight">{topMoa?.moa}</h2>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-10 mb-12">
            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-primary/30 transition-all">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Confidence Score</div>
              <div className="text-5xl font-display font-bold text-primary">{topMoa?.confidence}%</div>
            </div>
            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-primary/30 transition-all">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Model Engine</div>
              <div className="text-xl font-bold text-white">{result.model_id}</div>
            </div>
            <div className="p-6 bg-white/5 rounded-3xl border border-white/5 hover:border-primary/30 transition-all">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Inference Time</div>
              <div className="text-xl font-bold text-white">{result.runtime_seconds?.toFixed(2)}s</div>
            </div>
          </div>

          <div className="p-8 bg-white/5 rounded-[32px] border border-white/5 group-hover:bg-white/10 transition-all">
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-3">
              <Info className="w-5 h-5 text-primary" /> Mechanism Description
            </h4>
            <p className="text-slate-400 leading-relaxed text-lg">
              {topMoa?.description || "This mechanism involves the targeted inhibition of specific cellular pathways, leading to the observed gene expression profile. The model identifies strong correlation with canonical inhibitory patterns."}
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-black p-10 rounded-[48px] border border-white/10 shadow-2xl flex flex-col justify-between relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-primary/10 transition-all duration-1000" />
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
              <Activity className="w-6 h-6 text-primary" /> Ranked Predictions
            </h3>
            <div className="space-y-4">
              {result.top_predictions?.map((p: any, i: number) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/30 hover:bg-white/10 transition-all cursor-pointer group/item"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center text-xs font-bold text-slate-400 group-hover/item:bg-primary group-hover/item:text-white transition-all">{i + 1}</span>
                    <span className="font-bold text-white group-hover/item:text-primary transition-colors">{p.moa}</span>
                  </div>
                  <span className="text-sm font-mono font-bold text-primary">{p.confidence}%</span>
                </motion.div>
              ))}
            </div>
          </div>
          <button className="w-full mt-10 py-5 bg-white text-black rounded-2xl font-bold hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-3 group relative z-10">
            View Full Class Distribution <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* XAI Tabs */}
      <div className="bg-white/5 rounded-[48px] border border-white/10 shadow-2xl overflow-hidden backdrop-blur-xl">
        <div className="flex border-b border-white/5 bg-white/5">
          {[
            { id: 'summary', label: 'AI Narrative', icon: FileText },
            { id: 'shap', label: 'SHAP Importance', icon: BarChart3 },
            { id: 'genes', label: 'Gene Weights', icon: Microscope },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-10 py-6 text-sm font-bold transition-all border-r border-white/5 relative group ${
                activeTab === tab.id ? 'text-primary' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <tab.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${activeTab === tab.id ? 'text-primary' : 'text-slate-500'}`} />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
              )}
            </button>
          ))}
        </div>

        <div className="p-12">
          <AnimatePresence mode="wait">
            {activeTab === 'summary' && (
              <motion.div
                key="summary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="prose prose-invert max-w-none"
              >
                <div className="bg-primary/5 p-10 rounded-[40px] border border-primary/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Zap className="w-32 h-32 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                    <Zap className="w-6 h-6" /> Biological Rationale
                  </h3>
                  <div className="text-slate-300 leading-relaxed text-xl font-medium">
                    <ReactMarkdown>{result.shap_values?.narrative}</ReactMarkdown>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'shap' && (
              <motion.div
                key="shap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-[600px] bg-white/5 p-8 rounded-[40px] border border-white/5"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={result.shap_values?.genes} layout="vertical" margin={{ left: 40, right: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="symbol" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 14, fontWeight: 'bold', fill: '#94a3b8' }} width={120} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                      itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                      cursor={{ fill: 'rgba(255,255,255,0.02)' }} 
                    />
                    <Bar dataKey="weight" radius={[0, 12, 12, 0]} barSize={32}>
                      {result.shap_values?.genes?.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.direction === 'up' ? '#10b981' : '#ef4444'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            )}

            {activeTab === 'genes' && (
              <motion.div
                key="genes"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {result.shap_values?.genes?.map((gene: any, i: number) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ scale: 1.02 }}
                      className="p-8 bg-white/5 rounded-[32px] border border-white/5 flex items-center justify-between hover:border-primary/30 transition-all group"
                    >
                      <div>
                        <div className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{gene.symbol}</div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Gene Identifier</div>
                      </div>
                      <div className={`px-5 py-3 rounded-2xl font-bold text-lg ${gene.direction === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'} border ${gene.direction === 'up' ? 'border-emerald-500/20' : 'border-red-500/20'}`}>
                        {gene.direction === 'up' ? '+' : '-'}{gene.weight.toFixed(2)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const Loader2 = ({ className }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);
