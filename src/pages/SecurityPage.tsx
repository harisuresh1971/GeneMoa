import React from 'react';
import { Shield, Lock, Eye, ShieldCheck, Server, FileCheck } from 'lucide-react';

export const SecurityPage = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-display font-bold text-white">Security & Data Privacy</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Your research data is your most valuable asset. We protect it with enterprise-grade security.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {[
          { title: 'End-to-End Encryption', desc: 'All data is encrypted in transit (TLS 1.3) and at rest (AES-256).', icon: Lock },
          { title: 'Data Sovereignty', desc: 'You retain 100% ownership of your data. We never use your samples to train public models.', icon: Shield },
          { title: 'Role-Based Access', desc: 'Granular permissions ensure only authorized team members can view sensitive results.', icon: Eye },
          { title: 'Compliance Ready', desc: 'Built to meet SOC2, HIPAA, and GDPR standards for research data management.', icon: FileCheck },
        ].map((item, i) => (
          <div key={i} className="bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-2xl backdrop-blur-xl">
            <div className="p-3 bg-primary/10 rounded-xl w-fit mb-6">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
            <p className="text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white/5 p-12 rounded-[48px] border border-white/10 flex flex-col md:flex-row gap-12 items-center shadow-2xl backdrop-blur-xl">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-3xl font-display font-bold text-white">Infrastructure Security</h2>
          <p className="text-slate-400 leading-relaxed">
            GeneMOA is hosted on isolated, high-security cloud infrastructure with 24/7 monitoring and automated threat detection. Our servers are located in SOC2-compliant data centers with physical and digital safeguards.
          </p>
          <div className="flex items-center gap-4">
            <ShieldCheck className="w-10 h-10 text-emerald-500" />
            <Server className="w-10 h-10 text-blue-500" />
          </div>
        </div>
        <div className="md:w-1/2 bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-2xl backdrop-blur-xl">
          <h4 className="font-bold text-white mb-4">Security Checklist</h4>
          <ul className="space-y-3">
            {[
              'Multi-Factor Authentication (MFA)',
              'Regular Penetration Testing',
              'Automated Vulnerability Scanning',
              'Audit Logs for all actions',
              'Secure API Key Management'
            ].map((check, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {check}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const CheckCircle2 = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
);
