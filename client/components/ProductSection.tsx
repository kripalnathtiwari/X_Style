"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart, Plus, Star } from 'lucide-react';
import { useAuth } from '@/lib/authContext';
import { fetchWithAuth } from '@/lib/api';
import { useRouter } from 'next/navigation';

export interface Product {
  id: string;
  image: string;
  category: string;
  title: string;
  rating: number;
  price: number;
}

export function ProductCard({ product, variant = 'default' }: { product: Product, variant?: 'default' | 'compact' }) {
  const isCompact = variant === 'compact';
  const { token, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchWithAuth('/wishlist', {}, token)
        .then((res) => {
          if (res.data?.some((w: any) => w.productId === product.id)) {
            setIsWishlisted(true);
          }
        })
        .catch(console.error);
    }
  }, [isAuthenticated, token, product.id]);

  const handleAction = async (action: 'cart' | 'wishlist' | 'view') => {
    if (action === 'view') {
      router.push(`/product/${product.id}`);
      return;
    }

    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    try {
      if (action === 'wishlist') {
        const currentlyWishlisted = isWishlisted;
        setIsWishlisted(!currentlyWishlisted); // Optimistic UI update
        
        if (currentlyWishlisted) {
          await fetchWithAuth('/wishlist/remove', {
            method: 'DELETE',
            body: JSON.stringify({ productId: product.id }),
          }, token);
        } else {
          await fetchWithAuth('/wishlist/add', {
            method: 'POST',
            body: JSON.stringify({ productId: product.id }),
          }, token);
        }
        return;
      }

      await fetchWithAuth('/cart/add', {
        method: 'POST',
        body: JSON.stringify({ productId: product.id }),
      }, token);
      
      if (action === 'cart') {
        window.dispatchEvent(new Event('cart-updated'));
      }
    } catch (e) {
      if (action === 'wishlist') setIsWishlisted(isWishlisted); // Revert on fail
      console.error(e);
    }
  };

  return (
    <div 
      onClick={() => handleAction('view')}
      className={`group flex flex-col bg-white rounded-3xl ${isCompact ? 'p-2' : 'p-3'} border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
    >
      <div className={`relative aspect-square rounded-2xl overflow-hidden ${isCompact ? 'mb-2 p-8' : 'mb-4 p-4'} bg-gray-50 flex items-center justify-center`}>
        <Image 
          src={product.image} 
          alt={product.title}
          fill
          sizes={isCompact ? "(max-width: 768px) 50vw, 15vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
          className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
        <button 
          onClick={(e) => { e.stopPropagation(); handleAction('wishlist'); }}
          className={`absolute top-3 right-3 w-8 h-8 backdrop-blur-md rounded-full flex items-center justify-center transition-all shadow-sm ${
            isWishlisted ? 'bg-pink-50 text-pink-500 hover:bg-pink-100' : 'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white'
          }`}
        >
          <Heart className="w-4 h-4" fill={isWishlisted ? "currentColor" : "none"} strokeWidth={isWishlisted ? 2.5 : 2} />
        </button>
      </div>
      
      <div className="flex-1 flex flex-col px-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{product.category}</span>
          <div className="flex items-center gap-1 text-orange-500 text-xs font-black tracking-tighter">
            <Star className="w-3 h-3 fill-current" /> {product.rating.toFixed(1)}
          </div>
        </div>
        
        <h3 className={`font-bold text-blue-600 ${isCompact ? 'text-xs mb-2' : 'text-sm mb-4'} line-clamp-1`}>{product.title}</h3>
        
        <div className="flex items-end justify-between mt-auto">
          <div>
            <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Price</div>
            <div className={`${isCompact ? 'text-sm' : 'text-lg'} font-black text-gray-900 leading-none`}>₹{product.price}</div>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); handleAction('cart'); }}
            className={`${isCompact ? 'w-8 h-8' : 'w-10 h-10'} bg-[#0f172a] hover:bg-blue-600 text-white rounded-xl flex items-center justify-center transition-colors shadow-md`}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface ProductSectionProps {
  subtitle: string;
  title: string;
  products: Product[];
  gridClassName?: string;
  cardVariant?: 'default' | 'compact';
}

export function ProductSection({ 
  subtitle, 
  title, 
  products, 
  gridClassName = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",
  cardVariant = 'default'
}: ProductSectionProps) {
  return (
    <section className="px-4 md:px-8 py-10 w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-[2px] bg-blue-600"></div>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{subtitle}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] tracking-tighter">{title}</h2>
      </div>
      
      <div className={gridClassName}>
        {products.map(p => (
          <ProductCard key={p.id} product={p} variant={cardVariant} />
        ))}
      </div>
    </section>
  );
}
