import dynamic from 'next/dynamic';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import type { Product } from '@/components/ProductSection';
import { PRODUCTS } from '@/lib/data';

const ProductSection = dynamic(() => import('@/components/ProductSection').then(mod => mod.ProductSection), { 
  loading: () => <div className="w-full h-64 animate-pulse bg-gray-50 rounded-xl my-10" /> 
});
const RecentlyViewedSection = dynamic(() => import('@/components/RecentlyViewedSection').then(mod => mod.RecentlyViewedSection), { 
  loading: () => <div className="w-full h-64 animate-pulse bg-gray-50 rounded-xl my-10" /> 
});
const ShoppingMilestone = dynamic(() => import('@/components/ShoppingMilestone').then(mod => mod.ShoppingMilestone), { 
  loading: () => <div className="w-full h-64 animate-pulse bg-gray-50 rounded-xl my-10" /> 
});

const CategorySection = dynamic(() => import('@/components/CategorySection').then(mod => mod.CategorySection), { 
  loading: () => <div className="w-full h-64 animate-pulse bg-gray-50 rounded-xl my-10" /> 
});
const FeaturesSection = dynamic(() => import('@/components/FeaturesSection').then(mod => mod.FeaturesSection), { 
  loading: () => <div className="w-full h-32 animate-pulse bg-gray-50 my-10" /> 
});
const NewsletterSection = dynamic(() => import('@/components/NewsletterSection').then(mod => mod.NewsletterSection), { 
  loading: () => <div className="w-full h-64 animate-pulse bg-gray-50 rounded-[3rem] my-10" /> 
});
const Footer = dynamic(() => import('@/components/Footer').then(mod => mod.Footer));

const TRENDING_PRODUCTS: Product[] = PRODUCTS.slice(0, 8);

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="w-full flex flex-col items-center">
        <Hero />
        <FeaturesSection />
        <CategorySection />
        <ProductSection 
          subtitle="TRENDING DESIGNS AND NEWLY ARRIVED PIECES YOU'LL LOVE"
          title="The New Standard"
          products={TRENDING_PRODUCTS}
        />
        <RecentlyViewedSection />
        <ShoppingMilestone />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
