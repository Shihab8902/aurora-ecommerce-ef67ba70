import { useState, useEffect } from 'react';
import type { Product } from '../../types/index';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { useCart } from '../../store/useCart';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useConfig } from '../providers/ThemeProvider';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const config = useConfig();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const images = product.images && product.images.length > 1 ? product.images : [product.image];
  const intervalTime = config.features.productImageCycleInterval || 4000;

  useEffect(() => {
    // Preload all product images to prevent white flicker during cycle
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [images.length, intervalTime]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-brand overflow-hidden border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-luxe transition-all duration-300 cursor-pointer"
    data-jc-id="6HFI4A">
      <Link to={`/product/${product.id}`} className="block" data-jc-id="6HFFQB">
        {/* Image Container with Shimmer Skeleton */}
        <div className="aspect-[3/4] overflow-hidden relative bg-gray-50" data-jc-id="6HFEYK">
          {!isLoaded && <div className="absolute inset-0 animate-shimmer" data-jc-id="6HFE8P"/>}
          <AnimatePresence data-jc-id="6HFDKR">
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={product.name}
              onLoad={() => setIsLoaded(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            data-jc-id="6HFDI6"/>
          </AnimatePresence>

          {/* Overlay Buttons */}
          <div className="absolute inset-0 bg-brand-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3" data-jc-id="6HETJ1">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-secondary hover:bg-brand-primary hover:text-white transition-colors shadow-lg cursor-pointer" data-jc-id="6HES3J">
              <Eye className="w-5 h-5" data-jc-id="6HEQM4"/>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addItem(product);
              }}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-secondary hover:bg-brand-primary hover:text-white transition-colors shadow-lg z-20 cursor-pointer"
            data-jc-id="6HEQGZ">
              <ShoppingCart className="w-5 h-5" data-jc-id="6HE7YF"/>
            </button>
          </div>

          {/* Badges */}
          {product.featured && (
            <span className="absolute top-4 left-4 bg-brand-accent text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider" data-jc-id="6HE6LF">
              Premium
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4" data-jc-id="6HE50I">
          <div className="flex items-center justify-between mb-1.5" data-jc-id="6HE4FS">
            <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400" data-jc-id="6HE49Q">
              {product.category}
            </span>
            <div className="flex items-center gap-1" data-jc-id="6HDNC7">
              <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" data-jc-id="6HDN7Q"/>
              <span className="text-[10px] font-medium text-gray-600" data-jc-id="6HDMIS">{product.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="text-[15px] font-bold text-brand-secondary group-hover:text-brand-primary transition-colors mb-0.5 line-clamp-1" data-jc-id="6HDLOP">
            {product.name}
          </h3>
          <p className="text-[15px] font-heading font-semibold text-brand-primary" data-jc-id="6HDK8Z">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
