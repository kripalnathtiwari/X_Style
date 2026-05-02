import Link from 'next/link';
import Image from 'next/image';

const CATEGORIES = [
  { id: '1', name: 'Shirts & Polos', href: '/store?category=shirts', image: 'https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&q=80', span: 'col-span-1 md:col-span-2 row-span-2' },
  { id: '2', name: 'Jackets', href: '/store?category=jackets', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80', span: 'col-span-1' },
  { id: '3', name: 'Hoodies', href: '/store?category=hoodies', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80', span: 'col-span-1' },
  { id: '4', name: 'Pants', href: '/store?category=pants', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80', span: 'col-span-1 md:col-span-2' },
];

export function CategorySection() {
  return (
    <section className="px-4 md:px-8 py-16 w-full max-w-7xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] tracking-tighter mb-4">Shop by Category</h2>
        <p className="text-gray-500 font-medium max-w-2xl mx-auto">
          Explore our meticulously curated collections, designed to elevate your everyday wardrobe with premium materials and timeless aesthetics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px]">
        {CATEGORIES.map((cat) => (
          <Link 
            href={cat.href} 
            key={cat.id}
            className={`relative group rounded-3xl overflow-hidden block ${cat.span}`}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10 duration-500"></div>
            <Image 
              src={cat.image} 
              alt={cat.name} 
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
            />
            <div className="absolute bottom-6 left-6 z-20">
              <h3 className="text-2xl font-black text-white tracking-tight mb-1">{cat.name}</h3>
              <span className="text-white/80 text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                Explore <span className="text-lg leading-none">&rarr;</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
