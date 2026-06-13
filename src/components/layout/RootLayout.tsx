import { Outlet, Link, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { AnimatePresence } from 'motion/react';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useConfig } from '../providers/ThemeProvider';

export function RootLayout() {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);
  const config = useConfig();

  useEffect(() => {
    // Disable browser's automatic scroll restoration
    window.history.scrollRestoration = 'manual';
    
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Instant scroll to top on EVERY route change
  useEffect(() => {
    // 1. Force instant window scroll
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
    
    // 2. Force Lenis to reset instantly if it exists
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col" data-jc-id="NS0W0G">
      <Navbar data-jc-id="NS0VW4"/>
      <main className="flex-1" data-jc-id="NS0VUH">
        <AnimatePresence mode="wait" data-jc-id="NS0V9P">
          {/* Key on main ensures full re-render and clean state for animations */}
          <div key={location.pathname} data-jc-id="NS0UH6">
            <Outlet data-jc-id="NS0UD3"/>
          </div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-brand-secondary text-white py-20 px-8" data-jc-id="NS0TN2">
        <div className="container-custom grid grid-cols-1 md:grid-cols-4 gap-12" data-jc-id="NS0SYY">
          <div className="md:col-span-1" data-jc-id="NS0S9A">
            <Link to="/" className="inline-block mb-6" data-jc-id="NS0S5Q">
              <img src={config.brand.logoWhite} alt={config.brand.name} className="h-10 w-auto" data-jc-id="NS0RIJ"/>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-8" data-jc-id="NS0B5M">
              Curating minimalist lifestyle essentials for the modern world. Excellence in every stitch and shard.
            </p>
          </div>
          <div data-jc-id="NS09N5">
            <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs" data-jc-id="NS09LH">Collection</h4>
            <ul className="space-y-4 text-white/60 text-sm" data-jc-id="NS08U3">
              <li data-jc-id="NS086R"><Link to="/shop" className="hover:text-brand-primary transition-colors" data-jc-id="NS086N">All Products</Link></li>
              <li data-jc-id="NS07F2"><Link to="/collections" className="hover:text-brand-primary transition-colors" data-jc-id="NS07ED">Featured Collections</Link></li>
              <li data-jc-id="NS06LS"><Link to="/shop" className="hover:text-brand-primary transition-colors" data-jc-id="NS0630">New Arrivals</Link></li>
            </ul>
          </div>
          <div data-jc-id="NS058T">
            <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs" data-jc-id="NS0575">Customer</h4>
            <ul className="space-y-4 text-white/60 text-sm" data-jc-id="NS04GE">
              <li data-jc-id="NRZO8H"><Link to="/cart" className="hover:text-brand-primary transition-colors" data-jc-id="NRZO7S">Shopping Bag</Link></li>
              <li data-jc-id="NRZNG7"><Link to="/login" className="hover:text-brand-primary transition-colors" data-jc-id="NRZNG3">My Account</Link></li>
              <li data-jc-id="NRZMOJ"><Link to="/shipping" className="hover:text-brand-primary transition-colors" data-jc-id="NRZMNU">Shipping Info</Link></li>
            </ul>
          </div>
          <div data-jc-id="NRZLBF">
            <h4 className="font-bold mb-6 text-white uppercase tracking-widest text-xs" data-jc-id="NRZL9R">Contact</h4>
            <ul className="space-y-4 text-white/60 text-sm" data-jc-id="NRZKJ1">
              <li data-jc-id="NRZKD7">hi@auroraluxe.com</li>
              <li data-jc-id="NRZJRN">+1 (555) 000-0000</li>
              <li data-jc-id="NRZJO6">123 Minimalist St, Design City</li>
            </ul>
          </div>
        </div>
        <div className="container-custom mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8" data-jc-id="NRZIXJ">
          <div className="flex flex-col gap-2" data-jc-id="NRZHLA">
            <div className="text-white/30 text-[10px] uppercase tracking-widest" data-jc-id="NRZHGZ">
              © 2026 by Webify. All Rights Reserved.
            </div>
          </div>
          
          <div className="flex items-center gap-6" data-jc-id="NRZ0GQ">
            <div className="flex flex-wrap gap-2" data-jc-id="NRZ0CB">
              {[
                { name: 'bKash', logo: 'https://www.logo.wine/a/logo/BKash/BKash-Logo.wine.svg' },
                { name: 'Nagad', logo: 'https://www.logo.wine/a/logo/Nagad/Nagad-Logo.wine.svg' },
                { name: 'Rocket', color: '#8C3494' },
                { name: 'Upay', color: '#00adef' }
              ].map((pay) => (
                <div key={pay.name} className="px-2 py-1 bg-white/5 border border-white/10 rounded flex items-center justify-center transition-all cursor-default h-8" data-jc-id="NRYWUP">
                  {pay.logo ? (
                    <img src={pay.logo} alt={pay.name} className="h-6 w-auto" data-jc-id="NRYVD7"/>
                  ) : (
                    <span className="text-[9px] font-bold tracking-tighter" style={{ color: pay.color }} data-jc-id="NRYULS">{pay.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
