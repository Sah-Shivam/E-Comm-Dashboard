import React, { useContext, useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom'
import { useStore } from '../context/Conext'

const SignUp = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const {login,Name,Email}=useContext(useStore());
    // ye useffect ke help se hm dubara sighup pr click karne pr signup page pr nhi jayge kyu ke hm allready signIN ho chuke hoge tabi
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate('/')
        }
    })


    const collectdata = async () => {
        console.warn(name, email, password)
        try{
            let result = await fetch('http://localhost:5000/register', {
            method: "post",
            body: JSON.stringify({ name, email, password }),
            headers: {
                'content-type': 'application/json'
            },
        })
        result = await result.json();
        login(result._id)
        Name(result.name)
        Email(result.email)
        console.warn(result)
        // yaha local stroage me data save rahega refresh hone ke baad bhi
        localStorage.setItem("user",JSON.stringify(result))
        navigate('/')
        }catch(error){
            console.log(error)
        }
        
           
    }

    return (
        <div className='box'>
            <h1 className='reg'>Register</h1>
            <input className='input-box' type='text'
                value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Enter Your Name' />

            <input className='input-box' type='text'
                value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter Your Email' />

            <input className='input-box' type='password'
                value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Create Your Password' />

            <button onClick={collectdata} className='btn' type='button'>Sign Up</button>
        </div>
    )
}

export default SignUp;