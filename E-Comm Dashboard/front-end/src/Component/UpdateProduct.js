import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
const UpdateProduct = () => {
  const [name, setName] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [category, setCategory] = React.useState('')
  const [company, setCompany] = React.useState('')
  const [error, setError] = React.useState(false)
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getProductDetials();
  }, [])

  const getProductDetials = async () => {
    console.warn(params)
    let result = await fetch(`http://localhost:5000/product/${params.id}`); 
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  }

  const UpdateProduct = async () => {
    console.warn(params.id)

    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: 'Put',
      body: JSON.stringify({ name:name, price:price, category:category, company:company }),
      headers: {
        'content-Type': 'application/json'
      } 
    });
    result = await result.json()
    console.log(result)
    navigate('/')
  }

  return (  
    <div className='product'>
      <h1 className='addprdt'> Update product</h1>
      <input type='text' placeholder='Enter product name' className='input-box'
        value={name} onChange={(e) => { setName(e.target.value) }}
      />
      {/* {error && !name && <span className='invalid-input'>Enter valid name</span>} */}


      <input type='text' placeholder='Enter product price' className='input-box'
        value={price} onChange={(e) => { setPrice(e.target.value) }}
      />
      {/* {error && !price && <span className='invalid-input'>Enter valid price</span>} */}


      <input type='text' placeholder='Enter product category' className='input-box'
        value={category} onChange={(e) => { setCategory(e.target.value) }}
      />
      {/* {error && !category && <span className='invalid-input'>Enter valid category</span>} */}


      <input type='text' placeholder='Enter product company' className='input-box'
        value={company} onChange={(e) => { setCompany(e.target.value) }}
      />
      {/* {error && !company && <span className='invalid-input'>Enter valid company</span>} */}

      <button onClick={UpdateProduct} className='btn'>Update Product</button>
    </div>
  )
}
  
export default UpdateProduct;