"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { fetchWithAuth } from '@/lib/api';
import { Navbar } from '@/components/Navbar';
import { ShoppingCart, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { getProductById } from '@/lib/data';

export default function CartPage() {
  const { token, isAuthenticated } = useAuth();
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchWithAuth('/cart', {}, token)
        .then((res) => setCart(res.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, token]);

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

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><Navbar /><div className="mt-20">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to Shopping
        </Link>
        
        <h1 className="text-[2.75rem] font-black text-[#0f172a] tracking-tighter mb-12">My Bag</h1>

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
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-4">
            {cart.items.map((item: any) => {
              const product = getProductById(item.productId);
              if (!product) return null;
              
              return (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b last:border-0 border-gray-100 gap-4">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-gray-50 rounded-2xl p-2 flex-shrink-0">
                      <img src={product.image} alt={product.title} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0f172a] text-xl mb-1">{product.title}</h3>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{product.category}</p>
                      <p className="text-lg font-black text-[#0f172a]">₹{product.price * item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 justify-between sm:justify-end w-full sm:w-auto">
                    <div className="flex items-center gap-3 bg-gray-50 p-1.5 rounded-2xl">
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-8 h-8 rounded-xl bg-white text-gray-900 font-black shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >-</button>
                      <span className="font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-8 h-8 rounded-xl bg-white text-gray-900 font-black shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >+</button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.productId)}
                      className="text-xs font-black text-red-500 hover:text-red-600 uppercase tracking-widest transition-colors px-4 py-2 hover:bg-red-50 rounded-xl"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
