import React, { useContext } from 'react'
import {assets} from '../assets/assets.js'
import { AppContent } from '../context/AppContext.jsx'
import { useNavigate } from 'react-router-dom'

const Header = () =>{
    const {userData} =useContext(AppContent)
    const navigate=useNavigate();
    return (
        <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800  '>
       <img  src={assets.header_img}
        className='w-36 h-36 rounded-full mb-6'/>
        <h1 className='flex items-center gap-2 text-xl sm:text-3xl front-medium mb-2'>Hi<span className='bg-blue-300 border-2 rounded-xl py-2 px-2 text-white' >  {userData ? userData.name :'Devloper'}!</span> <img className='w-8 aspect-square' src={assets.hand_wave}/></h1>
        <h2 className='font-semibold mb-4 text-3xl sm:text-5xl '>Welcome to our app </h2>
        <p className='mb-8 max-w-md'>Let's start with a quick product tour and we will have you up and running in no time!</p>
         <button className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all' onClick={()=>navigate('/login')}>Get Started</button>
        </div>
        
    )
}
export default Header;