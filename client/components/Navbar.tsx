"use client";

import { useState, useRef, useEffect, useMemo } from 'react';
import { Search, Heart, ShoppingCart, Grid, Store, PhoneCall, User as UserIcon, Package, MapPin, LogOut, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@/lib/authContext';
import { fetchWithAuth } from '@/lib/api';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Fuse from 'fuse.js';
import { PRODUCTS } from '@/lib/data';

export function Navbar() {
  const { user, logout, token, isAuthenticated } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const isHomePage = pathname === '/';

  const fuse = useMemo(() => new Fuse(PRODUCTS, {
    keys: ['title', 'category'],
    threshold: 0.4,
  }), []);

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      // 1. Try cache
      const cachedCount = localStorage.getItem(`cart_count_${user?.id}`);
      if (cachedCount) {
        setCartCount(parseInt(cachedCount));
      }

      if (isAuthenticated && token) {
        try {
          const res = await fetchWithAuth('/cart', {}, token);
          if (res.data && res.data.items) {
            const count = res.data.items.reduce((acc: number, item: any) => acc + item.quantity, 0);
            setCartCount(count);
            localStorage.setItem(`cart_count_${user?.id}`, count.toString());
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        setCartCount(0);
      }
    };
    
    fetchCart();
    
    window.addEventListener('cart-updated', fetchCart);
    return () => window.removeEventListener('cart-updated', fetchCart);
  }, [isAuthenticated, token, user?.id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      const results = fuse.search(query).map(r => r.item).slice(0, 5);
      setSearchResults(results);
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  };
  
  return (
    <nav className="flex items-center justify-between px-4 md:px-8 py-4 bg-white border-b sticky top-0 z-50">
      {/* Left side: Back Button & Logo */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          {!isHomePage && (
            <button 
              onClick={() => router.back()}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600"
              title="Go Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <Link href="/">
            <h1 className="text-2xl font-black tracking-tighter">
              <span className="text-blue-600">X</span><span className="text-[#0f172a]">Style</span>
            </h1>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-800">
          <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <Grid className="w-4 h-4" /> Categories <span className="text-[10px]">▼</span>
          </button>
          <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
            <Store className="w-4 h-4" /> Store
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex flex-1 max-w-lg relative mx-8" ref={searchRef}>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search premium apparel..." 
          value={searchQuery}
          onChange={handleSearch}
          onFocus={() => { if (searchQuery.trim()) setIsSearchOpen(true); }}
          className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-400"
        />
        
        {isSearchOpen && searchResults.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden">
            {searchResults.map((product) => (
              <Link 
                key={product.id} 
                href={`/product/${product.id}`}
                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-gray-50 p-1 shrink-0">
                  <img src={product.image} alt={product.title} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0f172a] line-clamp-1">{product.title}</h4>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{product.category} • ₹{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
        {isSearchOpen && searchQuery.trim() && searchResults.length === 0 && (
          <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 py-8 z-50 text-center">
            <p className="text-sm font-bold text-gray-400">No products found</p>
          </div>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        <Link href="/support" className="hidden lg:flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold tracking-widest text-white shadow-md hover:shadow-lg transition-all bg-[#0f172a] hover:bg-gray-800">
          <PhoneCall className="w-4 h-4" /> SUPPORT
        </Link>
        
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="hidden sm:flex items-center gap-3 border-r border-gray-100 pr-4 ml-2 hover:opacity-80 transition-opacity text-left"
            >
              <div className="w-9 h-9 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{user.role || 'Member'}</span>
                <span className="text-xs font-bold text-gray-900 leading-none truncate max-w-[100px]">{user.name || user.email.split('@')[0]}</span>
              </div>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-5 py-3 border-b border-gray-50 mb-2">
                  <p className="text-sm font-bold text-gray-900 truncate">{user.name || 'User'}</p>
                  <p className="text-xs font-medium text-gray-500 truncate">{user.email}</p>
                </div>
                
                <div className="flex flex-col px-2">
                  <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-xl transition-colors">
                    <UserIcon className="w-4 h-4" /> My Profile
                  </Link>
                  <Link href="/orders" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-xl transition-colors">
                    <Package className="w-4 h-4" /> My Orders
                  </Link>
                  <Link href="/addresses" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-xl transition-colors mb-2">
                    <MapPin className="w-4 h-4" /> Addresses
                  </Link>
                  
                  <div className="h-px bg-gray-50 my-1 mx-2"></div>
                  
                  <button 
                    onClick={() => {
                      logout();
                      setIsDropdownOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-1 w-full text-left"
                  >
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login" className="hidden sm:flex items-center gap-3 border-r border-gray-100 pr-4 ml-2">
            <Button variant="outline" className="rounded-xl text-xs font-bold px-4 h-9">
              Sign In
            </Button>
          </Link>
        )}

        <Link href="/wishlist" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-colors relative">
          <Heart className="w-4 h-4 text-gray-600" />
        </Link>
        <Link href="/cart" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 hover:bg-gray-100 transition-colors relative">
          <ShoppingCart className="w-4 h-4 text-gray-600" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount > 9 ? '9+' : cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
