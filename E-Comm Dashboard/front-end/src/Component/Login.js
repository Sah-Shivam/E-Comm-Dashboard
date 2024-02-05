import React, { useContext, useEffect } from "react"
import { useNavigate} from "react-router-dom";
import { useStore } from "../context/Conext";

const Login = ()=>{
    const {login,Name,Email}=useContext(useStore());
    const[email,setEmail]=React.useState("");
    const[password,setPassword]=React.useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if(auth)
        {
            navigate("/")
        }
    },[]);
    
    const handleLogin = async()=>{
        let result = await fetch('http://localhost:5000/login',{
           method:'post',
           body:JSON.stringify({email,password}),
           headers:{
            'content-type':'application/json'
           }
        });
        result = await result.json();
        console.log(result);
        login(result._id)
        Name(result.name)
        Email(result.email)
        if(result)
        {
            localStorage.setItem("user",JSON.stringify(result));
            navigate("/")
        }
        else{
            alert("please enter the correct detials")
        }
    }
   
    return ( 
       <div className="login">
        <h1 className='logn'>Login</h1>
        <input type="text"  className='input-box' placeholder="Enter your email"
        onChange={(e)=>setEmail(e.target.value)}  value={email}/>
        <input type="password"  className='input-box' placeholder="Enter your Password"
        onChange={(e)=>setPassword(e.target.value)}  value={password}/>
        <button  onClick={handleLogin} className='btn' type='button'>Login</button>
       </div>
    )
}

export default Login