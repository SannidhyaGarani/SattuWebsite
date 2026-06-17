import React from 'react';

const orderRows = [
  { id: "#SATTU-001", customer: "Priya Sharma", total: "₹398", status: "Delivered" },
  { id: "#SATTU-002", customer: "Rahul Verma", total: "₹597", status: "Shipped" },
  { id: "#SATTU-003", customer: "Ananya Patel", total: "₹199", status: "Pending" },
];

const statusBadgeClasses = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-[#4A5D4E]/10 text-[#4A5D4E] border-[#4A5D4E]/20";
    case "Shipped":
      return "bg-[#D9A036]/10 text-[#D9A036] border-[#D9A036]/20";
    default:
      return "bg-[#EFECE6] text-[#707A72] border-[#D9D3C7]";
  }
};

const OrdersTable = () => {
  return (
    <section className="bg-white rounded-2xl border border-[#D9D3C7] shadow-sm overflow-hidden">
      <div className="px-6 py-5 flex items-center justify-between border-b border-[#D9D3C7]">
        <div>
          <h2 className="text-lg font-poppins font-bold text-[#1C2B21]">Recent Orders</h2>
          <p className="text-sm text-[#707A72] mt-1">Latest customer orders for sattu drinks</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#EFECE6]">
            <tr className="text-xs font-bold text-[#4A5D4E] uppercase tracking-wide">
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D9D3C7]">
            {orderRows.map((row) => (
              <tr key={row.id} className="hover:bg-[#FDFBF7] transition-colors">
                <td className="px-6 py-4 font-medium text-[#1C2B21]">
                  {row.id}
                </td>
                <td className="px-6 py-4 text-[#707A72]">{row.customer}</td>
                <td className="px-6 py-4 text-[#1C2B21] font-semibold">{row.total}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1.5 rounded-full border text-xs font-bold ${statusBadgeClasses(row.status)}`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OrdersTable;
