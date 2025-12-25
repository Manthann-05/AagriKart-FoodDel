import { NavLink } from "react-router-dom"
import { assets } from "../../assets/assets";

const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-zinc-900 border-r border-zinc-800 min-h-screen p-4 shrink-0">
      <div className="flex flex-col gap-3">

        {[
          { to: '/add', label: 'Add Items', icon: assets.add_icon },
          { to: '/list', label: 'List Items', icon: assets.order_icon },
          { to: '/orders', label: 'Orders', icon: assets.order_icon }
        ].map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-lg transition font-bold
              ${isActive
                ? 'bg-red-600 text-white' 
                : 'hover:bg-zinc-800 text-white'}`
            }
          >
            <img src={item.icon} className="w-6 min-w-6 filter invert brightness-200" alt="" />
            
            <span className="whitespace-nowrap">{item.label}</span>
          </NavLink>
        ))}

      </div>
    </aside>
  )
}

export default Sidebar;