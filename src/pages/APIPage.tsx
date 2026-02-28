import React from 'react';
import { ShieldCheck, Terminal, Copy, Key, Globe, Lock } from 'lucide-react';

export const APIPage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">API Access</h1>
          <p className="text-slate-400 mt-1">Integrate GeneMOA predictions into your own pipelines</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-2xl font-bold shadow-2xl shadow-primary/40 hover:bg-primary/90 transition-all flex items-center gap-2">
          <Key className="w-5 h-5" /> Generate API Key
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white/5 rounded-[32px] p-8 text-white border border-white/10 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Quick Start</span>
              </div>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                <Copy className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <pre className="font-mono text-sm text-slate-300 overflow-x-auto bg-black/40 p-6 rounded-2xl border border-white/5">
{`curl -X POST https://api.genemoa.ai/v1/predict \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "sample_id": "EXP_001",
    "gene_data": [1.2, -0.5, 3.1, ...],
    "model": "transformer_v1"
  }'`}
            </pre>
          </div>

          <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-2xl backdrop-blur-xl">
            <h3 className="text-xl font-bold mb-6 text-white">Endpoint Reference</h3>
            <div className="space-y-4">
              {[
                { method: 'POST', path: '/v1/predict', desc: 'Run MOA prediction on a single sample' },
                { method: 'POST', path: '/v1/batch', desc: 'Submit a batch prediction job' },
                { method: 'GET', path: '/v1/models', desc: 'List available model versions' },
                { method: 'GET', path: '/v1/status/:job_id', desc: 'Check status of a batch job' },
              ].map((api, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/30 transition-all">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold ${api.method === 'POST' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {api.method}
                  </span>
                  <code className="text-sm font-bold text-white">{api.path}</code>
                  <span className="text-xs text-slate-500 ml-auto">{api.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-2xl backdrop-blur-xl">
            <h3 className="text-lg font-bold mb-6 text-white">Usage Limits</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Rate Limit</span>
                <span className="font-bold text-white">1,000 req/min</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Monthly Credits</span>
                <span className="font-bold text-white">50,000 / 100,000</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-primary w-1/2 shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
              </div>
            </div>
          </div>

          <div className="bg-primary/10 p-8 rounded-[32px] border border-primary/20">
            <div className="flex gap-3">
              <Lock className="w-5 h-5 text-primary shrink-0" />
              <p className="text-xs text-primary/80 leading-relaxed font-medium">
                <strong>Enterprise Security:</strong> All API requests are encrypted via TLS 1.3. We support OAuth2 and SAML for enterprise identity management.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
