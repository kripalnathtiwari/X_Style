import { Award, ChevronRight } from 'lucide-react';

export function ShoppingMilestone() {
  return (
    <section className="px-4 md:px-8 py-10 w-full max-w-7xl mx-auto">
      <div className="bg-[#0f172a] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
        {/* Background Decorative Rings */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[30rem] h-[30rem] border-[1px] border-white/5 rounded-full"></div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-[20rem] h-[20rem] border-[1px] border-white/10 rounded-full"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 backdrop-blur-md">
              <Award className="w-5 h-5" />
            </div>
            <span className="px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-[10px] font-black tracking-widest uppercase">
              EXCLUSIVE OFFER
            </span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-2">Shopping Milestone</h2>
          <p className="text-gray-400 text-xs md:text-sm font-medium mb-10 max-w-sm">
            Complete your ₹3,000 shopping and get one T-shirt FREE!
          </p>

          <div className="mb-8 max-w-3xl">
            <div className="flex justify-between items-end mb-4">
              <div className="text-[10px] font-black text-gray-500 tracking-widest uppercase">YOUR PROGRESS</div>
              <div className="text-4xl font-black text-blue-500 tracking-tighter leading-none">0%</div>
            </div>
            
            <div className="h-4 bg-white/5 rounded-full overflow-hidden mb-3 border border-white/5">
              <div className="h-full bg-blue-500 w-0 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
            </div>
            
            <div className="flex justify-between text-[10px] font-black text-gray-500 tracking-widest uppercase">
              <span>Collected: ₹0</span>
              <span>Target: ₹3000</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/10 max-w-3xl backdrop-blur-sm">
            <div className="flex items-center gap-4 w-full sm:w-auto mb-4 sm:mb-0">
              <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center p-2 border border-blue-500/30">
                {/* Free t-shirt icon or image placeholder */}
                <div className="w-full h-full bg-blue-500/40 rounded flex items-center justify-center">
                  <Award className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div>
                <div className="font-bold text-white text-sm">Free Premium T-Shirt</div>
                <div className="text-xs text-gray-400 font-medium mt-1">Unlock at ₹3,000</div>
              </div>
            </div>
            <button className="w-full sm:w-auto px-6 py-3.5 bg-white text-[#0f172a] rounded-xl text-xs font-black tracking-widest uppercase hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
              SHOP TO UNLOCK <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
