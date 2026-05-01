import dynamic from 'next/dynamic';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import type { Product } from '@/components/ProductSection';

const ProductSection = dynamic(() => import('@/components/ProductSection').then(mod => mod.ProductSection), { 
  loading: () => <div className="w-full h-64 animate-pulse bg-gray-50 rounded-xl my-10" /> 
});
const RecentlyViewedSection = dynamic(() => import('@/components/RecentlyViewedSection').then(mod => mod.RecentlyViewedSection), { 
  loading: () => <div className="w-full h-64 animate-pulse bg-gray-50 rounded-xl my-10" /> 
});
const ShoppingMilestone = dynamic(() => import('@/components/ShoppingMilestone').then(mod => mod.ShoppingMilestone), { 
  loading: () => <div className="w-full h-64 animate-pulse bg-gray-50 rounded-xl my-10" /> 
});

const TRENDING_PRODUCTS: Product[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80',
    category: 'SHIRTS',
    title: 'Revange T-shirt',
    rating: 4.0,
    price: 500
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80',
    category: 'T-SHIRTS',
    title: 'new [+product]',
    rating: 0.0,
    price: 300
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80',
    category: 'T-SHIRTS',
    title: 'Brand New Tshirt',
    rating: 4.0,
    price: 300
  }
];



const ContactSection = dynamic(() => import('@/components/ContactSection').then(mod => mod.ContactSection), { 
  loading: () => <div className="w-full h-64 animate-pulse bg-gray-50 rounded-xl my-10" /> 
});

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="w-full flex flex-col items-center">
        <Hero />
        <ProductSection 
          subtitle="TRENDING DESIGNS AND NEWLY ARRIVED PIECES YOU'LL LOVE"
          title="The New Standard"
          products={TRENDING_PRODUCTS}
        />
        <RecentlyViewedSection />
        <ShoppingMilestone />
        <ContactSection />
      </main>
    </div>
  );
}
