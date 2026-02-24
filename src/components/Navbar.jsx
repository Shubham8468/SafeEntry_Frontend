import React from 'react'
import {assets} from '../assets/assets.js'
import {useNavigate} from 'react-router-dom'
const Navbar=()=>{

    const navigate= useNavigate(); // this is use to route user if user click this 
    // user redirect on the route path 
    // onClick use and send 




    return (
            <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24'>
            <img src={assets.logo} alt='Logo' className='w-28 sm:w-32 '/>
            <button onClick={()=>navigate('/login')} // and write this 
             className='flex items-center gap-2 border border-gray-500 rounded-full py-2 px-6 text-gray-800 
            hover:bg-gray-100 transition-all '>Login <img src={assets.arrow_icon} alt='arrow-icon'/> </button>
        </div>
    )
}
export default Navbar;