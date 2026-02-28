import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dna, 
  Activity, 
  Search, 
  History, 
  BarChart3, 
  MessageSquare, 
  User, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  Upload,
  Database,
  ShieldCheck,
  Zap,
  Microscope,
  TrendingUp,
  Cpu,
  FileText,
  Globe,
  BookOpen,
  Briefcase,
  Save,
  FileDown,
  Settings,
  Info,
  HelpCircle,
  Lock,
  Mail,
  MessageCircle,
  GitBranch
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  
  const sections = [
    {
      title: 'Main',
      items: [
        { icon: Activity, label: 'Dashboard', path: '/dashboard' },
        { icon: Upload, label: 'MOA Prediction', path: '/predict' },
        { icon: Database, label: 'Batch Prediction', path: '/batch' },
        { icon: History, label: 'Upload History', path: '/history' },
      ]
    },
    {
      title: 'Analysis',
      items: [
        { icon: Zap, label: 'Explainability (XAI)', path: '/xai' },
        { icon: Search, label: 'Attention Viewer', path: '/attention' },
        { icon: Microscope, label: 'Pathway Analysis', path: '/pathways' },
        { icon: BarChart3, label: 'Model Comparison', path: '/comparison' },
      ]
    },
    {
      title: 'Platform',
      items: [
        { icon: Database, label: 'Dataset', path: '/dataset' },
        { icon: Cpu, label: 'Architecture', path: '/architecture' },
        { icon: TrendingUp, label: 'Benchmarks', path: '/benchmarks' },
        { icon: ShieldCheck, label: 'API Access', path: '/api-access' },
      ]
    },
    {
      title: 'Resources',
      items: [
        { icon: FileText, label: 'Documentation', path: '/docs' },
        { icon: Globe, label: 'Use Cases', path: '/use-cases' },
        { icon: BookOpen, label: 'Research', path: '/research' },
        { icon: Briefcase, label: 'Case Studies', path: '/case-studies' },
      ]
    },
    {
      title: 'Account',
      items: [
        { icon: User, label: 'User Profile', path: '/profile' },
        { icon: Save, label: 'Saved Analyses', path: '/saved' },
        { icon: FileDown, label: 'Reports', path: '/reports' },
        { icon: Settings, label: 'Admin Panel', path: '/admin' },
      ]
    },
    {
      title: 'Info',
      items: [
        { icon: Info, label: 'About', path: '/about' },
        { icon: HelpCircle, label: 'How It Works', path: '/how-it-works' },
        { icon: Lock, label: 'Security', path: '/security' },
        { icon: Mail, label: 'Contact', path: '/contact' },
        { icon: MessageCircle, label: 'FAQ', path: '/faq' },
        { icon: GitBranch, label: 'Changelog', path: '/changelog' },
      ]
    }
  ];

  return (
    <aside className={`bg-black border-r border-white/5 text-white transition-all duration-500 ease-in-out ${isOpen ? 'w-72' : 'w-24'} flex flex-col h-screen sticky top-0 overflow-y-auto custom-scrollbar shadow-2xl shadow-primary/5`}>
      <div className="p-8 flex items-center gap-4 shrink-0">
        <div className="bg-primary p-2.5 rounded-2xl shadow-2xl shadow-primary/40 group-hover:rotate-12 transition-transform duration-500">
          <Dna className="w-7 h-7 text-white" />
        </div>
        {isOpen && (
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-display font-bold text-2xl tracking-tighter bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent"
          >
            GeneMOA
          </motion.span>
        )}
      </div>

      <nav className="flex-1 px-6 pb-12 space-y-10">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-4">
            {isOpen && (
              <motion.h3 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] flex items-center gap-2"
              >
                <span className="w-1 h-1 bg-primary/40 rounded-full" />
                {section.title}
              </motion.h3>
            )}
            <div className="space-y-1.5">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    title={!isOpen ? item.label : ''}
                    className={`flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                      isActive 
                        ? 'bg-primary text-white shadow-2xl shadow-primary/30' 
                        : 'text-slate-500 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="activeGlow"
                        className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50" 
                      />
                    )}
                    <item.icon className={`w-5 h-5 shrink-0 transition-all duration-300 group-hover:scale-110 relative z-10 ${isActive ? 'text-white' : 'text-slate-600 group-hover:text-primary'}`} />
                    {isOpen && (
                      <span className="font-bold text-sm truncate relative z-10 tracking-tight">
                        {item.label}
                      </span>
                    )}
                    {isActive && isOpen && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" 
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5 shrink-0 bg-black/40 backdrop-blur-md">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center gap-4 p-4 rounded-2xl text-slate-500 hover:text-white hover:bg-white/5 transition-all group"
        >
          <div className={`p-2 rounded-xl bg-white/5 group-hover:bg-primary/20 transition-colors ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronRight className="w-5 h-5 transition-transform" />
          </div>
          {isOpen && <span className="text-sm font-bold tracking-tight">Collapse View</span>}
        </button>
      </div>
    </aside>
  );
};

export const Header = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-black/50 backdrop-blur-xl border-b border-white/5 px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h2 className="text-slate-500 font-medium text-sm">Platform / <span className="text-white">Analysis</span></h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:border-primary/30 transition-colors cursor-pointer group">
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xs border border-primary/20 group-hover:scale-110 transition-transform">
            {user?.full_name?.[0] || 'U'}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white leading-none">{user?.full_name}</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">{user?.organization || 'Researcher'}</span>
          </div>
        </div>
        
        <button 
          onClick={() => { logout(); navigate('/'); }}
          className="p-2 text-slate-500 hover:text-error transition-colors hover:scale-110"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
};
