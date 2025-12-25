import { menu_list } from '../../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu mt-10 mb-8 font-medium' id='menu'>
      <h1 className='text-3xl font-bold tracking-wide'>Explore Our Menu</h1>

      <p
        className="
          explore-menu-text my-5
          max-w-xl               /* nice readable width on desktop */
          md:max-w-2xl
          w-full                 /* always allow full width on small screens */
          text-sm text-wrap
        "
      >
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is
        to satisfy your cravings and elevate your dining experience, one delicious meal
        at a time.
      </p>

      <div className="
        explore-menu-list
        flex whitespace-nowrap overflow-x-scroll no-scrollbar 
        items-center gap-8 mb-8 
        max-[1050px]:gap-6 
        max-[750px]:gap-4 
        scroll-smooth
      ">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
            className="explore-menu-list-item cursor-pointer shrink-0"   // <-- HERE
          >
            <img
              src={item.menu_image}
              alt={item.menu_name}
              className={`
                rounded-full transition-all duration-300
                border-4 h-32 w-32
                max-[1050px]:h-28 max-[1050px]:w-28
                max-[750px]:h-24 max-[750px]:w-24
                ${category === item.menu_name ? 'border-orange-500 p-1' : 'border-transparent'}
              `}
            />

            <p
              className={`
                text-center transition-all duration-300
                max-[750px]:text-sm
                ${category === item.menu_name ? "text-orange-500 font-semibold" : ""}
              `}
            >
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>
      <div className='border-gray-400 border'>
      </div>
    </div>
  );
};

export default ExploreMenu;
