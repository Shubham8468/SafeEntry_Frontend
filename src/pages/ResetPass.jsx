import React from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { AppContent } from '../context/AppContext'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useContext } from 'react';
const ResetPassword = () => {
    const {backendUrl} =useContext(AppContent);
    axios.defaults.withCredentials=true;




    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('');
    const [isEmailSent, setEmailSent] = useState(false);
    const [otp, setOpt] = useState('')
    const [isOtpSumited, setIsOtpSumited] = useState(false)
    const [isSendingOtp, setIsSendingOtp] = useState(false)



    const navigate = useNavigate();
    const inputRefs = React.useRef([])// becouse in this we strore multiples field 
    // for the automaticly move to next input block
    const handelInput = (e, index) => {
        if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    }
    // fro when i delete my number from the input section its move backword automaticaly 
    const handelKeyDown = (e, index) => {
        if (e.key == 'Backspace' && e.target.value === '' && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    }
    //handel pest item
    const handelePaste = (e) => {
        e.preventDefault();
        const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const pasteArray = paste.split('');
        pasteArray.forEach((char, index) => {
            if (inputRefs.current[index]) {
                inputRefs.current[index].value = char;
            }
        })

        const lastIndex = Math.min(pasteArray.length, inputRefs.current.length) - 1;
        if (lastIndex >= 0 && inputRefs.current[lastIndex]) {
            inputRefs.current[lastIndex].focus();
        }
    }



    const onSubmitEmail=async (e)=>{
        e.preventDefault();
        if (isSendingOtp) return;
        setIsSendingOtp(true);
        try{
            let data;
            try {
                ({ data } = await axios.post(backendUrl + '/api/auth/sent-reset-otp', { email }));
            } catch (error) {
                if (error.response?.status === 404) {
                    ({ data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email }));
                } else {
                    throw error;
                }
            }
            data.Success ? toast.success(data.Message) : toast.error(data.Message);
            data.Success && setEmailSent(true);


        }catch(err){
              toast.error(err.response?.data?.Message || err.message);
        } finally {
            setIsSendingOtp(false);
        }
    }

    const onSumbitOTP = async (e)=>{
        e.preventDefault();
        const otpArray=inputRefs.current.map(e=>e.value)
        setOpt(otpArray.join(''))
        setIsOtpSumited(true)
    }

    const onSubmitNewPassword = async (e)=>{
        e.preventDefault();
        try{
            const {data} = await axios.post(backendUrl+ '/api/auth/reset-password',{email,otp,newPassword})
            if(data.Success) {
                toast.success(data.Message);
                setEmail('');
                setOpt('');
                setNewPassword('');
                setEmailSent(false);
                setIsOtpSumited(false);
                navigate('/login');
            } else {
                toast.error(data.Message);
            }
        }catch(err){
            toast.error(err.response?.data?.Message || err.message);
        }
    }



    return (
        <div className='flex items-center justify-center min-h-screen  bg-gradient-to-br from-blue-200 to-purple-400 '>
            <img src={assets.logo} onClick={() => navigate('/')} alt='logo' className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />
            {/* /enter email id */}
            {
                !isEmailSent &&

                <form onSubmit={onSubmitEmail} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
                    <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset password</h1>
                    <p className='text-indigo-300 text-center mb-6 '>Enter your registered email address.</p>
                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                        <img scr={assets.mail_icon} className='w-3 h-3' />
                        <input type='email' placeholder='Email id' className='bg-transparent outline-none text-white' value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <button disabled={isSendingOtp} className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3 disabled:opacity-60 disabled:cursor-not-allowed' >
                        {isSendingOtp ? 'Sending OTP...' : 'Submit'}
                    </button>
                </form>
            }
            {/* otp sent from  */}
            {
                !isOtpSumited && isEmailSent &&

                <form onSubmit={onSumbitOTP} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm' >
                    <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset password OTP</h1>
                    <p className='text-indigo-300 text-center mb-6 '>Enter the 6-digit code sent to your email id .</p>
                    <div className='flex justify-between mb-8' onPaste={handelePaste}>
                        {Array(6).fill(0).map((_, index) => (
                            <input type='text' maxLength="1" key={index} required className='w-12 h-12 bg-[#333A5C] text-center text-xl 
                    rounded-md' ref={e => inputRefs.current[index] = e}
                                onInput={(e) => handelInput(e, index)}
                                onKeyDown={(e) => handelKeyDown(e, index)} />
                        ))}

                    </div>
                    <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full '>Submit </button>

                </form>
            }
            {/* Enter new form */}

            {isOtpSumited && isEmailSent &&

                <form onSubmit={onSubmitNewPassword} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
                    <h1 className='text-white text-2xl font-semibold text-center mb-4'>New password</h1>
                    <p className='text-indigo-300 text-center mb-6 '>Enter new password below.</p>
                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                        <img scr={assets.lock_icon} className='w-3 h-3' />
                        <input type='password' placeholder='New password' className='bg-transparent outline-none text-white' value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
                    </div>
                    <button className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3'>Submit</button>
                </form>
            }
        </div>
    )
}
export default ResetPassword;