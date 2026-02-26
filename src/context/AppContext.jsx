import {createContext, useEffect} from 'react'
import {useState} from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
export const AppContent =createContext();

export const AppContextProvider =(props)=>{
    axios.defaults.withCredentials = true
    const backendUrl= import.meta.env.VITE_BACKEND_URL
    const [isLoggin,setIsLoggedin] = useState(false);
    const [userData,setuserData] = useState(false);
    const getUserDate= async ()=>{
        try{
              const {data}= await axios.get(backendUrl+'/api/user/data')
              data.Success ? setuserData(data.userData) : toast.error(data.Message)
        }catch(err){
                toast.error(err.message)
        }
    }
    //user auth or not 
    const getAuthState= async()=>{
        try{
             const {data}= await axios.get(backendUrl +'/api.auth/is-auth')
             if(data.Success){
                setIsLoggedin(true)
                getUserDate()
             }
        }catch(err){
            toast.error(err.message)
        }
    }
    useEffect(()=>{
            getAuthState();
    },[])
    const value ={
        backendUrl,
        isLoggin , setIsLoggedin,
        userData, setuserData,
        getUserDate
    }
    return(
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )

}
