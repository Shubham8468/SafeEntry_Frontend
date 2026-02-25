import React from 'react'
import {useState} from 'react'
import { assets } from '../assets/assets'
import {useNavigate} from 'react-router-dom'
const Login =() =>{
    //For the provired navigation
    
    const navigate= useNavigate();
    const [state,setState]=useState('Sign Up')
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('');
    return (
        <div className='flex items-center justify-center min-h-screen px-6 sm:px-0  bg-gradient-to-br from-blue-200 to-purple-400 '>
            <img onClick={()=>navigate('/')} src={assets.logo} alt='' className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />
            <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm shadow-xl'>
                <h2 className='text-3xl font-semibold text-white text-center mb-3'>{state== 'Sign Up' ? 'Create  account' : 'Login ' }</h2>
                <p className='text-center text-sm mb-6'>{state=='Sign Up'? 'Create your account' : 'Login to your account!'}</p>
                <form>
                    {state== 'Sign Up' ? (<div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                        <img src={assets.person_icon}/>
                        <input onChange={(e)=>setName(e.target.value)} value={name} className='bg-transparent outline-none text-white' type='text' placeholder='Full Name' required/>
                    </div>): ('')}
                    
                    <div className='mb-4 flex item-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                          <img src={assets.mail_icon} />
                          <input onClick={e=>setEmail(e.target.value)} value={email} className='bg-transparent outline-none text-white' type='email' placeholder='Email id'/>
                    </div>
                    <div className='mb-4 flex flex-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                        <img src={assets.lock_icon}/>
                        <input onClick={e=>setPassword(e.target.value)} value={password} className='bg-transparent outline-none text-white ' type='password' placeholder='Password..'></input>

                    </div>
                    <p onClick={()=>navigate('/reset-password')} className='mb-4 text-indogo-500 cursor-pointer ml-4'>Forget Password?</p>
                    <button className='w-full py-2.5 rounded-full text-white bg-gradient-to-br from-indigo-500 to-indigo-900 font-md'>{state}</button>
                </form>
                {state== 'Sign Up' ? ( <p className='text-center text-gray-400 text-xs mt-4'>Alredy have an account? {'   '}   <span onClick={()=>setState('Login')} className='text-blue-400 cursor-pointer underline'> Login here</span></p>) : ( <p onClick={()=>setState('Sign Up')} className='text-center text-gray-400 text-xs mt-4'>Don't have an account? {'   '}   <span className='text-blue-400 cursor-pointer underline'> Sing up</span></p>
                )}
                </div>
                </div>
        )
    }
               
export default Login;