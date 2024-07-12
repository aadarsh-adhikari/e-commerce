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
import Users from './page/admin/Users';
import Profile from './page/user/Profile';
import Orders from './page/user/Orders';
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/order" element={<Orders />} />          
        </Route>
        <Route path="/dashboard" element={<Admin />}>
          <Route path="admin" element={<Admindashboard />} />
          <Route path="admin/category" element={<Createcatogory />} />
          <Route path="admin/product" element={<Createproduct />} />
          <Route path="admin/users" element={<Users />} />


        </Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path='/blog' element={<Blog/>}></Route>
        <Route path="*" element={<Notfound/>} />
      </Routes>
    </>
  );
}
export default App;
