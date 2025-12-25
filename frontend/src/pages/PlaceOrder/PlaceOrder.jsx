import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShieldCheck, MapPin, Mail, Phone, CreditCard } from "lucide-react";

const PlaceOrder = () => {
  const {
    cartItems, food_list, removeFromCart, getTotalCartAmount, getDeliveryFee, getDiscountAmount, getFinalTotal, promoCode, setPromoCode, promoTried, isPromoApplied, setIsPromoApplied, setPromoTried, applyPromo, url,token,clearCart
  } = useContext(StoreContext);

  const subtotal = getTotalCartAmount();
  const deliveryFee = getDeliveryFee();
  const discount = getDiscountAmount();
  const total = getFinalTotal();
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    if (subtotal === 0) return;

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartItems[item._id] });
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: total,
    };

    try {
      setLoading(true);

      const response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });

      if (!response.data.success) {
        alert("Order creation failed");
        return;
      }

      const { razorpayOrderId, amount, key, orderId } = response.data;

      const options = {
        key,
        amount,
        currency: "INR",
        name: "AagriKart - Food Delivery App",
        description: "Order Payment",
        order_id: razorpayOrderId,

        handler: async function (rzpResponse) {
          try {
            const verifyRes = await axios.post(
              url + "/api/order/verify",
              {
                razorpay_order_id: rzpResponse.razorpay_order_id,
                razorpay_payment_id: rzpResponse.razorpay_payment_id,
                razorpay_signature: rzpResponse.razorpay_signature,
                orderId,
              },
              { headers: { token } }
            );

            if (verifyRes.data.success) {
              await clearCart();
              navigate("/myorders");
            }
          } catch (err) {
            console.log(err);
          }
        },

        prefill: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          contact: data.phone,
        },

        theme: { color: "#f97316" },

        modal: {
          ondismiss: async function () {
            try {
              await axios.post(
                url + "/api/order/cancel",
                { orderId },
                { headers: { token } }
              );
            } catch (err) {
              console.log(err);
            }
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token || subtotal === 0) navigate("/cart");
  }, [token, subtotal]);

  const inputBase =
    "w-full rounded-xl px-4 py-3 bg-zinc-950/40 border border-zinc-800/70 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-orange-500/70 focus:ring-2 focus:ring-orange-500/20 transition";

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 pt-28 pb-16">
      <div className="max-w-7xl mx-auto">
        {/* header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 tracking-wide">
            Checkout
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Secure payment via Razorpay. Your details stay protected.
          </p>
        </div>

        <form
          onSubmit={placeOrder}
          className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.85fr] gap-6 lg:gap-10"
        >
          {/* LEFT: Delivery form */}
          <div
            className="
              rounded-3xl p-5 sm:p-6
              bg-zinc-900/45 border border-zinc-800/70
              backdrop-blur-2xl
              shadow-[0_18px_50px_rgba(0,0,0,0.45)]
            "
          >
            <div className="flex items-start justify-between gap-3 mb-5">
              <div>
                <p className="font-bold text-xl text-zinc-100">
                  Delivery Information
                </p>
                <p className="text-sm text-zinc-400 mt-1">
                  Fill the address where the food should arrive.
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-300 bg-zinc-950/50 border border-zinc-800/70 rounded-full px-3 py-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Encrypted checkout
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                required
                name="firstName"
                onChange={onChangeHandler}
                value={data.firstName}
                type="text"
                placeholder="First name"
                className={inputBase}
              />
              <input
                required
                name="lastName"
                onChange={onChangeHandler}
                value={data.lastName}
                type="text"
                placeholder="Last name"
                className={inputBase}
              />
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4">
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  required
                  name="email"
                  onChange={onChangeHandler}
                  value={data.email}
                  type="email"
                  placeholder="Email address"
                  className={`${inputBase} pl-11`}
                />
              </div>

              <div className="relative">
                <MapPin className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  required
                  name="street"
                  onChange={onChangeHandler}
                  value={data.street}
                  type="text"
                  placeholder="Street / Building / Landmark"
                  className={`${inputBase} pl-11`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  required
                  name="city"
                  onChange={onChangeHandler}
                  value={data.city}
                  type="text"
                  placeholder="City"
                  className={inputBase}
                />
                <input
                  required
                  name="state"
                  onChange={onChangeHandler}
                  value={data.state}
                  type="text"
                  placeholder="State"
                  className={inputBase}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  required
                  name="zipcode"
                  onChange={onChangeHandler}
                  value={data.zipcode}
                  type="text"
                  placeholder="Zip code"
                  className={inputBase}
                />
                <input
                  required
                  name="country"
                  onChange={onChangeHandler}
                  value={data.country}
                  type="text"
                  placeholder="Country"
                  className={inputBase}
                />
              </div>

              <div className="relative">
                <Phone className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  required
                  name="phone"
                  onChange={onChangeHandler}
                  value={data.phone}
                  type="tel"
                  placeholder="Phone"
                  className={`${inputBase} pl-11`}
                />
              </div>
            </div>
          </div>

          {/* RIGHT: Summary + Pay */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div
              className="
                rounded-3xl p-5 sm:p-6
                bg-zinc-900/45 border border-zinc-800/70
                backdrop-blur-2xl
                shadow-[0_18px_50px_rgba(0,0,0,0.45)]
              "
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-bold text-xl text-zinc-100">
                  Payment Summary
                </h2>
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <CreditCard className="w-4 h-4 text-orange-400" />
                  Razorpay
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-zinc-950/40 border border-zinc-800/70 p-4">
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500 font-semibold">
                  Promo code
                </p>

                <div className="mt-3 flex flex-col sm:flex-row gap-2">
                  <input
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      setPromoTried(false);
                      setIsPromoApplied(false);
                    }}
                    type="text"
                    placeholder="AAGRI20"
                    className="flex-1 rounded-xl px-4 py-3 bg-zinc-950/50 border border-zinc-800/70 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-orange-500/70 focus:ring-2 focus:ring-orange-500/20 transition"
                  />
                  <button
                    type="button"
                    onClick={applyPromo}
                    className="rounded-xl px-5 py-3 bg-zinc-100 text-black font-semibold hover:bg-zinc-200 transition"
                  >
                    Apply
                  </button>
                </div>

                <p className="mt-2 text-xs">
                  {!promoTried ? (
                    <span className="text-zinc-500">Use promo code to get 20% off.</span>
                  ) : isPromoApplied ? (
                    <span className="text-emerald-500 font-semibold">
                      Promo applied: 20% off (AAGRI20)
                    </span>
                  ) : (
                    <span className="text-red-500">Promo code not valid</span>
                  )}
                </p>
              </div>

              <div className="mt-4 space-y-2 text-sm text-zinc-300 font-medium">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Delivery fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                {isPromoApplied && (
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Discount</span>
                    <span className="text-emerald-400 font-semibold">-₹{discount}</span>
                  </div>
                )}

                <div className="h-px bg-zinc-800 my-2" />

                <div className="flex justify-between text-zinc-100">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold">₹{total}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || subtotal === 0}
                className="
                  mt-5 w-full rounded-xl
                  bg-linear-to-r from-red-500 to-orange-400
                  px-6 py-3 text-sm font-semibold tracking-wide
                  text-white
                  shadow-[0_6px_16px_rgba(248,113,113,0.7)]
                  hover:shadow-[0_4px_25px_rgba(248,113,113,0.9)]
                  hover:translate-y-px
                  active:translate-y-0.5 active:scale-[0.98]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all
                "
              >
                {loading ? "OPENING RAZORPAY..." : "PROCEED TO PAYMENT"}
              </button>

              <p className="mt-3 text-xs text-zinc-500 leading-5">
                By proceeding, you’ll be redirected to Razorpay’s secure checkout
                to complete your payment.
              </p>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;