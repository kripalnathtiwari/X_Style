"use client";

export function NewsletterSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16">
      <div className="bg-blue-600 rounded-[3rem] p-8 md:p-16 flex flex-col items-center text-center relative overflow-hidden shadow-2xl">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[40rem] h-[40rem] bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[30rem] h-[30rem] bg-black opacity-10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl">
          <span className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white text-[10px] font-black tracking-widest uppercase mb-6 inline-block backdrop-blur-md">
            JOIN THE CLUB
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4 leading-tight">
            Get 15% Off Your First Premium Order
          </h2>
          <p className="text-blue-100 font-medium mb-10">
            Sign up for our newsletter to receive exclusive offers, early access to new collections, and the latest style inspiration directly in your inbox.
          </p>

          <form className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address..." 
              required
              className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all font-medium backdrop-blur-sm"
            />
            <button 
              type="submit"
              className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 hover:bg-gray-50 rounded-2xl font-black text-sm uppercase tracking-widest transition-transform hover:-translate-y-1 shadow-lg shrink-0 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="text-blue-200/60 text-xs font-medium mt-4">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </section>
  );
}
