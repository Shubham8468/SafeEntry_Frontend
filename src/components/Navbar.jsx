import React, { useContext } from 'react'
import {assets} from '../assets/assets.js'
import {useNavigate} from 'react-router-dom'
import { AppContent } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar=()=>{
   const navigate=useNavigate()// this is use to route user if user click this 
    // user redirect on the route path 
    // onClick use and send 
    const {userData,backendUrl, setUserData, setIsLoggedin}=useContext(AppContent)
    const logout= async ()=>{
        try{
            axios.defaults.withCredentials=true;
            const {data}=await axios.post(backendUrl+ '/api/auth/logout')
            data.Success && setIsLoggedin(false)
            data.Success && setUserData(false)
            toast.success(data.Message);
            navigate('/')
            

        }catch(err){
           toast.data(err.Message);
        }
    }

    //For the verify
    const sendVerificationPto = async ()=>{
        try{
            axios.defaults.withCredentials=true; // this are the cookies
            const {data}=await axios.post(backendUrl+'/api/auth/send-verify-otp')
            if(data.Success){
                navigate('/email-verify')
                toast.success(data.Message)
            }else{
                toast.error(data.Message);
            }
        }catch(err){
            toast.error(err.message);
        }
    }
    return (
            <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24'>
            <img src={assets.logo} alt='Logo' className='w-28 sm:w-32 '/>
            {userData ? <div className='relative group rounded-full bg-blue-400 px-5 py-3 text-white text-xl cursor-pointer'>{userData.name[0].toUpperCase()}
                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
                    <ul className='list-none m-0 p-2 bg-blue-200 text-sm w-30 h-20 rounded-xl'>
                        {!userData.isAccountVerified && <li onClick={sendVerificationPto} className='py-1 px-2 hover:bg-white rounded-full coursor-pointer'>
                            Verify email
                        </li> }
                        
                        <li onClick={logout} className='py-1 px-2 hover:bg-white rounded-full'>
                            Logout
                        </li>
                    </ul>

                </div>

            </div> 
            :<button onClick={()=>navigate('/login')} className='flex items-center gap-2 border border-gray-500 rounded-full py-2 px-6 text-gray-800 
            hover:bg-gray-100 transition-all '>Login <img src={assets.arrow_icon} alt='arrow-icon'/> </button>}  
        </div>
    )
}
export default Navbar;