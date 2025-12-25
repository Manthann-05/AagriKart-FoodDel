// Navbar.jsx
import { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu } from 'lucide-react'
import { ThemeContext } from '../../context/ThemeContext';
import { useLocation } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const location = useLocation();
  const isHome = location.pathname === "/";

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/');
  };

  const navItems = ['Home', 'Menu', 'Download', 'Contact'];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-10 py-4 pointer-events-none">
      <div className="pointer-events-auto max-w-7xl mx-auto">
        <div className="
          backdrop-blur-2xl dark:bg-zinc-900/80
          border border-zinc-800/80
          bg-black
          rounded-2xl px-5 md:px-7 py-3
          flex items-center justify-between gap-4
          shadow-[0_18px_50px_rgba(0,0,0,0.9)]
        ">
          {/* Logo */}
          <Link to="/" onClick={() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }) }} className="shrink-0 flex items-center gap-2">
            <img
              src={assets.logo}
              alt="logo"
              className="h-8 md:h-10 brightness-125"
            />
          </Link>

          {/* Links */}
          {isHome && <ul className="hidden lg:flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            {navItems.map((item) => (
              <li key={item}>
                {item === "Home" ? (
                  <Link
                    to="/"
                    onClick={() => {
                      setMenu(item)
                      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                    }}
                    className={`
                      relative px-4 py-2 rounded-full transition-all duration-300
                      hover:text-zinc-100
                      ${menu === item ? "text-red-500" : ""}
                    `}
                  >
                    <span
                      className={`
                        absolute inset-0 rounded-full -z-10
                        bg-zinc-800/80 border border-white/5
                        shadow-[0_0_0_1px_rgba(255,255,255,0.02)]
                        backdrop-blur-xl
                        scale-0 opacity-0
                        ${menu === item ? "scale-100 opacity-100" : ""}
                        transition-all duration-300
                      `}
                    />
                    {item}
                  </Link>
                ) : (
                  <a
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMenu(item)}
                    className={`
                      relative px-4 py-2 rounded-full transition-all duration-300
                      hover:text-zinc-100
                      ${menu === item ? "text-red-500" : ""}
                    `}
                  >
                    <span
                      className={`
                        absolute inset-0 rounded-full -z-10
                        bg-zinc-800/80 border border-white/5
                        shadow-[0_0_0_1px_rgba(255,255,255,0.02)]
                        backdrop-blur-xl
                        scale-0 opacity-0
                        ${menu === item ? "scale-100 opacity-100" : ""}
                        transition-all duration-300
                      `}
                    />
                    {item}
                  </a>
                )}
              </li>
            ))}
          </ul>}

          {/* Right actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full bg-zinc-950/80 border border-zinc-700/80 grid place-items-center"
              aria-label="Toggle theme"
            >
              <span className="text-zinc-100 text-xs font-bold">
                {theme === "dark" ? <Sun height={18} /> : <Moon height={18} />}
              </span>
            </button>
            <Link
              to="/cart"
              className="relative hover:scale-110 active:scale-95 transition-transform duration-200"
            >
              <div className="
                inline-flex items-center justify-center rounded-full
                bg-zinc-950/80 border border-zinc-700/80
                w-9 h-9
              ">
                <img
                  src={assets.basket_icon}
                  className="w-4 invert brightness-150"
                  alt="cart"
                />
              </div>
              {getTotalCartAmount() > 0 && (
                <span className="
                  absolute -top-0.5 -right-0.5 w-2 h-2
                  rounded-full bg-red-500 border border-zinc-900
                " />
              )}
            </Link>

            {!token ? (
              <button
                onClick={() => setShowLogin(true)}
                className="
                  bg-linear-to-r from-red-500 to-orange-500
                  text-white text-[11px] font-bold uppercase tracking-[0.22em]
                  px-5 py-2.5 rounded-full
                  shadow-[0_14px_38px_rgba(248,113,113,0.7)]
                  hover:shadow-[0_18px_48px_rgba(248,113,113,0.9)]
                  hover:translate-y-px
                  active:translate-y-0.5 active:scale-[0.98]
                  transition-all duration-200
                  hidden sm:inline-flex
                "
              >
                Get Started
              </button>
            ) : (
              <div className="flex items-center border-l border-zinc-800 pl-4 gap-2">
                {/* desktop profile (md and up) */}
                <div className="relative group hidden md:block">
                  <img
                    src={assets.profile_icon}
                    className="
                      w-9 h-9 rounded-full border border-zinc-600
                      p-0.5 cursor-pointer
                      shadow-[0_0_0_1px_rgba(255,255,255,0.08)]
                    "
                    alt="profile"
                  />
                  <div
                    className="
                      absolute right-0 mt-3 w-52
                      bg-zinc-950/95 border border-zinc-800/80
                      rounded-2xl shadow-2xl py-2
                      flex-col overflow-hidden
                      origin-top-right
                      transition-all duration-200
                      hidden group-hover:flex
                    "
                  >
                    <button
                      onClick={() => navigate('/myorders')}
                      className="px-4 py-3 hover:bg-zinc-900 flex items-center gap-3 text-zinc-100 font-semibold text-sm"
                    >
                      <img src={assets.bag_icon} className="w-4 invert" alt="" /> My Orders
                    </button>
                    <button
                      onClick={logout}
                      className="px-4 py-3 hover:bg-red-950/25 text-red-400 flex items-center gap-3 font-semibold text-sm"
                    >
                      <img src={assets.logout_icon} className="w-4 invert opacity-60" alt="" /> Sign Out
                    </button>
                  </div>
                </div>

                {/* mobile hamburger (smaller screens) */}
                <div className="relative md:hidden">
                  <button
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    className="text-zinc-100 p-1.5 rounded-full hover:bg-white/10"
                  >
                    <Menu />
                  </button>

                  <div
                    className={`
                      absolute -right-4 mt-3 w-screen max-w-xs
                      bg-zinc-950/95 border border-zinc-800/80
                      rounded-2xl shadow-2xl py-2
                      flex-col overflow-hidden
                      origin-top-right
                      transition-all duration-200
                      ${showMobileMenu ? 'flex opacity-100 scale-100' : 'hidden opacity-0 scale-95'}
                    `}
                  >
                    {/* nav links stacked vertically (only on Home page) */}
                    {isHome && (
                      <ul className="flex flex-col gap-1 px-2 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
                        {["Home", "Menu", "Download", "Contact"].map((item) => (
                          <li key={item}>
                            {item === "Home" ? (
                              <Link
                                to="/"
                                onClick={() => {
                                  handleNavClick(item);
                                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                                }}
                                className={`
                                  w-full block text-left px-4 py-2.5 rounded-xl
                                  hover:bg-zinc-900 hover:text-zinc-100 transition-colors
                                  ${menu === item ? "bg-zinc-900 text-zinc-50" : ""}
                                `}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{item}</span>
                                  {menu === item && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                                </div>
                              </Link>
                            ) : (
                              <a
                                href={`#${item.toLowerCase()}`}
                                onClick={() => handleNavClick(item)}
                                className={`
                                  w-full block text-left px-4 py-2.5 rounded-xl
                                  hover:bg-zinc-900 hover:text-zinc-100 transition-colors
                                  ${menu === item ? "bg-zinc-900 text-zinc-50" : ""}
                                `}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{item}</span>
                                  {menu === item && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                                </div>
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* divider */}
                    <div className="h-px bg-zinc-800 my-1" />

                    {/* actions shown on all pages (when token exists) */}
                    <button
                      onClick={() => {
                        setShowMobileMenu(false);
                        navigate("/myorders");
                      }}
                      className="px-4 py-3 hover:bg-zinc-900 flex items-center gap-3 text-zinc-100 font-semibold text-sm"
                    >
                      <img src={assets.bag_icon} className="w-4 invert" alt="" /> My Orders
                    </button>

                    <button
                      onClick={() => {
                        setShowMobileMenu(false);
                        logout();
                      }}
                      className="px-4 py-3 hover:bg-red-950/25 text-red-400 flex items-center gap-3 font-semibold text-sm"
                    >
                      <img src={assets.logout_icon} className="w-4 invert opacity-60" alt="" /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;