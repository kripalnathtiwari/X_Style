import { Product } from "@/components/ProductSection";

export const PRODUCTS: Product[] = [
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

export const getProductById = (id: string) => PRODUCTS.find(p => p.id === id);
