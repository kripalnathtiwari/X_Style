"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { fetchWithAuth } from '@/lib/api';
import { Navbar } from '@/components/Navbar';
import { Heart, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { getProductById } from '@/lib/data';

export default function WishlistPage() {
  const { token, isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchWithAuth('/wishlist', {}, token)
        .then((res) => setWishlist(res.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, token]);

  const removeWishlist = async (productId: string) => {
    try {
      await fetchWithAuth('/wishlist/remove', {
        method: 'DELETE',
        body: JSON.stringify({ productId }),
      }, token);
      setWishlist(wishlist.filter((w) => w.productId !== productId));
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><Navbar /><div className="mt-20">Loading...</div></div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to Store
        </Link>
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-[#0f172a] tracking-tight mb-2">My Wishlist</h1>
            <p className="text-sm font-bold text-gray-400">Items you've saved for later</p>
          </div>
          <div className="bg-pink-50 text-pink-500 px-4 py-2 rounded-full flex items-center gap-2 font-bold text-sm">
            <Heart className="w-4 h-4 fill-current" /> {wishlist.length} Items Saved
          </div>
        </div>

        {(!isAuthenticated || wishlist.length === 0) ? (
          <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 p-16 flex flex-col items-center justify-center text-center mt-4">
            <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-pink-500" strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-black text-[#0f172a] mb-4">Your wishlist is empty</h2>
            <p className="text-gray-400 font-medium max-w-md mx-auto mb-10 leading-relaxed text-sm">
              Explore our premium collection and save your favorite items here to keep track of what you love.
            </p>
            <Link href="/">
              <button className="bg-[#0f172a] text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                START DISCOVERING
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {wishlist.map((item: any) => {
              const product = getProductById(item.productId);
              if (!product) return null;
              
              return (
                <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center group hover:shadow-lg transition-all">
                  <div className="w-full aspect-square bg-gray-50 rounded-2xl mb-4 flex items-center justify-center p-4">
                    <img src={product.image} alt={product.title} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="font-bold text-lg mb-1 text-center">{product.title}</h3>
                  <p className="font-black text-[#0f172a] text-xl mb-6">₹{product.price}</p>
                  <button 
                    onClick={() => removeWishlist(item.productId)}
                    className="w-full py-3 mt-auto bg-red-50 text-red-600 rounded-xl font-black text-xs hover:bg-red-100 transition-colors uppercase tracking-widest"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
