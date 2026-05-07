import { Navbar } from '@/components/Navbar';
import { SupportSection } from '@/components/SupportSection';
import { Footer } from '@/components/Footer';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="w-full">
        {/* Breadcrumbs or Hero for the dedicated page */}
        <div className="bg-[#0f172a] text-white py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Support & <br />Assistance</h1>
            <p className="text-gray-400 font-medium text-lg max-w-2xl">
              Everything you need to know about your XStyle experience. From tracking orders to style advice, we're here for you.
            </p>
          </div>
        </div>
        
        <SupportSection />
        
        {/* Additional Help Categories or FAQ could go here */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
            <h2 className="text-3xl font-black text-[#0f172a] mb-12 tracking-tight">Common Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="p-8 rounded-2xl bg-gray-50">
                <h4 className="font-bold text-lg mb-3 text-[#0f172a]">Shipping Policy</h4>
                <p className="text-gray-500 text-sm font-medium">We offer free express shipping on all orders over ₹5,000. Delivery typically takes 2-4 business days.</p>
              </div>
              <div className="p-8 rounded-2xl bg-gray-50">
                <h4 className="font-bold text-lg mb-3 text-[#0f172a]">Returns & Exchanges</h4>
                <p className="text-gray-500 text-sm font-medium">Enjoy a 30-day hassle-free return window. Exchange for a different size or get a full refund.</p>
              </div>
              <div className="p-8 rounded-2xl bg-gray-50">
                <h4 className="font-bold text-lg mb-3 text-[#0f172a]">Payment Methods</h4>
                <p className="text-gray-500 text-sm font-medium">We accept all major credit cards, UPI, and net banking. Secure encrypted transactions always.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
