import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
const BASE_URL = 'https://e-commerce-luas.onrender.com';

export default function UpdateProduct() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const params = useParams();
    const navigate = useNavigate();

   useEffect(()=>{
    getProductDetails();
   },[])

  async function getProductDetails(){
    let result = await fetch(`${BASE_URL}/product/${params.id}`);
    result = await result.json();
    setName(result.name)
    setPrice(result.price)
    setCategory(result.category)
    setCompany(result.company)
   }

  async function updateProduct(){
    let result =await fetch(`${BASE_URL}/product/${params.id}`,{
      method:'put',
      body:JSON.stringify({name,price,category,company}),
      headers:{
        'Content-type':'application/json'
      }

    });
    result = await result.json();
    // console.log(result)
    // console.log(price,name)
    if(result){
      navigate('/')
    }
  }
  return (
    <div className='product'>
        <h1>Update Product</h1>
        <input type='text' placeholder='Enter product name'className='inputbox' value={name} onChange={(e)=>{setName(e.target.value)}}/>
        <input type='text' placeholder='Enter product price'className='inputbox'value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
        <input type='text' placeholder='Enter product category'className='inputbox'value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
        <input type='text' placeholder='Enter product company'className='inputbox'value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
        <button onClick={updateProduct} className='btnsignup'>Update Product</button>
    </div>
  )
}
