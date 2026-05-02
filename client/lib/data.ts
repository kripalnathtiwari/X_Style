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
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&q=80',
    category: 'SHIRTS',
    title: 'Classic White Button-Down',
    rating: 4.5,
    price: 800
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80',
    category: 'T-SHIRTS',
    title: 'Graphic Print Tee',
    rating: 4.2,
    price: 450
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80',
    category: 'JACKETS',
    title: 'Denim Trucker Jacket',
    rating: 4.8,
    price: 2500
  },
  {
    id: '7',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80',
    category: 'JACKETS',
    title: 'Leather Biker Jacket',
    rating: 4.9,
    price: 4500
  },
  {
    id: '8',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80',
    category: 'PANTS',
    title: 'Slim Fit Jeans',
    rating: 4.1,
    price: 1200
  },
  {
    id: '9',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80',
    category: 'PANTS',
    title: 'Cargo Trousers',
    rating: 3.9,
    price: 1500
  },
  {
    id: '10',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80',
    category: 'HOODIES',
    title: 'Essential Pullover Hoodie',
    rating: 4.6,
    price: 1800
  },
  {
    id: '11',
    image: 'https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&q=80',
    category: 'HOODIES',
    title: 'Zip-Up Tech Fleece',
    rating: 4.4,
    price: 2200
  },
  {
    id: '12',
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80',
    category: 'ACCESSORIES',
    title: 'Classic Beanie',
    rating: 4.0,
    price: 400
  }
];

export const getProductById = (id: string) => PRODUCTS.find(p => p.id === id);
