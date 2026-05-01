"use client";

import { MessageCircle, Mail, User } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="support" className="w-full bg-[#0B1120] text-white py-24 px-4 sm:px-8 border-t border-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side */}
        <div className="flex flex-col items-start">
          <div className="px-5 py-2 rounded-full border border-gray-700 bg-white/5 text-[9px] font-black tracking-widest text-blue-400 uppercase mb-8">
            Get in touch
          </div>
          <h2 className="text-5xl md:text-[5rem] font-black tracking-tighter leading-[0.9] mb-8">
            SUPPORT<br />
            IS A <span className="text-blue-500">STAPLE.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-md mb-12 font-medium leading-relaxed">
            Our expert team is available around the clock to ensure your XStyle experience is flawless.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
            <div className="flex flex-col gap-4">
              <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                <MessageCircle className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase mb-1">Live Chat</p>
                <p className="font-bold text-lg">Available 24/7</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center hover:scale-105 transition-transform duration-300">
                <Mail className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-[10px] font-black tracking-widest text-gray-500 uppercase mb-1">Email</p>
                <p className="font-bold text-lg">support@xstyle.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-[#131B2C] border border-white/5 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle glow effect behind form */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <form className="flex flex-col gap-5 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <div className="relative group">
              <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full bg-[#0B1120] border border-white/5 rounded-3xl py-5 pl-16 pr-6 text-sm font-bold text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-[#0f172a] transition-all shadow-inner"
              />
            </div>
            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-[#0B1120] border border-white/5 rounded-3xl py-5 pl-16 pr-6 text-sm font-bold text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-[#0f172a] transition-all shadow-inner"
              />
            </div>
            <div className="relative group">
              <textarea 
                placeholder="How can we help?" 
                rows={5}
                className="w-full bg-[#0B1120] border border-white/5 rounded-3xl py-5 px-6 text-sm font-bold text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-[#0f172a] transition-all resize-none shadow-inner"
              ></textarea>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-xs tracking-widest uppercase py-5 rounded-3xl mt-4 transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(37,99,235,0.6)] hover:shadow-[0_10px_40px_-5px_rgba(37,99,235,0.8)] hover:-translate-y-1">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
