import React, { useState, useEffect } from "react";
import { useAuth } from "../components/useAuth";
import { db } from "../components/Firebase";
import { doc, getDoc, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Package,
  Heart,
  LogOut,
  ChevronRight,
  Settings,
  ShoppingBag,
  CreditCard,
  MapPin,
  Bell,
  Award
} from "lucide-react";

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [stats, setStats] = useState({ cart: 0, wishlist: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch User Profile
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        }

        // Fetch Cart Count
        const cartSnap = await getDocs(collection(db, "users", user.uid, "cart"));
        const wishlistSnap = await getDocs(collection(db, "users", user.uid, "wishlist"));

        // Fetch Recent Orders
        const ordersRef = collection(db, "users", user.uid, "orders");
        const ordersQuery = query(ordersRef, orderBy("createdAt", "desc"), limit(3));
        const ordersSnap = await getDocs(ordersQuery);

        setRecentOrders(ordersSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setStats({
          cart: cartSnap.size,
          wishlist: wishlistSnap.size
        });
      } catch (error) {
        console.error("Error fetching account data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 border-2 border-[#6b4f3]/10 rounded-full" />
          <div className="absolute inset-0 border-2 border-t-[#6b4f3] rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-[#1C2B21] pt-32 pb-24 px-6 md:px-12 lg:px-16 selection:bg-[#6b4f3] selection:text-white">
      <div className="max-w-[1320px] mx-auto">

        {/* PREMIUM ACCOUNT HEADER MARQUEE */}
        <div className="bg-[#6b4f3] rounded-3xl p-8 md:p-14 mb-16 relative overflow-hidden shadow-[0_12px_40px_rgba(28,59,36,0.08)]">
          {/* Spatial Vector Accents */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D9A036]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#EFECE6] overflow-hidden p-1">
                  {userData?.photoURL ? (
                    <img src={userData.photoURL} alt="Profile" className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <User size={36} strokeWidth={1.2} className="text-[#EFECE6]/40" />
                  )}
                </div>
                <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 bg-[#9A8F80] rounded-lg flex items-center justify-center text-white border-2 border-[#6b4f3] shadow-md">
                  <Award size={13} strokeWidth={1.5} />
                </div>
              </div>

              <div className="space-y-1.5">
                <h1 className="text-3xl font-poppins font-light text-[#EFECE6] tracking-tight">
                  {userData?.displayName || "Registry Member"}
                </h1>
                <p className="text-xs text-[#EFECE6]/60 font-light tracking-wide">{user?.email}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
                  <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[#EFECE6] text-[8px] font-bold uppercase tracking-widest">
                    Elite Tier Allocation
                  </span>
                  <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[#D9A036] text-[8px] font-bold uppercase tracking-widest">
                    2,450 Vitality Points
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="h-11 px-6 rounded-xl bg-[#EFECE6] text-[#6b4f3] font-bold text-[9px] uppercase tracking-[0.2em] hover:bg-red-50 hover:text-red-600 transition-all duration-300 flex items-center gap-2.5 shadow-sm"
            >
              <LogOut size={13} strokeWidth={1.5} />
              <span>Terminate Session</span>
            </button>
          </div>
        </div>

        {/* WORKSPACE CONTENT SPLIT GRID */}
        <div className="grid lg:grid-cols-12 gap-16 items-start">

          {/* LEFT RUNWAY: DASHBOARD ROUTING MATRIX */}
          <div className="lg:col-span-4 space-y-10">
            {/* Minimal Stat Metric Tiles */}
            <div className="grid grid-cols-2 gap-4">
              <Link to="/cart" className="group bg-white p-6 rounded-2xl border border-[#EAE6DF] hover:border-[#6b4f3] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
                <div className="w-10 h-10 rounded-xl bg-[#F9F8F6] flex items-center justify-center text-[#6b4f3] mb-4 group-hover:bg-[#6b4f3] group-hover:text-white transition-all duration-300">
                  <ShoppingBag size={16} strokeWidth={1.5} />
                </div>
                <p className="text-2xl font-poppins font-light text-[#1C2B21]">{stats.cart}</p>
                <p className="text-[9px] font-bold text-[#9A8F80] uppercase tracking-widest mt-1">Manifest Cart</p>
              </Link>

              <Link to="/wishlist" className="group bg-white p-6 rounded-2xl border border-[#EAE6DF] hover:border-[#6b4f3] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
                <div className="w-10 h-10 rounded-xl bg-[#F9F8F6] flex items-center justify-center text-[#6b4f3] mb-4 group-hover:bg-[#6b4f3] group-hover:text-white transition-all duration-300">
                  <Heart size={16} strokeWidth={1.5} />
                </div>
                <p className="text-2xl font-poppins font-light text-[#1C2B21]">{stats.wishlist}</p>
                <p className="text-[9px] font-bold text-[#9A8F80] uppercase tracking-widest mt-1">Saved Curations</p>
              </Link>
            </div>

            {/* Structured Navigation Panel */}
            <div className="bg-white rounded-2xl border border-[#EAE6DF] p-2 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
              <span className="block px-4 py-3 text-[9px] font-bold text-[#9A8F80] uppercase tracking-[0.25em]">
                Registry Management
              </span>
              <div className="space-y-0.5">
                {[
                  { icon: Settings, label: "Identity Parameters" },
                  { icon: Package, label: "Consignment Logs" },
                  { icon: CreditCard, label: "Settlement Frameworks" },
                  { icon: MapPin, label: "Distribution Endpoints" },
                  { icon: Bell, label: "Transmission Directives" },
                ].map((item, idx) => (
                  <button key={idx} className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-[#F9F8F6] transition-all group text-left">
                    <div className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-[#F9F8F6] text-[#6b4f3] flex items-center justify-center group-hover:bg-white group-hover:text-[#D9A036] transition-colors">
                        <item.icon size={14} strokeWidth={1.5} />
                      </div>
                      <span className="text-xs font-medium text-[#1C2B21] group-hover:text-[#6b4f3] transition-colors">{item.label}</span>
                    </div>
                    <ChevronRight size={13} strokeWidth={1.5} className="text-[#9A8F80]/40 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT RUNWAY: LEDGER RECORDS AREA */}
          <div className="lg:col-span-8 space-y-10">
            <div className="bg-white rounded-2xl border border-[#EAE6DF] p-8 md:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.01)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#EAE6DF]">
                <div className="space-y-1">
                  <h3 className="text-2xl font-poppins font-light text-[#1C2B21]">Recent Consignments</h3>
                  <p className="text-xs text-[#707A72] font-light">Trace historical data logs on personal nutritional allocations.</p>
                </div>
                <Link to="/orders" className="self-start sm:self-center h-9 px-5 border border-[#EAE6DF] rounded-xl text-[9px] font-bold text-[#6b4f3] uppercase tracking-widest hover:border-[#6b4f3] hover:bg-[#6b4f3] hover:text-[#EFECE6] transition-all flex items-center">
                  Archive Ledger
                </Link>
              </div>

              {recentOrders.length > 0 ? (
                <div className="divide-y divide-[#EAE6DF]">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="group py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-xl bg-[#F9F8F6] flex items-center justify-center text-[#6b4f3] border border-[#EAE6DF]">
                          <Package size={18} strokeWidth={1.5} />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium text-[#1C2B21] group-hover:text-[#6b4f3] transition-colors">
                            Allocation #{order.id.slice(0, 8).toUpperCase()}
                          </p>
                          <p className="text-[10px] text-[#9A8F80] font-light tracking-wide uppercase">
                            {order.createdAt?.toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <div className="w-full sm:w-auto flex sm:flex-col justify-between sm:items-end items-center gap-1.5">
                        <p className="text-lg font-poppins font-light text-[#1C2B21] font-mono">${order.total}</p>
                        <span className="inline-flex px-2.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-700 border border-emerald-100">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 border border-dashed border-[#EAE6DF] rounded-xl space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#F9F8F6] border border-[#EAE6DF] flex items-center justify-center text-[#9A8F80]/40 mx-auto">
                    <ShoppingBag size={24} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-poppins font-light text-[#1C2B21]">Manifest Clear</h4>
                    <p className="text-xs text-[#707A72] font-light max-w-xs mx-auto">Your entry file lists no active dispatches at this current timestamp.</p>
                  </div>
                  <Link to="/shop" className="inline-flex items-center gap-2 h-11 px-8 bg-[#6b4f3] text-[#EFECE6] font-bold text-[9px] uppercase tracking-[0.25em] rounded-xl hover:bg-[#1C2B21] transition-all">
                    <span>Initialize Curation</span>
                    <ChevronRight size={12} strokeWidth={1.5} />
                  </Link>
                </div>
              )}
            </div>

            {/* CURATED REWARDS SUB-BANNER */}
            <div className="bg-[#9A8F80] rounded-2xl p-8 text-[#EFECE6] relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left space-y-1">
                  <h3 className="text-xl font-poppins font-light tracking-wide">House Premium Dividend</h3>
                  <p className="text-xs text-[#EFECE6]/80 font-light">You accumulate parameters at a baseline margin of 550 points from your complimentary reserve.</p>
                </div>
                <button className="h-11 px-6 bg-[#6b4f3] text-[#EFECE6] rounded-xl font-bold text-[9px] uppercase tracking-[0.2em] hover:bg-[#1C2B21] transition-all duration-300 shrink-0">
                  Execute Dividend
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
