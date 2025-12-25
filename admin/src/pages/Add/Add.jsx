import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="min-h-screen flex justify-center items-start pt-10 px-4 sm:px-6 lg:px-8 font-outfit">
      <div className="max-w-4xl w-full bg-zinc-800 rounded-xl shadow-2xl p-8 md:p-10 border border-zinc-700">
        
        <div className="mb-8 border-b border-zinc-700 pb-4">
          <h2 className="text-2xl font-bold text-white">Add New Item</h2>
          <p className="text-zinc-400 text-sm mt-1">
            Create a new food item for your menu.
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-8">
          
          <div className="space-y-2">
            <p className="text-sm font-semibold text-zinc-300">Upload Image</p>
            <div className="flex justify-center items-center w-full">
              <label
                htmlFor="image"
                className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 
                ${image ? "border-red-500 bg-zinc-700/50" : "border-zinc-600 bg-zinc-700 hover:bg-zinc-600 hover:border-red-500"}`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="h-32 object-contain rounded-md shadow-md"
                    />
                  ) : (
                    <>
                      <svg className="w-10 h-10 mb-3 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <p className="mb-2 text-sm text-zinc-400 text-center"><span className="font-semibold text-white">Click to upload</span> or <br /> drag and drop</p>
                      <p className="text-xs text-zinc-500">PNG, JPG or JPEG</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  id="image"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-300">Product Name</label>
              <input
                name="name"
                value={data.name}
                onChange={onChangeHandler}
                type="text"
                placeholder="e.g. Greek Salad"
                className="w-full px-4 py-3 rounded-lg bg-zinc-700 border border-zinc-600 text-white placeholder-zinc-400 focus:border-red-500 focus:bg-zinc-700 focus:ring-2 focus:ring-red-500/50 outline-none transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-300">Category</label>
              <div className="relative">
                <select
                  name="category"
                  value={data.category}
                  onChange={onChangeHandler}
                  className="w-full px-4 py-3 rounded-lg bg-zinc-700 border border-zinc-600 text-white focus:border-red-500 focus:bg-zinc-700 focus:ring-2 focus:ring-red-500/50 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option>Salad</option>
                  <option>Rolls</option>
                  <option>Deserts</option>
                  <option>Sandwich</option>
                  <option>Cake</option>
                  <option>Pure Veg</option>
                  <option>Pasta</option>
                  <option>Noodles</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-zinc-300">Description</label>
            <textarea
              name="description"
              value={data.description}
              onChange={onChangeHandler}
              rows={4}
              placeholder="Write a short description..."
              className="w-full px-4 py-3 rounded-lg bg-zinc-700 border border-zinc-600 text-white placeholder-zinc-400 focus:border-red-500 focus:bg-zinc-700 focus:ring-2 focus:ring-red-500/50 outline-none transition-all resize-none"
              required
            />
          </div>

          <div className="space-y-2 md:w-1/2">
             <label className="text-sm font-semibold text-zinc-300">Price</label>
             <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-400 font-semibold">₹</span>
                <input
                  name="price"
                  value={data.price}
                  onChange={onChangeHandler}
                  type="number"
                  placeholder="20"
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-zinc-700 border border-zinc-600 text-white placeholder-zinc-400 focus:border-red-500 focus:bg-zinc-700 focus:ring-2 focus:ring-red-500/50 outline-none transition-all"
                  required
                />
             </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full md:w-auto px-10 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              ADD PRODUCT
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Add;