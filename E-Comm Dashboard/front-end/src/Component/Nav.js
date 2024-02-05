import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Nav = () => {
    const result = localStorage.getItem('user');


    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/SignUp')
    }

    return (
        <div>
            <img
               alt='logo'
               className='logo'
               src='https://i.pinimg.com/736x/22/f2/e0/22f2e0600c8591785e6f439b661ec34d.jpg'/>
            {/*auth matbl ke login data recive ho gayia aur user log-IN h toh usse ko below 5 bar dikhyge  */}
            {result ? <ul className='nav-ul'>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                {/* <li><Link to="/update">Update Product</Link></li> */}
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logout} to="/SignUp">Logout</Link></li>
            </ul>
                :
                // matbl auth me data nhi toh fir ye matbl hua ke new user h Y fir user abhi login nhi h
                <ul className='nav-ul nav-right' >
                    <li><Link to="/SignUp">SignUp</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            }
        </div>
    )
}

export default Nav;