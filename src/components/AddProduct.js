import React, { useState } from 'react'
// import {useNavigate} from 'react-router-dom'
const BASE_URL = 'http://localhost:4000';

export default function Product() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const [error, setError] = useState(false)

    // const navigate = useNavigate()
    

   async function addProduct(){
    if(!name || !price || !category || !company){
        setError(true)
        return false
    }
        const userId =JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch(`${BASE_URL}/add-product`,{
            method:'post',
            body:JSON.stringify({name, price, category, company, userId}),
            headers:{
                "Content-Type":"application/json",
                 authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }

        })
        result = await result.json();
        console.log(result)
        if(result){
          alert("Products add successfully.......")
          setName("")
          setPrice("")
          setCategory("")
          setCompany("")
          // navigate('/')
        }

   }
  return (
    <div className='product'>
        <h1 className='heading'>Add Product</h1>
        <input type='text' placeholder='Enter product name'className='inputbox' value={name} onChange={(e)=>{setName(e.target.value)}}/>
        {error && !name && <span className='invalid-input'>Enter valid name</span>}
        <input type='text' placeholder='Enter product price'className='inputbox'value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
        {error && !price && <span className='invalid-input'>Enter valid price</span>}
        <input type='text' placeholder='Enter product category'className='inputbox'value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
        {error && !category && <span className='invalid-input'>Enter valid category</span>}
        <input type='text' placeholder='Enter product company'className='inputbox'value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
        {error && !company && <span className='invalid-input'>Enter valid company</span>}
        <button onClick={addProduct} className='btnsignup'>Add Product</button>
    </div>
  )
}
