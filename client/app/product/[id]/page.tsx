"use client";

import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { ProductSection } from '@/components/ProductSection';
import { getProductById, PRODUCTS } from '@/lib/data';
import { notFound, useRouter, useParams } from 'next/navigation';
import { Heart, Plus, Star, ChevronLeft, Truck, Shield, RefreshCw } from 'lucide-react';
import { useAuth } from '@/lib/authContext';
import { fetchWithAuth } from '@/lib/api';

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const product = getProductById(id);
  const router = useRouter();
  const { token, isAuthenticated } = useAuth();
  
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Generate 10 random products excluding the current one
  const [randomProducts] = useState(() => {
    if (!product) return [];
    const otherProducts = PRODUCTS.filter(p => p.id !== product.id);
    // Shuffle and pick 10
    const shuffled = [...otherProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  });

  useEffect(() => {
    if (isAuthenticated && token && product) {
      // Fetch wishlist status
      fetchWithAuth('/wishlist', {}, token)
        .then((res) => {
          if (res.data?.some((w: any) => w.productId === product.id)) {
            setIsWishlisted(true);
          }
        })
        .catch(console.error);

      // Add to recently viewed
      fetchWithAuth('/recently-viewed/add', {
        method: 'POST',
        body: JSON.stringify({ productId: product.id }),
      }, token).catch(console.error);
    }
  }, [isAuthenticated, token, product]);

  if (!product) {
    return notFound();
  }

  const toggleWishlist = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    try {
      const currentlyWishlisted = isWishlisted;
      setIsWishlisted(!currentlyWishlisted);
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
    } catch (e) {
      setIsWishlisted(isWishlisted);
      console.error(e);
    }
  };

  const addToCart = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    setAddingToCart(true);
    try {
      await fetchWithAuth('/cart/add', {
        method: 'POST',
        body: JSON.stringify({ productId: product.id }),
      }, token);
      
      if (quantity > 1) {
        await fetchWithAuth('/cart/update', {
          method: 'PUT',
          body: JSON.stringify({ productId: product.id, quantity }),
        }, token);
      }
      
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2000);
      window.dispatchEvent(new Event('cart-updated'));
    } catch (e) {
      console.error(e);
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col pb-20">
      <Navbar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-20">
          {/* Image Gallery */}
          <div className="bg-gray-50 rounded-[2.5rem] p-8 md:p-16 flex items-center justify-center aspect-square relative group">
            <button 
              onClick={toggleWishlist}
              className={`absolute top-6 right-6 w-12 h-12 backdrop-blur-md rounded-full flex items-center justify-center transition-all shadow-md z-10 ${
                isWishlisted ? 'bg-pink-50 text-pink-500 hover:bg-pink-100' : 'bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white'
              }`}
            >
              <Heart className="w-6 h-6" fill={isWishlisted ? "currentColor" : "none"} strokeWidth={isWishlisted ? 2.5 : 2} />
            </button>
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">{product.category}</span>
            <h1 className="text-4xl md:text-5xl font-black text-[#0f172a] tracking-tighter mb-4">{product.title}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1.5 text-orange-500 text-sm font-black bg-orange-50 px-3 py-1.5 rounded-full">
                <Star className="w-4 h-4 fill-current" /> {product.rating.toFixed(1)}
              </div>
              <span className="text-sm font-bold text-gray-400 underline cursor-pointer hover:text-gray-900">Read 128 Reviews</span>
            </div>

            <div className="text-3xl md:text-4xl font-black text-[#0f172a] mb-8">₹{product.price}</div>

            <p className="text-gray-500 font-medium leading-relaxed mb-10">
              Premium quality {product.category.toLowerCase()} crafted with the finest materials. 
              Designed for comfort and style, this piece is an essential addition to any modern wardrobe. 
              Experience the perfect blend of contemporary aesthetics and everyday functionality.
            </p>

            <div className="flex items-center gap-6 mb-10 pb-10 border-b border-gray-100">
              <div className="flex items-center bg-gray-50 rounded-2xl p-2 w-32">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-xl bg-white text-gray-900 font-bold shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors"
                >-</button>
                <span className="flex-1 font-black text-black text-center text-2xl">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-xl bg-white text-gray-900 font-bold shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors"
                >+</button>
              </div>

              <button 
                onClick={addToCart}
                disabled={addingToCart || addedSuccess}
                className="flex-1 bg-[#0f172a] text-white h-14 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5" /> 
                {addingToCart ? 'Adding...' : addedSuccess ? 'Added!' : 'Add to Bag'}
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm font-bold text-gray-600">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[#0f172a]">Free Express Delivery</span>
                  <span className="text-gray-400 font-medium text-xs">Delivered within 2-3 business days</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm font-bold text-gray-600">
                <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[#0f172a]">1 Year Warranty</span>
                  <span className="text-gray-400 font-medium text-xs">Quality guaranteed against defects</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm font-bold text-gray-600">
                <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[#0f172a]">Easy Returns</span>
                  <span className="text-gray-400 font-medium text-xs">30-day hassle-free return policy</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {randomProducts.length > 0 && (
        <div className="bg-gray-50 py-16">
          <ProductSection 
            title="You May Also Like" 
            subtitle="RECOMMENDATIONS" 
            products={randomProducts} 
          />
        </div>
      )}
    </div>
  );
}
