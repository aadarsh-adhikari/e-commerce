import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './page/Homepage';
import Notfound from './page/Notfound';
import Register from './page/auth/Register';
import Login from './page/auth/Login';
import Blog from './page/Blog';
import Dashboard from './page/user/Dashboard';
import PrivateRoute from './components/routes/Private';
import Admin from './components/routes/Admin';
import Admindashboard from './page/admin/Admindashboard';
import Createcatogory from './page/admin/Createcatogory';
import Createproduct from './page/admin/Createproduct';
import Profile from './page/user/Profile';
import Product from './page/admin/Product';
import Updateproduct from './page/admin/Updateproduct';
import Category from './page/Category';
import Newarrival from './page/Newarrival';
import Authorbook from './page/Authorbook';
import Productdetail from './page/Productdetail';
import Search from './components/layout/Search';
import CartPage from './page/CartPage';
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<Admin />}>
          <Route path="admin" element={<Admindashboard />} />
          <Route path="admin/category" element={<Createcatogory />} />
          <Route path="admin/create-product" element={<Createproduct />} />
          <Route path="/dashboard/admin/product/:slug" element={<Updateproduct />} />
          <Route path="admin/product" element={<Product />} />


        </Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/category/:slug" element={<Category/>}></Route>
        <Route path="/author/:slug" element={<Authorbook/>}></Route>
        <Route path="/new-arrivals" element={<Newarrival/>}></Route>
        <Route path="/product/:slug" element={<Productdetail/>}></Route>
        <Route path="/product/search/" element={<Search/>}></Route>
        <Route path='/blog' element={<Blog/>}></Route>
        <Route path='/cart' element={<CartPage/>}></Route>
        <Route path="*" element={<Notfound/>} />
      </Routes>
    </>
  );
}
export default App;
