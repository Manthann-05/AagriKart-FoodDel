import React from 'react'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios";
import { toast } from 'react-toastify';

const Login = ({setShowLogin}) => {

  const {url,setToken} = useContext(StoreContext)

  const [currState, setCurrState] = useState("Sign Up")
  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({...data,[name]:value}))
  }


  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if(currState==="Login"){
      newUrl += "/api/user/login"
    }
    else{
      newUrl += "/api/user/register"
    }
    
    const response = await axios.post(newUrl,data);
    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token)
      setShowLogin(false)
    }
    else{
      toast.error("User already registered");
    }
  }

  return (
    <div className='login fixed inset-0 bg-black/50 z-50 grid place-items-center'>

      <form onSubmit={onLogin} className="login-container bg-white rounded-xl py-3 px-5 flex flex-col gap-5 h-fit w-[360px] dark:bg-[#181A1B] dark:text-[#E8E6E3]">

        <div className="login-title flex justify-between items-center p-2">

          <h2 className='font-bold text-2xl'>{currState}</h2>
          <img className='rounded-full' onClick={()=>{setShowLogin(false)}} src={assets.cross_icon} alt="" />

        </div>
        <div className="login-input flex flex-col gap-5 font-semibold">

          {currState==="Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} className='border-2 rounded border-gray-500 outline-none py-1 px-2 h-10' type="text" placeholder='Your name' required/>}

          <input name='email' onChange={onChangeHandler} value={data.email} className='border-2 rounded border-gray-500 outline-none py-1 px-2 h-10' type="email" placeholder='Your email' required/>

          <input name='password' onChange={onChangeHandler} value={data.password} className='border-2 rounded border-gray-500 outline-none py-1 px-2 h-10' type="password" placeholder="Password" required />
        </div>

        <button type='submit' className='bg-orange-500 rounded text-white py-1.5'>{currState==="Sign Up" ? "Create Account" : "Login"}</button>

        <div className="login-condition flex items-start justify-start">
          <input type="checkbox" required className="mt-1" />
          <p className="ml-2 text-sm tracking-wide">
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>

        {currState==="Login" ? 
        <p>Create a new account ? <span className='text-orange-500 font-semibold cursor-pointer' onClick={()=>{setCurrState("Sign Up")}}>Click here</span></p> : 

        <p>Already have an account ? <span className='text-orange-500 font-semibold cursor-pointer' onClick={()=>{setCurrState("Login")}}>Login here</span></p>}

      </form>

    </div>
  )
}

export default Login
