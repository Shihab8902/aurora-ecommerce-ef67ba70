import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
}

interface ReviewSliderProps {
  testimonials: Testimonial[];
}

export function ReviewSlider({ testimonials }: ReviewSliderProps) {
  return (
    <section className="py-12 md:py-16 lg:py-[50px] bg-white overflow-hidden" data-jc-id="HMTP30">
      <div className="container-custom" data-jc-id="HMTOW3">
        <div className="flex items-center justify-between mb-10" data-jc-id="HMTO9W">
          <div data-jc-id="HMTO4I">
            <span className="text-brand-primary font-bold text-[10px] uppercase tracking-[.3em] mb-2 block" data-jc-id="HMTNKR">Customer Voices</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold" data-jc-id="HMTMRG">Voices of Aurora</h2>
          </div>
          <div className="flex gap-2" data-jc-id="HMTLZX">
            <button className="swiper-prev-rev cursor-pointer bg-white border border-gray-100 p-2.5 rounded-full shadow-sm hover:bg-brand-surface transition-all active:scale-95" data-jc-id="HMTLWG">
              <ChevronLeft className="w-5 h-5 text-brand-secondary" data-jc-id="LL9B22"/>
            </button>
            <button className="swiper-next-rev cursor-pointer bg-white border border-gray-100 p-2.5 rounded-full shadow-sm hover:bg-brand-surface transition-all active:scale-95" data-jc-id="LL9BSI">
              <ChevronRight className="w-5 h-5 text-brand-secondary" data-jc-id="LL9D87"/>
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto" data-jc-id="LL9E0N">
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: '.swiper-prev-rev',
              nextEl: '.swiper-next-rev',
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="review-swiper !pb-12 !pt-4 !px-4 !-mx-4"
          data-jc-id="LL9EMC">
            {testimonials.map((t) => (
              <SwiperSlide key={t.id} data-jc-id="LL9ZIT">
                <div className="bg-white rounded-brand border border-gray-100 p-8 h-full flex flex-col shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-luxe hover:-translate-y-1 group" data-jc-id="LLA04D">
                  <div className="flex items-center gap-1 mb-6" data-jc-id="LLA1NE">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3.5 h-3.5 ${i < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} 
                      data-jc-id="LLA2FT"/>
                    ))}
                  </div>
                  
                  <div className="relative mb-8 flex-1" data-jc-id="LLAK5Y">
                    <Quote className="absolute -top-4 -left-2 w-8 h-8 text-brand-primary/5 -z-10 group-hover:text-brand-primary/10 transition-colors" data-jc-id="LLAKB3"/>
                    <p className="text-gray-600 text-sm leading-relaxed italic" data-jc-id="LLALO9">"{t.comment}"</p>
                  </div>

                  <div className="flex items-center gap-4 pt-6 border-t border-gray-50" data-jc-id="LLAMGQ">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-primary/10" data-jc-id="LLAN6L">
                      <img 
                        src={t.avatar} 
                        alt={t.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      data-jc-id="LLANZ1"/>
                    </div>
                    <div data-jc-id="LLAQ59">
                      <h4 className="font-bold text-sm text-brand-secondary tracking-tight" data-jc-id="LLAQ7S">{t.name}</h4>
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest font-medium" data-jc-id="LLAQYN">{t.role}</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
