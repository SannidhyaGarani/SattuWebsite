import React from 'react';
import { Package, ShoppingCart, IndianRupee, Users } from 'lucide-react';

const metricCards = [
  {
    label: "Total Products",
    value: "12",
    hint: "Across all flavors",
    icon: Package,
    color: "text-[#4A5D4E]",
    bg: "bg-[#4A5D4E]/10"
  },
  {
    label: "Open Orders",
    value: "24",
    hint: "Awaiting fulfillment",
    icon: ShoppingCart,
    color: "text-[#D9A036]",
    bg: "bg-[#D9A036]/10"
  },
  {
    label: "Total Revenue",
    value: "₹24,580",
    hint: "This month",
    icon: IndianRupee,
    color: "text-[#6D4C3D]",
    bg: "bg-[#6D4C3D]/10"
  },
  {
    label: "Active Users",
    value: "342",
    hint: "Registered customers",
    icon: Users,
    color: "text-[#6b4f3]",
    bg: "bg-[#6b4f3]/10"
  },
];

const MetricCards = () => {
  return (
    <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 mb-10">
      {metricCards.map((card) => {
        const Icon = card.icon;
        return (
          <article
            key={card.label}
            className="bg-white rounded-2xl border border-[#D9D3C7] shadow-sm hover:shadow-lg transition-all duration-300 group"
          >
            <div className="p-6">
              <div className={`w-12 h-12 rounded-xl ${card.bg} ${card.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                <Icon size={24} strokeWidth={2} />
              </div>
              <p className="text-xs font-bold tracking-wider text-[#707A72] uppercase mb-2">
                {card.label}
              </p>
              <p className="text-3xl font-poppins font-bold text-[#1C2B21] mb-1">
                {card.value}
              </p>
              <p className="text-sm font-medium text-[#707A72]">
                {card.hint}
              </p>
            </div>
            <div className="h-1.5 w-full rounded-b-2xl bg-gradient-to-r from-[#4A5D4E] via-[#D9A036] to-[#6D4C3D]" />
          </article>
        );
      })}
    </section>
  );
};

export default MetricCards;
