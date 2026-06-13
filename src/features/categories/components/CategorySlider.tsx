import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

interface CategorySliderProps {
  categories: Category[];
}

export function CategorySlider({ categories }: CategorySliderProps) {
  return (
    <section className="py-12 md:py-16 lg:py-[50px] bg-white" data-jc-id="L8W81Z">
      <div className="container-custom" data-jc-id="L8W7W3">
        <div className="flex items-center justify-between mb-8" data-jc-id="L8W7AH">
          <div data-jc-id="L8W74J">
            <span className="text-brand-primary font-bold text-[10px] uppercase tracking-[.3em] mb-2 block" data-jc-id="L8W6KS">Browse Collection</span>
            <h2 className="text-2xl md:text-3xl font-heading font-bold" data-jc-id="L8W5RF">This text was updated f</h2>
          </div>
          <div className="flex gap-2" data-jc-id="L8W4ZT">
            <button className="swiper-prev-cat cursor-pointer bg-white border border-gray-100 p-2 rounded-full shadow-sm hover:bg-brand-surface transition-colors" data-jc-id="L8W4WC">
              <ChevronLeft className="w-5 h-5 text-brand-secondary" data-jc-id="JDSZVK"/>
            </button>
            <button className="swiper-next-cat cursor-pointer bg-white border border-gray-100 p-2 rounded-full shadow-sm hover:bg-brand-surface transition-colors" data-jc-id="JDSZ5P">
              <ChevronRight className="w-5 h-5 text-brand-secondary" data-jc-id="JDSXR0"/>
            </button>
          </div>
        </div>

        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={16}
          slidesPerView={2}
          slidesPerGroup={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: '.swiper-prev-cat',
            nextEl: '.swiper-next-cat',
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 24,
            },
          }}
          className="category-swiper !pb-12 !pt-4 !px-4 !-mx-4"
        data-jc-id="JDSWYK">
          {categories.map((cat) => (
            <SwiperSlide key={cat.id} data-jc-id="JDSBDS">
              <Link
                to={`/shop?category=${cat.slug}`}
                className="block group"
              data-jc-id="JDSAS8">
                <div className="bg-white rounded-brand shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden transition-all duration-300 group-hover:shadow-luxe group-hover:-translate-y-1" data-jc-id="JDS9Z0">
                  <div className="aspect-square overflow-hidden bg-gray-50 relative" data-jc-id="JDS8GN">
                    <div className="absolute inset-0 animate-shimmer" data-jc-id="JDS7QV"/>
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 relative z-10"
                    data-jc-id="JDS72O"/>
                  </div>
                  <div className="p-3 text-center" data-jc-id="JDRP8G">
                    <h3 className="font-bold text-xs text-brand-secondary tracking-tight" data-jc-id="JDRP41">{cat.name}</h3>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
