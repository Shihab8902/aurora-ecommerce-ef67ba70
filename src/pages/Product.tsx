import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Star, 
  Shield, 
  Truck, 
  RefreshCcw, 
  ChevronLeft, 
  ChevronRight,
  Heart,
  Share2,
  X,
  CreditCard
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { useCart } from '../store/useCart';
import type { Product } from '../types/index';
import mockData from '../data/mockData.json';
import { ProductCard } from '../components/product/ProductCard';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

export function Product() {
  const { id } = useParams();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>('description');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const product = mockData.products.find(p => p.id === id);
  const relatedProducts = mockData.products.filter(p => p.category === product?.category && p.id !== id).slice(0, 4);

  if (!product) {
    return (
      <div className="pt-32 md:pt-40 text-center min-h-[60vh] px-4" data-jc-id="X3GHPO">
        <h2 className="text-xl md:text-2xl font-bold text-brand-secondary" data-jc-id="X3GH1J">Product not found</h2>
        <Link to="/shop" className="text-brand-primary underline mt-4 inline-block font-medium" data-jc-id="X3GGAW">Back to Shop</Link>
      </div>
    );
  }

  const images = (product.images && product.images.length > 0)
    ? (product.images.filter(img => img !== null) as string[])
    : [product.image];

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'details', label: 'Details' },
    { id: 'reviews', label: 'Reviews' }
  ];

  return (
    <div className="pt-20 md:pt-32 pb-16 md:pb-24 bg-white" data-jc-id="X3FX54">
      <div className="container-custom" data-jc-id="X3FWZV">
        {/* Breadcrumbs - Scrollable on mobile */}
        <nav className="flex items-center gap-2 text-[9px] md:text-[10px] uppercase tracking-widest font-bold mb-6 md:mb-8 overflow-x-auto whitespace-nowrap pb-2 md:pb-0 scrollbar-hide" data-jc-id="X3FW9C">
          <Link to="/" className="text-gray-400 hover:text-brand-primary transition-colors" data-jc-id="X3FUSU">Home</Link>
          <span className="text-gray-300" data-jc-id="X3FU21">/</span>
          <Link to="/shop" className="text-gray-400 hover:text-brand-primary transition-colors" data-jc-id="X3FTFM">{product.category}</Link>
          <span className="text-gray-300" data-jc-id="X3FSN5">/</span>
          <span className="text-brand-secondary truncate max-w-[150px]" data-jc-id="X3FSIT">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start" data-jc-id="X3FRRB">
          {/* Left Column: Image Gallery */}
          <div className="space-y-4 lg:sticky lg:top-32" data-jc-id="X3FQF0">
            <div className="relative group" data-jc-id="X3FQ9U">
              <Swiper
                modules={[Navigation, Thumbs, Autoplay]}
                spaceBetween={10}
                navigation={{
                  prevEl: '.product-prev',
                  nextEl: '.product-next',
                }}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                className="aspect-square rounded-brand overflow-hidden shadow-sm border border-gray-100"
              data-jc-id="X3FA2Y">
                {images.map((img, idx) => (
                  <SwiperSlide 
                    key={idx} 
                    className="bg-gray-50 group/slide cursor-zoom-in"
                    onClick={() => setSelectedImage(img)}
                  data-jc-id="X3F6BV">
                    <img 
                      src={img} 
                      alt={`${product.name} - ${idx + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/slide:scale-110"
                    data-jc-id="X3F4TJ"/>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation Arrows - Hidden on touch devices by default, visible on hover */}
              <button className="product-prev absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg md:opacity-0 md:group-hover:opacity-100 transition-all cursor-pointer" data-jc-id="X3EM7J">
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-brand-secondary" data-jc-id="X3EK1B"/>
              </button>
              <button className="product-next absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg md:opacity-0 md:group-hover:opacity-100 transition-all cursor-pointer" data-jc-id="X3EJ9S">
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-brand-secondary" data-jc-id="X3EH44"/>
              </button>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={8}
                slidesPerView={4}
                watchSlidesProgress={true}
                modules={[Navigation, Thumbs]}
                className="thumbs-swiper"
              data-jc-id="X3E028">
                {images.map((img, idx) => (
                  <SwiperSlide key={idx} className="cursor-pointer" data-jc-id="X3DXRM">
                    <div className="aspect-square rounded-brand overflow-hidden border-2 border-transparent transition-all [.swiper-slide-thumb-active_&]:border-brand-primary" data-jc-id="X3DX3H">
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" data-jc-id="X3DVNU"/>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col" data-jc-id="X3DU1A">
            <div className="flex items-center justify-between mb-3 md:mb-4" data-jc-id="X3DTFN">
              <span className="text-brand-primary font-bold text-[9px] md:text-[10px] uppercase tracking-[.3em]" data-jc-id="X3DD64">
                {product.category}
              </span>
              <div className="flex gap-2" data-jc-id="X3DC9D">
                <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-gray-100 rounded-full hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all cursor-pointer" data-jc-id="X3DBN4">
                  <Heart className="w-4 h-4 md:w-5 md:h-5" data-jc-id="X3DA4N"/>
                </button>
                <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-gray-100 rounded-full hover:bg-blue-50 hover:text-blue-500 hover:border-blue-100 transition-all cursor-pointer" data-jc-id="X3D9EX">
                  <Share2 className="w-4 h-4 md:w-5 md:h-5" data-jc-id="X3D7VS"/>
                </button>
              </div>
            </div>

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-brand-secondary mb-3 md:mb-4 leading-tight" data-jc-id="X3D72O">
              {product.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 md:gap-6 mb-6 md:mb-8" data-jc-id="X3CQ1H">
              <div className="flex items-center gap-1.5" data-jc-id="X3CPBP">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 md:w-3.5 md:h-3.5 ${i <= Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} 
                  data-jc-id="X3COKU"/>
                ))}
                <span className="ml-1 md:ml-2 text-xs md:sm font-bold text-brand-secondary" data-jc-id="X3CMH9">{product.rating.toFixed(1)}</span>
              </div>
              <div className="hidden md:block w-1 h-1 rounded-full bg-gray-300" data-jc-id="X3CLMY"/>
              <span className="text-xs md:sm text-gray-500 font-medium" data-jc-id="X3CKXW">128 Reviews</span>
              <div className="hidden md:block w-1 h-1 rounded-full bg-gray-300" data-jc-id="X3CK7G"/>
              <span className="text-xs md:sm text-emerald-500 font-bold uppercase tracking-wider" data-jc-id="X3CJIE">In Stock</span>
            </div>

            <p className="text-3xl md:text-4xl font-heading font-bold text-brand-primary mb-6 md:mb-8" data-jc-id="X3C34H">
              ${product.price.toFixed(2)}
            </p>

            <div className="space-y-6 md:space-y-8 mb-10 md:mb-12" data-jc-id="X3C1QF">
              <p className="text-gray-600 text-sm md:text-base leading-relaxed" data-jc-id="X3C1KE">
                Experience unparalleled quality with our {product.name}. Designed for those who appreciate minimalist aesthetics without compromising on performance or comfort.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4" data-jc-id="X3BZAQ">
                <button
                  onClick={() => addItem(product)}
                  className="border-2 border-brand-secondary text-brand-secondary font-bold h-12 md:h-14 px-8 md:px-10 rounded-full hover:bg-brand-secondary hover:text-white transition-all active:scale-95 flex items-center justify-center gap-3 flex-1 cursor-pointer text-sm md:text-base"
                data-jc-id="X3BYKY">
                  <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" data-jc-id="X3BG38"/>
                  Add to Cart
                </button>
                <button 
                  onClick={() => {
                    addItem(product);
                    navigate('/checkout');
                  }}
                  className="bg-brand-primary text-white font-bold h-12 md:h-14 px-8 md:px-10 rounded-full hover:bg-brand-secondary hover:shadow-luxe transition-all active:scale-95 flex-1 flex items-center justify-center gap-3 cursor-pointer text-sm md:text-base"
                data-jc-id="X3BFAR">
                  <CreditCard className="w-4 h-4 md:w-5 md:h-5" data-jc-id="X3BBPP"/>
                  Buy Now
                </button>
              </div>
            </div>

            {/* Features Row */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 p-4 md:p-6 bg-brand-surface rounded-brand border border-gray-100 mb-10 md:mb-12 shadow-[0_2px_10px_rgba(0,0,0,0.02)]" data-jc-id="X3BA99">
              <div className="flex flex-col items-center text-center gap-1.5 md:gap-2" data-jc-id="VJOKEC">
                <Truck className="w-4 h-4 md:w-5 md:h-5 text-brand-primary" data-jc-id="VJOK6L"/>
                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-brand-secondary" data-jc-id="VJOJHN">Free Ship</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 md:gap-2" data-jc-id="VJOI4H">
                <RefreshCcw className="w-4 h-4 md:w-5 md:h-5 text-brand-primary" data-jc-id="VJOHEN"/>
                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-brand-secondary" data-jc-id="VJOH7N">30 Day Ret</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1.5 md:gap-2" data-jc-id="VJOFTV">
                <Shield className="w-4 h-4 md:w-5 md:h-5 text-brand-primary" data-jc-id="VJOF41"/>
                <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-brand-secondary" data-jc-id="VJOEF2">Secured</span>
              </div>
            </div>

            {/* Tabs System */}
            <div className="border-t border-gray-100 pt-8 md:pt-10" data-jc-id="VJNXD2">
              <div className="flex gap-6 md:gap-8 mb-6 md:mb-8 border-b border-gray-100 overflow-x-auto scrollbar-hide" data-jc-id="VJNX70">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-3 md:pb-4 text-[11px] md:text-sm font-bold uppercase tracking-widest transition-all relative cursor-pointer whitespace-nowrap ${
                      activeTab === tab.id ? 'text-brand-primary' : 'text-gray-400 hover:text-brand-secondary'
                    }`}
                  data-jc-id="VJNVT2">
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" 
                      data-jc-id="VJNS1Q"/>
                    )}
                  </button>
                ))}
              </div>

              <div className="min-h-[150px] md:min-h-[200px]" data-jc-id="VJNAA4">
                <AnimatePresence mode="wait" data-jc-id="VJN9MQ">
                  {activeTab === 'description' && (
                    <motion.div
                      key="description"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-gray-600 text-xs md:text-sm leading-relaxed space-y-3 md:space-y-4"
                    data-jc-id="VJN8VZ">
                      <p data-jc-id="VJN6IP">{product.description}</p>
                      <p data-jc-id="VJN5VP">Each piece is meticulously crafted using sustainable materials and ethical practices. Our design philosophy focuses on longevity, ensuring your purchase remains a timeless staple in your collection.</p>
                    </motion.div>
                  )}
                  {activeTab === 'details' && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    data-jc-id="VJN3LN">
                      <div className="grid grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm" data-jc-id="VJMLT4">
                        <div className="text-gray-400" data-jc-id="VJML37">Material</div>
                        <div className="text-brand-secondary font-medium text-right" data-jc-id="VJMKF3">Premium Sustainable Blend</div>
                        <div className="text-gray-400" data-jc-id="VJMJMR">Dimensions</div>
                        <div className="text-brand-secondary font-medium text-right" data-jc-id="VJMIYL">24 x 18 x 8 inches</div>
                        <div className="text-gray-400" data-jc-id="VJMI71">Weight</div>
                        <div className="text-brand-secondary font-medium text-right" data-jc-id="VJMI12">0.85 kg</div>
                        <div className="text-gray-400" data-jc-id="VJMHAE">Shipping</div>
                        <div className="text-brand-secondary font-medium text-right" data-jc-id="VJMGMA">Free Worldwide Delivery</div>
                      </div>
                    </motion.div>
                  )}
                  {activeTab === 'reviews' && (
                    <motion.div
                      key="reviews"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4 md:space-y-6"
                    data-jc-id="VJLYYP">
                      <div className="flex items-center justify-between mb-2 md:mb-4" data-jc-id="VJLWPT">
                        <h4 className="font-bold text-xs md:text-sm text-brand-secondary" data-jc-id="VJLW00">Customer Feedback</h4>
                        <button className="text-brand-primary text-[10px] font-bold uppercase tracking-widest hover:underline cursor-pointer" data-jc-id="VJLV8D">Write a Review</button>
                      </div>
                      <div className="space-y-4 md:space-y-6" data-jc-id="VJLTRR">
                        {[1, 2].map(i => (
                          <div key={i} className="p-4 bg-brand-surface rounded-brand border border-gray-50" data-jc-id="VJLDFM">
                            <div className="flex items-center gap-1 mb-2" data-jc-id="VJLCNG">
                              {[1, 2, 3, 4, 5].map(star => (
                                <Star key={star} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" data-jc-id="VJLBTB"/>
                              ))}
                            </div>
                            <p className="text-gray-600 text-[11px] md:text-xs italic mb-2" data-jc-id="VJLAEF">"Absolutely love the minimalist design and the build quality is far beyond what I expected. Highly recommended!"</p>
                            <span className="text-[9px] font-bold text-brand-secondary uppercase tracking-tighter" data-jc-id="VJL8W7">— Verified Buyer</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 md:mt-32" data-jc-id="VJKPQA">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 md:mb-12" data-jc-id="VJKPM0">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-brand-secondary" data-jc-id="VJKOTJ">You Might Also Like</h2>
              <Link to="/shop" className="text-brand-primary text-[10px] md:text-xs font-bold uppercase tracking-widest hover:underline flex items-center gap-2" data-jc-id="VJKO14">
                Explore More <ChevronRight className="w-3.5 h-3.5" data-jc-id="VJKMLJ"/>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" data-jc-id="VJKLV0">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} data-jc-id="VJKKJF"/>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence data-jc-id="VJKJNN">
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          data-jc-id="VJK3FX">
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors cursor-pointer z-[110]"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            data-jc-id="VJK16V">
              <X className="w-5 h-5 md:w-6 md:h-6" data-jc-id="VJJXI7"/>
            </motion.button>
            
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Zoomed product"
              className="max-w-full max-h-full md:max-h-[90vh] object-contain rounded-brand shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            data-jc-id="VJJWRO"/>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
