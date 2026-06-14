import React, { useEffect, useState } from "react";
import { useAuth } from "../components/useAuth";
import { db } from "../components/Firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Trash2, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import PageHeader from "../components/Sattu/PageHeader";

const Cart = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const removeItem = async (id) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "users", user.uid, "cart", id));
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const total = items.reduce((sum, i) => sum + (Number(i.price) || 0), 0);

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
          title="Your Cart"
          subtitle="Shopping Bag"
          breadcrumbItems={[
            { label: "Home", path: "/" },
            { label: "Cart" },
          ]}
        />
        <div className="py-24 px-6">
          <div className="bg-white p-12 rounded-3xl border border-[#D9D3C7] shadow-[0_20px_50px_rgba(28,43,33,0.05)] max-w-md w-full text-center mx-auto">
            <div className="w-20 h-20 bg-[#EFECE6] border border-[#D9D3C7] rounded-3xl flex items-center justify-center mx-auto mb-8 text-[#707A72]">
              <ShoppingBag size={40} />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#1C2B21] mb-4 text-center">
              Your Cart Awaits
            </h2>
            <p className="text-[#707A72] font-medium mb-8">
              Sign in to view your selection and proceed to a seamless checkout.
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

  return (
    <div className="min-h-screen bg-[#EFECE6]">
      <PageHeader
        title="Your Cart"
        subtitle="Shopping Bag"
        backUrl="/shop"
        breadcrumbItems={[
          { label: "Home", path: "/" },
          { label: "Shop", path: "/shop" },
          { label: "Cart" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Cart Area */}
          <div className="flex-1">
            {items.length === 0 ? (
              <div className="bg-white rounded-3xl border border-dashed border-[#D9D3C7] p-16 text-center">
                <ShoppingBag size={48} className="mx-auto text-[#707A72] mb-6" />
                <p className="text-[#707A72] font-serif text-lg">
                  Your cart is currently empty.
                </p>
                <Link
                  to="/shop"
                  className="inline-block mt-8 px-10 py-4 bg-[#1C3B24] text-white rounded-2xl font-bold hover:bg-[#112517] transition-all shadow-lg shadow-[#1C3B24]/20"
                >
                  Discover Collection
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="group relative bg-white rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-8 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(28,43,33,0.05)] border border-[#D9D3C7]"
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#EFECE6] border border-[#D9D3C7] flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-lg font-serif font-bold text-[#1C2B21] mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-[#707A72] font-medium uppercase tracking-widest">
                        {item.flavor || "Premium Sattu"}
                      </p>
                      <div className="mt-4 flex items-center justify-center sm:justify-start gap-4">
                        <span className="text-2xl font-serif font-bold text-[#1C3B24]">
                          ₹{Number(item.price).toFixed(0)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-4 rounded-2xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          {items.length > 0 && (
            <aside className="w-full lg:w-[400px] shrink-0">
              <div className="bg-white rounded-3xl border border-[#D9D3C7] shadow-[0_30px_100px_rgba(28,43,33,0.05)] p-8 sticky top-32">
                <h2 className="text-2xl font-serif font-bold text-[#1C2B21] mb-8">
                  Order Summary
                </h2>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-[#707A72] font-medium">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#1C2B21]">₹{total.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-[#707A72] font-medium">
                    <span>Shipping</span>
                    <span className="text-[#4A5D4E] font-bold">Free</span>
                  </div>
                  <div className="flex justify-between text-[#707A72] font-medium">
                    <span>Tax</span>
                    <span className="font-bold text-[#1C2B21]">₹0</span>
                  </div>
                  <div className="pt-4 border-t border-dashed border-[#D9D3C7] flex justify-between items-end">
                    <span className="text-sm font-black text-[#1C2B21] uppercase tracking-widest">
                      Total Amount
                    </span>
                    <span className="text-4xl font-serif font-bold text-[#1C3B24] tracking-tighter">
                      ₹{total.toFixed(0)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full py-5 bg-[#1C3B24] text-white font-black text-lg rounded-2xl hover:bg-[#112517] transition-all shadow-xl shadow-[#1C3B24]/20 mb-8"
                >
                  Proceed to Checkout
                </button>
                {/* Trust Badges */}
                <div className="grid grid-cols-1 gap-4 pt-8 border-t border-[#D9D3C7]">
                  {[
                    { icon: ShieldCheck, text: "Secure Encryption", sub: "PCI DSS Compliant" },
                    { icon: Truck, text: "Fast Delivery", sub: "2-4 Business Days" },
                    { icon: RotateCcw, text: "Easy Returns", sub: "30-Day Guarantee" },
                  ].map((badge, i) => {
                    const Icon = badge.icon;
                    return (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#EFECE6] border border-[#D9D3C7] flex items-center justify-center text-[#1C2B21]">
                          <Icon size={20} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#1C2B21] leading-none">
                            {badge.text}
                          </p>
                          <p className="text-[10px] font-bold text-[#707A72] uppercase tracking-widest mt-1">
                            {badge.sub}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
