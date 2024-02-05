
import './App.css';
import Nav from './Component/Nav'
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Footer from './Component/Footer'
import SignUp from './Component/SignUp'
import PrivateComponent from './Component/PrivateComponent';
import Login from './Component/Login';
import Addproduct from './Component/Addproduct'
import ProductList from './Component/ProductList';
import UpdateProduct from './Component/UpdateProduct'
import { MyContextProvider } from './context/Conext';
import Profile from './Component/Profile';
import PageNotFound from './Component/PageNotFound';

function App() {
  return (
    <div className="App" >
      <BrowserRouter>
      <MyContextProvider>
      <Nav />
      <Routes>

        <Route element={<PrivateComponent/>}>
        <Route path='/' element={<ProductList/>}/>
        <Route path='/add' element={<Addproduct/>} />
        <Route path='/update/:id' element={<UpdateProduct/>} />
        <Route path='/logout' element={<h1>logout</h1>} />
        <Route path='/profile' element={ <Profile/>  } />
        <Route path='/*' element={ <PageNotFound/> }></Route>
        </Route>

        <Route path='/Signup'  element={<SignUp/>} />
        <Route path='/login'  element={<Login/>} />
      </Routes>
      </MyContextProvider>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
