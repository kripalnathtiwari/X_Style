"use client";

import { Headset, Mail, MessageSquare, HelpCircle, ShieldCheck, ArrowRight, Phone } from 'lucide-react';
import Link from 'next/link';

export function SupportSection() {
  const supportCategories = [
    {
      icon: <HelpCircle className="w-6 h-6 text-blue-600" />,
      title: "Help Center",
      description: "Find answers to frequently asked questions about shipping, returns, and more.",
      link: "#",
      cta: "Browse FAQ"
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-blue-600" />,
      title: "Live Chat",
      description: "Connect with our style consultants in real-time for immediate assistance.",
      link: "#",
      cta: "Start Chat"
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      title: "Order Issues",
      description: "Having trouble with an order? We're here to help you resolve it quickly.",
      link: "#",
      cta: "Report Issue"
    }
  ];

  return (
    <section id="support" className="w-full bg-gray-50 py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Content */}
          <div className="space-y-8">
            <div>
              <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black tracking-widest uppercase mb-6 inline-block">
                SUPPORT HUB
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] tracking-tighter mb-6 leading-tight">
                We're Here to Help You <br /><span className="text-blue-600">Stay Xtylish</span>
              </h2>
              <p className="text-gray-500 text-lg font-medium max-w-xl">
                Experience world-class support. Whether you have a question about our collections or need help with an order, our team is dedicated to providing you with the best service possible.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-bold text-[#0f172a] mb-2">Call Us</h4>
                <p className="text-sm text-gray-500 font-medium mb-4">+91 98765 43210</p>
                <a href="tel:+919876543210" className="text-blue-600 text-sm font-black uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                  Connect Now <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="p-6 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-bold text-[#0f172a] mb-2">Email Us</h4>
                <p className="text-sm text-gray-500 font-medium mb-4">support@xstyle.com</p>
                <a href="mailto:support@xstyle.com" className="text-blue-600 text-sm font-black uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                  Send Message <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                      <img 
                        src={`https://i.pravatar.cc/100?u=${i}`} 
                        alt="Support team" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-bold text-gray-600">
                  <span className="text-[#0f172a]">24/7 Support Available.</span> Our experts are ready to help.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Cards */}
          <div className="grid grid-cols-1 gap-6">
            {supportCategories.map((category, index) => (
              <div 
                key={index}
                className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex items-start gap-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                  <div className="group-hover:text-white transition-colors">
                    {category.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-black text-[#0f172a] mb-2 tracking-tight">{category.title}</h3>
                  <p className="text-gray-500 font-medium text-sm leading-relaxed mb-4">
                    {category.description}
                  </p>
                  <Link href={category.link} className="text-xs font-black uppercase tracking-widest text-blue-600 flex items-center gap-2 hover:gap-3 transition-all">
                    {category.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
