import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import axios from "axios";
import { RefreshCcw, Package, ArrowRight } from "lucide-react";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { url, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      setData(response.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  const statusDot = (status = "") => {
    const s = status.toLowerCase();
    if (s.includes("delivered")) return "bg-emerald-500";
    if (s.includes("out") || s.includes("shipping")) return "bg-sky-500";
    if (s.includes("cancel")) return "bg-zinc-500";
    return "bg-orange-500";
  };

  return (
    <div className="w-full mt-20 px-4 sm:px-6 md:px-10 py-8 outfit-font">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl text-zinc-700 font-bold tracking-wide dark:text-zinc-100">
              My Orders
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              Track status, items, and totals in one place.
            </p>
          </div>

          <button
            onClick={fetchOrders}
            disabled={loading}
            className="
              inline-flex items-center gap-2
              rounded-full px-4 py-2
              bg-zinc-950/70 border border-zinc-800/80
              text-zinc-100 text-sm font-semibold
              hover:bg-zinc-900/60 transition
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          >
            <RefreshCcw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Empty state */}
        {!loading && data.length === 0 && (
          <div
            className="
              rounded-3xl p-8 sm:p-10
              bg-zinc-900/40 border border-zinc-800/70
              backdrop-blur-xl
              text-center
            "
          >
            <div className="mx-auto w-14 h-14 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 grid place-items-center">
              <Package className="w-6 h-6 text-zinc-200" />
            </div>
            <h3 className="text-zinc-100 text-lg font-bold mt-4">
              No orders yet
            </h3>
            <p className="text-zinc-400 text-sm mt-1">
              Once you place an order, it will appear here for tracking.
            </p>
          </div>
        )}

        {/* Orders */}
        <div className="flex flex-col gap-6">
          {[...data].reverse().map((order, index) => {
            const itemsText = order.items
              ?.map((it) => `${it.name} x ${it.quantity}`)
              .join(", ");

            return (
              <div
                key={index}
                className="
                  group relative overflow-hidden
                  rounded-3xl
                  bg-zinc-900/45 border border-zinc-800/70
                  backdrop-blur-2xl
                  shadow-[0_18px_50px_rgba(0,0,0,0.45)]
                  hover:border-zinc-700/80
                  transition
                "
              >
                {/* subtle gradient accent */}
                <div
                  className="
                    pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition
                    bg-linear-to-r from-red-500/10 via-orange-500/10 to-transparent
                  "
                />

                <div className="relative p-4 sm:p-5 md:p-6">
                  {/* top row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 grid place-items-center">
                        <img
                          src={assets.parcel_icon}
                          alt=""
                          className="w-6 h-6 object-contain opacity-90"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${statusDot(
                              order.status
                            )}`}
                          />
                          <p className="text-zinc-200 font-semibold">
                            {order.status}
                          </p>
                        </div>
                        <p className="text-xs text-zinc-500 mt-1">
                          Order #{String(data.length - index).padStart(3, "0")}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-zinc-100 font-bold text-lg">
                        ₹{order.amount}.00
                      </p>
                      <p className="text-xs text-zinc-500">
                        Items: {order.items?.length || 0}
                      </p>
                    </div>
                  </div>

                  {/* details layout:
                      - On mobile: stacked
                      - On md+: 2-column grid
                  */}
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div
                      className="
                        rounded-2xl bg-zinc-950/40 border border-zinc-800/70
                        p-4
                      "
                    >
                      <p className="text-xs uppercase tracking-[0.22em] text-zinc-500 font-semibold">
                        Items
                      </p>
                      <p className="text-sm text-zinc-200 mt-2 leading-6 line-clamp-3">
                        {itemsText}
                      </p>
                    </div>

                    <div
                      className="
                        rounded-2xl bg-zinc-950/40 border border-zinc-800/70
                        p-4 flex items-center justify-between gap-3
                      "
                    >
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-zinc-500 font-semibold">
                          Actions
                        </p>
                        <p className="text-sm text-zinc-400 mt-2">
                          Refresh to update status.
                        </p>
                      </div>

                      <button
                        onClick={fetchOrders}
                        className="
                          inline-flex items-center gap-2
                          rounded-full px-4 py-2
                          bg-linear-to-r from-red-500 to-orange-500
                          text-white text-xs font-bold uppercase tracking-[0.22em]
                          shadow-[0_4px_28px_rgba(248,113,113,0.35)]
                          hover:shadow-[0_6px_38px_rgba(248,113,113,0.55)]
                          active:scale-[0.98]
                          transition
                          whitespace-nowrap
                        "
                      >
                        Track
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* loading skeleton-ish */}
        {loading && (
          <div className="mt-4 text-sm text-zinc-400">
            Loading orders...
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
