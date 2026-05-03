"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/authContext';
import { fetchWithAuth } from '@/lib/api';
import { ProductSection, Product } from '@/components/ProductSection';
import { PRODUCTS } from '@/lib/data';

export function RecentlyViewedSection() {
  const { token, isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>([]); 

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchWithAuth('/recently-viewed', {}, token)
        .then((res) => {
          if (res.data && Array.isArray(res.data)) {
            const viewedProductIds = res.data.map((item: any) => item.productId);
            // Map the IDs to actual product objects in the order they were viewed
            const viewedProducts = viewedProductIds
              .map(id => PRODUCTS.find(p => p.id === id))
              .filter((p): p is Product => p !== undefined)
              .slice(0, 6);
            
            setProducts(viewedProducts);
          }
        })
        .catch(console.error);
    }
  }, [isAuthenticated, token]);

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

