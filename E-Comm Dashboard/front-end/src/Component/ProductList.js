import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useStore } from '../context/Conext';
const ProductList = () => {
    const [products, setProducts] = useState([])
    const {userid}=useContext(useStore());
   
    useEffect(() => {
        getProducts();
    },[]);

    const getProducts = async () => {
        let result = await fetch(`http://localhost:5000/products/${userid}`);
        result = await result.json();
        setProducts(result);
    }

     
    const deleteproduct = async (id)=>{
        let result = await fetch(`http://localhost:5000/product/${id}`,{
        method:"Delete"
    });
    result = await result.json()
    if(result)
    {
        getProducts();
    }
};


 const searchHandle = async (event) => {
    let key = event.target.value;
    if(key){
        let result = await fetch(`http://localhost:5000/search/${key}`);
        result = await result.json();
        if(result)
        {
            setProducts(result)
        }
    }else{
        getProducts();
    }

   
 }

    // console.warn("products", products);
    return (
        <div className="product-list">
            <h2>product list</h2>
            <input  text='text'  className='search-product-box'   placeholder='search' 
            onChange={searchHandle}
            />
            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                products.length > 0 ? products.map((item,index) => 
                    <ul key ={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>INR {item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><button onClick={()=>deleteproduct(item._id)}>Delete</button>
                            <Link to={"/update/"+item._id}>update</Link> </li>
                    </ul>
                )
               : <h1>No Result Found</h1> 
            }
        </div>

    )
}

export default ProductList;