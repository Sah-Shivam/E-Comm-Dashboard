import { useState,createContext } from "react";


const myContext=createContext();

export const MyContextProvider=({children})=>{
    const [userid,setUserId]=useState(null);
    const [name,setName] = useState(null);
    const [email,setEmail] = useState(null);
    const login=(id)=>{
        setUserId(id);
    }
    const Name=(username)=>{
        setName(username);
    }
    const Email =(usermail)=>{
        setEmail(usermail);
    }
    return (
        <myContext.Provider value={{login,Name,Email,userid,name,email}} >
            {children}
        </myContext.Provider>
    )
}

export const useStore=()=>{
    return myContext;
}


