"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { fetchWithAuth } from '@/lib/api';
import { ProductSection, Product } from '@/components/ProductSection';
import { PRODUCTS } from '@/lib/data';

export function RecentlyViewedSection() {
  const { user, token, isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>([]); 

  useEffect(() => {
    const loadRecentlyViewed = async () => {
      // 1. Try cache
      const cached = localStorage.getItem(`recently_viewed_${user?.id}`);
      if (cached) {
        try {
          setProducts(JSON.parse(cached));
        } catch (e) {}
      }

      if (isAuthenticated && token) {
        try {
          const res = await fetchWithAuth('/recently-viewed', {}, token);
          if (res.data && Array.isArray(res.data)) {
            const viewedProductIds = res.data.map((item: any) => item.productId);
            const viewedProducts = viewedProductIds
              .map(id => PRODUCTS.find(p => p.id === id))
              .filter((p): p is Product => p !== undefined)
              .slice(0, 6);
            
            setProducts(viewedProducts);
            localStorage.setItem(`recently_viewed_${user?.id}`, JSON.stringify(viewedProducts));
          }
        } catch (err) {
          console.error(err);
        }
      }
    };

    loadRecentlyViewed();
  }, [isAuthenticated, token, user?.id]);

  if (products.length === 0) return null;

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

