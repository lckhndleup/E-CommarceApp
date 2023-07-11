import './App.css';
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Signin from './Pages/Auth/Signin';
import Signup from './Pages/Auth/Signup';
import Products from './Pages/Products';
import ProductDetail from './Pages/ProductDetail';
import Profile from './Pages/Profile';
import ProtectedRoute from './Pages/ProtectedRoute';
import Basket from './Pages/Basket';
import Error404 from './Pages/Error';
import ProtectedAdmin from './Pages/Admin/ProtectedAdmin';
import AdminHome from './Pages/Admin';
import Orders from './Pages/Admin/Orders';





function App() {
  return (
    <Router>
      <div>
        <Navbar /> {/* üst menü*/}
        <div id="content">
          <Routes>
            <Route path="/" element={<Products />} /> {/* products , products klasörü altındaki index.js dosyasından geliyor*/}
            <Route path='product/:product_id' element={<ProductDetail/>} />  {/* Ürün detay sayfası*/}
            <Route path='/signin' element={<Signin />}/>    {/* giriş sayfası*/}
            <Route path='/signup' element={<Signup />} />   {/* kayıt sayfası*/}
            <Route element={<ProtectedRoute />}>  {/*kullnıcı login durumunu kontrol ederek yönlendirme yaptırdığımız ProtectedRoute metodu ile profile sayfasını sarmaladık ki ona göre profile sayfasına giriş izni durumunu kontrol ediyoruz.aynı  şekilde admin sayfayasını da sarmaladık. normal bir user yada giriş yapılmadan direk linki browserda yazarak girmesini engelledik.*/}
                <Route path='/profile' element={<Profile />}/>  {/* Profil detay sayfası*/}
            </Route> 


            <Route element={<ProtectedAdmin />}>
                {/* https://www.robinwieruch.de/react-router-nested-routes/ */}
                <Route index path="/admin" element={<AdminHome />} />
                <Route path="/admin/orders" element={<Orders />} />
                
					  </Route>

            

            <Route path='/basket' element={<Basket />}/>  {/* sepet sayfası*/}

            <Route path='*' element={<Error404 />} /> {/* Hata sayfası*/}
            

          </Routes>
        </div>
      </div>
    </Router>
  )
}





export default App;
