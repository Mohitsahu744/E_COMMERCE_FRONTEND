import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const BASE_URL = 'http://localhost:4000';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) (
            navigate('/')
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function handleLogin() {
        let data = { email, password }
        let result = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.log(result)
        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user))
            localStorage.setItem("token", JSON.stringify(result.auth))
            navigate('/')
        } else {
            alert("please enter correct details")
        }
    }
    return (
        <div className='login'>
            <h1 className='heading'>Login</h1>
            <input type='text' className='inputbox' placeholder='Enter Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <input type='password' className='inputbox' placeholder='Enter Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
            <button type="button" className="btnsignup" onClick={() => { handleLogin() }}>Login</button>

        </div>
    )
}
