"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { fetchWithAuth } from '@/lib/api';
import { Navbar } from '@/components/Navbar';
import { ShoppingCart, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { getProductById } from '@/lib/data';
export default function CartPage() {
  const { user, token, isAuthenticated } = useAuth();
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      // 1. Try to load from cache first
      const cachedData = localStorage.getItem(`cart_${user?.id}`);
      if (cachedData) {
        try {
          setCart(JSON.parse(cachedData));
          setLoading(false);
        } catch (e) {
          console.error("Failed to parse cached cart");
        }
      }

      if (isAuthenticated && token) {
        try {
          const res = await fetchWithAuth('/cart', {}, token);
          setCart(res.data);
          // 2. Update cache
          localStorage.setItem(`cart_${user?.id}`, JSON.stringify(res.data));
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadCart();
  }, [isAuthenticated, token, user?.id]);

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      const res = await fetchWithAuth('/cart/update', {
        method: 'PUT',
        body: JSON.stringify({ productId, quantity }),
      }, token);
      setCart(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const removeItem = async (productId: string) => {
    try {
      const res = await fetchWithAuth('/cart/remove', {
        method: 'DELETE',
        body: JSON.stringify({ productId }),
      }, token);
      setCart(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-50 flex flex-col"><Navbar /><div className="flex-1 flex items-center justify-center font-bold text-gray-400">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to Shopping
        </Link>
        
        <h1 className="text-[2.75rem] font-black text-[#0f172a] tracking-tighter mb-12">My Bag</h1>
        
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="flex-1 w-full">
            {(!isAuthenticated || !cart || !cart.items || cart.items.length === 0) ? (
              <div className="bg-white rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 p-24 flex flex-col items-center justify-center text-center">
                <ShoppingCart className="w-[4.5rem] h-[4.5rem] text-gray-300 mb-6" strokeWidth={1.5} />
                <h2 className="text-[1.75rem] font-black text-gray-400 mb-10 tracking-tight">Your bag is empty</h2>
                <Link href="/">
                  <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-[0_8px_20px_-6px_rgba(37,99,235,0.6)] hover:-translate-y-0.5">
                    EXPLORE STORE
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {[...cart.items].sort((a: any, b: any) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).map((item: any) => {
                  const product = getProductById(item.productId);
                  if (!product) return null;
                  
                  return (
                    <div key={item.id} className="bg-white p-6 rounded-[2rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center justify-between gap-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-gray-50 rounded-2xl p-2 flex-shrink-0">
                          <img src={product.image} alt={product.title} loading="lazy" className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#0f172a] text-xl mb-1">{product.title}</h3>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">XL • Red</p>
                          <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-2xl mt-2 w-fit">
                            <button 
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="w-8 h-8 rounded-xl bg-white text-gray-900 font-bold shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >-</button>
                            <span className="font-black text-black text-xl w-10 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="w-8 h-8 rounded-xl bg-white text-gray-900 font-bold shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >+</button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-4">
                        <p className="text-2xl font-black text-blue-600">₹{product.price * item.quantity}</p>
                        <button 
                          onClick={() => removeItem(item.productId)}
                          className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          {isAuthenticated && cart && cart.items && cart.items.length > 0 && (
            <div className="w-full lg:w-[380px] shrink-0">
              <div className="bg-[#0f172a] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                
                <h2 className="text-2xl font-black mb-10 tracking-tight">Order Summary</h2>
                
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between items-center text-gray-400 text-sm font-bold uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span className="text-white">₹{cart.items.reduce((acc: number, item: any) => {
                      const p = getProductById(item.productId);
                      return acc + (p ? p.price * item.quantity : 0);
                    }, 0)}</span>
                  </div>
                  <div className="w-full h-[1px] bg-white/10"></div>
                  <div className="flex justify-between items-end">
                    <span className="text-3xl font-black tracking-tight">Total</span>
                    <span className="text-3xl font-black text-blue-400 tracking-tight">₹{cart.items.reduce((acc: number, item: any) => {
                      const p = getProductById(item.productId);
                      return acc + (p ? p.price * item.quantity : 0);
                    }, 0)}</span>
                  </div>
                </div>

                <Link href="/checkout">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-16 rounded-3xl font-black text-sm uppercase tracking-widest transition-all shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-3 active:scale-95 mb-8">
                    CHECKOUT NOW
                  </button>
                </Link>

                <div className="text-center">
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">SECURE SSL ENCRYPTED PAYMENT</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

  );
}
