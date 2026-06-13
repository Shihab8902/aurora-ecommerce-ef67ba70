import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, Search, ArrowRight, Clock } from 'lucide-react';
import { useCart } from '../../store/useCart';
import { motion, AnimatePresence } from 'motion/react';
import { useConfig } from '../providers/ThemeProvider';
import mockData from '../../data/mockData.json';

const RECENT_SEARCHES_KEY = 'aurora_recent_searches';

export function Navbar() {
  const config = useConfig();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const { getItemCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) setRecentSearches(JSON.parse(stored));
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live Search Results
  const searchResults = useMemo(() => {
    if (searchQuery.trim().length < 2) return [];
    return mockData.products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 4);
  }, [searchQuery]);

  // Handle Search Focus
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  // Prevent scroll
  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen, isSearchOpen]);

  const addToRecentSearches = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    const updated = [trimmed, ...recentSearches.filter(s => s !== trimmed)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  const handleSearchSubmit = (e?: React.FormEvent, manualQuery?: string) => {
    e?.preventDefault();
    const query = manualQuery || searchQuery;
    if (query.trim()) {
      addToRecentSearches(query);
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const menuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { type: 'spring', stiffness: 400, damping: 40, staggerChildren: 0.1 }
    }
  } as const;

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  } as const;

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[60] transition-[padding,background-color,backdrop-filter,box-shadow,border-color] duration-300 border-b ${
          isScrolled || isMobileMenuOpen || isSearchOpen 
            ? 'bg-white/70 backdrop-blur-lg py-3 shadow-luxe border-white/20' 
            : 'bg-transparent py-6 border-transparent'
        }`}
      data-jc-id="OIH1AH">
        <div className="container-custom flex items-center justify-between" data-jc-id="OIH47M">
          <Link to="/" className="flex items-center group shrink-0" data-jc-id="OIH4EH">
            <img src={config.brand.logo} alt={config.brand.name} className="h-[32px] md:h-[45px] w-auto block transition-transform duration-300 group-hover:scale-105" data-jc-id="OIH52M"/>
          </Link>

          <div className="hidden lg:flex items-center gap-10" data-jc-id="OIH6J2">
            {['Home', 'Shop', 'Collections', 'About'].map((name) => (
              <Link key={name} to={name === 'Home' ? '/' : `/${name.toLowerCase()}`} className={`text-[11px] uppercase tracking-[0.2em] font-bold transition-all hover:text-brand-primary relative group ${location.pathname === (name === 'Home' ? '/' : `/${name.toLowerCase()}`) ? 'text-brand-primary' : 'text-brand-secondary/80'}`} data-jc-id="OIHMXP">
                {name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all group-hover:w-full ${location.pathname === (name === 'Home' ? '/' : `/${name.toLowerCase()}`) ? 'w-full' : ''}`} data-jc-id="OIHPSC"/>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1 sm:gap-4" data-jc-id="OIHRXS">
            <button className="p-2 text-brand-secondary/80 hover:text-brand-primary transition-colors cursor-pointer" onClick={() => setIsSearchOpen(true)} data-jc-id="OIHS31"><Search className="w-5 h-5" data-jc-id="OIHTFY"/></button>
            <button className="p-2 text-brand-secondary/80 hover:text-brand-primary transition-colors hidden sm:block cursor-pointer" data-jc-id="OIHTKB"><User className="w-5 h-5" data-jc-id="OII9XD"/></button>
            <Link to="/cart" className="p-2 text-brand-secondary/80 hover:text-brand-primary transition-colors relative group" data-jc-id="OIIAJR">
              <ShoppingBag className="w-5 h-5" data-jc-id="OIIBD1"/>
              {getItemCount() > 0 && <span className="absolute -top-0.5 -right-0.5 bg-brand-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white" data-jc-id="OIIC1T">{getItemCount()}</span>}
            </Link>
            <button className="lg:hidden p-2 text-brand-secondary/80 hover:text-brand-primary transition-all active:scale-90 cursor-pointer" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} data-jc-id="OIIDL6">{isMobileMenuOpen ? <X className="w-6 h-6" data-jc-id="OIIF39"/> : <Menu className="w-6 h-6" data-jc-id="OIIFNV"/>}</button>
          </div>
        </div>
      </nav>

      <AnimatePresence data-jc-id="OIIGDQ">
        {isSearchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-white flex flex-col pt-24 md:pt-32 pb-12 overflow-y-auto" data-jc-id="OIIGI6">
            <div className="container-custom" data-jc-id="OIIXJA">
              <div className="flex justify-between items-center mb-8 md:mb-12" data-jc-id="OIIXNK">
                <span className="text-brand-primary font-bold text-[10px] uppercase tracking-[0.3em]" data-jc-id="OIIYCL">Search Collection</span>
                <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-brand-surface rounded-full hover:bg-gray-100 transition-colors cursor-pointer" data-jc-id="OIIZNV"><X className="w-5 h-5 md:w-6 md:h-6" data-jc-id="OIJ173"/></button>
              </div>

              <div className="max-w-4xl mx-auto" data-jc-id="OIJ1WS">
                <form onSubmit={handleSearchSubmit} className="relative mb-12 md:mb-16" data-jc-id="OIJ215">
                  <input ref={searchInputRef} type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full text-2xl md:text-5xl font-heading font-bold text-brand-secondary placeholder:text-gray-100 border-b-2 border-gray-100 focus:border-brand-primary outline-none py-4 transition-colors" data-jc-id="OIJ2R0"/>
                  <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 p-4 text-brand-primary hover:scale-110 transition-transform cursor-pointer" data-jc-id="OIJL7L"><ArrowRight className="w-6 h-6 md:w-8 md:h-8" data-jc-id="OIJM2M"/></button>
                </form>
                
                <AnimatePresence mode="wait" data-jc-id="OIJMUB">
                  {searchQuery.length >= 2 ? (
                    <motion.div key="results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8" data-jc-id="OIJNKX">
                      <div className="flex items-center justify-between" data-jc-id="OIJOYZ">
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary" data-jc-id="OIJPNU">Live Results ({searchResults.length})</h3>
                        {searchResults.length > 0 && <button onClick={handleSearchSubmit} className="text-[10px] font-bold text-brand-primary uppercase tracking-widest hover:underline" data-jc-id="OIK6O4">View All</button>}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" data-jc-id="OIK85K">
                        {searchResults.map((p) => (
                          <Link key={p.id} to={`/product/${p.id}`} onClick={() => { setIsSearchOpen(false); setSearchQuery(''); addToRecentSearches(p.name); }} className="group flex gap-4 p-3 bg-brand-surface rounded-brand border border-transparent hover:border-brand-primary/10 hover:bg-white hover:shadow-luxe transition-all" data-jc-id="OIK8ZJ">
                            <div className="w-16 h-16 shrink-0 rounded-md overflow-hidden bg-white border border-gray-100" data-jc-id="OIKBA8"><img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-jc-id="OIKC07"/></div>
                            <div className="flex flex-col justify-center" data-jc-id="OIKDEU"><h4 className="text-sm font-bold text-brand-secondary mb-0.5" data-jc-id="OIKDIG">{p.name}</h4><span className="text-sm font-bold text-brand-primary" data-jc-id="OIKTRV">${p.price}</span></div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="recent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8" data-jc-id="OIKVCX">
                      {recentSearches.length > 0 ? (
                        <>
                          <div className="flex items-center justify-between" data-jc-id="OIKXD3">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary" data-jc-id="OIKXJZ">Recent Searches</h3>
                            <button onClick={clearRecentSearches} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-brand-primary" data-jc-id="OIKYVG">Clear All</button>
                          </div>
                          <div className="space-y-3" data-jc-id="OIL0EF">
                            {recentSearches.map((s) => (
                              <button key={s} onClick={() => handleSearchSubmit(undefined, s)} className="flex items-center gap-3 w-full p-4 bg-brand-surface rounded-brand text-sm font-bold text-brand-secondary hover:bg-gray-100 transition-all cursor-pointer group" data-jc-id="LGPF2S">
                                <Clock className="w-4 h-4 text-gray-300 group-hover:text-brand-primary transition-colors" data-jc-id="LGPCXB"/>
                                {s}
                              </button>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="py-12 text-center border-2 border-dashed border-gray-50 rounded-brand" data-jc-id="LGPANO">
                          <p className="text-gray-400 text-sm italic" data-jc-id="LGP9W0">No recent searches. Start exploring the collection.</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence data-jc-id="LGORYY">
        {isMobileMenuOpen && (
          <motion.div initial="closed" animate="open" exit="closed" variants={menuVariants} className="fixed inset-0 z-[55] bg-white lg:hidden flex flex-col pt-32 pb-12" data-jc-id="LGORBQ">
            <div className="container-custom flex flex-col h-full" data-jc-id="LGOPWU">
              <div className="space-y-6 mb-12" data-jc-id="LGOPQT">
                <span className="text-brand-primary font-bold text-[10px] uppercase tracking-[0.3em] block mb-4 opacity-50" data-jc-id="LGOP4F">Navigation</span>
                {['Home', 'Shop', 'Collections', 'About'].map((name) => (
                  <motion.div key={name} variants={itemVariants} data-jc-id="LGONLD">
                    <Link to={name === 'Home' ? '/' : `/${name.toLowerCase()}`} className={`group flex items-center justify-between py-2 text-3xl font-heading font-bold transition-all ${location.pathname === (name === 'Home' ? '/' : `/${name.toLowerCase()}`) ? 'text-brand-primary' : 'text-brand-secondary hover:text-brand-primary'}`} onClick={() => setIsMobileMenuOpen(false)} data-jc-id="LGOMXB">
                      {name}
                      <ArrowRight className={`w-6 h-6 transition-transform group-hover:translate-x-2 ${location.pathname === (name === 'Home' ? '/' : `/${name.toLowerCase()}`) ? 'opacity-100' : 'opacity-0'}`} data-jc-id="LGO4D3"/>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto space-y-8" data-jc-id="LGO24A">
                <motion.div variants={itemVariants} className="grid grid-cols-1 gap-4" data-jc-id="LGO1HU">
                  <Link to="/cart" className="flex flex-col gap-2 p-6 bg-brand-surface rounded-brand border border-gray-100 hover:border-brand-primary/20 transition-all" onClick={() => setIsMobileMenuOpen(false)} data-jc-id="LGO1A3">
                    <div className="flex items-center justify-between" data-jc-id="LGNZ9L"><ShoppingBag className="w-5 h-5 text-brand-primary" data-jc-id="LGNZ59"/><span className="bg-brand-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full" data-jc-id="LGNYI6">{getItemCount()}</span></div>
                    <span className="text-sm font-bold text-brand-secondary" data-jc-id="LGNI3D">View Shopping Bag</span>
                  </Link>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-center justify-between pt-8 border-t border-gray-100" data-jc-id="LGNGPL">
                  <div className="flex gap-4" data-jc-id="LGNFWA">
                    {['FB', 'IG', 'TW'].map(s => <span key={s} className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-400" data-jc-id="LGNF7Y">{s}</span>)}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-gray-300" data-jc-id="LGNDRO">Aurora Luxe</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
