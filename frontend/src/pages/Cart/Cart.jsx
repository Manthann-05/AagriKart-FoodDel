import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    cartItems, food_list, removeFromCart, getTotalCartAmount, getDeliveryFee, getDiscountAmount, getFinalTotal, promoCode, setPromoCode, promoTried, isPromoApplied, setIsPromoApplied, setPromoTried, applyPromo, url,
  } = useContext(StoreContext);

  const subtotal = getTotalCartAmount();
  const deliveryFee = getDeliveryFee();
  const discount = getDiscountAmount();
  const total = getFinalTotal();
  const navigate = useNavigate();

  const hasItems = food_list.some(item => cartItems[item._id] > 0);

  return (
    <div className="cart px-4 md:px-6 lg:px-10 pt-28 pb-16 max-w-6xl mx-auto">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">
        Your Cart
      </h1>

      <div className="cart-item">
        {/* Desktop table layout */}
        <div className="hidden lg:block rounded-2xl glass-panel shadow-[0_18px_45px_rgba(0,0,0,0.7)] p-6">
          <div className="grid grid-cols-[1fr_1.6fr_1fr_1fr_1fr_0.5fr] text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 mb-3">
            <p>Item</p>
            <p>Title</p>
            <p>Price</p>
            <p>Qty</p>
            <p>Total</p>
            <p className="text-center">Remove</p>
          </div>

          <hr className="border-zinc-200 dark:border-zinc-700 mb-3" />

          {!hasItems && (
            <p className="mt-2 text-zinc-500 dark:text-zinc-400 font-semibold text-base">
              No items added to cart.
            </p>
          )}

          {food_list.map(
            item =>
              cartItems[item._id] > 0 && (
                <div
                  key={item._id}
                  className="
                    grid grid-cols-[1fr_1.6fr_1fr_1fr_1fr_0.5fr]
                    items-center py-3 border-b
                    border-zinc-100 dark:border-zinc-800/60
                    text-sm text-zinc-800 dark:text-zinc-100
                  "
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={url + '/images/' + item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    ₹{item.price}
                  </p>
                  <p className="font-medium">{cartItems[item._id]}</p>
                  <p className="font-semibold">
                    ₹{item.price * cartItems[item._id]}
                  </p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="
                      text-center cursor-pointer font-bold text-zinc-400
                      hover:text-red-500 transition-colors
                    "
                    aria-label="Remove item"
                  >
                    ✕
                  </button>
                </div>
              )
          )}
        </div>

        {/* Mobile cards */}
        <div className="lg:hidden space-y-6">
          {!hasItems && (
            <p className="text-zinc-500 dark:text-zinc-400 font-semibold text-base">
              No items added to cart.
            </p>
          )}

          {food_list.map(
            item =>
              cartItems[item._id] > 0 && (
                <div
                  key={item._id}
                  className="
                    rounded-2xl overflow-hidden
                    bg-white shadow-[0_16px_40px_rgba(15,23,42,0.20)]
                    dark:bg-zinc-950/80 dark:border dark:border-zinc-800
                  "
                >
                  <div className="relative h-48">
                    <img
                      src={url + '/images/' + item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="
                        absolute top-3 right-3 bg-white/95 dark:bg-black/80
                        rounded-full w-9 h-9 flex items-center justify-center
                        shadow font-bold text-red-500
                        hover:scale-105 active:scale-95 transition-transform
                      "
                      aria-label="Remove item"
                    >
                      ✕
                    </button>

                    <div className="absolute bottom-0 w-full bg-black/55 text-white px-4 py-2">
                      <p className="font-semibold text-lg line-clamp-1">
                        {item.name}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-200">
                    <div className="flex justify-between">
                      <span className="text-zinc-500 dark:text-zinc-400">
                        Price
                      </span>
                      <span>₹{item.price}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-zinc-500 dark:text-zinc-400">
                        Quantity
                      </span>
                      <span>{cartItems[item._id]}</span>
                    </div>

                    <div className="flex justify-between font-semibold text-zinc-900 dark:text-zinc-50 pt-1">
                      <span>Total</span>
                      <span>₹{item.price * cartItems[item._id]}</span>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>

      {/* Bottom section */}
      <div className="cart-bottom mt-10 w-full flex flex-col lg:flex-row gap-y-8 gap-x-8 justify-between">
        {/* Totals */}
        <div className="cart-total w-full md:w-2/3 lg:w-1/2 order-2 lg:order-1">
          <div className="rounded-2xl glass-panel shadow-[0_18px_45px_rgba(0,0,0,0.7)] p-6">
            <h2 className="font-bold text-xl mb-4 text-zinc-900 dark:text-zinc-50">
              Cart Totals
            </h2>

            <div className="text-sm text-zinc-600 dark:text-zinc-300 font-medium space-y-2">
              <div className="flex justify-between py-1">
                <p>Subtotal</p>
                <p>₹{subtotal}</p>
              </div>

              <hr className="border-zinc-200 dark:border-zinc-800" />

              <div className="flex justify-between py-1">
                <p>Delivery fee</p>
                <p>₹{deliveryFee}</p>
              </div>

              <hr className="border-zinc-200 dark:border-zinc-800" />

              {isPromoApplied && (
                <>
                  <div className="flex justify-between py-1">
                    <p>Discount</p>
                    <p className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      -₹{discount}
                    </p>
                  </div>

                  <hr className="border-zinc-200 dark:border-zinc-800" />
                </>
              )}

              <div className="flex justify-between py-1 pt-1 text-zinc-900 dark:text-zinc-50">
                <b>Total</b>
                <b>₹{total}</b>
              </div>
            </div>

            <button
              onClick={() => {
                if (subtotal === 0) return;
                navigate("/order");
              }}
              className="
                  mt-5 w-full rounded-xl
                  bg-linear-to-r from-red-500 to-orange-400
                  px-6 py-3 text-sm font-semibold tracking-wide
                  text-white
                  shadow-[0_6px_20px_rgba(248,113,113,0.7)]
                  hover:shadow-[0_4px_30px_rgba(248,113,113,0.9)]
                  hover:translate-y-px
                  active:translate-y-0.5 active:scale-[0.98]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all
                "
              disabled={subtotal === 0}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>

        {/* Promo code */}
        <div className="cart-promocode w-full md:w-2/3 lg:w-1/2 order-1 lg:order-2">
          <div className="rounded-2xl glass-panel shadow-[0_18px_45px_rgba(0,0,0,0.7)] p-6">
            <p className="text-sm text-zinc-600 max-[460px]:tracking-tight dark:text-zinc-300 font-semibold mb-3">
              If you have a promo code, enter it here
            </p>

            <div className="flex flex-col sm:flex-row w-full rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
              <input
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value);
                  setPromoTried(false);
                  setIsPromoApplied(false);
                }}
                type="text"
                placeholder="PROMO CODE"
                className="
                  flex-1 px-4 py-3 outline-none
                  text-zinc-700 dark:text-zinc-100
                  placeholder:text-zinc-500 dark:placeholder:text-zinc-500
                  bg-transparent
                  focus:ring-0
                "
                disabled={subtotal === 0}
              />
              <button
                onClick={applyPromo}
                className="
                  bg-black text-white px-6 py-3 text-sm font-semibold
                  hover:bg-black/90 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-200
                  transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                "
                disabled={subtotal === 0}
              >
                Submit
              </button>
            </div>

            <p className="mt-3 text-xs">
              {!promoTried ? (
                <span className="text-zinc-500">Use Promo Code to get 20% off.</span>
              ) : isPromoApplied ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  Promo applied: 20% off (AAGRI20)
                </span>
              ) : (
                <span className="text-red-500">Promo code not valid</span>
              )}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Cart;
