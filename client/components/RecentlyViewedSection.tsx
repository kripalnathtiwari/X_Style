"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { fetchWithAuth } from '@/lib/api';
import { ProductSection, Product } from '@/components/ProductSection';

const MOCK_PRODUCTS: Product[] = [
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

export function RecentlyViewedSection() {
  const { token, isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS); // Fallback to mock products

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchWithAuth('/recently-viewed', {}, token)
        .then((res) => {
          const viewedProductIds = res.data.map((item: any) => item.productId);
          const viewedProducts = MOCK_PRODUCTS.filter(p => viewedProductIds.includes(p.id));
          if (viewedProducts.length > 0) {
            setProducts(viewedProducts);
          }
        })
        .catch(console.error);
    }
  }, [isAuthenticated, token]);

  return (
    <ProductSection 
      subtitle="CATCH UP ON WHAT YOU WERE LOOKING AT"
      title="Recently Viewed"
      products={products}
      cardVariant="compact"
      gridClassName="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
    />
  );
}
