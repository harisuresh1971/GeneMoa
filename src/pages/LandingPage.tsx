import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Shield, 
  Search, 
  Activity, 
  ChevronRight, 
  Dna, 
  Microscope, 
  Database,
  Globe,
  ArrowRight,
  Star,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
              <Dna className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight">GeneMOA</span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Features</a>
            <a href="#methodology" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Methodology</a>
            <a href="#security" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Security</a>
            <Link to="/auth" className="bg-white text-black px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-primary hover:text-white transition-all">
              Launch Platform
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-8"
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-primary">v4.2.0 Now Live</span>
              <span className="text-slate-500 mx-2">|</span>
              <span className="text-xs font-bold text-slate-400">94.2% mAP Accuracy</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-7xl md:text-8xl font-display font-bold leading-[0.9] tracking-tight mb-8"
            >
              Decode Drug <br/>
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Mechanisms</span> <br/>
              with Precision.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-400 max-w-2xl leading-relaxed mb-12"
            >
              The enterprise-grade Intelligence Platform for predicting drug Mechanism of Action (MOA) from gene expression profiles using Transformer-based deep learning and Explainable AI.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Link to="/auth" className="bg-primary text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-primary/40 hover:bg-primary/90 transition-all flex items-center justify-center gap-3 group">
                Start Free Analysis <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                View Documentation <Globe className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'Model Accuracy', val: '94.2%' },
            { label: 'Genes Tracked', val: '20,000+' },
            { label: 'Inference Time', val: '< 2.5s' },
            { label: 'Research Papers', val: '150+' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-display font-bold text-white mb-2">{stat.val}</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-display font-bold mb-6">Built for Modern Research</h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">Advanced tools designed to accelerate drug discovery and validation.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              title: 'Transformer Core', 
              desc: 'State-of-the-art GeneFormer-MOA architecture trained on millions of expression profiles.',
              icon: Zap,
              color: 'text-primary'
            },
            { 
              title: 'Explainable AI', 
              desc: 'SHAP and Attention-based transparency to understand why a mechanism was predicted.',
              icon: Search,
              color: 'text-amber-500'
            },
            { 
              title: 'Enterprise Security', 
              desc: 'End-to-end encryption and isolated cloud instances for sensitive research data.',
              icon: Shield,
              color: 'text-emerald-500'
            },
            { 
              title: 'Pathway Mapping', 
              desc: 'Automatically map predictions to canonical biological pathways and gene ontologies.',
              icon: Microscope,
              color: 'text-violet-500'
            },
            { 
              title: 'Batch Processing', 
              desc: 'Process thousands of samples in parallel with our high-throughput cloud infrastructure.',
              icon: Database,
              color: 'text-blue-500'
            },
            { 
              title: 'Real-time Insights', 
              desc: 'Interactive dashboards and AI-driven narratives for every analysis result.',
              icon: Activity,
              color: 'text-rose-500'
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 bg-white/5 border border-white/10 rounded-[40px] hover:border-primary/50 transition-all group"
            >
              <div className={`p-4 bg-white/5 rounded-2xl w-fit mb-8 group-hover:scale-110 transition-transform ${feature.color}`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-primary to-secondary p-16 rounded-[60px] text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <h2 className="text-5xl font-display font-bold mb-8">Ready to accelerate your research?</h2>
            <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">Join leading pharmaceutical companies and research institutions using GeneMOA to decode the future of medicine.</p>
            <Link to="/auth" className="bg-white text-black px-12 py-6 rounded-[24px] font-bold text-xl hover:scale-105 transition-all inline-flex items-center gap-3 shadow-2xl">
              Get Started Now <ChevronRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-primary p-2 rounded-xl">
                <Dna className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight">GeneMOA</span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Advancing drug discovery through state-of-the-art artificial intelligence and explainable transcriptomics.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-8">Platform</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><Link to="/predict" className="hover:text-white transition-colors">MOA Prediction</Link></li>
              <li><Link to="/xai" className="hover:text-white transition-colors">Explainability</Link></li>
              <li><Link to="/benchmarks" className="hover:text-white transition-colors">Benchmarks</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-8">Resources</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><Link to="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link to="/research" className="hover:text-white transition-colors">Research</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-8">Company</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/security" className="hover:text-white transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex justify-between items-center text-slate-600 text-xs font-bold uppercase tracking-widest">
          <span>© 2026 GeneMOA Intelligence. All rights reserved.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
