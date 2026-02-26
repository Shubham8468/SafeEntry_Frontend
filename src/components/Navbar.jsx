import React, { useContext } from 'react'
import {assets} from '../assets/assets.js'
import {useNavigate} from 'react-router-dom'
import { AppContent } from '../context/AppContext.jsx';
const Navbar=()=>{

    const navigate= useNavigate(); // this is use to route user if user click this 
    // user redirect on the route path 
    // onClick use and send 
    const {userData,backendUrl, setUserData, setIsLoggedin}=useContext(AppContent)



    return (
            <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24'>
            <img src={assets.logo} alt='Logo' className='w-28 sm:w-32 '/>
            {userData ? <div className='rounded-full bg-blue-400 px-5 py-3 text-white text-xl'>{userData.name[0].toUpperCase()}</div> 
            :<button onClick={()=>navigate('/login')} className='flex items-center gap-2 border border-gray-500 rounded-full py-2 px-6 text-gray-800 
            hover:bg-gray-100 transition-all '>Login <img src={assets.arrow_icon} alt='arrow-icon'/> </button>}
          
            
        </div>
    )
}
export default Navbar;