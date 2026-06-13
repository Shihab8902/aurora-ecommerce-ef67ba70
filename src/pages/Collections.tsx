import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import mockData from '../data/mockData.json';

export function Collections() {
  const categoryImages: Record<string, string> = {
    'Accessories': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800',
    'Apparel': 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800',
    'Home Decor': 'https://images.unsplash.com/photo-1513519247388-193ad51c50be?q=80&w=800'
  };

  return (
    <div className="pt-32 pb-24" data-jc-id="UJSQWW">
      <div className="container-custom" data-jc-id="UJSQU5">
        <div className="max-w-3xl mb-16" data-jc-id="UJSQ8J">
          <h1 className="text-4xl md:text-5xl font-heading mb-6" data-jc-id="UJSQ4E">Our Collections</h1>
          <p className="text-gray-500 text-lg leading-relaxed" data-jc-id="UJSPF9">
            Every piece at Aurora Luxe is part of a larger story. Explore our carefully curated collections, each defined by its own aesthetic and purpose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10" data-jc-id="NND495">
          {mockData.categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group"
            data-jc-id="NND3GQ">
              <Link to={`/shop?category=${cat.name}`} className="block relative h-[500px] rounded-[2.5rem] overflow-hidden" data-jc-id="NND18Q">
                <img 
                  src={categoryImages[cat.name] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800'} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                data-jc-id="NND0FJ"/>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/90 via-brand-secondary/20 to-transparent flex flex-col justify-end p-10" data-jc-id="NNCY6F">
                  <h2 className="text-4xl font-bold text-white mb-4" data-jc-id="NNCH78">{cat.name}</h2>
                  <p className="text-white/70 mb-8 max-w-sm line-clamp-2" data-jc-id="NNCGI4">
                    Discover our range of {cat.name.toLowerCase()} items, crafted with precision and the Aurora Luxe philosophy in mind.
                  </p>
                  <div className="flex items-center gap-4" data-jc-id="NNCEXF">
                    <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center text-white shadow-xl transform transition-transform group-hover:translate-x-2" data-jc-id="NNCEA4">
                      <ArrowRight className="w-6 h-6" data-jc-id="NNCCTK"/>
                    </div>
                    <span className="text-white font-bold uppercase tracking-widest text-xs" data-jc-id="NNCCMM">Explore Items</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Custom Seasonal Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 relative h-[400px] rounded-[3rem] overflow-hidden bg-brand-secondary flex items-center px-12 text-white"
        data-jc-id="NNCAGD">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200')] bg-cover bg-center opacity-30 pointer-events-none" data-jc-id="NNBSRY"/>
          <div className="relative z-10 max-w-xl" data-jc-id="NNBRAJ">
            <span className="text-brand-primary font-bold text-xs uppercase tracking-[0.4em] mb-4 block" data-jc-id="NNBR65">Limited Edition</span>
            <h2 className="text-4xl text-white mb-6" data-jc-id="NNBQCX">Spring 2026 Lookbook</h2>
            <p className="text-white/60 mb-8" data-jc-id="NNBPNZ">Get inspired by the latest trends and color palettes curated by our design team for the new season.</p>
            <button className="btn-primary" data-jc-id="NNBOAW">Download Lookbook</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
