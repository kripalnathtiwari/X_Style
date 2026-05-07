"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/authContext';
import { fetchWithAuth } from '@/lib/api';
import { Navbar } from '@/components/Navbar';
import { ChevronLeft, CreditCard, Wallet, Truck, Star } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getProductById } from '@/lib/data';

type Step = 'address' | 'payment' | 'success';

export default function CheckoutPage() {
  const { token, isAuthenticated } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<Step>('address');
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Address Form State
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    postalCode: '',
    phone: '',
    isDefault: false
  });

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push('/login');
      return;
    }
    if (isAuthenticated && token) {
      fetchWithAuth('/cart', {}, token)
        .then((res) => {
          setCart(res.data);
          if (!res.data || !res.data.items || res.data.items.length === 0) {
            router.push('/cart');
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [isAuthenticated, token, router]);

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = async () => {
    if (!token || !cart) return;
    setLoading(true);
    try {
      // 1. Create Address
      const addressRes = await fetchWithAuth('/addresses', {
        method: 'POST',
        body: JSON.stringify(address),
      }, token);
      
      const addressId = addressRes.data.id;

      // 2. Create Order
      const orderData = {
        addressId,
        total,
        paymentMethod,
        items: cart.items, // Snapshot of items
      };

      await fetchWithAuth('/orders', {
        method: 'POST',
        body: JSON.stringify(orderData),
      }, token);

      // 3. Success
      setStep('success');
      window.dispatchEvent(new Event('cart-updated')); // Update cart count in navbar
    } catch (error: any) {
      alert(error.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-gray-50 flex flex-col"><Navbar /><div className="flex-1 flex items-center justify-center font-bold text-gray-400">Loading...</div></div>;

  const total = cart?.items?.reduce((acc: number, item: any) => {
    const p = getProductById(item.productId);
    return acc + (p ? p.price * item.quantity : 0);
  }, 0) || 0;

  return (
    <div className="min-h-screen bg-white flex flex-col pb-20">
      <Navbar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-4 mb-10">
          <button 
            onClick={() => step === 'payment' ? setStep('address') : router.back()}
            className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl font-black text-[#0f172a] tracking-tight">
            {step === 'address' ? 'Checkout' : step === 'payment' ? 'Payment Details' : 'Order Success'}
          </h1>
        </div>

        {step !== 'success' ? (
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Main Content Area */}
            <div className="flex-1 w-full">
              {step === 'address' && (
                <div className="bg-gray-50/50 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm">
                  <form onSubmit={handleAddressSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <input 
                          type="text" 
                          placeholder="First Name"
                          required
                          className="w-full bg-white border-none h-14 rounded-2xl px-6 font-bold text-gray-900 placeholder:text-black focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                          value={address.firstName}
                          onChange={(e) => setAddress({...address, firstName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <input 
                          type="text" 
                          placeholder="Last Name"
                          required
                          className="w-full bg-white border-none h-14 rounded-2xl px-6 font-bold text-gray-900 placeholder:text-black focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                          value={address.lastName}
                          onChange={(e) => setAddress({...address, lastName: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <input 
                        type="text" 
                        placeholder="Street Address"
                        required
                        className="w-full bg-white border-none h-14 rounded-2xl px-6 font-bold text-gray-900 placeholder:text-black focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                        value={address.street}
                        onChange={(e) => setAddress({...address, street: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <input 
                          type="text" 
                          placeholder="City"
                          required
                          className="w-full bg-white border-none h-14 rounded-2xl px-6 font-bold text-gray-900 placeholder:text-black focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                          value={address.city}
                          onChange={(e) => setAddress({...address, city: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <input 
                          type="text" 
                          placeholder="Postal Code"
                          required
                          className="w-full bg-white border-none h-14 rounded-2xl px-6 font-bold text-gray-900 placeholder:text-black focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                          value={address.postalCode}
                          onChange={(e) => setAddress({...address, postalCode: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <input 
                        type="tel" 
                        placeholder="Phone Number"
                        required
                        className="w-full bg-white border-none h-14 rounded-2xl px-6 font-bold text-gray-900 placeholder:text-black focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                        value={address.phone}
                        onChange={(e) => setAddress({...address, phone: e.target.value})}
                      />
                    </div>

                    <div className="flex items-center gap-3 px-2">
                      <input 
                        type="checkbox" 
                        id="isDefault"
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={address.isDefault}
                        onChange={(e) => setAddress({...address, isDefault: e.target.checked})}
                      />
                      <label htmlFor="isDefault" className="text-sm font-bold text-gray-600 cursor-pointer">Set as default address</label>
                    </div>

                    <div className="pt-6">
                      <button 
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white h-16 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                      >
                        Place Order (₹{total})
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {step === 'payment' && (
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Select Payment Method</h3>
                  
                  {/* Card Payment */}
                  <div 
                    onClick={() => setPaymentMethod('card')}
                    className={`p-6 rounded-[2.5rem] border-2 transition-all cursor-pointer ${paymentMethod === 'card' ? 'border-blue-500 bg-white shadow-xl' : 'border-gray-100 bg-gray-50/50 hover:bg-white'}`}
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                        <span className="font-black text-gray-900">Credit / Debit Card</span>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-blue-500' : 'border-gray-200'}`}>
                        {paymentMethod === 'card' && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
                      </div>
                    </div>
                    
                    {paymentMethod === 'card' && (
                      <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                        <input 
                          type="text" 
                          placeholder="Card Number"
                          className="w-full bg-gray-50 border-none h-14 rounded-2xl px-6 font-bold text-gray-900 placeholder:text-black focus:ring-2 focus:ring-blue-500/20"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input 
                            type="text" 
                            placeholder="MM/YY"
                            className="w-full bg-gray-50 border-none h-14 rounded-2xl px-6 font-bold text-gray-900 placeholder:text-black focus:ring-2 focus:ring-blue-500/20"
                          />
                          <input 
                            type="text" 
                            placeholder="CVV"
                            className="w-full bg-gray-50 border-none h-14 rounded-2xl px-6 font-bold text-gray-900 placeholder:text-black focus:ring-2 focus:ring-blue-500/20"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* UPI Payment */}
                  <div 
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-6 rounded-[2.5rem] border-2 transition-all cursor-pointer ${paymentMethod === 'upi' ? 'border-blue-500 bg-white shadow-xl' : 'border-gray-100 bg-gray-50/50 hover:bg-white'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Wallet className="w-5 h-5 text-orange-500" />
                      <span className="font-black text-gray-900">UPI Payment</span>
                    </div>
                  </div>

                  {/* COD */}
                  <div 
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-6 rounded-[2.5rem] border-2 transition-all cursor-pointer ${paymentMethod === 'cod' ? 'border-blue-500 bg-white shadow-xl' : 'border-gray-100 bg-gray-50/50 hover:bg-white'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-green-500" />
                      <span className="font-black text-gray-900">Cash on Delivery</span>
                    </div>
                  </div>

                  <div className="pt-8">
                    <button 
                      onClick={handlePlaceOrder}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white h-16 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                    >
                      Pay ₹{total} & Place Order
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Summary Sidebar */}
            <div className="w-full lg:w-[400px] shrink-0 sticky top-24">
              <div className="bg-[#0f172a] rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                
                <h2 className="text-2xl font-black mb-8 tracking-tight">
                  {step === 'address' ? 'Summary' : 'Order Highlights'}
                </h2>
                
                <div className="space-y-4 mb-8">
                  {cart?.items?.map((item: any) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;
                    return (
                      <div key={item.id} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                        <div className="w-16 h-16 bg-white rounded-xl p-1 flex-shrink-0">
                          <img src={product.image} alt={product.title} className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-white text-sm truncate">{product.title}</h4>
                          <p className="text-[10px] text-gray-400 font-bold uppercase truncate">XL | Red</p>
                        </div>
                        <div className="text-sm font-black text-white">₹{product.price}</div>
                      </div>
                    );
                  })}
                </div>

                {step === 'payment' && (
                  <div className="bg-white/5 border border-white/5 rounded-3xl p-6 mb-8 animate-in zoom-in-95 duration-300">
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-2">Shipping To</span>
                    <p className="text-sm font-bold text-white leading-relaxed">
                      {address.firstName} {address.lastName}, {address.city}, {address.postalCode} (Phone: {address.phone})
                    </p>
                  </div>
                )}
                
                <div className="flex justify-between items-end pt-4 border-t border-white/10">
                  <span className="text-2xl font-black tracking-tight text-blue-400">Total to Pay</span>
                  <span className="text-3xl font-black tracking-tight">₹{total}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 p-24 flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8">
              <Star className="w-12 h-12 text-green-500 fill-current" />
            </div>
            <h2 className="text-[2.5rem] font-black text-[#0f172a] mb-4 tracking-tighter">Order Placed!</h2>
            <p className="text-gray-500 font-medium text-lg mb-12">Your order has been successfully placed. We'll send you a confirmation email shortly.</p>
            <Link href="/">
              <button className="bg-[#0f172a] text-white px-12 py-5 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl hover:-translate-y-1">
                CONTINUE SHOPPING
              </button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
