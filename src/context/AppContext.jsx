import {createContext} from 'react'

export const AppContent =createContext();

export const AppContextProvider =(props)=>{
    const backenUrl= import.meta.env.VITE_BACKEND_URL
    const [isLoggin,setIsLoggedin] = useState(false);
}
