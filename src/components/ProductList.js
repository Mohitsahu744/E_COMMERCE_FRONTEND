import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import {Link} from 'react-router-dom'
const BASE_URL = 'https://e-commerce-luas.onrender.com';

export default function ProductList() {
    const[products, setProducts] = useState([])

    useEffect(()=>{
        getProducts();
    },[])

  async  function getProducts(){
        let result =await fetch(`${BASE_URL}/products`,{
          headers:{
            authorization: JSON.parse(localStorage.getItem('token'))
          }
        });
        result = await result.json();
        setProducts(result)
    }
    console.log(products)

    async function deleteProduct(id){
      let result =await fetch(`${BASE_URL}/products/${id}`,{
        method:'delete'
      });
        result = await result.json();
        if(result){
          getProducts();
          alert("Record is deleted....")
        }
    }

   async function searchHandle(e){
        let key = e.target.value;
        if(key){
          let result = await fetch(`${BASE_URL}/search/${key}`);
          result = await result.json();
          if(result){
            setProducts(result)
          }
        }else{
          getProducts();
        }
        
    }

  return (
    <div className='product-list'>
        <h1 className='h11' style={{'display': '-webkit-inline-box'}}>Product List</h1>
        <input onChange={searchHandle} className='input-search' type='text' placeholder='Search Product' />
        <table className='table'>
          <thead>
            <tr>
            <th>S. No.</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Company</th>
            <th>Operation</th>
            </tr>
          </thead>
          <tbody>
        {
          products.length>0 ? products.map((items,i)=>

            <tr  key={i} >
            <td>{i+1}</td>
            <td>{items.name}</td>
            <td>{items.price}</td>
            <td>{items.category}</td>
            <td>{items.company}</td>
            <td><button onClick={()=>deleteProduct(items._id)} className='btnsignup'>Delete</button>
            <Link id='btnsignup2' className='btnsignup' to={`/update/${items._id}`} >Update</Link>
            </td>

            
            </tr>
           ) 
           :  <h1>No Result Found</h1>
        }
        </tbody>
        </table>
    </div>
  )
}
