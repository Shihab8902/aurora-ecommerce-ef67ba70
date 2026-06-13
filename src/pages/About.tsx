import { motion } from 'motion/react';
import { Shield, Heart, Zap, Award, Globe, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export function About() {
  return (
    <div className="pt-24 md:pt-32 pb-24 bg-white overflow-hidden" data-jc-id="LIQUKS">
      {/* Hero Section */}
      <section className="container-custom mb-32" data-jc-id="LIQTU6">
        <div className="grid lg:grid-cols-2 gap-16 items-center" data-jc-id="LIQT7P">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          data-jc-id="LIQSJN">
            <span className="text-brand-primary font-bold text-[10px] md:text-xs uppercase tracking-[0.4em] mb-6 block" data-jc-id="LIQRNL">Our Legacy</span>
            <h1 className="text-4xl md:text-7xl font-heading font-bold mb-8 leading-tight text-brand-secondary" data-jc-id="LIQQBF">
              The Art of <span className="text-brand-primary" data-jc-id="LIQPI9">Simplicity</span>.
            </h1>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-6" data-jc-id="LIQOT4">
              Founded in 2026, Aurora Luxe was born from a simple observation: in a world filled with noise, true luxury is found in the essence of things. We believe that what you surround yourself with defines your perspective.
            </p>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-10" data-jc-id="RV3Z7X">
              From our humble beginnings in a small design studio in Zurich to our current global presence, we have remained committed to one goal: curating lifestyle essentials that meet the uncompromising "Aurora Standard" of minimalist excellence.
            </p>
            
            <div className="grid grid-cols-2 gap-12 py-10 border-y border-gray-100" data-jc-id="RV3WCF">
              <div data-jc-id="RV3VMO">
                <h4 className="text-3xl md:text-4xl font-heading font-bold mb-1 text-brand-secondary" data-jc-id="RV3VKW">50k+</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest" data-jc-id="RV3UTA">Global Deliveries</p>
              </div>
              <div data-jc-id="RV3TZB">
                <h4 className="text-3xl md:text-4xl font-heading font-bold mb-1 text-brand-secondary" data-jc-id="RV3DUV">98%</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest" data-jc-id="RV3D3A">Client Satisfaction</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          data-jc-id="RV3C5T">
            <div className="rounded-brand overflow-hidden shadow-luxe aspect-[4/5]" data-jc-id="RV3AO8">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200" alt="Design Studio" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" data-jc-id="RV39YH"/>
            </div>
            <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-brand-secondary text-white p-6 md:p-10 rounded-brand shadow-2xl max-w-[200px] md:max-w-[280px]" data-jc-id="RV37WC">
              <p className="text-sm md:text-base font-medium italic leading-relaxed mb-4" data-jc-id="RV2QVD">"Minimalism is not the lack of something. It is the perfect amount of something."</p>
              <div className="flex items-center gap-3" data-jc-id="RV2PYH">
                <div className="w-8 h-[1px] bg-brand-primary" data-jc-id="RV2PBA"/>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary" data-jc-id="RV2ONB">Nicholas Burrow</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-surface py-32 border-y border-gray-100 relative" data-jc-id="RV2N3A">
        <div className="container-custom relative z-10" data-jc-id="RV2MDJ">
          <div className="text-center mb-20" data-jc-id="RV2M8Z">
            <span className="text-brand-primary font-bold text-[10px] uppercase tracking-[0.3em] mb-4 block" data-jc-id="RV2LMN">Core Values</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-brand-secondary" data-jc-id="RV2KTF">The Aurora Philosophy</h2>
            <p className="text-gray-500 max-w-lg mx-auto text-sm md:text-base" data-jc-id="RV2K0A">These core values drive every design decision we make and every product we ship to your door.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8" data-jc-id="RV22Z3">
            {[
              { icon: Shield, title: "Uncompromising Quality", desc: "We source only the finest sustainable materials, from Italian leathers to organic textiles." },
              { icon: Heart, title: "Mindful Aesthetic", desc: "Every curve and color is intentional, designed to bring serenity and order to your everyday life." },
              { icon: Zap, title: "Modern Precision", desc: "Luxury shouldn't be slow. We leverage advanced tech to deliver excellence with surgical precision." }
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-brand border border-gray-100 hover:shadow-luxe hover:border-brand-primary/10 transition-all group"
              data-jc-id="RV1YIT">
                <div className="w-14 h-14 bg-brand-surface rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform" data-jc-id="RV1FYM">
                  <value.icon className="w-6 h-6 text-brand-primary" data-jc-id="RV1EKR"/>
                </div>
                <h3 className="text-xl font-bold mb-4 text-brand-secondary" data-jc-id="RV1DUU">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed" data-jc-id="RV1D4A">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Global Impact */}
      <section className="py-32" data-jc-id="RV1BMR">
        <div className="container-custom" data-jc-id="RV1BJF">
          <div className="grid lg:grid-cols-2 gap-20 items-center" data-jc-id="RV1AXR">
            <div className="relative group" data-jc-id="RV1ARQ">
              <div className="aspect-square rounded-brand overflow-hidden" data-jc-id="RV1A5F">
                <img src="https://images.unsplash.com/photo-1522071823991-b5ae7264040d?q=80&w=1200" alt="Our Team" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" data-jc-id="RV0TVX"/>
              </div>
              <div className="absolute top-6 right-6 flex flex-col gap-2" data-jc-id="RV0SBV">
                {[Globe, Users, Award].map((Icon, i) => (
                  <div key={i} className="w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg border border-white/20" data-jc-id="RV0RHT">
                    <Icon className="w-5 h-5 text-brand-secondary" data-jc-id="RV0Q3U"/>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-10" data-jc-id="RV0OPW">
              <div data-jc-id="RV0OMD">
                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 text-brand-secondary leading-tight" data-jc-id="RV0OKL">Crafted by Experts, Inspired by You.</h2>
                <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8" data-jc-id="RV0N6P">
                  Our team is composed of award-winning designers and master artisans from over 12 different countries, all sharing a single passion: making the world a more beautiful place, one object at a time.
                </p>
              </div>

              <div className="grid gap-6" data-jc-id="RV05AJ">
                <div className="flex gap-6 p-6 bg-brand-surface rounded-brand border border-transparent hover:border-gray-100 transition-all" data-jc-id="RV04OA">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm" data-jc-id="RV03U0">
                    <Award className="w-6 h-6 text-brand-primary" data-jc-id="RV030Y"/>
                  </div>
                  <div data-jc-id="RV02B2">
                    <h4 className="font-bold text-base text-brand-secondary mb-1" data-jc-id="RV0296">Sustainable Innovation</h4>
                    <p className="text-gray-500 text-xs leading-relaxed" data-jc-id="RV00ZJ">Named 'Emerging Designer of the Year' for our eco-conscious material science.</p>
                  </div>
                </div>
                <div className="flex gap-6 p-6 bg-brand-surface rounded-brand border border-transparent hover:border-gray-100 transition-all" data-jc-id="RUZJXL">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm" data-jc-id="RUZJ2Q">
                    <Globe className="w-6 h-6 text-brand-primary" data-jc-id="RUZIA9"/>
                  </div>
                  <div data-jc-id="RUZHKD">
                    <h4 className="font-bold text-base text-brand-secondary mb-1" data-jc-id="RUZHHW">Fair Trade Certified</h4>
                    <p className="text-gray-500 text-xs leading-relaxed" data-jc-id="RUZG8B">100% of our supply chain partners are audited for ethical labor and safety standards.</p>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row gap-4" data-jc-id="RUZEP0">
                <Link to="/shop" className="bg-brand-primary text-white font-bold h-14 px-10 rounded-full hover:bg-brand-secondary hover:shadow-luxe transition-all flex items-center justify-center gap-3 group" data-jc-id="RUZEIY">
                  Explore Collection
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" data-jc-id="RUYWUL"/>
                </Link>
                <button className="bg-white text-brand-secondary font-bold h-14 px-10 rounded-full border border-gray-100 hover:bg-brand-surface transition-all" data-jc-id="RUYW1J">
                  Contact Studio
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Ensure proper imports for icons and components
import { ArrowRight } from 'lucide-react';
