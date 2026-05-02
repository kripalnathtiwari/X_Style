import Link from 'next/link';
import { Globe, MessageCircle, Camera, Video, MapPin, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-[#0f172a] text-white pt-20 pb-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div>
            <h1 className="text-3xl font-black tracking-tighter mb-6">
              <span className="text-blue-500">X</span>Style
            </h1>
            <p className="text-gray-400 font-medium text-sm leading-relaxed mb-6">
              Elevate your dynamic presence with our premium curated collections. XStyle is where luxury meets contemporary fashion.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors text-gray-400 hover:text-white">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-400 transition-colors text-gray-400 hover:text-white">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-600 transition-colors text-gray-400 hover:text-white">
                <Camera className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 transition-colors text-gray-400 hover:text-white">
                <Video className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-black tracking-tight mb-6 uppercase text-gray-200">Shop</h3>
            <ul className="space-y-4">
              <li><Link href="/store" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">All Products</Link></li>
              <li><Link href="/store?category=shirts" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Shirts & Polos</Link></li>
              <li><Link href="/store?category=jackets" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Premium Jackets</Link></li>
              <li><Link href="/store?category=pants" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Trousers & Pants</Link></li>
              <li><Link href="/store?category=hoodies" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Hoodies & Sweats</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-black tracking-tight mb-6 uppercase text-gray-200">Support</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Track Order</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Shipping Information</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">Size Guide</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white text-sm font-medium transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-black tracking-tight mb-6 uppercase text-gray-200">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm font-medium">123 Fashion Avenue,<br/>Mumbai, MH 400001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="text-gray-400 text-sm font-medium">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <span className="text-gray-400 text-sm font-medium">support@xstyle.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs font-bold tracking-widest uppercase">
            &copy; {new Date().getFullYear()} XStyle. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-gray-500 hover:text-white text-xs font-bold tracking-widest uppercase transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-gray-500 hover:text-white text-xs font-bold tracking-widest uppercase transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
