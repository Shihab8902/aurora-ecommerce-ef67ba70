import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { ArrowRight, HelpCircle, Plus, Minus } from 'lucide-react';
import { motion } from 'motion/react';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { ProductCard } from '../components/product/ProductCard';
import { CategorySlider } from '../features/categories/components/CategorySlider';
import { PromoBanner } from '../components/common/PromoBanner';
import { ReviewSlider } from '../features/reviews/components/ReviewSlider';
import mockData from '../data/mockData.json';
import type { Product } from '../types/index';

export function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const heroSlides = [
    { image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1600", link: "/shop" },
    { image: "https://images.unsplash.com/photo-1525562723836-dca67a71d5f1?q=80&w=1600", link: "/shop" },
    { image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600", link: "/shop" },
    { image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1600", link: "/shop" }
  ];

  // Section product slicing
  const featuredProducts = (mockData.products as unknown as Product[]).slice(0, 4);
  const newArrivals = (mockData.products as unknown as Product[]).slice(4, 8);
  const trendingProducts = (mockData.products as unknown as Product[]).slice(8, 12);
  const bestSellers = (mockData.products as unknown as Product[]).slice(12, 16);
  const limitedEdition = (mockData.products as unknown as Product[]).slice(16, 20);
  const seasonalPicks = (mockData.products as unknown as Product[]).slice(0, 4);

  const faqs = [
    { q: "What is your return policy?", a: "We offer a 30-day hassle-free return policy for all unused items in their original packaging." },
    { q: "How long does shipping take?", a: "Standard shipping typically takes 3-5 business days. Express options are available at checkout." },
    { q: "Do you ship internationally?", a: "Yes, we ship to over 50 countries worldwide. Shipping costs vary by location." }
  ];

  const SectionHeader = ({ tag, title, link }: { tag: string, title: string, link?: string }) => (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6" data-jc-id="ACA5BH">
      <div data-jc-id="ACA4LM">
        <span className="text-brand-primary font-bold text-[10px] uppercase tracking-[.3em] mb-2 block" data-jc-id="ACA4KN">{tag}</span>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-secondary" data-jc-id="ACA3A8">{title}</h2>
      </div>
      <Link to={link || "/shop"} className="text-brand-primary font-bold text-xs uppercase tracking-wider hover:underline inline-flex items-center group" data-jc-id="ACA2IL">
        Explore more <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" data-jc-id="ACA1LV"/>
      </Link>
    </div>
  );

  return (
    <div className="pt-20" data-jc-id="ACA0AF">
      {/* 1. Hero Carousel */}
      <section className="pt-4 md:pt-6 pb-12 md:pb-16 lg:pb-[50px]" data-jc-id="ACA04N">
        <div className="container-custom" data-jc-id="AC9JVX">
          <div className="relative h-[250px] md:h-[450px] overflow-hidden rounded-brand shadow-luxe" data-jc-id="AC9JSC">
            <Carousel
              showArrows={true}
              showStatus={false}
              showThumbs={false}
              infiniteLoop={true}
              autoPlay={true}
              interval={5000}
              transitionTime={800}
              className="hero-carousel h-full"
            data-jc-id="AC9IIV">
              {heroSlides.map((slide, idx) => (
                <Link key={idx} to={slide.link} className="block relative h-[250px] md:h-[450px] group" data-jc-id="AC9G5K">
                  <img src={slide.image} alt="Hero Banner" className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-105" data-jc-id="AC9FEO"/>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" data-jc-id="AC9E0R"/>
                </Link>
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* 1.5 This text was updated from jellycueb */}
      <CategorySlider categories={mockData.categories} data-jc-id="AC8WSU"/>

      {/* 2. Featured Products */}
      <section className="py-12 md:py-16 lg:py-[50px] bg-brand-surface" id="featured" data-jc-id="AC8W2W">
        <div className="container-custom" data-jc-id="AC8VD3">
          <SectionHeader tag="Curated Picks" title="Featured Essentials" data-jc-id="AC8UQU"/>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6" data-jc-id="AC8UKN">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} data-jc-id="AC8TA8"/>
            ))}
          </div>
        </div>
      </section>

      <PromoBanner 
        title="Minimalist Objects"
        image="https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?q=80&w=1600"
        link="/shop"
      data-jc-id="AC8SHQ"/>

      {/* 3. New Arrivals Section */}
      <section className="py-12 md:py-16 lg:py-[50px] bg-white" data-jc-id="AC8QYT">
        <div className="container-custom" data-jc-id="AC8QBD">
          <SectionHeader tag="Just Landed" title="New Arrivals" data-jc-id="AC8Q77"/>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6" data-jc-id="AC89YL">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} data-jc-id="AC896Z"/>
            ))}
          </div>
        </div>
      </section>

      <PromoBanner 
        title="Modern Living"
        image="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=1600"
        link="/shop"
      data-jc-id="AC88EH"/>

      {/* 4. Trending Now Section */}
      <section className="py-12 md:py-16 lg:py-[50px] bg-brand-surface" data-jc-id="AC86WA">
        <div className="container-custom" data-jc-id="AC8681">
          <SectionHeader tag="Top Rated" title="Trending Now" data-jc-id="AC863V"/>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6" data-jc-id="AC85GH">
            {trendingProducts.map(product => (
              <ProductCard key={product.id} product={product} data-jc-id="AC84O5"/>
            ))}
          </div>
        </div>
      </section>

      <PromoBanner 
        title="Home Sanctuary"
        image="https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=1600"
        link="/shop"
      data-jc-id="AC83VN"/>

      {/* 4.1 Best Sellers Section */}
      <section className="py-12 md:py-16 lg:py-[50px] bg-white" data-jc-id="AC7MAQ">
        <div className="container-custom" data-jc-id="AC7M4S">
          <SectionHeader tag="Customer Favorites" title="Best Sellers" data-jc-id="AC7LIJ"/>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6" data-jc-id="AC7LCE">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} data-jc-id="AC7K2P"/>
            ))}
          </div>
        </div>
      </section>

      <PromoBanner 
        title="Timeless Style"
        image="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600"
        link="/shop"
      data-jc-id="AC7J9M"/>

      {/* 4.2 Limited Edition Section */}
      <section className="py-12 md:py-16 lg:py-[50px] bg-brand-surface" data-jc-id="AC7HRA">
        <div className="container-custom" data-jc-id="AC7H31">
          <SectionHeader tag="Exclusive Drops" title="Limited Edition" data-jc-id="AC7GYV"/>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6" data-jc-id="AC7GAN">
            {limitedEdition.map(product => (
              <ProductCard key={product.id} product={product} data-jc-id="AC6ZXS"/>
            ))}
          </div>
        </div>
      </section>

      <PromoBanner 
        title="Next-Gen Sound"
        image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1600"
        link="/shop"
      data-jc-id="AC6Z5A"/>

      {/* 4.3 Seasonal Picks Section */}
      <section className="py-12 md:py-16 lg:py-[50px] bg-white" data-jc-id="AC6XMZ">
        <div className="container-custom" data-jc-id="AC6WYY">
          <SectionHeader tag="Seasonal Essentials" title="Spring Picks" data-jc-id="AC6WVD"/>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6" data-jc-id="AC6W6J">
            {seasonalPicks.map(product => (
              <ProductCard key={product.id} product={product} data-jc-id="AC6VEV"/>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Shop by Category */}
      <section className="py-12 md:py-16 lg:py-[50px] bg-brand-surface" data-jc-id="AC6U10">
        <div className="container-custom" data-jc-id="AC6TC6">
          <div className="text-center mb-12" data-jc-id="AC6T8L">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-secondary mb-4" data-jc-id="AC6D1O">Shop by Category</h2>
            <p className="text-gray-500 max-w-lg mx-auto text-sm" data-jc-id="AC6C99">Explore our diverse ranges, from everyday essentials to luxury statement pieces.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-jc-id="AC6BD8">
            {[
              { name: 'Apparel', img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800', count: '12 Items' },
              { name: 'Accessories', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800', count: '24 Items' },
              { name: 'Home Decor', img: 'https://images.unsplash.com/photo-1513519247388-193ad51c50be?q=80&w=800', count: '18 Items' },
            ].map((cat, idx) => (
              <Link to="/shop" key={idx} className="group relative h-[350px] rounded-brand overflow-hidden" data-jc-id="AC6735">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-jc-id="AC66BK"/>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-secondary/80 via-transparent to-transparent flex flex-col justify-end p-6" data-jc-id="AC5PW1">
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1" data-jc-id="AC5OI8">{cat.count}</span>
                  <h3 className="text-xl font-bold text-white mb-2" data-jc-id="AC5NPR">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Voices of Aurora (Reviews) */}
      <ReviewSlider testimonials={mockData.testimonials} data-jc-id="AC5M5V"/>

      {/* 7. FAQ Section */}
      <section className="py-12 md:py-16 lg:py-[50px] bg-brand-surface" data-jc-id="AC5LG1">
        <div className="container-custom max-w-3xl" data-jc-id="AC5KRS">
          <div className="text-center mb-12" data-jc-id="AC5K4O">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-primary/10 rounded-full mb-4" data-jc-id="AC5K10">
              <HelpCircle className="w-6 h-6 text-brand-primary" data-jc-id="AC5J8L"/>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-secondary mb-4" data-jc-id="YK8GNO">Frequently Asked Questions</h2>
            <p className="text-gray-500 text-sm" data-jc-id="YK8HGY">Quick answers to common questions about our service and products.</p>
          </div>
          
          <div className="space-y-4" data-jc-id="YK8ITB">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-100 rounded-brand overflow-hidden" data-jc-id="YK8JIA">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-brand-surface transition-colors cursor-pointer"
                data-jc-id="YK8K8W">
                  <span className="font-bold text-sm text-brand-secondary" data-jc-id="YK8LWA">{faq.q}</span>
                  {openFaq === idx ? <Minus className="w-4 h-4 text-brand-primary" data-jc-id="YK8MNT"/> : <Plus className="w-4 h-4 text-gray-400" data-jc-id="YK8NA8"/>}
                </button>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-5 pb-5 text-gray-500 text-sm leading-relaxed"
                  data-jc-id="YK93NZ">
                    {faq.a}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
