import axios from 'axios'
import { toast } from "react-toastify";
import React, { useEffect, useState } from 'react'

const List = ({ url }) => {
  const [list, setList] = useState([])

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    if (response.data.success) {
      setList(response.data.data)
    } else {
      toast.error(response.data.error)
    }
  }

  const removeFood = async (foodID) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodID })
    await fetchList()
    if (response.data.success) {
      toast.success(response.data.message)
    } else {
      toast.error(response.data.error)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className="flex flex-col gap-4 p-4 sm:p-6 bg-zinc-950 min-h-screen font-outfit text-white">
      {/* Header Section */}
      <div className="flex flex-row justify-between items-center mb-2 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold">Food List</h2>
          <span className="text-xs md:text-sm bg-zinc-800 px-3 py-1 rounded-full text-zinc-300 border border-zinc-700">
            {list.length} Items
          </span>
      </div>
      
      {/* Scrollable Container for very long lists */}
      <div className="grid grid-cols-1 gap-3 md:gap-4">
        {list.map(item => (
          <div 
            key={item._id} 
            className="group bg-zinc-900 border border-zinc-800 rounded-xl p-3 md:p-4 flex flex-row items-center justify-between shadow-sm hover:border-zinc-600 transition-all duration-300"
          >
            {/* Left Side: Image & Info */}
            <div className="flex items-center gap-3 md:gap-5 overflow-hidden">
              {/* Image - Scales down for small screens */}
              <div className="min-w-12.5 w-12.5 h-12.5 md:w-16 md:h-16 rounded-lg overflow-hidden border border-zinc-700 shrink-0">
                <img 
                    src={`${url}/images/${item.image}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                    alt={item.name}
                />
              </div>

              {/* Text Info - Truncates on very small screens to prevent overflow */}
              <div className="min-w-0">
                <p className="font-semibold text-zinc-100 text-sm md:text-lg truncate max-w-30 sm:max-w-full">
                  {item.name}
                </p>
                <span className="inline-block mt-0.5 px-2 md:px-3 py-0.5 text-[10px] md:text-xs font-medium text-orange-400 bg-orange-500/10 rounded-full border border-orange-500/20">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Right Side: Price & Action */}
            <div className="flex items-center gap-2 md:gap-6 shrink-0">
              <p className="text-zinc-200 font-medium text-sm md:text-lg whitespace-nowrap">
                ₹{item.price}
              </p>
              
              <button 
                onClick={() => removeFood(item._id)} 
                className="p-2 md:p-3 rounded-full text-zinc-500 hover:bg-red-500/10 hover:text-red-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                title="Remove item"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {list.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-zinc-800 rounded-xl">
            <p className="text-zinc-500">No items found in the list.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default List