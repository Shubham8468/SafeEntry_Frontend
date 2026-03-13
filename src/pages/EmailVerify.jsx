import React, { useContext } from 'react'
import { assets } from '../assets/assets';
import {useNavigate} from 'react-router-dom'
import {AppContent} from '../context/AppContext'
import { toast } from 'react-toastify';
import axios from 'axios'
const EmailVerify = () =>{
    axios.defaults.withCredentials=true;
    const {backendUrl,getUserDate}=useContext(AppContent)
     const navigate = useNavigate();
     const inputRefs=React.useRef([])// becouse in this we strore multiples field 
     // for the automaticly move to next input block
     const handelInput=(e,index)=>{
        if(e.target.value.length >0 && index < inputRefs.current.length-1){
            inputRefs.current[index +1].focus();
        }
     }
     // fro when i delete my number from the input section its move backword automaticaly 
     const handelKeyDown=(e,index)=>{
        if(e.key=='Backspace' && e.target.value ==='' && index>0){
            inputRefs.current[index -1].focus(); 
        }
     }
     //handel pest item
     const handelePaste=(e)=>{
        e.preventDefault();
        const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const pasteArray = paste.split('');
        pasteArray.forEach((char,index)=>{
            if(inputRefs.current[index]){
                inputRefs.current[index].value=char;
            }
        })

        const lastIndex = Math.min(pasteArray.length, inputRefs.current.length) - 1;
        if (lastIndex >= 0 && inputRefs.current[lastIndex]) {
            inputRefs.current[lastIndex].focus();
        }
     }
     //handel submit fuction
     const onSumbitHandel=async (e)=>{
        try{
            e.preventDefault();
            const otpArray=inputRefs.current.map(e=>e.value)
            const otp=otpArray.join('')

            const {data}=await axios.post(backendUrl+'/api/auth/verify-account',{otp})
            if(data.Success){
                toast.success(data.Message)
                getUserDate()
                navigate('/')
            }else{
                toast.error(data.Message)
            }
        }catch(err){
            toast.error(err.response?.data?.Message || err.message)
        }
     }
    return (
        <div className='flex items-center justify-center min-h-screen  bg-gradient-to-br from-blue-200 to-purple-400 '>
           <img src={assets.logo} onClick={()=>navigate('/')} alt='logo' className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'/>
           <form className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm' onSubmit={onSumbitHandel}>
            <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
            <p className='text-indigo-300 text-center mb-6 '>Enter the 6-digit code sent to your email id .</p>
            <div className='flex justify-between mb-8'onPaste={handelePaste}>
                {Array(6).fill(0).map((_,index)=>(
                    <input type='text' maxLength="1" key={index} required className='w-12 h-12 bg-[#333A5C] text-center text-xl 
                    rounded-md' ref={e=>inputRefs.current[index]=e} 
                    onInput={(e)=>handelInput(e,index) } 
                    onKeyDown={(e)=>handelKeyDown(e,index)}/>
                ))}

            </div>
            <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full '>Verify email </button>

           </form>
        </div>
    )
}
export default EmailVerify;