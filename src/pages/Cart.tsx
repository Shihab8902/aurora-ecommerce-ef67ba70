import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft, ShieldCheck, RefreshCcw } from 'lucide-react';
import { useCart } from '../store/useCart';
import { motion, AnimatePresence } from 'motion/react';

export function Cart() {
  const { items, removeItem, updateQuantity, getTotal } = useCart();
  const subtotal = getTotal();
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="pt-32 md:pt-48 pb-24 container-custom text-center" data-jc-id="G15XGL">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        data-jc-id="G15XND">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-brand-surface rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm" data-jc-id="G15Z16">
            <ShoppingBag className="w-8 h-8 md:w-10 md:h-10 text-brand-primary" data-jc-id="G15ZVD"/>
          </div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-brand-secondary mb-4" data-jc-id="G160M0">Your bag is empty</h2>
          <p className="text-gray-500 mb-10 text-sm md:text-base leading-relaxed" data-jc-id="07R4G8">
            Looks like you haven't added anything to your bag yet. Explore our collections to find something you love.
          </p>
          <Link 
            to="/shop" 
            className="bg-brand-primary text-white font-bold h-14 px-10 rounded-full hover:bg-brand-secondary hover:shadow-luxe transition-all inline-flex items-center justify-center gap-2 group cursor-pointer"
          data-jc-id="07R2F4">
            Start Shopping
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" data-jc-id="07R07T"/>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 pb-24 bg-white min-h-screen" data-jc-id="07QZBB">
      <div className="container-custom" data-jc-id="07QYNV">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold mb-8 text-gray-400" data-jc-id="07QXZQ">
          <Link to="/" className="hover:text-brand-primary transition-colors" data-jc-id="07QHMR">Home</Link>
          <span className="text-gray-300" data-jc-id="07QGWX">/</span>
          <span className="text-brand-secondary" data-jc-id="07QGSL">Shopping Bag</span>
        </nav>

        <h1 className="text-3xl md:text-5xl font-heading font-bold text-brand-secondary mb-12" data-jc-id="07QG2Y">Shopping Bag</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" data-jc-id="07QFBA">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-6" data-jc-id="07QEJR">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-100 text-[10px] uppercase tracking-widest font-bold text-gray-400 px-4" data-jc-id="07QDX9">
              <div className="col-span-6" data-jc-id="07QD0Q">Product</div>
              <div className="col-span-3 text-center" data-jc-id="07QCE6">Quantity</div>
              <div className="col-span-3 text-right" data-jc-id="07QBQ3">Subtotal</div>
            </div>

            <AnimatePresence mode="popLayout" data-jc-id="07QB0D">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="group relative bg-white p-4 md:p-6 rounded-brand border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-luxe transition-all duration-300 md:grid md:grid-cols-12 md:items-center md:gap-4"
                data-jc-id="07QASO">
                  <div className="col-span-6 flex items-center gap-4 md:gap-6" data-jc-id="07PRJG">
                    <div className="w-20 h-24 md:w-24 md:h-28 shrink-0 rounded-brand overflow-hidden bg-gray-50 border border-gray-100" data-jc-id="07PQUF">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" data-jc-id="07PPI8"/>
                    </div>
                    <div className="flex-1" data-jc-id="07POKK">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-brand-primary mb-1 block" data-jc-id="07PNY9">
                        {item.category}
                      </span>
                      <h3 className="text-sm md:text-base font-bold text-brand-secondary mb-1 hover:text-brand-primary transition-colors" data-jc-id="07P6X7">
                        <Link to={`/product/${item.id}`} data-jc-id="07P631">{item.name}</Link>
                      </h3>
                      <p className="text-xs md:text-sm font-bold text-gray-400" data-jc-id="07P5CA">${item.price.toFixed(2)}</p>
                      
                      {/* Mobile Quantity Control (Visible only on small screens) */}
                      <div className="flex md:hidden items-center justify-between mt-4" data-jc-id="07P3T8">
                        <div className="flex items-center bg-brand-surface rounded-full p-1 border border-gray-50" data-jc-id="07P33D">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-full transition-colors cursor-pointer"
                          data-jc-id="07P2B0">
                            <Minus className="w-3 h-3" data-jc-id="07OKI5"/>
                          </button>
                          <span className="w-8 text-center font-bold text-xs" data-jc-id="07OJRO">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-full transition-colors cursor-pointer"
                          data-jc-id="07OJ0Y">
                            <Plus className="w-3 h-3" data-jc-id="07OGTM"/>
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors p-2 cursor-pointer"
                        data-jc-id="07OFJ4">
                          <Trash2 className="w-4 h-4" data-jc-id="07ODZ4"/>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Quantity (Visible only on md+) */}
                  <div className="hidden md:col-span-3 md:flex justify-center" data-jc-id="07NWUK">
                    <div className="flex items-center bg-brand-surface rounded-full p-1 border border-gray-50" data-jc-id="07NW5J">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-full transition-colors cursor-pointer"
                      data-jc-id="07NVDA">
                        <Minus className="w-3.5 h-3.5" data-jc-id="07NT61"/>
                      </button>
                      <span className="w-10 text-center font-bold text-sm" data-jc-id="07NSG9">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-full transition-colors cursor-pointer"
                      data-jc-id="07NRQ7">
                        <Plus className="w-3.5 h-3.5" data-jc-id="07N9ZB"/>
                      </button>
                    </div>
                  </div>

                  {/* Desktop Subtotal & Remove */}
                  <div className="hidden md:col-span-3 md:flex flex-col items-end gap-2" data-jc-id="07N8IU">
                    <span className="text-base font-bold text-brand-secondary" data-jc-id="07N8B1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-[10px] font-bold uppercase tracking-widest text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
                    data-jc-id="07N6VK">
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-6" data-jc-id="07N3VU">
              <Link to="/shop" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-brand-primary transition-all group" data-jc-id="07MNKM">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" data-jc-id="07MM5O"/> 
                Continue Shopping
              </Link>
              <button 
                onClick={() => {}} // Could be a clear cart
                className="text-[10px] font-bold uppercase tracking-widest text-gray-300 hover:text-brand-secondary transition-colors"
              data-jc-id="07MKRS">
                Estimate Shipping
              </button>
            </div>
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-4 space-y-6" data-jc-id="07MIEJ">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-brand-surface p-8 rounded-brand border border-gray-100 shadow-sm"
            data-jc-id="07MHS1">
              <h3 className="text-xl font-heading font-bold text-brand-secondary mb-8" data-jc-id="07M0NL">Order Summary</h3>
              
              <div className="space-y-4 mb-8" data-jc-id="07LZV5">
                <div className="flex justify-between text-sm" data-jc-id="07LZ8S">
                  <span className="text-gray-500 font-medium" data-jc-id="07LZ3H">Subtotal</span>
                  <span className="text-brand-secondary font-bold" data-jc-id="07LYEK">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm" data-jc-id="07LXM7">
                  <span className="text-gray-500 font-medium" data-jc-id="07LWY8">Shipping</span>
                  <span className="text-brand-secondary font-bold" data-jc-id="07LW9W">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <div className="p-3 bg-white rounded-md border border-brand-primary/10" data-jc-id="07LUTH">
                    <p className="text-[10px] text-brand-primary font-bold uppercase tracking-[0.05em] leading-tight" data-jc-id="07LU3K">
                      Add ${(200 - subtotal).toFixed(2)} more to unlock <span className="underline" data-jc-id="6OD0NB">FREE WORLDWIDE SHIPPING</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-gray-200 mb-8 flex justify-between items-center" data-jc-id="6OCZ8O">
                <span className="text-lg font-heading font-bold text-brand-secondary" data-jc-id="6OCYHW">Total</span>
                <span className="text-3xl font-heading font-bold text-brand-primary" data-jc-id="6OCXR8">
                  ${total.toFixed(2)}
                </span>
              </div>

              <Link 
                to="/checkout"
                className="w-full bg-brand-primary text-white font-bold h-14 rounded-full hover:bg-brand-secondary hover:shadow-luxe transition-all flex items-center justify-center gap-3 group cursor-pointer"
              data-jc-id="6OCWCH">
                Checkout Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" data-jc-id="6OCU3L"/>
              </Link>

              <div className="mt-10 pt-10 border-t border-gray-200" data-jc-id="6OCDR7">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center mb-6" data-jc-id="6OCD2H">Secure Payments</p>
                <div className="flex flex-wrap justify-center gap-3" data-jc-id="6OCC97">
                  {[
                    { name: 'bKash', logo: 'https://www.logo.wine/a/logo/BKash/BKash-Logo.wine.svg' },
                    { name: 'Nagad', logo: 'https://www.logo.wine/a/logo/Nagad/Nagad-Logo.wine.svg' }
                  ].map((pay) => (
                    <div key={pay.name} className="px-3 py-1.5 bg-white border border-gray-100 rounded flex items-center justify-center h-10 w-20 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100" data-jc-id="6OC9YE">
                      <img src={pay.logo} alt={pay.name} className="h-full w-auto" data-jc-id="6OC8F8"/>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 gap-3" data-jc-id="6OBQSM">
              <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-brand shadow-[0_2px_10px_rgba(0,0,0,0.02)]" data-jc-id="6OBQNL">
                <ShieldCheck className="w-5 h-5 text-emerald-500" data-jc-id="6OBPB8"/>
                <div data-jc-id="6OBP58">
                  <h4 className="text-xs font-bold text-brand-secondary" data-jc-id="6OBOLB">Secure Checkout</h4>
                  <p className="text-[10px] text-gray-400" data-jc-id="6OBNUS">SSL Encrypted protection</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-brand shadow-[0_2px_10px_rgba(0,0,0,0.02)]" data-jc-id="6OBN1K">
                <RefreshCcw className="w-5 h-5 text-brand-primary" data-jc-id="6OBM7A"/>
                <div data-jc-id="6OBLJ6">
                  <h4 className="text-xs font-bold text-brand-secondary" data-jc-id="6OBLGR">Easy Returns</h4>
                  <p className="text-[10px] text-gray-400" data-jc-id="6OBKQW">30-day window guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
