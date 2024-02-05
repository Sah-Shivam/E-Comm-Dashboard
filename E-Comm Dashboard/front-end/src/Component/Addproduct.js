import React from 'react'
import { useNavigate } from 'react-router-dom'

const Addproduct = () => {
    const [name,setName] = React.useState('')
    const [price,setPrice] = React.useState('')
    const [category,setCategory] = React.useState('')
    const [company,setCompany] = React.useState('')
    const [error,setError] = React.useState(false)
    const navigate = useNavigate();
    const addproduct = async ()=>{

       console.warn(!name)
       if(!name || !price || !category || !company)
       {
        setError(true)
        return false
        }
     
       const userId = JSON.parse(localStorage.getItem('user'))._id;
       let result = await fetch("http://localhost:5000/add-product",{
        method:"post",
        body:JSON.stringify({name,price,category,company,userId}),
        headers:{
            "content-Type":"application/json"
        }
       })
       result = await result.json()
       console.warn(result);
         navigate('/')
    }
    return (
        <div className='product'>
            <h1 className='addprdt'> Add product</h1>
            <input type='text' placeholder='Enter product name'  className='input-box'
             value={name}  onChange={(e)=>{setName(e.target.value)}}
             />
             {error && !name && <span className='invalid-input'>Enter valid name</span>}


            <input type='text' placeholder='Enter product price'  className='input-box'
             value={price} onChange={(e)=>{setPrice(e.target.value)}}
            />
            {error && !price && <span className='invalid-input'>Enter valid price</span>}


            <input type='text' placeholder='Enter product category'  className='input-box'
              value={category}  onChange={(e)=>{setCategory(e.target.value)}}
             />
             {error && !category && <span className='invalid-input'>Enter valid category</span>}


            <input type='text' placeholder='Enter product company'  className='input-box'
             value={company}  onChange={(e)=>{setCompany(e.target.value)}}
            />
            {error && !company && <span className='invalid-input'>Enter valid company</span>}

            <button  onClick={addproduct} className='btn'>Add Product</button>
        </div>
    )
}

export default Addproduct;