import { Star } from 'lucide-react';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="px-4 md:px-8 py-6 w-full">
      <div className="relative w-full rounded-[2.5rem] overflow-hidden bg-[#e2e8f0] flex items-stretch h-[400px] md:h-[500px]">
        {/* Left/Right Background Images */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-[40%]">
          <Image 
            src="https://images.unsplash.com/photo-1558769132-cb1fac08b4af?auto=format&fit=crop&q=80" 
            alt="Left Hero Background" 
            fill 
            priority
            sizes="40vw"
            className="object-cover object-center"
          />
        </div>
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[40%]">
          <Image 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80" 
            alt="Right Hero Background" 
            fill 
            priority
            sizes="40vw"
            className="object-cover object-center"
          />
        </div>
        
        {/* Center Content Box */}
        <div className="relative z-10 w-full md:w-[60%] lg:w-[45%] mx-auto bg-[#0f172a] h-full flex flex-col items-center justify-center text-center p-8 md:p-12 shadow-2xl md:rounded-[2.5rem]">
          <span className="px-5 py-2 rounded-full border border-blue-500/20 text-blue-400 text-[10px] font-bold tracking-[0.2em] mb-8 bg-blue-500/10">
            NEW SS26 COLLECTION
          </span>
          
          <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-black text-white leading-[0.9] mb-6 tracking-tighter">
            ELEVATE <br /> YOUR <br />
            <span className="text-blue-500">DYNAMIC</span><br />
            PRESENCE.
          </h1>
          
          <p className="text-gray-400 max-w-sm text-xs md:text-sm font-medium leading-relaxed mb-8">
            Experience the pinnacle of luxury apparel with our curated collections designed for the modern trendsetter.
          </p>
          
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-black tracking-wider transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.2)]">
            EXPLORE STORE
          </button>
        </div>

        {/* Rating Badge */}
        <div className="absolute left-6 bottom-6 md:left-8 md:bottom-8 z-20 flex items-center gap-3 bg-white/95 backdrop-blur p-3 pr-5 rounded-[1.2rem] shadow-xl">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
            <Star className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="font-black text-gray-900 text-sm leading-none">4.9/5</div>
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-wider mt-1">User Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}
