import React from 'react';
import { Mail, MessageSquare, Globe, MapPin, Send, Phone } from 'lucide-react';

export const ContactPage = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-display font-bold text-white">Contact Us</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Have questions about GeneMOA? Our team of experts is ready to help.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white/5 p-10 rounded-[40px] border border-white/10 shadow-2xl backdrop-blur-xl">
          <h3 className="text-2xl font-bold text-white mb-8">Send us a Message</h3>
          <form className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <input type="text" placeholder="Dr. Jane Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                <input type="email" placeholder="jane@biotech.com" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Subject</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                <option className="bg-slate-900">Technical Support</option>
                <option className="bg-slate-900">Sales Inquiry</option>
                <option className="bg-slate-900">Research Collaboration</option>
                <option className="bg-slate-900">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Message</label>
              <textarea rows={5} placeholder="How can we help you?" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none" />
            </div>
            <button className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-primary/40 hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
              <Send className="w-5 h-5" /> Send Message
            </button>
          </form>
        </div>

        <div className="space-y-6">
          {[
            { title: 'Email Us', val: 'support@genemoa.ai', icon: Mail, color: 'bg-blue-500/10 text-blue-400' },
            { title: 'Call Us', val: '+1 (555) 123-4567', icon: Phone, color: 'bg-emerald-500/10 text-emerald-400' },
            { title: 'Global HQ', val: 'Cambridge, MA, USA', icon: MapPin, color: 'bg-primary/10 text-primary' },
          ].map((item, i) => (
            <div key={i} className="bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-2xl backdrop-blur-xl">
              <div className={`p-3 rounded-xl w-fit mb-4 ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-white">{item.title}</h4>
              <p className="text-slate-500 text-sm mt-1">{item.val}</p>
            </div>
          ))}

          <div className="bg-white/5 text-white p-8 rounded-[32px] shadow-2xl border border-white/10 backdrop-blur-xl">
            <h4 className="font-bold mb-4">Office Hours</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex justify-between">
                <span>Mon - Fri</span>
                <span>9:00 AM - 6:00 PM EST</span>
              </div>
              <div className="flex justify-between">
                <span>Sat - Sun</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
