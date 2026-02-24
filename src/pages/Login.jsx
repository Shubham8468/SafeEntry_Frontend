import React from 'react'
import {useState} from 'react'
import { assets } from '../assets/assets'
const Login =() =>{
    const [state,setState]=useState('sign up')
    return (
        <div>
            <img src={assets.logo} alt='' className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />
        </div>
    )
}
export default Login;