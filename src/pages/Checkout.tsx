import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle2,
  Truck,
  Lock,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';
import { useCart } from '../store/useCart';

export function Checkout() {
  const { items, getTotal, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  });

  const subtotal = getTotal();
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      clearCart();
      window.scrollTo(0, 0);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSubmitted) {
    return (
      <div className="pt-32 md:pt-48 pb-24 container-custom text-center" data-jc-id="5CUQPJ">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto"
        data-jc-id="5CUQ19">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm" data-jc-id="5CUON8">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" data-jc-id="5CUNU5"/>
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-brand-secondary mb-4" data-jc-id="5CUN53">Thank You!</h1>
          <p className="text-lg text-brand-primary font-medium mb-4" data-jc-id="5CUMDH">Your order has been placed successfully.</p>
          <p className="text-gray-500 mb-12 leading-relaxed" data-jc-id="5CULL8">
            We've sent a confirmation email to <span className="font-bold text-brand-secondary" data-jc-id="5CUKUK">{formData.email}</span>.
            Your minimalist essentials are being prepared for shipment.
          </p>

          <div className="bg-brand-surface rounded-brand p-8 border border-gray-100 mb-12 text-left" data-jc-id="5CU3V4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-brand-secondary mb-4" data-jc-id="5CU34B">Order Details</h3>
            <div className="space-y-3 text-sm" data-jc-id="5CU2BZ">
              <div className="flex justify-between" data-jc-id="5CU1PL">
                <span className="text-gray-400" data-jc-id="5CU1L5">Order Number</span>
                <span className="font-bold" data-jc-id="5CU0X3">#AL-99{Math.floor(Math.random() * 10000)}</span>
              </div>
              <div className="flex justify-between" data-jc-id="5CU05H">
                <span className="text-gray-400" data-jc-id="5CU00G">Shipping To</span>
                <span className="font-bold" data-jc-id="5CTZCF">{formData.firstName} {formData.lastName}</span>
              </div>
            </div>
          </div>

          <Link
            to="/shop"
            className="bg-brand-primary text-white font-bold h-14 px-12 rounded-full hover:bg-brand-secondary hover:shadow-luxe transition-all inline-flex items-center justify-center gap-3 group"
          data-jc-id="5CTY03">
            Continue Shopping
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" data-jc-id="5CTGR9"/>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-48 pb-24 text-center" data-jc-id="5CTFAM">
        <h2 className="text-2xl font-bold mb-4 text-brand-secondary" data-jc-id="5CTEO8">Your bag is empty</h2>
        <Link to="/shop" className="text-brand-primary underline font-bold" data-jc-id="5CTDYC">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 pb-24 bg-white min-h-screen" data-jc-id="5CTD52">
      <div className="container-custom" data-jc-id="5CTCH1">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold mb-8 text-gray-400" data-jc-id="5CTCAZ">
          <Link to="/cart" className="hover:text-brand-primary transition-colors" data-jc-id="5CTB0I">Bag</Link>
          <ChevronRight className="w-3 h-3" data-jc-id="5CTASO"/>
          <span className="text-brand-secondary" data-jc-id="5CTA6D">Checkout</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" data-jc-id="5CSTWU">
          {/* Left: Form */}
          <div className="lg:col-span-7 space-y-12" data-jc-id="5CST5B">
            <form id="checkout-form" onSubmit={handleSubmit} data-jc-id="5CST0V">
              <section className="space-y-8" data-jc-id="5CSSCX">
                <div data-jc-id="5CSRQL">
                  <h2 className="text-2xl font-heading font-bold text-brand-secondary mb-6" data-jc-id="5CSROR">Contact Information</h2>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-brand-surface border border-gray-100 rounded-brand focus:bg-white focus:border-brand-primary/20 focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all font-medium"
                  data-jc-id="5CSQWF"/>
                </div>

                <div data-jc-id="5CSN4C">
                  <h2 className="text-2xl font-heading font-bold text-brand-secondary mb-6" data-jc-id="5CSN2I">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4 mb-4" data-jc-id="5CS67L">
                    <input
                      required
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-brand-surface border border-gray-100 rounded-brand focus:bg-white focus:border-brand-primary/20 focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all font-medium"
                    data-jc-id="5CS629"/>
                    <input
                      required
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-brand-surface border border-gray-100 rounded-brand focus:bg-white focus:border-brand-primary/20 focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all font-medium"
                    data-jc-id="5CS1S3"/>
                  </div>
                  <div className="space-y-4" data-jc-id="5CRIDP">
                    <input
                      required
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-brand-surface border border-gray-100 rounded-brand focus:bg-white focus:border-brand-primary/20 focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all font-medium"
                    data-jc-id="5CRHRD"/>
                    <div className="grid grid-cols-2 gap-4" data-jc-id="5CRDZA">
                      <input
                        required
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-brand-surface border border-gray-100 rounded-brand focus:bg-white focus:border-brand-primary/20 focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all font-medium"
                      data-jc-id="5CRDBD"/>
                      <input
                        required
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-brand-surface border border-gray-100 rounded-brand focus:bg-white focus:border-brand-primary/20 focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all font-medium"
                      data-jc-id="5CQTYN"/>
                    </div>
                    <input
                      required
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-brand-surface border border-gray-100 rounded-brand focus:bg-white focus:border-brand-primary/20 focus:ring-4 focus:ring-brand-primary/5 outline-none transition-all font-medium"
                    data-jc-id="5CQ9ZP"/>
                  </div>
                </div>
              </section>
            </form>

            <div className="pt-8 border-t border-gray-100" data-jc-id="5CQ5IO">
              <Link to="/cart" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-brand-primary transition-all group" data-jc-id="5CQ5DG">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" data-jc-id="5CQ3YI"/>
                Return to Bag
              </Link>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6" data-jc-id="5CPMUU">
            <div className="bg-brand-surface p-8 rounded-brand border border-gray-100 shadow-sm" data-jc-id="5CPM61">
              <h3 className="text-xl font-heading font-bold text-brand-secondary mb-8" data-jc-id="5CPLFC">Order Summary</h3>

              <div className="max-h-[300px] overflow-y-auto pr-2 mb-8 space-y-4 scrollbar-hide" data-jc-id="5CPKOG">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4" data-jc-id="5CPJUD">
                    <div className="w-16 h-20 shrink-0 bg-white rounded-md overflow-hidden border border-gray-100" data-jc-id="5CPJ71">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" data-jc-id="5CPIEO"/>
                    </div>
                    <div className="flex-1 flex flex-col justify-center" data-jc-id="5CPH3E">
                      <h4 className="text-sm font-bold text-brand-secondary line-clamp-1" data-jc-id="5CPGWM">{item.name}</h4>
                      <p className="text-xs text-gray-400" data-jc-id="5CPG5Q">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-brand-primary mt-1" data-jc-id="O092I0">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-200 mb-8" data-jc-id="O090ZP">
                <div className="flex justify-between text-sm" data-jc-id="O090AR">
                  <span className="text-gray-500 font-medium" data-jc-id="O08ZND">Subtotal</span>
                  <span className="text-brand-secondary font-bold" data-jc-id="O08YYG">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm" data-jc-id="O08Y63">
                  <span className="text-gray-500 font-medium" data-jc-id="O08Y0S">Shipping</span>
                  <span className="text-brand-secondary font-bold" data-jc-id="O08XBV">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="pt-4 border-t border-gray-200 flex justify-between items-center" data-jc-id="O08VYT">
                  <span className="text-lg font-heading font-bold text-brand-secondary" data-jc-id="O08FNJ">Total</span>
                  <span className="text-2xl font-heading font-bold text-brand-primary" data-jc-id="O08EWT">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                form="checkout-form"
                type="submit"
                className="w-full bg-brand-primary text-white font-bold h-14 rounded-full hover:bg-brand-secondary hover:shadow-luxe transition-all flex items-center justify-center gap-3 group cursor-pointer"
              data-jc-id="O08DFK">
                Complete Purchase
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" data-jc-id="O08B36"/>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3" data-jc-id="O08A9O">
              <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-brand shadow-[0_2px_10px_rgba(0,0,0,0.02)]" data-jc-id="O089MK">
                <Lock className="w-5 h-5 text-emerald-500" data-jc-id="O088SA"/>
                <div data-jc-id="O07SJT">
                  <h4 className="text-xs font-bold text-brand-secondary" data-jc-id="O07SHZ">Payment Secured</h4>
                  <p className="text-[10px] text-gray-400" data-jc-id="O07RS1">Your data is fully encrypted</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-brand shadow-[0_2px_10px_rgba(0,0,0,0.02)]" data-jc-id="O07QG1">
                <Truck className="w-5 h-5 text-brand-primary" data-jc-id="O07PLR"/>
                <div data-jc-id="O07OXS">
                  <h4 className="text-xs font-bold text-brand-secondary" data-jc-id="O07OVY">Express Delivery</h4>
                  <p className="text-[10px] text-gray-400" data-jc-id="O07O5E">Arrives in 3-5 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
