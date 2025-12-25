import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from "../../assets/assets";

const Navbar = () => {
  // State to track if the mobile menu is open
  const [showMenu, setShowMenu] = useState(false);

  const menuItems = [
    { to: '/add', label: 'Add Items' },
    { to: '/list', label: 'List Items' },
    { to: '/orders', label: 'Orders' }
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-zinc-900/90 border-b border-zinc-800 px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <img className='h-12 md:h-16' src={assets.logo} alt="logo" />

      {/* Right Side Group */}
      <div className="relative flex items-center gap-4">

        {/* Profile Image */}
        <img
          className='h-12 w-12 rounded-full border border-zinc-700'
          src={assets.profile_image}
          alt="profile"
        />

        {/* Hamburger Icon - Toggles State */}
        <button 
          onClick={() => setShowMenu(!showMenu)}
          className="md:hidden text-white p-2 hover:bg-zinc-800 rounded-lg transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        {/* --- Dropdown Menu (Visible only when showMenu is true) --- */}
        {showMenu && (
          <div className="absolute top-16 right-0 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-2 md:hidden">
            <div className="flex flex-col gap-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setShowMenu(false)} // Close menu when item clicked
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg text-sm font-bold transition
                    ${isActive ? 'bg-red-600 text-white' : 'text-zinc-300 hover:bg-zinc-800'}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;