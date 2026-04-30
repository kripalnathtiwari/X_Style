import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProductSection, Product } from '@/components/ProductSection';
import { RecentlyViewedSection } from '@/components/RecentlyViewedSection';
import { ShoppingMilestone } from '@/components/ShoppingMilestone';

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
      </main>
    </div>
  );
}
