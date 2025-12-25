// FoodDisplay.jsx
import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  const filteredList =
    category === 'All'
      ? food_list
      : food_list.filter((item) => item.category === category);

  return (
    <div className="food-display mt-10">
      <div className="flex flex-col md:flex-row gap-y-2 items-baseline justify-between mb-6">
        <h2 className="font-bold text-2xl md:text-3xl text-zinc-600 dark:text-zinc-50">
          Top Dishes Near You
        </h2>
        <p className="text-[11px] md:text-sm text-zinc-500">
          Showing <span className="text-zinc-200">{filteredList.length}</span> options
        </p>
      </div>

      <div
        className="
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          gap-6 md:gap-8 mb-12
        "
      >
        {filteredList.map((item) => (
          <FoodItem
            key={item._id}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
