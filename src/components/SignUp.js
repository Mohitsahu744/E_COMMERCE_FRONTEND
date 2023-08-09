import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
const BASE_URL = 'http://localhost:4000';

const SignUp = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    
    useEffect(()=>{
    const auth = localStorage.getItem('user');
    if(auth){
        navigate('/')
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const signUpUser = async () => {
        let data = {name, email, password}
        let result = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.log(result)
        localStorage.setItem("user", JSON.stringify(result.result))
        localStorage.setItem("token", JSON.stringify(result.auth))
        if(result){
            navigate('/')
        }
    }
    return (
        <div className="signup-div">
            <h1 className="heading">Sign up</h1>
            <input className="inputbox" type="text" placeholder="Enter Name" value={name} onChange={(e) => { setName(e.target.value) }} />
            <input className="inputbox" type="text" placeholder="Enter Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <input className="inputbox" type="Password" placeholder="Enter Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            <button onClick={() => signUpUser()} type="button" className="btnsignup">Sign Up</button>
        </div>
    )
}
export default SignUp;