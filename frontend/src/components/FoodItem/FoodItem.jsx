// FoodItem.jsx
import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div
      className="
        relative rounded-2xl overflow-hidden
        bg-zinc-950/70 border border-zinc-800
        shadow-[0_18px_55px_rgba(0,0,0,1)]
        hover:shadow-[0_24px_80px_rgba(0,0,0,1)]
        hover:-translate-y-1
        transition-all duration-300
      "
    >
      <div className="relative w-full h-44 md:h-48 overflow-hidden">
        <img
          src={url + '/images/' + image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />

        {!cartItems[id] ? (
          <button
            onClick={() => addToCart(id)}
            className="
              absolute bottom-3 right-3 w-10 h-10 rounded-full
              bg-black/80 border border-white/15
              flex items-center justify-center
              hover:scale-110 active:scale-95
              transition-transform duration-200
            "
          >
            <img
              src={assets.add_icon_white}
              alt="add"
              className="w-4 h-4"
            />
          </button>
        ) : (
          <div
            className="
              absolute bottom-3 right-3
              flex items-center gap-3 bg-black/80 text-white
              rounded-full px-3 py-1.5 border border-white/10
            "
          >
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              className="w-4 cursor-pointer"
              alt="remove"
            />
            <p className="font-semibold text-sm">{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              className="w-4 cursor-pointer"
              alt="add"
            />
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center gap-3">
          <p className="font-semibold text-base md:text-lg text-zinc-100 line-clamp-1">
            {name}
          </p>
          <img
            src={assets.rating_starts}
            className="w-16 opacity-90"
            alt="rating"
          />
        </div>

        <p className="text-xs md:text-sm text-zinc-400 leading-snug line-clamp-2">
          {description}
        </p>

        <p className="text-orange-400 font-bold text-lg mt-1">
          ₹{price}
        </p>
      </div>
    </div>
  );
};

export default FoodItem;
