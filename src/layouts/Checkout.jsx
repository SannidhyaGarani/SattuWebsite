import React, { useEffect, useState } from "react";
import { useAuth } from "../components/useAuth";
import { db } from "../components/Firebase";
import { collection, getDocs, addDoc, serverTimestamp, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, MapPin, User, Phone, Mail, CheckCircle, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../components/Sattu/PageHeader";

const Checkout = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "card",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const snap = await getDocs(collection(db, "users", user.uid, "cart"));
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setItems(list);
      } catch (error) {
        console.error("Error loading cart:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  const triggerToast = (msg) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const total = items.reduce((sum, i) => sum + (Number(i.price) || 0), 0);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      triggerToast("Your cart is empty!");
      return;
    }
    setIsProcessing(true);

    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        items: items,
        total: total,
        shipping: formData,
        paymentMethod: formData.paymentMethod,
        status: "confirmed",
        createdAt: serverTimestamp(),
      });

      setOrderSuccess(true);
    } catch (error) {
      console.error("Error placing order:", error);
      triggerToast("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EFECE6] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1C3B24]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#EFECE6]">
        <PageHeader
          title="Checkout"
          subtitle="Complete Your Order"
          breadcrumbItems={[
            { label: "Home", path: "/" },
            { label: "Checkout" },
          ]}
        />
        <div className="py-24 px-6">
          <div className="bg-white p-12 rounded-3xl border border-[#D9D3C7] shadow-[0_20px_50px_rgba(28,43,33,0.05)] max-w-md w-full text-center mx-auto">
            <div className="w-20 h-20 bg-[#EFECE6] border border-[#D9D3C7] rounded-3xl flex items-center justify-center mx-auto mb-8 text-[#707A72]">
              <CreditCard size={40} />
            </div>
            <h2 className="text-2xl font-poppins font-bold text-[#1C2B21] mb-4 text-center">
              Sign In to Checkout
            </h2>
            <p className="text-[#707A72] font-medium mb-8">
              Please sign in to proceed with your order.
            </p>
            <Link
              to="/login"
              className="block w-full py-4 bg-[#1C3B24] text-white rounded-2xl font-bold hover:bg-[#112517] transition-all shadow-lg shadow-[#1C3B24]/20"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-[#EFECE6]">
        <PageHeader
          title="Order Confirmed!"
          subtitle="Thank You"
          breadcrumbItems={[
            { label: "Home", path: "/" },
            { label: "Success" },
          ]}
        />
        <div className="py-24 px-6">
          <div className="bg-white p-12 md:p-16 rounded-3xl border border-[#D9D3C7] shadow-[0_30px_80px_rgba(28,43,33,0.08)] max-w-2xl w-full text-center mx-auto">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-24 h-24 bg-[#4A5D4E]/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle size={48} className="text-[#4A5D4E]" />
              </div>
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-4xl font-poppins font-bold text-[#1C2B21] mb-6"
            >
              Order Confirmed!
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-[#707A72] font-medium mb-10 max-w-md mx-auto leading-relaxed"
            >
              Thank you for your order! Your Sattu blend is being prepared and will be shipped to you soon.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/shop"
                className="px-10 py-4 bg-[#1C3B24] text-white rounded-2xl font-bold hover:bg-[#112517] transition-all shadow-lg shadow-[#1C3B24]/20"
              >
                Continue Shopping
              </Link>
              <Link
                to="/"
                className="px-10 py-4 bg-white text-[#1C2B21] border border-[#D9D3C7] rounded-2xl font-bold hover:bg-[#EFECE6] transition-all"
              >
                Back to Home
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EFECE6]">
      <PageHeader
        title="Checkout"
        subtitle="Complete Your Order"
        backUrl="/cart"
        breadcrumbItems={[
          { label: "Home", path: "/" },
          { label: "Cart", path: "/cart" },
          { label: "Checkout" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl border border-[#D9D3C7] shadow-[0_20px_60px_rgba(28,43,33,0.05)] p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#1C3B24]/10 text-[#1C3B24] flex items-center justify-center">
                  <MapPin size={24} />
                </div>
                <h2 className="text-2xl font-poppins font-bold text-[#1C2B21]">Shipping Details</h2>
              </div>

              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#707A72] flex items-center gap-2">
                      <User size={14} />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-xl border border-[#D9D3C7] focus:border-[#1C3B24] focus:ring-1 focus:ring-[#1C3B24] outline-none bg-[#FDFBF7] text-sm transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#707A72] flex items-center gap-2">
                      <Mail size={14} />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-xl border border-[#D9D3C7] focus:border-[#1C3B24] focus:ring-1 focus:ring-[#1C3B24] outline-none bg-[#FDFBF7] text-sm transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#707A72] flex items-center gap-2">
                    <Phone size={14} />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 rounded-xl border border-[#D9D3C7] focus:border-[#1C3B24] focus:ring-1 focus:ring-[#1C3B24] outline-none bg-[#FDFBF7] text-sm transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#707A72] flex items-center gap-2">
                    <MapPin size={14} />
                    Address
                  </label>
                  <textarea
                    name="address"
                    required
                    rows={3}
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 rounded-xl border border-[#D9D3C7] focus:border-[#1C3B24] focus:ring-1 focus:ring-[#1C3B24] outline-none bg-[#FDFBF7] text-sm transition-all"
                    placeholder="123, Main Street, Near Park"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#707A72]">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-xl border border-[#D9D3C7] focus:border-[#1C3B24] focus:ring-1 focus:ring-[#1C3B24] outline-none bg-[#FDFBF7] text-sm transition-all"
                      placeholder="Mumbai"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#707A72]">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-xl border border-[#D9D3C7] focus:border-[#1C3B24] focus:ring-1 focus:ring-[#1C3B24] outline-none bg-[#FDFBF7] text-sm transition-all"
                      placeholder="Maharashtra"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#707A72]">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-5 py-4 rounded-xl border border-[#D9D3C7] focus:border-[#1C3B24] focus:ring-1 focus:ring-[#1C3B24] outline-none bg-[#FDFBF7] text-sm transition-all"
                      placeholder="400001"
                    />
                  </div>
                </div>

                <div className="pt-8 border-t border-[#D9D3C7]">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-[#D9A036]/10 text-[#D9A036] flex items-center justify-center">
                      <CreditCard size={24} />
                    </div>
                    <h2 className="text-2xl font-poppins font-bold text-[#1C2B21]">Payment</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                    {[
                      { id: "card", label: "Credit/Debit Card", icon: CreditCard },
                      { id: "upi", label: "UPI", icon: Sparkles },
                      { id: "cod", label: "Cash on Delivery", icon: Sparkles },
                    ].map((method) => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                          className={`p-6 rounded-2xl border-2 transition-all text-left ${
                            formData.paymentMethod === method.id
                              ? "border-[#1C3B24] bg-[#1C3B24]/5"
                              : "border-[#D9D3C7] hover:border-[#4A5D4E] bg-white"
                          }`}
                        >
                          <div className="flex flex-col items-start gap-3">
                            <div
                              className={
                                formData.paymentMethod === method.id
                                  ? "text-[#1C3B24]"
                                  : "text-[#707A72]"
                              }
                            >
                              <Icon size={24} />
                            </div>
                            <p
                              className={
                                formData.paymentMethod === method.id
                                  ? "text-[#1C3B21]"
                                  : "text-[#707A72]"
                              }
                            >
                              {method.label}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-5 bg-[#1C3B24] text-white rounded-2xl font-bold text-lg hover:bg-[#112517] transition-all shadow-lg shadow-[#1C3B24]/20 disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>Place Order - ₹{total.toFixed(0)}</>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl border border-[#D9D3C7] shadow-[0_20px_60px_rgba(28,43,33,0.05)] p-8 sticky top-32">
              <h2 className="text-2xl font-poppins font-bold text-[#1C2B21] mb-8">Order Summary</h2>

              <div className="space-y-6 mb-10">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#EFECE6] border border-[#D9D3C7] flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h3 className="text-sm font-bold text-[#1C2B21] truncate">{item.name}</h3>
                        <p className="text-[10px] text-[#707A72] font-bold uppercase tracking-widest">
                          {item.flavor || "Premium Sattu"}
                        </p>
                      </div>
                      <p className="text-base font-bold text-[#1C3B24] mt-2">
                        ₹{Number(item.price).toFixed(0)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-dashed border-[#D9D3C7] pt-6 space-y-4 mb-10">
                <div className="flex justify-between text-sm">
                  <span className="text-[#707A72] font-medium">Subtotal</span>
                  <span className="text-[#1C2B21] font-bold">₹{total.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#707A72] font-medium">Shipping</span>
                  <span className="text-[#4A5D4E] font-bold">Free</span>
                </div>
                <div className="flex justify-between pt-6 border-t border-[#D9D3C7] items-end">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#707A72]">
                    Total
                  </span>
                  <span className="text-4xl font-poppins font-bold text-[#1C3B24]">
                    ₹{total.toFixed(0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Toast */}
      <AnimatePresence>
        {feedbackMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-12 left-1/2 z-50 bg-[#1C3B24] border border-white/10 text-[#EFECE6] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 backdrop-blur-md max-w-md w-[90%]"
          >
            <Sparkles size={16} className="text-[#D9A036] shrink-0" />
            <p className="text-xs font-light tracking-wide flex-1">{feedbackMessage}</p>
            <button
              onClick={() => setFeedbackMessage(null)}
              className="opacity-40 hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
