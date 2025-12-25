import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { assets } from '../../assets/assets'
import axios from 'axios'
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAllOrders = async () => {
    try {
      const res = await axios.get(url + "/api/order/list")
      if (res.data.data) {
        setOrders(res.data.data.reverse())
      }
    } catch (err) {
      toast.error("Network Error")
    } finally {
      setLoading(false)
    }
  }

  const statusHandler = async (e, orderId) => {
    const originalOrders = [...orders];
    setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: e.target.value } : o));

    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: e.target.value
      })
      if (response.data.success) {
        toast.success("Order Updated");
      }
    } catch (err) {
      setOrders(originalOrders);
      toast.error("Failed to update");
    }
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "Food Processing": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Out For Delivery": return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "Delivered": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      default: return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  }

  const exportOrdersToPDF = () => {
    if (!orders.length) {
      toast.warn("No orders to export");
      return;
    }

    // Use Landscape (l) for better space distribution in food delivery reports
    const doc = new jsPDF("l", "mm", "a4");

    // --- Header Section ---
    doc.setFontSize(22);
    doc.setTextColor(249, 115, 22); // Orange-500 brand color
    doc.text("KITCHEN DISPATCH REPORT", 14, 18);

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Total Active Orders: ${orders.filter(o => o.status !== 'Delivered').length}`, 14, 26);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 31);
    
    // Line separator
    doc.setDrawColor(220, 220, 220);
    doc.line(14, 35, 283, 35);

    const tableHead = [
      ["ID", "Customer", "Contact", "Delivery Address", "Menu Selection", "Amount", "Status"],
    ];

    const tableBody = orders.map(order => {
      // Format items as a clean list (1x Burger, 2x Coke)
      const items = order.items
        .map(i => `${i.quantity}x ${i.name}`)
        .join("\n"); // Using new line for vertical stacking

      const address = `${order.address.street}\n${order.address.city}, ${order.address.zipcode}`;

      return [
        `#${order._id.slice(-6).toUpperCase()}`,
        `${order.address.firstName} ${order.address.lastName}`,
        order.address.phone,
        address,
        items,
        `₹${order.amount}`,
        order.status.toUpperCase(),
      ];
    });

    autoTable(doc, {
      startY: 40,
      head: tableHead,
      body: tableBody,
      theme: "striped",
      styles: {
        fontSize: 9,
        cellPadding: 4,
        valign: 'middle',
        font: "helvetica",
        overflow: 'linebreak',
      },
      headStyles: {
        fillColor: [24, 24, 27], // zinc-900 to match your UI
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      columnStyles: {
        0: { cellWidth: 20, fontStyle: 'bold' }, // ID
        4: { cellWidth: 60 }, // Menu Selection
        3: { cellWidth: 50 }, // Address
        6: { cellWidth: 35, fontStyle: 'bold' }, // Status
      },
      // Logic to color code the status column text in the PDF
      didParseCell: (data) => {
        if (data.section === 'body' && data.column.index === 6) {
          const status = data.cell.raw;
          if (status === 'FOOD PROCESSING') data.cell.styles.textColor = [59, 130, 246]; // Blue
          if (status === 'OUT FOR DELIVERY') data.cell.styles.textColor = [249, 115, 22]; // Orange
          if (status === 'DELIVERED') data.cell.styles.textColor = [16, 185, 129]; // Emerald
        }
      }
    });

    const fileName = `Orders_Report_${new Date().toLocaleDateString().replace(/\//g, '-')}.pdf`;
    doc.save(fileName);
  };

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className="min-h-screen bg-[#09090b] p-4 sm:p-10 font-outfit text-zinc-400">


      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Live Orders</h1>
          <p className="text-zinc-500 mt-2 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Real-time delivery management
          </p>
        </div>

        <div className="flex gap-6 flex-wrap">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl px-6 py-3 backdrop-blur-md">
            <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">
              Active Orders
            </p>
            <p className="text-2xl font-bold text-white">
              {orders.filter(o => o.status !== 'Delivered').length}
            </p>
          </div>

          <button
            onClick={exportOrdersToPDF}
            className="bg-red-500 hover:bg-red-600 text-black font-bold px-6 py-3 rounded-2xl transition-all cursor-pointer"
          >
            Export to PDF
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {orders.map((order, idx) => (
          <div
            key={idx}
            className="group relative bg-[#121214] border border-zinc-800/50 rounded-4xl p-1 transition-all duration-500 hover:border-orange-500/30 hover:shadow-[0_0_40px_-15px_rgba(249,115,22,0.1)]"
          >
            <div className="bg-[#18181b] rounded-[1.8rem] p-6 md:p-8">

              <div className="flex flex-col xl:flex-row gap-8">

                {/* Left: Parcel Brand Section */}
                <div className="flex flex-col items-center justify-center bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 xl:w-48 shrink-0">
                  <div className="relative">
                    <img src={assets.parcel_icon} className="w-12 h-12 opacity-80" alt="" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-600 rounded-full border-4 border-[#18181b]"></div>
                  </div>
                  <p className="text-[10px] font-bold text-zinc-500 mt-4 uppercase tracking-tighter text-center">Order ID</p>
                  <p className="text-xs font-mono text-zinc-400">#{order._id.slice(-6)}</p>
                </div>

                {/* Center: Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">

                  {/* Items List */}
                  <div className="space-y-4">
                    <h4 className="text-white font-bold text-lg flex items-center gap-2">
                      Menu Selection
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {order.items.map((item, i) => (
                        <div key={i} className="bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl flex items-center gap-3">
                          <span className="text-orange-500 font-bold text-xs">{item.quantity}x</span>
                          <span className="text-zinc-300 text-sm font-medium">{item.name}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-zinc-800 text-zinc-500 border border-zinc-700">
                        Items: {order.items.length}
                      </span>
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded border ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="space-y-4">
                    <h4 className="text-white font-bold text-lg">Shipping Details</h4>
                    <div className="space-y-1">
                      <p className="text-zinc-100 font-semibold">{order.address.firstName} {order.address.lastName}</p>
                      <p className="text-sm text-zinc-500 leading-relaxed">
                        {order.address.street}, {order.address.city}, <br />
                        {order.address.state}, {order.address.zipcode}
                      </p>
                      <div className="flex items-center gap-2 mt-3 text-orange-400 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        {order.address.phone}
                      </div>
                    </div>
                  </div>

                </div>

                <div className="xl:w-64 border-t xl:border-t-0 xl:border-l border-zinc-800/50 pt-8 xl:pt-0 xl:pl-8 flex flex-col sm:flex-row xl:flex-col justify-between items-center xl:items-start gap-6 sm:gap-4">

                  <div className="w-full sm:w-auto xl:w-full">
                    <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Payout</p>
                    <p className="text-3xl md:text-4xl font-black text-white mt-1">₹{order.amount}</p>
                  </div>

                  <div className="w-full sm:flex-1 xl:w-full">
                    <div className="relative group/select">
                      <select
                        value={order.status}
                        onChange={(e) => statusHandler(e, order._id)}
                        className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-2xl px-5 py-4 outline-none focus:border-orange-500 transition-all cursor-pointer appearance-none font-bold"
                      >
                        <option value="Food Processing">Food Processing</option>
                        <option value="Out For Delivery">Out For Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>

                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 group-hover/select:text-orange-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M19 9l-7 7-7-7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders