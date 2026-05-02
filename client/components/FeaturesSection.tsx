import { Truck, ShieldCheck, RefreshCw, Clock } from 'lucide-react';

const FEATURES = [
  {
    icon: <Truck className="w-6 h-6 text-blue-600" />,
    title: 'Free Express Shipping',
    description: 'On all orders over ₹3000 across the country.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    title: 'Secure Payments',
    description: '100% secure payment with 256-bit encryption.',
  },
  {
    icon: <RefreshCw className="w-6 h-6 text-blue-600" />,
    title: '30-Day Free Returns',
    description: 'Not happy? Return it within 30 days for a full refund.',
  },
  {
    icon: <Clock className="w-6 h-6 text-blue-600" />,
    title: '24/7 Premium Support',
    description: 'Our team is here to help you anytime, anywhere.',
  },
];

export function FeaturesSection() {
  return (
    <section className="w-full bg-gray-50 border-y border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feat, i) => (
            <div key={i} className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 border border-gray-100">
                {feat.icon}
              </div>
              <h3 className="text-lg font-black text-[#0f172a] mb-2">{feat.title}</h3>
              <p className="text-sm font-medium text-gray-500 leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
